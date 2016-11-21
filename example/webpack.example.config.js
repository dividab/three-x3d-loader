module.exports = {
    devtool: 'sourcemap',
    context: __dirname + "/example/",
    entry: "./example.js",
    output: {
        path: __dirname + "/",
        publicPath: "/",
        filename: "bundle.js"
    }
};