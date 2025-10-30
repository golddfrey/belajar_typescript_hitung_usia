const input = document.getElementById(
  "tanggal-lahir"
) as HTMLInputElement | null;
const hasil = document.getElementById("hasil") as HTMLElement | null;

function formatAge(from: Date, to: Date) {
  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    // pinjam hari dari bulan sebelumnya
    const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
    days += prevMonth;
    months -= 1;
  }
  if (months < 0) {
    months += 12;
    years -= 1;
  }
  return { years, months, days };
}

function show(text: string) {
  if (!hasil) return;
  hasil.textContent = text;
  // tampilkan dengan mulus: hapus opacity-0 kalau ada
  hasil.classList.remove("opacity-0");
  hasil.classList.add("opacity-100");
}

function handleChange() {
  if (!input || !input.value) {
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
    show("Hei waktu-waktu: tanggal lahir tidak boleh di masa depan.");
    return;
  }
  const { years, months, days } = formatAge(birth, now);
  show(`Usiamu: ${years} tahun, ${months} bulan, ${days} hari.`);
}

// pastikan elemen ada, lalu pasang event
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    input?.addEventListener("change", handleChange);
  });
} else {
  input?.addEventListener("change", handleChange);
}
