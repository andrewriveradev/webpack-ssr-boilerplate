import type { Configuration } from 'webpack'
import nodeExternals from 'webpack-node-externals'

import * as rules from '../rules'
import * as plugins from '../plugins'
import { DIST_DIR, IS_DEV, ROOT_DIR } from '../env'

const config: Configuration = {
	name: 'server',
	target: 'node',
	context: ROOT_DIR,
	externalsPresets: { node: true },
	devtool: IS_DEV ? false : 'source-map',
	entry: './src/client/components/@shared/app',
	mode: IS_DEV ? 'development' : 'production',
	output: {
		filename: 'app.server.js',
		libraryTarget: 'commonjs2',
		path: DIST_DIR,
		publicPath: '/'
	},
	module: {
		rules: [
			rules.javascriptRule,
			rules.typescriptRule,
			rules.htmlRule,
			rules.mediasRule,
			rules.fontsRule,
			rules.cssRule,
			...rules.svgRules
		]
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx', '.scss'],
		plugins: [plugins.tsPaths]
	},
	plugins: [
		plugins.miniCssExtractPlugin,
		plugins.limitPlugin,
		plugins.definePlugin({ server: true })
	],
	externals: [nodeExternals()]
}

export default config
