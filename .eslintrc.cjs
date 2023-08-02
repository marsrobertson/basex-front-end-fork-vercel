module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: { ecmaVersion: 2021, sourceType: "module" },
	plugins: ["react-refresh", "@typescript-eslint"],
	rules: {
		"react-refresh/only-export-components": "warn",
		"@typescript-eslint/no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
		"@typescript-eslint/no-explicit-any": "off",
	},
};
