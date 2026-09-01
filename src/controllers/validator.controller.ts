import { Request, Response } from "express";
import { validateLuhn } from "../utils/luhn";
import { CardService } from "../services/card.service";

const cardService = new CardService();

export const validateCard = (req: Request, res: Response) => {
  const { cardNumber } = req.body;
    if (!cardNumber) {
        return res.status(400).json({ error: "Card number is required" });
    }
    if(typeof cardNumber !== "string") {
        return res.status(400).json({ error: "Card number must be a string" });
    }
    const result = cardService.validate(cardNumber);
    res.json(result);
}

