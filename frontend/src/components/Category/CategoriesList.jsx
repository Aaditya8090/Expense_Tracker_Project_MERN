import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCategoryAPI,
  listCategoriesAPI,
} from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  const defaultCategoryNames = new Set([
    "salary",
    "side income",
    "food",
    "movie",
    "bills",
    "medical",
    "fee",
    "tax",
  ]);

  const { data, isError, isLoading, isFetched, error, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const navigate = useNavigate();

  const {
    mutateAsync,
    isPending,
    error: categoryErr,
    isSuccess,
  } = useMutation({
    mutationFn: deleteCategoryAPI,
    mutationKey: ["delete-category"],
  });

  const handleDelete = (id) => {
    mutateAsync(id)
      .then((data) => {
        refetch();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="max-w-2xl mx-auto my-10 bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-700 to-blue-700">
            Categories
          </h2>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Manage your income and expense categories.
          </p>
        </div>
        <Link to="/add-category">
          <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 text-white font-bold py-2.5 px-5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
            + Add New
          </button>
        </Link>
      </div>

      {isLoading && <AlertMessage type="loading" message="Loading categories..." />}
      {isError && (
        <AlertMessage type="error" message={error?.response?.data?.message || "Error loading categories."} />
      )}

      <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
        <ul className="divide-y divide-gray-100">
          {data?.map((category) => {
            const isDefault = defaultCategoryNames.has(
              (category?.name || "").toLowerCase()
            );

            return (
              <li
                key={category?._id}
                className="p-4 hover:bg-white transition-colors duration-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-center w-full gap-3 sm:gap-6">
                  {/* Category Type Badge */}
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span
                      className={`shrink-0 px-3 py-1 text-xs font-bold rounded-full shadow-sm ${category.type === "income"
                          ? "bg-teal-100 text-teal-700 border border-teal-200"
                          : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                    >
                      {category?.type?.charAt(0).toUpperCase() +
                        category?.type?.slice(1)}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-lg">
                        {category?.name}
                      </span>
                      {isDefault && (
                        <span className="px-2 py-0.5 inline-flex text-xs font-semibold rounded-full bg-gray-200 text-gray-600 border border-gray-300">
                          Default
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {!isDefault && (
                    <div className="flex space-x-2 shrink-0">
                      <Link to={`/update-category/${category._id}`}>
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(category?._id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>
              </li>
            );
          })}
          {(!data || data.length === 0) && !isLoading && (
            <li className="p-8 text-center text-gray-500">
              No categories found. Add one to get started.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesList;
