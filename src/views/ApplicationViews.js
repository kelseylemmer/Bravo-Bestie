import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { Authorized } from "./Authorized";
import { FranchiseDetails } from "../components/franchise/FranchiseDetails";
import { ProfileDetails } from "../components/profile/ProfileView";
import { EditProfile } from "../components/profile/EditProfile";
import { FranchiseList } from "../components/franchise/FranchiseList";
import { Home } from "../components/home/home";
import { CastDetails } from "../components/cast/CastDetails";



export const ApplicationViews = ({ token, setToken }) => {


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />

        <Route element={<Authorized />} >
          <Route path="/" element={<Home token={token} />} />
          <Route path="/franchises">
            <Route index element={<FranchiseList />} />
            <Route path=":id" element={<FranchiseDetails token={token} />} />
          </Route>
          <Route path="/myProfile">
            <Route index element={<ProfileDetails token={token} />} />
            <Route path="edit" element={<EditProfile token={token} setToken={setToken} />} />
          </Route>
          <Route path="/cast/:id" element={<CastDetails />} />
        </Route>
      </Routes>
    </>
  );
};