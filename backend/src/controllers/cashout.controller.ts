import { Request, Response } from "express";
import * as cashOutService from "#services/cashout.service.js";

export const requestCashOut = async (req: Request, res: Response) => {
  try {
    const { value, description, scheduleDate, pixKey, pixKeyType } = req.body;

    if (!value || !description || !pixKey || !pixKeyType) {
      res.status(400).json({ error: "Dados obrigatórios ausentes" });
    }

    const result = await cashOutService.createCashOut({
      value,
      description,
      pixKey,
      pixKeyType,
      scheduleDate,
    });

    res.status(201).json(result);
  } catch (error: any) {
    if (error.response) {
      console.error("Erro na resposta da API do Asaas:", error.response.data);
      res.status(400).json({ error: error.response.data });
    } else {
      console.error("Erro desconhecido:", error.message);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
};
export const receiveCashOutWebhook = async (req: Request, res: Response) => {
  try {
    await cashOutService.handleWebhook(req.body);
    res.status(200).json({ message: "Webhook de transferência recebido" });
  } catch (error) {
    console.error("Erro no webhook de cash out:", error);
    res.status(500).json({ error: "Erro ao processar webhook de cash out" });
  }
};
