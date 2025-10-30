// src/main.ts
const input = document.getElementById("tanggal-lahir");
const hasil = document.getElementById("hasil");
const detail = document.getElementById("detail");
function clampToValidDate(y, m, d) {
    // Menghindari problem 29 Feb di tahun non-kabisat: fallback ke 28 Feb
    const dt = new Date(y, m, d);
    if (dt.getMonth() !== m)
        return new Date(y, m, 0); // hari 0 = akhir bulan sebelumnya
    return dt;
}
function formatAge(from, to) {
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();
    if (days < 0) {
        const daysInPrevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
        days += daysInPrevMonth;
        months -= 1;
    }
    if (months < 0) {
        months += 12;
        years -= 1;
    }
    return { years, months, days };
}
function nextBirthday(birth, now) {
    const thisYear = now.getFullYear();
    const m = birth.getMonth();
    const d = birth.getDate();
    let candidate = clampToValidDate(thisYear, m, d);
    if (candidate < new Date(thisYear, now.getMonth(), now.getDate())) {
        candidate = clampToValidDate(thisYear + 1, m, d);
    }
    // hitung selisih hari (normalisasi ke “tanggal lokal murni”)
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const end = new Date(candidate.getFullYear(), candidate.getMonth(), candidate.getDate());
    const days = Math.round((end.getTime() - start.getTime()) / 86400000);
    return { date: candidate, daysUntil: days };
}
function getZodiacWestern(birth) {
    const m = birth.getMonth() + 1;
    const d = birth.getDate();
    // rentang batas (mmdd)
    const md = m * 100 + d;
    if (md >= 321 && md <= 419)
        return "Aries";
    if (md >= 420 && md <= 520)
        return "Taurus";
    if (md >= 521 && md <= 620)
        return "Gemini";
    if (md >= 621 && md <= 722)
        return "Cancer";
    if (md >= 723 && md <= 822)
        return "Leo";
    if (md >= 823 && md <= 922)
        return "Virgo";
    if (md >= 923 && md <= 1022)
        return "Libra";
    if (md >= 1023 && md <= 1121)
        return "Scorpio";
    if (md >= 1122 && md <= 1221)
        return "Sagittarius";
    // Capricorn belah tahun
    if (md >= 1222 || md <= 119)
        return "Capricorn";
    if (md >= 120 && md <= 218)
        return "Aquarius";
    return "Pisces"; // 2/19–3/20
}
function getShioChinese(year) {
    // Urutan dimulai dari Tikus = 0 (tahun 2008 sebagai referensi Tikus)
    const animals = [
        "Tikus",
        "Kerbau",
        "Macan",
        "Kelinci",
        "Naga",
        "Ular",
        "Kuda",
        "Kambing",
        "Monyet",
        "Ayam",
        "Anjing",
        "Babi",
    ];
    const idx = (year - 2008) % 12;
    const norm = (idx + 12) % 12;
    return animals[norm];
}
function showMain(text) {
    if (!hasil)
        return;
    hasil.textContent = text;
    hasil.classList.remove("opacity-0");
    hasil.classList.add("opacity-100");
}
function showDetail(html) {
    if (!detail)
        return;
    detail.innerHTML = html;
    detail.classList.remove("opacity-0");
    detail.classList.add("opacity-100");
}
function handleChange() {
    if (!input)
        return;
    if (!input.value) {
        showMain("Silakan pilih tanggal lahir.");
        showDetail("");
        return;
    }
    const birth = new Date(input.value);
    if (isNaN(birth.getTime())) {
        showMain("Tanggal tidak valid.");
        showDetail("");
        return;
    }
    // “Tanggal lokal murni” untuk akurasi harian
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    if (birth > today) {
        showMain("Tanggal lahir tidak boleh di masa depan.");
        showDetail("");
        return;
    }
    const { years, months, days } = formatAge(birth, today);
    const { date: nextBD, daysUntil } = nextBirthday(birth, today);
    const usiaSaatUltah = years + (months > 0 || days > 0 ? 1 : 0); // atau simply years+1 kecuali ulang tahunnya hari ini
    const zodiak = getZodiacWestern(birth);
    const shio = getShioChinese(birth.getFullYear());
    // Jika ulang tahun tepat hari ini
    const isToday = nextBD.getFullYear() === today.getFullYear() &&
        nextBD.getMonth() === today.getMonth() &&
        nextBD.getDate() === today.getDate();
    showMain(isToday
        ? `Selamat ulang tahun! 🎉 Usia kamu resmi ${years} tahun.`
        : `Usiamu: ${years} tahun, ${months} bulan, ${days} hari.`);
    const fmt = nextBD.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    showDetail(`
    <div class="space-y-1 text-left">
      <div><span class="font-semibold">Zodiak:</span> ${zodiak} • <span class="font-semibold">Shio:</span> ${shio}</div>
      <div><span class="font-semibold">Ulang tahun berikutnya:</span> ${fmt}</div>
      <div><span class="font-semibold">Hitung mundur:</span> ${daysUntil} hari lagi</div>
      <div><span class="font-semibold">Usia saat ultah nanti:</span> ${usiaSaatUltah} tahun</div>
    </div>
  `);
}
function init() {
    input?.addEventListener("change", handleChange);
    input?.addEventListener("input", handleChange);
    if (input?.value)
        handleChange();
}
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
}
else {
    init();
}
export {};
