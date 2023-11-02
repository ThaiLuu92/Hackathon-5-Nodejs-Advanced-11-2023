import axios from "axios";
import { API } from "./API";
export const getData = async (endpoint: string) => {
  try {
    const response = await axios.get(API + endpoint);
    return response.data;
  } catch (error) {

  }
};
export const createData = async (endpoint: string, data: any) => {
  try {
    const response = await axios.post(
      API + endpoint,
      data
    );
    return response.data;
  } catch (error) {}
};
export const deleteData = async (endpoint: string, id: string) => {
  try {
    const response = await axios.delete(
      API + endpoint + "/" + id
    );
    return response.data;
  } catch (error) {}
};

export const updateData = async (endpoint: string, id: string, data: any) => {
  try {
    const response = await axios.put(
      API + endpoint + "/" + id,
      data
    );
    return response.data;
  } catch (error) {}
};