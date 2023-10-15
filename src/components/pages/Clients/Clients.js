import React, { useContext, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider";
import clientsBanner from "../../../assets/clientsBanner.png";
import DailySchedule from "./DailySchedule";
import MonthlySchedule from "./MonthlySchedule";
import WeeklySchedule from "./WeeklySchedule";
import { FaFileAlt, FaUser } from "react-icons/fa";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { useQuery } from "react-query";
import Spinner from "../../shared/Spinner/Spinner";

const Clients = () => {
  const { token } = useContext(AuthContext);
  const [activeSchedule, setSchedule] = useState(0);
  const navigate = useNavigate();

  // get user details
  const { id } = useParams();
  const {
    data: userDetails = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["userDetails", id],
    queryFn: async () => {
      const url = `https://server.tanglecare.us/api/v1/user/${id}`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      return data.data;
    },
  });

  if (isLoading) {
    <Spinner></Spinner>;
  }

  const handleCancel = () => {
    navigate(-1);
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div className="flex justify-start items-center text-primary text-lg font-bold underline">
        <BsFillCaretLeftFill></BsFillCaretLeftFill>
        <button type="button" onClick={handleCancel}>
          Back to previous page
        </button>
      </div>
      <div className="relative">
        <img
          src={clientsBanner}
          alt=""
          className="absolute inset-0 w-full h-full object-cover bg-center bg-no-repeat opacity-40"
        />
        <div className="pt-12 pb-28 px-20 text-primary text-left relative z-10">
          <ul className="flex flex-col md:flex-row gap-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="hidden lg:block">|</li>
            <li>
              <Link>{userDetails?.role && capitalizeFirstLetter(userDetails.role)}</Link>
            </li>
            <li className="hidden lg:block">|</li>
            <li>
              <Link>
                {userDetails?.name?.firstName} {userDetails?.name?.middleName}{" "}
                {userDetails?.name?.lastName}
              </Link>
            </li>
          </ul>
          <h2 className="font-bold text-5xl">{userDetails?.role && capitalizeFirstLetter(userDetails.role)}</h2>
        </div>
      </div>
      <div className="m-6">
        <div className="mb-4 flex items-center gap-1">
          <FaUser />
          <Link to="/dashboard/addClient" className="text-primary font-medium">
            Add Clients
          </Link>
        </div>
        <div className="lg:shadow-md lg:border-2 lg:border-t-8 lg:rounded-lg lg:py-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b-2 pb-4">
            <div>
              <h3 className="text-3xl font-semibold">
                {userDetails?.name?.firstName && capitalizeFirstLetter(userDetails.name.firstName)}{' '}
                {userDetails?.name?.middleName && capitalizeFirstLetter(userDetails.name.middleName)}{' '}
                {userDetails?.name?.lastName && capitalizeFirstLetter(userDetails.name.lastName)}
              </h3>
              <p className="text-info text-base font-semibold">
                <Link to="/dailyProgress">Click for Care Plan</Link>
              </p>
              <div className="text-base font-medium text-[#3184E3]">
                <p>
                  Mobile : {userDetails?.phoneNumber}
                </p>
                <p>
                  Email : {userDetails?.email}
                </p>
                <p className="text-base font-medium text-[#3184E3]">
                  Social SecurityNumber : {userDetails?.socialSecurityNumber}
                </p>
                <p className="text-base font-medium text-[#3184E3]">
                  {userDetails?.role && capitalizeFirstLetter(userDetails.role)} | {userDetails?.organization?.name && capitalizeFirstLetter(userDetails.organization.name)}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4">
              <div className="divider lg:divider-horizontal"></div>
              <div className="">
                <p className="text-xs font-semibold text-[#979797] uppercase">
                  CLIENT address
                </p>
                <p className="text-base font-medium">
                  {userDetails?.address?.address1 && capitalizeFirstLetter(userDetails.address.address1)},{' '}
                  {userDetails?.address?.address2 && capitalizeFirstLetter(userDetails.address.address2)},{' '}
                  {userDetails?.address?.city && capitalizeFirstLetter(userDetails.address.city)},{' '}
                  {userDetails?.address?.county && capitalizeFirstLetter(userDetails.address.county)},{' '}
                  {userDetails?.address?.state && capitalizeFirstLetter(userDetails.address.state)},{' '}
                  {userDetails?.address?.zip && capitalizeFirstLetter(userDetails.address.zip)}
                </p>
              </div>
              <div className="divider lg:divider-horizontal"></div>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#979797] uppercase">
                emergency contact
              </p>
              <p className="text-base font-medium">
                Name : {userDetails?.emergencyInformation?.name && capitalizeFirstLetter(userDetails.emergencyInformation.name)}
              </p>
              <p className="text-base font-medium">
                Relation : {userDetails?.emergencyInformation?.relationship && capitalizeFirstLetter(userDetails.emergencyInformation.relationship)}
              </p>
              <p className="text-base font-medium">
                {" "}
                Phone : {userDetails?.emergencyInformation?.emergencyContact}
              </p>
            </div>
          </div>

          {/* For Schedule */}
          <div className="text-gray-400 flex flex-col justify-center items-center">
            <Link
              to={`/dashboard/addSchedule?clientId=${id}`}
              className="text-primary font-medium"
            >
              Add Schedule
            </Link>
            <p className="font-medium uppercase">schedule</p>

            <ul className="flex gap-2 capitalize text-xs font-medium my-4 lg:my-0">
              <li
                onClick={() => setSchedule(0)}
                className={
                  activeSchedule === 0
                    ? "border-b-2 border-info"
                    : "cursor-pointer"
                }
              >
                Daily schedule |
              </li>
              <li
                onClick={() => setSchedule(1)}
                className={
                  activeSchedule === 1
                    ? "border-b-2 border-info"
                    : "cursor-pointer"
                }
              >
                Weekly schedule |
              </li>
              <li
                onClick={() => setSchedule(2)}
                className={
                  activeSchedule === 2
                    ? "border-b-2 border-info"
                    : "cursor-pointer"
                }
              >
                monthly schedule
              </li>
            </ul>
          </div>
          <div>
            {activeSchedule === 0 ? (
              <DailySchedule />
            ) : activeSchedule === 1 ? (
              <WeeklySchedule />
            ) : (
              <MonthlySchedule />
            )}
          </div>

          <div className="mt-2 font-semibold text-xs md:text-base flex lg:flex-row flex-col lg:justify-between">
            <Link>Preferred Caregivers | Prohibited Caregivers</Link>
            <label
              htmlFor="pay_rates_modal"
              className="flex items-center cursor-pointer mt-2 lg:mt-0"
            >
              <FaFileAlt className="text-primary"></FaFileAlt>
              <p className="text-info">Pay rates</p>
            </label>
          </div>
          {/* Pop-up */}
          <input
            type="checkbox"
            id="pay_rates_modal"
            className="modal-toggle"
          />
          <div className="modal">
            <div className="modal-box">
              <h3 className="font-semibold text-lg bg-primary text-base-100 text-center p-2">
                Pay rates
              </h3>
              <div className="px-4 py-3 font-bold text-primary border-b-2 border-primary">
                <p>First</p>
                <p>Second</p>
                <p>Third</p>
                <p>Mileage</p>
              </div>
              <div className="modal-action">
                <label
                  htmlFor="pay_rates_modal"
                  className="btn bg-primary text-base-100 btn-sm lg:btn-md"
                >
                  Close!
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Clients;
