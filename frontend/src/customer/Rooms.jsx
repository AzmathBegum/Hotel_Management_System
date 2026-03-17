
import { useNavigate } from "react-router-dom";

function Rooms(){

  const navigate = useNavigate();

  const rooms = [
    {id:1,type:"Standard Room",price:2000},
    {id:2,type:"Deluxe Room",price:3000},
    {id:3,type:"Suite",price:5000}
  ];

  const handleBook = (room)=>{
    navigate("/book-room",{state:room});
  };

  return(

    <div style={page}>

      <div style={card}>

        <h2>Available Rooms</h2>

        {rooms.map(r => (

          <div key={r.id} style={roomCard}>

            <h3>{r.type}</h3>

            <p>₹{r.price} / night</p>

            <button
              style={btn}
              onClick={()=>handleBook(r)}
            >
              Book Now
            </button>

          </div>

        ))}

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
  maxWidth:"600px",
  margin:"auto"
};

const roomCard={
  borderBottom:"1px solid #eee",
  padding:"15px"
};

const btn={
  background:"#17b6c8",
  color:"white",
  border:"none",
  padding:"6px 12px",
  borderRadius:"6px",
  cursor:"pointer"
};

export default Rooms;

