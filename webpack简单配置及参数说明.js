//使用webpack步骤
    //一.安装依赖
        //命令行依次执行：
        //***全局安装webpack***(如只需要安装在项目中可跳过这一步)
            npm install - g webpack less sass node-sass

        //进入到当前项目文件夹
            cd......................
        //初始化并创建一个package.json文件
            npm init
        // package.json文件已经就绪，本项目中安装Webpack作为依赖包
            npm install webpack --save-dev
        //本项目中安装安装less和sass相关依赖
            npm install node-sass less sass --save-dev
        //安装loader：
        //url-loader(打包图片) postcss-loader(自动添加css前缀) style-loader(使处理后的css生效) css-loader(处理css并嵌入到html页面中) less-loader(编译less文件) sass-loader(编译sass文件)
            npm install url-loader style-loader css-loader postcss-loader less-loader sass-loader --save-dev
        //安装postcss的插件(用于自动添加css前缀)
            npm install autoprefixer --save-dev
        //安装html-webpack-plugin（这个插件的作用是依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）。）
            npm install html-webpack-plugin --save-dev
        //安装webpack构建本地服务器，让浏览器监听你的代码的修改，用于自动刷新显示修改后的结果
            npm install webpack-dev-server --save-dev

    //二.配置webpack.config(注：webpack.confing中配置参数都是json形式，正式使用时不得添加注释，使用时将注释删除)
        module.exports = {                          //固定写法
            entry: './app/main.js',                 //入口文件参数路径
            output: {                               //输出文件参数
                path: __dirname + '/public/js',     //输出文件路径(这里只能填写绝对路径，所以输出路径前要添加'__dirname'，'__dirname'代表当前目录的绝对路径)
                filename: 'bundle.js'               //输出文件名
            },
            module: {                               //模块(固定写法)
                rules: [                            //规则(固定写法)(数组里依次填写要调用的模块组件)
                    {
                        test: /\.(css|less|scss)$/, //匹配条件(正则写法)(这里匹配后缀为css,less,scss的样式文件)
                        use: [                      //调用loader打包的顺序是从右往左,所以这里是固定写法(代表依次调用sass-less-postcss-css-style的loader)
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
                        test: /\.(png|jpg|gif|svg)$/i,      //匹配条件(正则写法)(匹配png,jpg,gif,svg后缀的图片)
                        use: [
                            {
                                loader: 'url-loader',       //调用url-loader打包处理图片(还有个file-loader与这个功能一样，不过url-loader有更多功能和参数可设置，所以只用url-loader就可以了)
                                options: {
                                    limit: '1024',          //这个参数代表限制1024k以下大小的图片用base64编码处理，以上的依然使用file-loader的方法处理
                                                            //利弊：1.将图片文件转换为base64编码并载入浏览器能够减少http请求数，但是增大了js或html文件的体积。
                                                                  //2.如果图片在项目中的重用度较高，那么每处引用都会生成base64编码，造成了代码的冗余。
                                                                  //3.通过http请求载入到浏览器的文件可以缓存到本地，当图片在项目中的重用度较高时，会为图片的访问增加缓存的便利性，下次访问更快。
                                                                  //4.因此要平衡考虑。
                                    name: '[name].[ext]',   //规定输出名称，这里使用了[name]和[ext]占位符，表示使用原本的名字和文件后缀
                                    outputPath: 'images/'   //规定输出文件的路径(这里注意，这个路径的起点是webpack打包输出的文件所在的位置，并非当前webpack打包的执行环境所在的目录)
                                }
                            }
                        ]
                    }
                ]
            }
        }

    //三.更多插件使用可自行查找