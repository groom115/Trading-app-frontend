import React, { useState, useEffect } from 'react';
import { fetchRows, addRow, updateRow, deleteRow, restoreRows } from '../api/table';
import Header from '../components/header'
import { ToastContainer, toast } from "react-toastify";

const UserTable = () => {
    const [data, setData] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newRow, setNewRow] = useState({
        user: '',
        broker: '',
        api_key: '',
        api_secret: '',
        pnl: '',
        margin: '',
        max_risk: '',
    });

    useEffect(() => {
        loadRows();
    }, []);

    const loadRows = async () => {
        setIsLoading(true);
        try {
            const response = await fetchRows();
            console.log('res', response)
            setData(response);
        } catch (err) {
            toast.error('Failed to load rows')
        } finally {
            setIsLoading(false);
        }
    };

    const handleAdd = async () => {
        setIsLoading(true);
        try {
            console.log(newRow)
            await new Promise((resolve) => setTimeout(resolve, 6000));
            const res = await addRow(newRow);
            setNewRow({
                user: '',
                broker: '',
                api_key: '',
                api_secret: '',
                pnl: '',
                margin: '',
                max_risk: '',
            });
            setShowAddModal(false);
            loadRows();
        } catch (err) {
            toast.error('Failed to add new row')
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (index) => {
        setEditingRow(index);
    };

    const handleSave = async (index) => {
        setIsLoading(true);
        try {
            const rowToUpdate = data[index];
            const res = await updateRow(index + 1, rowToUpdate);
            setEditingRow(null);
            loadRows();
        } catch (err) {
            toast.error('Failed to save changes')
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (row_id) => {
        setIsLoading(true);
        try {
            const res = await deleteRow(row_id + 1);
            loadRows();
        } catch (err) {
            toast.error('Failed to delete row')
        } finally {
            setIsLoading(false);
        }
    };

    const handleRestore = async () => {
        setIsLoading(true);
        try {
            const res = await restoreRows();
            console.log(res)
            loadRows();
            toast.success('Restored Successfully!')
        } catch (err) {
            toast.error('Failed to restore rows')
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e, index, field) => {
        const updatedData = [...data];
        updatedData[index][field] = e.target.value;
        setData(updatedData);
    };

    const handleNewRowChange = (e, field) => {
        setNewRow({ ...newRow, [field]: e.target.value });
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen mb-20">
            <Header showBackButton />

            {error && (
                <div className="bg-red-500 text-white p-4 mb-4 rounded-lg flex justify-between">
                    <span>{error}</span>
                    <button onClick={() => setError(null)} className="font-bold">✕</button>
                </div>
            )}

            <div className="flex justify-between mb-4 px-8 pt-6">
                <button
                    className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600"
                    onClick={() => setShowAddModal(true)}
                    disabled={isLoading}
                >
                    Add New Row
                </button>
                <button
                    className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-teal-600"
                    onClick={handleRestore}
                    disabled={isLoading}
                >
                    Restore Rows
                </button>
            </div>


            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-800 p-6 rounded-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Add New Row</h2>
                        <div className="space-y-4">
                            {Object.entries(newRow).map(([field, value], idx) => (
                                idx % 2 === 1 ? (
                                    <div key={field} className="flex gap-4">
                                        <div className="flex-1">
                                            <label className="mb-1 capitalize block">{field}:</label>
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) => handleNewRowChange(e, field)}
                                                className="p-2 rounded bg-gray-700 border border-gray-600 text-white w-full"
                                            />
                                        </div>
                                        {idx + 1 < Object.keys(newRow).length && (
                                            <div className="flex-1">
                                                <label className="mb-1 capitalize block">{Object.keys(newRow)[idx + 1]}:</label>
                                                <input
                                                    type="text"
                                                    value={newRow[Object.keys(newRow)[idx + 1]]}
                                                    onChange={(e) => handleNewRowChange(e, Object.keys(newRow)[idx + 1])}
                                                    className="p-2 rounded bg-gray-700 border border-gray-600 text-white w-full"
                                                />
                                            </div>
                                        )}
                                    </div>
                                ) : (idx == 0 ?

                                    <div className="flex-1">
                                        <label className="mb-1 capitalize block">{field}:</label>
                                        <input
                                            type="text"
                                            value={value}
                                            onChange={(e) => handleNewRowChange(e, field)}
                                            className="p-2 rounded bg-gray-700 border border-gray-600 text-white w-full"
                                        />
                                    </div> : null

                                )
                            ))}
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                onClick={() => {
                                    const allFieldsFilled = Object.values(newRow).every((value) => value.trim() !== '');
                                    if (allFieldsFilled) {
                                        handleAdd();
                                    } else {
                                        toast.error('Please fill out all fields before adding.')
                                    }
                                }}
                                disabled={isLoading}
                                className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
                            >
                                {isLoading ? 'Adding...' : 'Add Row'}
                            </button>
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto px-8 ">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr className="bg-black" >
                            {data[0] && Object.keys(data[0]).map((header, idx) => (
                                <th
                                    key={header}
                                    className={'p-3  capitalize  text-yellow-300'}
                                >
                                    {header}
                                </th>
                            ))}
                            <th className="p-3  text-yellow-300">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className={`border-t border-gray-600 ${index % 2 === 0 ? 'bg-gray-700' : ''}`}>
                                {Object.keys(row).map((field) => (
                                    <td key={field} className="p-3">
                                        {editingRow === index ? (
                                            <input
                                                type="text"
                                                value={row[field]}
                                                onChange={(e) => handleInputChange(e, index, field)}
                                                className="p-2 rounded bg-gray-700 border border-gray-600 text-white w-full"
                                            />
                                        ) : (
                                            row[field]
                                        )}
                                    </td>
                                ))}
                                <td className="p-3">
                                    <div className="flex gap-2">
                                        {editingRow === index ? (
                                            <button
                                                onClick={() => handleSave(index)}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                            >
                                                Save
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleEdit(index)}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                            >
                                                Edit
                                            </button>
                                        )}
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <ToastContainer autoClose={2000} />
        </div>
    );
};

export default UserTable;
