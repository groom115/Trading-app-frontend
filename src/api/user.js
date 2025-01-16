import router from "./app";

export const fetchRows = async () => {
    return await router.get("/file");
};


export const addRow = async (row) => {
    return await router.post("/file", row);
};


export const updateRow = async (row_id, row) => {
    return await router.put("/file", { row_id, row });
};


export const deleteRow = async (row_id) => {
    return await router.delete("/file/", { row_id });
};

export const restoreRows = async () => {
    return await router.get("/file/restore");
};
