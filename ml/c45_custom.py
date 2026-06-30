"""
Implementasi C4.5 asli (Gain Ratio + Pessimistic Error Pruning, CF=0.25).
Digunakan untuk melatih ulang model rekomendasi pantai Batam.

Cara pakai:
  pip install pandas numpy scikit-learn openpyxl
  python ml/c45_custom.py

Output:
  ml/output_c45/predictJ48.ts  — TypeScript function untuk lib/j48.ts
  ml/output_c45/tree_text.txt  — representasi teks pohon
"""

import math
import json
import pandas as pd
import numpy as np
from collections import Counter
from pathlib import Path
from sklearn.model_selection import StratifiedKFold
from sklearn.metrics import classification_report, confusion_matrix

# ---------------------------------------------------------------------------
# Core C4.5 math
# ---------------------------------------------------------------------------

def entropy(labels):
    n = len(labels)
    if n == 0:
        return 0.0
    counts = Counter(labels)
    return -sum((c / n) * math.log2(c / n) for c in counts.values() if c > 0)


def split_info_binary(n_left, n_right):
    n = n_left + n_right
    if n == 0:
        return 0.0
    parts = [n_left / n, n_right / n]
    return -sum(p * math.log2(p) for p in parts if p > 0)


def best_threshold_for_attr(X_col, y, min_leaf=2):
    """Cari threshold terbaik untuk satu atribut kontinu (metode C4.5)."""
    pairs = sorted(zip(X_col, y), key=lambda t: t[0])
    values = [p[0] for p in pairs]
    uniq = sorted(set(values))
    if len(uniq) < 2:
        return None
    parent_h = entropy(y)
    n = len(y)
    best = None
    for i in range(len(uniq) - 1):
        t = (uniq[i] + uniq[i + 1]) / 2.0
        left_y  = [lab for v, lab in pairs if v <= t]
        right_y = [lab for v, lab in pairs if v > t]
        if len(left_y) < min_leaf or len(right_y) < min_leaf:
            continue
        h_left, h_right = entropy(left_y), entropy(right_y)
        weighted = (len(left_y) / n) * h_left + (len(right_y) / n) * h_right
        gain = parent_h - weighted
        si = split_info_binary(len(left_y), len(right_y))
        gain_ratio = gain / si if si > 0 else 0.0
        cand = {
            "threshold": t,
            "gain": gain,
            "split_info": si,
            "gain_ratio": gain_ratio,
        }
        if best is None or gain > best["gain"]:
            best = cand
    return best


def best_split(X, y, features, min_leaf=2):
    """Seleksi atribut C4.5: filter >= rata-rata gain, lalu pilih gain ratio tertinggi."""
    candidates = {}
    for f in features:
        res = best_threshold_for_attr(X[f].values, y, min_leaf)
        if res is not None:
            candidates[f] = res
    if not candidates:
        return None
    avg_gain = np.mean([c["gain"] for c in candidates.values()])
    qualified = {
        f: c
        for f, c in candidates.items()
        if c["gain"] >= avg_gain and c["gain"] > 0
    }
    if not qualified:
        return None
    best_feat = max(qualified, key=lambda f: qualified[f]["gain_ratio"])
    out = qualified[best_feat].copy()
    out["feature"] = best_feat
    return out


# ---------------------------------------------------------------------------
# Struktur pohon
# ---------------------------------------------------------------------------

class Node:
    def __init__(self):
        self.is_leaf = False
        self.prediction = None
        self.feature = None
        self.threshold = None
        self.left = None
        self.right = None
        self.n = 0
        self.class_counts = None
        self.gain = None
        self.gain_ratio = None


def majority_class(y):
    return Counter(y).most_common(1)[0][0]


