import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Cache beach data 1 jam agar tidak query DB tiap pesan
let beachCache: { text: string; expiry: number } | null = null;

async function getBeachContext(): Promise<string> {
  const now = Date.now();
  if (beachCache && beachCache.expiry > now) return beachCache.text;

  const [rows] = await db.query(`
    SELECT
      p.nama_pantai,
      p.rating,
      p.jumlah_ulasan,
      p.tiket_masuk,
      p.tiket_masuk_rp,
      p.jarak_dari_kota,
      p.jarak_label,
      p.jam_buka,
      p.akses_jalan,
      p.highlight,
      p.deskripsi_singkat,
      p.aktivitas,
      p.cocok_untuk,
      k.nama_kecamatan,
      kr.label_rekomendasi
    FROM pantai p
    LEFT JOIN kecamatan k ON p.id_kecamatan = k.id_kecamatan
    LEFT JOIN kategori_rekomendasi kr ON p.id_pantai = kr.id_pantai
    ORDER BY p.rating DESC
  `);

  const beaches = rows as Record<string, unknown>[];
  const lines = beaches.map((b) => {
    const aktivitas = b.aktivitas
      ? (JSON.parse(b.aktivitas as string) as string[]).join(", ")
      : "-";
    const cocok = b.cocok_untuk
      ? (JSON.parse(b.cocok_untuk as string) as string[]).join(", ")
      : "-";
    const tiket =
      Number(b.tiket_masuk_rp) > 0
        ? `Rp ${Number(b.tiket_masuk_rp).toLocaleString("id-ID")}`
        : String(b.tiket_masuk ?? "Gratis");
    const label = String(b.label_rekomendasi ?? "").replace(/_/g, " ");
    return `• ${b.nama_pantai} [${b.nama_kecamatan}] | Rating: ${b.rating}/5 (${b.jumlah_ulasan} ulasan) | Tiket: ${tiket} | Jarak: ${b.jarak_label ?? b.jarak_dari_kota + "km"} | Jam: ${b.jam_buka} | Akses: ${b.akses_jalan} | Cocok untuk: ${cocok} | Aktivitas: ${aktivitas} | Status AI: ${label} | Highlight: ${b.highlight}`;
  });

  const text = lines.join("\n");
  beachCache = { text, expiry: now + 3_600_000 };
  return text;
}

const SYSTEM_PROMPT_BASE = `Kamu adalah WavesAI, asisten wisata pantai Batam yang ramah, cerdas, dan informatif.
Bantu wisatawan menemukan pantai terbaik sesuai kebutuhan mereka.

ATURAN:
1. Jawab dalam Bahasa Indonesia yang ramah dan natural, boleh gunakan emoji
2. Gunakan data pantai di bawah — jangan mengarang informasi yang tidak ada di data
3. Jawaban singkat dan informatif (2-4 kalimat), fokus pada pertanyaan
4. Di akhir setiap jawaban tambahkan saran pertanyaan lanjutan PERSIS dalam format ini (tidak boleh diubah):
   [SARAN: pertanyaan1 | pertanyaan2 | pertanyaan3]
5. Jika ditanya hal di luar wisata pantai Batam, sopan alihkan kembali ke topik pantai

DATA PANTAI BATAM:
`;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      message: string;
      history?: Array<{ role: "user" | "model"; parts: string }>;
    };

    const { message, history = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { success: false, error: "Pesan tidak boleh kosong" },
        { status: 400 },
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { success: false, error: "API key tidak dikonfigurasi" },
        { status: 500 },
      );
    }

    const beachContext = await getBeachContext();
    const systemPrompt = SYSTEM_PROMPT_BASE + beachContext;

    const groq = new Groq({ apiKey });

    // Konversi history percakapan ke format Groq (OpenAI-compatible)
    const chatHistory: Groq.Chat.ChatCompletionMessageParam[] = history.map((h) => ({
      role: h.role === "model" ? "assistant" : "user",
      content: h.parts,
    }));

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemPrompt },
        ...chatHistory,
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 512,
    });

    const rawText = completion.choices[0]?.message?.content ?? "";

    // Ekstrak [SARAN: ...] dari akhir teks
    const saranMatch = rawText.match(/\[SARAN:([\s\S]*?)\]/);
    const suggestions = saranMatch
      ? saranMatch[1]
          .split("|")
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, 3)
      : [];
    const reply = rawText.replace(/\[SARAN:[\s\S]*?\]/, "").trim();

    return NextResponse.json({ success: true, reply, suggestions });
  } catch (err) {
    console.error("Chatbot API error:", err);

    const errMsg = err instanceof Error ? err.message : String(err);

    if (errMsg.includes("429") || errMsg.includes("Too Many Requests") || errMsg.includes("quota")) {
      return NextResponse.json(
        { success: false, error: "API sedang sibuk. Coba lagi dalam beberapa detik." },
        { status: 429 },
      );
    }

    if (errMsg.includes("401") || errMsg.includes("403") || errMsg.includes("invalid_api_key")) {
      return NextResponse.json(
        { success: false, error: "API key tidak valid. Periksa konfigurasi GROQ_API_KEY." },
        { status: 401 },
      );
    }

    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan, silakan coba lagi." },
      { status: 500 },
    );
  }
}
