import React, { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { changePasswordAPI } from "../../services/users/userService";
import { logoutAction } from "../../redux/slice/authSlice";
import AlertMessage from "../Alert/AlertMessage";
const validationSchema = Yup.object({
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Email is required"),
});

const UpdatePassword = () => {
  //Dispatch
  const dispatch = useDispatch();
  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: changePasswordAPI,
    mutationKey: ["change-password"],
  });
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    // Validations
    validationSchema,
    //Submit
    onSubmit: (values) => {
      mutateAsync(values.password)
        .then((data) => {
          //Logout
          dispatch(logoutAction());
          //remove the user from storage
          localStorage.removeItem("userInfo");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="flex flex-col">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
        <AiOutlineLock className="text-blue-500 text-3xl" />
        Change Your Password
      </h3>
      <form onSubmit={formik.handleSubmit} className="w-full">
        <div className="mb-6 max-w-md">
          <label
            className="block text-sm font-semibold text-gray-700 mb-2"
            htmlFor="new-password"
          >
            New Password
          </label>

          {isPending && <div className="mb-4"><AlertMessage type="loading" message="Updating...." /></div>}
          {isError && (
            <div className="mb-4"><AlertMessage type="error" message={error.response?.data?.message || "Failed to update"} /></div>
          )}
          {isSuccess && (
            <div className="mb-4"><AlertMessage
              type="success"
              message="Password updated successfully"
            /></div>
          )}

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <AiOutlineLock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" />
            </div>
            <input
              id="new-password"
              type="password"
              name="newPassword"
              {...formik.getFieldProps("password")}
              className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm"
              placeholder="Enter new password"
            />
          </div>
          {formik.touched.password && formik.errors.password && (
            <span className="text-xs text-red-500 mt-1 block">
              {formik.errors.password}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`group mt-6 relative px-8 py-3 border border-transparent text-sm font-bold rounded-xl text-white ${isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-teal-600 to-blue-500 hover:from-teal-500 hover:to-blue-400 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            } transition-all duration-300`}
        >
          {isPending ? "Updating Password..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
