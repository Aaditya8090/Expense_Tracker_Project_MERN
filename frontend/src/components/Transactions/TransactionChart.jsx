import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { listTransactionsAPI } from "../../services/transactions/transactionService";

ChartJS.register(ArcElement, Tooltip, Legend);

const TransactionChart = () => {
  const {
    data: transactions,
    isError,
    isLoading,
    isFetched,
    error,
    refetch,
  } = useQuery({
    queryFn: listTransactionsAPI,
    queryKey: ["list-transactions"],
  });

  //! calculate total income and expense
  const totals = transactions?.reduce(
    (acc, transaction) => {
      if (transaction?.type === "income") {
        acc.income += transaction?.amount;
      } else {
        acc.expense += transaction?.amount;
      }
      return acc;
    },
    { income: 0, expense: 0 }
  );
  //! Data structure for the chart
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Transactions",
        data: [totals?.income || 0, totals?.expense || 0],
        backgroundColor: ["#14b8a6", "#f43f5e"], // teal-500, rose-500 (more vibrant)
        borderColor: ["#ffffff", "#ffffff"],
        borderWidth: 4, // thick white border for a clean separated look
        hoverOffset: 10,
        hoverBackgroundColor: ["#0d9488", "#e11d48"], // Darker on hover
      },
    ],
  };
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 25,
          boxWidth: 12,
          usePointStyle: true,
          font: {
            size: 14,
            family: "'Inter', sans-serif",
            weight: "600",
          },
          color: "#4b5563", // gray-600
        },
      },
      title: {
        display: false,
      },
    },
    cutout: "75%",
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <div className="w-2 h-6 bg-teal-500 rounded-full"></div>
        Transaction Overview
      </h2>
      <div style={{ height: "320px" }} className="relative flex justify-center items-center drop-shadow-md">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default TransactionChart;
