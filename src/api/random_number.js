import router from "./app";

export const getRandomNumbers = async () => {
    return await router.get("numbers");
};