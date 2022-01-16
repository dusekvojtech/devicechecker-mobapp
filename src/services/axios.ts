import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { getStorageValue } from "services/storage";

import * as endpoints from "../constants/endpoints";

export type StorageUserData = {
  userId: string;
  token: string;
};

declare module "axios" {
  export interface AxiosRequestConfig {
    retry?: boolean;
  }
}

const api = axios.create({
  headers: { "Content-Type": "application/json", accept: "application/json" },
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const storageData = await getStorageValue("@userData");
  if (storageData) {
    const userData = JSON.parse(storageData) as StorageUserData;
    if (config.url !== endpoints.LOGIN && userData.token) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        "Auth-Token": userData.token,
      };
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ error: string }>) =>
    // TODO: handle refresh token for OAuth 2.0
    Promise.reject(error.response?.data.error)
);

export default api;
