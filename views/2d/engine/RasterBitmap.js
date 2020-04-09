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

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/tsSupport/assignHelper","../../../core/libs/gl-matrix-2/mat3","../../../core/libs/gl-matrix-2/mat3f32","../../../core/libs/gl-matrix-2/vec2f32","../../../layers/support/rasterFunctions/pixelUtils","./DisplayObject","./webgl/WGLRasterUtils"],(function(t,e,r,s,i,o,a,n,u,l){Object.defineProperty(e,"__esModule",{value:!0});var h=[],p=new Set,m={bandCount:3,outMin:0,outMax:1,minCutOff:[0,0,0],maxCutOff:[255,255,255],factor:[1/255,1/255,1/255],useGamma:!1,gamma:[1,1,1],gammaCorrection:[1,1,1],colormap:null,colormapOffset:null,type:"stretch"};function c(t){return t.updateTexture()}function f(t){p.has(t)&&(h.splice(h.indexOf(t),1),p.delete(t))}var d=function(t){function e(e,r,s,i){void 0===e&&(e=null),void 0===r&&(r=null),void 0===s&&(s=null),void 0===i&&(i=function(){return null});var a=t.call(this)||this;return a.stencilRef=0,a.coordScale=[1,1],a._symbolizerParameters=null,a.height=null,a.pixelRatio=1,a.resolution=0,a.rotation=0,a._source=null,a.rawPixelBlock=null,a._suspended=!1,a._bandIds=null,a._interpolation=null,a._transformGrid=null,a.width=null,a.x=0,a.y=0,a.transforms={dvs:o.mat3f32.create()},a.source=e,a.transformGrid=r,a.interpolation=s,a.requestRender=i,a}return r(e,t),Object.defineProperty(e.prototype,"symbolizerParameters",{get:function(){return this._symbolizerParameters||m},set:function(t){this._symbolizerParameters=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"source",{get:function(){return this._source},set:function(t){this._source=t,this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTexture=null)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"suspended",{get:function(){return this._suspended},set:function(t){this._suspended&&!t&&this.attached&&(this.ready(),this.requestRender()),this._suspended=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"bandIds",{get:function(){return this._bandIds},set:function(t){this.attached&&this._updateRasterTexture(t),this._bandIds=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"interpolation",{get:function(){return this._interpolation},set:function(t){this._interpolation=t,this._rasterTexture&&this._rasterTexture.setSamplingMode("bilinear"===t?9729:9728)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"transformGrid",{get:function(){return this._transformGrid},set:function(t){this._transformGrid=t,this._transformGridTexture&&(this._transformGridTexture.dispose(),this._transformGridTexture=null)},enumerable:!0,configurable:!0}),e.prototype.attach=function(){return c(this),!0},e.prototype.detach=function(){this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTexture=null),this._transformGridTexture&&(this._transformGridTexture.dispose(),this._transformGridTexture=null),this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),f(this)},e.prototype.invalidateTexture=function(){this.attached?c(this):f(this)},e.prototype.setTransform=function(t){var e=i.mat3.identity(this.transforms.dvs),r=t.toScreenNoRotation([0,0],this.x,this.y),s=r[0],o=r[1],n=this.resolution/this.pixelRatio/t.resolution,u=n*this.width,l=n*this.height,h=Math.PI*this.rotation/180;i.mat3.translate(e,e,a.vec2f32.fromValues(s,o)),i.mat3.translate(e,e,a.vec2f32.fromValues(u/2,l/2)),i.mat3.rotate(e,e,-h),i.mat3.translate(e,e,a.vec2f32.fromValues(-u/2,-l/2)),i.mat3.scaleByVec2(e,e,a.vec2f32.fromValues(u,l)),i.mat3.multiply(this.transforms.dvs,t.displayViewMat3,e)},e.prototype.updateTexture=function(){var t=this.stage.context,e=this.source,r=e&&e.pixels&&e.pixels.length>0;!this._rasterTexture&&r&&this._updateRasterTexture(this.bandIds),this._rasterTexture&&r&&(this._updateColormapTexture(),this.transformGrid&&!this._transformGridTexture&&(this._transformGridTexture=l.createTransformTexture(t,this.transformGrid))),this._rasterTexture&&!r&&this._rasterTexture.setData(null),this.suspended||(this.ready(),this.requestRender())},e.prototype.getUniforms=function(){var t,e=this.source,r=this.transformGrid;switch(this.symbolizerParameters.type){case"lut":t=this._getColormapUniforms();break;case"stretch":t=this._getStretchUniforms()}var i=s({},t,{u_srcImageSize:[e.width,e.height],u_resampling:"nearest",u_flipY:!0,u_applyTransform:!!r,u_dvsMat3:this.transforms.dvs});return this.transformGrid&&(i.u_transformSpacing=r.spacing,i.u_transformGridSize=r.size,i.u_targetImageSize=new Float32Array([this.width,this.height])),i},e.prototype.getTextures=function(){if(!this._rasterTexture)return null;var t=[],e=[];return this._transformGridTexture&&(e.push(this._transformGridTexture),t.push("u_transformGrid")),this._rasterTexture&&(e.push(this._rasterTexture),t.push("u_image")),this._colormapTexture&&(e.push(this._colormapTexture),t.push("u_colormap")),{names:t,textures:e}},e.prototype._getColormapUniforms=function(){var t=this.symbolizerParameters,e=t.colormap;return{u_colormapOffset:t.colormapOffset||0,u_colormapMaxIndex:e.length/4-1,u_isFloatTexture:!1}},e.prototype._getStretchUniforms=function(){var t=this.symbolizerParameters,e={u_bandCount:t.bandCount,u_minOutput:t.outMin,u_maxOutput:t.outMax,u_minCutOff:t.minCutOff,u_maxCutOff:t.maxCutOff,u_factor:t.factor,u_useGamma:t.useGamma,u_gamma:t.gamma,u_gammaCorrection:t.gammaCorrection,u_contrast:t.contrast,u_brightness:t.brightness};return t.colormap&&(e.u_colormapOffset=t.colormapOffset||0,e.u_colormapMaxIndex=t.colormap.length/4-1,e.u_isFloatTexture=!1,e.u_applyColormap=!0),e},e.prototype._updateRasterTexture=function(t){var e=this.source?n.extractBands(this.source,t):null;if(e&&e.pixels&&e.pixels.length>0){var r=null==t&&null==this.bandIds||t&&this.bandIds&&t.join("")===this.bandIds.join("");if(this._rasterTexture){if(r)return;this._rasterTexture.dispose(),this._rasterTexture=null}var s=this.stage.context;this._rasterTexture=l.createRasterTexture(s,e,this.interpolation||"nearest")}else this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTexture=null)},e.prototype._updateColormapTexture=function(){var t=this._colormap,e=this.symbolizerParameters.colormap;if(!e)return this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),void(this._colormap=null);var r=this.stage.context;return t?e.length!==t.length||e.some((function(e,r){return e!==t[r]}))?(this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),this._colormapTexture=l.createColormapTexture(r,e),void(this._colormap=e)):void 0:(this._colormapTexture=l.createColormapTexture(r,e),void(this._colormap=e))},e}(u.DisplayObject);e.RasterBitmap=d}));