/**
* favoritos
*
* @version 0.0.1-beta.0
* @author webistomin
* @email: webistomin@gmail.com
* @license: MIT
*
**/

var t,e;!function(t){t.TOP_LEFT="top-left",t.TOP_RIGHT="top-right",t.BOTTOM_LEFT="bottom-left",t.BOTTOM_RIGHT="bottom-right"}(t||(t={})),function(t){t.CIRCLE="circle",t.RECT="rectangle"}(e||(e={}));var o={icon:{iconSelector:'link[rel*="icon"]',backgroundColor:"#d21f3c",shape:e.CIRCLE,lineWidth:4,width:32,height:32},badge:{fontSize:18,fontFamily:"Helvetica, Arial, sans-serif",backgroundColor:"#d21f3c",color:"#ffffff",position:t.BOTTOM_RIGHT,shape:e.CIRCLE,minWidth:22,minHeight:22},debug:{enabled:!1,debugSelector:"#favoritos-debug"}};function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var i=Object.keys,s=function(t){return t&&"object"===n(t)&&!Array.isArray(t)&&!0},r=function t(e,o){var n,r,a=i(o);if(s(e)&&s(o))for(var c=0,h=a;c<h.length;c++){var l=h[c];s(o[l])?(e[l]||Object.assign(e,((n={})[l]={},n)),t(e[l],o[l])):Object.assign(e,((r={})[l]=o[l],r))}return e},a=function(t,e){var o=new Image;o.crossOrigin="anonymous",o.addEventListener("load",(function(){return e(o)}),{once:!0}),o.addEventListener("error",(function(t){return e(o)}),{once:!0}),o.src=t},c=function(){function n(t){this.userIconCache=null,this.boundScrollProgressListener=this.setScrollingProgressBar.bind(this),this.scrollProgressOptions={useFavicon:!1},this.debugElement=null,this.arcDegrees={0:0,90:.5*Math.PI,180:Math.PI,270:1.5*Math.PI,360:2*Math.PI},"undefined"==typeof window?console.warn("Favoritos was not initialised! Probably it is used in SSR."):(this.options=r(o,t),this.init())}return n.prototype.initIconCanvas=function(){var t=this.options,e=t.icon,o=t.badge,n=e.width,i=e.height,s=window.devicePixelRatio||1;this.iconCanvas=document.createElement("canvas"),this.iconCanvas.width=n*s,this.iconCanvas.height=i*s,this.iconCanvasContext=this.iconCanvas.getContext("2d"),this.iconCanvasContext.font=o.fontSize+"px "+o.fontFamily,this.iconCanvasContext.textAlign="center",this.iconCanvasContext.textBaseline="middle",this.iconCanvasContext.scale(s,s)},n.prototype.getContextBackgroundColor=function(t,e,o){var n,i,s,r=this.iconCanvasContext;if(Array.isArray(t)){var a=r.createLinearGradient(0,0,e,o);(s=1/((i=t).length-1),i.map((function(t,e){return[e*s,t]}))).map((function(t){a.addColorStop(t[0],t[1])})),n=a}else n=t;return n},n.prototype.init=function(){var t=this,e=this.options,o=e.icon,n=e.debug;this.iconElement=document.querySelector(o.iconSelector),this.userIconHref=this.iconElement.href,this.debugElement=document.querySelector(n.debugSelector),a(this.userIconHref,(function(e){t.userIconCache=e})),this.initIconCanvas()},n.prototype.destroy=function(){document.removeEventListener("scroll",this.boundScrollProgressListener)},n.prototype.setOptions=function(t){this.options=r(this.options,t)},n.prototype.setIcon=function(t){this.iconElement.href=t},n.prototype.reset=function(){this.options=o,this.setIcon(this.userIconHref)},n.prototype.getBadgeXPosition=function(o){var n=this.options,i=n.badge.minWidth,s=n.badge.position,r=n.icon.width,a=n.badge.shape,c=r,h=this.badgeContent,l="number"==typeof h?h>=10:h.length>=1,d=i>=o?i:o>=c?c:o;switch(s){case t.TOP_LEFT:case t.BOTTOM_LEFT:switch(a){case e.CIRCLE:return l?0:d/2;case e.RECT:return 0}break;case t.TOP_RIGHT:case t.BOTTOM_RIGHT:switch(a){case e.CIRCLE:return l?r-d:r-d/2;case e.RECT:return r-d}}},n.prototype.getBadgeYPosition=function(o){var n=this.options,i=n.badge.position,s=n.icon.height,r=n.badge.minHeight,a=n.badge.shape,c=this.badgeContent,h="number"==typeof c?c>=10:c.length>=1,l=r>=o?r:o;switch(i){case t.TOP_LEFT:case t.TOP_RIGHT:switch(a){case e.CIRCLE:return h?0:l/2;case e.RECT:return 0}break;case t.BOTTOM_LEFT:case t.BOTTOM_RIGHT:switch(a){case e.CIRCLE:return h?s-l:s-l/2;case e.RECT:return s-l}}},n.prototype.getBadgeTextXPosition=function(e){var o=this.options,n=o.badge.position,i=o.icon.width,s=o.badge.minWidth,r=s>=e?s:e>=i?i:e;switch(n){case t.TOP_RIGHT:case t.BOTTOM_RIGHT:return Math.abs(i-r/2);case t.TOP_LEFT:case t.BOTTOM_LEFT:return Math.abs(r/2)}},n.prototype.getBadgeTextYPosition=function(e){var o=this.options,n=o.badge.position,i=o.icon.height,s=o.badge.minHeight,r="number"==typeof this.badgeContent?.085*e:0,a=s>=e?s:e;switch(n){case t.TOP_RIGHT:case t.TOP_LEFT:return Math.abs(a/2+r);case t.BOTTOM_RIGHT:case t.BOTTOM_LEFT:return Math.abs(i-a/2+r)}},n.prototype.drawBadge=function(t){var o=this;void 0===t&&(t="");var n=function(n){var i=o.iconCanvasContext;o.badgeContent=t;var s=t,r=o.options.icon,a=o.options.badge,c=o.options.debug,h=o.iconCanvasContext.measureText(String(s)).width,l=a.fontSize;i.clearRect(0,0,r.width,r.height),i.drawImage(n,0,0,r.width,r.height),i.fillStyle=o.getContextBackgroundColor(a.backgroundColor,r.width,r.height),i.beginPath(),a.shape===e.CIRCLE?o.drawCircleBadge(h,l,s):o.drawRectBadge(h,l),i.fill(),i.fillStyle=a.color,i.fillText(String(s),o.getBadgeTextXPosition(h),o.getBadgeTextYPosition(l),r.width),i.closePath(),o.iconElement.href=o.iconCanvas.toDataURL("image/webp",1),c.enabled&&o.debugElement&&o.debugElement.appendChild(o.iconCanvas)};this.userIconCache?n(this.userIconCache):a(this.userIconHref,(function(t){o.userIconCache=t,n(t)}))},n.prototype.drawCircleBadge=function(t,e,o){var n=this.options,i=n.icon.width,s=n.icon.height,r=i,a=n.badge.minWidth,c=n.badge.minHeight,h=this.iconCanvasContext,l=a>=t?a:t>=r?r:t,d=c>=e?c:e;("number"==typeof o?o>=10:o.length>=1)?(console.log(t,e,"text parms"),console.log(l,d,"final"),console.log(this.getBadgeXPosition(t),this.getBadgeYPosition(e),"positions"),h.strokeStyle=this.getContextBackgroundColor(n.badge.backgroundColor,i,s),function(t,e,o,n,i,s){var r=e,a=o,c=n,h=i,l=Math.min(Math.max(n-1,1),Math.max(i-1,1),s);t.lineJoin="round",t.lineWidth=l,t.strokeRect(r+l/2,a+l/2,c-l,h-l),t.fillRect(r+l/2,a+l/2,c-l,h-l),t.stroke(),t.fill()}(h,this.getBadgeXPosition(t),this.getBadgeYPosition(e),l,d,10)):h.arc(this.getBadgeXPosition(t),this.getBadgeYPosition(e),l/2,this.arcDegrees[0],this.arcDegrees[360])},n.prototype.drawRectBadge=function(t,e){var o=this.options,n=o.icon.width,i=o.badge.minWidth,s=o.badge.minHeight,r=i>=t?i:t>=n?n:t,a=s>=e?s:e;this.iconCanvasContext.rect(this.getBadgeXPosition(t),this.getBadgeYPosition(e),r,a)},n.prototype.initScrollingProgressBar=function(t){void 0===t&&(t={useFavicon:!1}),this.scrollProgressOptions.useFavicon=t.useFavicon,document.addEventListener("scroll",this.boundScrollProgressListener)},n.prototype.setScrollingProgressBar=function(){var t=this,o=this.scrollProgressOptions.useFavicon,n=this.userIconCache,i=function(o){var n=t.options.icon,i=t.options.debug,s=document.documentElement.scrollTop,r=document.documentElement.scrollHeight-document.documentElement.clientHeight,a=s/r*100,c=Math.round(a),h=t.iconCanvasContext;h.clearRect(0,0,n.width,n.height),o&&h.drawImage(o,0,0,n.width,n.height),h.beginPath(),h.lineWidth=n.lineWidth,n.shape===e.CIRCLE?t.drawCircleProgress(a):t.drawRectProgress(a),h.strokeStyle=t.getContextBackgroundColor(n.backgroundColor,32,32),h.stroke(),t.iconElement.href=t.iconCanvas.toDataURL("image/webp",1),i.enabled&&t.debugElement&&t.debugElement.appendChild(t.iconCanvas);var l=document.createEvent("CustomEvent");l.initCustomEvent("favoritos:scroll",!0,!0,{pageHeightInPx:r,scrollTopInPx:s,scrollPercent:a,scrollPercentRounded:c}),document.dispatchEvent(l)};o?n?i(n):a(this.userIconHref,(function(e){t.userIconCache=e,i(e)})):i()},n.prototype.drawCircleProgress=function(t){var e=this.options,o=this.iconCanvasContext,n=e.icon.width,i=e.icon.height,s=e.icon.lineWidth;o.arc(n/2,i/2,n/2-s/2,this.arcDegrees[270],t*this.arcDegrees[360]/100+this.arcDegrees[270])},n.prototype.drawRectProgress=function(t){var e=this.options,o=this.iconCanvasContext,n=e.icon.width,i=e.icon.height;t<=25?(o.moveTo(0,0),o.lineTo(n/25*t,0)):t>25&&t<=50?(o.moveTo(0,0),o.lineTo(n,0),o.moveTo(n,0),o.lineTo(n,i/25*(t-25))):t>50&&t<=75?(o.moveTo(0,0),o.lineTo(n,0),o.moveTo(n,0),o.lineTo(n,i),o.moveTo(n,i),o.lineTo(-n/25*(t-75),i)):t>75&&t<=100&&(o.moveTo(0,0),o.lineTo(n,0),o.moveTo(n,0),o.lineTo(n,i),o.moveTo(n,i),o.lineTo(0,i),o.moveTo(0,i),o.lineTo(0,-i/25*(t-100)))},n}();export default c;
