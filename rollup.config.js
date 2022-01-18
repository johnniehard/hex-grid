import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import replace from '@rollup/plugin-replace';
import html from "@rollup/plugin-html";

const production = !process.env.ROLLUP_WATCH;
const version = String(
	require("child_process").execSync("git rev-parse --short HEAD")
).trim();

const htmlOptions = {
	template: async ({ attributes, files, meta, publicPath, title }) => {
		const script = (files.js || [])
			.map(({ fileName }) => {
				return `<script defer src='./${fileName}'></script>`;
			})
			.join("\n");

		const css = (files.css || [])
			.map(({ fileName }) => {
				return `<link rel='stylesheet' href='./${fileName}'>`;
			})
			.join("\n");
		return `<!DOCTYPE html>
				<html lang="en">
				<head>
					<meta charset='utf-8'>
					<meta name='viewport' content='width=device-width,initial-scale=1'>

					<title>hex</title>

					${css}
					${script}
				</head>

				<body>
				</body>
				</html>
				`;
	},
};

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: `public/build/bundle.${version}.js`
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: {
				// enable run-time checks when not in production
				dev: !production
			}
		}),
		// we'll extract any component CSS out into
		// a separate file - better for performance
		css({ output: `bundle.${version}.css` }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
		resolve({
			browser: true,
			dedupe: ['svelte']
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),

		// In dev mode, call `npm run start` once
		// the bundle has been generated
		!production && serve(),

		// Watch the `public` directory and refresh the
		// browser on changes when not in production
		!production && livereload('public'),

		// If we're building for production (npm run build
		// instead of npm run dev), minify
		production && terser(),
		replace({
			'process.env.PUBLIC_URL': JSON.stringify(process.env.PUBLIC_URL),
			preventAssignment: true,
		}),
		html(htmlOptions),
	],
	watch: {
		clearScreen: false
	}
};
