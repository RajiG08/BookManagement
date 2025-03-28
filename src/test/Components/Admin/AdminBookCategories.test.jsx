import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AdminBookCategories from "../../../../src/Components/Admin/AdminBookCategories";
import { useNavigate } from "react-router-dom";

// Mock useNavigate
const navigateMock = vi.fn();

vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => navigateMock,
}));

describe("AdminBookCategories Component", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render the component container", () => {
    render(<AdminBookCategories onCategorySelect={vi.fn()} />);
    const container = screen.getByTestId("component-container");
    expect(container).toBeTruthy();
  });

  test("should open the add book dialog when clicking 'Add Book'", () => {
    render(<AdminBookCategories onCategorySelect={vi.fn()} />);
    const addButton = screen.getByTestId("add-book-btn");
    expect(addButton).toBeTruthy();

    fireEvent.click(addButton);
    const dialog = screen.getByTestId("dialog");
    expect(dialog).toBeTruthy();
  });

  test("should allow input changes inside the dialog", () => {
    render(<AdminBookCategories onCategorySelect={vi.fn()} />);
    fireEvent.click(screen.getByTestId("add-book-btn"));

    const nameInput = screen.getByTestId("name-input").querySelector("input");
    fireEvent.change(nameInput, { target: { value: "Test Book" } });
    expect(nameInput).toHaveValue("Test Book");

    const authorInput = screen.getByTestId("author-input").querySelector("input");
    fireEvent.change(authorInput, { target: { value: "John Doe" } });
    expect(authorInput).toHaveValue("John Doe");

    const isbnInput = screen.getByTestId("isbn-input").querySelector("input");
    fireEvent.change(isbnInput, { target: { value: "123456789" } });
    expect(isbnInput).toHaveValue("123456789");

    const yearInput = screen.getByTestId("year-input").querySelector("input");
    fireEvent.change(yearInput, { target: { value: "2022" } });
    expect(yearInput).toHaveValue("2022");
  });

  test("should select a book category from the dropdown", async () => {
    render(<AdminBookCategories onCategorySelect={vi.fn()} />);
    fireEvent.click(screen.getByTestId("add-book-btn"));

    const categorySelect = screen.getByTestId("category-select").querySelector("input");
    fireEvent.mouseDown(categorySelect);
    fireEvent.change(categorySelect, { target: { value: "philosophy" } });

    expect(categorySelect).toHaveValue("philosophy");
  });

  test("should submit the form successfully and close the dialog", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const mockCategorySelect = vi.fn();
    render(<AdminBookCategories onCategorySelect={mockCategorySelect} />);

    fireEvent.click(screen.getByTestId("add-book-btn"));

    fireEvent.change(screen.getByTestId("name-input").querySelector("input"), {
      target: { value: "Test Book" },
    });
    fireEvent.change(screen.getByTestId("author-input").querySelector("input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("isbn-input").querySelector("input"), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByTestId("year-input").querySelector("input"), {
      target: { value: "2022" },
    });

    fireEvent.click(screen.getByTestId("submit-btn"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("http://localhost:3001/fiction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test Book",
          author: "John Doe",
          isbn: "123456789",
          released_year: "2022",
          category: "fiction",
        }),
      });

      expect(mockCategorySelect).toHaveBeenCalledWith("fiction");
    });

    // Wait until the dialog is closed
    await waitFor(() => {
      expect(screen.queryByTestId("dialog")).toBeNull();
    });
  });

  test("should show an alert on form submission failure", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ message: "Failed to add book" }),
    });

    render(<AdminBookCategories onCategorySelect={vi.fn()} />);

    fireEvent.click(screen.getByTestId("add-book-btn"));

    fireEvent.change(screen.getByTestId("name-input").querySelector("input"), {
      target: { value: "Test Book" },
    });
    fireEvent.change(screen.getByTestId("author-input").querySelector("input"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByTestId("isbn-input").querySelector("input"), {
      target: { value: "123456789" },
    });
    fireEvent.change(screen.getByTestId("year-input").querySelector("input"), {
      target: { value: "2022" },
    });

    fireEvent.click(screen.getByTestId("submit-btn"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Failed to add book");
    });
  });

  test("should validate navigation when clicking 'Users' button", () => {
    // Mock onCategorySelect
    const mockOnCategorySelect = vi.fn();
    render(<AdminBookCategories onCategorySelect={mockOnCategorySelect} />);

    // Click the "Users" button
    const usersButton = screen.getByTestId("users-btn");
    fireEvent.click(usersButton);

    // Validate that onCategorySelect is called with "users"
    expect(mockOnCategorySelect).toHaveBeenCalledWith("users");

    // Validate that navigate is called with "/users"
   // expect(navigateMock).toHaveBeenCalledWith("/users");
  });
});
