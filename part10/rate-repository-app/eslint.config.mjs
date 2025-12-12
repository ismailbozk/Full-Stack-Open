import { defineConfig } from "eslint/config";
import react from "eslint-plugin-react";
import reactNative from "eslint-plugin-react-native";
import babelParser from "@babel/eslint-parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    extends: compat.extends("eslint:recommended", "plugin:react/recommended"),

    plugins: {
        react,
        "react-native": reactNative,
        import: importPlugin,
    },

    languageOptions: {
        globals: {
            ...reactNative.environments["react-native"]["react-native"],
        },

        parser: babelParser,
    },

    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
            typescript: {
                project: path.join(__dirname, "tsconfig.json"),
            },
        },
    },

    rules: {
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "import/no-unresolved": "error",
    },
},
// TypeScript-specific config for .ts and .tsx files
{
    files: ["**/*.ts", "**/*.tsx"],

    plugins: {
        "@typescript-eslint": tsPlugin,
    },

    languageOptions: {
        parser: tsParser,
        parserOptions: {
            project: path.join(__dirname, "tsconfig.json"),
            sourceType: "module",
            ecmaVersion: 2020,
        },
    },

    rules: {
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unsafe-assignment": "warn",
        "@typescript-eslint/no-unsafe-call": "warn",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        "@typescript-eslint/no-unsafe-return": "warn",
    },
}
]);