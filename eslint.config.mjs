import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import prettier from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Xác định môi trường từ biến môi trường hoặc mặc định là 'development'
const env = process.env.NODE_ENV || 'development';

const config = [
  // Cấu hình từ Next.js core-web-vitals và typescript
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Cấu hình Prettier
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
    },
  },
  // Rule tùy chỉnh cho no-console
  {
    rules: {
      'no-console': [
        'error',
        {
          allow: env === 'development' ? ['log', 'warn', 'error'] : [],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off', // Cho phép sử dụng any
    },
  },
];

export default config;
