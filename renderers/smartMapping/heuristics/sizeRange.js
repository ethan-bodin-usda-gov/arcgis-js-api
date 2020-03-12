// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/tsSupport/assignHelper","../../../core/compilerUtils","../../../core/Error","../../../core/screenUtils","../../../geometry/support/scaleUtils","./scaleRange","../support/utils","../../visualVariables/SizeVariable"],function(e,n,l,r,a,t,i,s,o,c,u,v){function p(e){return r(this,void 0,void 0,function(){var n,r,t,s,o;return l(this,function(l){switch(l.label){case 0:if(n=e.view,r=e.layer,!(e&&n&&r))throw new i("size-range:missing-parameters","'view' and 'layer' parameters are required");if(t=a({},e),s=[0,2,3,1],t.layer=u.createLayerAdapter(r,s),!t.layer)throw new i("size-range:invalid-parameters","'layer' must be one of these types: "+u.getLayerTypeLabels(s).join(", "));return[4,n.when()];case 1:return l.sent(),[4,t.layer.load()];case 2:if(l.sent(),"point"!==(o=t.layer.geometryType)&&"multipoint"!==o&&"polyline"!==o&&"polygon"!==o)throw new i("size-range:not-supported","sizeRange is not supported for geometryType: "+o);return[2,t]}})})}function f(e,n){var l=Math.ceil(e/n),r=Math.ceil(l/4);r<4?r=4:r>16&&(r=16);var a=5*r;return{min:r,max:a<50?50:a}}function m(e,n){var l=e.view,r=n.minScale||y,a=l.constraints&&"effectiveLODs"in l.constraints&&l.constraints.effectiveLODs||M,t=[];for(var i in a){if(!(a[i].scale>r)){for(var s=Number(i),o=[s-3,s,s+3,s+6],c=0,u=o;c<u.length;c++){var v=u[c];v>-1&&v<a.length&&t.push(a[v].scale)}break}}return t.sort(function(e,n){return e-n})}function w(e,n){var l=e.view,r=e.layer,a=r.fullExtent,t=r.minScale||z,i=r.maxScale||d,s=n.minScale||0,c=n.maxScale||0,u=a?o.getScale(l,a):0;return u=u<t&&u>i?u:0,{scales:[t,i,s,c,u].map(Math.round).sort(function(e,n){return e-n}).filter(function(e,n,l){return!!e&&l.indexOf(e)===n}).filter(function(e,n,l){return!n||Math.abs(e-l[n-1])>5}),fullExtentScale:u}}function S(e,n){var l=n.minScale,r=n.maxScale,a=m(e,{minScale:l,maxScale:r});if(!a.length)throw new i("scale-range:insufficient-info","not enough scale values");return{minSize:new v({valueExpression:"$view.scale",stops:a.map(function(e,n){return{value:e,size:s.px2pt(E[n])}})}),maxSize:new v({valueExpression:"$view.scale",stops:a.map(function(e,n){return{value:e,size:s.px2pt(b[n])}})})}}function h(e,n){var l=n.minScale,r=n.maxScale,a=m(e,{minScale:l,maxScale:r});if(!a.length)throw new i("scale-range:insufficient-info","not enough scale values");return{minSize:new v({valueExpression:"$view.scale",stops:a.map(function(e,n){return{value:e,size:s.px2pt($[n])}})}),maxSize:new v({valueExpression:"$view.scale",stops:a.map(function(e,n){return{value:e,size:s.px2pt(L[n])}})})}}function x(e,n){var l=n.spatialStatistics,r=n.minScale,a=n.maxScale;if(!("avgSize"in l&&l.avgSize))throw new i("size-range:insufficient-info","average polygon size is invalid");var t=l.avgSize,o=e.view,c=o.resolution,u=o.scale,p=c/u,m=w(e,{minScale:r,maxScale:a}),S=m.scales,h=m.fullExtentScale,x=[],g=[];return S.forEach(function(e,n){var l=f(t,p*e),r=l.min,a=l.max,i=S.indexOf(h),o=i>-1&&n>i?2:1;x.push({value:e,size:s.px2pt(r/o)}),g.push({value:e,size:s.px2pt(a/o)})}),{minSize:new v({valueExpression:"$view.scale",stops:x}),maxSize:new v({valueExpression:"$view.scale",stops:g})}}function g(e){return r(this,void 0,void 0,function(){var n,r,a,i,s;return l(this,function(l){switch(l.label){case 0:return[4,p(e)];case 1:return n=l.sent(),r=n.view,a=n.layer,[4,c({layer:a,view:r})];case 2:switch(i=l.sent(),s=a.geometryType){case"point":case"multipoint":return[2,S(n,i)];case"polyline":return[2,h(n,i)];case"polygon":return[2,x(n,i)];case"mesh":case"multipatch":return[2,null];default:t.neverReached(s)}return[2,null]}})})}var y=1e8,z=1128.497176,d=591657527.591555,E=[10,8,4,2],b=[100,100,60,30],$=[2,1,.75,.5],L=[32,18,12,6],M=[{level:0,resolution:156543.03392800014,scale:591657527.591555},{level:1,resolution:78271.51696399994,scale:295828763.795777},{level:2,resolution:39135.75848200009,scale:147914381.897889},{level:3,resolution:19567.87924099992,scale:73957190.948944},{level:4,resolution:9783.93962049996,scale:36978595.474472},{level:5,resolution:4891.96981024998,scale:18489297.737236},{level:6,resolution:2445.98490512499,scale:9244648.868618},{level:7,resolution:1222.992452562495,scale:4622324.434309},{level:8,resolution:611.4962262813797,scale:2311162.217155},{level:9,resolution:305.74811314055756,scale:1155581.108577},{level:10,resolution:152.87405657041106,scale:577790.554289},{level:11,resolution:76.43702828507324,scale:288895.277144},{level:12,resolution:38.21851414253662,scale:144447.638572},{level:13,resolution:19.10925707126831,scale:72223.819286},{level:14,resolution:9.554628535634155,scale:36111.909643},{level:15,resolution:4.77731426794937,scale:18055.954822},{level:16,resolution:2.388657133974685,scale:9027.977411},{level:17,resolution:1.1943285668550503,scale:4513.988705},{level:18,resolution:.5971642835598172,scale:2256.994353},{level:19,resolution:.29858214164761665,scale:1128.497176}];return g});