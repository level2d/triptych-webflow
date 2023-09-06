import path from "path";
import { defineConfig, loadEnv } from "vite";

// plugins
import eslint from "vite-plugin-eslint";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react";

// vite.config.js
export default defineConfig((command, mode) => {
    const env = loadEnv(mode, process.cwd(), "");
    const baseUrl =
        env.NODE_ENV === "production"
            ? env.PRODUCTION_URL
            : "https://localhost:3000";
    return {
        base: baseUrl,
        assetsInclude: ["**/*.gltf", "**/*.glb"],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./"),
            },
        },
        server: {
            https: true,
            host: "localhost",
            port: "3000",
            cors: "*",
            origin: "https://localhost:3000",
            hmr: {
                host: "localhost",
                protocol: "wss",
            },
        },
        plugins: [mkcert(), eslint(), react()],
        build: {
            minify: true,
            manifest: true,
            rollupOptions: {
                input: "./js/main.js",
                output: {
                    format: "umd",
                    entryFileNames: "main.js",
                    esModule: false,
                    compact: true,
                    globals: {
                        // webflow sites have global jQuery
                        jquery: "window.jQuery",
                        $: "window.$",
                    },
                },
                external: ["jquery"],
            },
        },
    };
});
