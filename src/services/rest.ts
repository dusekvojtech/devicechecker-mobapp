import { AxiosResponse } from "axios";
import axios, { StorageUserData } from "./axios";
import {
  setStorageValue,
  removeStorageValue,
  getStorageValue,
} from "./storage";

import { User } from "../atoms/user";

import * as endpoints from "../constants/endpoints";

export type Device = {
  id: string;
  code: string;
  image?: string;
  model: string;
  os: "ANDROID" | "IOS" | "WINDOWS";
  osVersion?: string;
  vendor: string;
  borrowed?: {
    user: User;
    date: string;
  };
};

export const handleLogin = async (login: string, password: string) => {
  try {
    const res: AxiosResponse<User> = await axios.post(endpoints.LOGIN, {
      login,
      password,
    });
    const { data } = res;
    await setStorageValue(
      "@userData",
      JSON.stringify({ token: data.token, userId: data.id })
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async () => {
  try {
    const storageData = await getStorageValue("@userData");
    if (storageData) {
      const userData = JSON.parse(storageData) as StorageUserData;
      if (userData.userId && userData.token) {
        const res: AxiosResponse<User> = await axios.get(
          `${endpoints.USERS}/${userData.userId}`
        );
        const { data } = res;
        return data;
      }
    }
  } catch (error) {
    return Promise.reject(error);
  }
  return null;
};

export const handleLogout = async () => {
  await removeStorageValue("@userData");
};

export const getDevices = async () => {
  try {
    const res: AxiosResponse<[Device]> = await axios.get(endpoints.DEVICES);
    const { data } = res;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const createDevice = async (
  code: string,
  os: string,
  vendor: string,
  model: string,
  osVersion: string,
  image?: string
) => {
  try {
    const res: AxiosResponse<Device> = await axios.post(endpoints.DEVICES, {
      code,
      os,
      vendor,
      model,
      osVersion,
      image,
    });
    const { data } = res;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const bookDevice = async (userId: string, deviceId: string) => {
  try {
    const res: AxiosResponse<Device> = await axios.post(
      `${endpoints.DEVICES}/${deviceId}${endpoints.BOOK_DEVICE}`,
      {
        id: userId,
      }
    );
    const { data } = res;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const returnDevice = async (userId: string, deviceId: string) => {
  try {
    const res: AxiosResponse<Device> = await axios.post(
      `${endpoints.DEVICES}/${deviceId}${endpoints.RETURN_DEVICE}`,
      {
        id: userId,
      }
    );
    const { data } = res;
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};
