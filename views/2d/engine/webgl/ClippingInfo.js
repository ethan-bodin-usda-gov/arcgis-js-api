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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/Error","../../../../core/Logger","../../../../core/maybe","../DisplayObject","./Mesh2D","../../../webgl/VertexArrayObject"],(function(e,t,r,i,o,a,s,c,n){Object.defineProperty(t,"__esModule",{value:!0});var h=o.getLogger("esri.views.2d.engine.webgl.ClippingInfo"),p=function(e){return parseFloat(e)/100},f=function(e){function t(t,r){var i=e.call(this)||this;return i._cache={},i.parent=t,i._handle=r.watch("version",(function(){return i._invalidate()})),i._clip=r,i.attach(),i.attached=!0,i}return r(t,e),t.fromClipArea=function(e,r){return new t(e,r)},t.prototype._destroyGL=function(){a.isSome(this._cache.mesh)&&(this._cache.mesh.destroy(),this._cache.mesh=null),a.isSome(this._cache.vao)&&(this._cache.vao.dispose(),this._cache.vao=null)},t.prototype.destroy=function(){this._destroyGL(),this._handle.remove()},t.prototype.doRender=function(){},t.prototype.getVAO=function(e,t,r,i){var o=t.size,s=o[0],c=o[1];if("geometry"!==this._clip.type&&this._lastWidth===s&&this._lastHeight===c||(this._lastWidth=s,this._lastHeight=c,this._destroyGL()),a.isNone(this._cache.vao)){var h=this._createMesh(t,this._clip),p=h.getIndexBuffer(e),f=h.getVertexBuffers(e);this._cache.mesh=h,this._cache.vao=new n(e,r,i,f,p)}return this._cache.vao},t.prototype._invalidate=function(){this._destroyGL(),this.requestRender()},t.prototype._createScreenRect=function(e,t){var r=e.size,i=r[0],o=r[1],a="string"==typeof t.left?p(t.left)*i:t.left,s="string"==typeof t.right?p(t.right)*i:t.right,c="string"==typeof t.top?p(t.top)*o:t.top,n="string"==typeof t.bottom?p(t.bottom)*o:t.bottom,h=a,f=c;return{x:h,y:f,width:Math.max(i-s-h,0),height:Math.max(o-n-f,0)}},t.prototype._createMesh=function(e,t){switch(t.type){case"rect":return c.default.fromRect(this._createScreenRect(e,t));case"path":return c.default.fromPath(t);case"geometry":return c.default.fromGeometry(e,t);default:return h.error(new i("mapview-bad-type","Unable to create ClippingInfo mesh from clip of type: ${clip.type}")),c.default.fromRect({x:0,y:0,width:1,height:1})}},t}(s.DisplayObject);t.default=f}));