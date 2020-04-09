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

define(["require","exports","../../../../../../core/tsSupport/makeTemplateObjectHelper","../../../core/shaderLibrary/util/DoublePrecision.glsl","../../../core/shaderModules/interfaces"],(function(o,e,n,r,t){function l(o,e){var l=o.vertex;l.uniforms.add("uDistanceFalloffFactor","float"),l.code.add(t.glsl(a||(a=n(["\n    float distanceBasedPerspectiveFactor(float distance) {\n      return clamp(sqrt(uDistanceFalloffFactor / distance), 0.0, 1.0);\n    }\n  "],["\n    float distanceBasedPerspectiveFactor(float distance) {\n      return clamp(sqrt(uDistanceFalloffFactor / distance), 0.0, 1.0);\n    }\n  "])))),l.uniforms.add("uComponentDataTex","sampler2D"),l.uniforms.add("uComponentDataTexInvDim","vec2"),o.attributes.add("componentIndex","float"),l.defines.addFloat("COMPONENT_COLOR_FIELD_OFFSET",0),l.defines.addFloat("COMPONENT_OTHER_FIELDS_OFFSET",1),l.defines.addFloat("COMPONENT_FIELD_COUNT",2),l.defines.addFloat("LINE_WIDTH_FRACTION_FACTOR",8),l.defines.addFloat("EXTENSION_LENGTH_OFFSET",128),l.defines.addFloat("COMPONENT_TEX_WIDTH",4096),l.code.add(t.glsl(d||(d=n(["\n    vec2 _componentTextureCoords(float componentIndex, float fieldOffset) {\n      float fieldIndex = COMPONENT_FIELD_COUNT * componentIndex + fieldOffset;\n\n      float rowIndex = floor(fieldIndex / COMPONENT_TEX_WIDTH);\n      float colIndex = mod(fieldIndex, COMPONENT_TEX_WIDTH);\n\n      vec2 linearIndex = vec2(\n        (colIndex + 0.5) / COMPONENT_TEX_WIDTH,\n        (rowIndex + 0.5) * uComponentDataTexInvDim.y\n      );\n\n      return linearIndex;\n    }\n\n    struct ComponentData {\n      vec4 color;\n      float lineWidth;\n      float extensionLength;\n      float type;\n    };\n\n    ComponentData readComponentData() {\n      vec2 colorIndex = _componentTextureCoords(componentIndex, COMPONENT_COLOR_FIELD_OFFSET);\n      vec2 otherIndex = _componentTextureCoords(componentIndex, COMPONENT_OTHER_FIELDS_OFFSET);\n\n      vec4 colorValue = texture2D(uComponentDataTex, colorIndex);\n      vec4 otherValue = texture2D(uComponentDataTex, otherIndex);\n\n      return ComponentData(\n        vec4(colorValue.rgb, colorValue.a * otherValue.w), // otherValue.w stores separate opacity\n        otherValue.x * (255.0 / LINE_WIDTH_FRACTION_FACTOR),\n        otherValue.y * 255.0 - EXTENSION_LENGTH_OFFSET,\n        -(otherValue.z * 255.0) + 0.5 // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;\n      );\n    }\n  "],["\n    vec2 _componentTextureCoords(float componentIndex, float fieldOffset) {\n      float fieldIndex = COMPONENT_FIELD_COUNT * componentIndex + fieldOffset;\n\n      float rowIndex = floor(fieldIndex / COMPONENT_TEX_WIDTH);\n      float colIndex = mod(fieldIndex, COMPONENT_TEX_WIDTH);\n\n      vec2 linearIndex = vec2(\n        (colIndex + 0.5) / COMPONENT_TEX_WIDTH,\n        (rowIndex + 0.5) * uComponentDataTexInvDim.y\n      );\n\n      return linearIndex;\n    }\n\n    struct ComponentData {\n      vec4 color;\n      float lineWidth;\n      float extensionLength;\n      float type;\n    };\n\n    ComponentData readComponentData() {\n      vec2 colorIndex = _componentTextureCoords(componentIndex, COMPONENT_COLOR_FIELD_OFFSET);\n      vec2 otherIndex = _componentTextureCoords(componentIndex, COMPONENT_OTHER_FIELDS_OFFSET);\n\n      vec4 colorValue = texture2D(uComponentDataTex, colorIndex);\n      vec4 otherValue = texture2D(uComponentDataTex, otherIndex);\n\n      return ComponentData(\n        vec4(colorValue.rgb, colorValue.a * otherValue.w), // otherValue.w stores separate opacity\n        otherValue.x * (255.0 / LINE_WIDTH_FRACTION_FACTOR),\n        otherValue.y * 255.0 - EXTENSION_LENGTH_OFFSET,\n        -(otherValue.z * 255.0) + 0.5 // SOLID (=0/255) needs to be > 0.0, SKETCHY (=1/255) needs to be <= 0;\n      );\n    }\n  "])))),e.legacy?l.code.add(t.glsl(i||(i=n(["\n      vec3 _modelToWorldNormal(vec3 normal) {\n        return (uModel * vec4(normal, 0.0)).xyz;\n      }\n\n      vec3 _modelToViewNormal(vec3 normal) {\n        return (uView * uModel * vec4(normal, 0.0)).xyz;\n      }\n    "],["\n      vec3 _modelToWorldNormal(vec3 normal) {\n        return (uModel * vec4(normal, 0.0)).xyz;\n      }\n\n      vec3 _modelToViewNormal(vec3 normal) {\n        return (uView * uModel * vec4(normal, 0.0)).xyz;\n      }\n    "])))):(l.uniforms.add("uTransformNormal_GlobalFromModel ","mat3"),l.code.add(t.glsl(m||(m=n(["\n      vec3 _modelToWorldNormal(vec3 normal) {\n        return uTransformNormal_GlobalFromModel * normal;\n      }\n    "],["\n      vec3 _modelToWorldNormal(vec3 normal) {\n        return uTransformNormal_GlobalFromModel * normal;\n      }\n    "]))))),e.silhouette?(o.attributes.add("normalA","vec3"),o.attributes.add("normalB","vec3"),l.code.add(t.glsl(c||(c=n(["\n      vec3 worldNormal() {\n        return _modelToWorldNormal(normalize(normalA + normalB));\n      }\n    "],["\n      vec3 worldNormal() {\n        return _modelToWorldNormal(normalize(normalA + normalB));\n      }\n    "]))))):(o.attributes.add("normal","vec3"),l.code.add(t.glsl(s||(s=n(["\n      vec3 worldNormal() {\n        return _modelToWorldNormal(normal);\n      }\n    "],["\n      vec3 worldNormal() {\n        return _modelToWorldNormal(normal);\n      }\n    "]))))),e.legacy?l.code.add(t.glsl(u||(u=n(["\n      vec3 worldFromModelPosition(vec3 position) {\n        return (uModel * vec4(position, 1.0)).xyz;\n      }\n\n      vec3 viewFromModelPosition(vec3 position) {\n        return (uView * vec4(worldFromModelPosition(position), 1.0)).xyz;\n      }\n\n      vec4 projFromViewPosition(vec3 position) {\n        return uProj * vec4(position, 1.0);\n      }\n    "],["\n      vec3 worldFromModelPosition(vec3 position) {\n        return (uModel * vec4(position, 1.0)).xyz;\n      }\n\n      vec3 viewFromModelPosition(vec3 position) {\n        return (uView * vec4(worldFromModelPosition(position), 1.0)).xyz;\n      }\n\n      vec4 projFromViewPosition(vec3 position) {\n        return uProj * vec4(position, 1.0);\n      }\n    "])))):(o.include(r.DoublePrecision,e),l.code.add(t.glsl(T||(T=n(["\n      vec3 worldFromModelPosition(vec3 position) {\n        vec3 rotatedModelPosition = uTransform_WorldFromModel_RS * position;\n\n        vec3 transform_CameraRelativeFromModel = dpAdd(\n          uTransform_WorldFromModel_TL,\n          uTransform_WorldFromModel_TH,\n          -uTransform_WorldFromView_TL,\n          -uTransform_WorldFromView_TH\n        );\n\n        return transform_CameraRelativeFromModel + rotatedModelPosition;\n      }\n\n      vec3 viewFromModelPosition(vec3 position) {\n        return uTransform_ViewFromCameraRelative_RS * worldFromModelPosition(position);\n      }\n\n      vec4 projFromViewPosition(vec3 position) {\n        return uTransform_ProjFromView * vec4(position, 1.0);\n      }\n    "],["\n      vec3 worldFromModelPosition(vec3 position) {\n        vec3 rotatedModelPosition = uTransform_WorldFromModel_RS * position;\n\n        vec3 transform_CameraRelativeFromModel = dpAdd(\n          uTransform_WorldFromModel_TL,\n          uTransform_WorldFromModel_TH,\n          -uTransform_WorldFromView_TL,\n          -uTransform_WorldFromView_TH\n        );\n\n        return transform_CameraRelativeFromModel + rotatedModelPosition;\n      }\n\n      vec3 viewFromModelPosition(vec3 position) {\n        return uTransform_ViewFromCameraRelative_RS * worldFromModelPosition(position);\n      }\n\n      vec4 projFromViewPosition(vec3 position) {\n        return uTransform_ProjFromView * vec4(position, 1.0);\n      }\n    "]))))),l.code.add(t.glsl(_||(_=n(["\n    float calculateExtensionLength(float extensionLength, float lineLength) {\n      return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);\n    }\n  "],["\n    float calculateExtensionLength(float extensionLength, float lineLength) {\n      return extensionLength / (log2(max(1.0, 256.0 / lineLength)) * 0.2 + 1.0);\n    }\n  "]))))}var a,d,i,m,c,s,u,T,_;Object.defineProperty(e,"__esModule",{value:!0}),e.EdgeUtil=l,function(o){o.usesSketchLogic=function(o){return 1===o.mode||2===o.mode},o.usesSolidLogic=function(o){return 0===o.mode||2===o.mode}}(l=e.EdgeUtil||(e.EdgeUtil={}))}));