import router from "./app";

export const signup = async (email, password) => {
    return await router.post("auth/signup", { email, password });
};

export const login = async (email, password) => {
    return await router.post("auth/login", { email, password });
};