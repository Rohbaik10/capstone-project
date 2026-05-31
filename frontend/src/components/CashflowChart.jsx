import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";

function CashflowChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={230}>
      <BarChart data={data} barCategoryGap="25%">
        <CartesianGrid strokeDasharray="4 4" />

        <XAxis dataKey="periode" interval={0} />

        <YAxis tickFormatter={(v) => `${v / 1000000} jt`} />

        <Tooltip formatter={(v) => `Rp ${v.toLocaleString("id-ID")}`} />

        <Legend />

        <Bar dataKey="pemasukan" fill="#16a34a" barSize={25} radius={[6,6,0,0]} />
        <Bar dataKey="pengeluaran" fill="#dc2626" barSize={25} radius={[6,6,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CashflowChart;