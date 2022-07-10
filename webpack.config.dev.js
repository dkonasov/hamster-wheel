const path = require("path");
const baseConfig  = require("./webpack.config.base");

const config = {
    ...baseConfig,
    mode: "development",
    devtool: "inline-source-map"
};

module.exports = config;