import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dashboardBanner from "../../../../assets/dashboardBanner.png";
import message from "../../../../assets/message.png";
import MyProfile from "./MyProfile";
import Tasks from "./Tasks";
import Documents from "./Documents";
import { BsFillCaretLeftFill } from "react-icons/bs";

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState(0);
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className="flex justify-start items-center text-primary text-lg font-bold underline">
        <BsFillCaretLeftFill></BsFillCaretLeftFill>
        <button type="button" onClick={handleCancel}>
          Back to previous page
        </button>
      </div>
      <div className="relative">
        <img
          src={dashboardBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover bg-center bg-no-repeat opacity-40"
        />
        <div className="lg:pt-12 lg:pb-28 lg:px-20 p-6 text-primary lg:text-left relative z-10">
          <ul className="flex gap-2">
            <li>
              <Link to="/">Home /</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </ul>
          <h2 className="font-bold lg:text-5xl">Dashboard</h2>
        </div>
      </div>
      <div className="flex justify-center">
        <ul className="pt-2 pb-4 px-10 max-w-fit lg:bg-accent flex justify-center gap-4 lg:gap-20 text-neutral lg:mt-10 mt-5 mb-3 lg:mb-5">
          <li
            className={
              activeItem === 0 ? "border-b-2 border-info" : "cursor-pointer"
            }
            onClick={() => setActiveItem(0)}
          >
            Tasks
          </li>
          <li
            className={
              activeItem === 1 ? "border-b-2 border-info" : "cursor-pointer"
            }
            onClick={() => setActiveItem(1)}
          >
            Documents
          </li>
          <li
            className={
              activeItem === 2 ? "border-b-2 border-info" : "cursor-pointer"
            }
            onClick={() => setActiveItem(2)}
          >
            My Profile
          </li>
        </ul>
      </div>
      <div>
        {activeItem === 0 ? (
          <Tasks />
        ) : activeItem === 1 ? (
          <Documents />
        ) : (
          <MyProfile />
        )}
      </div>

      <div className="my-12 lg:text-sm text-xs flex justify-center items-center mx-3 lg:mx-8 relative">
        <p>Powered by Raspberry Mule Inc. | Copyright 2023 </p>
        <img
          src={message}
          alt=""
          className="w-20 absolute right-0 hidden lg:flex"
        />
      </div>
    </div>
  );
};

export default Dashboard;
