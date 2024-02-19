import React from "react";
import { Route, Routes } from "react-router-dom";
import Reset from "../pages/Reset";
import Login from "../pages/Login";

function AllRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/reset" element={<Reset />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
