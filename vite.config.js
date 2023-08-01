import { defineConfig } from "vite";
import path from "path";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./"),
        },
    },
    plugins: [basicSsl()],
});
