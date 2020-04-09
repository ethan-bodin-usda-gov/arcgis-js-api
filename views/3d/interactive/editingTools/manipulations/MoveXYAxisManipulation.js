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

define(["require","exports","../../../../../core/tsSupport/decorateHelper","../../../../../core/tsSupport/extendsHelper","../../../../../core/tsSupport/generatorHelper","../../../../../core/tsSupport/awaiterHelper","../../../../../Color","../../../../../core/Evented","../../../../../core/Handles","../../../../../core/handleUtils","../../../../../core/maybe","../../../../../core/libs/gl-matrix-2/mat4","../../../../../core/libs/gl-matrix-2/mat4f64","../../../../../core/libs/gl-matrix-2/vec3","../../../../../core/libs/gl-matrix-2/vec3f64","../../../../../support/elevationInfoUtils","../../Manipulator3D","../manipulatorDragUtils","../settings","./config","./Manipulation","./moveUtils","../../../support/stack","../../../webgl-engine/lib/Geometry","../../../webgl-engine/lib/GeometryUtil","../../../webgl-engine/materials/ColorMaterial"],(function(t,e,a,r,o,n,i,l,s,u,p,c,f,d,m,g,h,_,v,M,y,w,b,A,I,S){Object.defineProperty(e,"__esModule",{value:!0});var D=function(t){function e(e){var a=t.call(this)||this;return a._handles=new s,a._arrowManipulatorInfos=new Array,a._opaqueMaterial=a.createMaterial(),a._transparentMaterial=a.createMaterial(.5),a._angle=0,a._scale=1,a._radius=M.DISC_RADIUS,a._updateAfterDrag=!1,a.events=new l,a._tool=e.tool,a._view=e.view,null!=e.radius&&(a._radius=e.radius),a._createManipulators(),a.forEachManipulator((function(t){return a._tool.manipulators.add(t)})),a}return r(e,t),Object.defineProperty(e.prototype,"orthogonalAvailable",{set:function(t){this._arrowManipulatorInfos[1].manipulator.available=t,this._arrowManipulatorInfos[3].manipulator.available=t},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){var t=this;this.forEachManipulator((function(e){t._tool.manipulators.remove(e),e.destroy()})),this._handles.removeAll(),this._tool=null,this._view=null,this._arrowManipulatorInfos.length=0},e.prototype.forEachManipulator=function(t){this._arrowManipulatorInfos.map((function(e){var a=e.manipulator;return t(a,1)}))},e.prototype.createGraphicDragPipeline=function(t,e){var a=this,r=t.graphic,o=g.getGraphicEffectiveElevationInfo(r),n=p.expect(r.geometry).spatialReference;return w.createGraphicMoveDragPipeline(t,e,(function(t){return a.createDragPipeline(t,o,n)}))},e.prototype.createDragPipeline=function(t,e,a){var r=this;return u.handlesGroup(this._arrowManipulatorInfos.map((function(o,n){var i=o.manipulator;return _.createManipulatorDragEventPipeline(i,(function(o,i,l,s){var u=i.next(_.screenToMapXYAtLocation(r._view,o.elevationAlignedLocation,e,a)).next(_.constrainToMapAxis(o.location,r.angle+(n+1)*Math.PI*.5)).next(_.addScreenDelta());t(o,u,l,s)}))})))},Object.defineProperty(e.prototype,"angle",{get:function(){return this._angle},set:function(t){this._angle=t,this.dragging?this._updateAfterDrag=!0:this._updateManipulatorTransform()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"displayScale",{get:function(){return this._scale},set:function(t){this._scale=t,this._updateManipulatorTransform()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"radius",{get:function(){return this._radius},set:function(t){this._radius!==t&&(this._radius=t,this._updateManipulators())},enumerable:!0,configurable:!0}),e.prototype._updateManipulators=function(){for(var t=0;t<this._arrowManipulatorInfos.length;t++)this._updateArrowManipulator(this._arrowManipulatorInfos[t],t)},e.prototype._updateArrowManipulator=function(t,e){var a=t.manipulator,r=t.transform,o=this._radius/M.DISC_RADIUS,n=M.DISC_TRANSLATE_ARROW_SIZE*o,i=Math.sqrt(n*n*3/4),l=I.createExtrudedTriangle(i,n/2,n/2,M.DISC_HEIGHT);I.transformInPlace(l,c.mat4.fromTranslation(b.sm4d.get(),d.vec3.set(b.sv3d.get(),0,-i/3,0)));var s=new A(l,"move-xy-axis-arrow");a.renderObjects=[{geometry:s,material:this._opaqueMaterial,stateMask:2},{geometry:s,material:this._transparentMaterial,stateMask:1}],a.radius=i/3*2*1.2;var u=c.mat4.identity(b.sm4d.get());c.mat4.fromZRotation(u,e*Math.PI/2);var p=c.mat4.identity(b.sm4d.get());c.mat4.fromTranslation(p,d.vec3.set(b.sv3d.get(),0,M.DISC_TRANSLATE_ARROW_OFFSET*o,0)),c.mat4.multiply(r,u,p)},e.prototype._createManipulators=function(){for(var t=0;t<4;t++){var e=this._createArrowManipulator(t);this._arrowManipulatorInfos.push(e)}this._updateManipulatorTransform()},e.prototype._updateManipulatorTransform=function(){var t=this.angle,e=c.mat4.identity(b.sm4d.get());c.mat4.rotate(e,e,t,m.vec3f64.fromValues(0,0,1));var a=c.mat4.fromScaling(b.sm4d.get(),d.vec3.set(b.sv3d.get(),this.displayScale,this.displayScale,this.displayScale)),r=c.mat4.identity(b.sm4d.get());c.mat4.multiply(r,a,e);for(var o=0,n=this._arrowManipulatorInfos;o<n.length;o++){var i=n[o],l=c.mat4.multiply(b.sm4d.get(),r,i.transform);i.manipulator.modelTransform=l}},e.prototype._createArrowManipulator=function(t){var e=this,a=new h.Manipulator3D({view:this._view,autoScaleRenderObjects:!1,worldOriented:!0,focusMultiplier:1,touchMultiplier:1,collisionType:{type:"disc",direction:m.vec3f64.fromValues(0,0,1)}}),r={manipulator:a,transform:f.mat4f64.create()};return this._updateArrowManipulator(r,t),this._handles.add(a.events.on("drag",(function(t){e._updateAfterDrag&&"end"===t.action&&!e.dragging&&(e._updateManipulatorTransform(),e._updateAfterDrag=!1)}))),r},e.prototype.createMaterial=function(t){void 0===t&&(t=1);var e=i.toUnitRGBA(v.colors.main);e[3]*=t;var a=new S({color:e,transparent:1!==t,cullFace:2},"graphic-transform");return a.renderOccluded=2,a},Object.defineProperty(e.prototype,"test",{get:function(){return{arrowManipulators:this._arrowManipulatorInfos.map((function(t){return t.manipulator}))}},enumerable:!0,configurable:!0}),e}(y.Manipulation);e.MoveXYAxisManipulation=D}));