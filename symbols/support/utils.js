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

define(["require","exports","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../Color","../../symbols","../../core/asyncUtils","../../core/compilerUtils","../../core/has","../../core/maybe","../../core/screenUtils","../../core/libs/gl-matrix-2/vec3f64","./gfxUtils","./Symbol3DMaterial","@dojo/framework/shim/Promise"],(function(e,r,t,n,o,i,l,s,u,c,a,f,y,h){Object.defineProperty(r,"__esModule",{value:!0});var m=/\/resource\/(.*?)\.svg$/,p=new o("white");function b(e,r){if(null==r)return e;var t=e.toRgba();return t[3]=t[3]*r,new o(t)}function v(e,r){return n(this,void 0,void 0,(function(){var o,i=this;return t(this,(function(s){switch(s.label){case 0:return(o=e.symbolLayers)?[4,l.forEach(o,(function(e){return n(i,void 0,void 0,(function(){return t(this,(function(t){return[2,d(e,r)]}))}))}))]:[2];case 1:return s.sent(),[2]}}))}))}function d(e,r){return n(this,void 0,void 0,(function(){return t(this,(function(t){switch(t.label){case 0:switch(e.type){case"icon":case"line":case"extrude":case"text":return[3,1];case"path":return[3,2];case"object":return[3,3];case"fill":case"water":return[3,5]}return[3,6];case 1:return function(e,r){for(var t=0,n=r;t<n.length;t++){var o=n[t];if("number"==typeof o){e.size=o;break}}}(e,r),[3,7];case 2:return function(e,r){var t=S(r,f.vec3f64.ONES,[e.width,void 0,e.height]);e.width=k(r[0],e.width,1,t),e.height=k(r[2],e.height,1,t)}(e,r),[3,7];case 3:return[4,w(e,r)];case 4:return t.sent(),[3,7];case 5:return[3,7];case 6:s.neverReached(e),t.label=7;case 7:return[2]}}))}))}function w(e,r){return n(this,void 0,void 0,(function(){var n,o,i,l;return t(this,(function(t){switch(t.label){case 0:return[4,g(e)];case 1:return n=t.sent(),o=n.resourceSize,i=n.symbolSize,l=S(r,o,i),e.width=k(r[0],i[0],o[0],l),e.depth=k(r[1],i[1],o[1],l),e.height=k(r[2],i[2],o[2],l),[2]}}))}))}function S(e,r,t){for(var n=0;n<3;n++){var o=e[n];switch(o){case"symbol-value":return null!=t[n]?t[n]/r[n]:1;case"proportional":break;default:if(o&&r[n])return o/r[n]}}return 1}function g(r){return n(this,void 0,void 0,(function(){var n,o,i,l,s,u,c;return t(this,(function(t){switch(t.label){case 0:return[4,new Promise((function(r,t){e(["./symbolLayerUtils"],r,t)}))];case 1:return[4,t.sent().computeObjectLayerResourceSize(r,10)];case 2:for(n=t.sent(),o=r.width,i=r.height,l=r.depth,s=[o,l,i],u=1,c=0;c<3;c++)if(null!=s[c]){u=s[c]/n[c];break}for(c=0;c<3;c++)null==s[c]&&(s[c]=n[c]*u);return[2,{resourceSize:n,symbolSize:s}]}}))}))}function k(e,r,t,n){switch(e){case"proportional":return t*n;case"symbol-value":return null!=r?r:t;default:return e}}r.getSymbolOutlineSize=function(e){if(!e)return 0;if(i.isSymbol3D(e)){var r=function(e){var r=e.symbolLayers&&e.symbolLayers.length;if(r){var t=e.symbolLayers.getItemAt(r-1);if("outline"in t)return c.get(t,"outline","size")}}(e);return c.isSome(r)?r:0}var t=y.getStroke(e);return t&&a.px2pt(t.width)||0},r.isVolumetricSymbol=function(e){if(!e||!e.symbolLayers)return!1;switch(e.type){case"point-3d":return e.symbolLayers.some((function(e){return"object"===e.type}));case"line-3d":return e.symbolLayers.some((function(e){return"path"===e.type}));case"polygon-3d":return e.symbolLayers.some((function(e){return"object"===e.type||"extrude"===e.type}));default:return!1}},r.getIconHref=function(e,r){var t=r.resource.href;return!u("esri-canvas-svg-support")&&e.styleOrigin&&m.test(t)?t.replace(m,"/resource/png/$1.png"):t},r.applyOpacityToColor=b,r.applyColorToSymbol=function(e,r,t){e&&(r||null!=t)&&(r&&(r=new o(r)),i.isSymbol3D(e)?function(e,r,t){var n=e.symbolLayers;if(n){var o=function(e){var n=c.isSome(e)?e:null;return b(r=r||n||null!=t&&p,t)};n.forEach((function(e){if("object"!==e.type||null==e.resource.href||r)if("water"===e.type)e.color=o(e.color);else{var n=c.isSome(e.material)?e.material.color:null,i=o(n);c.isNone(e.material)?e.material=new h.default({color:i}):e.material.color=i,null!=t&&"outline"in e&&c.isSome(e.outline)&&c.isSome(e.outline.color)&&(e.outline.color=b(e.outline.color,t))}}))}}(e,r,t):i.isSymbol2D(e)&&function(e,r,t){(r=r||e.color)&&(e.color=b(r,t)),null!=t&&"outline"in e&&e.outline&&e.outline.color&&(e.outline.color=b(e.outline.color,t))}(e,r,t))},r.applySizesToSymbol=function(e,r){return n(this,void 0,void 0,(function(){return t(this,(function(t){return e&&r?i.isSymbol3D(e)?[2,v(e,r)]:(i.isSymbol2D(e)&&function(e,r){var t=r[0];if("number"==typeof t)switch(e.type){case"simple-marker":e.size=t;break;case"picture-marker":var n=e.width/e.height;n>1?(e.width=t,e.height=t*n):(e.width=t*n,e.height=t);break;case"simple-line":e.width=t;break;case"text":e.font.size=t;break;case"simple-fill":case"picture-fill":case"cim":break;default:s.neverReached(e)}}(e,r),[2]):[2]}))}))},r.applyRotationToSymbol=function(e,r,t){if(e&&null!=r)if(i.isSymbol3D(e)){var n=e.symbolLayers;n&&n.forEach((function(e){if(e&&"object"===e.type)switch(t){case"tilt":e.tilt=r;break;case"roll":e.roll=r;break;default:e.heading=r}}))}else i.isSymbol2D(e)&&("simple-marker"!==e.type&&"picture-marker"!==e.type&&"text"!==e.type||(e.angle=r))}}));