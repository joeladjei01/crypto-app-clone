import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "./Footer";
import WarningBanner from "../common/WarningBanner";

const RootLayout = () => {
  return (
    <div>
      <WarningBanner />
      <Navbar />
      <div>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
