/**
* favoritos
*
* @version 0.0.1-beta.0
* @author webistomin
* @email: webistomin@gmail.com
* @license: MIT
*
**/

"use strict";var t,e;!function(t){t.TOP_LEFT="top-left",t.TOP_RIGHT="top-right",t.BOTTOM_LEFT="bottom-left",t.BOTTOM_RIGHT="bottom-right"}(t||(t={})),function(t){t.CIRCLE="circle",t.RECT="rectangle"}(e||(e={}));var o;!function(t){t.NONE="none",t.POP="pop",t.SLIDE="slide",t.FADE="fade",t.POP_FADE="popfade"}(o||(o={}));var n={icon:{iconSelector:'link[rel*="icon"]',backgroundColor:"#d21f3c",shape:e.CIRCLE,lineWidth:4,width:32,height:32},badge:{fontSize:18,fontFamily:"Helvetica, Arial, sans-serif",backgroundColor:"#d21f3c",color:"#ffffff",position:t.BOTTOM_RIGHT,animation:o.NONE,shape:e.CIRCLE,minWidth:22,minHeight:22}},i=Object.keys,s=function(t){return t&&"object"==typeof t&&!Array.isArray(t)&&!0},r=function(t,e){var o,n,a=i(e);if(s(t)&&s(e))for(var c=0,h=a;c<h.length;c++){var d=h[c];s(e[d])?(t[d]||Object.assign(t,((o={})[d]={},o)),r(t[d],e[d])):Object.assign(t,((n={})[d]=e[d],n))}return t},a=function(t){return new Promise((function(e,o){var n=new Image;n.crossOrigin="anonymous",n.addEventListener("load",(function(){return e(n)}),{once:!0}),n.addEventListener("error",(function(t){return o(t)}),{once:!0}),n.src=t}))},c=function(){function o(t){this.userIconCache=null,this.boundScrollProgressListener=this.setScrollingProgressBar.bind(this),this.arcDegrees={0:0,90:.5*Math.PI,180:Math.PI,270:1.5*Math.PI,360:2*Math.PI},"undefined"==typeof window?console.warn("Favoritos was not initialised! Probably it is used in SSR."):(this.options=r(n,t),this.init())}return o.prototype.initIconCanvas=function(){var t=this.options,e=t.icon,o=t.badge,n=e.width,i=e.height;this.iconCanvas=document.createElement("canvas"),this.iconCanvas.width=n,this.iconCanvas.height=i,this.iconCanvasContext=this.iconCanvas.getContext("2d"),this.iconCanvasContext.font=o.fontSize+"px "+o.fontFamily,this.iconCanvasContext.textAlign="center",this.iconCanvasContext.textBaseline="middle"},o.prototype.getContextBackgroundColor=function(t,e,o){var n,i,s,r=this.iconCanvasContext;if(Array.isArray(t)){var a=r.createLinearGradient(0,0,e,o);(s=1/((i=t).length-1),i.map((function(t,e){return[e*s,t]}))).map((function(t){a.addColorStop(t[0],t[1])})),n=a}else n=t;return n},o.prototype.init=function(){var t=this,e=this.options.icon;this.iconElement=document.querySelector(e.iconSelector),this.userIconHref=this.iconElement.href,a(this.userIconHref).then((function(e){t.userIconCache=e})),this.initIconCanvas()},o.prototype.destroy=function(){document.removeEventListener("scroll",this.boundScrollProgressListener)},o.prototype.setOptions=function(t){this.options=r(this.options,t)},o.prototype.setIcon=function(t){this.iconElement.href=t},o.prototype.reset=function(){this.options=n,this.setIcon(this.userIconHref)},o.prototype.getBadgeXPosition=function(o){var n=this.options,i=n.badge.minWidth,s=n.badge.position,r=n.icon.width,a=n.badge.shape,c=r,h=this.badgeContent>=10,d=i>=o?i:o>=c?c:o;switch(s){case t.TOP_LEFT:case t.BOTTOM_LEFT:switch(a){case e.CIRCLE:return h?0:d/2;case e.RECT:return 0}break;case t.TOP_RIGHT:case t.BOTTOM_RIGHT:switch(a){case e.CIRCLE:return h?r-d:r-d/2;case e.RECT:return r-d}}},o.prototype.getBadgeYPosition=function(o){var n=this.options,i=n.badge.position,s=n.icon.height,r=n.badge.minHeight,a=n.badge.shape,c=this.badgeContent>=10,h=r>=o?r:o;switch(i){case t.TOP_LEFT:case t.TOP_RIGHT:switch(a){case e.CIRCLE:return c?0:h/2;case e.RECT:return 0}break;case t.BOTTOM_LEFT:case t.BOTTOM_RIGHT:switch(a){case e.CIRCLE:return c?s-h:s-h/2;case e.RECT:return s-h}}},o.prototype.getBadgeTextXPosition=function(e){var o=this.options,n=o.badge.position,i=o.icon.width,s=o.badge.minWidth,r=s>=e?s:e>=i?i:e;switch(n){case t.TOP_RIGHT:case t.BOTTOM_RIGHT:return Math.abs(i-r/2);case t.TOP_LEFT:case t.BOTTOM_LEFT:return Math.abs(r/2)}},o.prototype.getBadgeTextYPosition=function(e){var o=this.options,n=o.badge.position,i=o.icon.height,s=o.badge.minHeight,r="number"==typeof this.badgeContent?.085*e:0,a=s>=e?s:e;switch(n){case t.TOP_RIGHT:case t.TOP_LEFT:return Math.abs(a/2+r);case t.BOTTOM_RIGHT:case t.BOTTOM_LEFT:return Math.abs(i-a/2+r)}},o.prototype.drawBadge=function(t){var o=this;void 0===t&&(t=0);var n=function(n){var i=o.iconCanvasContext;o.badgeContent=t;var s=t,r=o.options.icon,a=o.options.badge,c=o.iconCanvasContext.measureText(String(s)).width,h=a.fontSize;i.clearRect(0,0,r.width,r.height),i.drawImage(n,0,0,r.width,r.height),i.fillStyle=o.getContextBackgroundColor(a.backgroundColor,r.width,r.height),i.beginPath(),a.shape===e.CIRCLE?o.drawCircleBadge(c,h,s):o.drawRectBadge(c,h),i.fill(),i.fillStyle=a.color,i.fillText(String(s),o.getBadgeTextXPosition(c),o.getBadgeTextYPosition(h),r.width),i.closePath(),o.iconElement.href=o.iconCanvas.toDataURL("image/png",1)};this.userIconCache?n(this.userIconCache):a(this.userIconHref).then((function(t){o.userIconCache=t,n(t)}))},o.prototype.drawCircleBadge=function(t,e,o){var n=this.options,i=n.icon.width,s=n.icon.height,r=i,a=n.badge.minWidth,c=n.badge.minHeight,h=this.iconCanvasContext,d=a>=t?a:t>=r?r:t,g=c>=e?c:e;o>=10?(h.strokeStyle=this.getContextBackgroundColor(n.badge.backgroundColor,i,s),function(t,e,o,n,i,s){var r=e,a=o,c=n,h=i,d=Math.min(Math.max(n-1,1),Math.max(i-1,1),s);t.lineJoin="round",t.lineWidth=d,t.strokeRect(r+d/2,a+d/2,c-d,h-d),t.fillRect(r+d/2,a+d/2,c-d,h-d),t.stroke(),t.fill()}(h,this.getBadgeXPosition(t),this.getBadgeYPosition(e),d,g,10)):h.arc(this.getBadgeXPosition(t),this.getBadgeYPosition(e),d/2,this.arcDegrees[0],this.arcDegrees[360])},o.prototype.drawRectBadge=function(t,e){var o=this.options,n=o.icon.width,i=o.badge.minWidth,s=o.badge.minHeight,r=i>=t?i:t>=n?n:t,a=s>=e?s:e;this.iconCanvasContext.rect(this.getBadgeXPosition(t),this.getBadgeYPosition(e),r,a)},o.prototype.initScrollingProgressBar=function(){document.addEventListener("scroll",this.boundScrollProgressListener)},o.prototype.setScrollingProgressBar=function(){var t=this.options.icon,o=document.documentElement.scrollTop,n=document.documentElement.scrollHeight-document.documentElement.clientHeight,i=o/n*100,s=Math.round(i),r=this.iconCanvasContext,a=document.createEvent("CustomEvent");a.initCustomEvent("build",!0,!0,{pageHeightInPx:n,scrollTopInPx:o,scrollPercent:i,scrollPercentRounded:s}),document.dispatchEvent(a),r.clearRect(0,0,t.width,t.height),r.beginPath(),r.lineWidth=t.lineWidth,t.shape===e.CIRCLE?this.drawCircleProgress(i):this.drawRectProgress(i),r.strokeStyle=this.getContextBackgroundColor(t.backgroundColor,32,32),r.stroke(),this.iconElement.href=this.iconCanvas.toDataURL("image/png",1)},o.prototype.drawCircleProgress=function(t){var e=this.options,o=this.iconCanvasContext,n=e.icon.width,i=e.icon.height,s=e.icon.lineWidth;o.arc(n/2,i/2,n/2-s/2,this.arcDegrees[270],t*this.arcDegrees[360]/100+this.arcDegrees[270])},o.prototype.drawRectProgress=function(t){var e=this.options,o=this.iconCanvasContext,n=e.icon.width,i=e.icon.height;t<=25?(o.moveTo(0,0),o.lineTo(n/25*t,0)):t>25&&t<=50?(o.moveTo(0,0),o.lineTo(n,0),o.moveTo(n,0),o.lineTo(n,i/25*(t-25))):t>50&&t<=75?(o.moveTo(0,0),o.lineTo(n,0),o.moveTo(n,0),o.lineTo(n,i),o.moveTo(n,i),o.lineTo(-n/25*(t-75),i)):t>75&&t<=100&&(o.moveTo(0,0),o.lineTo(n,0),o.moveTo(n,0),o.lineTo(n,i),o.moveTo(n,i),o.lineTo(0,i),o.moveTo(0,i),o.lineTo(0,-i/25*(t-100)))},o}();module.exports=c;