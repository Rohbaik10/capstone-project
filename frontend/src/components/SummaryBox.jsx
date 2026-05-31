function SummaryBox({ title, value, color, bg, icon }) {
  return (
    <div style={{ ...box, background: bg }}>
      <span>{icon} {title}</span>
      <strong style={{ color }}>
        Rp {value.toLocaleString("id-ID")}
      </strong>
    </div>
  );
}

const box = {
  display: "flex",
  justifyContent: "space-between",
  padding: "14px",
  borderRadius: "10px",
  marginBottom: "10px",
};

export default SummaryBox;