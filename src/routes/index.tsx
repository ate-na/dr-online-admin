import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Therapists from "../pages/Therapist";
import Location from "../pages/Locations";
import Layout from "../layout";
import { useContext } from "react";
import AuthContext from "../context";
import Admin from "../pages/Admin";

const RoutesNavigation = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {!isLoggedIn && <Login />}
      {isLoggedIn && (
        <Layout>
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/therapists" element={<Therapists />} />
            <Route path="/locations" element={<Location />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default RoutesNavigation;
