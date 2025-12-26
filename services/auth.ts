
const ADMIN_PASSWORD = 'admin123'; // Sample credential
const STORAGE_KEY = 'apex_auth_token';

export const authService = {
  login: (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'simulated-jwt-token-' + Date.now());
      return true;
    }
    return false;
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
  },
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem(STORAGE_KEY);
  }
};
