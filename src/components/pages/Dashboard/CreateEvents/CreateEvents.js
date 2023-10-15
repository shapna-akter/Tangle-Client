import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import moment from "moment";

const CreateEvents = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [eventType, setEventType] = useState("daily");
  const [startDate, setStartDate] = useState(moment().utc());
  const [endDate, setEndDate] = useState(moment().utc());

  const formatDate = (date) => {
    return moment.utc(date).format("YYYY-MM-DD");
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);

    if (eventType === "daily") {
      setEndDate(date);
    } else if (eventType === "weekly") {
      setEndDate(moment(date).add(6, "days").utc());
    } else if (eventType === "monthly") {
      setEndDate(moment(date).add(30, "days").utc());
    }
  };

  const onSubmit = (data) => {
    const formData = {
      eventType: data.event,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
    };
    console.log(formData);

    fetch("https://server.tanglecare.us/api/v1/event/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === true) {
          toast.success("Event created successfully");
          navigate("/dashboard/addSchedule");
        } else {
          toast.error("Try again");
        }
      });
  };

  return (
    <div className="mx-6">
      <h3 className="text-3xl text-primary font-bold text-center mt-6 border-b-2 border-primary pb-4">
        Events
      </h3>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row items-center gap-4 mt-8">
            <label className="label">
              <span className="lg:text-2xl font-medium">Select Event Type:</span>
            </label>
            <div>
              <select
                {...register("event", {
                  required: "event is required",
                })}
                className="select select-info text-lg border-2 w-full"
                value={eventType}
                onChange={(e) => {
                  setEventType(e.target.value);
                  handleStartDateChange(startDate);
                }}
              >
                <option className="text-sm" value="daily">
                  Daily
                </option>
                <option className="text-sm" value="weekly">
                  Weekly
                </option>
                <option className="text-sm" value="monthly">
                  Monthly
                </option>
              </select>
              {errors.event && (
                <p className="text-red-500 font-semibold text-xs">
                  {errors.event?.message}
                </p>
              )}
            </div>
          </div>
          <div className="font-medium mt-8">
            <label className="label">
              <span className="lg:text-2xl">Start Date</span>
            </label>
            <div>
              <input
                type="date"
                value={formatDate(startDate)}
                onChange={(e) =>
                  handleStartDateChange(moment.utc(e.target.value))
                }
                className="border-2 border-info p-3 rounded-lg cursor-pointer w-full"
              />
            </div>
            <label className="label">
              <span className="lg:text-2xl">End Date</span>
            </label>
            <div>
              <input
                type="date"
                value={formatDate(endDate)}
                onChange={(e) =>
                  setEndDate(moment.utc(e.target.value))
                }
                className="border-2 border-info p-3 rounded-lg cursor-pointer w-full"
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6 lg:mt-12">
            <input
              type="submit"
              value="Save"
              className="text-base-100 bg-primary rounded-lg px-4 2xl:px-12 py-2 font-medium cursor-pointer hover:bg-primary-dark"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvents;
