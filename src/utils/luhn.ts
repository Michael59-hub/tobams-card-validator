export const validateLuhn =(digits: string): boolean  => {
  if (!digits || !/^\d+$/.test(digits)) return false;

  let sum = 0;
  let shouldDouble = false;


  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}