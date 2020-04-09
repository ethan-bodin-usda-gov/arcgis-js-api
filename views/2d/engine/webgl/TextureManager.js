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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/tsSupport/generatorHelper","../../../../config","../../../../request","../../../../core/Error","../../../../core/Logger","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec2f32","../../../../symbols/cim/Rasterizer","./definitions","./enums","./fontUtils","./GlyphMosaic","./GlyphSource","./SDFConverter","./SpriteMosaic","./animatedFormats/apng","./animatedFormats/gif","./util/BidiText","./util/Result","./util/symbolUtils"],(function(e,t,r,i,s,n,a,o,u,c,l,d,h,p,f,g,m,y,_,v,S,b,w,M,T,I,x){var G=p.vec2f32.create(),z=u.getLogger("esri.views.2d.engine.webgl.TextureManager");function U(e){switch(e.type){case"esriSMS":case"esriPMS":case"CIMPointSymbol":case"CIMVectorMarker":case"CIMPictureMarker":case"CIMCharacterMarker":return!1;default:return!0}}function L(e){return i(this,void 0,void 0,(function(){var t,r;return s(this,(function(i){switch(i.label){case 0:t=window.URL.createObjectURL(e),i.label=1;case 1:return i.trys.push([1,3,,4]),[4,a(t,{responseType:"image"})];case 2:return r=i.sent().data,window.URL.revokeObjectURL(t),[2,r];case 3:return i.sent(),window.URL.revokeObjectURL(t),[2,new o("mapview-invalid-resource","Could not fetch requested resource at "+t)];case 4:return[2]}}))}))}function C(e,t){return i(this,void 0,void 0,(function(){var i,n,u,c,d,h,p,f,g;return s(this,(function(s){switch(s.label){case 0:if(i=e.imageData?"data:"+e.contentType+";base64,"+e.imageData:e.url,";base64,",-1===i.indexOf(";base64,"))return[3,1];for(u=i.indexOf(";base64,")+";base64,".length,c=i.substring(u),d=atob(c),h=new Uint8Array(d.length),p=0;p<d.length;p++)h[p]=d.charCodeAt(p);return n=h.buffer,[3,4];case 1:return s.trys.push([1,3,,4]),[4,a(i,r({responseType:"array-buffer"},t))];case 2:return f=s.sent().data,n=f,[3,4];case 3:return g=s.sent(),l.isAbortError(g)?[3,4]:[2,new o("mapview-invalid-resource","Could not fetch requested resource at "+i)];case 4:return[2,n]}}))}))}var F=function(e,t,r){return z.error(new o(e,t,r))},P=function(){function e(e,t,r){this.mosaicType=e,this.page=t,this.sdf=r}return e.fromMosaic=function(t,r){return new e(t,r.page,r.sdf)},e}();return function(){function e(e){this._invalidFontsMap=new Map,this._sdfConverter=new S.default(126),this._bindingInfos=new Array,this._hashToBindingIndex=new Map,this._rasterizer=new f.default,this._spriteMosaic=new b(e,2048,2048,500),this._glyphSource=new v(n.fontsUrl+"/{fontstack}/{range}.pbf"),this._glyphMosaic=new _(1024,1024,this._glyphSource)}return e.prototype.dispose=function(){this._spriteMosaic.dispose(),this._glyphMosaic.dispose(),this._rasterizer.dispose(),this._spriteMosaic=null,this._glyphMosaic=null,this._rasterizer=null},Object.defineProperty(e.prototype,"sprites",{get:function(){return this._spriteMosaic},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"glyphs",{get:function(){return this._glyphMosaic},enumerable:!0,configurable:!0}),e.prototype.rasterizeItem=function(e,t,r){return i(this,void 0,void 0,(function(){var i,n,a=this;return s(this,(function(s){switch(s.label){case 0:if(c.isNone(e))return F("mapview-null-resource","Unable to rasterize null resource"),[2,null];switch(e.type){case"CIMTextSymbol":case"esriTS":return[3,1];case"esriSMS":case"esriPMS":case"esriSFS":case"esriPFS":case"esriSLS":return[3,3]}return[3,3];case 1:return[4,this._rasterizeText(e,t,r)];case 2:return(i=s.sent()).forEach((function(e){return a._setTextureBinding(m.MosaicType.GLYPH,e)})),[2,{glyphMosaicItems:i}];case 3:return(o=e).type&&-1!==o.type.toLowerCase().indexOf("3d")?(F("mapview-invalid-type","MapView does not support symbol type: "+e.type,e),[2,null]):[4,this._rasterizeSpriteSymbol(e,r)];case 4:return n=s.sent(),I.ok(n)&&n&&this._setTextureBinding(m.MosaicType.SPRITE,n),[2,{spriteMosaicItem:n}]}var o}))}))},e.prototype.bindTextures=function(e,t,r){if(0!==r.textureBinding){var i=this._bindingInfos[r.textureBinding-1],s=i.page;switch(i.mosaicType){case m.MosaicType.SPRITE:var n=this.sprites.getWidth(s),a=this.sprites.getHeight(s),o=h.vec2.set(G,n,a);return this._spriteMosaic.bind(e,9729,s,g.TEXTURE_BINDING_SPRITE_ATLAS),t.setUniform1i("u_texture",g.TEXTURE_BINDING_SPRITE_ATLAS),void t.setUniform2fv("u_mosaicSize",o);case m.MosaicType.GLYPH:n=this.glyphs.width,a=this.glyphs.height,o=h.vec2.set(G,n,a);return this._glyphMosaic.bind(e,9729,s,g.TEXTURE_BINDING_GLYPH_ATLAS),t.setUniform1i("u_texture",g.TEXTURE_BINDING_GLYPH_ATLAS),void t.setUniform2fv("u_mosaicSize",o);default:z.error("mapview-texture-manager","Cannot handle unknown type "+i.mosaicType)}}},e.prototype._hashMosaic=function(e,t){return 1|e<<1|(t.sdf?1:0)<<2|t.page<<3},e.prototype._setTextureBinding=function(e,t){var r=this._hashMosaic(e,t);if(!this._hashToBindingIndex.has(r)){var i=P.fromMosaic(e,t),s=this._bindingInfos.length+1;this._hashToBindingIndex.set(r,s),this._bindingInfos.push(i)}t.textureBinding=this._hashToBindingIndex.get(r)},e.prototype._rasterizeText=function(e,t,r){return i(this,void 0,void 0,(function(){var i,n,a;return s(this,(function(s){switch(s.label){case 0:i=y.getFullyQualifiedFontName(e.font),n=this._invalidFontsMap.has(i),a=t||function(e){for(var t=[],r=0;r<e.length;r++)t.push(e.charCodeAt(r));return t}(T.bidiText(e.text)[0]),s.label=1;case 1:return s.trys.push([1,3,,4]),[4,this._glyphMosaic.getGlyphItems(n?"arial-unicode-ms-regular":i,a,r)];case 2:return[2,s.sent()];case 3:return s.sent(),F("mapview-invalid-resource","Couldn't find font "+i+". Falling back to Arial Unicode MS Regular"),this._invalidFontsMap.set(i,!0),[2,this._glyphMosaic.getGlyphItems("arial-unicode-ms-regular",a,r)];case 4:return[2]}}))}))},e.prototype._rasterizeSpriteSymbol=function(e,t){return i(this,void 0,void 0,(function(){var r,i,n,a,u,c;return s(this,(function(s){return function(e){switch(e.type){case"CIMSolidStroke":case"CIMSolidFill":return!0;case"esriSFS":return"esriSFSSolid"===e.style||"esriSFSNull"===e.style;case"esriSLS":return"esriSLSSolid"===e.style||"esriSLSNull"===e.style;default:return!1}}(e)?[2,null]:(r=x.keyFromSymbol(e),this._spriteMosaic.has(r)?[2,this._spriteMosaic.getSpriteItem(r)]:function(e){return"esriSMS"===e.type&&e.path}(e)?[2,this._handleSVG(e,r,t)]:function(e){return e.url||e.imageData}(e)?[2,this._handleImage(e,r,t)]:(i=this._rasterizer.rasterizeJSONResource(e))?(n=i.size,a=i.image,u=i.sdf,c=i.simplePattern,[2,this._addItemToMosaic(r,n,{type:"static",data:a},U(e),u,c)]):[2,new o("TextureManager","unrecognized or null rasterized image")])}))}))},e.prototype._handleSVG=function(e,t,r){return i(this,void 0,void 0,(function(){var i,n;return s(this,(function(s){switch(s.label){case 0:return i=[126,126],[4,this._sdfConverter.draw(e.path,r)];case 1:return n=s.sent(),[2,this._addItemToMosaic(t,i,{type:"static",data:new Uint32Array(n.buffer)},!1,!0,!0)]}}))}))},e.prototype._handleGIFOrPNG=function(e,t,r){return i(this,void 0,void 0,(function(){var i,n,a,u,c,d,h,p,f,g;return s(this,(function(s){switch(s.label){case 0:return[4,C(e,r)];case 1:if(i=s.sent(),!I.ok(i))return[3,10];if(n=M.isGIF(i),a=w.isPNG(i),!n&&!a)return[2,new o("mapview-invalid-resource","Image data is neither GIF nor PNG!")];u=void 0,s.label=2;case 2:return s.trys.push([2,7,,8]),n&&M.isAnimatedGIF(i)?[4,M.default.create(i,r)]:[3,4];case 3:return u=s.sent(),[3,6];case 4:return a&&w.isAnimatedPNG(i)?[4,w.default.create(i,r)]:[3,6];case 5:u=s.sent(),s.label=6;case 6:return[3,8];case 7:return c=s.sent(),l.isAbortError(c)?[3,8]:[2,new o("mapview-invalid-resource","Could not fetch requested resource!")];case 8:return u&&I.ok(u)?[2,this._addItemToMosaic(t,[u.width,u.height],{type:"animated",data:u},U(e),!1,!1)]:[4,L(new Blob([i],{type:n?"image/gif":"image/png"}))];case 9:if((d=s.sent())&&d instanceof HTMLImageElement)return h=this._rasterizer.rasterizeImageResource(d,e.colorSubstitutions),p=h.size,f=h.sdf,g=h.image,[2,this._addItemToMosaic(t,p,{type:"static",data:g},U(e),f,!1)];s.label=10;case 10:return[2,new o("mapview-invalid-resource","Could not handle resource!")]}}))}))},e.prototype._handleImage=function(e,t,n){return i(this,void 0,void 0,(function(){var i,u,c,h,p,f,g;return s(this,(function(s){switch(s.label){case 0:if(function(e){return e.url&&-1!==e.url.indexOf(".gif")||e.contentType&&"image/gif"===e.contentType||e.imageData&&-1!==e.imageData.indexOf("data:image/gif")}(e)||function(e){return e.url&&-1!==e.url.indexOf(".png")||e.contentType&&"image/png"===e.contentType||e.imageData&&-1!==e.imageData.indexOf("data:image/png")}(e))return[2,this._handleGIFOrPNG(e,t,n)];i=e.imageData?"data:"+e.contentType+";base64,"+e.imageData:e.url,s.label=1;case 1:return s.trys.push([1,3,,4]),[4,a(i,r({responseType:"image"},n))];case 2:return u=s.sent().data,-1!==i.indexOf("data:image/svg+xml")&&(u.width=d.pt2px(e.width),u.height=d.pt2px(e.height)),c=this._rasterizer.rasterizeImageResource(u,e.colorSubstitutions),h=c.size,p=c.sdf,f=c.image,[2,this._addItemToMosaic(t,h,{type:"static",data:f},U(e),p,!1)];case 3:return g=s.sent(),l.isAbortError(g)?[3,4]:[2,new o("mapview-invalid-resource","Could not fetch requested resource at "+i)];case 4:return[2,void 0]}}))}))},e.prototype._addItemToMosaic=function(e,t,r,i,s,n){return this._spriteMosaic.addSpriteItem(e,t,r,i,s,n)},e}()}));