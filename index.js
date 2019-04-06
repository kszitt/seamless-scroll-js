HTMLElement.prototype.SeamlessScroll = function(options) {
  var el = this,
    defaultOptions = {
      orientation: "top",
      property: "all",
      direction: 20*1000,
      timingFunction: "linear",
      delay: 0,
      autoPlay: true
    };
  for(var k in defaultOptions){
    options[k] = options[k] ? options[k] : defaultOptions[k];
  }
  el.addEventListener("transitionend", transitionEnd, false);

  var parent = el.parentElement,
    parentHeight = parent.offsetHeight,
    parentWidth = parent.offsetWidth,
    scrollHeight = el.offsetHeight,
    scrollWidth = el.offsetWidth,
    firstList = el.firstElementChild,
    list = el.getElementsByTagName(firstList.nodeName),
    listHeight = firstList.offsetHeight,
    listWidth = firstList.offsetWidth,
    length = 0,
    browser = navigatorUserAgent(),
    time = browser === "Ie" ? 15 : undefined;

  // 是否启用
  switch(options.orientation){
    case "top":
    case "bottom":
      if(parentHeight > scrollHeight) return;
      length = Math.ceil(parentHeight/listHeight);
      break;
    case "left":
    case "right":
      if(parentWidth > scrollWidth) return;
      length = Math.ceil(parentWidth/listWidth);
      break;
    default:
      console.error("options.orientation是必须的!, 请输入(top|bottom|left|right)");
      return;
  }

  // 添加内容
  for(var i = 0; i < length; i++){
    append(el, list[i].outerHTML);
  }

  if(options.autoPlay){
    transitionEnd();
  }

  el.play = transitionEnd;

  // 过渡停止时
  function transitionEnd(){
    var style = {};

    switch(options.orientation){
      case "top":
        if(el.style.top === "0px"){
          style = setTransition();
          style.top = -scrollHeight + "px";
          scrollStart();
        } else {
          style = setTransition(true);
          style.top = "0px";
          if(el.style.top) scrollEnd();
          setTimeout(transitionEnd, time);
        }
        break;
      case "bottom":
        if(el.style.top === -scrollHeight + "px"){
          style = setTransition();
          style.top = "0px";
          scrollStart();
        } else {
          style = setTransition(true);
          style.top = -scrollHeight + "px";
          if(el.style.top) scrollEnd();
          setTimeout(transitionEnd, time);
        }
        break;
      case "left":
        if(el.style.left === "0px"){
          style = setTransition();
          style.left = -scrollWidth + "px";
          scrollStart();
        } else {
          style = setTransition(true);
          style.left = "0px";
          if(el.style.left) scrollEnd();
          setTimeout(transitionEnd, time);
        }
        break;
      case "right":
        if(el.style.left === -scrollWidth + "px"){
          style = setTransition();
          style.left = "0px";
          scrollStart();
        } else {
          style = setTransition(true);
          style.left = -scrollWidth + "px";
          if(el.style.left) scrollEnd();
          setTimeout(transitionEnd, time);
        }
        break;
    }

    setStyle(style);
  }


  function append(dom, text) {
    if (typeof text === 'string') {
      var temp = document.createElement('div');
      temp.innerHTML = text;
      var frag = document.createDocumentFragment();
      while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
      }
      dom.appendChild(frag);
    } else {
      dom.appendChild(text);
    }
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

  function scrollStart(){
    if(el.scrollStart) el.scrollStart();
  }

  function scrollEnd(){
    if(el.scrollEnd) el.scrollEnd();
  }

  function setTransition(def){

    var style = {};
    style["transitionProperty"] = def ? "all" : options.property;
    style["transitionDuration"] = (def ? 0 : options.direction) + "ms";
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