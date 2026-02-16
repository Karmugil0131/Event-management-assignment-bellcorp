import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

function Dashboard() {
  const { user } = useAuth();
  const [eventsCount, setEventsCount] = useState(0);
  const [myCount, setMyCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsRes = await api.get("/events", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const myRes = await api.get("/registrations/my-events", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setEventsCount(eventsRes.data.length);
        setMyCount(myRes.data.length);

      } catch (err) {
        console.log(err);
      }
    };

    if (user?.token) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <p>Welcome, {user.name}</p>

      <div style={{ marginTop: "20px" }}>
        <p><strong>Total Events:</strong> {eventsCount}</p>
        <p><strong>Your Registrations:</strong> {myCount}</p>
      </div>
    </div>
  );
}

export default Dashboard;
