import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./pages/components/Header";
import Profile from "./pages/Profile";
import About from "./pages/About";
import PrivateRoute from "./pages/Routes/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./pages/Routes/AdminRoute";
import UpdatePackage from "./pages/admin/UpdatePackage";
import Package from "./pages/Package";
import RatingsPage from "./pages/RatingsPage";
import Booking from "./pages/user/Booking";
import Search from "./pages/Search";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        {/* user */}
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="user" element={<Profile />} />
        </Route>
        {/* admin */}
        <Route path="/profile" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/update-package/:id" element={<UpdatePackage />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/package/:id" element={<Package />} />
        <Route path="/package/ratings/:id" element={<RatingsPage />} />
        {/* checking user auth before booking */}
        <Route path="/booking" element={<PrivateRoute />}>
          <Route path=":packageId" element={<Booking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
