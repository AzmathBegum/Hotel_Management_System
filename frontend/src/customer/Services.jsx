
import { useNavigate } from "react-router-dom";

function Services(){

  const navigate = useNavigate();

  const services = [
    {
      id:1,
      name:"Room Service",
      description:"Food and beverages delivered to your room"
    },
    {
      id:2,
      name:"Laundry",
      description:"Clothes washing and dry cleaning"
    },
    {
      id:3,
      name:"Airport Pickup",
      description:"Transportation from airport to hotel"
    },
    {
      id:4,
      name:"Spa",
      description:"Relaxing spa and massage services"
    }
  ];

  const openService = async (service)=>{

    try{

      await fetch("http://localhost:8080/api/services",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          serviceName: service.name,
          description: service.description
        })
      });

      navigate("/service-details",{ state: service });

    }catch(error){
      console.log(error);
      alert("Service request failed");
    }

  };

  return(

    <div style={page}>

      <div style={card}>

        <h2 style={{color:"#17b6c8"}}>Hotel Services</h2>

        <div style={grid}>

          {services.map(service=>(
            <div
              key={service.id}
              style={serviceCard}
              onClick={()=>openService(service)}
            >
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}

        </div>

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
  maxWidth:"800px",
  margin:"auto"
};

const grid={
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
  gap:"20px",
  marginTop:"20px"
};

const serviceCard={
  background:"#f8f8f8",
  padding:"20px",
  borderRadius:"8px",
  cursor:"pointer"
};

export default Services;

