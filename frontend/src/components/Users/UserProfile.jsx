import React, { useEffect } from "react";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../services/users/userService";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["change-password"],
  });

  useEffect(() => {
    let timeout;
    if (isSuccess) {
      timeout = setTimeout(() => {
        dispatch(logoutAction());
        localStorage.removeItem("userInfo");
        navigate("/login");
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [isSuccess, dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      username: user?.username || "",
    },
    enableReinitialize: true,

    //Submit
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/40 mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-teal-200/40 mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-indigo-200/40 mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="w-full max-w-4xl space-y-8 z-10">
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-xl border border-white/50 w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-800 to-teal-800 mb-2">
              Welcome {user?.username}
            </h1>
            <span className="text-gray-500 font-medium">{user?.email}</span>
            <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <FaUserCircle className="text-blue-500" />
            Update Profile
          </h3>

          {/* Display message */}
          {isPending && <AlertMessage type="loading" message="Updating...." />}
          {isError && (
            <AlertMessage type="error" message={error.response?.data?.message || "Failed to update"} />
          )}
          {isSuccess && (
            <AlertMessage type="success" message="Updated successfully" />
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* User Name Field */}
              <div className="relative group">
                <label
                  htmlFor="username"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUserCircle className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                  </div>
                  <input
                    {...formik.getFieldProps("username")}
                    type="text"
                    id="username"
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
                    placeholder="Your username"
                  />
                  {formik.touched.username && formik.errors.username && (
                    <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-2">
                      {formik.errors.username}
                    </span>
                  )}
                </div>
              </div>

              {/* Email Field */}
              <div className="relative group">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    disabled
                    {...formik.getFieldProps("email")}
                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 bg-gray-100 text-gray-500 cursor-not-allowed rounded-xl shadow-inner focus:outline-none"
                    placeholder="Your email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-xs text-red-500 mt-1 absolute -bottom-5 left-2">
                      {formik.errors.email}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end mt-8">
              <button
                type="submit"
                disabled={isPending}
                className={`group relative px-8 py-3 border border-transparent text-sm font-bold rounded-xl text-white ${isPending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-500 hover:to-teal-400 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                  } transition-all duration-300 flex items-center gap-2`}
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Password Update Section */}
        <div className="bg-white/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-xl border border-white/50 w-full mb-10">
          <UpdatePassword />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
