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

define(["require","exports","../../../../../../core/tsSupport/makeTemplateObjectHelper","../../../../../../core/libs/gl-matrix-2/mat3f64","../../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../../core/libs/gl-matrix-2/vec3f64","./PositionAttribute.glsl","../util/DoublePrecision.glsl","../../shaderModules/interfaces"],(function(o,r,e,i,n,t,a,m,d){function l(o,r){o.include(a.PositionAttribute),o.include(m.DoublePrecision,r),o.varyings.add("vPositionWorldCameraRelative","vec3"),o.varyings.add("vPosition_view","vec3"),o.vertex.uniforms.add("uTransform_WorldFromModel_RS","mat3"),o.vertex.uniforms.add("uTransform_WorldFromModel_TH","vec3"),o.vertex.uniforms.add("uTransform_WorldFromModel_TL","vec3"),o.vertex.uniforms.add("uTransform_WorldFromView_TH","vec3"),o.vertex.uniforms.add("uTransform_WorldFromView_TL","vec3"),o.vertex.uniforms.add("uTransform_ViewFromCameraRelative_RS","mat3"),o.vertex.uniforms.add("uTransform_ProjFromView","mat4"),o.vertex.code.add(d.glsl(s||(s=e(["\n    // compute position in world space orientation, but relative to the camera position\n    vec3 positionWorldCameraRelative() {\n      vec3 rotatedModelPosition = uTransform_WorldFromModel_RS * positionModel();\n\n      vec3 transform_CameraRelativeFromModel = dpAdd(\n        uTransform_WorldFromModel_TL,\n        uTransform_WorldFromModel_TH,\n        -uTransform_WorldFromView_TL,\n        -uTransform_WorldFromView_TH\n      );\n\n      return transform_CameraRelativeFromModel + rotatedModelPosition;\n    }\n\n    // position in view space, that is relative to the camera position and orientation\n    vec3 position_view() {\n      return uTransform_ViewFromCameraRelative_RS * positionWorldCameraRelative();\n    }\n\n    // compute gl_Position and forward related varyings to fragment shader\n    void forwardPosition() {\n      vPositionWorldCameraRelative = positionWorldCameraRelative();\n      vPosition_view = position_view();\n      gl_Position = uTransform_ProjFromView * vec4(vPosition_view, 1.0);\n    }\n\n    vec3 positionWorld() {\n      return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;\n    }\n  "],["\n    // compute position in world space orientation, but relative to the camera position\n    vec3 positionWorldCameraRelative() {\n      vec3 rotatedModelPosition = uTransform_WorldFromModel_RS * positionModel();\n\n      vec3 transform_CameraRelativeFromModel = dpAdd(\n        uTransform_WorldFromModel_TL,\n        uTransform_WorldFromModel_TH,\n        -uTransform_WorldFromView_TL,\n        -uTransform_WorldFromView_TH\n      );\n\n      return transform_CameraRelativeFromModel + rotatedModelPosition;\n    }\n\n    // position in view space, that is relative to the camera position and orientation\n    vec3 position_view() {\n      return uTransform_ViewFromCameraRelative_RS * positionWorldCameraRelative();\n    }\n\n    // compute gl_Position and forward related varyings to fragment shader\n    void forwardPosition() {\n      vPositionWorldCameraRelative = positionWorldCameraRelative();\n      vPosition_view = position_view();\n      gl_Position = uTransform_ProjFromView * vec4(vPosition_view, 1.0);\n    }\n\n    vec3 positionWorld() {\n      return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;\n    }\n  "])))),o.fragment.uniforms.add("uTransform_WorldFromView_TL","vec3"),o.fragment.code.add(d.glsl(v||(v=e(["\n    vec3 positionWorld() {\n      return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;\n    }\n  "],["\n    vec3 positionWorld() {\n      return uTransform_WorldFromView_TL + vPositionWorldCameraRelative;\n    }\n  "]))))}var s,v;Object.defineProperty(r,"__esModule",{value:!0}),r.VertexPosition=l,function(o){var r=function(){this.worldFromModel_RS=i.mat3f64.create(),this.worldFromModel_TH=t.vec3f64.create(),this.worldFromModel_TL=t.vec3f64.create()};o.ModelTransform=r;var e=function(){this.worldFromView_TH=t.vec3f64.create(),this.worldFromView_TL=t.vec3f64.create(),this.viewFromCameraRelative_RS=i.mat3f64.create(),this.projFromView=n.mat4f64.create()};o.ViewProjectionTransform=e,o.bindModelTransform=function(o,r){o.setUniformMatrix3fv("uTransform_WorldFromModel_RS",r.worldFromModel_RS),o.setUniform3fv("uTransform_WorldFromModel_TH",r.worldFromModel_TH),o.setUniform3fv("uTransform_WorldFromModel_TL",r.worldFromModel_TL)},o.bindViewProjTransform=function(o,r){o.setUniform3fv("uTransform_WorldFromView_TH",r.worldFromView_TH),o.setUniform3fv("uTransform_WorldFromView_TL",r.worldFromView_TL),o.setUniformMatrix4fv("uTransform_ProjFromView",r.projFromView),o.setUniformMatrix3fv("uTransform_ViewFromCameraRelative_RS",r.viewFromCameraRelative_RS)}}(l=r.VertexPosition||(r.VertexPosition={}))}));