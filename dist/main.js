// src/main.ts
const input = document.getElementById("tanggal-lahir");
const hasil = document.getElementById("hasil");
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
function show(text) {
    if (!hasil)
        return;
    hasil.textContent = text;
    hasil.classList.remove("opacity-0");
    hasil.classList.add("opacity-100");
}
function handleChange() {
    if (!input)
        return;
    if (!input.value) {
        show("Silakan pilih tanggal lahir.");
        return;
    }
    const birth = new Date(input.value);
    if (isNaN(birth.getTime())) {
        show("Tanggal tidak valid.");
        return;
    }
    const now = new Date();
    if (birth > now) {
        show("Tanggal lahir tidak boleh di masa depan.");
        return;
    }
    const { years, months, days } = formatAge(birth, now);
    show(`Usiamu: ${years} tahun, ${months} bulan, ${days} hari.`);
}
// Pastikan event terpasang setelah DOM siap
function init() {
    input?.addEventListener("change", handleChange);
    input?.addEventListener("input", handleChange);
    // Jika sudah ada nilai (mis. browser mengingat), langsung hitung
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
