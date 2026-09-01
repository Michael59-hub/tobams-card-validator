import { CardBrand, CardValidationResult } from '../types/card.types';
import { validateLuhn } from '../utils/luhn';

interface BrandRule {
  brand: CardBrand;
  prefixRegex: RegExp;
  allowedLengths: number[];
}

const BRAND_RULES: BrandRule[] = [
  { brand: 'Visa', prefixRegex: /^4/, allowedLengths: [13, 16, 19] },
  { brand: 'Mastercard', prefixRegex: /^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720)/, allowedLengths: [16] },
  { brand: 'American Express', prefixRegex: /^3[47]/, allowedLengths: [15] },
  { brand: 'Discover', prefixRegex: /^(6011|65|64[4-9])/, allowedLengths: [16, 19] },
  { brand: 'Verve', prefixRegex: /^(506|507|6500)/, allowedLengths: [16, 18, 19] },
];

export class CardService {
  public validate(rawCardNumber: string): CardValidationResult {
    const sanitized = rawCardNumber.replace(/[\s-]/g, '');
    const isNumericOnly = /^\d+$/.test(sanitized);

    if (!isNumericOnly) {
      return {
        isValid: false,
        brand: 'Unknown',
        length: sanitized.length,
        checks: { isNumericOnly: false, luhnPassed: false, brandPatternMatched: false },
      };
    }

    const matchedRule = BRAND_RULES.find(rule => 
      rule.prefixRegex.test(sanitized) && rule.allowedLengths.includes(sanitized.length)
    );

    const brand: CardBrand = matchedRule ? matchedRule.brand : 'Unknown';
    const brandPatternMatched = Boolean(matchedRule);
    const luhnPassed = validateLuhn(sanitized);

    const isValid = isNumericOnly && luhnPassed && brandPatternMatched;

    return {
      isValid,
      brand,
      length: sanitized.length,
      checks: {
        isNumericOnly,
        luhnPassed,
        brandPatternMatched,
      },
    };
  }
}