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

define(["require","exports","../../../../../../core/tsSupport/assignHelper","../../../../../../core/tsSupport/extendsHelper","../../../../../../core/tsSupport/decorateHelper","../../../../../../core/maybe","../../../../../../core/libs/gl-matrix-2/mat3f64","../../../../../../core/libs/gl-matrix-2/vec4f64","./shader/ComponentShader.glsl","../../../core/shaderLibrary/Slice.glsl","../../../core/shaderLibrary/attributes/VertexPosition.glsl","../../../core/shaderLibrary/output/OutputHighlight.glsl","../../../core/shaderLibrary/shading/PhysicallyBasedRenderingParameters.glsl","../../../core/shaderLibrary/util/DoublePrecision.glsl","../../../core/shaderTechnique/ReloadableShaderModule","../../../core/shaderTechnique/ShaderTechnique","../../../core/shaderTechnique/ShaderTechniqueConfiguration","../../../lib/StencilUtils","../../../../../webgl/Program","../../../../../webgl/renderState"],(function(e,r,t,o,a,i,n,s,l,u,d,p,c,m,h,x,T,O,f,b){Object.defineProperty(r,"__esModule",{value:!0}),r.TextureUnits={DIFFUSE:0,COMPONENT_COLOR:1,NORMAL:2,EMISSION:3,OCCLUSION:4,METALLIC_ROUGHNESS:5,OVERLAY0_COLOR:2,OVERLAY1_COLOR:3,OVERLAY0_NORMAL:4,OVERLAY1_NORMAL:5,SSAO:6,SHADOW_MAP:7};var g=function(t){function a(){return null!==t&&t.apply(this,arguments)||this}return o(a,t),a.prototype.bindPass=function(e,t){var o=this.program;d.VertexPosition.bindViewProjTransform(o,t.viewTransform),u.Slice.bindUniforms(this.program,this.configuration,t.slicePlane),0===t.identifier&&(o.setUniformMatrix3fv("uTransformNormal_ViewFromGlobal",t.transformNormal_ViewFromGlobal),1===t.subPass&&o.setUniform2fv("uCameraNearFar",t.cameraNearFar),0===t.subPass&&(t.ambientOcclusionEnabled&&t.ambientOcclusion.bind(o,r.TextureUnits.SSAO),t.shadowsEnabled&&t.shadowMap.bind(o,r.TextureUnits.SHADOW_MAP),t.lighting.setUniforms(this.program,t.integratedMesh))),1===t.identifier&&this.program.setUniform2fv("uCameraNearFar",t.cameraNearFar),2===t.identifier&&p.OutputHighlight.bindOutputHighlight(e,this.program,t)},a.prototype.bindDraw=function(e,r){if(d.VertexPosition.bindModelTransform(this.program,e),this.program.setUniformMatrix3fv("uTransformNormal_GlobalFromModel",e.transformNormal_GlobalFromModel),r.isIntegratedMesh){var t=r.overlayTexScale,o=r.overlayTexOffset;this.program.setUniform4fv("overlayTexOffset",[e.toMapSpace[0]*t[0]+o[0],e.toMapSpace[1]*t[1]+o[1],e.toMapSpace[0]*t[2]+o[2],e.toMapSpace[1]*t[3]+o[3]]),this.program.setUniform4fv("overlayTexScale",[e.toMapSpace[2]*t[0],e.toMapSpace[3]*t[1],e.toMapSpace[2]*t[2],e.toMapSpace[3]*t[3]])}},a.prototype.bindMaterial=function(e,t,o){var a=this.program;a.setUniform4fv("uBaseColor",t.baseColor),a.setUniform1f("uObjectOpacity",t.objectOpacity),a.setUniform1f("textureAlphaCutoff",t.alphaCutoff),1===t.componentParameters.type?t.componentParameters.texture.bind(a,{texName:"uComponentColorTex",invDimName:"uComponentColorTexInvDim",unit:r.TextureUnits.COMPONENT_COLOR}):(a.setUniform4fv("uExternalColor",t.componentParameters.externalColor),a.setUniform1i("uExternalColorMixMode",t.componentParameters.externalColorMixMode)),i.isSome(t.baseColorTexture)&&t.baseColorTexture.bind(e,a,"uBaseColorTexture",r.TextureUnits.DIFFUSE,"uBaseColorTextureSize"),0===this.configuration.output&&(c.PhysicallyBasedRenderingParameters.bindUniforms(this.program,t),i.isSome(t.metallicRoughnessTexture)&&t.metallicRoughnessTexture.bind(e,a,"texMetallicRoughness",r.TextureUnits.METALLIC_ROUGHNESS,"texMetallicRoughnessSize"),i.isSome(t.emissionTexture)&&t.emissionTexture.bind(e,a,"texEmission",r.TextureUnits.EMISSION,"texEmissionSize"),i.isSome(t.occlusionTexture)&&t.occlusionTexture.bind(e,a,"texOcclusion",r.TextureUnits.OCCLUSION,"texOcclusionSize"),i.isSome(t.normalTexture)&&t.normalTexture.bind(e,a,"normalTexture",r.TextureUnits.NORMAL,"normalTextureSize")),t.isIntegratedMesh&&(0===o.identifier&&0===o.subPass?(e.bindTexture(i.unwrap(t.overlayColorInner),r.TextureUnits.OVERLAY0_COLOR),e.bindTexture(i.unwrap(t.overlayColorOuter),r.TextureUnits.OVERLAY1_COLOR),e.bindTexture(i.unwrap(t.overlayNormalInner),r.TextureUnits.OVERLAY0_NORMAL),e.bindTexture(i.unwrap(t.overlayNormalOuter),r.TextureUnits.OVERLAY1_NORMAL),a.setUniform1i("ovInnerNormalTex",r.TextureUnits.OVERLAY0_NORMAL),a.setUniform1i("ovOuterNormalTex",r.TextureUnits.OVERLAY1_NORMAL)):2===o.identifier&&(e.bindTexture(i.unwrap(t.overlayHighlightInner),r.TextureUnits.OVERLAY0_COLOR),e.bindTexture(i.unwrap(t.overlayHighlightOuter),r.TextureUnits.OVERLAY1_COLOR)),a.setUniform1i("ovInnerColorTex",r.TextureUnits.OVERLAY0_COLOR),a.setUniform1i("ovOuterColorTex",r.TextureUnits.OVERLAY1_COLOR),a.setUniform1f("overlayOpacity",1))},a.prototype.initializeProgram=function(e){var r=a.shader.get(),t=this.configuration,o=r.build({output:t.output,normalType:0===t.integratedMeshMode?t.hasNormals?1:3:2,attributeColor:t.hasVertexColors,attributeTextureCoordinates:t.vertexTextureCoordinates,componentData:t.componentData,alphaDiscardMode:t.alphaDiscardMode,baseColorTexture:t.baseColorTexture,doubleSidedMode:t.doubleSidedMode,receiveAmbientOcclusion:t.receiveAmbientOcclusion,receiveShadows:t.receiveShadows,slicePlaneEnabled:t.slicePlaneEnabled,sliceHighlightDisabled:!1,sliceEnabledForVertexPrograms:!1,viewingMode:e.viewingMode,vertexDiscardMode:t.vertexDiscardMode,pbrMode:3===t.integratedMeshMode?4:t.usePBR?1:0,hasMetalnessAndRoughnessTexture:t.hasMetalnessAndRoughnessTexture,hasEmissionTexture:t.hasEmissionTexture,hasOcclusionTexture:t.hasOcclusionTexture,hasNormalTexture:t.hasNormalTexture,vertexTangets:!1,useOldSceneLightInterface:!1,supportsTextureAtlas:!0,doublePrecisionRequiresObfuscation:m.doublePrecisionRequiresObfuscation(e.rctx),overlayEnabled:2===t.integratedMeshMode||3===t.integratedMeshMode});return new f(e.rctx,o.generateSource("vertex"),o.generateSource("fragment"),r.attributeLocations)},a.prototype.initializePipeline=function(){var e=this.configuration,r=0!==e.integratedMeshMode;return b.makePipelineState({blending:0===e.output&&e.blendingEnabled?v:null,culling:S[e.cullFace],depthTest:{func:513},depthWrite:b.defaultDepthWriteParams,colorWrite:b.defaultColorWriteParams,stencilWrite:r||e.sceneHasOcludees?O.stencilWriteMaskOn:null,stencilTest:r?O.replaceBitWhenDepthTestPasses(1):e.sceneHasOcludees?O.stencilBaseAllZerosParams:null,polygonOffset:e.polygonOffsetEnabled?M:null})},a.shader=new h.ReloadableShaderModule(l,"./shader/ComponentShader.glsl",e),a}(x.ShaderTechnique);r.ComponentTechnique=g;var v=b.separateBlendingParams(770,1,771,771),M={factor:2,units:2},S=[];S[0]=null,S[2]={face:1029,mode:2305},S[1]={face:1028,mode:2305};var y=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.transformNormal_GlobalFromModel=n.mat3f64.create(),r.toMapSpace=s.vec4f64.create(),r}return o(r,e),r}(d.VertexPosition.ModelTransform);r.ComponentDrawParameters=y;var C=function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.output=0,r.hasVertexColors=!1,r.hasNormals=!1,r.vertexTextureCoordinates=0,r.componentData=0,r.slicePlaneEnabled=!1,r.cullFace=2,r.baseColorTexture=!1,r.receiveAmbientOcclusion=!0,r.receiveShadows=!0,r.vertexDiscardMode=0,r.doubleSidedMode=2,r.blendingEnabled=!0,r.alphaDiscardMode=1,r.integratedMeshMode=0,r.overlayEnabled=!1,r.polygonOffsetEnabled=!1,r.usePBR=!1,r.hasMetalnessAndRoughnessTexture=!1,r.hasEmissionTexture=!1,r.hasOcclusionTexture=!1,r.hasNormalTexture=!1,r.sceneHasOcludees=!1,r}return o(r,e),a([T.parameter({count:7})],r.prototype,"output",void 0),a([T.parameter()],r.prototype,"hasVertexColors",void 0),a([T.parameter()],r.prototype,"hasNormals",void 0),a([T.parameter({count:3})],r.prototype,"vertexTextureCoordinates",void 0),a([T.parameter({count:2})],r.prototype,"componentData",void 0),a([T.parameter()],r.prototype,"slicePlaneEnabled",void 0),a([T.parameter({count:3})],r.prototype,"cullFace",void 0),a([T.parameter()],r.prototype,"baseColorTexture",void 0),a([T.parameter()],r.prototype,"receiveAmbientOcclusion",void 0),a([T.parameter()],r.prototype,"receiveShadows",void 0),a([T.parameter({count:3})],r.prototype,"vertexDiscardMode",void 0),a([T.parameter({count:3})],r.prototype,"doubleSidedMode",void 0),a([T.parameter()],r.prototype,"blendingEnabled",void 0),a([T.parameter({count:4})],r.prototype,"alphaDiscardMode",void 0),a([T.parameter({count:4})],r.prototype,"integratedMeshMode",void 0),a([T.parameter()],r.prototype,"overlayEnabled",void 0),a([T.parameter()],r.prototype,"polygonOffsetEnabled",void 0),a([T.parameter()],r.prototype,"usePBR",void 0),a([T.parameter()],r.prototype,"hasMetalnessAndRoughnessTexture",void 0),a([T.parameter()],r.prototype,"hasEmissionTexture",void 0),a([T.parameter()],r.prototype,"hasOcclusionTexture",void 0),a([T.parameter()],r.prototype,"hasNormalTexture",void 0),a([T.parameter()],r.prototype,"sceneHasOcludees",void 0),r}(T.ShaderTechniqueConfiguration);r.ComponentTechniqueConfiguration=C}));