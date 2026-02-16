import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        padding: "12px 30px",
        backgroundColor: "#222",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LEFT - Brand */}
      <div style={{ fontWeight: "bold", fontSize: "18px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          BellCorp Events
        </Link>
      </div>

      {/* CENTER - Navigation */}
      {user && (
        <div>
          <Link
            to="/events"
            style={{ color: "white", marginRight: "20px" }}
          >
            Events
          </Link>

          <Link
            to="/my-events"
            style={{ color: "white", marginRight: "20px" }}
          >
            My Events
          </Link>

          <Link
            to="/dashboard"
            style={{ color: "white" }}
          >
            Dashboard
          </Link>
        </div>
      )}

      {/* RIGHT - Auth Section */}
      <div>
        {user ? (
          <>
            <span style={{ marginRight: "15px" }}>
              👤 {user.name}
            </span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              style={{ color: "white", marginRight: "15px" }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{ color: "white" }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
