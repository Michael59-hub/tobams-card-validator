# Tobams Card Validator

A TypeScript + Express API for validating payment card numbers using the Luhn algorithm and brand-specific rules.

## Overview

This project exposes a small REST API that checks whether a submitted card number is structurally valid and identifies the likely card brand when possible. It validates:

- numeric-only input
- Luhn checksum
- supported card brand patterns(Regex)
- accepted lengths for each brand

## Tech Stack

- Node.js
- TypeScript
- Express
- Vitest
- pnpm

## Project Structure

```text
src/
├── controllers/
│   └── validator.controller.ts
├── routes/
│   └── validator.route.ts
├── services/
│   └── card.service.ts
├── tests/
│   └── cardService.test.ts
├── types/
│   └── card.types.ts
├── utils/
│   └── luhn.ts
├── server.ts
└── ...
```

## Features

- Card validation via Luhn algorithm
- Brand detection for:
  - Visa
  - Mastercard
  - American Express
  - Discover
  - Verve
- Input validation for missing or invalid card numbers
- Unit tests for valid and invalid card scenarios

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run in development mode

```bash
pnpm dev
```

The server starts on port 3000 by default.

### Build the project

```bash
pnpm build
```

### Start the compiled app

```bash
pnpm start
```

## API

### Endpoint

```http
POST /api/validator/validate
```

### Request body

```json
{
  "cardNumber": "4222222222222"
}
```

### Success response

```json
{
  "isValid": true,
  "brand": "Visa",
  "length": 13,
  "checks": {
    "isNumericOnly": true,
    "luhnPassed": true,
    "brandPatternMatched": true
  }
}
```

### Validation error response

```json
{
  "error": "Card number is required"
}
```

### Example with curl

```bash
curl -X POST http://localhost:3000/api/validator/validate \
  -H "Content-Type: application/json" \
  -d '{"cardNumber":"4222222222222"}'
```

## Testing

Run the unit tests with:

```bash
pnpm test
```

Watch tests while developing:

```bash
pnpm test:watch
```

Coverage report:

```bash
pnpm test:coverage
```

## Notes

- The API accepts card numbers as strings so formatting such as spaces or hyphens is normalized before validation.
- Unknown or malformed values return `isValid: false` and `brand: "Unknown"`.
- The server root endpoint responds with a basic status message:

```http
GET /
```

Returns:

```text
Server up
```

## Scripts

| Script | Description |
| --- | --- |
| `pnpm dev` | Start the app in development mode with file watching |
| `pnpm build` | Compile the TypeScript project to `dist` |
| `pnpm start` | Run the built app |
| `pnpm test` | Run the Vitest suite |
| `pnpm test:watch` | Watch tests during development |
| `pnpm test:coverage` | Run tests with coverage reporting |

## License

ISC
