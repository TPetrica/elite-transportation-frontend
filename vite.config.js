/* eslint-disable no-undef */
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	build: {
		rollupOptions: {
			external: ["@popperjs/core"],
			output: {
				globals: {
					"@popperjs/core": "Popper",
				},
				manualChunks: {
					vendor: ['react', 'react-dom', 'react-router-dom'],
					ui: ['antd', 'bootstrap'],
					maps: ['@react-google-maps/api'],
					date: ['moment', 'date-fns'],
					utils: ['lodash'],
					editor: ['draft-js', 'react-draft-wysiwyg', 'draftjs-to-html', 'html-to-draftjs'],
					stripe: ['@stripe/react-stripe-js', '@stripe/stripe-js'],
					sliders: ['react-slick', 'swiper'],
				}
			},
			// Tree-shake Google Analytics and Tag Manager scripts
			treeshake: 'recommended',
		},
		// Enable image optimization
		assetsInlineLimit: 10000, // Only inline assets smaller than 10kb
		chunkSizeWarningLimit: 1000, // Lower threshold to split chunks
	},
	optimizeDeps: {
		include: ["@popperjs/core", "draft-js", "react-draft-wysiwyg"],
		esbuildOptions: {
			define: {
				global: 'globalThis',
			},
		},
	},
	define: {
		'process.env': {},
		global: 'window',
	},
});

