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

define(["require","exports","../../../../core/Evented","../../../../core/Logger","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/scheduling","./TextureTechnique","./Util","../../../webgl/Texture"],(function(e,t,r,n,a,i,u,o,s,l){Object.defineProperty(t,"__esModule",{value:!0});var f=n.getLogger("esri.views.3d.webgl-engine.lib.TextureRepository"),c=function(){function e(e,t,n){this.textures=e,this.rctx=n,this._loadingCount=0,this.frameUpdates=new Map,this._fallbackTexture=null,this._fallbackTextureTransparent=null,this._unloadDeferredHandle=null,this._texturesToUnload=[],this.events=new r,this.textureTechniqueConfig=new o.TextureTechniqueConfiguration,this.textureTechnique=t.acquireAndReleaseExisting(o.TextureTechnique,this.textureTechniqueConfig,this.textureTechnique),this.rctx=n,this.idToRefCountedTexture=new Map,this.initializeFallbackTextures()}return e.prototype.dispose=function(){a.isSome(this._unloadDeferredHandle)&&(this._unloadDeferredHandle.remove(),this._unloadDeferredHandle=null),this.textures.forEach((function(e){e.unload()}))},e.prototype.initializeFallbackTextures=function(){this.fallbackTextureData=new Uint8Array(256),this.fallbackTextureTransparentData=new Uint8Array(256);for(var e=0;e<this.fallbackTextureData.length;++e)this.fallbackTextureData[e]=255,this.fallbackTextureTransparentData[e]=(e+1)%4!=0?255:0;this.fallbackTextureDesc={target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,width:8,height:8,maxAnisotropy:this.rctx.parameters.maxMaxAnisotropy}},e.prototype.acquire=function(e,t,r){var n=this.getOrCreateRef(e,t,r);return n.ref(),n},e.prototype.update=function(){var e=this,t=!1;this.frameUpdates.forEach((function(r){var n=r.texture.frameUpdate(e.rctx,e.textureTechnique,r.previousToken);n>=0&&n!==r.previousToken&&(r.previousToken=n,t=!0)})),t&&this.events.emit("changed",{requestType:0})},e.prototype.getOrCreateRef=function(e,t,r){var n=this.idToRefCountedTexture.get(e);return n||this.createNewRef(e,t,r)},e.prototype.createNewRef=function(e,t,r){var n=this,a=this.textures.get(e);s.assert(void 0!==a);var u=a.events.on("unloaded",(function(){u.remove(),n._onTextureUnloaded(e)})),o=!0===t,l=new h;this.idToRefCountedTexture.set(e,l);var c=a.load(this.rctx,this.textureTechnique);this._loadingCount++;var d=function(t){return n._loadingCount--,n.updateGLTexture(l,t),r&&r(l),a.requiresFrameUpdates&&n.frameUpdates.set(e,{texture:a,previousToken:-1}),l};return i.isThenable(c)?(this.updateGLTexture(l,o?this.fallbackTextureTransparent:this.fallbackTexture),c.then(d,(function(e){n._loadingCount--,i.isAbortError(e)||f.error(e)}))):d(c),l},e.prototype.updateGLTexture=function(e,t){e.glTexture=t,this.events.emit("changed",{requestType:1})},e.prototype.release=function(e){var t=this,r=this.idToRefCountedTexture.get(e);r&&(r.unref(),r.isUnreferenced&&(this._texturesToUnload.push(e),a.isNone(this._unloadDeferredHandle)&&(this._unloadDeferredHandle=u.schedule((function(){return t.unloadDeferred()})))))},e.prototype.unloadDeferred=function(){var e=this._texturesToUnload;this._texturesToUnload.length=0;for(var t=0,r=e;t<r.length;t++){var n=r[t],a=this.textures.get(n),i=this.idToRefCountedTexture.get(n);a&&i&&i.isUnreferenced&&a.unload()}},e.prototype.getTexture=function(e){return this.textures.get(e)},Object.defineProperty(e.prototype,"loadingCount",{get:function(){return this._loadingCount},enumerable:!0,configurable:!0}),e.prototype._onTextureUnloaded=function(e){this.idToRefCountedTexture.delete(e),this.frameUpdates.delete(e)},Object.defineProperty(e.prototype,"fallbackTexture",{get:function(){return this._fallbackTexture||(this._fallbackTexture=new l(this.rctx,this.fallbackTextureDesc,this.fallbackTextureData)),this._fallbackTexture},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"fallbackTextureTransparent",{get:function(){return this._fallbackTextureTransparent||(this._fallbackTextureTransparent=new l(this.rctx,this.fallbackTextureDesc,this.fallbackTextureTransparentData)),this._fallbackTextureTransparent},enumerable:!0,configurable:!0}),e}();t.TextureRepository=c;var h=function(){function e(){this._refCount=0,this.glTexture=null}return Object.defineProperty(e.prototype,"isUnreferenced",{get:function(){return 0===this._refCount},enumerable:!0,configurable:!0}),e.prototype.ref=function(){++this._refCount},e.prototype.unref=function(){0!==this._refCount?--this._refCount:f.error("Cannot dereference texture that has no references!")},e}();t.RefCountedTexture=h}));