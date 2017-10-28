# 结构
- dist 输出文件文件夹，用于直接进行APICloud项目打包，存在的css,html,icon,image,launch,script里大部分文件都为静态资源复制压缩而来，.vue等少部分开始进行组件的文件为编译生成。
- .syncignore APICloud真机同步忽略文件
- configu.xml APIcluod项目配置文件，存放各平台appid ，key等
- src 开发环境文件夹，里面静态资源以及文件目录结构都与打包文件结构保持一直，方便进行编译后能直接进行APICloud打包
- dev-server.js 进行热更新
- webpackage.config.js webpackage打包配置文件

# 目录结构

## Widget包结构

- config.xml 配置文件
- index.html （启动时默认打开的页面）
- error （报错页面）
- icon （app logo）
- launch （启动页）
- html
- css
- script
- image （图片）
- res （图片以外的资源）
- feature （引用的模块）
- wgt （子wg）

## 技术栈

- apicloud

- aui.css

- doT.js

- zepto.js

>新引入的库和框架体积要求尽量小，优先考虑官方推荐库


## 文件命名

- 文件夹和文件的命名必须使用小写加下划线的形式，禁止大写，尽量使用简洁的英文单词来命名

  ​

## 代码提交

- 建议每天至少提交一次代码

- 建议以功能分支为单位来提交代码，即完成某一个功能之后提交一次代码，尽可能添加简短注释

  ​

## HTML结构

- account
- car
- chat
- me
- order
- pay
- ware
- ...
- main.html
- m_win.html
- m_frm.html

> 第一级:
>
> - 主页 main.html
>
> - 窗口模板 m_win.html
>
> - 层模板 m_frm.html
>
> - 功能模块文件夹
>
> 第二级：
>
> - 各功能HTML（win和frm文件应该放在同一个文件夹下，并以win.html或frm.html结尾）
>
> 第三级：
>
> - 一般情况下不分第三级，以方便文件更改位置和索引资源
>
>
## 通用CSS结构

- api.css
- aui.css
- tea.css 小马哥项目通用css
- aui-***.css
- aui-iconfont.ttf
- tea-iconfont.ttf 小马哥项目图标字体库

> 项目通用css样式统一放到tea.css中，并且以“tea-”开头
>
> aui-skin.css 负责对aui.css的样式微调，以”aui-“开头
>
> 建议尽量调用通用样式库；往样式库添加样式请务必写明注释
>
> 项目通用图标字体库统一放到tea-iconfont.ttf中，并且以“tea-icon-”开头
>
> 字体库统一从http://iconfont.cn/下载

## 通用JS结构

- api.js
- conn.js（ajax请求相关js，与服务端交互必须引入）
- tea.js（小马哥通用js库，以“tea.***”的方式引用）
- doT.min.js（HTML模板渲染引擎，建议与''tea.doT"配合使用）
- zepto.min.js（类似Jquery的类库，建议尽量不使用）
- flexible.js（手淘移动端自适应方案，兼容aui.css，建议每个页面都引入）
- emo.js （文字表情转换）
- linq.js（json操作框架）
- aui-***.js（aui组件js）

> 按需引入各js文件，无顺序要求；
>
> 建议尽量调用通用js库；往js库添加函数请务必写明注释
>
> 大段HTML推荐使用doT模板，方便维护和修改，小段HTML可使用字符串拼接的方式；
>
> http://jinlong.github.io/doT


## 代码规范

参考链接：https://github.com/fex-team/styleguide

### HTML

- 语义化：尽量使用header，section，footer等语义化标签；

### CSS

-

### JavaScript

- 尽量在win中放头部和脚部，解决下拉刷新和上拉刷新的问题，页面通讯可以利用广播事件来实现



=======
# Smallge
小马哥协作开发
>>>>>>> 04835d6d002c14826e74ca60a2b6fd163089efc5
