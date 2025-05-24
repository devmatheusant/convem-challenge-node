import { Request, Response } from "express";
import * as cashOutService from "#services/cashout.service.js";

export const requestCashOut = async (req: Request, res: Response) => {
  try {
    const result = await cashOutService.createCashOut({
      value: req.body.value,
      description: req.body.description,
      scheduleDate: req.body.scheduleDate,
    });
    res.status(201).json(result);
  } catch (error: any) {
    if (error.response) {
      console.error("Erro na resposta da API do Asaas:", error.response.data);
    } else {
      console.error("Erro desconhecido:", error.message);
    }
    throw error;
  }
};

export const receiveCashOutWebhook = async (req: Request, res: Response) => {
  try {
    await cashOutService.handleCashOutWebhook(req.body);
    res.status(200).json({ message: "Webhook de transferência recebido" });
  } catch (error) {
    console.error("Erro no webhook de cash out:", error);
    res.status(500).json({ error: "Erro ao processar webhook de cash out" });
  }
};
