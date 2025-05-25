import { sendToQueue } from "#lib/sqs.js";
import { createTransfer } from "#services/asaas.service.js";
import { saveTransaction } from "./dynamo.service.js"; // ✅ usar o seu serviço

export const createCashOut = async (data: {
  value: number;
  description: string;
  pixKey: string; // chave do destinatário
  pixKeyType: "EVP" | "EMAIL" | "CPF" | "PHONE" | "CNPJ";
  scheduleDate?: string;
}) => {
  const result = await createTransfer({
    value: data.value,
    pixKey: data.pixKey,
    pixKeyType: data.pixKeyType,
    description: data.description,
    scheduleDate: data.scheduleDate,
  });

  await saveTransaction({
    Id: result.id,
    type: "cashout",
    status: result.status,
    value: data.value,
    description: data.description,
    createdAt: new Date().toISOString(),
    pixKey: data.pixKey,
    scheduleDate: data.scheduleDate,
  });

  return {
    message: "Transferência iniciada com sucesso",
    transferId: result.id,
    status: result.status,
  };
};

export const handleWebhook = async (payload: any) => {
  const QUEUE_URL = process.env.CASHOUT_QUEUE_URL!;
  console.log("✅ Enviando CASHOUT para fila SQS:", QUEUE_URL);

  await sendToQueue(QUEUE_URL, payload);
};
