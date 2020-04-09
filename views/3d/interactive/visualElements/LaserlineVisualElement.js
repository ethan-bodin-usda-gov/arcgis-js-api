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

define(["require","exports","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/maybe","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/geometryUtils","../../support/LaserLineRenderer","../../webgl-engine/shaders/Laserlines.glsl"],(function(e,t,n,i,r,s,h,o,l,a){Object.defineProperty(t,"__esModule",{value:!0});var c=function(){function e(e){this.view=null,this._angleCutoff=a.defaultAngleCutoff,this._style={},this._heightPlane=h.vec3f64.create(),this._heightPlaneEnabled=!1,this._heightPlaneHeight=0,this._intersectsLine=o.lineSegment.create(),this._intersectsLineEnabled=!1,this._intersectsLineInfinite=!1,this._pathVerticalPlaneBuffers=null;var t=!0;for(var n in e)n in this?"attached"===n?t=e[n]:this[n]=e[n]:console.error("Cannot set unknown property",n);this.attached=t}return e.prototype.destroy=function(){this.disposeRenderer()},Object.defineProperty(e.prototype,"attached",{get:function(){return!!this.renderer},set:function(e){e?this.ensureRenderer():this.disposeRenderer()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"angleCutoff",{get:function(){return this._angleCutoff},set:function(e){this._angleCutoff!==e&&(this._angleCutoff=e,this.syncAngleCutoff())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"style",{get:function(){return this._style},set:function(e){this._style=e,this.syncStyle()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"heightPlane",{get:function(){return this._heightPlaneEnabled?this._heightPlane:null},set:function(e){r.isSome(e)?(s.vec3.copy(this._heightPlane,e),this._heightPlaneEnabled=!0):this._heightPlaneEnabled=!1,this.syncRenderer(),this.syncHeightPlane()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"heightPlaneHeight",{get:function(){return this._heightPlaneHeight},set:function(e){e!==this._heightPlaneHeight&&(this._heightPlaneHeight=e,this.syncHeightPlane())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"intersectsWorldUpAtLocation",{set:function(e){if(r.isNone(e))this.intersectsLine=null;else{var t=this.view.renderCoordsHelper.worldUpAtPosition(e,f);this.intersectsLine=o.lineSegment.fromValues(e,t),this.intersectsLineInfinite=!0}},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"intersectsLine",{get:function(){return this._intersectsLineEnabled?this._intersectsLine:null},set:function(e){r.isSome(e)?(o.lineSegment.copy(e,this._intersectsLine),this._intersectsLineEnabled=!0):this._intersectsLineEnabled=!1,this.syncIntersectsLine(),this.syncRenderer()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"intersectsLineInfinite",{get:function(){return this._intersectsLineInfinite},set:function(e){this._intersectsLineInfinite=e,this.syncIntersectsLineInfinite()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"pathVerticalPlane",{get:function(){return this._pathVerticalPlaneBuffers},set:function(e){this._pathVerticalPlaneBuffers=e,this.syncPathVerticalPlane(),this.syncRenderer()},enumerable:!0,configurable:!0}),e.prototype.syncRenderer=function(){this.attached&&(this._intersectsLineEnabled||this._heightPlaneEnabled||r.isSome(this._pathVerticalPlaneBuffers))?this.ensureRenderer():this.disposeRenderer()},e.prototype.ensureRenderer=function(){r.isSome(this.renderer)||(this.renderer=new l.LaserLineRenderer(this.view.renderCoordsHelper,void 0,{contrastControlEnabled:!0}),this.syncStyle(),this.syncHeightPlane(),this.syncIntersectsLine(),this.syncIntersectsLineInfinite(),this.syncPathVerticalPlane(),this.syncAngleCutoff(),this.view._stage&&this.view._stage.addRenderPlugin(this.renderer.renderSlots,this.renderer))},e.prototype.syncStyle=function(){r.isNone(this.renderer)||(this.renderer.setParameterValues(this._style),null!=this._style.intersectsLineRadius&&(this.renderer.intersectsLineRadius=this._style.intersectsLineRadius))},e.prototype.syncAngleCutoff=function(){r.isNone(this.renderer)||this.renderer.setParameterValues({angleCutoff:this._angleCutoff})},e.prototype.syncHeightPlane=function(){r.isNone(this.renderer)||(this.renderer.heightPlaneEnabled=this._heightPlaneEnabled,this._heightPlaneEnabled&&(this.renderer.heightPlanePosition=this._heightPlane,this.renderer.heightPlaneHeight=this._heightPlaneHeight))},e.prototype.syncIntersectsLine=function(){r.isNone(this.renderer)||(this.renderer.intersectsLineEnabled=this._intersectsLineEnabled,this._intersectsLineEnabled&&(this.renderer.intersectsLineSegment=this._intersectsLine))},e.prototype.syncIntersectsLineInfinite=function(){r.isNone(this.renderer)||(this.renderer.intersectsLineInfinite=this._intersectsLineInfinite)},e.prototype.syncPathVerticalPlane=function(){r.isNone(this.renderer)||(this.renderer.pathVerticalPlaneEnabled=r.isSome(this._pathVerticalPlaneBuffers),r.isSome(this._pathVerticalPlaneBuffers)&&(this.renderer.pathVerticalPlaneBuffers=this._pathVerticalPlaneBuffers))},e.prototype.disposeRenderer=function(){r.isSome(this.renderer)&&this.view._stage&&(this.view._stage.removeRenderPlugin(this.renderer),this.renderer=null)},e}();t.LaserlineVisualElement=c;var f=h.vec3f64.create()}));