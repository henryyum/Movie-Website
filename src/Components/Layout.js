import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div>
      <div className="header-wrapper">
        <Header />
      </div>

      <Outlet />
      <div className="footer-wrapper">
      <Footer />
      </div>
    </div>
  );
}
