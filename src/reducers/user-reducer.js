import { create } from "zustand";
import { userModel } from "../models";
import localForage from "localforage";

export const userStore = create((set) => ({
  user: {},
  authenticated: false,
  removeUser: () => set({ user: {} }),
  login: (user) =>
    set({ user: userModel(user.user), authenticated: user.authenticated }),
  updateUser: (user) => set({ user: userModel(user) }),
  logout: () => {
    localForage.setItem("authenticated", false);
    set({ authenticated: false });
  },
}));
