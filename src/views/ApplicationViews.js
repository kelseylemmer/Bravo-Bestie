import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { FranchiseDetails } from "../components/franchises/FranchiseDetails";
import { ProfileDetails } from "../components/profile/ProfileView";
import { EditProfile } from "../components/profile/EditProfile";


export const ApplicationViews = ({ token, setToken }) => {


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        {/* <Route path="/" element={<Login setToken={setToken} />} /> */}
        <Route path="/register" element={<Register setToken={setToken} />} />

        <Route element={<Authorized />} >
          <Route exact path="/franchises/:id" element={<FranchiseDetails token={token} />} />
          <Route path="/myProfile">
            <Route index element={<ProfileDetails token={token} />} />
            <Route path="edit" element={<EditProfile token={token} setToken={setToken} />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};