def build_tree(X, y, features, min_leaf=2, depth=0, max_depth=10):
    y = np.array(y)
    node = Node()
    node.n = len(y)
    node.class_counts = dict(Counter(y.tolist()))
    node.prediction = majority_class(y.tolist())
    if entropy(y.tolist()) == 0 or len(y) < (2 * min_leaf) or depth >= max_depth:
        node.is_leaf = True
        return node
    split = best_split(X, y.tolist(), features, min_leaf)
    if split is None:
        node.is_leaf = True
        return node
    node.feature = split["feature"]
    node.threshold = split["threshold"]
    node.gain = split["gain"]
    node.gain_ratio = split["gain_ratio"]
    mask = X[node.feature].values <= node.threshold
    node.left  = build_tree(X[mask],  y[mask],  features, min_leaf, depth + 1, max_depth)
    node.right = build_tree(X[~mask], y[~mask], features, min_leaf, depth + 1, max_depth)
    return node


def predict_one(node, row):
    if node.is_leaf:
        return node.prediction
    if row[node.feature] <= node.threshold:
        return predict_one(node.left, row)
    return predict_one(node.right, row)


def predict(node, X):
    return np.array([predict_one(node, X.iloc[i]) for i in range(len(X))])


# ---------------------------------------------------------------------------
# Pessimistic Error Pruning (Quinlan, CF=0.25, z=0.69)
# ---------------------------------------------------------------------------

Z = 0.69


def pess_error_estimate(n, e):
    if n == 0:
        return 0.0
    f = e / n
    z2 = Z * Z
    num = f + z2 / (2 * n) + Z * math.sqrt(max(f / n - (f ** 2) / n + z2 / (4 * n * n), 0))
    den = 1 + z2 / n
    return (num / den) * n


def subtree_errors_and_leaves(node, X, y):
    y = np.array(y)
    if node.is_leaf:
        e = sum(1 for v in y if v != node.prediction)
        return pess_error_estimate(node.n, e), 1
    mask = X[node.feature].values <= node.threshold
    le, ll = subtree_errors_and_leaves(node.left,  X[mask],  y[mask])
    re, rl = subtree_errors_and_leaves(node.right, X[~mask], y[~mask])
    return le + re, ll + rl


def prune(node, X, y):
    y = np.array(y)
    if node.is_leaf:
        return node
    mask = X[node.feature].values <= node.threshold
    node.left  = prune(node.left,  X[mask],  y[mask])
    node.right = prune(node.right, X[~mask], y[~mask])
    e_leaf = pess_error_estimate(node.n, sum(1 for v in y if v != node.prediction))
    e_subtree, _ = subtree_errors_and_leaves(node, X, y)
    if e_leaf <= e_subtree:
        leaf = Node()
        leaf.is_leaf = True
        leaf.n = node.n
        leaf.class_counts = dict(Counter(y))
        leaf.prediction = node.prediction
        return leaf
    return node


def count_leaves(node):
    if node.is_leaf:
        return 1
    return count_leaves(node.left) + count_leaves(node.right)


def tree_depth(node):
    if node.is_leaf:
        return 0
    return 1 + max(tree_depth(node.left), tree_depth(node.right))


# ---------------------------------------------------------------------------
# Representasi teks pohon
# ---------------------------------------------------------------------------

def print_tree(node, feat_names_map, depth=0, prefix="ROOT"):
    indent = "  " * depth
    if node.is_leaf:
        print(
            f"{indent}{prefix} -> LEAF class={node.prediction} "
            f"n={node.n} counts={node.class_counts}"
        )
    else:
        fname = feat_names_map.get(node.feature, node.feature)
        print(
            f"{indent}{prefix} [{fname} <= {node.threshold}] "
            f"gain={node.gain:.3f} gainratio={node.gain_ratio:.3f} n={node.n}"
        )
        print_tree(node.left,  feat_names_map, depth + 1, "YA (<=)")
        print_tree(node.right, feat_names_map, depth + 1, "TIDAK (>)")


