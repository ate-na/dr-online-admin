import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Therapists from "../pages/Therapist";
import Location from "../pages/Locations";

const RoutesNavigation = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/therapists" element={<Therapists />} />
      <Route path="/locations" element={<Location />} />
    </Routes>
  );
};

export default RoutesNavigation;
