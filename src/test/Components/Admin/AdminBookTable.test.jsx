import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AdminBookTable from "../../../Components/Admin/AdminBookTable";

describe("AdminBookTable Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render the table container", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<AdminBookTable selectedCategory="fiction" />);

    const tableContainer = screen.getByTestId("table-container");
    expect(tableContainer).toBeTruthy();
  });

  test("should display 'No books available' when no books are fetched", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<AdminBookTable selectedCategory="fiction" />);

    await waitFor(() => {
      const noBooksRow = screen.getByTestId("no-books");
      expect(noBooksRow).toBeTruthy();
    });
  });

  test("should display books when fetched successfully", async () => {
    const mockBooks = [
      { id: 1, name: "Book 1", author: "Author 1", released_year: "2021", isbn: "123456789" },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBooks),
    });

    render(<AdminBookTable selectedCategory="fiction" />);

    await waitFor(() => {
      const bookRow = screen.getByTestId("book-row-1");
      expect(bookRow).toBeTruthy();
    });
  });

  test("should call removeFromLibrary when remove button is clicked", async () => {
    const mockBooks = [
      { id: 1, name: "Book 1", author: "Author 1", released_year: "2021", isbn: "123456789" },
    ];

    // Mock fetch for initial book fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockBooks),
    });

    // Mock fetch for DELETE request
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    render(<AdminBookTable selectedCategory="fiction" />);

    await waitFor(() => {
      const removeButton = screen.getByTestId("remove-button-1");
      fireEvent.click(removeButton);

      expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/fiction/1", {
        method: "DELETE",
      });
    });
  });

  test("should display 'No users available' when no users are fetched", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });

    render(<AdminBookTable selectedCategory="users" />);

    await waitFor(() => {
      const noUsersRow = screen.getByTestId("no-users");
      expect(noUsersRow).toBeTruthy();
    });
  });

  test("should display users when fetched successfully", async () => {
    const mockUsers = [
      { id: 1, username: "user1", email: "user1@example.com" },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockUsers),
    });

    render(<AdminBookTable selectedCategory="users" />);

    await waitFor(() => {
      const userRow = screen.getByTestId("user-row-1");
      expect(userRow).toBeTruthy();
    });
  });
});
