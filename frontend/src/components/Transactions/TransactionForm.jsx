import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { addTransactionAPI } from "../../services/transactions/transactionService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date()
    .max(new Date(), "Date cannot be in the future")
    .required("Date is required"),
  time: Yup.string()
    .required("Time is required")
    .test(
      "is-future-time",
      "Time cannot be in the future",
      function (value) {
        const { date } = this.parent;
        if (!date || !value) return true;
        const selectedDate = new Date(date).toISOString().split("T")[0];
        const today = new Date().toISOString().split("T")[0];
        if (selectedDate === today) {
          const currentTime = new Date();
          const selectedTime = new Date(`${today}T${value}`);
          return selectedTime <= currentTime;
        }
        return true;
      }
    ),
  description: Yup.string(),
});

const TransactionForm = () => {
  const navigate = useNavigate();

  const {
    mutateAsync,
    isPending,
    isError: isAddTranErr,
    error: transErr,
    isSuccess,
  } = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ["add-transaction"],
  });

  const { data, isError, isLoading, isFetched, error, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      time: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .catch((e) => console.log(e));
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.resetForm();
    }
  }, [isSuccess]);

  const today = new Date().toISOString().split("T")[0];
  const maxTime = formik.values.date === today
    ? new Date().toTimeString().slice(0, 5)
    : undefined;

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-blue-700">
          New Transaction
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-medium">
          Fill in the details below to add a transaction.
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
        <AlertMessage type="success" message="Transaction added successfully" />
      )}

      {/* Transaction Type Field */}
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
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        {formik.touched.type && formik.errors.type && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.type}</p>
        )}
      </div>

      {/* Amount Field */}
      <div className="space-y-2 relative group">
        <label htmlFor="amount" className="flex gap-2 items-center text-sm font-semibold text-gray-700">
          <FaDollarSign className="text-teal-500" />
          <span>Amount</span>
        </label>
        <input
          type="number"
          {...formik.getFieldProps("amount")}
          id="amount"
          placeholder="0.00"
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:ring-opacity-50 transition-colors"
        />
        {formik.touched.amount && formik.errors.amount && (
          <p className="text-red-500 text-xs mt-1">{formik.errors.amount}</p>
        )}
      </div>

      {/* Category Field */}
      <div className="space-y-2 relative group">
        <label htmlFor="category" className="flex gap-2 items-center text-sm font-semibold text-gray-700">
          <FaRegCommentDots className="text-teal-500" />
          <span>Category</span>
        </label>
        <select
          {...formik.getFieldProps("category")}
          id="category"
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:ring-opacity-50 transition-colors"
        >
          <option value="">Select a category</option>
          {data
            ?.filter((category) => {
              if (formik.values.type) {
                return category?.type === formik.values.type;
              }
              return true;
            })
            ?.map((category) => {
              return (
                <option key={category?._id} value={category?.name}>
                  {category?.name}
                </option>
              );
            })}
        </select>
        {formik.touched.category && formik.errors.category && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.category}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date Field */}
        <div className="space-y-2 relative group">
          <label htmlFor="date" className="flex gap-2 items-center text-sm font-semibold text-gray-700">
            <FaCalendarAlt className="text-teal-500" />
            <span>Date</span>
          </label>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            {...formik.getFieldProps("date")}
            id="date"
            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:ring-opacity-50 transition-colors"
          />
          {formik.touched.date && formik.errors.date && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.date}</p>
          )}
        </div>

        {/* Time Field */}
        <div className="space-y-2 relative group">
          <label htmlFor="time" className="flex gap-2 items-center text-sm font-semibold text-gray-700">
            <FaCalendarAlt className="text-teal-500" />
            <span>Time</span>
          </label>
          <input
            type="time"
            max={maxTime}
            {...formik.getFieldProps("time")}
            id="time"
            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:ring-opacity-50 transition-colors"
          />
          {formik.touched.time && formik.errors.time && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.time}</p>
          )}
        </div>
      </div>

      {/* Description Field */}
      <div className="space-y-2 relative group">
        <label htmlFor="description" className="flex gap-2 items-center text-sm font-semibold text-gray-700">
          <FaRegCommentDots className="text-teal-500" />
          <span>Description (Optional)</span>
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          id="description"
          placeholder="Add any extra details..."
          rows="3"
          className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 focus:border-teal-500 focus:ring-2 focus:ring-teal-500 focus:bg-white focus:ring-opacity-50 transition-colors resize-none"
        ></textarea>
        {formik.touched.description && formik.errors.description && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.description}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-3.5 px-4 font-bold rounded-xl text-white transition-all duration-300 ${isPending
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
          }`}
      >
        {isPending ? 'Submitting...' : 'Add Transaction'}
      </button>
    </form>
  );
};

export default TransactionForm;
