
import { useLocation } from "react-router-dom";


function ServiceDetails(){

  const location = useLocation();
  const service = location.state || {};

  const serviceTypes = {
    "Room Service":[
      {type:"Breakfast",price:300},
      {type:"Lunch",price:500},
      {type:"Dinner",price:600}
    ],
    "Laundry":[
      {type:"Washing",price:100},
      {type:"Dry Cleaning",price:200},
      {type:"Ironing",price:50}
    ],
    "Airport Pickup":[
      {type:"Sedan",price:1200},
      {type:"SUV",price:2000}
    ],
    "Spa":[
      {type:"Massage",price:1500},
      {type:"Facial",price:1200}
    ]
  };

  const types = serviceTypes[service?.name] || [];

  const requestService = (type, price) => {

  const requests =
    JSON.parse(localStorage.getItem("services") || "[]");

  const newRequest = {
    id: new Date().getTime(),
    service: service.name,
    type: type,
    price: price,
    room: "101",
    status: "Requested",
    date: new Date().toLocaleDateString()
  };

  requests.push(newRequest);

  localStorage.setItem("services", JSON.stringify(requests));

  alert("Service Requested Successfully!");
};

  return(

    <div style={page}>

      <div style={card}>

        <h2 style={{color:"#17b6c8"}}>
          {service.name}
        </h2>

        <p>{service.description}</p>

        <h3 style={{marginTop:"20px"}}>Available Options</h3>

        {types.map((t,i)=>(
          <div key={i} style={row}>

            <span>{t.type}</span>

            <span>₹{t.price}</span>

            <button
              style={btn}
              onClick={()=>requestService(t.type,t.price)}
            >
              Request
            </button>

          </div>
        ))}

      </div>

    </div>

  );
}

/* styles */

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

const row={
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  padding:"10px 0",
  borderBottom:"1px solid #eee"
};

const btn={
  background:"#17b6c8",
  color:"white",
  border:"none",
  padding:"6px 12px",
  borderRadius:"6px",
  cursor:"pointer"
};

export default ServiceDetails;

