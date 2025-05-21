import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

console.log("🔐 Token Asaas:", process.env.ASAAS_API_KEY);

const api = axios.create({
  baseURL: process.env.ASAAS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    access_token: process.env.ASAAS_API_KEY || "",
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

export const createPixCharge = async (
  customerId: string,
  value: number,
  description: string,
  dueDate?: string
) => {
  const formattedDueDate = dueDate || new Date().toISOString().split("T")[0];

  // 1. Criar a cobrança PIX
  const response = await api.post("/payments", {
    customer: customerId,
    billingType: "PIX",
    value,
    dueDate: formattedDueDate,
    description,
  });

  const charge = response.data;

  // 2. Buscar o QR Code usando o endpoint correto
  const qrCodeResponse = await api.get(`/payments/${charge.id}/pixQrCode`);
  const { encodedImage, payload } = qrCodeResponse.data;

  return {
    id: charge.id,
    status: charge.status,
    qrCode: encodedImage, // base64 da imagem
    payload, // código Pix (string copy-paste)
  };
};
