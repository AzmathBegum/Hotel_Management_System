
function Services() {

  const services = [
    { id:1, room:"102", request:"Extra Towels", status:"Pending" },
    { id:2, room:"205", request:"Room Cleaning", status:"Pending" },
    { id:3, room:"310", request:"Food Delivery", status:"Completed" }
  ];

  return (

    <div style={page}>

      <h2 style={title}>Service Requests</h2>

      <div style={tableBox}>

        <table style={table}>

          <thead style={thead}>
            <tr>
              <th>ID</th>
              <th>Room</th>
              <th>Request</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {services.map((s)=>(
              <tr key={s.id} style={row}>

                <td>{s.id}</td>
                <td>{s.room}</td>
                <td>{s.request}</td>
                <td>{s.status}</td>

                <td>
                  <button style={completeBtn}>
                    Complete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Services;


/* Styles */

const page = {
  background:"#17b6c8",
  minHeight:"100vh",
  padding:"30px"
};

const title = {
  color:"white"
};

const tableBox = {
  background:"white",
  padding:"20px",
  borderRadius:"12px",
  marginTop:"20px",
  boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
};

const table = {
  width:"100%",
  borderCollapse:"collapse"
};

const thead = {
  background:"#17b6c8",
  color:"white"
};

const row = {
  textAlign:"center",
  borderBottom:"1px solid #ddd"
};

const completeBtn = {
  background:"#17b6c8",
  color:"white",
  border:"none",
  padding:"6px 12px",
  borderRadius:"6px",
  cursor:"pointer"
};

