import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaTrash, FaEdit } from "react-icons/fa";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { listTransactionsAPI } from "../../services/transactions/transactionService";
import { listCategoriesAPI } from "../../services/category/categoryService";
import UpdateTransactionModal from "./UpdateTransactionModal";
import DeleteTransactionModal from "./DeleteTransactionModal";

const TransactionList = () => {
  //!Modal states
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  //!Filtering state
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "",
    category: "",
  });
  //!Handle Filter Change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  //fetching
  const {
    data: categoriesData,
    isLoading: categoryLoading,
    error: categoryErr,
  } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });
  //fetching
  const {
    data: transactions,
    isError,
    isLoading,
    isFetched,
    error,
    refetch,
  } = useQuery({
    queryFn: () => listTransactionsAPI(filters),
    queryKey: ["list-transactions", filters],
  });

  //! Handle Update Transaction
  const handleUpdateTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsUpdateModalOpen(true);
  };

  //! Handle Delete Transaction
  const handleDelete = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  //! Handle Modal Close
  const handleCloseModals = () => {
    setIsUpdateModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedTransaction(null);
  };

  //! Handle Success
  const handleSuccess = () => {
    refetch();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
          Recent Transactions
        </h2>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Start Date */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all duration-300 text-sm shadow-sm"
          />
        </div>
        {/* End Date */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 mb-1">End Date</label>
          <input
            value={filters.endDate}
            onChange={handleFilterChange}
            type="date"
            name="endDate"
            className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all duration-300 text-sm shadow-sm"
          />
        </div>
        {/* Type */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Type</label>
          <div className="relative">
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white appearance-none text-sm transition-all duration-300 shadow-sm"
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
        {/* Category */}
        <div className="relative">
          <label className="block text-xs font-semibold text-gray-500 mb-1">Category</label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={handleFilterChange}
              name="category"
              className="w-full p-3 rounded-xl border border-gray-200 bg-white/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 focus:bg-white appearance-none text-sm transition-all duration-300 shadow-sm"
            >
              <option value="All">All Categories</option>
              <option value="Uncategorized">Uncategorized</option>
              {categoriesData?.map((category) => {
                return (
                  <option key={category?._id} value={category?.name}>
                    {category?.name}
                  </option>
                );
              })}
            </select>
            <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Transaction List */}
      <div className="bg-white/50 backdrop-blur-md rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <ul className="divide-y divide-gray-100">
          {transactions?.map((transaction) => (
            <li
              key={transaction._id}
              className="p-5 hover:bg-white/80 transition-all duration-300 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 group border-b border-gray-50 last:border-0 hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center w-full gap-3 sm:gap-6">
                {/* Date & Batch */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span
                    className={`shrink-0 px-3 py-1 text-xs font-bold rounded-full shadow-sm ${transaction.type === "income"
                      ? "bg-teal-100 text-teal-700 border border-teal-200"
                      : "bg-red-100 text-red-700 border border-red-200"
                      }`}
                  >
                    {transaction.type.charAt(0).toUpperCase() +
                      transaction.type.slice(1)}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {transaction.category || 'Uncategorized'}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-sm text-gray-500 truncate max-w-xs block">
                      {transaction.description}
                    </span>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <span className={`font-bold text-lg ${transaction.type === 'income' ? 'text-teal-600' : 'text-gray-900'
                    }`}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </span>

                  {/* Actions */}
                  <div className="flex space-x-2 shrink-0">
                    <button
                      onClick={() => handleUpdateTransaction(transaction)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(transaction)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
          {(!transactions || transactions.length === 0) && (
            <li className="p-8 text-center text-gray-500">
              No transactions found for the selected filters.
            </li>
          )}
        </ul>
      </div>

      {/* Modals */}
      <UpdateTransactionModal
        isOpen={isUpdateModalOpen}
        transaction={selectedTransaction}
        onClose={handleCloseModals}
        onSuccess={handleSuccess}
      />
      <DeleteTransactionModal
        isOpen={isDeleteModalOpen}
        transaction={selectedTransaction}
        onClose={handleCloseModals}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default TransactionList;
