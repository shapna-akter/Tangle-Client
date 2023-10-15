import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import Spinner from "../../shared/Spinner/Spinner";
import ScheduleDetailsModal from "./ScheduleDetailsModal";
import moment from "moment";


const DailySchedule = () => {
  const { token } = useContext(AuthContext);
  const { id } = useParams();
  const [caregiverDetails, setCaregiverDetails] = useState();

  const startDate = useState(moment().format("DD-MMM-YYYY"));
  const formattedStartDate = moment(startDate, "DD-MMM-YYYY").format("YYYY-MM-DD");

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const {
    data: schedules = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["schedules", id, formattedStartDate],
    queryFn: async () => {
      const url = `https://server.tanglecare.us/api/v1/schedule/caregiver-schedule?caregiverId=${id}&time=${formattedStartDate}&scheduleType=daily&page=1&limit=10&skipLimit=Yes`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setCaregiverDetails(data.data[0].caregiverDetails)
      return data.data[0].allScheduleDetails;
    },
  });

  // delete Schedule
  const handleDeleteSchedule = (schedule) => {
    const proceed = window.confirm(
      "Are you sure want to delete this schedule?"
    );
    if (proceed) {
      fetch(`${schedule._id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            refetch();
            toast.success("Successfully deleted");
          }
        });
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <div>
      <div className="my-2">
        <input
          type="date"
          value={formattedStartDate}
          readOnly
          className="bg-info text-base-100 p-1 lg:text-xs font-bold rounded-md cursor-pointer text-center"
        />
      </div>
      {schedules.length === 0 ? (
        <div className="flex justify-center items-center font-bold lg:text-3xl p-12 text-red-500">
          Caregiver not assigned
        </div>
      ) : (
        <div className="">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-0 shadow-md">
            {schedules
              .map((schedule, index) => (
                <div
                  key={schedule?._id}
                  className="border-2 text-xs"
                >
                  <div className="text-center">
                    <div className="bg-primary text-base-100 pt-4 pb-2 text-xl">
                      <p>Task {index + 1} </p>
                    </div>
                    <div className="text-xs font-medium border-b-2">
                      <p>
                        {schedule?.startTime} - {schedule?.endTime}
                      </p>
                    </div>
                    <div className="card-body px-2">
                      <div className="bg-[#3776D4] text-base-100 py-6 px-2 text-center">
                        <p>
                          {schedule?.clientDetails?.name?.firstName && capitalizeFirstLetter(schedule?.clientDetails?.name?.firstName)} {schedule?.clientDetails?.name?.middleName && capitalizeFirstLetter(schedule?.clientDetails?.name?.middleName)} {schedule?.clientDetails?.name?.lastName && capitalizeFirstLetter(schedule?.clientDetails?.name?.lastName)} and {caregiverDetails?.name?.firstName && capitalizeFirstLetter(caregiverDetails.name.firstName)} {caregiverDetails?.name?.middleName && capitalizeFirstLetter(caregiverDetails?.name?.middleName)} {caregiverDetails?.name?.lastName && capitalizeFirstLetter(caregiverDetails?.name?.lastName)}</p>

                        {schedule?.timeFrame && (
                          <p>Visit: {schedule?.timeFrame}</p>
                        )}
                        <label htmlFor="schedule-modal" className="btn btn-xs btn-primary text-base-100 mt-4">
                          Show Details
                        </label>
                      </div>
                    </div>

                  </div>
                  <ScheduleDetailsModal schedule={schedule} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailySchedule;
