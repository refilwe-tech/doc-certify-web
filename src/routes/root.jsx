import { AuthRouter } from "./auth-routes";
import { AppRouter } from "./app-routes";

export const RootRouter = () => {
  const isAuthenticated = false;
  return isAuthenticated ? <AppRouter /> : <AuthRouter />;
};
