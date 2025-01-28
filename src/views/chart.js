import React, { useEffect, useState, useMemo } from "react";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    TimeScale,
    Tooltip,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";
import { getRandomNumbers } from "../api/random_number";
import Header from "../components/header";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, TimeScale, Tooltip);

const TradingData = () => {
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);
    const [isSorted, setIsSorted] = useState(false);


    const fetchData = async () => {
        try {
            const response = await getRandomNumbers();
            const random_number = response.random_numbers;

            const formattedData = random_number.map((item) => ({
                x: new Date(item.timestamp),
                y: item.number,
            }));

            setData(formattedData);
            setTableData(random_number);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        fetchData();
        // const interval = setInterval(fetchData, 1000); // Poll every 1 second
        // return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        setIsSorted(false);
    }, [currentPage]);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);


    const sortedCurrentItems = useMemo(() => {
        if (!isSorted) return currentItems;
        return [...currentItems].sort((a, b) => a.number - b.number);
    }, [currentItems, isSorted]);
    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


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


    const chartOptions = useMemo(() => {
        if (data.length === 0) {
            return {
                responsive: true,
                scales: {
                    x: {
                        type: "time",
                        ticks: { color: "#D1D5DB" },
                        title: { display: true, text: "Timestamp" },
                    },
                    y: {
                        ticks: { color: "#D1D5DB" },
                        title: { display: true, text: "Random Number" },
                    },
                },
                plugins: {
                    legend: {
                        labels: { color: "#D1D5DB" },
                    },
                },
            };
        }


        const timestamps = data.map((item) => item.x.getTime());
        const minTimestamp = Math.min(...timestamps);
        const maxTimestamp = Math.max(...timestamps);
        const timeDiff = maxTimestamp - minTimestamp;


        let unit;
        if (timeDiff <= 60000) {
            // 1 minute
            unit = "second";
        } else if (timeDiff <= 3600000) {
            // 1 hour
            unit = "minute";
        } else if (timeDiff <= 86400000) {
            // 1 day
            unit = "hour";
        } else if (timeDiff <= 604800000) {
            // 1 week
            unit = "day";
        } else if (timeDiff <= 2592000000) {
            // ~1 month
            unit = "month";
        } else {
            unit = "year";
        }

        return {
            responsive: true,
            scales: {
                x: {
                    type: "time",
                    time: { unit },
                    title: { display: true, text: "Timestamp" },
                    ticks: { color: "#D1D5DB" },
                },
                y: {
                    title: { display: true, text: "Random Number" },
                    ticks: { color: "#D1D5DB" },
                },
            },
            plugins: {
                legend: {
                    labels: { color: "#D1D5DB" },
                },
            },
        };
    }, [data]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <Header showBackButton />
            <main className="p-6">
                {/* Interactive Plot */}
                <div className="bg-black shadow-lg rounded-lg p-6 mb-12">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Interactive Plot</h2>
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : (
                        <div className="" style={{}}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    )}
                </div>

                {/* Dynamic Table */}
                <div className="bg-black shadow-lg rounded-lg p-6 mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-white">Dynamic Table</h2>
                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : (
                        <>
                            {/* Sorting Checkbox */}
                            <div className="flex items-center mb-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={isSorted}
                                        onChange={(e) => setIsSorted(e.target.checked)}
                                        className="form-checkbox h-4 w-4 text-blue-500"
                                    />
                                    <span className="text-gray-300">Sort numbers</span>
                                </label>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-gray-700 border border-gray-600 rounded-lg">
                                    <thead>
                                        <tr className="bg-gray-600">
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Timestamp
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                                Random Number
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-600">
                                        {sortedCurrentItems.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-600 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {new Date(item.timestamp).toLocaleString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                                    {item.number}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <span className="text-gray-300">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg hover:bg-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default TradingData;