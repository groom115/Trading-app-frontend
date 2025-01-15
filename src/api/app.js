// http.js
const API_BASE_URL = "http://localhost:8000/";

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
    }
    return await response.json();
};

const router = {
    get: async (url, headers = {}) => {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            }
        });
        return handleResponse(response);
    },

    post: async (url, body, headers = {}) => {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(body),
        });
        return handleResponse(response);
    },

    put: async (url, body, headers = {}) => {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(body),
        });
        return handleResponse(response);
    },

    delete: async (url, headers = {}) => {
        const response = await fetch(`${API_BASE_URL}${url}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
        });
        return handleResponse(response);
    },
};

export default router;