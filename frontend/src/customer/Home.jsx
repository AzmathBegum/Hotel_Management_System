import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";



const LIBRARIES = ["places"];

function Home() {
  const navigate = useNavigate();
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [hotelLocations, setHotelLocations] = useState([]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: LIBRARIES
  });

  // 🧠 Convert address → lat/lng
  const geocodeHotels = async (hotelsData) => {
    if (!window.google || !window.google.maps) return;

    const geocoder = new window.google.maps.Geocoder();

    const results = await Promise.all(
      hotelsData.map((hotel) => {
        return new Promise((resolve) => {
          if (!hotel.address) return resolve(null);

          geocoder.geocode({ address: hotel.address }, (res, status) => {
            if (status === "OK") {
              resolve({
                name: hotel.name,
                position: res[0].geometry.location
              });
            } else {
              resolve(null);
            }
          });
        });
      })
    );

    setHotelLocations(results.filter(Boolean));
  };

  // 🏨 Fetch from backend
  const fetchHotels = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/external-hotels");

      if (!res.ok) {
        console.error("Error:", res.status);
        return;
      }

      const data = await res.json();
      const hotelsData = data.properties || [];

      setHotels(hotelsData);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // ⏳ Load hotels when map is ready
  useEffect(() => {
  if (!isLoaded) return;

  let isMounted = true;

  const load = async () => {
    try {
      if (isMounted) {
        await fetchHotels();
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  load();

  return () => {
    isMounted = false;
  };
}, [isLoaded]);

  // 📍 Geocode AFTER hotels load (avoid multiple calls)
  useEffect(() => {
  if (!isLoaded) return;
  if (hotels.length === 0) return;
  if (hotelLocations.length > 0) return;

  if (!window.google || !window.google.maps) return;

  let isMounted = true;

  const loadGeo = async () => {
    if (isMounted) {
      await geocodeHotels(hotels);
    }
  };

  loadGeo();

  return () => {
    isMounted = false;
  };
}, [isLoaded, hotels, hotelLocations]);

  // 🤖 AI FILTER
  const runAI = () => {
    if (!hotels.length) return;

    let result = [...hotels];
    const text = searchText.toLowerCase();

    if (text.includes("cheap") || text.includes("budget")) {
      result.sort(
        (a, b) =>
          (a.rate_per_night?.lowest || 9999) -
          (b.rate_per_night?.lowest || 9999)
      );
      setAiMessage("Showing cheapest hotels 💰");
    } 
    else if (text.includes("luxury")) {
      result = result.filter(h => (h.overall_rating || 0) >= 4.5);
      setAiMessage("Luxury stays ✨");
    } 
    else if (text.includes("best")) {
      result.sort(
        (a, b) => (b.overall_rating || 0) - (a.overall_rating || 0)
      );
      setAiMessage("Top rated hotels ⭐");
    } 
    else {
      setAiMessage("Showing all hotels");
    }

    setFilteredHotels(result);
  };

  const handleSearch = () => {
    if (!searchText) return alert("Enter something");
    runAI();
  };

  const displayHotels = filteredHotels.length ? filteredHotels : hotels;

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <div style={container}>

      {/* 🔝 TOP BAR */}
      <div style={topBar}>
        <input
          placeholder="Search (cheap, luxury, best)..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={searchInput}
        />

        <button style={primaryBtn} onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 🤖 AI MESSAGE */}
      <div style={aiBox}>
        {aiMessage || "Try: cheap / luxury / best hotels"}
      </div>

      {/* MAIN */}
      <div style={mainContainer}>

        {/* LEFT SIDE (HOTELS) */}
        <div style={leftPanel}>
          {displayHotels.map((hotel, i) => (
            <div
  key={i}
  style={card}
  onClick={() => navigate(`/hotel/${i}`, { state: hotel })}
>
              <img
                src={
                  hotel.images?.[0]?.thumbnail ||
                  "https://via.placeholder.com/150"
                }
                alt="hotel"
                style={image}
              />

              <div style={cardContent}>
                <h3>{hotel.name}</h3>
                <p>⭐ {hotel.overall_rating || "N/A"}</p>
                <p>💰 ₹{hotel.rate_per_night?.lowest || "N/A"}</p>
                <p>{hotel.address}</p>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE (MAP) */}
        <div style={rightPanel}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: 17.385, lng: 78.4867 }}
            zoom={12}
          >
            {hotelLocations.map((hotel, i) => (
              <Marker
                key={i}
                position={{
                  lat: hotel.position.lat(),
                  lng: hotel.position.lng()
                }}
              />
            ))}
          </GoogleMap>
        </div>

      </div>
    </div>
  );
}

export default Home;

const container = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  background: "#f7f7f7",
  overflow: "hidden"
};

const topBar = {
  display: "flex",
  gap: "10px",
  padding: "15px",
  background: "white",
  position: "sticky",
  top: 0,
  zIndex: 10,
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)"
};

const searchInput = {
  flex: 1,
  padding: "10px",
  borderRadius: "20px",
  border: "1px solid #ddd"
};

const primaryBtn = {
  background: "#ff385c",
  color: "white",
  border: "none",
  padding: "10px 15px",
  borderRadius: "20px",
  cursor: "pointer"
};

const aiBox = {
  padding: "10px 20px",
  fontSize: "14px"
};

const mainContainer = {
  display: "flex",
  flex: 1,
  height: "calc(100vh - 100px)",
  overflow: "hidden"
};

const leftPanel = {
  width: "45%",
  overflowY: "auto",
  padding: "15px",
  height: "100%"
};

const rightPanel = {
  width: "55%",
  height: "100%",
  borderLeft: "1px solid #eee"
};

const card = {
  display: "flex",
  background: "white",
  borderRadius: "10px",
  marginBottom: "15px",
  overflow: "hidden",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const image = {
  width: "120px",
  objectFit: "cover"
};

const cardContent = {
  padding: "10px"
};

const mapContainerStyle = {
  width: "100%",
  height: "100%"
};