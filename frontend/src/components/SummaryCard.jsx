function SummaryCard({ title, value, color }) {
  return (
    <div style={card}>
      <p style={label}>{title}</p>
      <h3 style={{ ...valueStyle, color }}>
        Rp {value.toLocaleString("id-ID")}
      </h3>
    </div>
  );
}

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "14px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
  flex: 1,
};

const label = { fontSize: "14px", opacity: 0.7 };
const valueStyle = { fontSize: "18px", fontWeight: "600" };

export default SummaryCard;