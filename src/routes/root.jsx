import { AuthRouter } from "./auth-routes";
import { AppRouter } from "./app-routes";
import { userStore } from "../reducers";

export const RootRouter = () => {
  const { authenticated } = userStore();
  return authenticated ? <AppRouter /> : <AuthRouter />;
};
