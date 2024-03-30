import { create } from "zustand";
import { userModel } from "../models";

export const userStore = create((set) => ({
  user: {},
  authenticated: false,
  removeUser: () => set({ user: {} }),
  login: (user) =>
    set({ user: userModel(user.user), authenticated: user.authenticated }),
  logout: () => set({ authenticated: false }),
}));
