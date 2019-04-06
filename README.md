## Language
[简体中文](https://github.com/kszitt/seamless-scroll-js/blob/master/README_CN.md)

## Browser support
| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE" width="32px" height="32px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="32px" height="32px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="32px" height="32px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="32px" height="32px" />](http://godban.github.io/browsers-support-badges/)
|:---------:|:---------:|:---------:|:---------:|
| IE10+ | &check;| &check; | &check; | &check;

## Install
``` javascript
npm install seamless-scroll-js --save-dev
```

## USE
### react, vue
``` javascript
import "seamless-scroll-js"
...

const dom = document.getElementById("dom");
dom.SeamlessScroll([options]);
```
### html
``` html
Index.js in the project
<script src="./index.js"></script>

const dom = document.getElementById("dom");
dom.SeamlessScroll([options]);
```

## API
### .SeamlessScroll([options])  
init  
#### options
|key|description|default|type|
|:---|---|---|---|
|`direction`|top、bottom、left、right|`top`|`String`|
|`duration`|animation duration|`20000`ms|`Number`|
|`timingFunction`|transition type, see [w3c css3 transition timingFunction](http://www.w3school.com.cn/cssref/pr_transition-timing-function.asp)|`linear`|`String`|
|`delay`|transition delay, see [w3c css3 transition delay](http://www.w3school.com.cn/cssref/pr_transition-delay.asp)|`0`ms|`Number`|
|`autoPlay`|whether to play automatically|`true`|`Boolean`|
### .play()
Start scroll
### .onScrollStart {function}
Callback function before each roll starts
### .onScrollStart {function}
Callback function after each round of rolling ends


