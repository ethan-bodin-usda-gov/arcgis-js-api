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

define(["require","exports","../../../../../../core/tsSupport/makeTemplateObjectHelper","../../../core/shaderLibrary/Slice.glsl","../../../core/shaderModules/interfaces","../../../core/shaderModules/ShaderBuilder","./AdjustProjectedPosition.glsl","./DiscardByCoverage.glsl","./DiscardNonSilhouetteEdges.glsl","./DiscardShortEdges.glsl","./EdgeUtil.glsl","./LineAmplitude.glsl","./LineOffset.glsl","./UnpackAttributes.glsl"],(function(e,n,i,o,t,s,a,d,l,r,c,p,P,u){var f,x,v,g;Object.defineProperty(n,"__esModule",{value:!0}),n.attributeLocations={position0:0,position1:1,componentIndex:2,packedAttributes:3,variantOffset:4,variantStroke:5,variantExtension:6,normal:7,normalA:7,normalB:8,sideness:9},n.build=function(e){var n=new s.ShaderBuilder,h=n.vertex,m=n.fragment;return e.legacy&&h.uniforms.add("uModel","mat4"),e.antialiasing&&(h.code.add(t.glsl(f||(f=i(["\n      #define ANTIALIASING 1\n    "],["\n      #define ANTIALIASING 1\n    "])))),m.code.add(t.glsl(x||(x=i(["\n      #define ANTIALIASING 1\n    "],["\n      #define ANTIALIASING 1\n    "]))))),n.include(a.AdjustProjectedPosition,e),n.include(p.LineAmplitude,e),n.include(c.EdgeUtil,e),n.include(u.UnpackAttributes,e),n.include(P.LineOffset,e),n.include(o.Slice,e),n.include(l.DiscardNonSilhouetteEdges,e),n.include(d.DiscardByCoverage,e),n.include(r.DiscardShortEdges,e),n.varyings.add("vColor","vec4"),n.varyings.add("vRadius","float"),n.varyings.add("vPosition","vec3"),n.varyings.add("vWorldPosition","vec3"),n.varyings.add("vLineLengthPixels","float"),n.varyings.add("vSizeFalloffFactor","float"),h.uniforms.add("uPixelToNDC","vec2"),h.uniforms.add("uNDCToPixel","vec2"),h.uniforms.add("uPixelRatio","float"),n.attributes.add("position0","vec3"),n.attributes.add("position1","vec3"),n.attributes.add("variantOffset","float"),n.attributes.add("variantStroke","float"),n.attributes.add("variantExtension","float"),h.code.add(t.glsl(v||(v=i(["\n    const float opaqueCutoff = 1.0 / 255.0;\n\n    void calculateGeometricOutputs(vec3 viewPosV0, vec3 viewPosV1, vec3 worldPosV0, vec3 worldPosV1, vec3 worldNormal, UnpackedAttributes unpackedAttributes) {\n      vec2 sideness = unpackedAttributes.sideness;\n      vec2 sidenessNorm = unpackedAttributes.sidenessNorm;\n\n      vWorldPosition = mix(worldPosV0, worldPosV1, sidenessNorm.y).xyz;\n\n      vec3 viewPos = mix(viewPosV0, viewPosV1, sidenessNorm.y);\n\n      vec4 projPosV0 = projFromViewPosition(viewPosV0);\n      vec4 projPosV1 = projFromViewPosition(viewPosV1);\n      vec4 projPos = projFromViewPosition(viewPos);\n\n      vec3 screenSpaceLineNDC = (projPosV1.xyz / projPosV1.w - projPosV0.xyz / projPosV0.w);\n      vec2 screenSpaceLinePixels = screenSpaceLineNDC.xy * uNDCToPixel;\n      float lineLengthPixels = length(screenSpaceLinePixels);\n\n      float dzPerPixel = screenSpaceLineNDC.z / lineLengthPixels;\n      vec2 screenSpaceDirection = screenSpaceLinePixels / lineLengthPixels;\n      vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x) * sideness.x;\n\n      float falloffFactor = distanceBasedPerspectiveFactor(-viewPos.z) * uPixelRatio;\n      float lineWidthPixels = unpackedAttributes.lineWidthPixels * falloffFactor;\n\n      float extensionLengthPixels = calculateExtensionLength(unpackedAttributes.extensionLengthPixels, lineLengthPixels) * falloffFactor;\n      float lineAmplitudePixels = calculateLineAmplitude(unpackedAttributes) * uPixelRatio;\n\n      vSizeFalloffFactor = falloffFactor;\n\n      float lineWidthAndAmplitudePixels = lineWidthPixels + lineAmplitudePixels + lineAmplitudePixels;\n      float extendedLineLengthPixels = lineLengthPixels + extensionLengthPixels + extensionLengthPixels;\n\n    #ifdef ANTIALIASING\n      const float aaPaddingPixels = 1.0;\n\n      // Line size with padding\n      float halfAAPaddedLineWidthAndAmplitudePixels = lineWidthAndAmplitudePixels * 0.5 + aaPaddingPixels;\n      float aaPaddedRoundedCapSizePixels = lineWidthPixels * 0.5 + aaPaddingPixels;\n    #else /* ANTIALIASING */\n\n      // Even if there is no AA, we still want to do proper <1px rendering,\n      // so we effectively clamp the pixel sizes to minimum of 1px and compute\n      // coverage in the fragment shader\n      float halfAAPaddedLineWidthAndAmplitudePixels = max(lineWidthAndAmplitudePixels, 1.0) * 0.5;\n      float aaPaddedRoundedCapSizePixels = max(lineWidthPixels, 1.0) * 0.5;\n    #endif /* ANTIALIASING */\n\n      // Half line width in NDC including padding for anti aliasing\n      vec2 halfAAPaddedLineWidthAndAmplitudeNDC = halfAAPaddedLineWidthAndAmplitudePixels * uPixelToNDC;\n      vec2 aaPaddedRoundedCapSizeNDC = aaPaddedRoundedCapSizePixels * uPixelToNDC;\n      vec2 extensionLengthNDC = extensionLengthPixels * uPixelToNDC;\n\n      // Compute screen space position of vertex, offsetting for line size and end caps\n      vec2 ndcOffset = (\n          screenSpaceDirection * sideness.y * (aaPaddedRoundedCapSizeNDC + extensionLengthNDC)\n        + perpendicularScreenSpaceDirection * halfAAPaddedLineWidthAndAmplitudeNDC\n      );\n\n      projPos.xy += ndcOffset * projPos.w;\n      projPos.z += (dzPerPixel * (aaPaddedRoundedCapSizePixels + extensionLengthPixels)) * sideness.y * projPos.w;\n\n      projPos = adjustProjectedPosition(projPos, worldNormal, 1.0 + max((lineWidthAndAmplitudePixels - 1.0) * 0.5, 0.0));\n\n      // Line length with end caps\n      float aaPaddedLineWithCapsLengthPixels = extendedLineLengthPixels + aaPaddedRoundedCapSizePixels + aaPaddedRoundedCapSizePixels;\n\n      float pixelPositionAlongLine = aaPaddedLineWithCapsLengthPixels * sidenessNorm.y - aaPaddedRoundedCapSizePixels;\n\n      // Position in pixels with origin at first vertex of line segment\n      vPosition = vec3(\n        halfAAPaddedLineWidthAndAmplitudePixels * sideness.x,\n        pixelPositionAlongLine,\n        pixelPositionAlongLine / extendedLineLengthPixels\n      );\n\n      // The line width radius in pixels\n      vRadius = lineWidthPixels * 0.5;\n      vLineLengthPixels = extendedLineLengthPixels;\n\n      // discard edges below a certain length threshold\n      discardShortEdges(unpackedAttributes, lineLengthPixels);\n\n      gl_Position = projPos;\n    }\n\n    void main() {\n      ComponentData component = readComponentData();\n      UnpackedAttributes unpackedAttributes = unpackAttributes(component);\n\n      vec3 worldPosV0 = worldFromModelPosition(position0);\n      vec3 worldPosV1 = worldFromModelPosition(position1);\n      vec3 viewPosV0 = viewFromModelPosition(position0);\n      vec3 viewPosV1 = viewFromModelPosition(position1);\n\n      // Component color\n      vColor = component.color;\n\n      // Discard fully transparent edges\n      if (vColor.a < opaqueCutoff) {\n        gl_Position = vec4(10.0, 10.0, 10.0, 1.0);\n        return;\n      }\n\n      if (discardNonSilhouetteEdges(viewPosV0, worldPosV0)) {\n        return;\n      }\n\n      // General geometric computation for all types of edges\n      calculateGeometricOutputs(viewPosV0, viewPosV1, worldPosV0, worldPosV1, worldNormal(), unpackedAttributes);\n\n      // Specific computation for different edge styles\n      calculateStyleOutputs(unpackedAttributes);\n    }\n  "],["\n    const float opaqueCutoff = 1.0 / 255.0;\n\n    void calculateGeometricOutputs(vec3 viewPosV0, vec3 viewPosV1, vec3 worldPosV0, vec3 worldPosV1, vec3 worldNormal, UnpackedAttributes unpackedAttributes) {\n      vec2 sideness = unpackedAttributes.sideness;\n      vec2 sidenessNorm = unpackedAttributes.sidenessNorm;\n\n      vWorldPosition = mix(worldPosV0, worldPosV1, sidenessNorm.y).xyz;\n\n      vec3 viewPos = mix(viewPosV0, viewPosV1, sidenessNorm.y);\n\n      vec4 projPosV0 = projFromViewPosition(viewPosV0);\n      vec4 projPosV1 = projFromViewPosition(viewPosV1);\n      vec4 projPos = projFromViewPosition(viewPos);\n\n      vec3 screenSpaceLineNDC = (projPosV1.xyz / projPosV1.w - projPosV0.xyz / projPosV0.w);\n      vec2 screenSpaceLinePixels = screenSpaceLineNDC.xy * uNDCToPixel;\n      float lineLengthPixels = length(screenSpaceLinePixels);\n\n      float dzPerPixel = screenSpaceLineNDC.z / lineLengthPixels;\n      vec2 screenSpaceDirection = screenSpaceLinePixels / lineLengthPixels;\n      vec2 perpendicularScreenSpaceDirection = vec2(screenSpaceDirection.y, -screenSpaceDirection.x) * sideness.x;\n\n      float falloffFactor = distanceBasedPerspectiveFactor(-viewPos.z) * uPixelRatio;\n      float lineWidthPixels = unpackedAttributes.lineWidthPixels * falloffFactor;\n\n      float extensionLengthPixels = calculateExtensionLength(unpackedAttributes.extensionLengthPixels, lineLengthPixels) * falloffFactor;\n      float lineAmplitudePixels = calculateLineAmplitude(unpackedAttributes) * uPixelRatio;\n\n      vSizeFalloffFactor = falloffFactor;\n\n      float lineWidthAndAmplitudePixels = lineWidthPixels + lineAmplitudePixels + lineAmplitudePixels;\n      float extendedLineLengthPixels = lineLengthPixels + extensionLengthPixels + extensionLengthPixels;\n\n    #ifdef ANTIALIASING\n      const float aaPaddingPixels = 1.0;\n\n      // Line size with padding\n      float halfAAPaddedLineWidthAndAmplitudePixels = lineWidthAndAmplitudePixels * 0.5 + aaPaddingPixels;\n      float aaPaddedRoundedCapSizePixels = lineWidthPixels * 0.5 + aaPaddingPixels;\n    #else /* ANTIALIASING */\n\n      // Even if there is no AA, we still want to do proper <1px rendering,\n      // so we effectively clamp the pixel sizes to minimum of 1px and compute\n      // coverage in the fragment shader\n      float halfAAPaddedLineWidthAndAmplitudePixels = max(lineWidthAndAmplitudePixels, 1.0) * 0.5;\n      float aaPaddedRoundedCapSizePixels = max(lineWidthPixels, 1.0) * 0.5;\n    #endif /* ANTIALIASING */\n\n      // Half line width in NDC including padding for anti aliasing\n      vec2 halfAAPaddedLineWidthAndAmplitudeNDC = halfAAPaddedLineWidthAndAmplitudePixels * uPixelToNDC;\n      vec2 aaPaddedRoundedCapSizeNDC = aaPaddedRoundedCapSizePixels * uPixelToNDC;\n      vec2 extensionLengthNDC = extensionLengthPixels * uPixelToNDC;\n\n      // Compute screen space position of vertex, offsetting for line size and end caps\n      vec2 ndcOffset = (\n          screenSpaceDirection * sideness.y * (aaPaddedRoundedCapSizeNDC + extensionLengthNDC)\n        + perpendicularScreenSpaceDirection * halfAAPaddedLineWidthAndAmplitudeNDC\n      );\n\n      projPos.xy += ndcOffset * projPos.w;\n      projPos.z += (dzPerPixel * (aaPaddedRoundedCapSizePixels + extensionLengthPixels)) * sideness.y * projPos.w;\n\n      projPos = adjustProjectedPosition(projPos, worldNormal, 1.0 + max((lineWidthAndAmplitudePixels - 1.0) * 0.5, 0.0));\n\n      // Line length with end caps\n      float aaPaddedLineWithCapsLengthPixels = extendedLineLengthPixels + aaPaddedRoundedCapSizePixels + aaPaddedRoundedCapSizePixels;\n\n      float pixelPositionAlongLine = aaPaddedLineWithCapsLengthPixels * sidenessNorm.y - aaPaddedRoundedCapSizePixels;\n\n      // Position in pixels with origin at first vertex of line segment\n      vPosition = vec3(\n        halfAAPaddedLineWidthAndAmplitudePixels * sideness.x,\n        pixelPositionAlongLine,\n        pixelPositionAlongLine / extendedLineLengthPixels\n      );\n\n      // The line width radius in pixels\n      vRadius = lineWidthPixels * 0.5;\n      vLineLengthPixels = extendedLineLengthPixels;\n\n      // discard edges below a certain length threshold\n      discardShortEdges(unpackedAttributes, lineLengthPixels);\n\n      gl_Position = projPos;\n    }\n\n    void main() {\n      ComponentData component = readComponentData();\n      UnpackedAttributes unpackedAttributes = unpackAttributes(component);\n\n      vec3 worldPosV0 = worldFromModelPosition(position0);\n      vec3 worldPosV1 = worldFromModelPosition(position1);\n      vec3 viewPosV0 = viewFromModelPosition(position0);\n      vec3 viewPosV1 = viewFromModelPosition(position1);\n\n      // Component color\n      vColor = component.color;\n\n      // Discard fully transparent edges\n      if (vColor.a < opaqueCutoff) {\n        gl_Position = vec4(10.0, 10.0, 10.0, 1.0);\n        return;\n      }\n\n      if (discardNonSilhouetteEdges(viewPosV0, worldPosV0)) {\n        return;\n      }\n\n      // General geometric computation for all types of edges\n      calculateGeometricOutputs(viewPosV0, viewPosV1, worldPosV0, worldPosV1, worldNormal(), unpackedAttributes);\n\n      // Specific computation for different edge styles\n      calculateStyleOutputs(unpackedAttributes);\n    }\n  "])))),n.fragment.code.add(t.glsl(g||(g=i(["\n    vec2 lineWithCapsDistance(float radius, vec2 position, float lineLength) {\n      float lineOffset = calculateLineOffset();\n      float positionX = position.x - lineOffset;\n\n      if (radius < 1.0) {\n        // Handle this specifically for subpixel sizes:\n        // 1. Compute correct coverage (note coverage is computed by\n        //    0.5 - dist, so we make sure that that will lead to correct\n        //    subpixel coverage\n        // 2. Ignore rounded caps\n        float coverageX = clamp(min(radius, positionX + 0.5) - max(-radius, positionX - 0.5), 0.0, 1.0);\n        float coverageY = clamp(min(lineLength, position.y + 0.5) - max(0.0, position.y - 0.5), 0.0, 1.0);\n\n        float coverage = min(coverageX, coverageY);\n\n        return vec2(0.5 - coverage, 0.0);\n      }\n      else {\n        // Between -radius -> 0 for start cap, 0 for line, 0 -> radius\n        float positionOnCap = position.y - clamp(position.y, 0.0, lineLength);\n\n        vec2 lineToPosition = vec2(positionX, positionOnCap);\n        return vec2(length(lineToPosition) - radius, positionOnCap / radius);\n      }\n    }\n\n    void main() {\n      float radius = vRadius * calculateLinePressure();\n\n      vec2 distance = lineWithCapsDistance(radius, vPosition.xy, vLineLengthPixels);\n      float coverage = clamp(0.5 - distance.x, 0.0, 1.0);\n\n      discardByCoverage(radius, coverage);\n      discardBySlice(vWorldPosition);\n\n      float alpha = vColor.a * coverage;\n\n      gl_FragColor = vec4(vColor.rgb, alpha);\n\n    }\n  "],["\n    vec2 lineWithCapsDistance(float radius, vec2 position, float lineLength) {\n      float lineOffset = calculateLineOffset();\n      float positionX = position.x - lineOffset;\n\n      if (radius < 1.0) {\n        // Handle this specifically for subpixel sizes:\n        // 1. Compute correct coverage (note coverage is computed by\n        //    0.5 - dist, so we make sure that that will lead to correct\n        //    subpixel coverage\n        // 2. Ignore rounded caps\n        float coverageX = clamp(min(radius, positionX + 0.5) - max(-radius, positionX - 0.5), 0.0, 1.0);\n        float coverageY = clamp(min(lineLength, position.y + 0.5) - max(0.0, position.y - 0.5), 0.0, 1.0);\n\n        float coverage = min(coverageX, coverageY);\n\n        return vec2(0.5 - coverage, 0.0);\n      }\n      else {\n        // Between -radius -> 0 for start cap, 0 for line, 0 -> radius\n        float positionOnCap = position.y - clamp(position.y, 0.0, lineLength);\n\n        vec2 lineToPosition = vec2(positionX, positionOnCap);\n        return vec2(length(lineToPosition) - radius, positionOnCap / radius);\n      }\n    }\n\n    void main() {\n      float radius = vRadius * calculateLinePressure();\n\n      vec2 distance = lineWithCapsDistance(radius, vPosition.xy, vLineLengthPixels);\n      float coverage = clamp(0.5 - distance.x, 0.0, 1.0);\n\n      discardByCoverage(radius, coverage);\n      discardBySlice(vWorldPosition);\n\n      float alpha = vColor.a * coverage;\n\n      gl_FragColor = vec4(vColor.rgb, alpha);\n\n    }\n  "])))),n}}));