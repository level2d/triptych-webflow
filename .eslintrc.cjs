module.exports = {
    root: true,
    env: { browser: true, es2020: true, node: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
        "plugin:@react-three/recommended",
        "eslint-config-prettier",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs", "vit.config.js"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "detect" } },
    plugins: ["react-refresh"],
    rules: {
        "no-unused-vars": ["warn"],
        "react/no-unknown-property": ["off"], // turn off b/c r3f introduces custom properties
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
    },
    globals: {
        $: "readonly",
    },
};
