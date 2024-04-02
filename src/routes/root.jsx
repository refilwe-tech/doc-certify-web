import { AuthRouter } from "./auth-routes";
import { AppRouter } from "./app-routes";
import { userStore } from "../reducers";
import localforage from "localforage";
import { useState } from "react";

export const RootRouter = () => {
  const { authenticated } = userStore();
  const [verified, setVerified] = useState(authenticated);
  localforage.getItem("authenticated").then((res) => {
    setVerified(res);
  });

  return verified || authenticated ? <AppRouter /> : <AuthRouter />;
};
