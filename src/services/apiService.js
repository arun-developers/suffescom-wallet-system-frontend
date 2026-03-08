import API from "./api";

export const getRequest = (url, params = {}) => {
  return API.get(url, { params });
};

export const postRequest = (url, data = {}) => {
  return API.post(url, data);
};

export const putRequest = (url, data = {}) => {
  return API.put(url, data);
};

export const deleteRequest = (url) => {
  return API.delete(url);
};