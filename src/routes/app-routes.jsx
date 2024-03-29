import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AppLayout,
  DocsPage,
  HomePage,
  NewDocPage,
  ProfilePage,
} from "../components";

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <AppLayout>
            <ProfilePage />
          </AppLayout>
        }
      />
      <Route
        path="/docs"
        element={
          <AppLayout>
            <DocsPage />
          </AppLayout>
        }
      />
      <Route
        path="/new-doc"
        element={
          <AppLayout>
            <NewDocPage />
          </AppLayout>
        }
      />
    </Routes>
  </BrowserRouter>
);
