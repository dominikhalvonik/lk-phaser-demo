import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts,vue}"] },
	{ languageOptions: { globals: { ...globals.browser, ...globals.node } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	...pluginVue.configs["flat/essential"],
	{
		files: ["**/*.vue"],
		languageOptions: { parserOptions: { parser: tseslint.parser } },
	},
	eslintConfigPrettier,
	{
		rules: {
			// indent: ["error", "tab"], // Toto sa bije s Prettierom...
			"linebreak-style": ["error", "unix"],
			quotes: ["error", "double"],
			semi: ["error", "always"],
			"vue/multi-word-component-names": "off",
			"vue/no-unused-properties": "error",
			"vue/no-unused-vars": ["error", { ignorePattern: "^_" }],
			"vue/no-v-html": "off",
			"no-console":
				process.env.NODE_ENV === "production"
					? "warn"
					: ["warn", { allow: ["error"] }],
			"no-debugger":
				process.env.NODE_ENV === "production" ? "warn" : "off",
			// Toto odchyti vsetky input a return typy pre funkcie - okrem arrow function return type.
			"@typescript-eslint/explicit-module-boundary-types":
				process.env.NODE_ENV === "production" ? "off" : "error",
			// Toto odchyti vsetky return typy pre funkcie - aj arrow function (z velkej casti duplicita).
			"@typescript-eslint/explicit-function-return-type":
				process.env.NODE_ENV === "production" ? "off" : "error",
			"no-restricted-syntax": [
				process.env.NODE_ENV === "production" ? "off" : "error",
				{
					message:
						"Please don't use `Boolean(value)` syntax. Use `!!value` syntax instead. #makeppsgreatagain",
					selector: "CallExpression[callee.name='Boolean']",
				},
				{
					message:
						"Please don't use `Number(value)` syntax. Use `+value` syntax instead. #makeppsgreatagain",
					selector: "CallExpression[callee.name='Number']",
				},
				{
					message:
						"Please don't use `String(value)` syntax. Use `value.toString()` syntax instead. #makeppsgreatagain",
					selector: "CallExpression[callee.name='String']",
				},
			],
		},
	},
];
