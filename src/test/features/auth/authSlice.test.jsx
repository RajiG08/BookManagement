import { describe, it, expect } from 'vitest';
import authReducer , {login, logout} from '../../../features/auth/authSlice';

describe('authSlice', () => {
  it('should handle initial state', () => {
    expect(authReducer(undefined, {})).toEqual({ user: null });
  });

  it('should handle login', () => {
    const mockUser = { id: 1, name: 'Test User', role: 'admin' };
    expect(authReducer({ user: null }, login(mockUser))).toEqual({
      user: mockUser,
    });
  });

  it('should handle logout', () => {
    const initialState = { user: { id: 1, name: 'Test User' } };
    expect(authReducer(initialState, logout())).toEqual({ user: null });
  });

  it('should return current state for unknown action', () => {
    const currentState = { user: { id: 1 } };
    expect(authReducer(currentState, { type: 'UNKNOWN_ACTION' })).toEqual(currentState);
  });
});
