import { postRequest } from "./apiService";

export const createUser = (payload) => {
    return postRequest("/user/create-user", payload);
};