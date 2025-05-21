import { createCustomer, createPixCharge } from "./asaas.service.js";

export const generatePix = async (data: any) => {
  const { name, cpfCnpj, email, value, description } = data;

  const customer = await createCustomer(name, cpfCnpj, email);

  const charge = await createPixCharge(customer.id, value, description);

  return {
    message: "Pix Gerado com sucesso",
    chargeId: charge.id,
    status: charge.status,
    pix: {
      qrCode: charge.qrCode,
      payload: charge.payload,
    },
  };
};

export const handleWebhook = async (payload: any) => {
  // TODO: enviar para SQS
  console.log("Payload recebido no webhook (mock):", payload);
};
