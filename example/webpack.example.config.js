module.exports = {
    devtool: 'sourcemap',
    context: __dirname + "/",
    entry: "./example.js",
    output: {
        path: __dirname + "/",
        publicPath: "/",
        filename: "bundle.js"
    }
};
