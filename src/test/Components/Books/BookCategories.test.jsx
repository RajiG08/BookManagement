import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import BookCategories from "../../../Components/Books/BookCategories";

describe("BookCategories Component", () => {
  test("should render the container with correct data-testid", () => {
    const mockOnCategorySelect = vi.fn();
    render(<BookCategories onCategorySelect={mockOnCategorySelect} />);

    const container = screen.getByTestId("book-categories-container");
    expect(container).toBeTruthy();
  });

  test("should render all category buttons with correct data-testid", () => {
    const mockOnCategorySelect = vi.fn();
    render(<BookCategories onCategorySelect={mockOnCategorySelect} />);

    const categories = [
      "fiction",
      "philosophy",
      "spiritual",
      "personality_development",
      "thriller_horror",
      "readlist",
    ];

    categories.forEach((category) => {
      const button = screen.getByTestId(`category-${category}`);
      expect(button).toBeTruthy();
    });
  });

  test("should call onCategorySelect with the correct category when a button is clicked", () => {
    const mockOnCategorySelect = vi.fn();
    render(<BookCategories onCategorySelect={mockOnCategorySelect} />);

    const fictionButton = screen.getByTestId("category-fiction");
    fireEvent.click(fictionButton);

    expect(mockOnCategorySelect).toHaveBeenCalledWith("fiction");
  });

  test("should render the correct text on each button", () => {
    const mockOnCategorySelect = vi.fn();
    render(<BookCategories onCategorySelect={mockOnCategorySelect} />);

    const categories = [
      { id: "fiction", text: "FICTION" },
      { id: "philosophy", text: "PHILOSOPHY" },
      { id: "spiritual", text: "SPIRITUAL" },
      { id: "personality_development", text: "PERSONALITY DEVELOPMENT" },
      { id: "thriller_horror", text: "THRILLER HORROR" },
      { id: "readlist", text: "READLIST" },
    ];

    categories.forEach((category) => {
      const button = screen.getByTestId(`category-${category.id}`);
      expect(button.textContent).toBe(category.text);
    });
  });

  test("should apply the correct background color for the readlist button", () => {
    const mockOnCategorySelect = vi.fn();
    render(<BookCategories onCategorySelect={mockOnCategorySelect} />);

    const readlistButton = screen.getByTestId("category-readlist");
    expect(readlistButton.style.backgroundColor).toBe("rgb(231, 76, 60)");
  });

  test("should apply the correct background color for non-readlist buttons", () => {
    const mockOnCategorySelect = vi.fn();
    render(<BookCategories onCategorySelect={mockOnCategorySelect} />);

    const fictionButton = screen.getByTestId("category-fiction");
    expect(fictionButton.style.backgroundColor).toBe("rgb(52, 152, 219)");
  });
});
