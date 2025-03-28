import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import BookTable from "../../../Components/Books/BookTable";

describe("BookTable Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    // Mock window.alert
    window.alert = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render the table container with correct data-testid", async () => {
    // Mock fetch for initial book fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    // Mock fetch for readlist fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<BookTable selectedCategory="fiction" />);

    const tableContainer = screen.getByTestId("table-container");
    expect(tableContainer).toBeTruthy();
  });

  test("should display 'No books available' when no books are fetched", async () => {
    // Mock fetch for initial book fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    // Mock fetch for readlist fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<BookTable selectedCategory="fiction" />);

    await waitFor(() => {
      const noBooksRow = screen.getByTestId("no-books");
      expect(noBooksRow).toBeTruthy();
    });
  });

  test("should display books when fetched successfully", async () => {
    const mockBooks = [
      { id: 1, name: "Book 1", author: "Author 1", released_year: "2021", isbn: "123456789" },
    ];

    // Mock fetch for initial book fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBooks),
    });

    // Mock fetch for readlist fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<BookTable selectedCategory="fiction" />);

    await waitFor(() => {
      const bookRow = screen.getByTestId("book-row-1");
      expect(bookRow).toBeTruthy();
    });
  });

  test("should call addToReadList when 'Add to Readlist' button is clicked", async () => {
    const mockBooks = [
      { id: 1, name: "Book 1", author: "Author 1", released_year: "2021", isbn: "123456789" },
    ];

    // Mock fetch for initial book fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBooks),
    });

    // Mock fetch for readlist fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    // Mock fetch for addToReadList API call
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<BookTable selectedCategory="fiction" />);

    await waitFor(() => {
      const addButton = screen.getByTestId("add-button-1");
      fireEvent.click(addButton);

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/readlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(mockBooks[0]),
      });
    });
  });

  test("should call removeFromReadList when 'Remove from Readlist' button is clicked", async () => {
    const mockBooks = [
      { id: 1, name: "Book 1", author: "Author 1", released_year: "2021", isbn: "123456789" },
    ];

    // Mock fetch for initial book fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBooks),
    });

    // Mock fetch for readlist fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBooks),
    });

    // Mock fetch for removeFromReadList API call
    global.fetch.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve("Book removed"),
    });

    render(<BookTable selectedCategory="readlist" />);

    await waitFor(() => {
      const removeButton = screen.getByTestId("remove-button-1");
      fireEvent.click(removeButton);

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/readlist/1", {
        method: "DELETE",
      });
    });
  });
});
