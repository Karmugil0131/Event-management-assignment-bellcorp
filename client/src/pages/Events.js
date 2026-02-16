import { useEffect, useState } from "react";
// import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../api/axios";

function Events() {
  const { user } = useAuth();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await api.get(
          "http://localhost:5000/api/events",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
            params: {
              search,
              category,
              location,
            },
          }
        );

        setEvents(data);
      } catch (err) {
        setError("Failed to fetch events");
      }
    };


    if (!user) return;

    const fetchData = async () => {
      await fetchEvents();
    };

    fetchData();

  }, [search, category, location, user]);
  

  return (
    <div style={{padding: "20px"}}>
      <h2>Events</h2>

      {/* Filters */}
      <div style={{display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{flexGrow: "1", padding: "5px", outline: "none"}}
        />

        <input
          type="text"
          placeholder="Filter by category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{flexGrow: "1", marginLeft: "10px", outline: "none" }}
        />

        <input
          type="text"
          placeholder="Filter by location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{flexGrow: "1", marginLeft: "10px", outline: "none" }}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        events.map((event) => {
          return (
          <div
            key={event._id}
            style={{
              border: "1px solid black",
              margin: "10px",
              padding: "10px",
            }}
          >
            <h3>{event.name}</h3>
            <p>{event.description}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p>
              <strong>Seats Left:</strong>{" "}
              {event.capacity - event.registeredCount}
            </p>
            <Link to={`/event/${event._id}`}>
              <button className="primary">See More...</button>
            </Link>
          </div>
        )})
      )}
    </div>
  );
}

export default Events;
