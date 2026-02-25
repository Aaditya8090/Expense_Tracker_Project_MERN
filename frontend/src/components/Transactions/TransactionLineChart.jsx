import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { listTransactionsAPI } from "../../services/transactions/transactionService";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TransactionLineChart = () => {
    const {
        data: transactions,
        isError,
        isLoading,
        isFetched,
        error,
    } = useQuery({
        queryFn: listTransactionsAPI,
        queryKey: ["list-transactions"],
    });

    const chartData = useMemo(() => {
        if (!transactions) return null;

        // Group by date
        const grouped = transactions.reduce((acc, current) => {
            // Assuming date is in format "YYYY-MM-DD" or similar
            const dateStr = new Date(current.date).toLocaleDateString();
            if (!acc[dateStr]) {
                acc[dateStr] = { income: 0, expense: 0 };
            }
            if (current.type === "income") {
                acc[dateStr].income += current.amount;
            } else {
                acc[dateStr].expense += current.amount;
            }
            return acc;
        }, {});

        // Sort dates
        const sortedDates = Object.keys(grouped).sort(
            (a, b) => new Date(a) - new Date(b)
        );

        const incomeData = sortedDates.map((date) => grouped[date].income);
        const expenseData = sortedDates.map((date) => grouped[date].expense);

        return {
            labels: sortedDates,
            datasets: [
                {
                    label: "Income",
                    data: incomeData,
                    borderColor: "#14b8a6", // teal-500
                    backgroundColor: "rgba(20, 184, 166, 0.1)",
                    borderWidth: 3,
                    pointBackgroundColor: "#14b8a6",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#14b8a6",
                    fill: true,
                    tension: 0.4, // Smooth curves
                },
                {
                    label: "Expense",
                    data: expenseData,
                    borderColor: "#f43f5e", // rose-500
                    backgroundColor: "rgba(244, 63, 94, 0.1)",
                    borderWidth: 3,
                    pointBackgroundColor: "#f43f5e",
                    pointBorderColor: "#fff",
                    pointHoverBackgroundColor: "#fff",
                    pointHoverBorderColor: "#f43f5e",
                    fill: true,
                    tension: 0.4,
                },
            ],
        };
    }, [transactions]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        family: "'Inter', sans-serif",
                        weight: "600",
                    },
                    color: "#4b5563",
                },
            },
            tooltip: {
                mode: "index",
                intersect: false,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                titleColor: "#1f2937",
                bodyColor: "#4b5563",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 12,
                boxPadding: 6,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.05)",
                    drawBorder: false,
                },
                ticks: {
                    color: "#6b7280",
                    font: { family: "'Inter', sans-serif" },
                },
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false,
                },
                ticks: {
                    color: "#6b7280",
                    font: { family: "'Inter', sans-serif" },
                },
            },
        },
        interaction: {
            mode: "nearest",
            axis: "x",
            intersect: false,
        },
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-6 bg-blue-500 rounded-full"></div>
                Cash Flow Trend
            </h2>
            <div style={{ height: "320px" }} className="relative w-full">
                {chartData ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                        {isLoading ? "Loading chart data..." : "No data available"}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionLineChart;
