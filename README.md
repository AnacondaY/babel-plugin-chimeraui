# babel-plugin-chimeraui

[![Build Status](https://travis-ci.org/AnacondaY/babel-plugin-chimeraui.svg?branch=master)](https://travis-ci.org/AnacondaY/babel-plugin-chimeraui)

为chimera-ui定制的组件模块导入插件, 可实现组件模块按需加载。

## 安装
```shell
    npm install babel-plugin-chimeraui --save-dev
    //or
    yarn add babel-plugin-chimeraui --dev
```

## 用法
```json
    // .babelrc
    {
        "plugins": [
            "chimeraui"
        ]
    }
```

## 选项

* libDirectory: ```String```

包的目录名称, 默认```'lib'```。

* style: ```'scss'|'css'|Boolean```

加载样式的格式, 默认```'scss'```。当为```false```时将不会自动加载样式。

* 配置

```json
    // .babelrc
    {
        "plugins": [
            ["chimeraui", {
                "libDirectory": "lib",
                "style": "scss"
            }]
        ]
    }
```



    