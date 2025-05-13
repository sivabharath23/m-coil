import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import Aircooler from "../Aircooler/Aircooler";



const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/aircooler" element={<Aircooler />} />

      </Routes>
    </div>
  );
};

export default Router;
