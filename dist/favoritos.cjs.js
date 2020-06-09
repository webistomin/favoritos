/**
* favoritos
*
* @version 0.0.1-beta.0
* @author webistomin
* @email: webistomin@gmail.com
* @license: MIT
*
**/

"use strict";var t,e;!function(t){t.TOP_LEFT="top-left",t.TOP_RIGHT="top-right",t.BOTTOM_LEFT="bottom-left",t.BOTTOM_RIGHT="bottom-right"}(t||(t={})),function(t){t.CIRCLE="circle",t.RECT="rectangle"}(e||(e={}));var o={icon:{iconSelector:'link[rel*="icon"]',backgroundColor:"#d21f3c",shape:e.CIRCLE,lineWidth:4,width:32,height:32},badge:{fontSize:18,fontFamily:"Helvetica, Arial, sans-serif",backgroundColor:"#d21f3c",color:"#ffffff",position:t.BOTTOM_RIGHT,shape:e.CIRCLE,minWidth:22,minHeight:22},debug:{enabled:!1,debugSelector:"#favoritos-debug"}},i=Object.keys,n=function(t){return t&&"object"==typeof t&&!Array.isArray(t)&&!0},a=function(t,e){var o,s,r=i(e);if(n(t)&&n(e))for(var c=0,h=r;c<h.length;c++){var g=h[c];n(e[g])?(t[g]||Object.assign(t,((o={})[g]={},o)),a(t[g],e[g])):Object.assign(t,((s={})[g]=e[g],s))}return t},s=function(t,e){var o=new Image;o.crossOrigin="anonymous",o.addEventListener("load",(function(){return e(o)}),{once:!0}),o.addEventListener("error",(function(){return e(o)}),{once:!0}),o.src=t},r=function(){function i(t){void 0===t&&(t={}),this.userIconCache=null,this.debugElement=null,this.arcDegrees={0:0,90:.5*Math.PI,180:Math.PI,270:1.5*Math.PI,360:2*Math.PI},"undefined"==typeof window?console.warn("Favoritos was not initialised! Probably it is used in SSR."):(this.options=a(o,t),this.init())}return i.prototype.init=function(){var t=this,e=this.options,o=e.icon,i=e.debug;this.iconElement=document.querySelector(o.iconSelector),this.iconElement?(this.userIconHref=this.iconElement.href,s(this.userIconHref,(function(e){t.userIconCache=e}))):console.warn('Favoritos: favicon element wasn\'t found \n Please, add <link rel="shortcut icon" href="..."> to head section'),i.enabled&&(this.debugElement=document.querySelector(i.debugSelector),this.debugElement||console.warn("Favoritos: debugger was enabled but debug element wasn't found")),this.initIconCanvas()},i.prototype.initIconCanvas=function(){var t=this.options,e=t.icon,o=t.badge,i=e.width,n=e.height,a=window.devicePixelRatio||1;this.iconCanvas=document.createElement("canvas"),this.iconCanvas.width=i*a,this.iconCanvas.height=n*a,this.iconCanvasContext=this.iconCanvas.getContext("2d"),this.iconCanvasContext.font=o.fontSize+"px "+o.fontFamily,this.iconCanvasContext.textAlign="center",this.iconCanvasContext.textBaseline="middle",this.iconCanvasContext.scale(a,a)},i.prototype.getContextBackgroundColor=function(t,e,o){var i,n,a,s=this.iconCanvasContext;if(Array.isArray(t)){var r=s.createLinearGradient(0,0,e,o);(a=1/((n=t).length-1),n.map((function(t,e){return[e*a,t]}))).map((function(t){r.addColorStop(t[0],t[1])})),i=r}else i=t;return i},i.prototype.setOptions=function(t){this.options=a(this.options,t)},i.prototype.setIcon=function(t){this.iconElement.href=t,this.userIconCache=null},i.prototype.reset=function(){this.options=o,this.setIcon(this.userIconHref),delete this.badgeContent},i.prototype.drawImage=function(t){var e=this.iconCanvasContext,o=this.options.icon;"crossOrigin"in t&&(t.crossOrigin="anonymous"),e.drawImage(t,0,0,o.width,o.height),this.iconElement.href=this.iconCanvas.toDataURL("image/webp",1),this.setDebugger()},i.prototype.drawBadge=function(t){var o=this;void 0===t&&(t="");var i=function(i){var n=o.iconCanvasContext;o.badgeContent=t;var a=t,s=o.options.icon,r=o.options.badge,c=o.iconCanvasContext.measureText(String(a)).width,h=r.fontSize;n.clearRect(0,0,s.width,s.height),n.drawImage(i,0,0,s.width,s.height),n.fillStyle=o.getContextBackgroundColor(r.backgroundColor,s.width,s.height),n.beginPath(),r.shape===e.CIRCLE?o.drawCircleBadge(c,h,a):o.drawRectBadge(c,h),n.fill(),n.fillStyle=r.color,n.fillText(String(a),o.getBadgeTextXPosition(c),o.getBadgeTextYPosition(h),s.width),n.closePath(),o.iconElement.href=o.iconCanvas.toDataURL("image/webp",1),o.setDebugger()};this.userIconCache?i(this.userIconCache):s(this.userIconHref,(function(t){o.userIconCache=t,i(t)}))},i.prototype.drawProgressBar=function(t,o){var i=this;void 0===o&&(o=!1);var n=this.userIconCache,a=function(o){var n=i.iconCanvasContext,a=i.options.icon;n.clearRect(0,0,a.width,a.height),o&&n.drawImage(o,0,0,a.width,a.height),n.beginPath(),n.lineWidth=a.lineWidth,a.shape===e.CIRCLE?i.drawCircleProgressBar(t):i.drawRectProgressBar(t),n.strokeStyle=i.getContextBackgroundColor(a.backgroundColor,a.width,a.height),n.stroke(),i.iconElement.href=i.iconCanvas.toDataURL("image/webp",1),i.setDebugger()};o?n?a(n):s(this.userIconHref,(function(t){i.userIconCache=t})):a()},i.prototype.getBadgeXPosition=function(o){var i=this.options,n=i.badge.minWidth,a=i.badge.position,s=i.icon.width,r=i.badge.shape,c=s,h=this.badgeContent,g="number"==typeof h?h>=10:h.length>=1,d=n>=o?n:o>=c?c:o;switch(a){case t.TOP_LEFT:case t.BOTTOM_LEFT:switch(r){case e.CIRCLE:return g?0:d/2;case e.RECT:return 0}break;case t.TOP_RIGHT:case t.BOTTOM_RIGHT:switch(r){case e.CIRCLE:return g?s-d:s-d/2;case e.RECT:return s-d}}},i.prototype.getBadgeYPosition=function(o){var i=this.options,n=i.badge.position,a=i.icon.height,s=i.badge.minHeight,r=i.badge.shape,c=this.badgeContent,h="number"==typeof c?c>=10:c.length>=1,g=s>=o?s:o;switch(n){case t.TOP_LEFT:case t.TOP_RIGHT:switch(r){case e.CIRCLE:return h?0:g/2;case e.RECT:return 0}break;case t.BOTTOM_LEFT:case t.BOTTOM_RIGHT:switch(r){case e.CIRCLE:return h?a-g:a-g/2;case e.RECT:return a-g}}},i.prototype.getBadgeTextXPosition=function(e){var o=this.options,i=o.badge.position,n=o.icon.width,a=o.badge.minWidth,s=a>=e?a:e>=n?n:e;switch(i){case t.TOP_RIGHT:case t.BOTTOM_RIGHT:return Math.abs(n-s/2);case t.TOP_LEFT:case t.BOTTOM_LEFT:return Math.abs(s/2)}},i.prototype.getBadgeTextYPosition=function(e){var o=this.options,i=o.badge.position,n=o.icon.height,a=o.badge.minHeight,s="number"==typeof this.badgeContent?.085*e:0,r=a>=e?a:e;switch(i){case t.TOP_RIGHT:case t.TOP_LEFT:return Math.abs(r/2+s);case t.BOTTOM_RIGHT:case t.BOTTOM_LEFT:return Math.abs(n-r/2+s)}},i.prototype.drawCircleBadge=function(t,e,o){var i=this.options,n=i.icon.width,a=i.icon.height,s=n,r=i.badge.minWidth,c=i.badge.minHeight,h=this.iconCanvasContext,g=r>=t?r:t>=s?s:t,d=c>=e?c:e;("number"==typeof o?o>=10:o.length>=1)?(h.strokeStyle=this.getContextBackgroundColor(i.badge.backgroundColor,n,a),function(t,e,o,i,n,a){var s=e,r=o,c=i,h=n,g=Math.min(Math.max(i-1,1),Math.max(n-1,1),a);t.lineJoin="round",t.lineWidth=g,t.strokeRect(s+g/2,r+g/2,c-g,h-g),t.fillRect(s+g/2,r+g/2,c-g,h-g),t.stroke(),t.fill()}(h,this.getBadgeXPosition(t),this.getBadgeYPosition(e),g,d,10)):h.arc(this.getBadgeXPosition(t),this.getBadgeYPosition(e),g/2,this.arcDegrees[0],this.arcDegrees[360])},i.prototype.drawRectBadge=function(t,e){var o=this.options,i=o.icon.width,n=o.badge.minWidth,a=o.badge.minHeight,s=n>=t?n:t>=i?i:t,r=a>=e?a:e;this.iconCanvasContext.rect(this.getBadgeXPosition(t),this.getBadgeYPosition(e),s,r)},i.prototype.drawCircleProgressBar=function(t){var e=this.options,o=this.iconCanvasContext,i=e.icon.width,n=e.icon.height,a=e.icon.lineWidth;o.arc(i/2,n/2,i/2-a/2,this.arcDegrees[270],t*this.arcDegrees[360]/100+this.arcDegrees[270])},i.prototype.drawRectProgressBar=function(t){var e=this.options,o=this.iconCanvasContext,i=e.icon.width,n=e.icon.height;t<=25?(o.moveTo(0,0),o.lineTo(i/25*t,0)):t>25&&t<=50?(o.moveTo(0,0),o.lineTo(i,0),o.moveTo(i,0),o.lineTo(i,n/25*(t-25))):t>50&&t<=75?(o.moveTo(0,0),o.lineTo(i,0),o.moveTo(i,0),o.lineTo(i,n),o.moveTo(i,n),o.lineTo(-i/25*(t-75),n)):t>75&&t<=100&&(o.moveTo(0,0),o.lineTo(i,0),o.moveTo(i,0),o.lineTo(i,n),o.moveTo(i,n),o.lineTo(0,n),o.moveTo(0,n),o.lineTo(0,-n/25*(t-100)))},i.prototype.setDebugger=function(){this.options.debug.enabled&&this.debugElement&&this.debugElement.appendChild(this.iconCanvas)},i}();module.exports=r;