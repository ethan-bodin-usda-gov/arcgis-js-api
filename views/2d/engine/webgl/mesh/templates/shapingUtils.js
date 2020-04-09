// COPYRIGHT © 2020 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.15/esri/copyright.txt for details.

define(["require","exports","../../../../../../core/libs/gl-matrix-2/mat2d","../../../../../../core/libs/gl-matrix-2/mat2df32","../../../../../../core/libs/gl-matrix-2/vec2","../../../../../../core/libs/gl-matrix-2/vec2f32","../../..","../../alignmentUtils","../../number","../../collisions/BoundingBox"],(function(t,e,r,i,n,a,o,s,h,c){Object.defineProperty(e,"__esModule",{value:!0});var f=function(){function t(t,e,r,n){this._rotationT=i.mat2df32.create(),this._xBounds=0,this._yBounds=0,this.minZoom=0,this.maxZoom=255;var a=r.rect,o=new Float32Array(8);t*=n,e*=n;var s=r.code?a.width*n:r.metrics.width,h=r.code?a.height*n:r.metrics.height;o[0]=t,o[1]=e,o[2]=t+s,o[3]=e,o[4]=t,o[5]=e+h,o[6]=t+s,o[7]=e+h,this._data=o,this._setTextureCoords(a),this._scale=n,this._mosaic=r,this.x=t,this.y=e}return Object.defineProperty(t.prototype,"width",{get:function(){return this._mosaic.metrics.width*this._scale},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mosaic",{get:function(){return this._mosaic},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"angle",{get:function(){return this._angle},set:function(t){this._angle=t,r.mat2d.identity(this._rotationT),r.mat2d.rotate(this._rotationT,this._rotationT,-t),this._setOffsets(this._data)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"xTopLeft",{get:function(){return this._data[0]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"yTopLeft",{get:function(){return this._data[1]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"xBottomRight",{get:function(){return this._data[6]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"yBottomRight",{get:function(){return this._data[7]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"texcoords",{get:function(){return this._texcoords},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textureBinding",{get:function(){return this._mosaic.textureBinding},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"offsets",{get:function(){return this._offsets||this._setOffsets(this._data),this._offsets},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"char",{get:function(){return String.fromCharCode(this._mosaic.code)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"code",{get:function(){return this._mosaic.code},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"bounds",{get:function(){var t=this._mosaic.metrics,e=t.height,n=t.width*this._scale,a=Math.abs(e)*this._scale,o=new Float32Array(8);o[0]=this.x,o[1]=this.y,o[2]=this.x+n,o[3]=this.y,o[4]=this.x,o[5]=this.y+a,o[6]=this.x+n,o[7]=this.y+a;var s=r.mat2d.multiply(i.mat2df32.create(),this._rotationT,this._T);i.mat2df32.transformMany(o,o,s);for(var h=1/0,f=1/0,u=0,d=0,l=0;l<4;l++){var p=o[2*l],m=o[2*l+1];h=Math.min(h,p),f=Math.min(f,m),u=Math.max(u,p),d=Math.max(d,m)}var g=u-h,y=d-f,_=h+g/2,b=f+y/2;return new c.default(_,b,g,y)},enumerable:!0,configurable:!0}),t.prototype.setTransform=function(t){this._T=t,this._offsets=null},t.prototype._setOffsets=function(t){this._offsets||(this._offsets={upperLeft:0,upperRight:0,lowerLeft:0,lowerRight:0});var e=this._offsets,n=new Float32Array(8),a=r.mat2d.multiply(i.mat2df32.create(),this._rotationT,this._T);i.mat2df32.transformMany(n,t,a),e.upperLeft=h.i1616to32(8*n[0],8*n[1]),e.upperRight=h.i1616to32(8*n[2],8*n[3]),e.lowerLeft=h.i1616to32(8*n[4],8*n[5]),e.lowerRight=h.i1616to32(8*n[6],8*n[7])},t.prototype._setTextureCoords=function(t){var e=t.x,r=t.y,i=t.width,n=t.height;this._texcoords={upperLeft:h.i1616to32(e,r),upperRight:h.i1616to32(e+i,r),lowerLeft:h.i1616to32(e,r+n),lowerRight:h.i1616to32(e+i,r+n)}},t}();e.ShapedGlyph=f;var u=function(t,e){return{code:0,page:0,sdf:!0,rect:new o.Rect(0,0,11,8),textureBinding:e,metrics:{advance:0,height:4,width:t,left:0,top:0}}},d=function(){function t(t,e,r){this._decorate(t,e,r),this.glyphs=t,this.bounds=this._createBounds(t),this.isMultiline=e.length>1,this._hasRotation=0!==r.angle,this._T=this._createGlyphTransform(this.bounds,r);for(var i=0,n=t;i<n.length;i++){n[i].setTransform(this._T)}}return t.prototype._decorate=function(t,e,r){if("none"!==r.decoration&&t.length)for(var i=r.scale,n="underline"===r.decoration?30:20,a=t[0].textureBinding,o=0,s=e;o<s.length;o++){var h=s[o],c=h.startX*i,d=h.startY*i,l=(h.width+h.glyphWidthEnd)*i;t.push(new f(c,d+n*i,u(l,a),1))}},Object.defineProperty(t.prototype,"boundsT",{get:function(){var t=this.bounds,e=n.vec2.set(a.vec2f32.create(),t.x,t.y);if(n.vec2.transformMat2d(e,e,this._T),this._hasRotation){var r=Math.max(t.width,t.height);return new c.default(e[0],e[1],r,r)}return new c.default(e[0],e[1],t.width,t.height)},enumerable:!0,configurable:!0}),t.prototype._createBounds=function(t){for(var e=1/0,r=1/0,i=0,n=0,a=0,o=t;a<o.length;a++){var s=o[a];e=Math.min(e,s.xTopLeft),r=Math.min(r,s.yTopLeft),i=Math.max(i,s.xTopLeft+s.width),n=Math.max(n,s.yBottomRight)}var h=i-e,f=n-r,u=e+h/2,d=r+f/2;return new c.default(u,d,h,f)},t.prototype._createGlyphTransform=function(t,e){var o=e.angle*Math.PI/180,s=i.mat2df32.create(),h=a.vec2f32.create();return r.mat2d.translate(s,s,n.vec2.set(h,e.xOffset,-e.yOffset)),e.isCIM?r.mat2d.rotate(s,s,o):(r.mat2d.translate(s,s,n.vec2.set(h,t.x,t.y)),r.mat2d.rotate(s,s,o),r.mat2d.translate(s,s,n.vec2.set(h,-t.x,-t.y))),s},t}();e.ShapingInfo=d;var l=function(t,e,r,i,n,a){this.glyphWidthEnd=0,this.startX=0,this.startY=0,this.start=Math.max(0,Math.min(e,r)),this.end=Math.max(0,Math.max(e,r)),this.end<t.length&&(this.glyphWidthEnd=t[this.end].metrics.width),this.width=i,this.yMin=n,this.yMax=a},p=function(t){return 10===t},m=function(t){return 32===t};e.shapeGlyphs=function(t,e,r){for(var i=r.scale,n=new Array,a=function(t,e,r){for(var i=new Array,n=1/r.scale,a=r.maxLineWidth*n,o=e?t.length-1:0,s=e?-1:t.length,h=e?-1:1,c=o,f=0,u=0,d=c,g=d,y=0,_=1/0,b=0;c!==s;){var v=t[c],x=v.code,w=v.metrics,M=Math.abs(w.top);if(p(x)||m(x)||(_=Math.min(_,M),b=Math.max(b,M+w.height)),p(x))c!==o&&(i.push(new l(t,d,c-h,f,_,b)),_=1/0,b=0),f=0,d=c+h,g=c+h,u=0;else if(m(x))g=c+h,u=0,y=w.advance,f+=w.advance;else if(f>a){if(g!==d){var T=g-2*h;f-=y,i.push(new l(t,d,T,f-u,_,b)),_=1/0,b=0,d=g,f=u}else i.push(new l(t,d,c-h,f,_,b)),_=1/0,b=0,d=c,g=c,f=0;f+=w.advance,u+=w.advance}else f+=w.advance,u+=w.advance;c+=h}var O=new l(t,d,c-h,f,_,b);return O.start>=0&&O.end<t.length&&i.push(O),i}(t,e,r),o=function(t,e){for(var r=0,i=0;i<t.length;i++){var n=t[i].width;r=Math.max(n,r)}var a="underline"===e.decoration?4:0,o=t[0].yMin;return{x:0,y:o,height:t[t.length-1].yMax+e.lineHeight*(t.length-1)+a-o,width:r}}(a,r),h=r.vAlign,c=r.hAlign,u=h===s.VAlign.Baseline?1:0,g=u?0:h-1,y=(1-u)*-o.y+g*(o.height/2)+-26*(u?1:0),_=0;_<a.length;_++){var b=a[_],v=b.start,x=b.end,w=-1*(c+1)*(b.width/2)-3,M=_*r.lineHeight+y-3;a[_].startX=w,a[_].startY=M;for(var T=v;T<=x;T++){var O=t[T];if(!p(O.code)){var P=new f(w+O.metrics.left,M-O.metrics.top,O,i);w+=O.metrics.advance,n.push(P)}}}return new d(n,a,r)}}));