import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import firebaseRulesPlugin from "@firebase/eslint-plugin-security-rules";

export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {ignores: ['dist/**/*', 'node_modules/**/*']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  firebaseRulesPlugin.configs['flat/recommended']
];
