import { User } from "firebase/auth";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";

interface MainRoutesProps {
  user: User | undefined;
}
const MainRoutes = ({ user }: MainRoutesProps) => (
  <Routes>
    <Route path="/" element={<MainPage user={user} />} />
    <Route path="/profile" element={<Profile user={user} />} />
  </Routes>
);

export default MainRoutes;
