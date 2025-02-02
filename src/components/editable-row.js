import React from "react";

const EditableTable = ({ data, editingRow, onEdit, onSave, onDelete, onInputChange }) => (
    <div className="overflow-x-auto px-8">
        <table className="table-auto w-full text-left">
            <thead>
                <tr className="bg-black">
                    {data[0] && Object.keys(data[0]).map((header) => (
                        <th key={header} className="p-3 capitalize text-yellow-300">
                            {header}
                        </th>
                    ))}
                    <th className="p-3 text-yellow-300">Actions</th>
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
                                        onChange={(e) => onInputChange(e, index, field)}
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
                                        onClick={() => onSave(index)}
                                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                                    >
                                        Save
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onEdit(index)}
                                        className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
                                    >
                                        Edit
                                    </button>
                                )}
                                <button
                                    onClick={() => onDelete(index)}
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
);


export default EditableTable