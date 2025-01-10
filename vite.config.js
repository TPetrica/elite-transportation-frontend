/* eslint-disable no-undef */
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@popperjs/core": "@popperjs/core/dist/umd/popper.min.js",
		},
	},
	build: {
		rollupOptions: {
			external: [], // Remove external as we want to bundle these dependencies
			output: {
				manualChunks: {
					vendor: ["@popperjs/core", "bootstrap"],
				},
			},
		},
		commonjsOptions: {
			include: [/bootstrap/, /@popperjs\/core/],
		},
	},
	optimizeDeps: {
		include: ["@popperjs/core", "bootstrap"],
	},
});
