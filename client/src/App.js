import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Events from "./pages/Events";
import MyEvents from "./pages/MyEvents";
import EventDetails from "./pages/EventDetails";
import Dashboard from "./pages/Dashboard"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/events" 
          element={
          <ProtectedRoute>
            <Events />
          </ProtectedRoute>
          } 
        />
        <Route 
          path="/event/:id" 
          element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
          } 
        />
        <Route 
          path="/my-events" 
          element={
          <ProtectedRoute>
            <MyEvents />
          </ProtectedRoute>
          } 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
