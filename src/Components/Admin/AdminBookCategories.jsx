import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";



const AdminBookCategories = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    isbn: "",
    released_year: "",
    category: "fiction", // Default category
  });

  // Fetch available categories on component mount
  useEffect(() => {
    const availableCategories = [
      "fiction",
      "philosophy",
      "spiritual",
      "personality_development",
      "thriller_horror",
      // "readlist", // Read List category added manually
    ];
    setCategories(availableCategories);
  }, []);

  // Handle category selection
  const handleCategoryClick = (category) => {
    onCategorySelect(category); // Update the selected category in the parent component
  };

  // Open/close dialog for adding a book
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/${formData.category}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to add book");
      alert("Book added successfully!");
      closeDialog();
      onCategorySelect(formData.category); // Refresh the table for the selected category
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book");
    }
  };

  return (
    <div data-testid="component-container" style={{ margin: "20px" }}>
      {/* Display category buttons and additional buttons in a single line */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {categories.map((category) => (
          <Button
            key={category}
            data-testid={`category-${category}`}
            onClick={() => handleCategoryClick(category)}
            variant="contained"
            style={{
              backgroundColor: category === "readlist" ? "#e74c3c" : "#3498db",
              color: "white",
            }}
          >
            {category.replace(/_/g, " ").toUpperCase()}
          </Button>
        ))}

        {/* Add Book Button */}
        <Button
          data-testid="add-book-btn"
          onClick={openDialog}
          variant="contained"
          style={{ backgroundColor: "#2ecc71", color: "white" }}
        >
          Add Book
        </Button>

        {/* Users Button */}
        <Button
          data-testid="users-btn"
          onClick={() => handleCategoryClick("users")}
          variant="contained"
          style={{ backgroundColor: "#9b59b6", color: "white" }}
        >
          Users
        </Button>
      </div>

      {/* Dialog for adding a book */}
      <Dialog open={isDialogOpen} onClose={closeDialog} data-testid="dialog">
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              value={formData.name}
              onChange={handleChange}
              label="Book Name"
              data-testid="name-input"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="author"
              value={formData.author}
              onChange={handleChange}
              label="Author"
              data-testid="author-input"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              label="ISBN"
              data-testid="isbn-input"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              name="released_year"
              value={formData.released_year}
              onChange={handleChange}
              label="Release Year"
              data-testid="year-input"
              type="text"
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                data-testid="category-select"
                required
              >
                <MenuItem value="fiction">Fiction</MenuItem>
                <MenuItem value="philosophy">Philosophy</MenuItem>
                <MenuItem value="spiritual">Spiritual</MenuItem>
                <MenuItem value="personality_development">Personality Development</MenuItem>
                <MenuItem value="thriller_horror">Thriller/Horror</MenuItem>
              </Select>
            </FormControl>
            <DialogActions>
              <Button
                data-testid="submit-btn"
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <Button
                data-testid="close-dialog-btn"
                onClick={closeDialog}
                variant="contained"
                color="secondary"
              >
                Close
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBookCategories;
