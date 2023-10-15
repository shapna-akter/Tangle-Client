import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { AuthContext } from "../../../../Contexts/AuthProvider";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { TimePicker } from "antd";
import { BsFillCaretLeftFill } from "react-icons/bs";

const AddSchedule = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState("shift");

  //Get client Id
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const clientId = searchParams.get("clientId");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: caregivers = [] } = useQuery({
    queryKey: ["caregivers"],
    queryFn: async () => {
      const res = await fetch(
        "https://server.tanglecare.us/api/v1/onlycaregivers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data.data;
    },
  });

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);

    const formData = {
      scheduleType: data.scheduleType,
      startDate: data.startDate,
      shiftType: data.shiftType,
      startTime: data.startTime,
      endTime: data.endTime,
      monday: data.monday,
      tuesday: data.tuesday,
      wednesday: data.wednesday,
      thursday: data.thursday,
      friday: data.friday,
      saturday: data.saturday,
      sunday: data.sunday,
      endDate: data.endDate,
      caregiver: data.caregiver,
      timeFrame: data.timeFrame,
      clientId: clientId
    };
    const submitData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );
    console.log(submitData);

    fetch("https://server.tanglecare.us/api/v1/schedule/create-schedule", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(submitData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success === true) {
          toast.success("Schedule created successfully");
          navigate("/dashboard/caregiverList");
          reset();
        } else {
          toast.error("Try again");
        }
      });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="mx-6 mb-6">
        <div className="border-b-2 border-primary pb-4">
          <h3 className="text-3xl text-primary font-bold text-center">
            Add Schedules
          </h3>
          <div className="flex justify-start items-center text-primary text-lg font-bold underline">
            <BsFillCaretLeftFill></BsFillCaretLeftFill>
            <button type="button" onClick={handleCancel}>
              Back to previous page
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-10">
            <Controller
              name="scheduleType"
              control={control}
              defaultValue="daily"
              rules={{ required: "Shift is required" }}
              render={({ field }) => (
                <select
                  {...field}
                  className="bg-primary text-base-100 p-2 lg:text-xl rounded-md"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              )}
            />
            {errors.scheduleType && (
              <p className="text-red-500 font-semibold text-xs py-1">
                {errors.scheduleType?.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mt-8">
            <div className="flex flex-col">
              <label className="label">
                <span className="lg:text-2xl font-medium">Date</span>
              </label>
              <div>
                <Controller
                  name="startDate"
                  control={control}
                  rules={{ required: "Start Date is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="border-2 border-info p-3 rounded-lg cursor-pointer w-full"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                    />
                  )}
                />
                {errors.startDate && (
                  <p className="text-red-500 font-semibold text-xs  py-1">
                    {errors.startDate?.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="label">
                <span className="lg:text-2xl font-medium">Schedule Type:</span>
              </label>
              <div>
                <Controller
                  name="shiftType"
                  control={control}
                  defaultValue="shift"
                  render={({ field }) => (
                    <select
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleTypeChange(e);
                      }}
                      className="select select-info border-2 w-full"
                    >
                      <option className="text-sm" value="shift">
                        Shift
                      </option>
                      <option className="text-sm" value="visit">
                        Visit
                      </option>
                    </select>
                  )}
                />
              </div>
            </div>
          </div>
          {selectedType === "shift" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mt-8">
              <div className="font-medium">
                <label className="label">
                  <span className="lg:text-2xl">Start Time</span>
                </label>
                <div>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        className="border-2 border-info p-3 rounded-lg cursor-pointer w-full"
                        format="h:mm a"
                        use12Hours
                        size="large"
                        onChange={(time, timeString) =>
                          field.onChange(timeString)
                        }
                      />
                    )}
                  />
                </div>
              </div>
              <div className="font-medium">
                <label className="label">
                  <span className="lg:text-2xl">End Time</span>
                </label>
                <div>
                  <Controller
                    name="endTime"
                    control={control}
                    render={({ field }) => (
                      <TimePicker
                        className="border-2 border-info p-3 rounded-lg cursor-pointer w-full"
                        format="h:mm a"
                        use12Hours
                        size="large"
                        onChange={(time, timeString) =>
                          field.onChange(timeString)
                        }
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="label">
                  <span className="lg:text-2xl font-medium">Recurrence</span>
                </label>
                <div className="border-2 border-info p-4 rounded-lg">
                  {[
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                  ].map((day) => (
                    <div className="form-control" key={day}>
                      <label className="flex items-center gap-2">
                        <Controller
                          name={day}
                          control={control}
                          defaultValue={false}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              className="checkbox border-2"
                              {...field}
                            />
                          )}
                        />
                        <span className="text-xl font-semibold">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </span>
                      </label>
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <label className="label">
                      <span className="lg:text-2xl font-medium">End Date</span>
                    </label>
                    <div>
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="border-2 border-info p-3 rounded-lg cursor-pointer w-full"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="label">
                  <span className="lg:text-2xl font-medium">
                    Assign Caregiver:
                  </span>
                </label>
                <div>
                  <select
                    {...register("caregiver")}
                    className="select select-info border-2 w-full"
                  >
                    <option className="text-sm" value="">
                      Select Caregiver
                    </option>
                    {caregivers?.map((caregiver) => (
                      <option
                        className="text-sm"
                        key={caregiver?._id}
                        value={caregiver?._id}
                      >
                        {caregiver?.name?.firstName}{" "}
                        {caregiver?.name?.middleName}{" "}
                        {caregiver?.name?.lastName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
          {selectedType === "visit" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mt-8">
              <div className="flex flex-col">
                <label className="label">
                  <span className="lg:text-2xl font-medium">Time Frame</span>
                </label>
                <div>
                  <Controller
                    name="timeFrame"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="select select-info border-2 w-full"
                      >
                        <option className="text-sm" value="">
                          Select a Time Frame
                        </option>
                        <option className="text-sm" value="morning">
                          Morning
                        </option>
                        <option className="text-sm" value="afternoon">
                          Afternoon
                        </option>
                        <option className="text-sm" value="evening">
                          Evening
                        </option>
                        <option className="text-sm" value="overnight">
                          Overnight
                        </option>
                      </select>
                    )}
                  />

                  {errors.timeFrame && (
                    <p className="text-red-500 font-semibold text-xs  py-1">
                      {errors.timeFrame?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col">
                <label className="label">
                  <span className="lg:text-2xl font-medium">Recurrence</span>
                </label>
                <div className="border-2 border-info p-4 rounded-lg">
                  {[
                    "monday",
                    "tuesday",
                    "wednesday",
                    "thursday",
                    "friday",
                    "saturday",
                    "sunday",
                  ].map((day) => (
                    <div className="form-control" key={day}>
                      <label className="flex items-center gap-2">
                        <Controller
                          name={day}
                          control={control}
                          defaultValue={false}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              className="checkbox border-2"
                              {...field}
                            />
                          )}
                        />
                        <span className="text-xl font-semibold">
                          {day.charAt(0).toUpperCase() + day.slice(1)}
                        </span>
                      </label>
                    </div>
                  ))}
                  <div className="flex flex-col">
                    <label className="label">
                      <span className="lg:text-2xl font-medium">End Date</span>
                    </label>
                    <div>
                      <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="border-2 border-info p-3 rounded-lg cursor-pointer w-full"
                            type="date"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end gap-4 mt-6 lg:mt-12">
            <input
              type="button"
              value="Cancel"
              className="text-base-100 bg-primary rounded-lg px-4 2xl:px-12 py-2 font-medium cursor-pointer hover:bg-primary-dark"
              onClick={handleCancel}
            />
            <input
              type="submit"
              value="Save Schedule"
              className="text-base-100 bg-primary rounded-lg px-4 2xl:px-12 py-2 font-medium cursor-pointer hover:bg-primary-dark"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddSchedule;
