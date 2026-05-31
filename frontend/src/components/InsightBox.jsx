function InsightBox({ text, color, bg }) {
  return (
    <div style={{
      padding: "20px",
      borderRadius: "12px",
      background: bg,
      borderLeft: `6px solid ${color}`,
    }}>
      <h3>💡 Insight Cashflow</h3>
      <p style={{ color }}>{text}</p>
    </div>
  );
}

export default InsightBox;