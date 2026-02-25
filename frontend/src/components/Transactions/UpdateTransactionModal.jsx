import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTimes } from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { updateTransactionAPI } from "../../services/transactions/transactionService";

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

const UpdateTransactionModal = ({ isOpen, transaction, onClose, onSuccess }) => {
  const { data: categories } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: updateTransactionAPI,
    mutationKey: ["update-transaction"],
    onSuccess: () => {
      onSuccess();
      onClose();
    },
  });

  const formik = useFormik({
    initialValues: {
      type: transaction?.type || "",
      amount: transaction?.amount || "",
      category: transaction?.category?._id || "",
      date: transaction?.date?.split("T")[0] || "",
      time: transaction?.date ? new Date(transaction.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }) : "",
      description: transaction?.description || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      await mutateAsync({
        id: transaction._id,
        ...values,
      });
    },
  });

  if (!isOpen) return null;

  const today = new Date().toISOString().split("T")[0];
  const maxTime = formik.values.date === today
    ? new Date().toTimeString().slice(0, 5)
    : undefined;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-white/50 transform transition-all max-h-[90vh] overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
          <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-blue-700">Update Transaction</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Type Field */}
          <div className="space-y-2 relative group">
            <label className="block text-sm font-semibold text-gray-700">
              Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={formik.values.type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm appearance-none"
            >
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {formik.touched.type && formik.errors.type && (
              <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{formik.errors.type}</p>
            )}
          </div>

          {/* Amount Field */}
          <div className="space-y-2 relative group">
            <label className="block text-sm font-semibold text-gray-700">
              Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="amount"
              value={formik.values.amount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              placeholder="0.00"
            />
            {formik.touched.amount && formik.errors.amount && (
              <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{formik.errors.amount}</p>
            )}
          </div>

          {/* Category Field */}
          <div className="space-y-2 relative group">
            <label className="block text-sm font-semibold text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm appearance-none"
            >
              <option value="">Select Category</option>
              {categories
                ?.filter((cat) => {
                  if (formik.values.type) {
                    return cat?.type === formik.values.type;
                  }
                  return true;
                })
                ?.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-xs mt-1 absolute -bottom-5">
                {formik.errors.category}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date */}
            <div className="space-y-2 relative group">
              <label className="block text-sm font-semibold text-gray-700">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="date"
                max={new Date().toISOString().split("T")[0]}
                value={formik.values.date}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              />
              {formik.touched.date && formik.errors.date && (
                <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{formik.errors.date}</p>
              )}
            </div>

            {/* Time */}
            <div className="space-y-2 relative group">
              <label className="block text-sm font-semibold text-gray-700">
                Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                name="time"
                max={maxTime}
                value={formik.values.time}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              />
              {formik.touched.time && formik.errors.time && (
                <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{formik.errors.time}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2 relative group pt-2">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm resize-none"
              rows="3"
              placeholder="Add a note..."
            />
          </div>

          {isError && (
            <div className="p-4 bg-red-50/50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">
              {error?.message || "Error updating transaction"}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 pt-6 mt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3.5 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-3.5 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold rounded-xl disabled:opacity-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateTransactionModal;
