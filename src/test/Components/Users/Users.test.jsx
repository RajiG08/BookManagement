import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Users from "../../../Components/Users/Users"; // Adjust the import path as needed

// Mock the useNavigate hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(), // Mock useNavigate
  };
});

describe("Users Component", () => {
  let navigateMock;

  beforeEach(() => {
    // Reset the mock before each test
    navigateMock = vi.fn();
    useNavigate.mockImplementation(() => navigateMock);
  });

  it("renders the user container", () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );
    const userContainer = screen.getByTestId("user-container");
    expect(userContainer).toBeTruthy();
  });

  it("renders the header with title and logout button", () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );
    const header = screen.getByTestId("header");
    const userTitle = screen.getByTestId("user-title");
    const logoutButton = screen.getByTestId("logout-button");

    expect(header).toBeTruthy();
    expect(userTitle.textContent).toBe("User Dashboard");
    expect(logoutButton.textContent).toBe("Logout");
  });

  it("renders the content section", () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );
    const content = screen.getByTestId("content");
    expect(content).toBeTruthy();
  });

  it("navigates to the home page on logout", () => {
    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);

    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("removes user from localStorage on logout", () => {
    localStorage.setItem("user", "testUser");

    render(
      <MemoryRouter>
        <Users />
      </MemoryRouter>
    );

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("user")).toBeNull();
  });
});
