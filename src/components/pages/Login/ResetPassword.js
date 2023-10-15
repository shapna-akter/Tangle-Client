import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import victor1 from "../../../assets/Vector-1.png";
import victor2 from "../../../assets/Vector-2.png";
import victor from "../../../assets/Vector.png";
import logo1 from "../../../assets/brandLogo.png";

const ResetPassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm();
  const password = watch("password");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = (data) => {
    console.log(data);
    setLoginError("");

    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");
    const otp = urlParams.get("otp");

    const updatePassword = {
      email: email,
      password: data.password,
      otp: otp,
    };

    console.log(updatePassword);

    fetch("https://server.tanglecare.us/api/v1/reset-password", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatePassword),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        reset();
        toast.success("Your password has been reset");
        navigate("/");
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
          Reset your password
        </h3>
        <form onSubmit={handleSubmit(handleResetPassword)}>
          <div className="my-4">
            <div className="form-control relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                name="password"
                className="border-b-2 p-3"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 font-semibold text-xs px-3">
                  {errors.password?.message}
                </p>
              )}
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                {showPassword ? (
                  <FaEye className="text-gray-400" />
                ) : (
                  <FaEyeSlash className="text-gray-400" />
                )}
              </button>
            </div>
            <div className="form-control relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Re enter new password"
                name="confirmPassword"
                className="border-b-2 p-3"
                {...register("confirmPassword", {
                  required: "confirm Password is required",
                  validate: (value) =>
                    value === password || "Password must match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 font-semibold text-xs px-3">
                  {errors.confirmPassword?.message}
                </p>
              )}
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-2"
              >
                {showPassword ? (
                  <FaEye className="text-gray-400" />
                ) : (
                  <FaEyeSlash className="text-gray-400" />
                )}
              </button>
            </div>
          </div>
          <div>
            {loginError && (
              <p className="text-red-500 font-semibold">{loginError}</p>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Reset Password"
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

export default ResetPassword;
