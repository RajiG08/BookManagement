import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import ProtectedRoute from "../../Components/ProtectedRouted";
// Mock the Navigate component
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Navigate: vi.fn(({ to }) => <div data-testid="navigate-to-forbidden" />),
  };
});

describe("ProtectedRoute Component", () => {
  const mockStore = configureStore([]);

  it("renders children when user is authenticated and has the correct role", () => {
    const store = mockStore({
      auth: {
        user: { role: "admin" }, // User has the correct role
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute allowedRole="admin">
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    const children = getByTestId("protected-route-children");
    expect(children).toBeTruthy();
    expect(children.textContent).toBe("Protected Content");
  });

  it("navigates to /forbidden when user is not authenticated", () => {
    const store = mockStore({
      auth: {
        user: null, // User is not authenticated
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute allowedRole="admin">
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    const navigateComponent = getByTestId("navigate-to-forbidden");
    expect(navigateComponent).toBeTruthy();
  });

  it("navigates to /forbidden when user does not have the correct role", () => {
    const store = mockStore({
      auth: {
        user: { role: "user" }, // User does not have the correct role
      },
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <ProtectedRoute allowedRole="admin">
            <div data-testid="protected-content">Protected Content</div>
          </ProtectedRoute>
        </MemoryRouter>
      </Provider>
    );

    const navigateComponent = getByTestId("navigate-to-forbidden");
    expect(navigateComponent).toBeTruthy();
  });
});
