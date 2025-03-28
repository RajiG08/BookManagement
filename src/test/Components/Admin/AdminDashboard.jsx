import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminDashboard from "../../../Components/Admin/AdminDashboard";

describe("AdminDashboard Component", () => {
  test("should render the admin container and title", () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    const adminContainer = screen.getByTestId("admin-container");
    const adminTitle = screen.getByTestId("admin-title");

    expect(adminContainer).toBeTruthy();
    expect(adminTitle).toBeTruthy();
  });

  test("should render the logout button", () => {
    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    const logoutButton = screen.getByTestId("logout-button");
    expect(logoutButton).toBeTruthy();
  });

  test("should navigate to home page on logout", () => {
    delete window.location;
    window.location = { href: "" };

    render(
      <MemoryRouter>
        <AdminDashboard />
      </MemoryRouter>
    );

    const logoutButton = screen.getByTestId("logout-button");
    fireEvent.click(logoutButton);

    expect(window.location.href).toBe("/");
  });
});
