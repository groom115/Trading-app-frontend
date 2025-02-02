import React from "react";


const AddRowModal = ({ show, loading, newRow, onClose, onChange, onSubmit }) => (
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
                                    onChange={(e) => onChange(e, field)}
                                    className="p-2 rounded bg-gray-700 border border-gray-600 text-white w-full"
                                />
                            </div>
                            {idx + 1 < Object.keys(newRow).length && (
                                <div className="flex-1">
                                    <label className="mb-1 capitalize block">{Object.keys(newRow)[idx + 1]}:</label>
                                    <input
                                        type="text"
                                        value={newRow[Object.keys(newRow)[idx + 1]]}
                                        onChange={(e) => onChange(e, Object.keys(newRow)[idx + 1])}
                                        className="p-2 rounded bg-gray-700 border border-gray-600 text-white w-full"
                                    />
                                </div>
                            )}
                        </div>
                    ) : (idx == 0 ?
                        <div className="flex-1" key={field}>
                            <label className="mb-1 capitalize block">{field}:</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => onChange(e, field)}
                                className="p-2 rounded bg-gray-700 border border-gray-600 text-white w-full"
                            />
                        </div> : null
                    )
                ))}
            </div>
            <div className="flex justify-end gap-4 mt-4">
                <button
                    onClick={onSubmit}
                    disabled={loading}
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600"
                >
                    {loading ? 'Adding...' : 'Add Row'}
                </button>
                <button
                    onClick={onClose}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                >
                    Cancel
                </button>
            </div>
        </div>
    </div>
);


export default AddRowModal