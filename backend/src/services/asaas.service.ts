import axios from "axios";

const api = axios.create({
  baseURL: process.env.ASAAS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    acess_token: process.env.ASAAS_API_KEY || "",
  },
});

export const createCustomer = async (
  name: string,
  cpfCnpj: string,
  email: string
) => {
  const response = await api.post("/customers", {
    name,
    cpfCnpj,
    email,
  });
  return response.data;
};
