import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaSistrix } from "react-icons/fa";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthProvider";
import Spinner from "../../../shared/Spinner/Spinner";
import { BsFillCaretLeftFill } from "react-icons/bs";

const CaregiversList = () => {
  const { token } = useContext(AuthContext);
  const [disableType, setDisableType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  //  GET ALL, Active and Inactive User
  const {
    data: caregivers = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["caregivers", disableType],
    queryFn: async () => {
      let url = `https://server.tanglecare.us/api/v1/getUser?role=caregiver`;
      if (
        disableType !== null &&
        disableType !== undefined &&
        disableType !== ""
      ) {
        url += `&disablesStatus=${disableType}`;
      }

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

  const handleDisableTypeChange = (event) => {
    console.log(event.target.value);
    setDisableType(event.target.value);
  };

  useEffect(() => {
    refetch();
  }, [refetch, disableType]);

  // Block and unblock user
  const handleBlockOrUnblock = (caregiverId) => {
    fetch(`https://server.tanglecare.us/api/v1/users/disable/${caregiverId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.disablesStatus === true) {
          toast.success("You have blocked the user");
        } else {
          toast.success("You have unblocked the user");
        }
        refetch();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Search user by email and name
  const handleSearch = async () => {
    try {
      const res = await fetch(
        `https://server.tanglecare.us/api/v1/search?searchQuery=${searchQuery}`
      );
      const data = await res.json();
      setSearchResults(data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <div>Error occurred while fetching data. Please try again.</div>;
  }

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="mx-6">
      <h2 className="text-3xl font-medium text-info text-center">
        Caregivers List
      </h2>
      <div className="flex justify-start items-center text-primary text-lg font-bold underline">
        <BsFillCaretLeftFill></BsFillCaretLeftFill>
        <button type="button" onClick={handleCancel}>
          Back to previous page
        </button>
      </div>
      <div className="bg-[#E7F4FB] py-4 px-12 mt-2 flex flex-col justify-center items-center gap-4 md:flex-row md:justify-between lg:gap-0">
        <div className="font-bold text-base-100 flex flex-col md:flex-row gap-2">
          <div className=" flex gap-0 items-center">
            <div>
              <input
                type="text"
                placeholder="Search"
                className="px-3 py-2 border rounded-md bg-info placeholder-white font-bold"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="bg-info p-3 rounded-md text-base-100 cursor-pointer">
              <FaSistrix onClick={handleSearch} />
            </div>
          </div>
          <select
            className="bg-info py-2 px-3 rounded-md"
            value={disableType}
            onChange={handleDisableTypeChange}
          >
            <option value="">All</option>
            <option value="true">Block</option>
            <option value="false">Unblock</option>
          </select>

          {/* <p className="bg-info py-2 pl-2 pr-8 rounded-md">From Date</p>
          <p className="bg-info py-2 pl-2 pr-8 rounded-md">To Date</p> */}
        </div>
        <div>
          <span className="bg-info py-2 px-4 rounded-md text-base-100 font-bold">
            Export
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>View</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Unblock/Block</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.length > 0
              ? // Render search results if available
                searchResults.map((caregiver, i) => (
                  <tr key={caregiver?._id}>
                    <th>{i + 1}</th>
                    <td>
                      <Link to={`/caregivers/${caregiver?._id}`}>
                        <FaEye className="text-info text-2xl"></FaEye>
                      </Link>
                    </td>
                    <td>
                      {caregiver?.name?.firstName} {caregiver?.name?.middleName}{" "}
                      {caregiver?.name?.lastName}
                    </td>
                    <td>{caregiver?.email}</td>
                    <td>{caregiver?.phoneNumber}</td>
                    <td>
                      {caregiver?.address?.address1} ,{" "}
                      {caregiver?.address?.address2}
                    </td>

                    <td>
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={caregiver.disablesStatus}
                        onChange={() => handleBlockOrUnblock(caregiver._id)}
                      />
                    </td>
                  </tr>
                ))
              : // Otherwise, render caregivers data
                caregivers?.map((caregiver, i) => (
                  <tr key={caregiver?._id}>
                    <th>{i + 1}</th>
                    <td>
                      <Link to={`/caregivers/${caregiver?._id}`}>
                        <FaEye className="text-info text-2xl"></FaEye>
                      </Link>
                    </td>
                    <td>
                      {caregiver?.name?.firstName} {caregiver?.name?.middleName}{" "}
                      {caregiver?.name?.lastName}
                    </td>
                    <td>{caregiver?.email}</td>
                    <td>+1 {caregiver?.phoneNumber}</td>
                    <td>
                      {caregiver?.address?.address1} ,{" "}
                      {caregiver?.address?.address2}
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        className="toggle"
                        checked={caregiver.disablesStatus}
                        onChange={() => handleBlockOrUnblock(caregiver._id)}
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CaregiversList;
