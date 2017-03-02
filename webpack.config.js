module.exports = {
    entry: "./builder.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "index!css" },
            {
                test: /\.js$/,
                include: /(node_modules)/,
                loader: 'babel-loader?presets[]=es2015'
            }
        ]
    }
};