import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import victor1 from "../../../assets/Vector-1.png";
import victor2 from "../../../assets/Vector-2.png";
import victor from "../../../assets/Vector.png";
import logo1 from "../../../assets/brandLogo.png";

const Email = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [loginError, setLoginError] = useState("");

  const handleLogin = (data) => {
    console.log(data);
    setLoginError("");

    fetch("https://server.tanglecare.us/api/v1/forgot-password", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.success("Please check your email");
        reset();
      });
  };
  return (
    <div className="grid grid-cols-1 gap-32 md:gap-72 lg:gap-96">
      <div className="md:w-96 w-66 mx-auto">
        <div className="flex justify-center gap-2 text-xl mt-32 mb-10">
          <img src={logo1} alt="brandLogo" className="w-12" />
          <h2 className="uppercase text-4xl text-primary font-semibold">
            Tangle<span className="text-info">Care</span>
          </h2>
        </div>
        <h3 className="font-semibold text-xl text-black mb-4 text-center">
          Login to your account
        </h3>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Agency Number
            </label>
            <input
              type="email"
              placeholder="Tangle#448877"
              className="w-full px-3 py-2 rounded-md input input-info border-black"
              {...register("email", { required: "Agency Number is required" })}
            />
            {errors.email && (
              <p className="text-red-500 font-semibold text-xs">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div>
            {loginError && (
              <p className="text-red-500 font-semibold">{loginError}</p>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Enter"
              className="w-full px-8 py-3 font-semibold rounded-md bg-info text-base-100 mt-4 cursor-pointer"
            />
          </div>
        </form>
      </div>

      <div className="relative lg:mt-20">
        <div className="absolute bottom-0">
          <img src={victor} alt="" />
        </div>
        <div className="absolute bottom-0">
          <img src={victor1} alt="" />
        </div>
        <div className="absolute bottom-0">
          <img src={victor2} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Email;
