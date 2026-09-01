import { Request, Response } from "express";

export const validateCard = (req: Request, res: Response) => {
  const { cardNumber } = req.body;
    if (!cardNumber) {
        return res.status(400).json({ error: "Card number is required" });
    }

    // Validate card number using Luhn algorithm
    const isValid = luhnCheck(cardNumber);
    return res.json({ valid: isValid });
}

