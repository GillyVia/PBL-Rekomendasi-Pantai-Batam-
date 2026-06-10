"""
C4.5 / J48 Training Pipeline — BatamPantai Recommendation System
Menggunakan scikit-learn DecisionTreeClassifier dengan criterion='entropy' (ID3/C4.5).

Cara pakai:
  pip install scikit-learn pandas openpyxl matplotlib
  python ml/c45_pipeline.py
"""

import json
import os
import sys
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedKFold, GridSearchCV
from sklearn.tree import DecisionTreeClassifier, export_text, plot_tree
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.preprocessing import LabelEncoder

OUTPUT_DIR = Path(__file__).parent / "output_c45"
OUTPUT_DIR.mkdir(exist_ok=True)

# ---------------------------------------------------------------------------
# 1. Load / generate data
# ---------------------------------------------------------------------------

DATA_FILE = Path(__file__).parent / "data_pantai.xlsx"

LABEL_MAP = {
    0: "tidak_direkomendasikan",
    1: "direkomendasikan",
    2: "sangat_direkomendasikan",
}


def domain_label(row: pd.Series) -> int:
    """Auto-label menggunakan aturan domain."""
    score = (
        row["suasana_score"]
        + row["fasilitas_score"]
        + row["akses_score"]
        + row["popularitas_score"]
    )
    if score >= 16:
        return 2  # sangat_direkomendasikan
    elif score >= 10:
        return 1  # direkomendasikan
    else:
        return 0  # tidak_direkomendasikan


def load_data() -> pd.DataFrame:
    if DATA_FILE.exists():
        print(f"[INFO] Memuat data dari {DATA_FILE}")
        df = pd.read_excel(DATA_FILE)
    else:
        print("[INFO] File Excel tidak ditemukan — menggunakan data sintetis.")
        rng = np.random.default_rng(42)
        n = 120
        df = pd.DataFrame(
            {
                "pantai_id": [f"pantai_{i}" for i in range(n)],
                "suasana_score": rng.integers(1, 6, n),
                "fasilitas_score": rng.integers(1, 6, n),
                "akses_score": rng.integers(1, 6, n),
                "popularitas_score": rng.integers(1, 6, n),
            }
        )

    # Pastikan kolom skor ada
    feature_cols = ["suasana_score", "fasilitas_score", "akses_score", "popularitas_score"]
    for col in feature_cols:
        if col not in df.columns:
            raise ValueError(f"Kolom '{col}' tidak ditemukan di data.")

    # Auto-label jika kolom label tidak ada
    if "label" not in df.columns:
        print("[INFO] Kolom 'label' tidak ditemukan — auto-labeling dengan aturan domain.")
        df["label"] = df.apply(domain_label, axis=1)

    # Encode label jika berupa string
    if df["label"].dtype == object:
        le = LabelEncoder()
        df["label"] = le.fit_transform(df["label"])

    return df


# ---------------------------------------------------------------------------
# 2. Train & Evaluate
# ---------------------------------------------------------------------------

def train(df: pd.DataFrame) -> DecisionTreeClassifier:
    feature_cols = ["suasana_score", "fasilitas_score", "akses_score", "popularitas_score"]
    X = df[feature_cols].values
    y = df["label"].values

    print(f"\n[INFO] Dataset: {len(df)} sampel, {len(feature_cols)} fitur")
    print(f"[INFO] Distribusi label: {dict(zip(*np.unique(y, return_counts=True)))}")

    # Hyperparameter search
    param_grid = {"max_depth": [2, 3, 4, 5, None]}
    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    base = DecisionTreeClassifier(criterion="entropy", random_state=42)
    gs = GridSearchCV(base, param_grid, cv=skf, scoring="f1_macro", n_jobs=-1)
    gs.fit(X, y)

    best_depth = gs.best_params_["max_depth"]
    print(f"\n[INFO] max_depth terbaik: {best_depth}  (F1-macro: {gs.best_score_:.4f})")

    # Final model
    model = DecisionTreeClassifier(criterion="entropy", max_depth=best_depth, random_state=42)
    model.fit(X, y)

    # 5-fold evaluation
    print("\n[INFO] Evaluasi 5-fold cross-validation:")
    all_true, all_pred = [], []
    for fold, (tr, te) in enumerate(skf.split(X, y), 1):
        clf = DecisionTreeClassifier(criterion="entropy", max_depth=best_depth, random_state=42)
        clf.fit(X[tr], y[tr])
        pred = clf.predict(X[te])
        all_true.extend(y[te])
        all_pred.extend(pred)
        acc = (pred == y[te]).mean()
        print(f"  Fold {fold}: accuracy = {acc:.4f}")

    target_names = [LABEL_MAP[i] for i in sorted(LABEL_MAP.keys())]
    print("\n[INFO] Classification Report (gabungan semua fold):")
    print(classification_report(all_true, all_pred, target_names=target_names, zero_division=0))

    print("[INFO] Confusion Matrix:")
    print(confusion_matrix(all_true, all_pred))

    return model


