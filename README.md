# iPassword

这是一个用于管理密码的小工具，基于 [Electron](http://electron.atom.io/) 开发，同时使用了 [fuzzy](https://github.com/mattyork/fuzzy)、[node-csv](https://github.com/adaltas/node-csv) 等类库

## 下载地址

+ [Mac](https://github.com/teshoudong/iPassword/releases/download/1.0.1/iPassword-macOS-x64_v1.0.1.zip)

## 截图

<img src="https://raw.githubusercontent.com/teshoudong/iPassword/master/capture1.png" alt="Capture" width="980" style="border:1px solid #979797;">
<img src="https://raw.githubusercontent.com/teshoudong/iPassword/master/capture2.png" alt="Capture" width="980" style="margin-top:10px;border:1px solid #979797;">

## 功能特性

 - 只需要记住一个密码
 - 支持chrome密码csv导入
 - 搜索密码
 - 通过网页或名称自动获取icon

## 运行/打包方法

### 环境配置

 - 安装 [Node.js](https://nodejs.org/) 环境；
 - 下载项目`git clone https://github.com/teshoudong/iPassword.git`
 - 进入项目根目录 `cd ./iPassword` 下，运行 `npm install` 命令，安装开发依赖库；

    ```bash
    git clone https://github.com/teshoudong/iPassword.git
    cd ./iPassword && npm install
    ```

### 构建及运行

 - 在项目根目录下执行`npm run dev`，会自动运行`webpack`打包，并且执行`electron .`
 - 支持代码改动实时生效

    ```bash
    npm run dev
    ```

### 打包发布

 - 使用 [electron-packager](https://github.com/electron-userland/electron-packager) 进行打包
 - 在项目根目录下执行`npm run pack`，会自动进行打包

    ```bash
    npm run pack
    ```

