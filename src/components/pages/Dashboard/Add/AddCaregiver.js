import React, { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthProvider";
import { useQuery } from "react-query";
import { BsFillCaretLeftFill } from "react-icons/bs";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';

const AddCaregiver = () => {
  const { isValidUser, token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [caregiverError, setCaregiverError] = useState("");

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm();

  const formatSocialSecurityNumber = (input) => {
    const cleaned = ("" + input).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return input;
  };

  const formatPhoneNumber = (input) => {
    const cleaned = ("" + input).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return input;
  };

  //  GET ALL States
  const { data: states = [], refetch } = useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const res = await fetch(
        "https://server.tanglecare.us/api/v1/common/states",
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

  const handleAddCaregiver = (data) => {
    console.log(data);
    const name = {
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    };
    const address = {
      county: data.county,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      state: data.state,
      zip: data.zip,
    };

    const emergencyInformation = {
      name: data.name,
      relationship: data.relationship,
      emergencyContact: data.emergencyContact,
    };

    const newData = {
      ...data,
      name: name,
      address: address,
      emergencyInformation: emergencyInformation,
      organization: isValidUser.organization._id,
    };

    setCaregiverError("");

    fetch("https://server.tanglecare.us/api/v1/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data?.data?.user?.status === "success") {
          toast.success(data.data.user.message);
          reset();
          navigate("/dashboard/caregiverList");
        } else {
          toast.error(data.data.user.message);
        }
      });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="mx-6">
      <div className="border-b-2 border-primary pb-4">
        <h3 className="text-3xl text-primary font-bold text-center">
          Add a Employee
        </h3>
        <div className="flex justify-start items-center text-primary text-lg font-bold underline">
          <BsFillCaretLeftFill></BsFillCaretLeftFill>
          <button type="button" onClick={handleCancel}>
            Back to previous page
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleAddCaregiver)}>
        <div className="my-4">
          <div className="border-b-2 border-gray-400 pb-8">
            <h4 className="text-2xl text-primary font-semibold text-center my-4">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <label htmlFor="firstName" className="font-semibold block mb-2 text-sm">
                  First Name
                </label>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{ required: "First Name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="First Name"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                    />
                  )}
                />
                {errors.firstName && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="middleName" className="font-semibold block mb-2 text-sm">
                  Middle Name
                </label>
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Middle Name"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                    />
                  )}
                />
                {errors.middleName && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.middleName?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="font-semibold block mb-2 text-sm">
                  Last Name
                </label>
                <Controller
                  name="lastName"
                  control={control}
                  rules={{ required: "Last Name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Last Name"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                    />
                  )}
                />
                {errors.lastName && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="dob" className="font-semibold block mb-2 text-sm">
                  Date Of Birth
                </label>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: "Date Of Birth is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="08/22/2003"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                    />
                  )}
                />
                {errors.dob && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.dob?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="font-semibold block mb-2 text-sm">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{ required: "Email is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="sample@tangle.com"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="SocialSecurityNumber" className="font-semibold block mb-2 text-sm">
                  Social Security Number
                </label>
                <Controller
                  name="socialSecurityNumber"
                  control={control}
                  rules={{ required: "Social Security Number is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="999-99-9999"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      onChange={(e) => {
                        const formattedValue = formatSocialSecurityNumber(e.target.value);

                        if (formattedValue.length <= 11) {
                          field.onChange(formattedValue);
                        }
                      }}
                    />
                  )}
                />
                {errors.socialSecurityNumber && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.socialSecurityNumber?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="font-semibold block mb-2 text-sm">
                  Phone Number
                </label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  rules={{ required: "Phone Number is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      placeholder="999-999-9999"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
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
            </div>
          </div>
          <div className="border-b-2 border-gray-400 pb-8">
            <h4 className="text-2xl text-primary font-semibold text-center my-4">
              Residential Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <Controller
                name="address1"
                control={control}
                rules={{ required: 'Address 1 is required' }}
                render={({ field }) => (
                  <div>
                    <label htmlFor="address1" className="font-semibold block mb-2 text-sm">
                      Address 1
                    </label>
                    <input
                      type="text"
                      placeholder="Street 1, Colony"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      {...field}
                    />
                    {errors.address1 && (
                      <p className="text-red-500 font-semibold text-xs py-1">
                        {errors.address1?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="address2"
                control={control}
                render={({ field }) => (
                  <div>
                    <label htmlFor="address2" className="font-semibold block mb-2 text-sm">
                      Address 2
                    </label>
                    <input
                      type="text"
                      placeholder="Landmark, Area"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      {...field}
                    />
                    {errors.address2 && (
                      <p className="text-red-500 font-semibold text-xs py-1">
                        {errors.address2?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="city"
                control={control}
                rules={{ required: 'City is required' }}
                render={({ field }) => (
                  <div>
                    <label htmlFor="city" className="font-semibold block mb-2 text-sm">
                      City
                    </label>
                    <input
                      type="text"
                      placeholder="City Name"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      {...field}
                    />
                    {errors.city && (
                      <p className="text-red-500 font-semibold text-xs py-1">
                        {errors.city?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="state"
                control={control}
                rules={{ required: 'State is required' }}
                render={({ field }) => (
                  <div>
                    <label htmlFor="state" className="font-semibold block mb-2 text-sm">
                      State
                    </label>
                    <select
                      {...field}
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        setSearchTerm(e.target.value);
                      }}
                    >
                      <option disabled>Select State</option>
                      {states
                        .filter((state) =>
                          state.stateName.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map((state) => (
                          <option
                            className="text-sm"
                            key={state?._id}
                            value={state?.stateName}
                          >
                            {state?.stateName}
                          </option>
                        ))}
                    </select>
                    {errors.state && (
                      <p className="text-red-500 font-semibold text-xs py-1">
                        {errors.state?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="zip"
                control={control}
                rules={{ required: 'Zip code is required' }}
                render={({ field }) => (
                  <div>
                    <label htmlFor="zipCode" className="font-semibold block mb-2 text-sm">
                      Zip Code
                    </label>
                    <input
                      type="number"
                      placeholder="Zip code"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      {...field}
                    />
                    {errors.zip && (
                      <p className="text-red-500 font-semibold text-xs py-1">
                        {errors.zip?.message}
                      </p>
                    )}
                  </div>
                )}
              />
              <Controller
                name="county"
                control={control}
                rules={{ required: 'County is required' }}
                render={({ field }) => (
                  <div>
                    <label htmlFor="county" className="font-semibold block mb-2 text-sm">
                      County
                    </label>
                    <input
                      type="text"
                      placeholder="County"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      {...field}
                    />
                    {errors.county && (
                      <p className="text-red-500 font-semibold text-xs py-1">
                        {errors.county?.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="border-b-2 border-gray-400 pb-8">
            <h4 className="text-2xl text-primary font-semibold text-center my-4">
              Emergency Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <label htmlFor="name" className="font-semibold block mb-2 text-sm">
                  Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: 'Emergency Contact Name is required' }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Emergency Contact Name"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      {...field}
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="emergencyContact" className="font-semibold block mb-2 text-sm">
                  Emergency Contact
                </label>
                <Controller
                  name="emergencyContact"
                  control={control}
                  rules={{ required: 'Emergency Contact Number is required' }}
                  render={({ field }) => (
                    <input
                      type="tel"
                      placeholder="Emergency Contact Number"
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
                {errors.emergencyContact && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.emergencyContact?.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="relationship" className="font-semibold block mb-2 text-sm">
                  Relation
                </label>
                <Controller
                  name="relationship"
                  control={control}
                  rules={{ required: 'Emergency Contact Relation is required' }}
                  render={({ field }) => (
                    <input
                      type="text"
                      placeholder="Emergency Contact Relation"
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      {...field}
                    />
                  )}
                />
                {errors.relationship && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.relationship?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-2xl text-primary font-semibold text-center my-4">
              Work Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <label htmlFor="password" className="font-semibold block mb-2 text-sm">
                  Password
                </label>
                <div className="relative">
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required" }}
                    render={({ field }) => (
                      <Input.Password
                        placeholder="8-digit password"
                        className="w-full px-3 py-2 border rounded-md input input-info border-black"
                        {...field}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    )}
                  />
                  {errors.password && (
                    <p className="text-red-500 font-semibold text-xs py-1">
                      {errors.password?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="font-semibold block mb-2 text-sm">
                  Confirm Password
                </label>
                <div className="relative">
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: "Confirm Password is required",
                      validate: (value) => value === getValues("password") || "Password do not match",
                    }}
                    render={({ field }) => (
                      <Input.Password
                        placeholder="8-digit password"
                        className="w-full px-3 py-2 border rounded-md input input-info border-black"
                        {...field}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 font-semibold text-xs py-1">
                      {errors.confirmPassword?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="position" className="font-semibold block mb-2 text-sm">
                  Position
                </label>
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "Position is required" }}
                  render={({ field }) => (
                    <select
                      className="w-full px-3 py-2 rounded-md input input-info border-black"
                      {...field}
                    >
                      <option disabled>
                        Select your position
                      </option>
                      <option value="caregiver">Caregiver</option>
                      <option value="office-staff">Office Staff</option>
                      <option value="admin">Administrative</option>
                      <option value="cna">CNA</option>
                    </select>
                  )}
                />
                {errors.role && (
                  <p className="text-red-500 font-semibold text-xs">
                    {errors.role?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            {caregiverError && (
              <p className="text-red-500 font-semibold">{caregiverError}</p>
            )}
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

export default AddCaregiver;