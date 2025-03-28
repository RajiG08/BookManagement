import React, { useState } from "react";
import BookTable from "../Books/BookTable";
import BookCategories from "../Books/BookCategories";
import { useNavigate } from "react-router-dom";
import "./Users.css";

const Users = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="user-container" data-testid="user-container">
      {/* Header Section */}
      <div className="header" data-testid="header">
        <h1 className="user-title" data-testid="user-title">User Dashboard</h1>
        <button className="logout-button" onClick={handleLogout} data-testid="logout-button">
          Logout
        </button>
      </div>

      {/* Content Section */}
      <div className="content" data-testid="content">
        <BookCategories onCategorySelect={setSelectedCategory} />
        {selectedCategory && <BookTable selectedCategory={selectedCategory} />}
      </div>
    </div>
  );
};

export default Users;
