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

define(["require","exports","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../Camera","../../../geometry","../../../Graphic","../../../Viewpoint","../../../core/asyncUtils","../../../core/compilerUtils","../../../core/Error","../../../core/maybe","../../../core/promiseUtils","../../../core/libs/gl-matrix-2/mat3","../../../core/libs/gl-matrix-2/mat3f64","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../geometry/support/aaBoundingBox","../../../geometry/support/aaBoundingRect","../../../geometry/support/webMercatorUtils","../camera/intersectionUtils","./cameraUtils","./ElevationProvider","./geometryUtils","./mathUtils","./projectionUtils"],(function(e,t,r,a,n,i,o,c,s,l,u,m,f,v,p,g,h,d,y,x,w,b,R,T,G,S,A){function z(e){return 360-S.cyclicalDeg.normalize(e)}function E(e){return S.cyclicalDeg.normalize(360-e)}function P(e,t){return e&&e.resolver&&(null==t?e.resolver.reject():e.resolver.resolve(t)),t}function C(e,t,r,a){if(!t)return P(a);var n=e.spatialReference||i.SpatialReference.WGS84;if(t.camera){var o=t.get("camera.position.spatialReference");if(!w.canProject(o,n))return P(a);var c=t.camera.clone();return o.equals(n)||(c.position=w.project(c.position,n)),P(a,c)}var s=t.get("targetGeometry.spatialReference");if(s&&!w.canProject(s,n))return P(a);var l=R.internalToExternal(e,e.state.camera),u=1;if(null!=t.rotation&&(l.heading=z(t.rotation),u=0),null!=r&&(l.tilt=r),"point"===t.targetGeometry.type){var m=t.targetGeometry,f=void 0,v=t.targetGeometry.clone();return f=null!=t.scale?R.scaleToDistance(e,t.scale,m.latitude):e.state.camera.distance,R.fromCenterDistance(e,v,f,l,u,a)}var p=t.targetGeometry.extent;return R.fromExtent(e,p,l.heading,l.tilt,u,a)}function M(e,t){return null==t.scale&&null!=t.zoom?R.zoomToScale(e,t.zoom):t.scale}function B(e,t){var r=!1;return null!=t.heading?(e.heading=t.heading,r=!0):null!=t.rotation&&(e.heading=z(t.rotation),r=!0),null!=t.tilt&&(e.tilt=t.tilt,r=!0),null!=t.fov&&(e.fov=t.fov),r}function F(e,t,r){var a=e.spatialReference||i.SpatialReference.WGS84;return t=t||R.externalToInternal(e,r.camera),r.targetGeometry=A.vectorToPoint(t.center,e.renderSpatialReference,a),r.scale=R.computeScale(e,t),r.rotation=E(r.camera.heading),r}function V(e,t,r){if(t){if(!w.canProject(t.spatialReference,e.spatialReference))throw new u("viewpointutils:incompatible-spatialreference","Spatial reference ("+(t.spatialReference?t.spatialReference.wkid:"unknown")+") is incompatible with the view ("+e.spatialReference.wkid+")",{geometry:t});var a=[];if(!t.hasZ&&e.basemapTerrain){var n=void 0;switch(t.type){case"point":n=t;break;case"multipoint":case"polyline":case"mesh":n=t.extent.center;break;case"extent":n=t.center;break;case"polygon":n=t.centroid;break;default:l.neverReached(t)}n&&w.canProject(n,e.basemapTerrain.spatialReference)?L[2]=T.getElevationAtPoint(e.elevationProvider,n)||0:L[2]=0}(0,re[t.type])(t,(function(e){a.push(e[0],e[1],e[2])}),L);var i=a.length/3;if(0!==i){var o=new Array(a.length);if(A.bufferToBuffer(a,t.spatialReference,0,o,e.spatialReference,0,i)){t.hasZ&&(r.hasZ=!0);for(var c=0;c<o.length;c+=3)t.hasZ?(L[0]=o[c+0],L[1]=o[c+1],L[2]=o[c+2]):(L[0]=o[c+0],L[1]=o[c+1]),y.expand(r.boundingBox,L)}}}}function j(e,t,n,i){return a(this,void 0,void 0,(function(){var a,o,c,l,u,f;return r(this,(function(r){switch(r.label){case 0:return[4,s.result(e.whenViewForGraphic(t))];case 1:return!1!==(a=r.sent()).ok&&!m.isNone(a.value)&&"whenGraphicBounds"in a.value?(o=a.value,[4,s.result(o.whenGraphicBounds(t,{minDemResolution:n}))]):(V(e,t.geometry,i),[2]);case 2:return!1===(c=r.sent()).ok?(V(e,t.geometry,i),[2]):(l=c.value,u=l.screenSpaceObjects,f=l.boundingBox,y.expand(i.boundingBox,f),u&&u.forEach((function(e){i.screenSpaceObjects.push(e)})),isFinite(f[2])&&(i.hasZ=!0),[2])}}))}))}function D(e,t,n,c){return a(this,void 0,void 0,(function(){var a,s;return r(this,(function(r){switch(r.label){case 0:return Array.isArray(t)&&2===t.length&&(a=t[0],s=t[1],"number"==typeof a&&"number"==typeof s)?(te.x=a,te.y=s,te.z=void 0,te.spatialReference=e.spatialReference.isGeographic?e.spatialReference:i.SpatialReference.WGS84,V(e,te,c),[2]):t&&"function"==typeof t.map?[4,f.eachAlways(t.map((function(t){return D(e,t,n,c)})))]:[3,2];case 1:return r.sent(),[2];case 2:return t instanceof i.BaseGeometry?(V(e,t,c),[3,5]):[3,3];case 3:return t instanceof o?[4,j(e,t,n,c)]:[3,5];case 4:r.sent(),r.label=5;case 5:return[2]}}))}))}function Z(e,t,n,i,o){return a(this,void 0,void 0,(function(){var a,c,s;return r(this,(function(r){switch(r.label){case 0:return t.camera?[2,O(e,t.camera,o)]:(o.scale=t.scale,o.rotation=t.rotation,o.targetGeometry=t.targetGeometry?t.targetGeometry.clone():null,o.camera=null,null!=n.heading?o.rotation=E(n.heading):null!=n.rotation&&(o.rotation=n.rotation),null!=(a=M(e,n))&&(o.scale=a),c=R.createAsyncContext(i),C(e,o,n.tilt,c),s=o,[4,c.resolver.promise]);case 1:return s.camera=r.sent(),[2,o]}}))}))}function O(e,t,r){r.camera=t.clone(),r.camera.fov=e.camera.fov;var a=e.spatialReference,n=r.camera.position.spatialReference;return w.canProject(n,a)?(n.equals(a)||(r.camera.position=w.project(r.camera.position,a)),F(e,null,r)):null}function U(e,t,r,a,n){var o=e.renderSpatialReference;return A.pointToVector(r.position,Q,o),A.pointToVector(t,$,o),n.targetGeometry=new i.Point(t),n.camera.position=new i.Point(r.position),h.vec3.subtract(K,$,Q),R.directionToHeadingTilt(e,Q,K,a.up,n.camera),n.scale=R.distanceToScale(e,h.vec3.distance(Q,$),n.targetGeometry.latitude),n.rotation=E(n.camera.heading),n}function k(e,t,n,i,o){return a(this,void 0,void 0,(function(){var a,c,s,l,m,f;return r(this,(function(r){switch(r.label){case 0:if(!n)throw new u("createfromcenter","invalid point");return o.targetGeometry=n.clone(),a=b.cameraOnContentAlongViewDirection(e),t.position?[2,U(e,o.targetGeometry,t,a,o)]:(t.zoomFactor&&(c=a.distance/t.zoomFactor,s=h.vec3.scale(L,a.viewForward,-c),h.vec3.add(a.eye,a.center,s),a.markViewDirty(),o.scale=R.distanceToScale(e,c,n.latitude)),R.internalToExternal(e,a,o.camera),l=B(o.camera,t)?0:1,t.zoomFactor?[3,2]:(o.scale=M(e,t),null==o.scale&&(A.pointToVector(n,L,e.renderSpatialReference),G.frustum.intersectsPoint(a.frustum.planes,L)?o.scale=R.distanceToScale(e,h.vec3.distance(a.eye,L),n.latitude):o.scale=R.computeScale(e,a)),m=R.createAsyncContext(i),R.fromCenterScale(e,o.targetGeometry,o.scale,o.camera,l,m),f=o,[4,m.resolver.promise]));case 1:f.camera=r.sent(),r.label=2;case 2:return[2,o]}}))}))}function _(e,t,r){var a=b.cameraOnContentAlongViewDirection(e);return h.vec3.copy(K,a.viewForward),R.directionToHeadingTilt(e,a.eye,K,a.up,ee),r.camera.position=new i.Point(t.position),r.camera.heading=null!=t.heading?t.heading:ee.heading,r.camera.tilt=null!=t.tilt?t.tilt:ee.tilt,F(e,null,r)}function I(e,t,n,i){return a(this,void 0,void 0,(function(){var a,o;return r(this,(function(r){return a=b.cameraOnContentAlongViewDirection(e),o=A.vectorToPoint(a.center,e.renderSpatialReference,te,e.spatialReference),[2,k(e,t,o,n,i)]}))}))}function H(e,t,n,i,o){return a(this,void 0,void 0,(function(){var a,c,s,l;return r(this,(function(r){switch(r.label){case 0:return o.targetGeometry=n.clone(),a=b.cameraOnContentAlongViewDirection(e),R.internalToExternal(e,a,o.camera),c=B(o.camera,t)?0:1,s=R.createAsyncContext(i),R.fromExtent(e,n,o.camera.heading,o.camera.tilt,c,s),l=o,[4,s.resolver.promise];case 1:return l.camera=r.sent(),[2,o]}}))}))}function N(e,t,n,i,o,c,s){return a(this,void 0,void 0,(function(){var a,l,u,m,f;return r(this,(function(r){switch(r.label){case 0:return s.targetGeometry=n.clone(),a=b.cameraOnContentAlongViewDirection(e),l=function(e,t,r,a,n){var i=0;r.hasZ?i=r.z:e.basemapTerrain&&(i=T.getElevationAtPoint(e.elevationProvider,r)),h.vec3.set(L,r.x,r.y,i),A.computeLinearTransformation(e.spatialReference,L,W,e.renderSpatialReference),v.mat3.fromMat4(Y,W),v.mat3.transpose(Y,Y),y.empty(X);for(var o=[[0,1,2],[3,1,2],[0,4,2],[3,4,2],[0,1,5],[3,1,5],[0,4,5],[3,4,5]],c=0;c<o.length;c++){var s=o[c],l=a[s[2]];isFinite(l)||(l=i),h.vec3.set(L,a[s[0]],a[s[1]],l),A.vectorToVector(L,e.spatialReference,L,e.renderSpatialReference),y.expand(X,h.vec3.transformMat3(L,L,Y))}var u=y.width(X),m=y.height(X),f=y.depth(X),p=1/Math.tan(t.fovX/2),g=1/Math.tan(t.fovY/2),d=.5*Math.sqrt(u*u+f*f)*Math.max(g,p)+.5*m,x=.5*m*g+.5*Math.max(u,f);return Math.max(d,x)/n}(e,a,n,i,o),R.internalToExternal(e,a,s.camera),u=B(s.camera,t)?0:1,s.scale=R.distanceToScale(e,l,s.targetGeometry.latitude),m=R.createAsyncContext(c),R.fromCenterScale(e,s.targetGeometry,s.scale,s.camera,u,m),f=s,[4,m.resolver.promise];case 1:return f.camera=r.sent(),[2,s]}}))}))}function q(e){return e&&(e.rotation=E(e.camera.heading)),e}Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_FRAME_COVERAGE=.66,t.rotationToHeading=z,t.headingToRotation=E,t.toCamera=C,t.fromInternalCamera=function(e,t,r){return r||(r=new c({camera:new n})),R.internalToExternal(e,t,r.camera),F(e,t,r)},t.fromCamera=function(e,t,r){return r||(r=new c),r.camera=t.clone(),F(e,null,r)},t.create=function(e,o,s){return a(this,void 0,void 0,(function(){var a,l,m,f,v,p,g,h,d,w,b,T;return r(this,(function(r){switch(r.label){case 0:if(!(a=function(e,t){if(!t||!e.spatialReference)return null;var r={target:null};if("declaredClass"in t||Array.isArray(t))r.target=t;else{for(var a in t)r[a]=t[a];t.center&&!r.target&&(r.target=t.center)}return r}(e,o)))throw new u("viewpointutils-create:no-target","Missing target for creating viewpoint");return l=new c({camera:new n({fov:e.camera.fov})}),a.target instanceof c?[4,Z(e,a.target,a,s,l)]:[3,2];case 1:return[2,q(r.sent())];case 2:return a.target instanceof n?[2,q(O(e,a.target,l))]:(m=null!=a.scale||null!=a.zoom,a.target instanceof i.Extent?(h=a.target.xmin===a.target.xmax||a.target.ymin===a.target.ymax,m||h?(f=q,[4,k(e,a,a.target.center,s,l)]):[3,4]):[3,6]);case 3:return[2,f.apply(void 0,[r.sent()])];case 4:return v=q,[4,H(e,a,a.target,s,l)];case 5:return[2,v.apply(void 0,[r.sent()])];case 6:return p={boundingBox:y.empty(),hasZ:!1,screenSpaceObjects:[]},g=m?function(e,t){return R.scaleToResolution(e,M(e,t))}(e,a):void 0,[4,D(e,a.target,g,p)];case 7:return r.sent(),isFinite(p.boundingBox[0])?(y.center(p.boundingBox,L),te.x=L[0],te.y=L[1],te.z=L[2],te.spatialReference=e.spatialReference,h=void 0,isFinite(te.z)&&p.hasZ?h=y.isPoint(p.boundingBox):(te.z=void 0,h=x.isPoint(y.toRect(p.boundingBox,J))),m||h?(d=q,[4,k(e,a,te,s,l)]):[3,9]):[3,11];case 8:return[2,d.apply(void 0,[r.sent()])];case 9:return w=function(e,r){var a=t.DEFAULT_FRAME_COVERAGE;if(!r.length)return a;for(var n=Number.NEGATIVE_INFINITY,i=0;i<r.length;i++){var o=r[i].screenSpaceBoundingRect;n=Math.max(n,Math.abs(o[0]),Math.abs(o[1]),Math.abs(o[2]),Math.abs(o[3]))}var c=Math.min(e.width,e.height);return a-n/c*2}(e,p.screenSpaceObjects),b=q,[4,N(e,a,te,p.boundingBox,w,s,l)];case 10:return[2,b.apply(void 0,[r.sent()])];case 11:return a.position?[2,q(_(e,a,l))]:(T=q,[4,I(e,a,s,l)]);case 12:return[2,T.apply(void 0,[r.sent()])]}}))}))};var L=d.vec3f64.create(),W=g.mat4f64.create(),Y=p.mat3f64.create(),X=y.create(),J=x.create(),K=d.vec3f64.create(),Q=d.vec3f64.create(),$=d.vec3f64.create(),ee={heading:0,tilt:0},te=new i.Point,re={point:function(e,t,r){r[0]=e.x,r[1]=e.y,e.hasZ&&(r[2]=e.z),t(r)},polygon:function(e,t,r){for(var a=e.hasZ,n=0;n<e.rings.length;n++)for(var i=e.rings[n],o=0;o<i.length;o++)r[0]=i[o][0],r[1]=i[o][1],a&&(r[2]=i[o][2]),t(r)},polyline:function(e,t,r){for(var a=e.hasZ,n=0;n<e.paths.length;n++)for(var i=e.paths[n],o=0;o<i.length;o++)r[0]=i[o][0],r[1]=i[o][1],a&&(r[2]=i[o][2]),t(r)},multipoint:function(e,t,r){for(var a=e.points,n=e.hasZ,i=0;i<a.length;i++)r[0]=a[i][0],r[1]=a[i][1],n&&(r[2]=a[i][2]),t(r)},extent:function(e,t,r){e.hasZ?(t(h.vec3.set(r,e.xmin,e.ymin,e.zmin)),t(h.vec3.set(r,e.xmax,e.ymin,e.zmin)),t(h.vec3.set(r,e.xmin,e.ymax,e.zmin)),t(h.vec3.set(r,e.xmax,e.ymax,e.zmin)),t(h.vec3.set(r,e.xmin,e.ymin,e.zmax)),t(h.vec3.set(r,e.xmax,e.ymin,e.zmax)),t(h.vec3.set(r,e.xmin,e.ymax,e.zmax)),t(h.vec3.set(r,e.xmax,e.ymax,e.zmax))):(t(h.vec3.set(r,e.xmin,e.ymin,r[2])),t(h.vec3.set(r,e.xmax,e.ymin,r[2])),t(h.vec3.set(r,e.xmin,e.ymax,r[2])),t(h.vec3.set(r,e.xmax,e.ymax,r[2])))},mesh:function(e,t,r){var a=e.vertexAttributes&&e.vertexAttributes.position;if(a)for(var n=0;n<a.length;n+=3)t(h.vec3.set(r,a[n+0],a[n+1],a[n+2]))}}}));