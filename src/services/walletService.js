import { getRequest, postRequest } from "./apiService";

export const getWalletBalance = () => {
  return getRequest("/wallet/wallet-balance");
};

export const addWalletBalance = (payload) => {
  return postRequest("/wallet/add-wallet-balance", payload);
};

export const withdrawWalletBalance = (payload) => {
  return postRequest("withdrawal/withdrawal-wallet-balance", payload);
};

export const walletTransactions = (payload) => {
  return getRequest("wallet/transactions", payload);
};