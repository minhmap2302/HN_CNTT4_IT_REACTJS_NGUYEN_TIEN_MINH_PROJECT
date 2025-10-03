import React from "react";
import Header from "../pages/Header";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";

export default function Manager() {
  return (
    <div>
      <Header></Header>
      <div className="pt-[50px] pb-[60px]">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
}
