HTMLElement.prototype.SeamlessScroll = function(options) {
  var el = this,
    defaultOptions = {
      direction: "top",
      property: "all",
      duration: 20*1000,
      timingFunction: "linear",
      delay: 0,
      autoPlay: true
    };
  for(var k in defaultOptions){
    options[k] = options[k] ? options[k] : defaultOptions[k];
  }
  el.addEventListener("transitionend", transitionEnd, false);

  var parent = el.parentElement,
    parentHeight, parentWidth,
    scrollHeight, scrollWidth,
    firstList = el.firstElementChild,
    list = [],
    listHeight, listWidth,
    cacheLength, length,
    browser = navigatorUserAgent(),
    time = browser === "Ie" ? 15 : undefined;

  function refresh(){
    for(var j = 0; j < list.length; j++){
      if(list[j].getAttribute("append")){
        el.removeChild(list[j]);
        j--;
      }
    }

    parentHeight = parent.offsetHeight;
    parentWidth = parent.offsetWidth;
    scrollHeight = el.offsetHeight;
    scrollWidth = el.offsetWidth;
    let listAll = el.childNodes;
    list = [];
    for(let i = 0; i < listAll.length; i++){
      if(listAll[i].nodeType === 1){
        list.push(listAll[i]);
      }
    }
    listHeight = firstList.offsetHeight;
    listWidth = firstList.offsetWidth;

    switch(options.direction){
      case "top":
      case "bottom":
        if(parentHeight > scrollHeight) return;
        length = Math.ceil(parentHeight/listHeight);

        if(options.direction === "top"){
          for(var i = 0; i < length; i++){
            el.appendChild(getHtmlByStr(list[i].outerHTML));
          }
        } else {
          for(var i = 0; i < length; i++){
            el.insertBefore(getHtmlByStr(list[list.length - 1 - i].outerHTML), el.firstChild);
          }
          scrollHeight = el.offsetHeight;
        }
        break;
      case "left":
      case "right":
        if(parentWidth > scrollWidth) return;
        length = Math.ceil(parentWidth/listWidth);

        if(options.direction === "left"){
          for(var i = 0; i < length; i++){
            el.appendChild(getHtmlByStr(list[i].outerHTML));
          }
        } else {
          for(var i = 0; i < length; i++){
            el.insertBefore(getHtmlByStr(list[list.length - 1 - i].outerHTML), el.firstChild);
          }
          scrollWidth = el.offsetWidth;
        }
        break;
      default:
        console.error("options.direction!, 请输入(top|bottom|left|right)");
        return;
    }

    if(cacheLength) {
      // console.log("重新计算", list.length, length, options.duration, cacheLength);
      options.duration = parseInt((list.length + length) * options.duration / cacheLength);
    }

    cacheLength = list.length;
  }

  refresh();

  if(options.autoPlay){
    transitionEnd();
  }

  el.play = transitionEnd;
  // el.refresh = refresh;

  // 过渡停止时
  function transitionEnd(){
    var style = {};

    switch(options.direction){
      case "top":
        if(el.style.top === "0px"){
          style = setTransition();
          style.top = -scrollHeight + "px";
          onScrollStart();
        } else {
          style = setTransition(true);
          style.top = "0px";
          if(el.style.top) onScrollEnd();
          setTimeout(transitionEnd, time);
        }
        break;
      case "bottom":
        if(el.style.top === -(scrollHeight - parentHeight) + "px"){
          style = setTransition();
          style.top = (parentHeight - length*listHeight) + "px";
          onScrollStart();
        } else {
          style = setTransition(true);
          style.top = -(scrollHeight - parentHeight) + "px";
          if(el.style.top) onScrollEnd();
          setTimeout(transitionEnd, time);
        }
        break;
      case "left":
        if(el.style.left === "0px"){
          style = setTransition();
          style.left = -scrollWidth + "px";
          onScrollStart();
        } else {
          style = setTransition(true);
          style.left = "0px";
          if(el.style.left) onScrollEnd();
          setTimeout(transitionEnd, time);
        }
        break;
      case "right":
        if(el.style.left === -(scrollWidth - parentWidth) + "px"){
          style = setTransition();
          style.left = (parentWidth - length*listWidth) + "px";
          onScrollStart();
        } else {
          style = setTransition(true);
          style.left =-(scrollWidth - parentWidth) + "px";
          if(el.style.left) onScrollEnd();
          setTimeout(transitionEnd, time);
        }
        break;
    }

    setStyle(style);
  }


  function getHtmlByStr(text) {
    if (typeof text === 'string') {
      var temp = document.createElement('div');
      temp.innerHTML = text;
      return temp.firstChild;
    }
    return text;
  }

  // 判断是哪个浏览器
  function navigatorUserAgent(){
    var userAgent = navigator.userAgent;

    if(/Edge/.test(userAgent)){
      return 'Edge';
    } else if(/Trident/.test(userAgent)){
      return 'Ie';
    } else if(/Firefox/.test(userAgent)){
      return 'Firefox';
    } else if(/Version/.test(userAgent)){
      return 'Safari';
    } else if(/Chrome/.test(userAgent)){
      return 'Chrome';
    }
  }

  function onScrollStart(){
    if(el.onScrollStart) el.onScrollStart();
  }

  function onScrollEnd(){
    if(el.onScrollEnd) el.onScrollEnd();
  }

  function setTransition(def){

    var style = {};
    style["transitionProperty"] = def ? "all" : options.property;
    style["transitionDuration"] = (def ? 0 : options.duration) + "ms";
    style["transitionTimingFunction"] = def ? "ease" : options.timingFunction;
    style["transitionDelay"] = (def ? 0 : options.delay) + "ms";

    return style;
  }

  function setStyle(style){
    for(var k in style){
      el.style[k] = style[k];
    }
  }
};