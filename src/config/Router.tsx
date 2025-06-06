import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ResultsPage from "../pages/ResultsPage";
import { ROUTES } from "./routes";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path="/results" element={<ResultsPage />} />

      <Route path="*" element={<h1>404: Page not found</h1>} />
    </Routes>
  );
};

export default Router;
