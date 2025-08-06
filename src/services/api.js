import axios from "axios";

const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
});


export const fetchUsers = async (page = 1, count = 6) => {
  const response = await api.get("/users", {
    params: { page, count },
  });
  return response.data;
};


export const fetchPositions = async () => {
  const response = await api.get("/positions");
  return response.data;
};


export const fetchToken = async () => {
  const response = await api.post("/token");
  return response.data.token;
};


export const postUser = async (formData, token) => {
  const response = await api.post("/users", formData, {
    headers: {
      Token: token,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};