def tree_to_text(node, feat_names_map, depth=0, prefix="ROOT"):
    lines = []
    indent = "  " * depth
    if node.is_leaf:
        lines.append(
            f"{indent}{prefix} -> LEAF class={node.prediction} "
            f"n={node.n} counts={node.class_counts}"
        )
    else:
        fname = feat_names_map.get(node.feature, node.feature)
        lines.append(
            f"{indent}{prefix} [{fname} <= {node.threshold}] "
            f"gain={node.gain:.3f} gainratio={node.gain_ratio:.3f} n={node.n}"
        )
        lines += tree_to_text(node.left,  feat_names_map, depth + 1, "YA (<=)")
        lines += tree_to_text(node.right, feat_names_map, depth + 1, "TIDAK (>)")
    return lines


# ---------------------------------------------------------------------------
# Export ke TypeScript
# ---------------------------------------------------------------------------

LABEL_MAP = {
    0: "tidak_direkomendasikan",
    1: "direkomendasikan",
    2: "sangat_direkomendasikan",
}

LABEL_ORDER = {v: k for k, v in LABEL_MAP.items()}


def node_to_ts(node, depth=1):
    indent = "  " * depth
    if node.is_leaf:
        label = node.prediction
        n = node.n
        return [f'{indent}// n={n}, counts={node.class_counts}', f'{indent}return "{label}";']
    lines = []
    lines.append(f"{indent}if ({node.feature} <= {node.threshold}) {{")
    lines += node_to_ts(node.left, depth + 1)
    lines.append(f"{indent}}} else {{")
    lines += node_to_ts(node.right, depth + 1)
    lines.append(f"{indent}}}")
    return lines


def tree_to_typescript(root):
    body = "\n".join(node_to_ts(root, depth=1))
    return f"""// AUTO-GENERATED dari c45_custom.py — JANGAN EDIT MANUAL
// C4.5 asli: Gain Ratio + Pessimistic Error Pruning (CF=0.25)
// Salin seluruh file ini ke lib/j48.ts

import type {{ RecommendationLabel }} from "@/types/beach";

export function predictC45({{
  suasana_score,
  fasilitas_score,
  akses_score,
  popularitas_score,
}}: {{
  suasana_score: number;
  fasilitas_score: number;
  akses_score: number;
  popularitas_score: number;
}}): RecommendationLabel {{
{body}
}}
"""


# ---------------------------------------------------------------------------
# Evaluasi 5-fold CV
# ---------------------------------------------------------------------------

