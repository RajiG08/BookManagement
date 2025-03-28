import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Forbidden from "../../Components/Forbidden";

describe("Forbidden Component", () => {
  it("renders the forbidden container", () => {
    render(<Forbidden />);
    const container = screen.getByTestId("forbidden-container");
    expect(container).toBeTruthy();
  });

  it("renders the forbidden heading", () => {
    render(<Forbidden />);
    const heading = screen.getByTestId("forbidden-heading");
    expect(heading.textContent).toBe("403 - Forbidden");
  });

  it("renders the forbidden message", () => {
    render(<Forbidden />);
    const message = screen.getByTestId("forbidden-message");
    expect(message.textContent).toBe("You do not have permission to access this page.");
  });
});
