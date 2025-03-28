import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const BookTable = ({ selectedCategory }) => {
  const [books, setBooks] = useState([]);
  const [readlist, setReadlist] = useState([]);

  // Fetch books and readlist when the component mounts or when selectedCategory changes
  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://localhost:3001/${selectedCategory}`)
        .then((response) => response.json())
        .then((data) => setBooks(data || []))
        .catch((error) => console.error("Error fetching books:", error));
    }

    fetchReadList(); // Fetch the latest readlist
  }, [selectedCategory]);

  // Fetch readlist separately to keep it updated
  const fetchReadList = () => {
    fetch("http://localhost:3001/readlist")
      .then((response) => response.json())
      .then((data) => setReadlist(data || []))
      .catch((error) => console.error("Error fetching readlist:", error));
  };

  const addToReadList = (book) => {
    if (readlist.some((b) => b.id === book.id)) {
      alert("Book is already in the readlist!");
      return;
    }

    fetch("http://localhost:3001/readlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Book added to Read List");
        fetchReadList(); // Fetch the updated readlist
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  const removeFromReadList = (bookId) => {
    fetch(`http://localhost:3001/readlist/${bookId}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove book");
        }
        return response.text(); // Handle empty response correctly
      })
      .then(() => {
        alert("Book removed from Read List");

        // Update both readlist and books state immediately
        setReadlist((prevReadlist) => prevReadlist.filter((b) => b.id !== bookId));
        setBooks((prevBooks) => prevBooks.filter((b) => b.id !== bookId)); // Also remove from displayed books
      })
      .catch((error) => console.error("Error removing book:", error));
  };

  return (
    <TableContainer component={Paper} style={{ margin: "20px auto", width: "80%" }} data-testid="table-container">
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: "#3498db" }}>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>Book Name</TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>Author</TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>Year</TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>ISBN</TableCell>
            <TableCell style={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.length > 0 ? (
            books.map((book) => (
              <TableRow key={book.id} data-testid={`book-row-${book.id}`}>
                <TableCell data-testid={`book-name-${book.id}`}>{book.name}</TableCell>
                <TableCell data-testid={`book-author-${book.id}`}>{book.author}</TableCell>
                <TableCell data-testid={`book-year-${book.id}`}>{book.released_year}</TableCell>
                <TableCell data-testid={`book-isbn-${book.id}`}>{book.isbn}</TableCell>
                <TableCell>
                  {selectedCategory === "readlist" ? (
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeFromReadList(book.id)}
                      data-testid={`remove-button-${book.id}`}
                    >
                      Remove from Readlist
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => addToReadList(book)}
                      data-testid={`add-button-${book.id}`}
                    >
                      Add to Readlist
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" data-testid="no-books">
                No books available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
