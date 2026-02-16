import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await api.get(`/events/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setEvent(data);
      } catch (err) {
        setError("Failed to load event");
      } finally {
        setLoading(false);
      }
    };

    const checkRegistration = async () => {
      try {
        const { data } = await api.get("/registrations/my-events", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const registered = data.some(
          (item) => item.event && item.event._id === id
        );

        setIsRegistered(registered);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.token) {
      fetchEvent();
      checkRegistration();
    }
  }, [id, user]);

  // Detect past event
  const isPastEvent = event
    ? new Date(event.date) < new Date()
    : false;

  const handleRegister = async () => {
    try {
      setProcessing(true);
      setMessage("");
      setMessageType("");

      await api.post(
        `/registrations/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setIsRegistered(true);
      setEvent((prev) => ({
        ...prev,
        registeredCount: prev.registeredCount + 1,
      }));

      setMessage("Registration successful!");
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error occurred");
      setMessageType("error");
    } finally {
      setProcessing(false);
    }
  };

  const handleCancel = async () => {
    try {
      setProcessing(true);
      setMessage("");
      setMessageType("");

      await api.delete(`/registrations/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setIsRegistered(false);
      setEvent((prev) => ({
        ...prev,
        registeredCount: prev.registeredCount - 1,
      }));

      setMessage("Registration cancelled.");
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Cancel failed");
      setMessageType("error");
    } finally {
      setProcessing(false);
    }
  };

  if (loading)
    return (
      <div className="container">
        <p>Loading event details...</p>
      </div>
    );

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div className="container">
      <h3>{event.name}</h3>
      <p><strong>Organizer:</strong> {event.organizer}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Category:</strong> {event.category}</p>
      <p><strong>Description:</strong> {event.description}</p>

      <p>
        <strong>Seats Left:</strong>{" "}
        {event.capacity - event.registeredCount}
      </p>

      <div style={{ marginTop: "20px" }}>

        {/* Past Event Message */}
        {isPastEvent && (
          <div className="message error" style={{marginBottom: "10px"}}>
            Event has been closed
          </div>
        )}
          <div style={{display: "flex"}}>
          {isRegistered ? (
            <button
              onClick={handleCancel}
              disabled={processing || isPastEvent}
              className="danger"
            >
              {processing ? "Processing..." : "Cancel Registration"}
            </button>
          ) : (
            <button
              onClick={handleRegister}
              disabled={
                processing ||
                isPastEvent ||
                event.registeredCount >= event.capacity
              }
              className="primary"
            >
              {isPastEvent
                ? "Closed"
                : event.registeredCount >= event.capacity
                ? "Event Full"
                : processing
                ? "Processing..."
                : "Register"}
            </button>
          )}

            <button
              onClick={() => navigate("/events")}
              style={{ marginLeft: "30px" }}
            >
              ← Back to Events
            </button>
          </div>


        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
