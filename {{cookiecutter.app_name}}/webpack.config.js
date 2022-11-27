const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const isProd = process.env.NODE_ENV === "production";

const config = {
    mode: isProd ? "production" : "development",
    entry: {
        index: "{{cookiecutter.app_entry}}",
    },
    output: {
        path: path.resolve(__dirname, "{{cookiecutter.app_build_dir}}"),
        clean: true
        // assetModuleFilename: 'images/[hash][ext][query]'
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: "asset/resource"
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: "{{cookiecutter.app_name | replace('-', '_')}}",
            filename: "remoteEntry.js",
            exposes: {
                "./{{cookiecutter.app_root_module_name}}": "./{{cookiecutter.app_source_dir}}/{{cookiecutter.app_root_module_name}}"
            },
            shared: { react: { singleton: true }, "react-dom": { singleton: true } },
        }),
        new HtmlWebpackPlugin({
            template: "{{cookiecutter.app_template}}",
            inject: "body",
        }),
    ],
};

if (isProd) {
    config.optimization = {
        minimizer: [new TerserWebpackPlugin()],
    };
} else {
    config.devtool = "eval-cheap-module-source-map";
    config.devServer = {
        port: {{cookiecutter.app_dev_server_port}},
        static: {
            directory: path.join(__dirname, "{{cookiecutter.app_build_dir}}"),
        },
        historyApiFallback: true
    };
}

module.exports = config;