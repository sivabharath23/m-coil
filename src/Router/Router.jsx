import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import Cooler from "../Cooler/Cooler";
import Result from "../Cooler/Result";


const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/cooler/:type" element={<Cooler />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </div>
  );
};

export default Router;
