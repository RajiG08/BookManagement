import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const AdminBookTable = ({ selectedCategory }) => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!selectedCategory) return; // Prevent calling fetch if category is undefined
    if (selectedCategory === "users") {
      fetchUsers();
    } else {
      fetchBooks(selectedCategory);
    }
  }, [selectedCategory]);

  const fetchBooks = (category) => {
    if (!category) {
      console.error("fetchBooks called with an undefined category");
      return Promise.resolve([]); // Return an empty array to prevent errors
    }

    return fetch(`http://localhost:3001/${category}`)
      .then((response) => response.json())
      .then((data) => setBooks(data || []))
      .catch((error) => console.error("Error fetching books:", error));
  };

  const fetchUsers = () => {
    fetch("http://localhost:3001/users")
      .then((response) => response.json())
      .then((data) => setUsers(data || []))
      .catch((error) => console.error("Error fetching users:", error));
  };

  const removeFromLibrary = (bookId) => {
    fetch(`http://localhost:3001/${selectedCategory}/${bookId}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove book");
        }
        return response.text();
      })
      .then(() => {
        alert("Book removed from library");
        setBooks((prevBooks) => prevBooks.filter((b) => b.id !== bookId));
      })
      .catch((error) => console.error("Error removing book:", error));
  };

  return (
    <div data-testid="admin-book-table" style={{ textAlign: "center", margin: "20px" }}>
      <TableContainer component={Paper} style={{ margin: "20px auto", width: "80%" }} data-testid="table-container">
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#3498db" }}>
              <TableCell data-testid="table-header">
                {selectedCategory === "users" ? "Username" : "Book Name"}
              </TableCell>
              {selectedCategory !== "users" && (
                <>
                  <TableCell>Author</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Actions</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedCategory === "users" ? (
              users.length > 0 ? (
                users.map((user) => (
                  <TableRow key={user.id} data-testid={`user-row-${user.id}`}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow data-testid="no-users">
                  <TableCell colSpan={2} align="center">No users available</TableCell>
                </TableRow>
              )
            ) : (
              books.length > 0 ? (
                books.map((book) => (
                  <TableRow key={book.id} data-testid={`book-row-${book.id}`}>
                    <TableCell>{book.name}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.released_year}</TableCell>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        data-testid={`remove-button-${book.id}`}
                        onClick={() => removeFromLibrary(book.id)}
                      >
                        Remove from Library
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow data-testid="no-books">
                  <TableCell colSpan={5} align="center">No books available</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminBookTable;
