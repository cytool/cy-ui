"use strict";function _createForOfIteratorHelper(t,e){var i;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(i=_unsupportedIterableToArray(t))||e&&t&&"number"==typeof t.length){i&&(t=i);var r=0,e=function(){};return{s:e,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:e}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,n=!0,o=!1;return{s:function(){i=t[Symbol.iterator]()},n:function(){var t=i.next();return n=t.done,t},e:function(t){o=!0,s=t},f:function(){try{n||null==i.return||i.return()}finally{if(o)throw s}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var i=Object.prototype.toString.call(t).slice(8,-1);return"Map"===(i="Object"===i&&t.constructor?t.constructor.name:i)||"Set"===i?Array.from(t):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(t,e){(null==e||e>t.length)&&(e=t.length);for(var i=0,r=new Array(e);i<e;i++)r[i]=t[i];return r}var cyui={City:function(t){var e=this;if(this.createDom(),this.dom=document.querySelector(t.dom||t),this.show=!1,this.province={},this.city={},this.area={},this.street={},this.startX=0,this.startY=0,this.transformNum=0,this.isSlide=!1,this.isMove=!1,this.startYIOS=0,null!==(t=this.dom.querySelector(".cyui-input-input"))&&void 0!==t&&t.addEventListener("click",function(){return e.showBox(!0)}),null!==(t=document.querySelector(".cyui-input-close"))&&void 0!==t&&t.addEventListener("click",function(){return e.showBox(!1)}),null!==(t=document.querySelector(".cyui-input-ul-box"))&&void 0!==t&&t.addEventListener("touchstart",function(t){return e.scrollUlStart(t)}),null!==(t=document.querySelector(".cyui-input-ul-box"))&&void 0!==t&&t.addEventListener("touchend",function(t){return e.scrollUlEnd(t)}),null!==(t=document.querySelector(".cyui-input-ul-box"))&&void 0!==t&&t.addEventListener("touchmove",function(t){return e.scrollUlMove(t)}),this.isIOS()){var i=_createForOfIteratorHelper(document.querySelectorAll(".cyui-input-ul"));try{for(i.s();!(r=i.n()).done;){var r=r.value;r.addEventListener("touchstart",function(t){return e.touchStartIOS(t)}),r.addEventListener("touchmove",function(t){return e.touchMoveIOS(t)})}}catch(t){i.e(t)}finally{i.f()}}}};cyui.City.prototype={createDom:function(){var t;null===document.querySelector(".cyui-input-dialog")&&((t=document.createElement("div")).setAttribute("class","cyui-input-dialog"),t.innerHTML='\n            <div class="cyui-input-box">\n                <h3 class="cyui-input-title">请选择所在地区</h3>\n                <div class="cyui-input-close">×</div>\n                <div class="cyui-input-select"></div>\n                <div class="cyui-input-card">\n                    <div class="cyui-input-ul-box">\n                        <ul class="cyui-input-ul" id="cyui-input-province"></ul>\n                        <ul class="cyui-input-ul" id="cyui-input-city"></ul>\n                        <ul class="cyui-input-ul" id="cyui-input-area"></ul>\n                        <ul class="cyui-input-ul" id="cyui-input-street"></ul>\n                    </div>\n                </div>\n            </div>\n            ',document.querySelector("body").appendChild(t))},showBox:function(t){var e=this;this.show=t,this.show?(document.querySelector(".cyui-input-dialog").classList.add("on"),setTimeout(function(){document.querySelector(".cyui-input-box").classList.add("on"),e.setSelectValue()})):(document.querySelector(".cyui-input-box").classList.remove("on"),setTimeout(function(){document.querySelector(".cyui-input-dialog").classList.remove("on")},500)),this.showAddressList("province")},scrollUlStart:function(t){this.startX=t.touches[0].pageX,this.startY=t.touches[0].pageY},scrollUlEnd:function(t){var e=this;this.isMove=!0,this.isSlide?(t=t.changedTouches[0].pageX)>this.startX?80<t-this.startX?(console.log("往右滑"),0===this.transformNum?this.toBox(this.transformNum):this.moveBox(0)):this.toBox(this.transformNum):t<this.startX&&(80<this.startX-t?(console.log("往左滑"),t=!0,0===this.transformNum&&(this.province.code||(t=!1)),1===this.transformNum&&(this.city.code||(t=!1)),2===this.transformNum&&(this.area.code||(t=!1),address.street.findIndex(function(t){return t.code.substr(0,6)===e.area.code.substr(0,6)})<=-1&&(t=!1)),(t=3===this.transformNum?!1:t)?this.moveBox(1):this.toBox(this.transformNum)):this.toBox(this.transformNum)):this.toBox(this.transformNum)},scrollUlMove:function(t){var e=this;if(this.isMove){if(.5<Math.abs(t.touches[0].clientY-this.startY)/Math.abs(t.touches[0].clientX-this.startX))return this.isSlide=!1,void(this.isMove=!1);if(0<t.touches[0].clientX-this.startX){if(this.transformNum<=0)return void(this.isSlide=!1)}else if(t.touches[0].clientX-this.startX<0){if(0==this.transformNum&&void 0===this.province.desc)return void(this.isSlide=!1);if(1==this.transformNum&&void 0===this.city.desc)return void(this.isSlide=!1);if(2==this.transformNum&&(void 0===this.area.desc||-1==address.street.findIndex(function(t){return t.code.substr(0,6)===e.area.code.substr(0,6)})))return void(this.isSlide=!1);if(3===this.transformNum)return void(this.isSlide=!1)}this.isSlide=!0;t=(this.startX-t.touches[0].clientX)/document.documentElement.clientWidth*100;document.querySelector(".cyui-input-ul-box").setAttribute("style","transform:translateX("+(-25*this.transformNum-t/4)+"%)")}},moveBox:function(t){if(t){if(3<=this.transformNum)return;this.transformNum++}else{if(this.transformNum<=0)return;this.transformNum--}document.querySelector(".cyui-input-ul-box").style.transform="translateX("+-25*this.transformNum+"%)",this.setSelectValue()},toBox:function(t){this.transformNum=t,document.querySelector(".cyui-input-ul-box").style.transform="translateX("+-25*this.transformNum+"%)",this.setSelectValue()},showAddressList:function(e){var t,i,r=this;switch(document.querySelector("#cyui-input-".concat(e)).innerHTML="",e){case"province":i="province";break;case"city":t=2,i="province";break;case"area":t=4,i="city";break;case"street":t=6,i="area"}var s=_createForOfIteratorHelper(address[e]);try{for(s.s();!(n=s.n()).done;){var n,o=n.value;"province"!==e&&o.code.substr(0,t)!==this[i].code.substr(0,t)||((n=document.createElement("li")).innerText=o.desc,n.setAttribute("data-desc",o.desc),n.setAttribute("data-code",o.code),this[e].code&&this[e].code===o.code&&n.classList.add("on"),document.querySelector("#cyui-input-".concat(e)).appendChild(n))}}catch(t){s.e(t)}finally{s.f()}var c,u=_createForOfIteratorHelper(document.querySelectorAll("#cyui-input-".concat(e," li")));try{for(u.s();!(c=u.n()).done;)c.value.onclick=function(t){return r.clickRow(t,e)}}catch(t){u.e(t)}finally{u.f()}},clickRow:function(t,e){var i,r=this,s=_createForOfIteratorHelper(document.querySelectorAll("#cyui-input-".concat(e," li")));try{for(s.s();!(i=s.n()).done;)i.value.classList.remove("on")}catch(t){s.e(t)}finally{s.f()}switch(t.target.classList.add("on"),this[e].code&&this[e].code===t.target.dataset.code||(this[e]={code:t.target.dataset.code,desc:t.target.dataset.desc},this.clearList(e)),e){case"province":this.moveBox(1),this.setSelectValue(),this.showAddressList("city");break;case"city":this.moveBox(1),this.setSelectValue(),this.showAddressList("area");break;case"area":var n=address.street.findIndex(function(t){return t.code.substr(0,6)===r.area.code.substr(0,6)});this.setSelectValue(),-1<n?(this.moveBox(1),this.showAddressList("street")):(this.showBox(!1),this.saveValue());break;case"street":this.setSelectValue(),this.showBox(!1),this.saveValue()}},clearList:function(t){switch(t){case"province":this.city={},this.area={},this.street={},document.querySelector("#cyui-input-city").innerHTML="",document.querySelector("#cyui-input-area").innerHTML="",document.querySelector("#cyui-input-street").innerHTML="";break;case"city":this.area={},this.street={},document.querySelector("#cyui-input-area").innerHTML="",document.querySelector("#cyui-input-street").innerHTML="";break;case"area":this.street={},document.querySelector("#cyui-input-street").innerHTML=""}},setSelectValue:function(){var e=this;document.querySelector(".cyui-input-select").innerHTML="";var t='<div class="cyui-input-sel-btn '.concat(0===this.transformNum?"on":"",'" data-index="0">').concat(this.province.desc||"请选择","</div>");(1<=this.transformNum||this.province.desc)&&(t+='<div class="cyui-input-sel-btn '.concat(1===this.transformNum?"on":"",'" data-index="1">').concat(this.city.desc||"请选择","</div>")),(2<=this.transformNum||this.city.desc)&&(t+='<div class="cyui-input-sel-btn '.concat(2===this.transformNum?"on":"",'" data-index="2">').concat(this.area.desc||"请选择","</div>")),(3<=this.transformNum||this.area.desc)&&-1<address.street.findIndex(function(t){return t.code.substr(0,6)===e.area.code.substr(0,6)})&&(t+='<div class="cyui-input-sel-btn '.concat(3===this.transformNum?"on":"",'" data-index="3">').concat(this.street.desc||"请选择","</div>")),document.querySelector(".cyui-input-select").innerHTML=t;var i,r=_createForOfIteratorHelper(document.querySelectorAll(".cyui-input-select .cyui-input-sel-btn"));try{for(r.s();!(i=r.n()).done;)i.value.onclick=function(t){return e.changeSelectTab(t)}}catch(t){r.e(t)}finally{r.f()}},changeSelectTab:function(t){t=parseInt(t.target.dataset.index);this.toBox(t)},saveValue:function(){var t=this.province.desc||"";t+=this.city.desc||"",t+=this.area.desc||"",t+=this.street.desc||"",this.dom.querySelector(".cyui-input-input").innerHTML=t,this.dom.querySelector(".cyui-input-input").classList.add("on")},isIOS:function(){return/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)?(console.log("ios"),!0):(/(Android)/i.test(navigator.userAgent)?console.log("android"):console.log("other"),!1)},touchStartIOS:function(t){t=t||window.event;this.startYIOS=t.changedTouches[0].pageY},touchMoveIOS:function(t){var e=t||window.event,i=e.touches[0].clientY,r=document.querySelectorAll(".cyui-input-ul")[this.transformNum],s=r.scrollTop,n="11",t=r.clientHeight,r=r.scrollHeight;if(0===s?n=r<=t?"00":"01":r<=s+t&&(n="10"),"11"!=n){t=0<i-this.startYIOS?"10":"01";if(!(parseInt(n,2)&parseInt(t,2)))return console.log("到顶了或者到底了"),e.preventDefault(),void e.stopPropagation()}this.startYIOS=i}};