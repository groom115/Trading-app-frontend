import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    TimeScale,
    Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns"; // Adapter for date support in charts
import { Line } from "react-chartjs-2";
import { getRandomNumbers } from "../api/random_number";
import Header from "../components/header"; // Assuming the Header component is in the same folder


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale, Tooltip);

const TradingData = () => {
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch data from the API
    const fetchData = async () => {
        try {
            const response = await getRandomNumbers();
            const random_number = response.random_numbers;

            // Map data for the chart
            const formattedData = random_number.map((item) => ({
                x: new Date(item.timestamp),
                y: item.number,
            }));

            setData(formattedData); // For the chart
            setTableData(random_number); // For the table
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // Fetch data on mount and every 1 second
    useEffect(() => {
        fetchData();
        // const interval = setInterval(fetchData, 1000); // Poll every 1 second
        // return () => clearInterval(interval);
    }, []);

    // Chart.js data and options
    const chartData = {
        datasets: [
            {
                label: "Random Numbers",
                data: data,
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                borderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        scales: {
            x: {
                type: "time", // Use time scale for x-axis
                time: {
                    unit: "second",
                },
                title: {
                    display: true,
                    text: "Timestamp",
                },
                ticks: {
                    color: "#D1D5DB", // Text color for x-axis
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Random Number",
                },
                ticks: {
                    color: "#D1D5DB", // Text color for y-axis
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: "#D1D5DB", // Text color for legend
                },
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <Header showBackButton />
            <main className="p-6">
                {/* Interactive Plot */}
                <div className="bg-black shadow-lg rounded-lg p-6 mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Interactive Plot</h2>
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : (
                        <Line data={chartData} options={chartOptions} />
                    )}
                </div>

                {/* Dynamic Table */}
                <div className="bg-black shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Dynamic Table</h2>
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border border-gray-700">
                                <thead>
                                    <tr className="bg-gray-700 text-left">
                                        <th className="px-4 py-2 border border-gray-700 text-gray-300">Timestamp</th>
                                        <th className="px-4 py-2 border border-gray-700 text-gray-300">Random Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((item, index) => (
                                        <tr
                                            key={index}
                                            className={`border border-gray-700 ${index % 2 === 0 ? "bg-gray-800" : "bg-gray-700"
                                                }`}
                                        >
                                            <td className="px-4 py-2">
                                                {new Date(item.timestamp).toLocaleString()}
                                            </td>
                                            <td className="px-4 py-2">{item.number}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TradingData;
