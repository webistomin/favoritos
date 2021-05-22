var Favoritos=function(){"use strict";var e="top-left",t="top-right",n="bottom-left",i="bottom-right",o="circle",a="rectangle",s={icon:{iconSelector:'link[rel*="icon"]',backgroundColor:"#d21f3c",shape:o,lineWidth:4,width:32,height:32},badge:{fontSize:18,fontFamily:"Helvetica, Arial, sans-serif",backgroundColor:"#d21f3c",color:"#ffffff",position:i,shape:o,minWidth:22,minHeight:22},debug:{enabled:!1,debugSelector:"#favoritos-debug"}},r=Object.keys,c=function(e){return e&&"object"==typeof e&&!Array.isArray(e)&&!0},h=function e(t,n){var i=r(n);if(c(t)&&c(n))for(var o=0;o<i.length;o++){var a=i[o];if(c(n[a])){var s;if(!t[a])Object.assign(t,((s={})[a]={},s));e(t[a],n[a])}else{var h;Object.assign(t,((h={})[a]=n[a],h))}}return t},g=function(e,t){var n=new Image;n.crossOrigin="anonymous",n.addEventListener("load",(function(){return t(n)}),{once:!0}),n.addEventListener("error",(function(){return t(n)}),{once:!0}),n.src=e};return function(){function r(e){void 0===e&&(e={}),this.userIconCache=null,this.debugElement=null,this.arcDegrees={0:0,90:.5*Math.PI,180:Math.PI,270:1.5*Math.PI,360:2*Math.PI},"undefined"==typeof window?console.warn("Favoritos was not initialised! Probably it is used in SSR."):(this.options=h(s,e),this.init())}var c=r.prototype;return c.init=function(){var e=this,t=this.options,n=t.icon,i=t.debug,o=i.enabled,a=i.debugSelector;this.iconElement=document.querySelector(n.iconSelector),this.iconElement?(this.userIconHref=this.iconElement.href,g(this.userIconHref,(function(t){e.userIconCache=t}))):console.warn('Favoritos: favicon element wasn\'t found \n Please, add <link rel="shortcut icon" href="..."> to head section'),o&&(this.debugElement=document.querySelector(a),this.debugElement||console.warn("Favoritos: debugger was enabled but debug element wasn't found")),this.initIconCanvas()},c.initIconCanvas=function(){var e=this.options,t=e.icon,n=e.badge,i=t.width,o=t.height,a=window.devicePixelRatio||1;this.iconCanvas=document.createElement("canvas"),this.iconCanvas.width=i*a,this.iconCanvas.height=o*a,this.iconCanvasContext=this.iconCanvas.getContext("2d"),this.iconCanvasContext.font=n.fontSize+"px "+n.fontFamily,this.iconCanvasContext.textAlign="center",this.iconCanvasContext.textBaseline="middle",this.iconCanvasContext.scale(a,a)},c.getContextBackgroundColor=function(e,t,n){var i,o,a,s=this.iconCanvasContext;if(Array.isArray(e)){var r=s.createLinearGradient(0,0,t,n);(a=1/((o=e).length-1),o.map((function(e,t){return[t*a,e]}))).map((function(e){r.addColorStop(e[0],e[1])})),i=r}else i=e;return i},c.setOptions=function(e){this.options=h(this.options,e)},c.setIcon=function(e){this.iconElement.href=e,this.userIconCache=null},c.reset=function(){var e=this.iconCanvasContext,t=this.options.icon,n=t.width,i=t.height;this.options=s,this.setIcon(this.userIconHref),e.clearRect(0,0,n,i),this.setDebugger(),delete this.badgeContent},c.drawImage=function(e){var t=this.iconCanvasContext,n=this.options.icon,i=n.width,o=n.height;"crossOrigin"in e&&(e.crossOrigin="anonymous"),t.drawImage(e,0,0,i,o),this.iconElement.href=this.iconCanvas.toDataURL("image/webp",1),this.setDebugger()},c.drawBadge=function(e){var t=this;void 0===e&&(e="");var n=function(n){t.badgeContent=e;var i=e,a=t.iconCanvasContext,s=t.options.icon,r=t.options.badge,c=r.fontSize,h=r.backgroundColor,g=r.shape,d=r.color,u=s.width,l=s.height,f=t.iconCanvasContext.measureText(String(i)).width,v=c;a.clearRect(0,0,u,l),a.drawImage(n,0,0,u,l),a.fillStyle=t.getContextBackgroundColor(h,u,l),a.beginPath(),g===o?t.drawCircleBadge(f,v,i):t.drawRectBadge(f,v),a.fill(),a.fillStyle=d,a.fillText(String(i),t.getBadgeTextXPosition(f),t.getBadgeTextYPosition(v),u),a.closePath(),t.iconElement.href=t.iconCanvas.toDataURL("image/webp",1),t.setDebugger()};this.userIconCache?n(this.userIconCache):g(this.userIconHref,(function(e){t.userIconCache=e,n(e)}))},c.drawProgressBar=function(e,t){var n=this;void 0===t&&(t=!1);var i=this.userIconCache,a=function(t){var i=n.iconCanvasContext,a=n.options.icon,s=a.width,r=a.height,c=a.backgroundColor,h=a.lineWidth;i.clearRect(0,0,s,r),t&&i.drawImage(t,0,0,s,r),i.beginPath(),i.lineWidth=h,a.shape===o?n.drawCircleProgressBar(e):n.drawRectProgressBar(e),i.strokeStyle=n.getContextBackgroundColor(c,s,r),i.stroke(),n.iconElement.href=n.iconCanvas.toDataURL("image/webp",1),n.setDebugger()};t?i?a(i):g(this.userIconHref,(function(e){n.userIconCache=e})):a()},c.getBadgeXPosition=function(s){var r=this.options,c=r.badge,h=c.minWidth,g=c.position,d=r.icon.width,u=r.badge.shape,l=d,f=this.badgeContent,v="number"==typeof f?f>=10:f.length>=1,C=h>=s?h:s>=l?l:s;switch(g){case e:case n:switch(u){case o:return v?0:C/2;case a:return 0}break;case t:case i:switch(u){case o:return v?d-C:d-C/2;case a:return d-C}}},c.getBadgeYPosition=function(s){var r=this.options,c=this.badgeContent,h=r.badge,g=h.position,d=h.minHeight,u=h.shape,l=r.icon.height,f="number"==typeof c?c>=10:c.length>=1,v=d>=s?d:s;switch(g){case e:case t:switch(u){case o:return f?0:v/2;case a:return 0}break;case n:case i:switch(u){case o:return f?l-v:l-v/2;case a:return l-v}}},c.getBadgeTextXPosition=function(o){var a=this.options,s=a.badge,r=s.position,c=s.minWidth,h=a.icon.width,g=c>=o?c:o>=h?h:o;switch(r){case t:case i:return Math.abs(h-g/2);case e:case n:return Math.abs(g/2)}},c.getBadgeTextYPosition=function(o){var a=this.options,s=a.badge,r=s.position,c=s.minHeight,h=a.icon.height,g="number"==typeof this.badgeContent?.085*o:0,d=c>=o?c:o;switch(r){case t:case e:return Math.abs(d/2+g);case i:case n:return Math.abs(h-d/2+g)}},c.drawCircleBadge=function(e,t,n){var i=this.options,o=i.icon,a=o.width,s=o.height,r=i.badge,c=r.minWidth,h=r.minHeight,g=r.backgroundColor,d=a,u=this.iconCanvasContext,l=c>=e?c:e>=d?d:e,f=h>=t?h:t;("number"==typeof n?n>=10:n.length>=1)?(u.strokeStyle=this.getContextBackgroundColor(g,a,s),function(e,t,n,i,o,a){var s=t,r=n,c=i,h=o,g=Math.min(Math.max(i-1,1),Math.max(o-1,1),a);e.lineJoin="round",e.lineWidth=g,e.strokeRect(s+g/2,r+g/2,c-g,h-g),e.fillRect(s+g/2,r+g/2,c-g,h-g),e.stroke(),e.fill()}(u,this.getBadgeXPosition(e),this.getBadgeYPosition(t),l,f,10)):u.arc(this.getBadgeXPosition(e),this.getBadgeYPosition(t),l/2,this.arcDegrees[0],this.arcDegrees[360])},c.drawRectBadge=function(e,t){var n=this.options,i=n.icon.width,o=n.badge,a=o.minWidth,s=o.minHeight,r=a>=e?a:e>=i?i:e,c=s>=t?s:t;this.iconCanvasContext.rect(this.getBadgeXPosition(e),this.getBadgeYPosition(t),r,c)},c.drawCircleProgressBar=function(e){var t=this.options,n=this.iconCanvasContext,i=t.icon,o=i.width,a=i.height,s=i.lineWidth;n.arc(o/2,a/2,o/2-s/2,this.arcDegrees[270],e*this.arcDegrees[360]/100+this.arcDegrees[270])},c.drawRectProgressBar=function(e){var t=this.options,n=this.iconCanvasContext,i=t.icon,o=i.width,a=i.height;e<=25?(n.moveTo(0,0),n.lineTo(o/25*e,0)):e>25&&e<=50?(n.moveTo(0,0),n.lineTo(o,0),n.moveTo(o,0),n.lineTo(o,a/25*(e-25))):e>50&&e<=75?(n.moveTo(0,0),n.lineTo(o,0),n.moveTo(o,0),n.lineTo(o,a),n.moveTo(o,a),n.lineTo(-o/25*(e-75),a)):e>75&&e<=100&&(n.moveTo(0,0),n.lineTo(o,0),n.moveTo(o,0),n.lineTo(o,a),n.moveTo(o,a),n.lineTo(0,a),n.moveTo(0,a),n.lineTo(0,-a/25*(e-100)))},c.setDebugger=function(){this.options.debug.enabled&&this.debugElement&&this.debugElement.appendChild(this.iconCanvas)},r}()}();