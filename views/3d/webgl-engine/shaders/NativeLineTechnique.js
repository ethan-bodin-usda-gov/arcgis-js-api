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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/maybe","../core/shaderLibrary/Slice.glsl","../core/shaderLibrary/Transform.glsl","../core/shaderLibrary/output/OutputHighlight.glsl","../core/shaderTechnique/ReloadableShaderModule","../core/shaderTechnique/ShaderTechnique","../core/shaderTechnique/ShaderTechniqueConfiguration","../lib/DefaultVertexAttributeLocations","../lib/StencilUtils","./NativeLine.glsl","../../../webgl/Program","../../../webgl/renderState"],(function(e,t,i,r,l,a,o,n,p,s,u,d,c,h,f,g,b){Object.defineProperty(t,"__esModule",{value:!0});var m=function(t){function r(e,i){var r=t.call(this,e,i)||this;return r.stipplePattern=null,r.stippleTextureBind=null,r.stippleTextureRepository=e.stippleTextureRepository,r}return i(r,t),r.prototype.initializeProgram=function(e){var t=r.shader.get(),i=this.configuration,l=t.build({output:i.output,attributeColor:i.vertexColors,slicePlaneEnabled:i.slicePlaneEnabled,sliceHighlightDisabled:i.sliceHighlightDisabled,sliceEnabledForVertexPrograms:!1,stippleEnabled:i.stippleEnabled,stippleOffColorEnabled:i.stippleOffColorEnabled,stippleUVMaxEnabled:!1,stippleIntegerRepeatsEnabled:i.stippleIntegerRepeatsEnabled});return new g(e.rctx,l.generateSource("vertex"),l.generateSource("fragment"),c.Default3D)},r.prototype.dispose=function(){t.prototype.dispose.call(this),this.stippleTextureRepository.release(this.stipplePattern),this.stipplePattern=null,this.stippleTextureBind=null},r.prototype.bindPass=function(e,t,i){if(this.stipplePattern!==t.stipplePattern){var r=t.stipplePattern;this.stippleTextureBind=this.stippleTextureRepository.swap(this.stipplePattern,r),this.stipplePattern=r}if(this.configuration.stippleEnabled){var l=a.isSome(this.stippleTextureBind)?this.stippleTextureBind(e,0)*i.pixelRatio:1;this.program.setUniform1i("stipplePatternTexture",0),this.program.setUniform1f("stipplePatternPixelSizeInv",1/l),this.program.setUniform2f("ndcToPixel",i.viewport[2]/2,i.viewport[3]/2)}if(0===this.configuration.output){if(this.program.setUniform4fv("constantColor",t.color),this.program.setUniform1f("alphaCoverage",Math.min(1,t.width*i.pixelRatio)),this.configuration.stippleOffColorEnabled){var o=a.expect(t.stippleOffColor);this.program.setUniform4f("stippleOffColor",o[0],o[1],o[2],o.length>3?o[3]:1)}}else p.OutputHighlight.bindOutputHighlight(e,this.program,i)},r.prototype.bindDraw=function(e){n.Transform.bindUniforms(this.program,e),o.Slice.bindUniformsWithOrigin(this.program,this.configuration,e)},r.prototype.initializePipeline=function(){var e=this.configuration,t=b.separateBlendingParams(770,1,771,771),i=function(t,i,r){return void 0===i&&(i=null),void 0===r&&(r=null),b.makePipelineState({blending:i,depthTest:h.depthCompareLess,depthWrite:r,colorWrite:b.defaultColorWriteParams,stencilWrite:e.sceneHasOcludees?h.stencilWriteMaskOn:null,stencilTest:e.sceneHasOcludees?t?h.stencilToolMaskBaseParams:h.stencilBaseAllZerosParams:null})};return 0===e.output?(this._occludeeState=i(!0,e.transparent||e.stippleEnabled?t:null,b.defaultDepthWriteParams),i(!1,e.transparent||e.stippleEnabled?t:null,b.defaultDepthWriteParams)):i(!1)},Object.defineProperty(r.prototype,"primitiveType",{get:function(){return 1},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"opaqueOccludeeState",{get:function(){return this._occludeeState},enumerable:!0,configurable:!0}),r.shader=new s.ReloadableShaderModule(f,"./NativeLine.glsl",e),r}(u.ShaderTechnique);t.NativeLineTechnique=m;var v=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.output=0,t.slicePlaneEnabled=!1,t.sliceHighlightDisabled=!1,t.vertexColors=!1,t.transparent=!1,t.stippleEnabled=!1,t.stippleOffColorEnabled=!1,t.stippleIntegerRepeatsEnabled=!1,t.sceneHasOcludees=!1,t}return i(t,e),r([d.parameter({count:7})],t.prototype,"output",void 0),r([d.parameter()],t.prototype,"slicePlaneEnabled",void 0),r([d.parameter()],t.prototype,"sliceHighlightDisabled",void 0),r([d.parameter()],t.prototype,"vertexColors",void 0),r([d.parameter()],t.prototype,"transparent",void 0),r([d.parameter()],t.prototype,"stippleEnabled",void 0),r([d.parameter()],t.prototype,"stippleOffColorEnabled",void 0),r([d.parameter()],t.prototype,"stippleIntegerRepeatsEnabled",void 0),r([d.parameter()],t.prototype,"sceneHasOcludees",void 0),t}(d.ShaderTechniqueConfiguration);t.NativeLineTechniqueConfiguration=v}));