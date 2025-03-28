import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";
import { describe, it, expect } from "vitest";

describe("App Component", () => {
  it("renders the login page by default", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const loginButtons = screen.getAllByRole("button", { name: /login/i });
      expect(loginButtons.length).toBeGreaterThan(0);
    });
  });

  it("renders the Forbidden page when navigating to /forbidden", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/forbidden"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("403 - Forbidden")).toBeInTheDocument();
    });
  });
});
