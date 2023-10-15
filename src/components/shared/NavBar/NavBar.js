import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import logo1 from "../../../assets/brandLogo.png";
import logo2 from "../../../assets/tangleLogo.png";

const NavBar = () => {
  const { isValidUser } = useContext(AuthContext);
  const { email } = isValidUser;

  const handleSignOut = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  return (
    <>
      <div className="navbar flex justify-between items-center">
        <div className="lg:hidden">
          {email && (
            <label
              htmlFor="dashboard-drawer"
              tabIndex={2}
              className="btn btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
          )}
        </div>
        <Link
          to="/"
          className="btn btn-ghost normal-case text-xl flex justify-center items-center"
        >
          <img src={logo1} alt="brandLogo" className="h-4 lg:h-8" />
          <img src={logo2} alt="tangleLogo" className="h-3 lg:h-6" />
        </Link>
        {/* <div className="hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div> */}
        <div>
          {email && (
            <button
              className="btn btn-primary btn-sm text-white capitalize"
              onClick={handleSignOut}
            >
              Logout
            </button>
          )}
        </div>
        {/* <div className="dropdown lg:hidden">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content mt-2 p-2 py-4 lg:py-0 bg-success w-screen"
          >
            {navItems}
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default NavBar;
