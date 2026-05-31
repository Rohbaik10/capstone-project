export function exportCSV(transactions) {
  if (!transactions || transactions.length === 0) {
    alert("Tidak ada data");
    return;
  }

  const header = ["Tanggal", "Tipe", "Kategori", "Jumlah"];

  const rows = transactions.map((t) => [
    t.tanggal,
    t.tipe,
    t.kategori,
    t.jumlah,
  ]);

  const csvContent =
    [header, ...rows]
      .map((e) => e.join(","))
      .join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "laporan_keuangan.csv");
  document.body.appendChild(link);
  link.click();
}