function Navbar() {
  return (
    <div
      style={{
        height: "60px",
        width: "100%",
        background: "#17b6c8",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        boxSizing: "border-box"
      }}
    >
      <h2 style={{ margin: 0, fontSize: "20px" }}>
        Hotel Admin
      </h2>

      <div style={{ fontSize: "22px", fontWeight: "bold" }}>
        Admin
      </div>
    </div>
  );
}

export default Navbar;