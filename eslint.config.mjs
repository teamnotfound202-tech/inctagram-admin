import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript' // если проект на TS
import prettier from 'eslint-config-prettier/flat'

// Базовый набор: Next Core Web Vitals + TypeScript (если нужен) + отключение формат-правил в пользу Prettier
export default defineConfig([
  ...nextVitals,
  ...nextTs, // убери строку, если у тебя JS без TS
  prettier, // гасит конфликтующие формат-правила ESLint

  // Перенеси ПАТТЕРНЫ из .eslintignore сюда и затем удали .eslintignore
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'coverage/**',
    'node_modules/**',
    'next-env.d.ts',
    'public/**/*.min.*',
  ]),
])
