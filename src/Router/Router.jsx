import { Routes, Route } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Router;
