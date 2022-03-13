module.exports= {
    mode: "development",
    entry: "./app.js",
    watch: true,
    module: {
        rules: [
            {
                test: /\.js/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        ]
    }
}