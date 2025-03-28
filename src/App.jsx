import { Routes, Route } from "react-router-dom";

import Login from "./Components/Login/Login";
import User from "./Components/Users/Users";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Forbidden from "./Components/Forbidden";
import ProtectedRoute from "./Components/ProtectedRouted.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {/* Protected route for regular users */}
      <Route
        path="/users"
        element={
          <ProtectedRoute allowedRole="user">
            <User />
          </ProtectedRoute>
        }
      />

      {/* Protected route for Admin */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/forbidden" element={<Forbidden />} />
    </Routes>
  );
}

export default App;
