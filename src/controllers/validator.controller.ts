import { Request, Response } from "express";
import { validateLuhn } from "../utils/luhn";

export const validateCard = (req: Request, res: Response) => {
  const { cardNumber } = req.body;
    if (!cardNumber) {
        return res.status(400).json({ error: "Card number is required" });
    }

    const isValid = validateLuhn(cardNumber);
    res.json({ valid: isValid });
}

