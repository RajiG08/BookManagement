import { describe, it, expect, vi } from "vitest";
import { store } from "../app/store.jsx";

describe("Redux Store", () => {
  it("should have auth reducer configured", () => {
    expect(store.getState()).toHaveProperty("auth");
    expect(typeof store.getState().auth).toBe("object");
  });

  it("should dispatch actions correctly", () => {
    const testAction = { type: "TEST_ACTION" };
    store.dispatch(testAction);
    expect(store.getState()).toBeDefined();
  });

  it("should have the correct initial state structure", () => {
    const initialState = store.getState();
    expect(initialState).toEqual({
      auth: expect.any(Object),
    });
  });

  it("should subscribe to changes", () => {
    const mockSubscriber = vi.fn();
    const unsubscribe = store.subscribe(mockSubscriber);
    
    store.dispatch({ type: "TEST_SUBSCRIBE" });
    expect(mockSubscriber).toHaveBeenCalledTimes(1);
    
    unsubscribe();
    store.dispatch({ type: "TEST_UNSUBSCRIBE" });
    expect(mockSubscriber).toHaveBeenCalledTimes(1);
  });
});
