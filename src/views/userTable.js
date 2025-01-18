import React, { useState, useEffect } from "react";
import { fetchRows, addRow, updateRow, deleteRow } from "../api/table"; // Assuming API functions are imported
import Header from "../components/header"; // Import the Header component

const UserTable = () => {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [actionInProgress, setActionInProgress] = useState(false); // Prevent concurrent actions

    // Fetch initial rows on mount
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await fetchRows();
                setRows(response); // Assuming response contains the rows
            } catch (err) {
                setError("Failed to load data.");
            }
        };
        loadData();
    }, []);

    const handleCRUDOperation = async (action, index = null, row = null) => {
        if (actionInProgress) {
            alert("Please wait, an operation is in progress.");
            return;
        }

        setActionInProgress(true);
        setLoading(true);
        setError(null);

        try {
            if (action === "add") {
                const newRow = {
                    user: "User" + (rows.length + 1),
                    broker: "Broker" + (rows.length + 1),
                    "API key": Math.random().toString(36).substring(2, 15),
                    "API secret": Math.random().toString(36).substring(2, 15),
                    pnl: (Math.random() * 1000).toFixed(2),
                    margin: (Math.random() * 100).toFixed(2),
                    max_risk: (Math.random() * 100).toFixed(2),
                };
                await addRow(newRow);
                setRows((prevRows) => [...prevRows, newRow]);
            } else if (action === "delete" && index !== null) {
                const rowIdToDelete = index;
                await deleteRow(rowIdToDelete);
                setRows((prevRows) => prevRows.filter((_, i) => i !== index));
            } else if (action === "update" && row) {
                const updatedRow = { ...row, pnl: (Math.random() * 1000).toFixed(2) }; // Example update
                await updateRow(row.id, updatedRow);
                setRows((prevRows) =>
                    prevRows.map((r) => (r.id === row.id ? updatedRow : r))
                );
            }
            setLoading(false);
        } catch (err) {
            setError("An error occurred while performing the operation.");
            setLoading(false);
        } finally {
            setActionInProgress(false);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-5">
            <Header />
            <button
                onClick={() => handleCRUDOperation("add")}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md mb-4"
            >
                {loading ? "Adding..." : "Add Row"}
            </button>
            <table className="min-w-full table-auto border-collapse bg-gray-800 rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                    <tr>
                        <th className="px-6 py-3 text-left">User</th>
                        <th className="px-6 py-3 text-left">Broker</th>
                        <th className="px-6 py-3 text-left">API Key</th>
                        <th className="px-6 py-3 text-left">API Secret</th>
                        <th className="px-6 py-3 text-left">PNL</th>
                        <th className="px-6 py-3 text-left">Margin</th>
                        <th className="px-6 py-3 text-left">Max Risk</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.id} className="odd:bg-gray-700 even:bg-gray-600">
                            <td className="px-6 py-3">{row.user}</td>
                            <td className="px-6 py-3">{row.broker}</td>
                            <td className="px-6 py-3">{row["API key"]}</td>
                            <td className="px-6 py-3">{row["API secret"]}</td>
                            <td className="px-6 py-3">{row.pnl}</td>
                            <td className="px-6 py-3">{row.margin}</td>
                            <td className="px-6 py-3">{row.max_risk}</td>
                            <td className="px-6 py-3">
                                <button
                                    onClick={() => handleCRUDOperation("delete", index)}
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md mr-2"
                                >
                                    {loading ? "Deleting..." : "Delete"}
                                </button>
                                <button
                                    onClick={() => handleCRUDOperation("update", null, row)}
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md"
                                >
                                    {loading ? "Updating..." : "Update"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
};

export default UserTable;
