import { hitungUsiaLengkap } from "./hitungUsia.js";

document.addEventListener("DOMContentLoaded", () => {
  const inputTanggal = document.getElementById(
    "tanggal-lahir"
  ) as HTMLInputElement | null;
  const output = document.getElementById(
    "hasil"
  ) as HTMLParagraphElement | null;

  if (!inputTanggal || !output) {
    console.error("Elemen #tanggal-lahir atau #hasil tidak ditemukan.");
    return;
  }

  const show = (teks: string) => {
    output.textContent = teks;
    // lepas transparansi supaya terlihat
    output.classList.remove("opacity-0");
    // jaga-jaga kalau style inline pernah ter-set
    (output.style as CSSStyleDeclaration).opacity = "1";
  };

  const hide = (teks: string) => {
    output.textContent = teks;
    output.classList.add("opacity-0");
  };

  const render = () => {
    if (!inputTanggal.value) {
      hide("Silakan pilih tanggal lahir.");
      return;
    }
    const t = new Date(inputTanggal.value);
    if (isNaN(t.getTime())) {
      hide("Tanggal tidak valid.");
      return;
    }
    const usia = hitungUsiaLengkap(
      t.getFullYear(),
      t.getMonth() + 1,
      t.getDate()
    );
    show(`Umurmu ${usia.tahun} tahun, ${usia.bulan} bulan, ${usia.hari} hari.`);
  };

  // update saat user memilih tanggal (tanpa tombol)
  inputTanggal.addEventListener("input", render);
  inputTanggal.addEventListener("change", render); // beberapa browser memicu ini

  // render awal (kalau input sudah terisi dari cache/browser)
  render();
});
