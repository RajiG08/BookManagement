import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import Login from "../../../Components/Login/Login";
import { vi } from "vitest";
import authReducer, { login } from "../../../features/auth/authSlice";

// ✅ Mock Redux store with auth reducer
const mockStore = (preloadedState) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState,
  });

// ✅ Mock react-router-dom
const mockNavigate = vi.fn(); // Define mockNavigate here
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate, // Ensure useNavigate returns mockNavigate
    MemoryRouter: actual.MemoryRouter, // Ensure MemoryRouter is available
  };
});

describe("Login Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({ auth: { user: null, error: null } });
  });

  afterEach(() => {
    vi.clearAllMocks(); // Ensure proper cleanup after each test
  });

  test("renders login container", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId("login-container")).toBeInTheDocument();
  });

  test("renders role selection buttons", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId("user-login-button")).toBeInTheDocument();
    expect(screen.getByTestId("admin-login-button")).toBeInTheDocument();
  });

  test("displays login form on user selection", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("user-login-button"));

    await waitFor(() => {
      expect(screen.getByTestId("login-box")).toBeInTheDocument();
      expect(screen.getByTestId("login-title")).toHaveTextContent("Login as User");
    });
  });

  test("validates login form submission and navigates", async () => {
    const dispatchSpy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("admin-login-button"));

    await waitFor(() => {
      expect(screen.getByTestId("login-box")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("username-input"), { target: { value: "admin" } });
    fireEvent.change(screen.getByTestId("password-input"), { target: { value: "admin" } });
    fireEvent.submit(screen.getByTestId("login-form"));

    await waitFor(() => {
      expect(dispatchSpy).toHaveBeenCalledWith(login({ username: "admin", role: "admin" }));
      expect(mockNavigate).toHaveBeenCalledWith("/admin-dashboard"); // Use mockNavigate here
    });
  });

  test("shows error message on invalid admin login", async () => {
    store = mockStore({ auth: { user: null, error: "Invalid admin credentials" } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByTestId("admin-login-button"));

    await waitFor(() => {
      expect(screen.getByTestId("login-box")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId("username-input"), { target: { value: "wrongAdmin" } });
    fireEvent.change(screen.getByTestId("password-input"), { target: { value: "wrongPass" } });
    fireEvent.submit(screen.getByTestId("login-form"));

    await waitFor(() => {
      expect(screen.getByTestId("error-message")).toHaveTextContent("Invalid admin credentials");
    });
  });
});
