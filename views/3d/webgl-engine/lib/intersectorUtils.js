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

define(["require","exports","../../../../core/maybe","../../../../core/libs/gl-matrix-2/mat3","../../../../core/libs/gl-matrix-2/mat3f64","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/quat","../../../../core/libs/gl-matrix-2/quatf64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f32","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../support/geometryUtils","../../support/geometryUtils/boundedPlane","../../support/geometryUtils/sphere","./Object3D"],(function(t,e,r,i,n,a,s,o,h,c,f,l,u,p,m,d,b,y){Object.defineProperty(e,"__esModule",{value:!0}),e.sliceFilterPredicate=function(t){return function(e,r,i){return c.vec3.lerp(w,e,r,i),!d.extrusionContainsPoint(t,w)}};var g=function(){this.verticalOffset=0,this.selectionMode=!1,this.hud=!0,this.selectOpaqueTerrainOnly=!0,this.invisibleTerrain=!1,this.backfacesTerrain=!0,this.storeTerrainResults=!0,this.store=2};e.IntersectorOptions=g;var v=function(){function t(){this._transform=s.mat4f64.create(),this._transformInverse=new O({value:this._transform},a.mat4.invert,s.mat4f64.create),this._transformInverseTranspose=new O(this._transformInverse,a.mat4.transpose,s.mat4f64.create),this._transformTranspose=new O({value:this._transform},a.mat4.transpose,s.mat4f64.create),this._transformInverseRotation=new O({value:this._transform},i.mat3.normalFromMat4Legacy,n.mat3f64.create)}return t.prototype.invalidateLazyTransforms=function(){this._transformInverse.invalidate(),this._transformInverseTranspose.invalidate(),this._transformTranspose.invalidate(),this._transformInverseRotation.invalidate()},Object.defineProperty(t.prototype,"transform",{get:function(){return this._transform},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inverse",{get:function(){return this._transformInverse.value},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inverseTranspose",{get:function(){return this._transformInverseTranspose.value},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inverseRotation",{get:function(){return this._transformInverseRotation.value},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"transpose",{get:function(){return this._transformTranspose.value},enumerable:!0,configurable:!0}),t.prototype.setTransformMatrix=function(t){a.mat4.copy(this._transform,t)},t.prototype.multiplyTransform=function(t){a.mat4.multiply(this._transform,this._transform,t)},t.prototype.set=function(t){a.mat4.copy(this._transform,t),this.invalidateLazyTransforms()},t.prototype.setAndInvalidateLazyTransforms=function(t,e){this.setTransformMatrix(t),this.multiplyTransform(e),this.invalidateLazyTransforms()},t}();e.IntersectorTransform=v;var O=function(){function t(t,e,r){this.original=t,this.update=e,this.dirty=!0,this.transform=r()}return t.prototype.invalidate=function(){this.dirty=!0},Object.defineProperty(t.prototype,"value",{get:function(){return this.dirty&&(this.update(this.transform,this.original.value),this.dirty=!1),this.transform},enumerable:!0,configurable:!0}),t}(),x=function(){function t(){this.min=new S,this.max=new S,this.hud=new S,this.ground=new S}return t.prototype.init=function(t){this.min.init(t),this.max.init(t),this.hud.init(t),this.ground.init(t),this.all=[]},t}();e.IntersectorResults=x;var S=function(){function t(t){this.normal=l.vec3f64.create(),this.transformation=s.mat4f64.create(),this._ray=m.ray.create(),this.init(t)}return Object.defineProperty(t.prototype,"ray",{get:function(){return this._ray},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasIntersectionPoint",{get:function(){return null!=this.dist},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"distanceInRenderSpace",{get:function(){if(null!=this.dist)return c.vec3.scale(j,this.ray.direction,this.dist),c.vec3.length(j)},enumerable:!0,configurable:!0}),t.prototype.getIntersectionPoint=function(t){return!!this.hasIntersectionPoint&&(c.vec3.scale(j,this.ray.direction,this.dist),c.vec3.add(t,this.ray.origin,j),!0)},t.prototype.getTransformedNormal=function(t){return c.vec3.copy(P,this.normal),P[3]=0,u.vec4.transformMat4(P,P,this.transformation),c.vec3.copy(t,P),c.vec3.normalize(t,t),t},t.prototype.init=function(t){this.dist=void 0,this.target=void 0,this.name=void 0,this.drapedLayerOrder=void 0,this.drapedLayerGraphicOrder=void 0,this.center=null,this.geometryId=null,this.triangleNr=null,this.intersector="Stage",t?m.ray.copy(t,this._ray):this._ray=m.ray.create()},t.prototype.set=function(t,e,r,i,n,s,o,h,f,u){t instanceof y&&(t={type:"stage",obj:t}),this.dist=r,c.vec3.copy(this.normal,i),a.mat4.copy(this.transformation,n),this.target=t,this.name=e,this.drapedLayerOrder=s,this.center=o?l.vec3f64.clone(o):null,this.geometryId=h,this.triangleNr=f,this.drapedLayerGraphicOrder=u},t.prototype.copyFrom=function(t){m.ray.copy(t._ray,this._ray),this.dist=t.dist,this.target=t.target,this.name=t.name,this.drapedLayerOrder=t.drapedLayerOrder,this.center=t.center?l.vec3f64.clone(t.center):null,this.geometryId=t.geometryId,this.triangleNr=t.triangleNr,this.intersector=t.intersector,this.drapedLayerGraphicOrder=t.drapedLayerGraphicOrder,c.vec3.copy(this.normal,t.normal),a.mat4.copy(this.transformation,t.transformation)},t.prototype.toOwner=function(t){if(!this.target)return null;switch(this.target.type){case"stage":return T(this.target.obj.metadata,t);case"external":switch(this.intersector){case"PointRenderer":return function(t,e){var r=t.metadata.layerUid;return null!=r?e.map.findLayerByUid(r):null}(this.target,t);case"I3S":case"IM":case"LodRenderer":case"OverlayRenderer":return T(this.target.metadata,t);case"TerrainRenderer":return t.map&&t.map.ground}}return null},t.prototype.toGraphic=function(t){if(!this.target)return null;switch(this.target.type){case"stage":return I(this.target.obj.metadata,t);case"external":switch(this.intersector){case"PointRenderer":return this.target.metadata.createGraphic();case"I3S":case"IM":case"LodRenderer":case"OverlayRenderer":return I(this.target.metadata,t)}}return null},t}();function T(t,e){return r.isNone(t)||null==t.layerUid?null:r.isSome(e.graphicsView)&&t.layerUid===e.graphicsView.mockLayerId?e.graphics:e.map.findLayerByUid(t.layerUid)}function I(t,e){if(r.isNone(t))return null;var i=T(t,e);if(r.isNone(i))return null;if(i===e.graphics)return r.isSome(e.graphicsView)?r.expect(e.graphicsView.getGraphicFromGraphicUid(t.graphicUid)):null;var n=e.allLayerViews.find((function(t){return t.layer===i}));return n?function(t,e){if(!t||t.suspended)return null;if("getGraphicFromIntersectorMetadata"in t&&e)return t.getGraphicFromIntersectorMetadata(e);if("getGraphicFromGraphicUid"in t&&null!=e.graphicUid)return t.getGraphicFromGraphicUid(e.graphicUid);return null}(n,t):null}e.IntersectorResult=S;var z=function(){function t(t){void 0===t&&(t=0),this.offset=t,this.tmpVertex=l.vec3f64.create()}return t.prototype.applyToVertex=function(t,e,r){var i=t+this.localOrigin[0],n=e+this.localOrigin[1],a=r+this.localOrigin[2],s=this.offset/Math.sqrt(i*i+n*n+a*a);return this.tmpVertex[0]=t+i*s,this.tmpVertex[1]=e+n*s,this.tmpVertex[2]=r+a*s,this.tmpVertex},t.prototype.applyToAABB=function(t){var e=t[0]+this.localOrigin[0],r=t[1]+this.localOrigin[1],i=t[2]+this.localOrigin[2],n=t[3]+this.localOrigin[0],a=t[4]+this.localOrigin[1],s=t[5]+this.localOrigin[2],o=this.offset/Math.sqrt(e*e+r*r+i*i);t[0]+=e*o,t[1]+=r*o,t[2]+=i*o;var h=this.offset/Math.sqrt(n*n+a*a+s*s);return t[3]+=n*h,t[4]+=a*h,t[5]+=s*h,t},t}();e.TerrainVerticalOffsetGlobalViewingMode=z;var M=function(){function t(t){void 0===t&&(t=0),this.offset=t,this.componentLocalOriginLength=0,this.tmpVertex=l.vec3f64.create(),this.mbs=p.vec4f64.create(),this.obb={center:l.vec3f64.create(),halfSize:f.vec3f32.create(),quaternion:null}}return Object.defineProperty(t.prototype,"localOrigin",{set:function(t){this.componentLocalOriginLength=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2])},enumerable:!0,configurable:!0}),t.prototype.applyToVertex=function(t,e,r){var i=t,n=e,a=r+this.componentLocalOriginLength,s=this.offset/Math.sqrt(i*i+n*n+a*a);return this.tmpVertex[0]=t+i*s,this.tmpVertex[1]=e+n*s,this.tmpVertex[2]=r+a*s,this.tmpVertex},t.prototype.applyToAABB=function(t){var e=t[0],r=t[1],i=t[2]+this.componentLocalOriginLength,n=t[3],a=t[4],s=t[5]+this.componentLocalOriginLength,o=this.offset/Math.sqrt(e*e+r*r+i*i);t[0]+=e*o,t[1]+=r*o,t[2]+=i*o;var h=this.offset/Math.sqrt(n*n+a*a+s*s);return t[3]+=n*h,t[4]+=a*h,t[5]+=s*h,t},t.prototype.applyToMbs=function(t){var e=Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]),r=this.offset/e;return this.mbs[0]=t[0]+t[0]*r,this.mbs[1]=t[1]+t[1]*r,this.mbs[2]=t[2]+t[2]*r,this.mbs[3]=t[3]+t[3]*this.offset/e,this.mbs},t.prototype.applyToObb=function(t){var e=t.center,r=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);this.obb.center[0]=e[0]+e[0]*r,this.obb.center[1]=e[1]+e[1]*r,this.obb.center[2]=e[2]+e[2]*r,c.vec3.transformQuat(this.obb.halfSize,t.halfSize,t.quaternion),c.vec3.add(this.obb.halfSize,this.obb.halfSize,t.center);var i=this.offset/Math.sqrt(this.obb.halfSize[0]*this.obb.halfSize[0]+this.obb.halfSize[1]*this.obb.halfSize[1]+this.obb.halfSize[2]*this.obb.halfSize[2]);return this.obb.halfSize[0]+=this.obb.halfSize[0]*i,this.obb.halfSize[1]+=this.obb.halfSize[1]*i,this.obb.halfSize[2]+=this.obb.halfSize[2]*i,c.vec3.subtract(this.obb.halfSize,this.obb.halfSize,t.center),o.quat.conjugate(G,t.quaternion),c.vec3.transformQuat(this.obb.halfSize,this.obb.halfSize,G),this.obb.halfSize[0]*=this.obb.halfSize[0]<0?-1:1,this.obb.halfSize[1]*=this.obb.halfSize[1]<0?-1:1,this.obb.halfSize[2]*=this.obb.halfSize[2]<0?-1:1,this.obb.quaternion=t.quaternion,this.obb},t}();e.I3SVerticalOffsetGlobalViewingMode=M;var V=function(){function t(t){void 0===t&&(t=0),this.offset=t,this.sphere=b.create(),this.tmpVertex=l.vec3f64.create()}return t.prototype.applyToVertex=function(t,e,r){var i=this.objectTransform.transform,n=i[0]*t+i[4]*e+i[8]*r+i[12],a=i[1]*t+i[5]*e+i[9]*r+i[13],s=i[2]*t+i[6]*e+i[10]*r+i[14],o=this.offset/Math.sqrt(n*n+a*a+s*s);n+=n*o,a+=a*o,s+=s*o;var h=this.objectTransform.inverse;return this.tmpVertex[0]=h[0]*n+h[4]*a+h[8]*s+h[12],this.tmpVertex[1]=h[1]*n+h[5]*a+h[9]*s+h[13],this.tmpVertex[2]=h[2]*n+h[6]*a+h[10]*s+h[14],this.tmpVertex},t.prototype.applyToMinMax=function(t,e){var r=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]+=t[0]*r,t[1]+=t[1]*r,t[2]+=t[2]*r;var i=this.offset/Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]);e[0]+=e[0]*i,e[1]+=e[1]*i,e[2]+=e[2]*i},t.prototype.applyToAABB=function(t){var e=this.offset/Math.sqrt(t[0]*t[0]+t[1]*t[1]+t[2]*t[2]);t[0]+=t[0]*e,t[1]+=t[1]*e,t[2]+=t[2]*e;var r=this.offset/Math.sqrt(t[3]*t[3]+t[4]*t[4]+t[5]*t[5]);return t[3]+=t[3]*r,t[4]+=t[4]*r,t[5]+=t[5]*r,t},t.prototype.applyToBoundingSphere=function(t,e){var r=Math.sqrt(e[0]*e[0]+e[1]*e[1]+e[2]*e[2]),i=this.offset/r;return this.sphere.center[0]=e[0]+e[0]*i,this.sphere.center[1]=e[1]+e[1]*i,this.sphere.center[2]=e[2]+e[2]*i,this.sphere.radius=t+t*this.offset/r,this.sphere},t}();e.Object3DVerticalOffsetGlobalViewingMode=V;var _=new V;e.getVerticalOffsetObject3D=function(t){return r.isSome(t)?(_.offset=t,_):null};var L=new M;e.getVerticalOffsetI3S=function(t){return r.isSome(t)?(L.offset=t,L):null};var q=new z;e.getVerticalOffsetTerrain=function(t){return r.isSome(t)?(q.offset=t,q):null},e.TERRAIN_ID="terrain";var w=l.vec3f64.create(),j=l.vec3f64.create(),P=p.vec4f64.create(),G=h.quatf64.create()}));