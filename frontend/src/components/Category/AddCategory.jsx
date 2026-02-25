import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const AddCategory = () => {
  const navigate = useNavigate();

  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["add-category"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          navigate("/categories");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-blue-700">
          Add New Category
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-medium">
          Create a new category for your transactions.
        </p>
      </div>

      {isError && (
        <AlertMessage
          type="error"
          message={
            error?.response?.data?.message ||
            "Something happened please try again later"
          }
        />
      )}
      {isSuccess && (
        <AlertMessage
          type="success"
          message="Category added successfully, redirecting..."
        />
      )}

      {/* Category Type */}
      <div className="space-y-2 relative group">
        <label
          htmlFor="type"
          className="flex gap-2 items-center text-sm font-semibold text-gray-700"
        >
          <FaWallet className="text-teal-500" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:ring-opacity-50 transition-colors"
        >
          <option value="">Select category type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.type}</p>
        )}
      </div>

      {/* Category Name */}
      <div className="space-y-2 relative group">
        <label htmlFor="name" className="flex gap-2 items-center text-sm font-semibold text-gray-700">
          <SiDatabricks className="text-teal-500" />
          <span>Name</span>
        </label>
        <input
          type="text"
          {...formik.getFieldProps("name")}
          placeholder="e.g. Salary, Groceries"
          id="name"
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:ring-opacity-50 transition-colors"
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-3.5 px-4 font-bold rounded-xl text-white transition-all duration-300 mt-4 ${isPending
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
          }`}
      >
        {isPending ? 'Adding...' : 'Add Category'}
      </button>
    </form>
  );
};

export default AddCategory;
