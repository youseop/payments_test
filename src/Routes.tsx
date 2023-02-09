import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
  </Routes>
);

export default MainRoutes;
