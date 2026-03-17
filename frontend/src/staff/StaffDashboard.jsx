
function StaffDashboard() {

  const tasks = [
    { room: "101", task: "Room Cleaning", status: "Pending" },
    { room: "203", task: "AC Repair", status: "Pending" },
    { room: "305", task: "Food Delivery", status: "Completed" }
  ];

  return (

    <div style={page}>

      <h2 style={title}>Staff Dashboard</h2>

      {/* Cards */}

      <div style={cardGrid}>

        <div style={card}>
          <h3>Assigned Tasks</h3>
          <p style={value}>5 Tasks</p>
        </div>

        <div style={card}>
          <h3>Pending Services</h3>
          <p style={value}>3 Requests</p>
        </div>

        <div style={card}>
          <h3>Completed Jobs</h3>
          <p style={value}>12 Done</p>
        </div>

      </div>

      {/* Task Table */}

      <div style={tableBox}>

        <h3 style={{marginBottom:"10px"}}>Today's Tasks</h3>

        <table style={table}>

          <thead>
            <tr>
              <th>Room</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {tasks.map((t,i)=>(
              <tr key={i}>
                <td>{t.room}</td>
                <td>{t.task}</td>
                <td>{t.status}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default StaffDashboard;


/* Styles */

const page = {
  background:"#17b6c8",
  minHeight:"100vh",
  padding:"30px"
};

const title = {
  color:"white"
};

const cardGrid = {
  display:"grid",
  gridTemplateColumns:"repeat(3, 1fr)",
  gap:"20px",
  marginTop:"20px"
};

const card = {
  background:"white",
  padding:"25px",
  borderRadius:"12px",
  textAlign:"center",
  boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
};

const value = {
  fontSize:"22px",
  fontWeight:"bold",
  color:"#17b6c8"
};

const tableBox = {
  background:"white",
  padding:"20px",
  borderRadius:"12px",
  marginTop:"30px",
  boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
};

const table = {
  width:"100%",
  borderCollapse:"collapse"
};

