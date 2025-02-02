import React, { useState, useEffect } from 'react';
import { fetchRows, addRow, updateRow, deleteRow, restoreRows } from '../api/table';
import Header from '../components/header'
import { ToastContainer, toast } from "react-toastify";
import AddRowModal from '../components/add-row-modal';
import EditableTable from '../components/editable-row';



const TableHeader = ({ onAdd, onRestore, loading }) => (
    <div className="flex justify-between mb-4 px-8 pt-6">
        <button
            className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-600"
            onClick={onAdd}
            disabled={loading}
        >
            Add New Row
        </button>
        <button
            className="bg-teal-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-teal-600"
            onClick={onRestore}
            disabled={loading}
        >
            Restore Rows
        </button>
    </div>
);


const UserTable = () => {

    const [data, setData] = useState([]);
    const [editingRow, setEditingRow] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
            <ToastContainer autoClose={2000} />

            <TableHeader
                onAdd={() => setShowAddModal(true)}
                onRestore={handleRestore}
                loading={isLoading}
            />

            {showAddModal && (
                <AddRowModal
                    show={showAddModal}
                    loading={isLoading}
                    newRow={newRow}
                    onClose={() => setShowAddModal(false)}
                    onChange={handleNewRowChange}
                    onSubmit={() => {
                        const allFieldsFilled = Object.values(newRow).every((value) => value.trim() !== '');
                        if (allFieldsFilled) {
                            handleAdd();
                        } else {
                            toast.error('Please fill out all fields before adding.');
                        }
                    }}
                />
            )}

            <EditableTable
                data={data}
                editingRow={editingRow}
                onEdit={handleEdit}
                onSave={handleSave}
                onDelete={handleDelete}
                onInputChange={handleInputChange}
            />
        </div>
    );
};

export default UserTable;