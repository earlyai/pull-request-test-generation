import tsParser from "@typescript-eslint/parser";
import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import _import from "eslint-plugin-import";
import sonarjs from "eslint-plugin-sonarjs";
import unicorn from "eslint-plugin-unicorn";
import { fixupPluginRules } from "@eslint/compat";
import globals from "globals";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:prettier/recommended",
  ),
  unicorn.configs.recommended,
  sonarjs.configs.recommended,
  {
    languageOptions: {
      parser: tsParser,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },

      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },

    plugins: {
      "@typescript-eslint": typescriptEslintEslintPlugin,
      "simple-import-sort": fixupPluginRules(simpleImportSort),
      "import": fixupPluginRules(_import),
    },

    rules: {
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/no-shadow": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          ignoreRestSiblings: true,
          argsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: ["variable", "parameter", "parameterProperty"],
          types: ["boolean"],
          format: ["PascalCase"],

          prefix: ["is", "should", "has", "can", "did", "will", "value", "are", "result", "default", "with"],

          leadingUnderscore: "allow",
        },
      ],

      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
      "@typescript-eslint/strict-boolean-expressions": "error",
      "@typescript-eslint/no-floating-promises": "error",

      "no-unneeded-ternary": [
        "error",
        {
          defaultAssignment: false,
        },
      ],

      "no-param-reassign": "error",
      "no-implicit-coercion": "error",

      "simple-import-sort/imports": [
        "error",
        {
          groups: [["@/__mocks__/"], ["^node:"], ["^[a-z]\\w"], ["^@[a-z]\\w"], ["^@/[a-z]\\w"], ["^\\."]],
        },
      ],

      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: "return",
        },
        {
          blankLine: "always",
          prev: ["const", "let", "var"],
          next: "*",
        },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        {
          blankLine: "always",
          prev: ["case", "default"],
          next: "*",
        },
      ],

      "unicorn/prevent-abbreviations": [
        "error",
        {
          ignore: [
            "\\.e2e-spec",
            /^ignore/i,
            /env/i,
            /^i$/,
            /dir/i,
            /dev/i,
            /prod/i,
            /db/i,
            /args/i,
            /str/i,
            /fn/i,
            /ref/i,
            /props/i,
            /params/i,
            /lib/i,
            /arr/i,
            /param/i,
            /utils/i,
          ],
        },
      ],

      "unicorn/prefer-top-level-await": "off",
      "unicorn/prefer-module": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-event-target": "off",

      "unicorn/consistent-function-scoping": [
        "error",
        {
          checkArrowFunctions: false,
        },
      ],

      "no-console": [
        "error",
        {
          allow: ["info", "error"],
        },
      ],

      "object-shorthand": ["error", "always"],

      "lines-between-class-members": [
        "error",
        {
          enforce: [
            {
              blankLine: "always",
              prev: "method",
              next: "method",
            },
          ],
        },
        {
          exceptAfterSingleLine: true,
        },
      ],

      "curly": "error",

      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: [/early.test/],
        },
      ],

      "eqeqeq": ["error", "always"],
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-process-exit": "off",
      "sonarjs/todo-tag": "warn",
      "sonarjs/deprecation": "off",
      "sonarjs/no-commented-code": "off",
      "sonarjs/void-use": "off",
      "sonarjs/prefer-regexp-exec": "off",
    },
  },
  globalIgnores(["**/*.js", "dist", "tsdown.config.ts", "jest.config.ts", "__mocks__/**"]),
  {
    files: ["**/*.test*"],

    rules: {
      "sonarjs/no-duplicate-string": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-var-requires": "off",
      "sonarjs/no-nested-functions": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
