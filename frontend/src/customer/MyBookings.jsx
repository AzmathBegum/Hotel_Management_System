
function MyBookings(){

  const bookings =
    JSON.parse(localStorage.getItem("bookings") || "[]");

  return(

    <div style={page}>

      <div style={card}>

        <h2>My Bookings</h2>

        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (

          <table style={{width:"100%"}}>

            <thead>
              <tr style={{background:"#17b6c8",color:"white"}}>
                <th style={th}>Room</th>
                <th style={th}>Check-In</th>
                <th style={th}>Check-Out</th>
                <th style={th}>Status</th>
              </tr>
            </thead>

            <tbody>

              {bookings.map(b=>(
                <tr key={b.id}>
                  <td style={td}>{b.room}</td>
                  <td style={td}>{b.checkin}</td>
                  <td style={td}>{b.checkout}</td>
                  <td style={td}>{b.status}</td>
                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );
}

const page={
  background:"#17b6c8",
  minHeight:"100vh",
  padding:"40px"
};

const card={
  background:"white",
  padding:"30px",
  borderRadius:"10px",
  maxWidth:"700px",
  margin:"auto"
};

const th={padding:"10px"};
const td={padding:"10px"};

export default MyBookings;

