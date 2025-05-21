import { createCustomer, createPixCharge } from "./asaas.service.js";

export const generatePix = async (data: any) => {
  // TODO: integrar com Asaas e salvar no Dynamo
  return {
    message: "Pix Gerado",
    data,
  };
};

export const handleWebhook = async (payload: any) => {
  // TODO: enviar para SQS
  console.log("Payload recebido no webhook (mock):", payload);
};
