import React, { useEffect, useState } from "react";

const BookCategories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const availableCategories = [
      "fiction",
      "philosophy",
      "spiritual",
      "personality_development",
      "thriller_horror",
      "readlist", // Read List category added manually
    ];

    setCategories(availableCategories);
  }, []);

  return (
    <div
      data-testid="book-categories-container"
      style={{
        display: "flex",
        gap: "15px",
        flexWrap: "wrap",
        margin: "20px",
        justifyContent: "center",
      }}
    >
      {categories.map((category) => (
        <button
          key={category}
          data-testid={`category-${category}`}
          onClick={() => onCategorySelect(category)}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: category === "readlist" ? "#e74c3c" : "#3498db",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
            border: "none",
          }}
        >
          {category.replace(/_/g, " ").toUpperCase()}
        </button>
      ))}
    </div>
  );
};

export default BookCategories;
