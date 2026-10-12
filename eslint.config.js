import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const presentationFiles = ['src/**/ui/**/*.{ts,tsx}', 'src/**/components/**/*.{ts,tsx}'];

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: { ecmaVersion: 2022, globals: globals.browser },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: { ...reactHooks.configs.recommended.rules, 'react-refresh/only-export-components': ['warn', { allowConstantExport: true }] },
  },
  {
    files: presentationFiles,
    rules: {
      'no-restricted-imports': ['error', {
        paths: [
          { name: '@reduxjs/toolkit', message: 'Presentation UI must not depend on Redux Toolkit.' },
          { name: 'react-redux', message: 'Presentation UI must not depend on React Redux.' },
        ],
        patterns: [{ group: ['**/app/store/**','**/model/**','**/*slice*','**/*thunk*','**/*listener*','**/*reducer*'], message: 'Presentation UI must depend on props/view-models, not business state internals.' }],
      }],
    },
  },
);
