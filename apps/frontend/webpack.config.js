const webpack = require('webpack');

const myOrgEnvRegex = /^XD_/i;

function getClientEnvironment() {
	const envVars = {};
	for (const key in process.env) {
		if (myOrgEnvRegex.test(key)) {
			envVars[key] = process.env[key];
		}
	}

	return {
		'process.env': JSON.stringify(envVars),
	};
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
module.exports = (config, options, context) => {
	// Overwrite the mode set by Angular if the NODE_ENV is set
	config.mode = process.env.NODE_ENV || config.mode;

	if (!Array.isArray(config.plugins)) {
		config.plugins = [];
	}

	config.plugins.push(new webpack.DefinePlugin(getClientEnvironment()));
	return config;
};
