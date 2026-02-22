import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-console": "warn", // Te avisa si dejas console.logs
      "@typescript-eslint/no-unused-vars": ["error"], // Error si declarás variables y no las usás
      "prefer-const": "error", // Te obliga a usar const si la variable no cambia
    },
  }
);