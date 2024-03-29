import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthLayout, LoginPage, RegisterPage } from "../components";

export const AuthRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
