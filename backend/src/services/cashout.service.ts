// ✅ Funções de negócio do cashout, usando asaas.service.ts por baixo
import { createTransfer, createPixKeyEVP } from "#services/asaas.service.js";
import { saveTransaction } from "./dynamo.service.js";

export const createCashOut = async (data: {
  value: number;
  description: string;
  scheduleDate?: string;
}) => {
  // 1. Criar chave EVP
  const pixKeyData = await createPixKeyEVP();
  const pixKey = pixKeyData.key;

  // 2. Criar transferência usando a chave EVP criada
  const result = await createTransfer({
    value: data.value,
    pixKey,
    pixKeyType: "EVP",
    description: data.description,
    scheduleDate: data.scheduleDate,
  });

  await saveTransaction({
    id: result.id,
    type: "cashout",
    status: result.status,
    value: data.value,
    description: data.description,
    createdAt: new Date().toISOString(),
    pixKey,
    scheduleDate: data.scheduleDate,
  });

  return {
    message: "Transferência iniciada com sucesso",
    transferId: result.id,
    status: result.status,
  };
};

export const handleCashOutWebhook = async (payload: any) => {
  console.log("📩 Webhook de cash out recebido (simulado):");
  console.log(JSON.stringify(payload, null, 2));
  // TODO: ENVIAR PARA AWS SQS
};
