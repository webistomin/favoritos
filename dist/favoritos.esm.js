/**
* favoritos
*
* @version 0.0.1-beta.0
* @author webistomin
* @email: webistomin@gmail.com
* @license: MIT
*
**/

var t;!function(t){t.TOP_LEFT="top-left",t.TOP_RIGHT="top-right",t.BOTTOM_LEFT="bottom-left",t.BOTTOM_RIGHT="bottom-right"}(t||(t={}));var e,n;!function(t){t.CIRCLE="circle",t.RECT="rectangle"}(e||(e={})),function(t){t.NONE="none",t.POP="pop",t.SLIDE="slide",t.FADE="fade",t.POP_FADE="popfade"}(n||(n={}));var i={icon:{iconSelector:'link[rel*="icon"]',backgroundColor:"#d21f3c",shape:e.CIRCLE,lineWidth:4,width:32,height:32},badge:{fontSize:18,fontFamily:"Helvetica, Arial, sans-serif",backgroundColor:"#d21f3c",color:"#ffffff",position:t.BOTTOM_RIGHT,animation:n.NONE,shape:e.CIRCLE,minWidth:22,minHeight:22}},o=function(t,e){var n=new CustomEvent(t,{bubbles:!0,detail:e});document.dispatchEvent(n)},a=window.matchMedia("(prefers-color-scheme: dark)");function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var r=Object.keys,c=function(t){return t&&"object"===s(t)&&!Array.isArray(t)&&!0},h=function t(e,n){var i,o,a=r(n);if(c(e)&&c(n))for(var s=0,h=a;s<h.length;s++){var d=h[s];c(n[d])?(e[d]||Object.assign(e,((i={})[d]={},i)),t(e[d],n[d])):Object.assign(e,((o={})[d]=n[d],o))}return e},d=function(t){return new Promise((function(e,n){var i=new Image;i.crossOrigin="anonymous",i.addEventListener("load",(function(){return e(i)}),{once:!0}),i.addEventListener("error",(function(t){return n(t)}),{once:!0}),i.src=t}))},g=function(){function n(t){if(this.userIconCache=null,"undefined"==typeof window)console.warn("Favoritos was not initialised! Probably it is used in SSR.");else{var e=this.isPrefersColorSchemeDark(),n=i;e&&(n.badge.color="#121212",n.badge.backgroundColor="#ffffff",n.icon.backgroundColor="#ffffff"),this.options=h(n,t),this.init()}}return n.detectVisibilityChange=function(){"visible"===document.visibilityState?o("favoritos:visibilitychange","visible"):o("favoritos:visibilitychange","hidden")},n.detectThemeChange=function(t){var e=t.matches?"dark":"light";o("favoritos:themechange",e)},n.initListeners=function(){document.addEventListener("visibilitychange",n.detectVisibilityChange);try{a.addEventListener("change",n.detectThemeChange)}catch(t){a.addListener(n.detectThemeChange)}},n.prototype.initIconCanvas=function(){var t=this.options,e=t.icon,n=t.badge,i=n.minWidth,o=n.minHeight,a=e.width,s=e.height;this.badgeCanvasMinWidth=i,this.badgeCanvasMinHeight=o,this.iconCanvas=document.createElement("canvas"),this.iconCanvasWidth=a,this.iconCanvasHeight=s,this.iconCanvas.width=a,this.iconCanvas.height=s,this.iconCanvasContext=this.iconCanvas.getContext("2d"),this.iconCanvasContext.font=n.fontSize+"px "+n.fontFamily,this.iconCanvasContext.textAlign="center",this.iconCanvasContext.textBaseline="middle"},n.prototype.getContextBackgroundColor=function(t,e,n){var i,o,a,s=this.iconCanvasContext;if(Array.isArray(t)){var r=s.createLinearGradient(0,0,e,n);(a=1/(o=t).length,o.map((function(t,e){return[e*a,t]}))).map((function(t){r.addColorStop(t[0],t[1])})),i=r}else i=t;return i},n.prototype.init=function(){var t=this,e=this.options.icon;this.iconElement=document.querySelector(e.iconSelector),this.userIconHref=this.iconElement.href,d(this.userIconHref).then((function(e){t.userIconCache=e})),this.initIconCanvas(),n.initListeners()},n.prototype.destroy=function(){document.removeEventListener("visibilitychange",n.detectVisibilityChange.bind(n)),a.removeEventListener("change",n.detectThemeChange.bind(n)),document.removeEventListener("scroll",this.setScrollingProgressBar.bind(this))},n.prototype.setOptions=function(t){this.options=h(this.options,t)},n.prototype.setIcon=function(t){this.iconElement.href=t},n.prototype.isPrefersColorSchemeDark=function(){return a.matches},n.prototype.reset=function(){this.options=i,this.setIcon(this.userIconHref)},n.prototype.getBadgeXPosition=function(n){var i=this.options,o=i.badge.minWidth,a=i.badge.position,s=i.icon.width,r=i.badge.shape,c=s,h=this.badgeContent>=10,d=o>=n?o:n>=c?c:n;switch(a){case t.TOP_LEFT:case t.BOTTOM_LEFT:switch(r){case e.CIRCLE:return h?0:d/2;case e.RECT:return 0}break;case t.TOP_RIGHT:case t.BOTTOM_RIGHT:switch(r){case e.CIRCLE:return h?s-d:s-d/2;case e.RECT:return s-d}}},n.prototype.getBadgeYPosition=function(n){var i=this.options,o=i.badge.position,a=i.icon.height,s=i.badge.minHeight,r=i.badge.shape,c=this.badgeContent>=10,h=s>=n?s:n;switch(o){case t.TOP_LEFT:case t.TOP_RIGHT:switch(r){case e.CIRCLE:return c?0:h/2;case e.RECT:return 0}break;case t.BOTTOM_LEFT:case t.BOTTOM_RIGHT:switch(r){case e.CIRCLE:return c?a-h:a-h/2;case e.RECT:return a-h}}},n.prototype.getBadgeTextXPosition=function(e){var n=this.options,i=n.badge.position,o=n.icon.width,a=n.badge.minWidth,s=a>=e?a:e>=o?o:e;switch(i){case t.TOP_RIGHT:case t.BOTTOM_RIGHT:return Math.abs(o-s/2);case t.TOP_LEFT:case t.BOTTOM_LEFT:return Math.abs(s/2)}},n.prototype.getBadgeTextYPosition=function(e){var n=this.options,i=n.badge.position,o=n.icon.height,a=n.badge.minHeight,s="number"==typeof this.badgeContent?.085*e:0,r=a>=e?a:e;switch(i){case t.TOP_RIGHT:case t.TOP_LEFT:return Math.abs(r/2+s);case t.BOTTOM_RIGHT:case t.BOTTOM_LEFT:return Math.abs(o-r/2+s)}},n.prototype.drawBadge=function(t){var n=this;void 0===t&&(t=0),this.badgeContent=t;var i=function(i){var o=t,a=n.options.icon,s=n.options.badge,r=n.iconCanvasContext.measureText(String(o)).width,c=s.fontSize;n.iconCanvasContext.clearRect(0,0,a.width,a.height),n.iconCanvasContext.drawImage(i,0,0,a.width,a.height),n.iconCanvasContext.fillStyle=n.getContextBackgroundColor(s.backgroundColor,n.iconCanvasWidth,n.iconCanvasHeight),n.iconCanvasContext.beginPath(),s.shape===e.CIRCLE?n.drawCircleBadge(r,c,o):n.drawRectBadge(r,c),n.iconCanvasContext.fill(),n.iconCanvasContext.fillStyle=s.color,n.iconCanvasContext.fillText(String(o),n.getBadgeTextXPosition(r),n.getBadgeTextYPosition(c),a.width),n.iconCanvasContext.closePath(),n.iconElement.href=n.iconCanvas.toDataURL("image/png",1),document.body.append(n.iconCanvas)};this.userIconCache?i(this.userIconCache):d(this.userIconHref).then((function(t){n.userIconCache=t,i(t)}))},n.prototype.drawCircleBadge=function(t,e,n){var i,o,a,s,r,c,h,d,g,l,C,u=this.options,f=u.icon.width,v=u.badge.minWidth,p=u.badge.minHeight,T=v>=t?v:t>=f?f:t,m=p>=e?p:e;n>=10?(this.iconCanvasContext.strokeStyle=this.getContextBackgroundColor(u.badge.backgroundColor,this.iconCanvasWidth,this.iconCanvasHeight),i=this.iconCanvasContext,o=this.getBadgeXPosition(t),a=this.getBadgeYPosition(e),c=10,h=o,d=a,g=s=T,l=r=m,C=Math.min(Math.max(s-1,1),Math.max(r-1,1),c),i.lineJoin="round",i.lineWidth=C,i.strokeRect(h+C/2,d+C/2,g-C,l-C),i.fillRect(h+C/2,d+C/2,g-C,l-C),i.stroke(),i.fill()):this.iconCanvasContext.arc(this.getBadgeXPosition(t),this.getBadgeYPosition(e),T/2,0,2*Math.PI)},n.prototype.drawRectBadge=function(t,e){var n=this.options,i=n.icon.width,o=n.badge.minWidth,a=n.badge.minHeight,s=o>=t?o:t>=i?i:t,r=a>=e?a:e;this.iconCanvasContext.rect(this.getBadgeXPosition(t),this.getBadgeYPosition(e),s,r)},n.prototype.initScrollingProgressBar=function(){document.addEventListener("scroll",this.setScrollingProgressBar.bind(this))},n.prototype.setScrollingProgressBar=function(){var t=this.options.icon,n=document.documentElement.scrollTop/(document.documentElement.scrollHeight-document.documentElement.clientHeight)*100;o("favoritos:scrolled",n),this.iconCanvasContext.clearRect(0,0,t.width,t.height),this.iconCanvasContext.beginPath(),this.iconCanvasContext.lineWidth=t.lineWidth,t.shape===e.CIRCLE?this.drawCircleProgress(n,t):this.drawRectProgress(n),this.iconCanvasContext.strokeStyle=this.getContextBackgroundColor(t.backgroundColor,32,32),this.iconCanvasContext.stroke(),this.iconElement.href=this.iconCanvas.toDataURL("image/png",1),document.body.append(this.iconCanvas)},n.prototype.drawCircleProgress=function(t,e){this.iconCanvasContext.arc(e.width/2,e.height/2,e.width/2-e.lineWidth/2,1.5*Math.PI,2*t*Math.PI/100+1.5*Math.PI)},n.prototype.drawRectProgress=function(t){var e=this.iconCanvasContext;t<=25?(e.moveTo(0,0),e.lineTo(1.28*t,0)):t>25&&t<=50?(e.moveTo(0,0),e.lineTo(32,0),e.moveTo(32,0),e.lineTo(32,1.28*(t-25))):t>50&&t<=75?(e.moveTo(0,0),e.lineTo(32,0),e.moveTo(32,0),e.lineTo(32,32),e.moveTo(32,32),e.lineTo(-1.28*(t-75),32)):t>75&&t<=100&&(e.moveTo(0,0),e.lineTo(32,0),e.moveTo(32,0),e.lineTo(32,32),e.moveTo(32,32),e.lineTo(0,32),e.moveTo(0,32),e.lineTo(0,-1.28*(t-100)))},n}();export default g;
