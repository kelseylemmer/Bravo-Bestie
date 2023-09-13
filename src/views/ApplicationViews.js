import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { FranchiseDetails } from "../components/franchises/FranchiseDetails";


export const ApplicationViews = ({ token, setToken }) => {


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        {/* <Route path="/" element={<Login setToken={setToken} />} /> */}
        <Route path="/register" element={<Register setToken={setToken} />} />

        <Route element={<Authorized />} >
          <Route exact path="/franchises/:id" element={<FranchiseDetails token={token} />} />
        </Route>
      </Routes>
    </>
  );
};