## 语言
[English](https://github.com/kszitt/seamless-scroll-js/blob/master/README.md)

## 浏览器兼容
| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE" width="32px" height="32px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="32px" height="32px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="32px" height="32px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="32px" height="32px" />](http://godban.github.io/browsers-support-badges/)
|:---------:|:---------:|:---------:|:---------:|
| IE10+ | &check;| &check; | &check;

## 安装
``` javascript
npm install seamless-scroll-js --save-dev
```

## 使用
### react, vue
``` javascript
import "seamless-scroll-js"
...

const dom = document.getElementById("dom");
dom.SeamlessScroll([options]);
```
### html
``` html
项目中的index.js
<script src="./index.js"></script>

const dom = document.getElementById("dom");
dom.SeamlessScroll([options]);
```

## API
### .SeamlessScroll([options])  
初始化
#### options
|key|描述|默认值|类型|
|:---|---|---|---|
|`direction`|top、bottom、left、right|`top`|`String`|
|`duration`|每轮动画持续时长|`20000`ms|`Number`|
|`timingFunction`|规定速度效果的速度曲线, [w3c css3 transition timingFunction](http://www.w3school.com.cn/cssref/pr_transition-timing-function.asp)|`linear`|`String`|
|`delay`|动画延时, [w3c css3 transition delay](http://www.w3school.com.cn/cssref/pr_transition-delay.asp)|`0`ms|`Number`|
|`autoPlay`|是否自动播放|`true`|`Boolean`|
### .play()
开始滚动
### .onScrollStart {function}
每轮滚动开始之前,回调函数
### .onScrollStart {function}
每轮滚动结束之后,回调函数


