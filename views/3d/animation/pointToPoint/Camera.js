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

define(["require","exports","../../../../core/mathUtils","../../../../core/libs/gl-matrix-2/mat3","../../../../core/libs/gl-matrix-2/mat3f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/mathUtils"],(function(t,e,o,i,c,a,r,s){Object.defineProperty(e,"__esModule",{value:!0});var n=r.vec3f64.create(),h=r.vec3f64.create(),p=r.vec3f64.create(),v=r.vec3f64.create(),l=r.vec3f64.create(),d=r.vec3f64.create(),u={upward:r.vec3f64.fromValues(0,0,1),forward:r.vec3f64.fromValues(0,1,0),sideway:r.vec3f64.fromValues(1,0,0)},y=c.mat3f64.create(),f=function(){function t(t){void 0===t&&(t="global"),this.viewingMode=t,this.center=r.vec3f64.create(),this.pitch=0,this.yaw=0,this.distance=0,this.lookAtDirection=r.vec3f64.clone(u.forward)}return t.prototype.pixelsPerPanAtZoom=function(t){return this.size/2/(this._zoomToPanScale*t)},t.prototype.zoomAtPixelsPerPan=function(t){return this.size/2/(this._zoomToPanScale*t)},t.prototype.pixelsPerRotateAtZoom=function(){var t=Math.max(Math.cos(Math.abs(this.pitch)),.5);return this.size/2/t},t.prototype.compareTo=function(t,e){if(e||(e={pan:0,rotate:0,sourceZoom:0,targetZoom:0}),"global"===this.viewingMode){var o=(a.vec3.length(this.center)+a.vec3.length(t.center))/2;e.pan=s.angle(this.center,t.center)*o}else e.pan=a.vec3.distance(this.center,t.center);var i=Math.abs(t.yaw-this.yaw);i>=Math.PI&&(i=2*Math.PI-i);var c=Math.abs(t.pitch-this.pitch);return e.rotate=Math.max(i,c),e.sourceZoom=this.distance,e.targetZoom=t.distance,e},t.prototype.interpolate=function(t,e,i){"global"===this.viewingMode?s.slerp(t.center,e.center,i.pan,this.center):a.vec3.lerp(this.center,t.center,e.center,i.pan),this.distance=o.lerp(t.distance,e.distance,i.zoom),this.pitch=o.lerp(t.pitch,e.pitch,i.rotate);var c=t.yaw,r=e.yaw;Math.abs(r-c)>=Math.PI&&(c+=2*(c<r?1:-1)*Math.PI),this.yaw=o.lerp(c,r,i.rotate)},t.prototype.copyFrom=function(t){a.vec3.copy(this.center,t.center),this.pitch=t.pitch,this.yaw=t.yaw,this.distance=t.distance,a.vec3.copy(this.lookAtDirection,t.lookAtDirection),this.size=t.size,this.copyFromCommon(t),this.viewingMode=t.viewingMode},t.prototype.copyFromRenderCamera=function(t){var e=this._lookAtOrientation(t.center,y);a.vec3.copy(this.center,t.center),a.vec3.subtract(v,t.center,t.eye),a.vec3.transformMat3(v,v,e),a.vec3.transformMat3(l,t.up,e),this.distance=a.vec3.length(v),v[0]/=this.distance,v[1]/=this.distance,v[2]/=this.distance,this.pitch=this._eyeUpToPitch(v),this.yaw=this._eyeUpToYaw(v,l),this.size=Math.sqrt(t.width*t.width+t.height*t.height),this.copyFromCommon(t)},t.prototype.copyFromCommon=function(t){this.fov=t.fov,this._zoomToPanScale=Math.atan(.5*this.fov)},t.prototype.copyToRenderCamera=function(t){var e=this._lookAtOrientation(this.center,y);i.mat3.transpose(e,e),this._axisAngleVec3(u.sideway,this.pitch-Math.PI/2,u.forward,v),this._axisAngleVec3(u.upward,this.yaw,v),this._axisAngleVec3(u.sideway,this.pitch-Math.PI/2,u.upward,l),this._axisAngleVec3(u.upward,this.yaw,l),a.vec3.scale(v,v,this.distance),a.vec3.transformMat3(v,v,e),a.vec3.transformMat3(l,l,e),t.center=this.center,t.eye=a.vec3.subtract(v,this.center,v),t.up=l},t.prototype._axisAngleVec3=function(t,e,o,i){void 0===i&&(i=o);var c=Math.cos(e),r=Math.sin(e);return a.vec3.scale(n,o,c),a.vec3.cross(h,t,o),a.vec3.scale(h,h,r),a.vec3.scale(p,t,(1-c)*a.vec3.dot(t,o)),a.vec3.add(i,a.vec3.add(i,n,h),p)},t.prototype._lookAtOrientation=function(t,e){return this._upAtLookAt(t,p),a.vec3.cross(n,this.lookAtDirection,p),a.vec3.normalize(n,n),0===n[0]&&0===n[1]&&0===n[2]&&a.vec3.copy(n,u.sideway),a.vec3.cross(h,p,n),a.vec3.normalize(h,h),e||(e=c.mat3f64.create()),e[0]=n[0],e[1]=h[0],e[2]=p[0],e[3]=n[1],e[4]=h[1],e[5]=p[1],e[6]=n[2],e[7]=h[2],e[8]=p[2],e},t.prototype._upAtLookAt=function(t,e){return"local"===this.viewingMode?a.vec3.copy(e,u.upward):a.vec3.normalize(e,t)},t.prototype._eyeUpToPitch=function(t){return Math.PI-s.angle(u.upward,t)},t.prototype._eyeUpToYaw=function(t,e){var o=d;return Math.abs(e[2])<.5?(a.vec3.copy(o,e),t[2]>0&&a.vec3.scale(o,o,-1)):a.vec3.copy(o,t),a.vec3.cross(h,o,u.upward),a.vec3.normalize(h,h),s.angle(u.sideway,h,u.upward)},t}();e.default=f}));