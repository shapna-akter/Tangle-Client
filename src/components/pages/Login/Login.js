import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider';
import victor1 from "../../../assets/Vector-1.png";
import victor2 from "../../../assets/Vector-2.png";
import victor from "../../../assets/Vector.png";
import logo1 from "../../../assets/brandLogo.png";
const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { isValidUser, loading, updateUserState } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    // console.log("isValidUser useEffect:", isValidUser);
    if (isValidUser && isValidUser.email && isValidUser.role) {
      navigate(from, { replace: true });
    }
  }, [isValidUser, navigate, from]);


  const handleLogin = async (data) => {
    setLoginError('');

    try {
      const response = await fetch('https://server.tanglecare.us/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result?.data?.status === 'failed') {
        setLoginError(result?.data?.message);
        toast.error(result?.data?.message);
      }

      if (result?.data?.token) {
        localStorage.setItem('accessToken', result.data.token);
        updateUserState(result?.data);
        toast.success('Login successfully');
        navigate(from, { replace: true });
        window.location.reload(true);
      }
    } catch (error) {
      console.error('Login Error:', error);
      toast.error('An error occurred during login.');
    }
  };

  return (
    <div className="grid grid-cols-1 gap-32 md:gap-72 lg:gap-96">
      <div className="md:w-96 w-66 mx-auto mb-6 lg:mb-96">
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
          <div className="my-4">
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <Link
                to="/email"
                className="text-xs hover:underline text-info font-semibold"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="******"
                className="w-full px-3 py-2 border rounded-md input input-info border-black"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <p className="text-red-500 font-semibold text-xs">
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
          </div>
          <div>
            {loginError && (
              <p className="text-red-500 font-semibold">{loginError}</p>
            )}
          </div>
          <div>
            <input
              type="submit"
              value="Login now"
              className="w-full px-8 py-3 font-semibold rounded-md bg-info text-base-100 mt-4 cursor-pointer"
            />
          </div>
        </form>
      </div>

      <div className="relative lg:mt-36 mt-12">
        <div className="absolute bottom-0 w-full">
          <img src={victor} alt="" className="w-full" />
        </div>
        <div className="absolute bottom-0 w-full">
          <img src={victor1} alt="" className="w-full" />
        </div>
        <div className="absolute bottom-0 w-full">
          <img src={victor2} alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Login;