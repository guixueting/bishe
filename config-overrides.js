//(3).在项目的根目录下创建文件:config-overrides.js(复制修改的配置文件)
// 配置后可使用@符号来引入文件
const path = require("path");
const {
    override,
    addWebpackAlias
} = require("customize-cra");

module.exports = override(
    addWebpackAlias({
        ["@"]: path.resolve(__dirname, "src")
    }),
);