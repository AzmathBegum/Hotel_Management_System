
function Tasks() {

  const tasks = [
    { id:1, room:"101", task:"Room Cleaning", status:"Pending" },
    { id:2, room:"203", task:"AC Repair", status:"Pending" },
    { id:3, room:"305", task:"Food Delivery", status:"Completed" }
  ];

  return (

    <div style={page}>

      <h2 style={title}>Assigned Tasks</h2>

      <div style={tableBox}>

        <table style={table}>

          <thead style={thead}>
            <tr>
              <th>ID</th>
              <th>Room</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {tasks.map((t)=>(
              <tr key={t.id} style={row}>

                <td>{t.id}</td>
                <td>{t.room}</td>
                <td>{t.task}</td>
                <td>{t.status}</td>

                <td>
                  <button style={completeBtn}>
                    Mark Complete
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

export default Tasks;


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

