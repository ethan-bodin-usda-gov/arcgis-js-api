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

define(["require","exports","../../../../../../core/tsSupport/extendsHelper","../../../../../../core/Logger","../../../../../../core/mathUtils","../../../../../../core/screenUtils","../../../../../../core/libs/earcut/earcut","../../color","../../definitions","../../enums","../../number","../../TileClipper","../../WGLDisplayRecord","../../materialKey/MaterialKey","../Tesselator","./WGLMeshTemplate"],(function(e,t,r,i,o,s,n,a,l,h,p,u,f,d,g,v){Object.defineProperty(t,"__esModule",{value:!0});var c=i.getLogger("esri.views.2d.engine.webgl.mesh.templates.WGLFillTemplate"),y=[],x=[];var w=function(e){function t(t,r,i,o,s,n,a,p,f){var v=e.call(this)||this;v.fillColor=i,v.tl=o,v.br=s,v.aux1=n,v.aux2=a,v.aux3=p,v.isBFS=f,v.geometryType=h.WGLGeometryType.FILL,v.forceLibtess=!1;var c=d.FillMaterialKey.load(d.createMaterialKey(v.geometryType,t,!1));return r&&(c.sdf=r.sdf,c.pattern=!0,c.textureBinding=r.textureBinding),v._materialKey=c.data,v._tesselator=new g.default,v._tileClipper=new u.TileClipper(0,0,0,1,8),v._tileClipper.setExtent(l.TILE_SIZE),v}return r(t,e),t.fromCIMFill=function(e,r,i,n){void 0===n&&(n=!1);var l=r.color,h=l&&a.premultiplyAlphaRGBA(l)||0,u=p.i8888to32(0,0,0,r.colorLocked?1:0);if(!i)return new t(e,null,h,0,0,0,0,u,n);var f=i.rect,d=i.width,g=i.height,v=f.x+1,c=f.y+1,y=v+d,x=c+g,w=o.nextHighestPowerOfTwo(s.pt2px(r.height||0));w>255?w=255:w<=0&&(w=o.nextHighestPowerOfTwo(x-c));var _=o.nextHighestPowerOfTwo(s.pt2px(r.height/g*d||0));_>255?_=255:_<=0&&(_=o.nextHighestPowerOfTwo(y-v));var m=s.pt2px(r.offsetX||0)+128;m>255&&(m=255);var T=s.pt2px(-r.offsetY||0)+128;T>255&&(T=255);var C=r.scaleX||1;return new t(e,i,h,p.i1616to32(v,c),p.i1616to32(y,x),p.i8888to32(_,w,m,T),p.i1616to32(128*C,128),0,n)},t.fromSimpleFill=function(e,r,i,s){void 0===s&&(s=!1);var n=r.color,l=n&&"none"!==r.style&&a.premultiplyAlphaRGBA(n)||0,h=p.i8888to32(0,0,0,s?255:0);if(!i)return new t(e,null,l,0,0,0,0,h,s);var u=i.rect,f=i.width,d=i.height,g=u.x+1,v=u.y+1,c=u.x+1+f,y=u.y+1+d;return new t(e,i,l,p.i1616to32(g,v),p.i1616to32(c,y),p.i8888to32(o.nextHighestPowerOfTwo(c-g),o.nextHighestPowerOfTwo(y-v),0,0),p.i1616to32(128,128),h,s)},t.fromPictureFill=function(e,r,i,n){void 0===n&&(n=!1);var a=l.PICTURE_FILL_COLOR,h=i.rect,u=i.width,f=i.height,d=h.x+1,g=h.y+1,v=d+u,c=g+f,y=p.i1616to32(d,g),x=p.i1616to32(v,c),w=o.nextHighestPowerOfTwo(s.pt2px(r.width));w>255&&(w=255);var _=o.nextHighestPowerOfTwo(s.pt2px(r.height));_>255&&(_=255);var m=s.pt2px(r.xoffset)+128;m>255&&(m=255);var T=s.pt2px(-r.yoffset)+128;return T>255&&(T=255),new t(e,i,a,y,x,p.i8888to32(w,_,m,T),p.i1616to32(128*r.xscale,128*r.yscale),p.i8888to32(0,0,0,n?255:0),n)},t.prototype.writeMesh=function(e,t,r,i,o){if(y.length=0,"esriGeometryPolygon"===r){var s=o.geometry,n=d.FillMaterialKey.load(this._materialKey),a=this._isClippingRequired(s),l=a?this._clip(s,!1):s.rings,h=n.dotDensity?function(e){for(var t=0,r=0;r<e.length;r++)for(var i=e[r],o=i[0],s=o[0],n=o[1],a=1;a<i.length;a++){var l=i[a],h=s+l[0],p=n+l[1];t-=(h-s)*(p+n)/2,s=h,n=p}return t}(s.rings):0;this.forceLibtess?this._writeMeshLibtess(e,t,i,l,a,n,h):this._writeMeshEarcut(e,t,i,l,a,n,h)||this._writeMeshLibtess(e,t,i,l,a,n,h)}else"esriGeometryPolyline"!==r&&c.error("Unable to handle geometryType: "+r)},t.prototype._isClippingRequired=function(e){for(var t=l.TILE_SIZE+8,r=0,i=e.rings;r<i.length;r++){var o=i[r],s=o.length;if(!(s<3)){var n=o[0][0],a=o[0][1];if(n<-8||n>t||a<-8||a>t)return!0;for(var h=1;h<s;++h)if(n+=o[h][0],a+=o[h][1],n<-8||n>t||a<-8||a>t)return!0}}return!1},t.prototype._clip=function(e,t){var r,i;this._tileClipper.reset(3);for(var o=0,s=e.rings;o<s.length;o++){var n=s[o],a=n.length;if(!(a<3)){r=n[0][0],i=n[0][1],this._tileClipper.moveTo(r,i);for(var l=1;l<a;++l)r+=n[l][0],i+=n[l][1],this._tileClipper.lineTo(r,i);this._tileClipper.close()}}return this._tileClipper.result(t)},t.prototype._writeMeshLibtess=function(e,t,r,i,o,s,n){if(i&&i.length){var a=[],l=t.indexVector,h=t.getVector("geometry"),p=new f(r,this.geometryType,this._materialKey),u=h.vertexCount;p.vertexFrom=u,p.indexFrom=l.length,this._tesselator.beginPolygon(y,a);for(var d=0,g=i;d<g.length;d++){var v=g[d];if(!(v.length<3)){this._tesselator.beginContour();var c=void 0,x=void 0;o?(c=v[0].x,x=v[0].y):(c=v[0][0],x=v[0][1]);var w=[c,x,0];this._tesselator.addVertex(w,w);for(var _=1;_<v.length-1;_++){o?(c=v[_].x,x=v[_].y):(c+=v[_][0],x+=v[_][1]);var m=[c,x,0];this._tesselator.addVertex(m,m)}this._tesselator.endContour()}}this._tesselator.endPolygon(),this._writeVerticesLibTess(p,h,r,y,s,n),this._writeIndicesLibTess(p,l,u,a),p.indexCount>0&&e.push(p)}},t.prototype._writeMeshEarcut=function(e,t,r,i,o,s,n){if(i&&i.length){var a=t.indexVector,l=t.getVector("geometry"),h=new f(r,this.geometryType,this._materialKey),p=l.vertexCount,u=a.length,d=l.data.length;h.vertexFrom=p,h.indexFrom=a.length;for(var g=0,v=0,c=0,w=i;c<w.length;c++){var _=w[c],m=v,T=void 0,C=void 0;o?(T=_[0].x,C=_[0].y):(T=_[0][0],C=_[0][1]),y[v++]=T,y[v++]=C;for(var L=0,b=1;b<_.length;++b){var F=void 0,P=void 0;if(o){var M=T,I=C;F=(T=_[b].x)-M,P=(C=_[b].y)-I}else T+=F=_[b][0],C+=P=_[b][1];L-=F*(C+C-P),y[v++]=T,y[v++]=C}if(L>0){if(m-g>0){if(!this._write(h,a,l,r,y,x,g,m,s,n))return a.seek(u),l.data.seek(d),y.length=x.length=0,!1;g=m}x.length=0}else L<0&&m-g>0?x.push(.5*(m-g)):v=m}return v-g>0&&!this._write(h,a,l,r,y,x,g,v,s,n)?(a.seek(u),l.data.seek(d),y.length=x.length=0,!1):(y.length=x.length=0,e.push(h),!0)}},t.prototype._write=function(e,t,r,i,o,s,a,l,h,p){var u=o.slice(a,l),f=n.earcut(u,s,2);if(n.deviation(u,s,2,f)>0)return!1;if(f.length){var d=r.vertexCount;return this._writeVertices(e,r,i,u,h,p),this._writeIndices(e,t,d,f),!0}},t.prototype._writeVertices=function(e,t,r,i,o,s){for(var n=0;n<i.length;n+=2){var a=p.i1616to32(i[n],i[n+1]);t.data.push(a),t.data.push(r),o.dotDensity?t.data.writeF32(1/s):(t.data.push(this.fillColor),t.data.push(this.tl),t.data.push(this.br),t.data.push(this.aux1),t.data.push(this.aux2),t.data.push(this.aux3)),e.vertexCount++}},t.prototype._writeIndices=function(e,t,r,i){for(var o=r,s=0;s<i.length;s+=3)t.push(o+i[s]),t.push(o+i[s+1]),t.push(o+i[s+2]),e.indexCount+=3},t.prototype._writeVerticesLibTess=function(e,t,r,i,o,s){for(var n=0;n<i.length;n+=2){var a=p.i1616to32(i[n],i[n+1]);t.data.push(a),t.data.push(r),o.dotDensity?t.data.writeF32(1/s):(t.data.push(this.fillColor),t.data.push(this.tl),t.data.push(this.br),t.data.push(this.aux1),t.data.push(this.aux2),t.data.push(this.aux3)),e.vertexCount++}},t.prototype._writeIndicesLibTess=function(e,t,r,i){for(var o=r,s=0;s<i.length;s++)t.push(o+i[s]),e.indexCount++},t}(v.default);t.default=w}));