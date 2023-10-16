import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthProvider";
import bgImg from "../../../../assets/BannerBg.webp";
const Banner = () => {
  // const { isValidUser } = useContext(AuthContext);
  // const { email } = isValidUser;
  return (
    <div
      className="lg:min-h-screen h-52 md:h-96 bg-no-repeat bg-cover bg-center flex items-center w-full"
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      <div className="w-3/4 md:w-2/6 lg:w-3/5 text-left lg:pl-16 pl-6">
        <h1 className="text-xl lg:text-3xl xl:text-6xl font-medium text-primary">
          Achieve Peace of Mind with{" "}
          <span className="text-info">TangleCare</span>
        </h1>
        {/* <Link
          to="/login"
          className="btn btn-primary rounded-full text-white lg:text-base lg:mt-10 mt-4 lg:ml-5 capitalize lg:w-44 lg:h-14"
        >
          Agency Login
        </Link> */}
      </div>
      <div className="absolute top-8 lg:right-10 left-2 text-left lg:text-right">
        <Link
          to=""
          className="btn btn-primary btn-xs lg:btn-md text-white mt-10 lg:ml-5 capitalize"
        >
          Need Help?
        </Link>
        {/* {email ? (
          <Link
            to="/dashboard"
            className="btn btn-primary btn-xs lg:btn-md text-white mt-10 ml-2 lg:ml-5 capitalize"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            to="/login"
            className="btn btn-primary text-white mt-10 lg:ml-5 capitalize"
          >
            Login
          </Link>
        )} */}
        <Link
          to="/dashboard"
          className="btn btn-primary btn-xs lg:btn-md text-white mt-10 lg:ml-5 capitalize"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Banner;
