import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import "moment-timezone";
import { useQuery } from "react-query";

const MonthlySchedule = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [caregiverDetails, setCaregiverDetails] = useState();
  const startDate = moment();
  const endDate = moment(startDate).add(30, "days");

  const formattedStartDate = moment(startDate).format("DD-MMM-YYYY");
  const formattedEndDate = moment(endDate).format("DD-MMM-YYYY");
  const dateRange = `${formattedStartDate} - ${formattedEndDate}`;

  const {
    data: schedules = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["schedules", id, formattedStartDate],
    queryFn: async () => {
      const url = `https://server.tanglecare.us/api/v1/schedule/caregiver-schedule?caregiverId=${id}&time=${formattedStartDate}&scheduleType=monthly&page=1&limit=10&skipLimit=Yes`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data.data);
      setCaregiverDetails(data.data[0].caregiverDetails)
      return data.data[0].allScheduleDetails;
    },
  });

  return (
    <div>
      <div className="my-2">
        <input
          type="text"
          value={dateRange}
          readOnly
          className="bg-info text-base-100 p-1 lg:text-xs font-bold rounded-md cursor-pointer text-center"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-7 lg:gap-0 lg:border-b-4 lg:border-r-4 shadow-md text-center">
        {/* {schedules?.map((schedule, index) => (
          <div
            key={schedule?._id}
            className="border-2 lg:border-r-2 lg:border-0 text-xs"
          >
            <div className="bg-primary text-base-100 pt-4 pb-2 text-xl">
              <p>Task {index + 1} </p>
            </div>
            <div className="text-xs font-medium border-b-2">
              <p>
                {(schedule?.startTime).slice(0, 10)} {"-"}{" "}
                {(schedule?.endTime).slice(0, 10)}
              </p>
            </div>
            <div className="card-body px-2">
              <div className="bg-[#3776D4] text-base-100 py-6 px-2 text-center">
                <p>
                  Caregiver: {schedule?.caregiverDetails?.firstName}{" "}
                  {schedule.caregiverDetails.lastName}
                </p>
                <p>Visit: {schedule?.shiftType}</p>
              </div>
            </div>
            <div className="mb-2">
              <Link className="bg-green-500 text-white px-4 py-2 rounded-lg mt-4 mr-2">
                Edit
              </Link>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mt-4">
                Delete
              </button>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default MonthlySchedule;
