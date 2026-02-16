import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
// import axios from "axios";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

function MyEvents() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const { data } = await api.get(
          "http://localhost:5000/api/registrations/my-events",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        setRegistrations(data);
      } catch (err) {
        setError("Failed to fetch registrations");
      }
    };

    fetchMyEvents();
  }, [user]);

  const handleCancel = async (eventId) => {
    try {
      await api.delete(
        `http://localhost:5000/api/registrations/${eventId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Remove from UI instantly
      setRegistrations((prev) =>
        prev.filter((reg) => reg.event._id !== eventId)
      );

    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

    const today = new Date();

    const upcomingEvents = registrations.filter(
        (reg) => reg.event && new Date(reg.event.date) >= today
    );

    const pastEvents = registrations.filter(
        (reg) => reg.event && new Date(reg.event.date) < today
    );

    const cardStyle = {
        border: "1px solid black",
        padding: "10px",
        margin: "10px 0",
    };

  return (
    <div>
        <h2>My Registered Events</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
      <h3>Upcoming Events ({upcomingEvents.length})</h3>

        {upcomingEvents.length === 0 ? (
            <p>No upcoming events.</p>
        ) : (
        upcomingEvents.map((reg) => (
            <div key={reg._id} style={cardStyle}>
              <h4>
                <Link to={`/event/${reg.event._id}`}>
                  {reg.event.name}
                </Link>
              </h4>
            <p>{reg.event.location}</p>
            <p>{new Date(reg.event.date).toLocaleDateString()}</p>

            <button onClick={() => handleCancel(reg.event._id)}>
                Cancel Registration
            </button>
            </div>
        ))
        )}

        <h3 style={{ marginTop: "30px" }}>
        Past Events ({pastEvents.length})
        </h3>

        {pastEvents.length === 0 ? (
        <p>No past events.</p>
        ) : (
        pastEvents.map((reg) => (
            <div key={reg._id} style={cardStyle}>
            <h4>{reg.event.name}</h4>
            <p>{reg.event.location}</p>
            <p>{new Date(reg.event.date).toLocaleDateString()}</p>
            </div>
        ))
        )}

    </div>
  );
}

export default MyEvents;
