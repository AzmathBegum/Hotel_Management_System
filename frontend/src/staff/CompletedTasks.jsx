
function CompletedTasks() {

  const completed = [
    { id:1, room:"101", task:"Room Cleaning", date:"2026-03-13" },
    { id:2, room:"203", task:"AC Repair", date:"2026-03-13" },
    { id:3, room:"305", task:"Food Delivery", date:"2026-03-12" }
  ];

  return (

    <div style={page}>

      <h2 style={title}>Completed Tasks</h2>

      <div style={tableBox}>

        <table style={table}>

          <thead style={thead}>
            <tr>
              <th>ID</th>
              <th>Room</th>
              <th>Task</th>
              <th>Date Completed</th>
            </tr>
          </thead>

          <tbody>

            {completed.map((c)=>(
              <tr key={c.id} style={row}>
                <td>{c.id}</td>
                <td>{c.room}</td>
                <td>{c.task}</td>
                <td>{c.date}</td>
              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default CompletedTasks;


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

