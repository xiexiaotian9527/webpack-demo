module.exports = {
    entry: './app/main.js',
    output: {
        path: __dirname + '/public/js',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|less|scss)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [require('autoprefixer')];
                            }
                        }
                    },
                    {loader: 'less-loader'},
                    {loader: 'sass-loader'}
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [{
                        loader: 'url-loader',
                        options: {
                            limit: '1024',
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    }]
            }
        ]
    }
}