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

define(["require","exports","../../../../core/tsSupport/makeTemplateObjectHelper","../core/shaderLibrary/Slice.glsl","../core/shaderLibrary/output/OutputHighlight.glsl","../core/shaderLibrary/util/RgbaFloatEncoding.glsl","../core/shaderModules/interfaces","../core/shaderModules/ShaderBuilder"],(function(e,i,n,o,t,a,r,c){var l,s,d,p,u,f,v,S,g;Object.defineProperty(i,"__esModule",{value:!0}),i.build=function(e){var i=new c.ShaderBuilder,m=0===e.output,z=1===e.output,x=4===e.output;return i.extensions.add("GL_OES_standard_derivatives"),i.include(o.Slice,e),i.attributes.add("position","vec3"),i.attributes.add("color","vec3"),i.vertex.uniforms.add("uModelViewMatrix","mat4").add("uProjectionMatrix","mat4").add("uScreenMinMaxSize","vec2").add("uPointScale","vec2").add("uClipMin","vec3").add("uClipMax","vec3"),z?(i.vertex.uniforms.add("nearFar","vec2"),i.varyings.add("depth","float")):4!==e.output&&i.varyings.add("vColor","vec3"),i.vertex.code.add(r.glsl(u||(u=n(["\n    void main(void) {\n      // Move clipped points outside of clipspace\n      if (position.x < uClipMin.x || position.y < uClipMin.y || position.z < uClipMin.z ||\n        position.x > uClipMax.x || position.y > uClipMax.y || position.z > uClipMax.z) {\n        gl_Position = vec4(0.0,0.0,0.0,2.0);\n        gl_PointSize = 0.0;\n        return;\n      }\n\n      if (rejectBySlice(position)) {\n        gl_Position = vec4(0.0,0.0,0.0,2.0);\n        gl_PointSize = 0.0;\n        return;\n      }\n\n      // Position in camera space\n      vec4 camera = uModelViewMatrix * vec4(position, 1.0);\n\n      float pointSize = uPointScale.x;\n      vec4 position = uProjectionMatrix * camera;\n     ","\n\n     gl_PointSize = clampedScreenSize;\n     gl_Position = position;\n\n     ","\n     ","\n    }\n  "],["\n    void main(void) {\n      // Move clipped points outside of clipspace\n      if (position.x < uClipMin.x || position.y < uClipMin.y || position.z < uClipMin.z ||\n        position.x > uClipMax.x || position.y > uClipMax.y || position.z > uClipMax.z) {\n        gl_Position = vec4(0.0,0.0,0.0,2.0);\n        gl_PointSize = 0.0;\n        return;\n      }\n\n      if (rejectBySlice(position)) {\n        gl_Position = vec4(0.0,0.0,0.0,2.0);\n        gl_PointSize = 0.0;\n        return;\n      }\n\n      // Position in camera space\n      vec4 camera = uModelViewMatrix * vec4(position, 1.0);\n\n      float pointSize = uPointScale.x;\n      vec4 position = uProjectionMatrix * camera;\n     ","\n\n     gl_PointSize = clampedScreenSize;\n     gl_Position = position;\n\n     ","\n     ","\n    }\n  "])),e.drawScreenSize?r.glsl(l||(l=n(["\n      float clampedScreenSize = pointSize;"],["\n      float clampedScreenSize = pointSize;"]))):r.glsl(s||(s=n(["\n      float pointRadius = 0.5 * pointSize;\n      vec4 cameraOffset = camera + vec4(0.0, pointRadius, 0.0, 0.0);\n      vec4 positionOffset = uProjectionMatrix * cameraOffset;\n      float radius = abs(positionOffset.y - position.y);\n      float viewHeight = uPointScale.y;\n      // screen diameter = (2 * r / w) * (h / 2)\n      float screenPointSize = (radius / position.w) * viewHeight;\n      float clampedScreenSize = clamp(screenPointSize, uScreenMinMaxSize.x, uScreenMinMaxSize.y);\n      // Shift towards camera, to move rendered point out of terrain i.e. to\n      // the camera-facing end of the virtual point when considering it as a\n      // 3D sphere.\n      camera.xyz -= normalize(camera.xyz) * pointRadius * clampedScreenSize / screenPointSize;\n      position = uProjectionMatrix * camera;"],["\n      float pointRadius = 0.5 * pointSize;\n      vec4 cameraOffset = camera + vec4(0.0, pointRadius, 0.0, 0.0);\n      vec4 positionOffset = uProjectionMatrix * cameraOffset;\n      float radius = abs(positionOffset.y - position.y);\n      float viewHeight = uPointScale.y;\n      // screen diameter = (2 * r / w) * (h / 2)\n      float screenPointSize = (radius / position.w) * viewHeight;\n      float clampedScreenSize = clamp(screenPointSize, uScreenMinMaxSize.x, uScreenMinMaxSize.y);\n      // Shift towards camera, to move rendered point out of terrain i.e. to\n      // the camera-facing end of the virtual point when considering it as a\n      // 3D sphere.\n      camera.xyz -= normalize(camera.xyz) * pointRadius * clampedScreenSize / screenPointSize;\n      position = uProjectionMatrix * camera;"]))),z?r.glsl(d||(d=n(["depth = (-camera.z - nearFar[0]) / (nearFar[1] - nearFar[0]);"],["depth = (-camera.z - nearFar[0]) / (nearFar[1] - nearFar[0]);"]))):"",m?r.glsl(p||(p=n(["vColor = color;"],["vColor = color;"]))):"")),i.include(a.RgbaFloatEncoding,e),x&&i.include(t.OutputHighlight),i.fragment.code.add(r.glsl(g||(g=n(["\n    void main(void) {\n      vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);\n      float r2 = dot(vOffset, vOffset);\n\n      if (r2 > 0.25) {\n        discard;\n      }\n      ","\n      ","\n      ","\n    }\n  "],["\n    void main(void) {\n      vec2 vOffset = gl_PointCoord - vec2(0.5, 0.5);\n      float r2 = dot(vOffset, vOffset);\n\n      if (r2 > 0.25) {\n        discard;\n      }\n      ","\n      ","\n      ","\n    }\n  "])),z?r.glsl(f||(f=n(["gl_FragColor = float2rgba(depth);"],["gl_FragColor = float2rgba(depth);"]))):"",x?r.glsl(v||(v=n(["outputHighlight();"],["outputHighlight();"]))):"",m?r.glsl(S||(S=n(["gl_FragColor = vec4(vColor, 1.0);"],["gl_FragColor = vec4(vColor, 1.0);"]))):"")),i}}));