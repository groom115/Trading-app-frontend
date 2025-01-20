import router from "./app";

export const fetchRows = async () => {
    return await router.get("table");
};


export const addRow = async (row) => {
    return await router.post("table", row);
};


export const updateRow = async (row_id, row) => {
    return await router.put(`table?row_id=${row_id}`, row);
};


export const deleteRow = async (row_id) => {
    console.log(row_id)
    return await router.delete(`table?row_id=${row_id}`);
};

export const restoreRows = async () => {
    console.log('1111')
    return await router.get("table/restore");
};
