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

define(["require","exports","../../../core/tsSupport/awaiterHelper","../../../core/tsSupport/generatorHelper","../../../Color","../../../core/promiseUtils","./utils","@dojo/framework/shim/Promise"],(function(e,r,n,o,l,t,u){Object.defineProperty(r,"__esModule",{value:!0});var a=new l([64,64,64]);function i(e,r){var n=[],o=e.length-1;return 5===e.length?n.push(0,2,4):n.push(0,o),e.map((function(e,l){return n.indexOf(l)>-1?u.createStopLabel(e,l,o,r):null}))}function s(r,t,u){return void 0===u&&(u=a),n(this,void 0,void 0,(function(){var n,a;return o(this,(function(o){switch(o.label){case 0:return n=new l(u),[4,new Promise((function(r,n){e(["../../../renderers/visualVariables/support/visualVariableUtils"],r,n)}))];case 1:return null!=(a=o.sent().getOpacity(t,r))&&(n.a=a),[2,n]}}))}))}function c(e,r){var n=function(e,r){var n=0,o=r.length-1;return r.some((function(r,l){return e<r.value?(o=l,!0):(n=l,!1)})),{startIndex:n,endIndex:o,weight:(e-r[n].value)/(r[o].value-r[n].value)}}(e,r),o=n.startIndex,t=n.endIndex,u=n.weight;if(o===t)return r[o].color;var a=l.blendColors(r[o].color,r[t].color,u);return new l(a)}r.getRampStops=function(r,l,u){return n(this,void 0,void 0,(function(){var a,c,p,v,f,h,m,d=this;return o(this,(function(b){switch(b.label){case 0:return a=!1,c=[],p=[],r.stops&&(v=r.stops,c=v.map((function(e){return e.value})),(a=v.some((function(e){return!!e.label})))&&(p=v.map((function(e){return e.label})))),f=c[0],h=c[c.length-1],null==f&&null==h?[2,null]:(m=a?null:i(c,u),[4,t.all(c.map((function(t,u){return n(d,void 0,void 0,(function(){var n,i,c;return o(this,(function(o){switch(o.label){case 0:return"opacity"!==r.type?[3,2]:[4,s(t,r,l)];case 1:return i=o.sent(),[3,4];case 2:return[4,new Promise((function(r,n){e(["../../../renderers/visualVariables/support/visualVariableUtils"],r,n)}))];case 3:i=o.sent().getColor(r,t),o.label=4;case 4:return n=i,c=a?p[u]:m[u],[2,{value:t,color:n,label:c}]}}))}))})))]);case 1:return[2,b.sent().reverse()]}}))}))},r.getRampStopsForPointCloud=function(e){var r,n=[],o=[];n=e.map((function(e){return e.value})),(r=e.some((function(e){return!!e.label})))&&(o=e.map((function(e){return e.label})));var l=n[0],t=n[n.length-1];if(null==l&&null==t)return null;var u=r?null:i(n,!1);return n.map((function(n,l){return{value:n,color:c(n,e),label:r?o[l]:u[l]}})).reverse()},r.getColorFromPointCloudStops=c,r.getStrectchRampStops=function(e,r){var n=[];if(e&&"multipart"===e.type)e.colorRamps.reverse().forEach((function(o,t){0===t?n.push({value:r.max,color:new l(o.toColor),label:"high"}):n.push({value:null,color:new l(o.toColor),label:""}),t===e.colorRamps.length-1?n.push({value:r.min,color:new l(o.fromColor),label:"low"}):n.push({value:null,color:new l(o.fromColor),label:""})}));else{var o=void 0,t=void 0;e&&"algorithmic"===e.type?(o=e.fromColor,t=e.toColor):(o=[0,0,0,1],t=[255,255,255,1]),n=[{value:r.max,color:new l(t),label:"high"},{value:r.min,color:new l(o),label:"low"}]}return n}}));