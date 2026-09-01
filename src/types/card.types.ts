export type CardBrand = 'Visa' | 'Mastercard' | 'American Express' | 'Discover' | 'Verve' | 'Unknown';

export interface CardValidationResult {
  isValid: boolean;
  brand: CardBrand;
  length: number;
  checks: {
    isNumericOnly: boolean;
    luhnPassed: boolean;
    brandPatternMatched: boolean;
  };
}