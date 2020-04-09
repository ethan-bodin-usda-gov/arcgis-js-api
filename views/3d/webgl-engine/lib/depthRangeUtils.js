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

define(["require","exports","../../../../core/PooledArray","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../support/geometryUtils","../../support/mathUtils","./ComponentUtils","./depthRange","./Util"],(function(e,t,r,a,n,i,s,o,f,h,c,u,d,g){Object.defineProperty(t,"__esModule",{value:!0});function l(e,t){if(t.isVisible){var r=d.empty(),a=t.getObjects();return t.getSpatialQueryAccelerator()?function(e,t,r){var a=t.eye,n=t.viewForward,i=t.frustum,s=function(e){return!e.isHidden()},o=r.objectCount;if(o<500)d.set(C,t.near,Math.min(e.near,t.far)),r.forEachInDepthRange(a,n,"front-to-back",C,(function(r,a){m(e,t,r),C.far=e.near,a.setRange(C)}),i,s),d.set(C,Math.max(e.far,t.near),t.far),r.forEachInDepthRange(a,n,"back-to-front",C,(function(r,a){m(e,t,r),C.near=e.far,a.setRange(C)}),i,s);else{var f=Math.max(Math.min(o,500),Math.ceil(.1*o)),h=r.findClosest(n,"front-to-back",i,s,f),c=r.findClosest(n,"back-to-front",i,s,f);h&&c&&(v(e,t,h.getCenter(),h.getBSRadius()),v(e,t,c.getCenter(),c.getBSRadius()))}}(r,e,t.getSpatialQueryAccelerator()):function(e,t,r){if(M.clear(),r.forEach((function(e){e.isHidden()||M.add(e)})),M.empty)return;M.sort(t),d.set(C,t.near,Math.min(e.near,t.far)),M.forEachInDepthRange(C,"front-to-back",(function(r,a){a<e.near&&m(e,t,r)})),d.set(C,Math.max(e.far,t.near),t.far),M.forEachInDepthRange(C,"back-to-front",(function(t,r,a){e.far=Math.max(e.far,a)}))}(r,e,a),r}}function m(e,t,r){if(!r.isHidden()&&h.frustum.intersectsSphere(t.frustum.planes,h.sphere.wrap(r.getBSRadius(),r.getCenter()))){var n=r.objectTransformation,s=B;r.geometryRecords.forEach((function(r){a.mat4.multiply(s,n,r.getShaderTransformation());var o=c.maxScale(s);!function e(t,r,a,n,s){var o=r.eye,f=r.viewForward;i.vec3.transformMat4(R,a.center,n);var c=f[0]*(R[0]-o[0])+f[1]*(R[1]-o[1])+f[2]*(R[2]-o[2]),u=a.bsRadius*s;if(c-u>t.near&&c+u<t.far)return;if(!h.frustum.intersectsSphere(r.frustum.planes,h.sphere.wrap(u,R)))return;if(a.bsRadius>100&&a.getChildren())for(var d=a.getChildren(),g=0;g<8;++g)d[g]&&e(t,r,d[g],n,s);else S.unionDepthRangeWithAABB(t,r.viewProjectionMatrix,n,a.bbMin,a.bbMax)}(e,t,r.geometry.boundingInfo,s,o)}))}}function v(e,t,r,a){var n=t.eye,i=t.viewForward,s=(r[0]-n[0])*i[0]+(r[1]-n[1])*i[1]+(r[2]-n[2])*i[2];e.near=Math.min(e.near,s-a),e.far=Math.max(e.far,s+a)}t.depthRangeFromScene=function(e,t,r){if(t.size<1e4)return x.compute(e,t);var a=d.empty();return r.forEach((function(t){t.isVisible&&d.union(a,l(e,t))})),a},t.depthRangeFromLayer=l;var p=function(){function e(){this._items=new r({allocator:function(e){return e||{obj:null,distance:0,near:0,far:0}},deallocator:function(e){return e.obj=null,e.distance=0,e.near=0,e.far=0,e}})}return Object.defineProperty(e.prototype,"length",{get:function(){return this._items.length},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"empty",{get:function(){return 0===this._items.length},enumerable:!0,configurable:!0}),e.prototype.clear=function(){this._items.clear()},e.prototype.add=function(e){this._items.pushNew().obj=e},e.prototype.sort=function(e){var t=e.eye,r=e.viewForward;this._items.forEach((function(e){var a=e.obj,n=a.getCenter(),i=a.getBSRadius(),s=(n[0]-t[0])*r[0]+(n[1]-t[1])*r[1]+(n[2]-t[2])*r[2];e.distance=s,e.near=s-i,e.far=s+i})),this._items.sort((function(e,t){return e.distance-t.distance}))},e.prototype.forEachInDepthRange=function(e,t,r){if("front-to-back"===t)for(var a=0;a<this._items.length;++a){(n=this._items.data[a]).far<e.near||n.near>e.far||r(n.obj,n.near,n.far)}else for(a=this._items.length-1;a>=0;--a){var n;(n=this._items.data[a]).far<e.near||n.near>e.far||r(n.obj,n.near,n.far)}},e}(),b=function(){function e(){this.view=n.mat4f64.create(),this.viewProj=n.mat4f64.create(),this.frustum=h.frustum.create(),this.geometries=[],this.near=[],this.far=[],this.nearCandidates=[],this.farCandidates=[],this.range={near:0,far:0},this.looseRange={near:0,far:0}}return e.prototype.compute=function(e,t){var r=this;this.reset(),a.mat4.copy(this.view,e.viewMatrix),a.mat4.multiply(this.viewProj,e.projectionMatrix,this.view),h.frustum.copy(e.frustum,this.frustum);var n=this.view,i=n[2],s=n[6],o=n[10],f=n[14],c=this.range,d=0;if(t.forEach((function(e){var t=e.instanceParameters.componentVisibilities,a=e.componentOffsets;if(!u.isAllHidden(t,a)&&e.castShadow){var n,h;e.hasShaderTransformation?(n=e.getBoundingSphere(e.getShaderTransformation(),1,R),h=R):(n=e.bsRadius,h=e.center);var c=i*h[0]+s*h[1]+o*h[2]+f,g=c-n,l=c+n;r.geometries[d]=e,r.near[d]=-l,r.far[d]=-g,++d}})),0===this.geometries.length)return c;for(var g=0;g<this.geometries.length;++g)this.near[g]>c.far&&(c.far=this.near[g]),this.near[g]>2&&this.far[g]<c.near&&(c.near=this.far[g]);var l=this.looseRange;l.near=Math.max(.5*c.near,2),l.far=2*c.far;var m=0,v=0;for(g=0;g<this.geometries.length;++g)this.near[g]<c.near&&(this.near[g]>=l.near?c.near=this.near[g]:this.nearCandidates[m++]=g),this.far[g]>c.far&&(this.far[g]<=l.far?c.far=this.far[g]:this.farCandidates[v++]=g);if(0===this.nearCandidates.length&&0===this.farCandidates.length)return c;this.nearCandidates.sort((function(e,t){return r.near[e]<r.near[t]?-1:r.near[e]>r.near[t]?1:0})),this.farCandidates.sort((function(e,t){return r.far[e]<r.far[t]?1:r.far[e]>r.far[t]?-1:0}));for(g=0;g<this.nearCandidates.length;++g){var p=this.nearCandidates[g];if(this.near[p]<c.near){var b=(y=this.geometries[p]).boundingInfo;this.includeNearBoundingInfoRec(b,y.getShaderTransformation())}}for(g=0;g<this.farCandidates.length;++g){p=this.farCandidates[g];if(this.far[p]>c.far){var y;b=(y=this.geometries[p]).boundingInfo;this.includeFarBoundingInfoRec(b,y.getShaderTransformation())}}return c},e.prototype.reset=function(){this.geometries.length=0,this.near.length=0,this.far.length=0,this.nearCandidates.length=0,this.farCandidates.length=0,this.range.near=Number.MAX_VALUE,this.range.far=-Number.MAX_VALUE},e.prototype.includeNearBoundingInfoRec=function(e,t){var r=e.getBSRadius(),a=e.getCenter();i.vec3.transformMat4(R,a,t);var n=c.maxScale(t),s=R[0],o=R[1],f=R[2];r*=n;var h=this.frustum.planes;if(!(h[0][0]*s+h[0][1]*o+h[0][2]*f+h[0][3]>r||h[1][0]*s+h[1][1]*o+h[1][2]*f+h[1][3]>r||h[2][0]*s+h[2][1]*o+h[2][2]*f+h[2][3]>r||h[3][0]*s+h[3][1]*o+h[3][2]*f+h[3][3]>r)){var u=this.view[2]*s+this.view[6]*o+this.view[10]*f+this.view[14],d=u+r;if(!(-(u-r)<2||-d>=this.range.near))if(-d>this.looseRange.near)this.range.near=-d;else{if(r>100){var g=e.getChildren();if(void 0!==g){for(var l=0;l<8;++l)void 0!==g[l]&&this.includeNearBoundingInfoRec(g[l],t);return}}S.unionDepthRangeWithAABB(this.range,this.viewProj,t,e.getBBMin(),e.getBBMax())}}},e.prototype.includeFarBoundingInfoRec=function(e,t){var r=e.getBSRadius(),a=e.getCenter();i.vec3.transformMat4(R,a,t);var n=c.maxScale(t),s=R[0],o=R[1],f=R[2];r*=n;var h=this.frustum.planes;if(!(h[0][0]*s+h[0][1]*o+h[0][2]*f+h[0][3]>r||h[1][0]*s+h[1][1]*o+h[1][2]*f+h[1][3]>r||h[2][0]*s+h[2][1]*o+h[2][2]*f+h[2][3]>r||h[3][0]*s+h[3][1]*o+h[3][2]*f+h[3][3]>r)){var u=this.view[2]*s+this.view[6]*o+this.view[10]*f+this.view[14]-r;if(!(-u<=this.range.far))if(-u<this.looseRange.far)this.range.far=-u;else{if(r>100){var d=e.getChildren();if(void 0!==d){for(var g=0;g<8;++g)void 0!==d[g]&&this.includeFarBoundingInfoRec(d[g],t);return}}S.unionDepthRangeWithAABB(this.range,this.viewProj,t,e.getBBMin(),e.getBBMax())}}},e}();t.DepthRangeFromRenderGeometries=b;var y=function(){function e(){this.modelViewProj=n.mat4f64.create(),this.clipPosition=[f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create(),f.vec4f64.create()]}return e.prototype.unionDepthRangeWithAABB=function(e,t,r,n,i){var s=this.modelViewProj;a.mat4.multiply(s,t,r);for(var o=!1,f=0;f<8;++f){var h=this.clipPosition[f],c=0===f||3===f||4===f||7===f?n[0]:i[0],u=0===f||1===f||4===f||5===f?n[1]:i[1],d=f<4?n[2]:i[2];h[0]=s[0]*c+s[4]*u+s[8]*d+s[12],h[1]=s[1]*c+s[5]*u+s[9]*d+s[13],h[2]=s[2]*c+s[6]*u+s[10]*d+s[14],h[3]=s[3]*c+s[7]*u+s[11]*d+s[15]}for(f=0;f<12;++f){for(var g=this.clipPosition[w[f][0]],l=this.clipPosition[w[f][1]],m=this.clipPosition[w[f][2]],v=this.clipTriangle(g,l,m),p=!0,b=0;b<v.length;++b){if((y=v[b][3])>=2){p=!1;break}}if(!p){o=!0;for(b=0;b<v.length;++b){var y;(y=v[b][3])<e.near&&(e.near=y),y>e.far&&(e.far=y)}}}return o},e.prototype.inside=function(e,t){return 0===t?e[0]>=-e[3]:1===t?e[1]>=-e[3]:2===t?e[0]<=e[3]:3===t?e[1]<=e[3]:void g.assert(!1)},e.prototype.intersect=function(e,t,r){var a=0;return 0===r?a=(-e[3]-e[0])/(t[0]-e[0]+t[3]-e[3]):1===r?a=(-e[3]-e[1])/(t[1]-e[1]+t[3]-e[3]):2===r?a=(e[3]-e[0])/(t[0]-e[0]-t[3]+e[3]):3===r&&(a=(e[3]-e[1])/(t[1]-e[1]-t[3]+e[3])),o.vec4.lerp(f.vec4f64.create(),e,t,a)},e.prototype.clipTriangle=function(e,t,r){for(var a=[e,t,r],n=0;n<4;++n){var i=a;a=[];for(var s=0;s<i.length;++s){var o=i[s],f=i[(s+1)%i.length];this.inside(f,n)?(this.inside(o,n)||a.push(this.intersect(o,f,n)),a.push(f)):this.inside(o,n)&&a.push(this.intersect(o,f,n))}}return a},e}(),w=[[0,1,3],[2,3,1],[1,5,2],[6,2,5],[5,4,6],[7,6,4],[4,0,7],[3,7,0],[3,2,7],[6,7,2],[4,5,0],[1,0,5]],R=s.vec3f64.create(),B=n.mat4f64.create(),C=d.empty(),M=new p,x=new b,S=new y}));