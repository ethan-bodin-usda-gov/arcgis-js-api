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

define(["require","exports","./RenderTargetHelper","./Util"],(function(e,t,r,i){var o=function(){function e(e,t){this._rctx=e,this._compositingHelper=t,this.dimensions={width:4,height:4},this._enabled=!1,this._background={type:"color",color:[0,0,0,1]};var i=this._rctx;this.renderTargetHelper=new r.RenderTargetHelper(i);var o=this.renderTargetHelper;this.mainColor=o.registerColorTarget({name:"mainColor"}),this.mainDepth=o.registerDepthTarget({name:"mainDepth"}),this.linearDepth=o.registerColorTarget({name:"linearDepth",samplingMode:9728}),this.normal=o.registerColorTarget({name:"normal"}),this.highlight=o.registerColorTarget({name:"highlight",dataType:32819}),this.hudVisibility=o.registerColorTarget({name:"hudVisibility",dataType:32819}),this.tmpColor=o.registerColorTarget({name:"tmpColor"}),this.tmpDepth=o.registerDepthTarget({name:"tmpDepth"})}return Object.defineProperty(e.prototype,"width",{get:function(){return this.dimensions.width},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.dimensions.height},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"enabled",{get:function(){return this._enabled},set:function(e){e?this.enable():this.disable()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"background",{get:function(){return this._background},set:function(e){this._background=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"framebuffer",{get:function(){return this.renderTargetHelper.getFramebuffer(this.dimensions,this.mainColor,this.mainDepth)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"colorTexture",{get:function(){return this.framebuffer.colorTexture},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"depthTexture",{get:function(){return this.framebuffer.depthStencilTexture},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"linearDepthTexture",{get:function(){return this.renderTargetHelper.getAllocatedColorTexture(this.linearDepth)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"normalTexture",{get:function(){return this.renderTargetHelper.getAllocatedColorTexture(this.normal)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"highlightTexture",{get:function(){return this.renderTargetHelper.getAllocatedColorTexture(this.highlight)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"hudVisibilityTexture",{get:function(){return this.getColorTexture(this.hudVisibility)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"tmpColorTexture",{get:function(){return this.getColorTexture(this.tmpColor)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"mainColorTexture",{get:function(){return this.getColorTexture(this.mainColor)},enumerable:!0,configurable:!0}),e.prototype.initializeFrame=function(e){i.assert(this.enabled);var t=this._rctx;this.dimensions.width=e.fullWidth,this.dimensions.height=e.fullHeight,this.bindTarget(this.mainColor,this.mainDepth),t.setClearStencil(0);var r=this._background.color;t.setClearColor(r[0]*r[3],r[1]*r[3],r[2]*r[3],r[3]),t.clearSafe(17664)},e.prototype.composite=function(){this._compositingHelper.composite(this.colorTexture,0)},e.prototype.renderAndComposite=function(e,t){this.renderToTargets(e,this.tmpColor,this.mainDepth,n),this._compositingHelper.composite(this.getColorTexture(this.tmpColor),t)},e.prototype.renderHUDVisibility=function(e){this.renderToTargets(e,this.hudVisibility,this.mainDepth,s)},e.prototype.compositeTransparentTerrainOntoHUDVisibility=function(){var e=this;this.renderToTargets((function(){e._compositingHelper.compositeSpecial(e.getColorTexture(e.tmpColor),2)}),this.hudVisibility,this.mainDepth)},e.prototype.compositeTransparentTerrainOntoMain=function(){this.bindFramebuffer(),this._compositingHelper.composite(this.getColorTexture(this.tmpColor),2)},e.prototype.compositeOccludedOntoMain=function(e){this.bindFramebuffer(),this._compositingHelper.composite(this.getColorTexture(this.tmpColor),2,e)},e.prototype.bindFramebuffer=function(){this._rctx.bindFramebuffer(this.framebuffer)},e.prototype.renderDepthDetached=function(e){e(this.bindTarget(this.mainColor)),this.bindTarget(this.mainColor,this.mainDepth)},e.prototype.disposeTarget=function(e){this.renderTargetHelper.disposeTargetResource(e)},e.prototype.enable=function(){this.enabled||(this._enabled=!0)},e.prototype.disable=function(){this.enabled&&(this._enabled=!1,this.renderTargetHelper.disposeAllResource())},e.prototype.renderToTargets=function(e,t,r,i,o,n){var s=this._rctx,a=this.bindTarget(t,r),h=0;if(i){var p=Math.max(1e-13,i[3]);s.setClearColor(i[0],i[1],i[2],p),h|=16384}return o&&(h|=256),n&&(h|=1024),s.clearSafe(h,!0===n?255:!1===n?0:n),e(a),s.gl.flush(),this.bindTarget(this.mainColor,this.mainDepth),a},e.prototype.bindTarget=function(e,t){var r=this.renderTargetHelper.getFramebuffer(this.dimensions,e,t);return this._rctx.bindFramebuffer(r),r},e.prototype.getColorTexture=function(e){return this.renderTargetHelper.getColorTexture(e,this.dimensions)},e.prototype.getGpuMemoryUsage=function(){var e=0;return this.renderTargetHelper&&(e+=this.renderTargetHelper.getGpuMemoryUsage()),e},e}(),n=[0,0,0,0],s=[0,1,0,1];return o}));