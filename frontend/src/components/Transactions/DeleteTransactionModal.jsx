import React from "react";
import { useMutation } from "@tanstack/react-query";
import { FaTimes, FaTrash } from "react-icons/fa";
import { deleteTransactionAPI } from "../../services/transactions/transactionService";

const DeleteTransactionModal = ({ isOpen, transaction, onClose, onSuccess }) => {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: deleteTransactionAPI,
    mutationKey: ["delete-transaction"],
    onSuccess: () => {
      onSuccess();
      onClose();
    },
  });

  const handleDelete = async () => {
    await mutateAsync(transaction._id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity">
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-sm border border-white/50 transform transition-all text-center relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
        >
          <FaTimes size={20} />
        </button>

        <div className="mb-6 mt-4">
          <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-50 rounded-full mb-6 relative">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-75"></div>
            <FaTrash className="w-7 h-7 text-red-500 relative z-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Delete Transaction?</h2>
          <p className="text-gray-500 text-sm">
            Are you sure you want to delete this transaction? This action cannot be undone.
          </p>

          <div className="bg-gray-50 rounded-xl p-4 mt-6 text-left border border-gray-100">
            <p className="text-gray-800 font-medium">
              <span className={`font-bold ${transaction?.type === 'income' ? 'text-teal-600' : 'text-gray-900'}`}>
                {transaction?.type === 'income' ? '+' : '-'}₹{transaction?.amount?.toLocaleString()}
              </span>{" "}
              <span className="text-gray-500 font-normal">for</span> {transaction?.category?.name}
            </p>
            <p className="text-gray-500 text-xs mt-1">
              {new Date(transaction?.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} at {new Date(transaction?.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {isError && (
          <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm mb-6 border border-red-100 font-medium">
            {error?.message || "Error deleting transaction"}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 disabled:opacity-50 transition-colors shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTransactionModal;
