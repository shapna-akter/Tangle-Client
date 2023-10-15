import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthProvider";
import { useQuery } from "react-query";
import { BsFillCaretLeftFill } from "react-icons/bs";

const AddClient = () => {
  const { isValidUser, token } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [clientError, setClientError] = useState("");
  const navigate = useNavigate();
  const [selfPay, setSelfPay] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleSelfPayChange = (e) => {
    setSelfPay(e.target.checked);
  };

  const formatSocialSecurityNumber = (input) => {
    const cleaned = ("" + input).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{2})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return input;
  };

  const handleSocialSecurityNumber = (e) => {
    let value = formatSocialSecurityNumber(e.target.value);

    if (value.length > 11) {
      value = value.slice(0, 11);
    }

    e.target.value = value;
  };

  const formatPhoneNumber = (input) => {
    const cleaned = ("" + input).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return input;
  };

  const handlePhoneNumberChange = (e) => {
    let value = formatPhoneNumber(e.target.value);

    if (value.length > 12) {
      value = value.slice(0, 12);
    }

    e.target.value = value;
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

  const handleAddClient = (data) => {
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

    const payerInformation = {
      phoneNumber: data.phoneNumber,
      insuranceCompany: data.insuranceCompany,
      policyNumber: data.policyNumber,
      selfPay: data.selfPay,
      insurance: data.insurance,
    };

    const referralInfo = {
      refferBy: data.refferBy,
      phoneNumber: data.phoneNumber,
    };

    const newData = {
      ...data,
      name: name,
      address: address,
      emergencyInformation: emergencyInformation,
      payerInformation: payerInformation,
      referralInfo: referralInfo,
      password: "TangleClient",
      organization: isValidUser.organization._id,
    };

    setClientError("");

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
          navigate("/dashboard/clientList");
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
          Add a Client
        </h3>
        <div className="flex justify-start items-center text-primary text-lg font-bold underline">
          <BsFillCaretLeftFill></BsFillCaretLeftFill>
          <button type="button" onClick={handleCancel}>
            Back to previous page
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(handleAddClient)}>
        <div className="my-4">
          <div className="border-b-2 border-gray-400 pb-8">
            <h4 className="text-2xl text-primary font-semibold text-center my-4">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="font-semibold block mb-2 text-sm"
                >
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
                {errors.firstName && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="middleName"
                  className="font-semibold block mb-2 text-sm"
                >
                  Middle Name
                </label>
                <input
                  type="text"
                  placeholder="Middle Name"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("middleName")}
                />
                {errors.middleName && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.middleName?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="font-semibold block mb-2 text-sm"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
                {errors.lastName && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="font-semibold block mb-2 text-sm"
                >
                  Date Of Birth
                </label>
                <input
                  type="text"
                  placeholder="08/22/2003"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("dob", {
                    required: "Date Of Birth is required",
                  })}
                />
                {errors.dob && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.dob?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-semibold block mb-2 text-sm"
                >
                  Email
                </label>
                <input
                  type="email"
                  placeholder="sample@tangle.com"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="SocialSecurityNumber"
                  className="font-semibold block mb-2 text-sm"
                >
                  Social Security Number
                </label>
                <input
                  type="text"
                  placeholder="999-99-9999"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("socialSecurityNumber", {
                    required: "Social SecurityNumber is required",
                  })}
                  onChange={handleSocialSecurityNumber}
                />
                {errors.socialSecurityNumber && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.socialSecurityNumber?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="font-semibold block mb-2 text-sm"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="999-999-9999"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                  })}
                  onChange={handlePhoneNumberChange}
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
              <div>
                <label
                  htmlFor="address1"
                  className="font-semibold block mb-2 text-sm"
                >
                  Address 1
                </label>
                <input
                  type="text"
                  placeholder="Street 1, Colony"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("address1", {
                    required: "Address 1 is required",
                  })}
                />
                {errors.address1 && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.address1?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="address2"
                  className="font-semibold block mb-2 text-sm"
                >
                  Address 2
                </label>
                <input
                  type="text"
                  placeholder="Landmark, Area"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("address2")}
                />
                {errors.address2 && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.address2?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="font-semibold block mb-2 text-sm"
                >
                  City
                </label>
                <input
                  type="text"
                  placeholder="City Name"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("city", {
                    required: "City is required",
                  })}
                />
                {errors.city && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.city?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="state"
                  className="font-semibold block mb-2 text-sm"
                >
                  State
                </label>
                <select
                  {...register("state", {
                    required: "State is required",
                  })}
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                >
                  <option value="">Select State</option>
                  {states
                    .filter((state) =>
                      state.stateName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
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
              <div>
                <label
                  htmlFor="zipCode"
                  className="font-semibold block mb-2 text-sm"
                >
                  Zip Code
                </label>
                <input
                  type="number"
                  placeholder="Zip code"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("zip", {
                    required: "Zip code is required",
                  })}
                />
                {errors.zip && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.zip?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="county"
                  className="font-semibold block mb-2 text-sm"
                >
                  County
                </label>
                <input
                  type="text"
                  placeholder="County"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("county", {
                    required: "County is required",
                  })}
                />
                {errors.county && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.county?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="border-b-2 border-gray-400 pb-8">
            <h4 className="text-2xl text-primary font-semibold text-center my-4">
              Emergency Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="font-semibold block mb-2 text-sm"
                >
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Emergency Contact Name"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("name", {
                    required: "Emergency Contact Name is required",
                  })}
                />
                {errors.name && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.name?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="emergencyContact"
                  className="font-semibold block mb-2 text-sm"
                >
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  placeholder="Emergency Contact Number"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("emergencyContact", {
                    required: "Emergency Contact Number is required",
                  })}
                  onChange={handlePhoneNumberChange}
                />
                {errors.emergencyContact && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.emergencyContact?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="relationship"
                  className="font-semibold block mb-2 text-sm"
                >
                  Relation
                </label>
                <input
                  type="text"
                  placeholder="Emergency Contact Relation"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("relationship", {
                    required: "Emergency Contact Relation is required",
                  })}
                />
                {errors.relationship && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.relationship?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="border-b-2 border-gray-400 pb-12">
            <h4 className="text-2xl text-primary font-semibold text-center my-4">
              Payer Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <label
                  htmlFor="payer"
                  className="font-semibold block mb-2 text-sm"
                >
                  Payer
                </label>
                <div className="form-control">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox border-2"
                      {...register("selfPay")}
                      checked={selfPay}
                      onChange={handleSelfPayChange}
                    />
                    <span className="text-xl font-semibold">Self Pay</span>
                  </label>
                  {errors.selfPay && (
                    <p className="text-red-500 font-semibold text-xs py-1">
                      {errors.selfPay?.message}
                    </p>
                  )}
                </div>
                <div className="form-control">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="checkbox border-2"
                      {...register("insurance")}
                      disabled={selfPay}
                    />
                    <span className="text-xl font-semibold">Insurance</span>
                  </label>
                  {errors.insurance && (
                    <p className="text-red-500 font-semibold text-xs py-1">
                      {errors.insurance?.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="font-semibold block mb-2 text-sm"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Payer Phone Number"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("phoneNumber", {
                    required: "Payer Phone Number is required",
                  })}
                  onChange={handlePhoneNumberChange}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>
            </div>
            <p className="text-xl font-semibold text-info my-4">
              For Insurance, kindly fill below details.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <label
                  htmlFor="insuranceCompany"
                  className="font-semibold block mb-2 text-sm"
                >
                  Insurance Company
                </label>
                <input
                  type="text"
                  placeholder="Name of Insurance Company"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("insuranceCompany")}
                  disabled={selfPay}
                />
                {errors.insuranceCompany && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.insuranceCompany?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="policyNumber"
                  className="font-semibold block mb-2 text-sm"
                >
                  Policy Number
                </label>
                <input
                  type="number"
                  placeholder="Policy Number of Insurance"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("policyNumber")}
                  disabled={selfPay}
                />
                {errors.policyNumber && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.policyNumber?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-2xl text-primary font-semibold text-center my-4">
              Referral Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-4">
              <div>
                <label
                  htmlFor="referralSource"
                  className="font-semibold block mb-2 text-sm"
                >
                  Referral Source
                </label>
                <input
                  type="text"
                  placeholder="Referral Source Name"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("refferBy", {
                    required: "Referral Source is required",
                  })}
                />
                {errors.refferBy && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.refferBy?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="font-semibold block mb-2 text-sm"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Referral Source Phone Number"
                  className="w-full px-3 py-2 rounded-md input input-info border-black"
                  {...register("phoneNumber", {
                    required: "Referral Source Number is required",
                  })}
                  onChange={handlePhoneNumberChange}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 font-semibold text-xs py-1">
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            {clientError && (
              <p className="text-red-500 font-semibold">{clientError}</p>
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

export default AddClient;
