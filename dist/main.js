console.log("[main] script loaded");
function $(id) {
    const el = document.getElementById(id);
    if (!el)
        console.error(`[main] element #${id} NOT FOUND`);
    return el;
}
const input = $("tanggal-lahir");
const hasil = $("hasil");
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
    console.log("[main] show ->", text);
    hasil.textContent = text;
    hasil.classList.remove("opacity-0");
    hasil.classList.add("opacity-100");
}
function handleChange() {
    try {
        console.log("[main] handleChange fired");
        if (!input) {
            console.error("[main] input is null");
            return;
        }
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
    catch (e) {
        console.error("[main] error in handleChange:", e);
        show("Terjadi kesalahan tak terduga.");
    }
}
function init() {
    console.log("[main] init start");
    if (!input) {
        console.error("[main] input not found at init");
        return;
    }
    input.addEventListener("change", handleChange);
    input.addEventListener("input", handleChange);
    if (input.value)
        handleChange();
    console.log("[main] init done");
}
if (document.readyState === "loading") {
    console.log("[main] waiting DOMContentLoaded");
    document.addEventListener("DOMContentLoaded", init);
}
else {
    init();
}
export {};
