import { sendToQueue } from "#lib/sqs.js";
import { createCustomer, createPixCharge } from "./asaas.service.js";
import { saveTransaction } from "./dynamo.service.js";

export const generatePix = async (data: any) => {
  const { name, cpfCnpj, email, value, description } = data;

  const customer = await createCustomer(name, cpfCnpj, email);
  const charge = await createPixCharge(customer.id, value, description);

  await saveTransaction({
    id: charge.id,
    type: "cashin",
    status: charge.status,
    value,
    description,
    createdAt: new Date().toISOString(),
    qrCode: charge.qrCode,
    qrCodePayload: charge.payload,
  });

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
  const QUEUE_URL = process.env.CASHIN_QUEUE_URL!;
  console.log("📩 Enviando para fila SQS");

  await sendToQueue(QUEUE_URL, payload);
};
