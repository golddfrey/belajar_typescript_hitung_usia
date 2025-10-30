export function hitungUsiaLengkap(
  tahunLahir: number,
  bulanLahir: number = 1,
  hariLahir: number = 1,
  referensi: Date = new Date()
): { tahun: number; bulan: number; hari: number } {
  if (!Number.isFinite(tahunLahir) || !Number.isInteger(tahunLahir)) {
    throw new Error("tahunLahir harus berupa integer.");
  }
  if (!Number.isInteger(bulanLahir) || bulanLahir < 1 || bulanLahir > 12) {
    throw new Error("bulanLahir harus antara 1 dan 12.");
  }
  if (!Number.isInteger(hariLahir) || hariLahir < 1 || hariLahir > 31) {
    throw new Error("hariLahir harus antara 1 dan 31.");
  }

  const lahir = new Date(tahunLahir, bulanLahir - 1, hariLahir);

  if (
    isNaN(lahir.getTime()) ||
    lahir.getFullYear() !== tahunLahir ||
    lahir.getMonth() !== bulanLahir - 1 ||
    lahir.getDate() !== hariLahir
  ) {
    throw new Error("Tanggal lahir tidak valid.");
  }

  if (lahir > referensi) {
    return { tahun: 0, bulan: 0, hari: 0 };
  }

  let tahun = referensi.getFullYear() - lahir.getFullYear();
  let bulan = referensi.getMonth() - lahir.getMonth();
  let hari = referensi.getDate() - lahir.getDate();

  if (hari < 0) {
    const prevMonthLastDay = new Date(
      referensi.getFullYear(),
      referensi.getMonth(),
      0
    ).getDate();
    hari += prevMonthLastDay;
    bulan -= 1;
  }
  if (bulan < 0) {
    bulan += 12;
    tahun -= 1;
  }

  return { tahun, bulan, hari };
}