def evaluate_cv(X, y, features, n_splits=5, min_leaf=2):
    skf = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42)
    all_true, all_pred = [], []
    fold_accuracies = []
    for fold, (tr, te) in enumerate(skf.split(X, y), 1):
        X_tr, X_te = X.iloc[tr], X.iloc[te]
        y_tr, y_te = list(y[tr]), list(y[te])
        root = build_tree(X_tr, y_tr, features)
        root = prune(root, X_tr, y_tr)
        preds = predict(root, X_te)
        acc = (preds == np.array(y_te)).mean()
        fold_accuracies.append(acc)
        print(f"  Fold {fold}: accuracy = {acc:.4f}")
        all_true.extend(y_te)
        all_pred.extend(preds)
    target_names = [LABEL_MAP[i] for i in sorted(LABEL_MAP.keys())]
    if isinstance(all_true[0], str):
        all_true_enc = [LABEL_ORDER[v] for v in all_true]
        all_pred_enc = [LABEL_ORDER[v] for v in all_pred]
    else:
        all_true_enc, all_pred_enc = all_true, all_pred
    print("\nClassification Report (gabungan semua fold):")
    report_str = classification_report(all_true_enc, all_pred_enc, target_names=target_names, zero_division=0)
    print(report_str)
    print("Confusion Matrix:")
    cm = confusion_matrix(all_true_enc, all_pred_enc)
    print(cm)
    return fold_accuracies, all_true_enc, all_pred_enc, target_names, cm


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    OUTPUT_DIR = Path(__file__).parent / "output_c45"
    OUTPUT_DIR.mkdir(exist_ok=True)

    DATA_FILE = Path(__file__).parent / "data_pantai.xlsx"
    FEATURES = ["suasana_score", "fasilitas_score", "akses_score", "popularitas_score"]

    if DATA_FILE.exists():
        print(f"[INFO] Memuat data dari {DATA_FILE}")
        df = pd.read_excel(DATA_FILE)
    else:
        print("[WARN] File data_pantai.xlsx tidak ditemukan — menggunakan data sintetis 39 baris (skala 1-3)")
        rng = np.random.default_rng(42)
        n = 39
        df = pd.DataFrame({
            "suasana_score":    rng.integers(1, 4, n),
            "fasilitas_score":  rng.integers(1, 4, n),
            "akses_score":      rng.integers(1, 4, n),
            "popularitas_score": rng.integers(1, 4, n),
        })

    for col in FEATURES:
        if col not in df.columns:
            raise ValueError(f"Kolom '{col}' tidak ditemukan di data.")

    if "label" not in df.columns:
        print("[INFO] Kolom 'label' tidak ada — auto-label dengan jumlah fasilitas+popularitas")
        df["label"] = df.apply(
            lambda r: "sangat_direkomendasikan" if (r["popularitas_score"] >= 3 and r["fasilitas_score"] >= 2)
            else "tidak_direkomendasikan" if (r["popularitas_score"] == 1 and r["suasana_score"] == 1)
            else "direkomendasikan",
            axis=1,
        )

    X = df[FEATURES]
    # Cek apakah label sudah berupa string atau masih integer
    sample = df["label"].iloc[0]
    if isinstance(sample, str):
        y = df["label"].values
    else:
        y = np.array([LABEL_MAP[int(v)] for v in df["label"].values])

    print(f"\n[INFO] Dataset: {len(df)} sampel, {len(FEATURES)} fitur")
    print(f"[INFO] Distribusi label: {dict(Counter(y))}")

    # Evaluasi CV
    print("\n[INFO] Evaluasi 5-fold CV:")
    fold_accs, all_true_enc, all_pred_enc, target_names, cm = evaluate_cv(X, y, FEATURES)

    # Model final pada seluruh data
    print("\n[INFO] Training model final pada seluruh data...")
    root = build_tree(X, y, FEATURES)
    root = prune(root, X, y)

    print(f"\n[INFO] Pohon setelah pruning:")
    print(f"  Kedalaman: {tree_depth(root)}")
    print(f"  Jumlah daun: {count_leaves(root)}")
    feat_map = {f: f for f in FEATURES}
    print_tree(root, feat_map)

    # Export TypeScript
    ts_code = tree_to_typescript(root)
    ts_path = OUTPUT_DIR / "predictJ48.ts"
    ts_path.write_text(ts_code, encoding="utf-8")
    print(f"\n[OK] TypeScript -> {ts_path}")

    # Export teks pohon
    text_lines = tree_to_text(root, feat_map)
    txt_path = OUTPUT_DIR / "tree_text.txt"
    txt_path.write_text("\n".join(text_lines), encoding="utf-8")
    print(f"[OK] Tree text -> {txt_path}")

    # ── Visualisasi ──────────────────────────────────────────────────────────
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        import matplotlib.patches as mpatches
        from sklearn.metrics import classification_report as cr_dict

        report = cr_dict(all_true_enc, all_pred_enc,
                         target_names=target_names, zero_division=0, output_dict=True)

        label_short = ["Tidak\nDirek.", "Direk.", "Sangat\nDirek."]
        colors_cls  = ["#EF4444", "#F59E0B", "#22C55E"]

        fig, axes = plt.subplots(1, 3, figsize=(18, 5))
        fig.suptitle("Hasil Evaluasi Model C4.5 — Rekomendasi Pantai Batam",
                     fontsize=14, fontweight="bold", y=1.02)

        # ── Panel 1: Accuracy per Fold ───────────────────────────────────────
        ax1 = axes[0]
        folds = [f"Fold {i+1}" for i in range(len(fold_accs))]
        bar_colors = ["#22C55E" if a == 1.0 else "#F59E0B" for a in fold_accs]
        bars = ax1.bar(folds, [a * 100 for a in fold_accs],
                       color=bar_colors, edgecolor="white", linewidth=1.2, width=0.55)
        ax1.set_ylim(0, 110)
        ax1.set_ylabel("Accuracy (%)", fontsize=11)
        ax1.set_title("Accuracy per Fold (5-Fold CV)", fontsize=12, fontweight="bold")
        ax1.axhline(y=100, color="#94A3B8", linestyle="--", linewidth=0.8, alpha=0.6)
        avg_acc = np.mean(fold_accs) * 100
        ax1.axhline(y=avg_acc, color="#6366F1", linestyle="-", linewidth=1.5,
                    label=f"Rata-rata: {avg_acc:.1f}%")
        for bar, acc in zip(bars, fold_accs):
            ax1.text(bar.get_x() + bar.get_width() / 2, bar.get_height() + 1.5,
                     f"{acc*100:.1f}%", ha="center", va="bottom", fontsize=10, fontweight="bold")
        ax1.legend(fontsize=9)
        ax1.set_facecolor("#F8FAFC")
        ax1.grid(axis="y", alpha=0.3)
        ax1.spines[["top", "right"]].set_visible(False)

        # ── Panel 2: Precision / Recall / F1 per Kelas ──────────────────────
        ax2 = axes[1]
        metrics = ["precision", "recall", "f1-score"]
        x = np.arange(len(target_names))
        width = 0.25
        metric_colors = ["#3B82F6", "#8B5CF6", "#EC4899"]
        for i, (m, col) in enumerate(zip(metrics, metric_colors)):
            vals = [report[t][m] * 100 for t in target_names]
            rects = ax2.bar(x + i * width, vals, width,
                            label=m.capitalize(), color=col, alpha=0.85, edgecolor="white")
            for rect, v in zip(rects, vals):
                ax2.text(rect.get_x() + rect.get_width() / 2, rect.get_height() + 1,
                         f"{v:.0f}", ha="center", va="bottom", fontsize=8)
        ax2.set_xticks(x + width)
        ax2.set_xticklabels(label_short, fontsize=10)
        ax2.set_ylim(0, 115)
        ax2.set_ylabel("Nilai (%)", fontsize=11)
        ax2.set_title("Precision / Recall / F1 per Kelas", fontsize=12, fontweight="bold")
        ax2.legend(fontsize=9)
        ax2.set_facecolor("#F8FAFC")
        ax2.grid(axis="y", alpha=0.3)
        ax2.spines[["top", "right"]].set_visible(False)

        # ── Panel 3: Confusion Matrix ────────────────────────────────────────
        ax3 = axes[2]
        im = ax3.imshow(cm, interpolation="nearest", cmap="Blues")
        plt.colorbar(im, ax=ax3, fraction=0.046, pad=0.04)
        ax3.set_xticks(range(len(target_names)))
        ax3.set_yticks(range(len(target_names)))
        ax3.set_xticklabels(label_short, fontsize=9)
        ax3.set_yticklabels(label_short, fontsize=9)
        ax3.set_xlabel("Prediksi", fontsize=11)
        ax3.set_ylabel("Aktual", fontsize=11)
        ax3.set_title("Confusion Matrix", fontsize=12, fontweight="bold")
        thresh = cm.max() / 2.0
        for i in range(cm.shape[0]):
            for j in range(cm.shape[1]):
                color = "white" if cm[i, j] > thresh else "#1E293B"
                mark = " ✓" if i == j else ""
                ax3.text(j, i, f"{cm[i, j]}{mark}",
                         ha="center", va="center", fontsize=13,
                         fontweight="bold", color=color)

        plt.tight_layout()
        chart_path = OUTPUT_DIR / "evaluation_chart.png"
        fig.savefig(chart_path, dpi=150, bbox_inches="tight",
                    facecolor="white", edgecolor="none")
        plt.close(fig)
        print(f"[OK] Chart -> {chart_path}")

    except ImportError:
        print("[SKIP] matplotlib tidak tersedia — skip chart.")

    print("\n[DONE] Salin ml/output_c45/predictJ48.ts ke lib/j48.ts lalu restart server.")


if __name__ == "__main__":
    main()
