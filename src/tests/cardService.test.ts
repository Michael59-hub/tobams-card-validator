// cardService.test.ts
import { describe, it, expect } from 'vitest';
import { CardService } from '../services/card.service';

describe('CardService - validate()', () => {
  const cardService = new CardService();

  it('should return isValid: true for a valid Visa card number', () => {
    const validVisa = '4222222222222';
    const result = cardService.validate(validVisa);


    expect(result.isValid).toBe(true);
    expect(result.brand).toBe('Visa');
    expect(result.checks.luhnPassed).toBe(true);
  });


  it('should fail validation if the card contains invalid characters', () => {
    const invalidCard = '4532-ABCD-0000-0008';

    const result = cardService.validate(invalidCard);

    expect(result.isValid).toBe(false);
    expect(result.checks.isNumericOnly).toBe(false);
    expect(result.brand).toBe('Unknown');
  });

  it('should return isValid: false if the Luhn check digit is wrong', () => {
    const badChecksumCard = '4532015000000009';

    const result = cardService.validate(badChecksumCard);

    expect(result.isValid).toBe(false);
    expect(result.checks.luhnPassed).toBe(false);
  });
});