# ---------------------------------------------------------------------------
# 3. Export ke TypeScript
# ---------------------------------------------------------------------------

def tree_to_typescript(model: DecisionTreeClassifier, feature_names: list[str]) -> str:
    """Konversi decision tree ke fungsi TypeScript rekursif."""
    tree = model.tree_
    label_names = [LABEL_MAP[i] for i in range(len(LABEL_MAP))]

    def recurse(node: int, depth: int) -> list[str]:
        indent = "  " * (depth + 1)
        lines = []

        if tree.feature[node] == -2:  # leaf
            class_idx = int(np.argmax(tree.value[node]))
            label = label_names[class_idx] if class_idx < len(label_names) else "direkomendasikan"
            n_samples = int(tree.n_node_samples[node])
            entropy = float(tree.impurity[node])
            lines.append(f"{indent}// n={n_samples}, entropy={entropy:.6f}")
            lines.append(f'{indent}return "{label}"; // {label.replace("_", " ").title()}')
        else:
            feat = feature_names[tree.feature[node]]
            threshold = tree.threshold[node]
            lines.append(f"{indent}if ({feat} <= {threshold:.1f}) {{")
            lines.extend(recurse(tree.children_left[node], depth + 1))
            lines.append(f"{indent}}} else {{")
            lines.extend(recurse(tree.children_right[node], depth + 1))
            lines.append(f"{indent}}}")

        return lines

    body_lines = recurse(0, 0)
    body = "\n".join(body_lines)

    ts = f"""// AUTO-GENERATED dari c45_pipeline.py — JANGAN EDIT MANUAL
// Tempel ke dalam fungsi predictJ48() di lib/j48.ts

export type RecommendationLabel =
  | "tidak_direkomendasikan"
  | "direkomendasikan"
  | "sangat_direkomendasikan";

export function predictJ48({{
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
    return ts


# ---------------------------------------------------------------------------
# 4. Export ke JSON
# ---------------------------------------------------------------------------

def tree_to_json(model: DecisionTreeClassifier, feature_names: list[str]) -> dict:
    tree = model.tree_

    def recurse(node: int) -> dict:
        if tree.feature[node] == -2:
            class_idx = int(np.argmax(tree.value[node]))
            return {
                "type": "leaf",
                "label": LABEL_MAP.get(class_idx, "direkomendasikan"),
                "samples": int(tree.n_node_samples[node]),
                "impurity": round(float(tree.impurity[node]), 6),
            }
        return {
            "type": "split",
            "feature": feature_names[tree.feature[node]],
            "threshold": round(float(tree.threshold[node]), 4),
            "left": recurse(tree.children_left[node]),
            "right": recurse(tree.children_right[node]),
        }

    return recurse(0)


# ---------------------------------------------------------------------------
# 5. Main
# ---------------------------------------------------------------------------

def main():
    df = load_data()
    feature_names = ["suasana_score", "fasilitas_score", "akses_score", "popularitas_score"]

    model = train(df)

    # Export TypeScript
    ts_code = tree_to_typescript(model, feature_names)
    ts_path = OUTPUT_DIR / "predictJ48.ts"
    ts_path.write_text(ts_code, encoding="utf-8")
    print(f"\n[OK] TypeScript ditulis ke {ts_path}")

    # Export JSON
    tree_json = tree_to_json(model, feature_names)
    json_path = OUTPUT_DIR / "tree.json"
    json_path.write_text(json.dumps(tree_json, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"[OK] JSON ditulis ke {json_path}")

    # Export text representation
    text_path = OUTPUT_DIR / "tree_text.txt"
    text_path.write_text(
        export_text(model, feature_names=feature_names),
        encoding="utf-8",
    )
    print(f"[OK] Tree text ditulis ke {text_path}")

    # Export PNG (optional)
    try:
        import matplotlib
        matplotlib.use("Agg")
        import matplotlib.pyplot as plt

        label_names = [LABEL_MAP[i] for i in sorted(LABEL_MAP.keys())]
        fig, ax = plt.subplots(figsize=(16, 8))
        plot_tree(
            model,
            feature_names=feature_names,
            class_names=label_names,
            filled=True,
            rounded=True,
            ax=ax,
        )
        fig.tight_layout()
        png_path = OUTPUT_DIR / "tree_visualization.png"
        fig.savefig(png_path, dpi=150, bbox_inches="tight")
        plt.close(fig)
        print(f"[OK] PNG ditulis ke {png_path}")
    except ImportError:
        print("[SKIP] matplotlib tidak tersedia — skip PNG export.")

    print("\n[DONE] Pipeline selesai.")


if __name__ == "__main__":
    main()
