
import { useEffect, useState } from "react";

function MyServices(){

  const [services,setServices] = useState([]);

  useEffect(()=>{

    const fetchServices = async ()=>{

      try{

        const res = await fetch("http://localhost:8080/api/services");

        const data = await res.json();

        setServices(data);

      }catch(error){
        console.log(error);
      }

    };

    fetchServices();

  },[]);

  return(

    <div style={page}>

      <div style={card}>

        <h2 style={{color:"#17b6c8"}}>
          My Service Requests
        </h2>

        {services.length === 0 ? (

          <p>No service requests yet</p>

        ) : (

          <table style={table}>

            <thead>

              <tr style={headerRow}>
                <th style={th}>Service</th>
                <th style={th}>Type</th>
                <th style={th}>Room</th>
                <th style={th}>Price</th>
                <th style={th}>Date</th>
                <th style={th}>Status</th>
              </tr>

            </thead>

            <tbody>

              {services.map((s)=>(
                <tr key={s.id}>

                  <td style={td}>{s.service}</td>
                  <td style={td}>{s.type}</td>
                  <td style={td}>{s.room}</td>
                  <td style={td}>₹{s.price}</td>
                  <td style={td}>{s.date}</td>
                  <td style={td}>{s.status}</td>

                </tr>
              ))}

            </tbody>

          </table>

        )}

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

const table={
  width:"100%",
  marginTop:"20px",
  borderCollapse:"collapse"
};

const headerRow={
  background:"#17b6c8",
  color:"white"
};

const th={
  padding:"10px"
};

const td={
  padding:"10px",
  borderBottom:"1px solid #eee"
};

export default MyServices;

