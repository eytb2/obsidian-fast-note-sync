import obsidianmd from "eslint-plugin-obsidianmd";
import tsparser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    ignores: [
      "src/pb/**",
      "main.js",
      "styles.css",
      "dist/**",
      "src/lib/helpers_obsidian_bypass.js"
    ],
  },
  ...obsidianmd.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    ignores: ["src/pb/**"],
    languageOptions: {
      parser: tsparser,
      parserOptions: { project: "./tsconfig.json" },
      globals: {
        process: "readonly",
      },
    },

    // You can add your own configuration to override or add rules
    rules: {
      // example: turn off a rule from the recommended set
      "obsidianmd/sample-names": "off",
      // example: add a rule not in the recommended set and set its severity
      "obsidianmd/prefer-file-manager-trash-file": "error",
    },
  },
  {
    // fns-cli：Node 专属无头客户端（设计文档 §3/P4），Obsidian 专有规则不适用
    files: ["cli/**"],
    rules: {
      "obsidianmd/no-nodejs-modules": "off",
      "obsidianmd/no-global-this": "off",
      "obsidianmd/prefer-window-timers": "off",
    },
  },
]);
