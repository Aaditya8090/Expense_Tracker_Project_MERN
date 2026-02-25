import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { registerAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

//Validations
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
});

const RegistrationForm = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.auth?.user);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .catch((e) => console.log(e));
    },
  });

  useEffect(() => {
    let timeout;
    if (isSuccess) {
      timeout = setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isPending, isError, error, isSuccess, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-200/40 mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-200/40 mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-[20%] right-[20%] w-[50%] h-[50%] rounded-full bg-pink-200/40 mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white/50 z-10 transform transition-all hover:scale-[1.01]">
        <div>
          <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-teal-800">
            Create Account
          </h2>
          <p className="mt-3 text-center text-sm text-gray-500 font-medium">
            Join our community and manage expenses
          </p>
        </div>

        {/* Display messages */}
        {isPending && <AlertMessage type="loading" message="Creating account..." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || error?.message || "Registration failed"} />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Registration success. Redirecting to login..." />
        )}

        <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-5">
            {/* Input Field - Username */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              </div>
              <input
                id="username"
                type="text"
                {...formik.getFieldProps("username")}
                placeholder="Full Name / Username"
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white sm:text-sm transition-all duration-300 shadow-sm"
              />
              {formik.touched.username && formik.errors.username && (
                <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-2">{formik.errors.username}</span>
              )}
            </div>

            {/* Input Field - Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              </div>
              <input
                id="email"
                type="email"
                {...formik.getFieldProps("email")}
                placeholder="Email address"
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white sm:text-sm transition-all duration-300 shadow-sm"
              />
              {formik.touched.email && formik.errors.email && (
                <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-2">{formik.errors.email}</span>
              )}
            </div>

            {/* Input Field - Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              </div>
              <input
                id="password"
                type="password"
                {...formik.getFieldProps("password")}
                placeholder="Password"
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white sm:text-sm transition-all duration-300 shadow-sm"
              />
              {formik.touched.password && formik.errors.password && (
                <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-2">{formik.errors.password}</span>
              )}
            </div>

            {/* Input Field - Confirm Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
              </div>
              <input
                id="confirmPassword"
                type="password"
                {...formik.getFieldProps("confirmPassword")}
                placeholder="Confirm Password"
                className="block w-full pl-11 pr-4 py-3.5 border border-gray-200 rounded-xl leading-5 bg-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white sm:text-sm transition-all duration-300 shadow-sm"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-2">
                  {formik.errors.confirmPassword}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm">
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                Already have an account? Log in
              </Link>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white ${isPending
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
              } transition-all duration-300`}
          >
            {isPending ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
