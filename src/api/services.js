import axiosInstance from "./axiosInstance";

// Store APIs
export const getStores = async () => {
  const response = await axiosInstance.get("/stores");
  return response.data;
};

export const createStore = async (storeData) => {
  const response = await axiosInstance.post("/stores", storeData);
  return response.data;
};

// Folder APIs
export const getFolders = async () => {
  const response = await axiosInstance.get("/folders");
  return response.data;
};

export const createFolder = async (folderData) => {
  const response = await axiosInstance.post("/folders", folderData);
  return response.data;
};

// Product APIs
export const getProducts = async () => {
  const response = await axiosInstance.get("/products");
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axiosInstance.post("/products", productData);
  return response.data;
};
