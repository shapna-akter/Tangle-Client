import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useQuery } from "react-query";
import { BsFillCaretLeftFill } from "react-icons/bs";

const AddOrganization = () => {
  const { isValidUser, token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();

  const formatPhoneNumber = (input) => {
    const cleaned = ("" + input).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return input;
  };

  const handleAddOrganization = (data) => {
    console.log(data);
    // const name = {
    //     name: data.name,
    //     middleName: data.middleName,
    //     lastName: data.lastName,
    // };
    // const address = {
    //     county: data.county,
    //     address: data.address,
    //     address2: data.address2,
    //     city: data.city,
    //     state: data.state,
    //     zip: data.zip,
    // };

    // const emergencyInformation = {
    //     name: data.name,
    //     relationship: data.relationship,
    //     emergencyContact: data.emergencyContact,
    // };

    // const newData = {
    //     ...data,
    //     name: name,
    //     address: address,
    //     emergencyInformation: emergencyInformation,
    //     organization: isValidUser.organization._id,
    // };

    // setCaregiverError("");

    // fetch("", {
    //     method: "POST",
    //     headers: {
    //         "content-type": "application/json",
    //     },
    //     body: JSON.stringify(newData),
    // })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data);
    //         if (data?.data?.user?.status === "success") {
    //             toast.success(data.data.user.message);
    //             reset();
    //             navigate("/");
    //         } else {
    //             toast.error(data.data.user.message);
    //         }
    //     });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="mx-6">
      <div className="border-b-2 border-primary pb-4">
        <h3 className="text-3xl text-primary font-bold text-center">
          Add Organization
        </h3>
        <div className="flex justify-start items-center text-primary text-lg font-bold underline">
          <BsFillCaretLeftFill></BsFillCaretLeftFill>
          <button type="button" onClick={handleCancel}>
            Back to previous page
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleAddOrganization)}>
        <div className="my-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
            <div>
              <label htmlFor="name" className="font-semibold block mb-2 text-sm">Name</label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ required: 'Organization Name is required' }}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="Organization Name"
                    className="w-full px-3 py-2 rounded-md input input-info border-black"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 font-semibold text-xs py-1">{errors.name?.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="address" className="font-semibold block mb-2 text-sm">
                Address
              </label>
              <div>
                <Controller
                  name="address"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Address 1 is required' }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Street 1, Colony"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                    />
                  )}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 font-semibold text-xs py-1">
                  {errors.address?.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="font-semibold block mb-2 text-sm">
                Phone Number
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                defaultValue=""
                rules={{ required: 'Phone Number is required' }}
                render={({ field }) => (
                  <input
                    type="tel"
                    placeholder="999-999-9999"
                    className="w-full px-3 py-2 rounded-md input input-info border-black"
                    {...field}
                    onChange={(e) => {
                      const formattedValue = formatPhoneNumber(e.target.value);

                      if (formattedValue.length <= 12) {
                        field.onChange(formattedValue);
                      }
                    }}
                  />
                )}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 font-semibold text-xs py-1">
                  {errors.phoneNumber?.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="font-semibold block mb-2 text-sm">Email</label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{ required: 'Email is required' }}
                render={({ field }) => (
                  <input
                    type="email"
                    placeholder="sample@tangle.com"
                    className="w-full px-3 py-2 rounded-md input input-info border-black"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p className="text-red-500 font-semibold text-xs py-1">{errors.email?.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6 lg:mt-12">
            <input
              type="button"
              value="Cancel"
              className="text-base-100 bg-primary rounded-lg px-4 2xl:px-12 py-2 font-medium cursor-pointer hover:bg-primary-dark"
              onClick={handleCancel}
            />
            <input
              type="submit"
              value="Save"
              className="text-base-100 bg-primary rounded-lg px-4 2xl:px-12 py-2 font-medium cursor-pointer hover:bg-primary-dark"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddOrganization;