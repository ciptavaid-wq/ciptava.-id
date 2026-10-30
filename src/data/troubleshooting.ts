import { TroubleshootingItem } from '../types';

export const TROUBLESHOOTING_GUIDE: TroubleshootingItem[] = [
  {
    id: 'ts_1',
    category: 'Frame Bocor',
    problem: 'Objek Meleleh / Morf Berantakan di Pertengahan Klip (Frame Bocor)',
    symptom: 'Di detik ke-3 sampai ke-5, tiang atau dinding tiba-tiba memuai seperti agar-agar atau meleleh tak beraturan.',
    instantFix: 'JANGAN RENDER ULANG SELURUH KLIP! Ekspor 1 frame persis 0.2 detik sebelum meleleh di CapCut, buka Photoroom/Inpainting untuk meluruskan garis pilar secara instan, lalu jadikan frame baru tersebut sebagai titik potong (cut-point) atau buat transisi micro speed ramp 10x kecepatan pada 4 frame yang rusak.',
    preventionPrompt: 'Kunci prompt dengan kalimat: "Structural accuracy (mandatory): no melting or warping structures, no distorted proportions, rigid solid architectural geometry, locked straight verticals."',
    creditCostAvoided: 'Menghemat 10 - 20 video render credits (senilai ~$2 - $5 per klip).',
  },
  {
    id: 'ts_2',
    category: 'Skala / Perspektif',
    problem: 'Ukuran Bangunan Melompat / Berubah Skala Antar Klip (Scale Jumping)',
    symptom: 'Saat beralih dari Klip 1 ke Klip 2, rumah terlihat tiba-tiba mengecil 20% atau garis horizon berpindah ke bawah.',
    instantFix: 'Di CapCut/Premiere: gunakan fitur "Transform & Scale". Turunkan opacity klip kedua menjadi 50%, lalu geser zoom (misal 108%) dan posisikan hingga garis batas tanah dan sudut fondasi menempel presisi dengan klip pertama. Kembalikan opacity ke 100%.',
    preventionPrompt: 'Wajib sertakan: "Footprint & scale lock (mandatory regardless of construction progress): exact footprint size, shape, orientation, and number of floors must precisely match the completed structure - never larger or smaller."',
    creditCostAvoided: 'Mencegah re-generate 4 keyframe foto dan 2 video klip baru.',
  },
  {
    id: 'ts_3',
    category: 'Pekerja Hantu',
    problem: 'Pekerja Muncul & Hilang Sekejap Seperti Hantu (Ghosting Artifacts)',
    symptom: 'Sosok orang terlihat setengah transparan, bertangan tiga, atau tiba-tiba hilang di tengah layar.',
    instantFix: 'Pilih salah satu solusi cepat: (1) Ubah mode aktor ke "Solo Creator 1 Orang" atau "Tanpa Pekerja (Alat Berat)", atau (2) Jika sudah terlanjur dirender, gunakan motion blur filter di CapCut (Blur 60, Direction Vertical) sehingga siluet manusia berubah menjadi jejak cahaya hyperlapse yang estetik.',
    preventionPrompt: 'Gunakan: "Workers blurred with natural long-exposure timelapse motion blur, high shutter speed hyperlapse effect, human figures never stationary or frozen."',
    creditCostAvoided: 'Menghemat 15 credits Kling AI.',
  },
  {
    id: 'ts_4',
    category: 'Flicker & Glitch',
    problem: 'Lampu & Langit Berkedip Cepat (Severe Light Flickering)',
    symptom: 'Pencahayaan berpindah drastis dari terang ke gelap setiap 2 frame seperti kilat yang menyilaukan mata.',
    instantFix: 'Di CapCut Desktop: klik klip video ➔ pilih tab "Video" ➔ aktifkan "Reduce Noise" atau "Deflicker" pada preset Level 1. Jika di DaVinci Resolve: gunakan OpenFX OFX Deflicker (Timelapse mode).',
    preventionPrompt: 'Gunakan: "Consistent natural daylight continuity, smooth sun path progression, stable global illumination, no strobe or flashing light."',
    creditCostAvoided: 'Memperbaiki 100% klip mentah tanpa render ulang sepeser pun.',
  },
  {
    id: 'ts_5',
    category: 'Hemat Credit',
    problem: 'Credit Cepat Habis Namun Hasil Masih Belum Konsisten',
    symptom: 'Sudah menghabiskan 500 kredit Kling/Runway tetapi tidak ada 1 pun klip yang bisa disambung.',
    instantFix: 'Gunakan strategi "2-Second Test Render": render klip dalam durasi paling pendek (5 detik) dengan resolusi standard (720p). Setelah yakin alur transisinya mulus, baru render final 1080p Professional. Untuk gambar keyframe, uji coba prompt di model gratisan (seperti Flux Schnell) sebelum menggunakan kuota Fast Midjourney.',
    preventionPrompt: 'Simpan template prompt presisi dari aplikasi ini di catatan agar tidak mengetik ulang atau bereksperimen dari nol.',
    creditCostAvoided: 'Menghemat hingga 70% pengeluaran langganan AI setiap bulannya.',
  },
];
