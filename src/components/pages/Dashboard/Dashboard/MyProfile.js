import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HiEye, HiUser } from "react-icons/hi";
import { AuthContext } from "../../../../Contexts/AuthProvider";

const MyProfile = () => {
  const [activeItem, setActiveItem] = useState(1);
  const { isValidUser } = useContext(AuthContext);
  console.log(isValidUser);
  const {
    email,
    emergencyInformation,
    name,
    role,
    address,
    organization,
    phoneNumber,
  } = isValidUser;

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div className="lg:mx-16 lg:p-4 flex flex-col justify-center items-center lg:items-start lg:shadow-md lg:border-2 lg:border-t-8 lg:rounded-lg ">
        <h4 className="lg:font-semibold font-bold text-3xl lg:text-base text-info lg:text-neutral mb-5 lg:hidden">
          My Profile
        </h4>
        <div className="flex flex-col lg:flex-row gap-10">
          <img
            src={isValidUser.image}
            className="rounded-lg w-56 h-48 mx-12 lg:mx-0"
            alt="CEO"
          />
          <div>
            <div className="flex flex-col lg:flex-row">
              <div className="text-left mx-12 lg:mx-0">
                <h2 className="text-3xl md:text-2xl font-semibold">
                  {name?.firstName && capitalizeFirstLetter(name.firstName)}{' '}
                  {name?.middleName && capitalizeFirstLetter(name.middleName)}{' '}
                  {name?.lastName && capitalizeFirstLetter(name.lastName)}
                </h2>

                <p className="text-info font-bold text-sm">
                  {role && capitalizeFirstLetter(role)}
                </p>
              </div>
              <div className="divider lg:divider-horizontal"></div>
              <div className="text-left mt-3 px-4 lg:px-0">
                <p className="text-xs uppercase tracking-wide font-semibold text-gray-400">
                  Emergency Information
                </p>
                <p className="text-base font-semibold py-3">
                  Name: {" "}
                  <span className="text-info">
                    {emergencyInformation?.name && capitalizeFirstLetter(emergencyInformation.name)}
                  </span>
                </p>
                <p className="text-base font-semibold py-3">
                  Relation: {" "}
                  <span className="text-info">
                    {emergencyInformation?.relationship && capitalizeFirstLetter(emergencyInformation.relationship)}
                  </span>
                </p>
                <p className="text-base font-semibold py-3">
                  Emergency Contact No: {" "}
                  <span className="text-info">
                    {emergencyInformation?.emergencyContact}
                  </span>
                </p>
                {/* <p className="text-base font-semibold">
                  Emergency Email: <span className="text-info">{ }</span>
                </p> */}
              </div>
            </div>
            <div className="lg:mt-16 mt-8">
              <ul className="flex gap-10 border-b-2 px-2 lg:px-0">
                <li
                  className={
                    activeItem === 0
                      ? "border-b-2 border-info"
                      : "text-gray-400"
                  }
                  onClick={() => setActiveItem(0)}
                >
                  <Link to="" className="flex items-center">
                    {" "}
                    <HiEye></HiEye> Time Out
                  </Link>
                </li>
                <li
                  className={
                    activeItem === 1
                      ? "border-b-2 border-info"
                      : "text-gray-400"
                  }
                  onClick={() => setActiveItem(1)}
                >
                  <Link to="" className="flex items-center">
                    <HiUser></HiUser>About
                  </Link>
                </li>
              </ul>
              <div className="text-left px-4 lg:px-0">
                <p className="text-xs uppercase tracking-wide font-semibold text-gray-400 lg:py-2 py-5">
                  Contact Information
                </p>
                <p className="text-base font-semibold">
                  Phone: <span className="text-info">{phoneNumber}</span>
                </p>
                <p className="text-base font-semibold py-5">
                  Address: <span className="text-info">
                    {address?.address1 && capitalizeFirstLetter(address.address1)}, {" "}
                    {address?.address2 && capitalizeFirstLetter(address.address2)}, {""}
                    {address?.city && capitalizeFirstLetter(address.city)}, {""}
                    {address?.county && capitalizeFirstLetter(address.county)}, {""}
                    {address?.state && capitalizeFirstLetter(address.state)}
                  </span>
                </p>
                <p className="text-base font-semibold">
                  E-mail: <span className="text-info">{email}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProfile;
