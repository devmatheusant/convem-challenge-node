import { Request, Response } from "express";
import * as cashInService from "#services/cashin.service.js";

export const generatePix = async (req: Request, res: Response) => {
  try {
    const result = await cashInService.generatePix(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.error("Erro ao gerar Pix", err);
    res.status(500).json({ error: "Erro ao gerar Pix" });
  }
};

export const receiveWebhook = async (req: Request, res: Response) => {
  try {
    await cashInService.handleWebhook(req.body);
    res.status(200).json({ message: "Webhook recebido" });
  } catch (err) {
    console.error("Erro no webhook", err);
    res.status(500).json({ error: "Erro ao processar webhook" });
  }
};
