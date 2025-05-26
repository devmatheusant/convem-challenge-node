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

  const response = await api.post("/payments", {
    customer: customerId,
    billingType: "PIX",
    value,
    dueDate: formattedDueDate,
    description,
  });

  const charge = response.data;

  const qrCodeResponse = await api.get(`/payments/${charge.id}/pixQrCode`);
  const { encodedImage, payload } = qrCodeResponse.data;

  return {
    id: charge.id,
    status: charge.status,
    qrCode: encodedImage, // base64 da imagem
    payload, // código Pix (string copy-paste)
  };
};

export const createPixKeyEVP = async () => {
  const response = await api.post("/pix/addressKeys", {
    type: "EVP",
  });
  return response.data;
};

interface CreateTransferInput {
  value: number;
  pixKey: string;
  pixKeyType: "EMAIL" | "PHONE" | "EVP" | "CPF" | "CNPJ";
  description: string;
  scheduleDate?: string;
}

export const createTransfer = async ({
  value,
  pixKey,
  pixKeyType,
  description,
  scheduleDate,
}: CreateTransferInput) => {
  const body = {
    value,
    pixAddressKey: pixKey,
    pixAddressKeyType: pixKeyType,
    description,
    scheduleDate,
  };
  console.log("Body para API Asaas:", body);

  const response = await api.post("/transfers", body);
  return response.data;
};
