import { create } from "zustand";

export const userStore = create((set) => ({
  user: {},
  authenticated: false,
  removeUser: () => set({ user: {} }),
  login: (user) => set({ user, authenticated: true }),
  logout: () => set({ authenticated: false }),
}));
