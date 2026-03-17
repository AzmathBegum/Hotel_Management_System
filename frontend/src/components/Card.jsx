function Card({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        width: "200px"
      }}
    >
      <h3 style={{ margin: 0 }}>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>
        {value}
      </p>
    </div>
  );
}

export default Card;