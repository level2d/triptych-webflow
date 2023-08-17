import path from "path";
import { defineConfig, loadEnv } from "vite";
import mkcert from "vite-plugin-mkcert";

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
        plugins: [mkcert()],
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
                        jquery: "$",
                    },
                },
                external: ["jquery"],
            },
        },
    };
});
