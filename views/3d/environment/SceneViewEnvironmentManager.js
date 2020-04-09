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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../Color","../../../core/Evented","../../../core/Handles","../../../core/maybe","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../core/libs/gl-matrix-2/vec4f64","./EnvironmentRenderer","../support/earthUtils","../support/projectionUtils","../support/sunUtils","../webgl-engine/lighting/Lightsources","../../../webscene/background/ColorBackground"],(function(e,t,r,n,i,o,s,a,c,d,p,l,h,u,f,_,m,g,v,P,b,y){Object.defineProperty(t,"__esModule",{value:!0});var C=f.vec3f64.fromValues(.5773502691896258,-.5773502691896258,.5773502691896258),w=function(e){function t(){var t=e.call(this)||this;return t._referencePointUpdateDelay=200,t._referencePointUpdateInterval=3e3,t._referencePointUpdateDistThreshold=1e6,t._referencePosUpdateQuery=null,t._referencePosMapCoordsRequested=null,t._viewHandles=new c,t._preserveAbsoluteDateTime=!1,t._trackingEnabled=!1,t._referencePosResetPreserveAbsoluteTime=!1,t.referencePosUpdateTimer=null,t._referencePosWGS84Comparable=null,t._referencePosMapCoords=null,t._mainLight=new b.MainLight,t._ambientLight=new b.AmbientLight,t._moonLight=new b.FillLight,t._renderer=null,t._resetReferencePosition(),t}return r(t,e),t.prototype.destroy=function(){this.disconnectView(),this._viewHandles.destroy()},Object.defineProperty(t.prototype,"updating",{get:function(){return!!(!this.disableQueries&&(this._referencePosUpdateQuery||this._referencePosMapCoordsRequested)||this._renderer&&this._renderer.updating)},enumerable:!0,configurable:!0}),t.prototype.connectView=function(e){var t=this;this._renderer||(this._view=e,this._renderer=new m({view:e}),this._viewHandles.add([e.watch("environment.lighting.date",(function(e){return t._lightingDateHandler(e)}),!0),e.watch("stationary",(function(){return t._interactingStationaryHandler()})),e.watch(["environment.lighting.directShadowsEnabled","environment.lighting.ambientOcclusionEnabled","environment.background.color"],(function(){return t._updateRenderParamsHandler()}),!0),e.watch("spatialReference",(function(){return t._resetReferencePosition()}),!0),l.init(e,"viewingMode",(function(){return t._resetReferencePosition()}),!0),l.init(e,"environment.lighting.cameraTrackingEnabled",(function(e){return t._updateCameraTracking(e)}),!0),l.init(e,"state.camera",(function(){return t._cameraHandler(null)}),!0),this.watch("disableQueries",(function(){return t._cameraHandler(null)}))]),this._updateRenderParamsHandler(),this._updateLightParams(),this._cameraHandler(),this.notifyChange("updating"))},t.prototype.disconnectView=function(){this._renderer&&(this._viewHandles.removeAll(),this._resetReferencePosition(),this._renderer.destroy(),this._renderer=null,this._view=null)},t.prototype._updateCameraTracking=function(e){if(this._trackingEnabled=e,e)this._cameraHandler();else{var t=this._view.environment.lighting;t&&(t.positionTimezoneInfo.autoUpdated=!1)}},t.prototype._lightingDateHandler=function(e){if(e){var t=this._view.environment.lighting;if(!t.positionTimezoneInfo.autoUpdated){this._preserveAbsoluteDateTime=!0;var r=this._view.spatialReference;if(!v.canProjectToWGS84ComparableLonLat(r)){var n=this._view.camera.position;if(!this._referencePosMapCoords||!this._referencePosMapCoords.equals(n))return void this._requestReferencePositionUpdate(n)}if(this._preupdateTracking(e),this._referencePosWGS84Comparable){var i=g.positionToTimezone(this._referencePosWGS84Comparable,T);d.isSome(i)&&(t.autoUpdate(null,i),this._trackingEnabled&&(t.positionTimezoneInfo.autoUpdated=!0))}}this._updateLightParams(e)}},t.prototype._preupdateTracking=function(e){!this._trackingEnabled&&this._view.environment.lighting.cameraTrackingEnabled&&this._cameraHandler(e)},t.prototype._cameraHandler=function(e){if(void 0===e&&(e=null),this._view.ready){var t=this._view.camera;t&&(this._cameraHandlerClientSide(t,e)||this._cameraHandlerServerSide(t))}},t.prototype._cameraHandlerClientSide=function(e,t){if(!v.canProjectToWGS84ComparableLonLat(this._view.spatialReference))return!1;var r=e.position;return this._referencePosWGS84Comparable||(this._referencePosWGS84Comparable=f.vec3f64.create()),v.pointToWGS84ComparableLonLat(r,this._referencePosWGS84Comparable),this._autoUpdateTimezone(this._referencePosWGS84Comparable,t)||this._updateLightParams(t),!0},t.prototype._cameraHandlerServerSide=function(e){var t=e.position;(!this._referencePosMapCoords||this._referencePosMapCoordsRequested||this._exceedsReferencePosDistThreshold(t))&&this._requestReferencePositionUpdate(t,!0),this._view.mapCoordsHelper&&this._referencePosWGS84Comparable&&(this._referencePosWGS84Comparable[2]=t.z*this._view.mapCoordsHelper.unitInMeters,this._referencePosChanged())},t.prototype._interactingStationaryHandler=function(){this._view.stationary&&this._executePendingReferencePositionUpdate()},t.prototype._updateLightParams=function(e){var t=this._view.environment.lighting;e=e||t.date;var r,n=this._view._stage;this._referencePosWGS84Comparable?(r=P.computeColorAndIntensity(e,this._referencePosWGS84Comparable),P.computeDirection(e,this._referencePosWGS84Comparable,this._view.viewingMode,r.diffuse.direction)):r={diffuse:{color:[1,1,1],intensity:.55,direction:C},ambient:{color:[1,1,1],intensity:.55},noonFactor:.5,globalFactor:0},u.vec3.scale(this._mainLight.intensity,r.diffuse.color,r.diffuse.intensity*Math.PI),u.vec3.negate(this._mainLight.direction,r.diffuse.direction),u.vec3.scale(this._ambientLight.intensity,r.ambient.color,r.ambient.intensity),u.vec3.lerp(this._moonLight.intensity,R,S,r.globalFactor);var i=(1-.5*r.globalFactor)*(1-.4*r.noonFactor*(1-r.globalFactor));u.vec3.scale(this._moonLight.intensity,this._moonLight.intensity,i),u.vec3.copy(this._moonLight.direction,r.diffuse.direction),n.setLighting({lights:[this._mainLight,this._ambientLight,this._moonLight],globalFactor:r.globalFactor,groundLightingFactor:1-r.noonFactor}),this._updateRenderParamsHandler()},t.prototype._autoUpdateTimezone=function(e,t){if(void 0===t&&(t=null),!this._view.environment.lighting.cameraTrackingEnabled)return!1;var r=U;r.setTime((t||this._view.environment.lighting.date).getTime());var n=g.positionToTimezone(e,T);if(d.isNone(n))return!1;var i=this._view.environment.lighting.positionTimezoneInfo;if(i.autoUpdated){if(i.hours===n.hours&&i.minutes===n.minutes&&i.seconds===n.seconds)return!1}else i=n;var o=r.getUTCHours()-(n.hours-i.hours),s=r.getUTCMinutes()-(n.minutes-i.minutes),a=r.getUTCSeconds()-(n.seconds-i.seconds);return r.setUTCHours(o),r.setUTCMinutes(s),r.setUTCSeconds(a),!t&&this._view.environment.lighting.autoUpdate(r,n)},t.prototype._updateRenderParamsHandler=function(){var e=this._view._stage;if(e){var t=!this._referencePosWGS84Comparable||P.computeShadowsEnabled(this._referencePosWGS84Comparable,this._view.viewingMode),r=this._view.environment.background,n=r instanceof y?{type:"color",color:_.vec4f64.fromArray(s.toUnitRGBA(r.color))}:{type:"color",color:_.vec4f64.fromValues(0,0,0,1)};e.renderView.setRenderParameters({shadowMap:this._view.environment.lighting.directShadowsEnabled&&t,ssao:this._view.environment.lighting.ambientOcclusionEnabled,background:n})}},t.prototype._resetReferencePosition=function(){this._cancelReferencePosUpdates(),this._referencePosMapCoords=null,this._referencePosMapCoordsRequested=null,this._referencePosResetPreserveAbsoluteTime=null,this._referencePosWGS84Comparable=null,this.notifyChange("updating")},t.prototype._requestReferencePositionUpdate=function(e,t){var r=this;if(void 0===t&&(t=!1),!this.disableQueries&&(this._referencePosMapCoordsRequested?this._referencePosMapCoordsRequested.copy(e):this._referencePosMapCoordsRequested=e.clone(),this._referencePosResetPreserveAbsoluteTime=!!t,!this._referencePosUpdateQuery&&!this.referencePosUpdateTimer&&this._view.stationary)){var n=this._referencePosUpdateQuery=p.after(this._referencePointUpdateDelay).then((function(){if(r._referencePosUpdateQuery===n){return r._doReferencePositionUpdateQuery((function(){return r._referencePosUpdateQuery!==n}))}})).catch((function(e){"mapcoordshelper:missing-geometry-service"===e.name&&(r.disableQueries=!0)})).then((function(){r._referencePosUpdateQuery===n&&(r._referencePosUpdateQuery=null,r.referencePosUpdateTimer||r._executePendingReferencePositionUpdate(),r.notifyChange("updating"))})),i=this.referencePosUpdateTimer=p.after(this._referencePointUpdateInterval).then((function(){r.referencePosUpdateTimer===i&&(r.referencePosUpdateTimer=null,r._referencePosUpdateQuery||r._executePendingReferencePositionUpdate())}));this.notifyChange("updating")}},t.prototype._doReferencePositionUpdateQuery=function(e){return o(this,void 0,void 0,(function(){var t,r;return i(this,(function(n){switch(n.label){case 0:return this._referencePosResetPreserveAbsoluteTime&&(this._preserveAbsoluteDateTime=!1),this._referencePosMapCoords?this._referencePosMapCoords.copy(this._referencePosMapCoordsRequested):this._referencePosMapCoords=this._referencePosMapCoordsRequested.clone(),this._referencePosResetPreserveAbsoluteTime=null,this._referencePosMapCoordsRequested=null,[4,this._view.mapCoordsHelper.toGeographic(this._referencePosMapCoords)];case 1:return t=n.sent(),e()||isNaN(t[0])||isNaN(t[1])||(r=this._referencePosMapCoords.z*this._view.mapCoordsHelper.unitInMeters,this._referencePosWGS84Comparable?(this._referencePosWGS84Comparable[0]=t[0],this._referencePosWGS84Comparable[1]=t[1],this._referencePosWGS84Comparable[2]=r):this._referencePosWGS84Comparable=[t[0],t[1],r],this._referencePosChanged()),[2]}}))}))},t.prototype._executePendingReferencePositionUpdate=function(){var e=this._referencePosMapCoordsRequested;e&&this._requestReferencePositionUpdate(e,this._referencePosResetPreserveAbsoluteTime)},t.prototype._referencePosChanged=function(){this._preserveAbsoluteDateTime?this._updateLightParams():this._autoUpdateTimezone(this._referencePosWGS84Comparable)||this._updateLightParams()},t.prototype._exceedsReferencePosDistThreshold=function(e){if(this._referencePosMapCoords){var t=this._referencePosMapCoords.distance(e);return this._view.mapCoordsHelper&&(t*=this._view.mapCoordsHelper.unitInMeters),t>this._referencePointUpdateDistThreshold}return!0},t.prototype._cancelReferencePosUpdates=function(){this._referencePosUpdateQuery=null,this.referencePosUpdateTimer=null},Object.defineProperty(t.prototype,"test",{get:function(){var e=this;return{renderer:this._renderer,set referencePointUpdateInterval(t){e._referencePointUpdateInterval=t},set referencePointUpdateDistThreshold(t){e._referencePointUpdateDistThreshold=t},set referencePosUpdateTimer(t){e.referencePosUpdateTimer=t},set referencePointUpdateDelay(t){e._referencePointUpdateDelay=t}}},enumerable:!0,configurable:!0}),t.FIXED_LIGHT_DIRECTION=C,n([h.property({type:Boolean,dependsOn:["disableQueries","_renderer.updating"],readOnly:!0})],t.prototype,"updating",null),n([h.property()],t.prototype,"disableQueries",void 0),n([h.property()],t.prototype,"_renderer",void 0),t=n([h.subclass("esri.views.3d.environment.SceneViewEnvironmentManager")],t)}(h.declared(a.EventedAccessor));t.SceneViewEnvironmentManager=w;var U=new Date,T={hours:0,minutes:0,seconds:0},R=f.vec3f64.fromValues(.22,.22,.33),S=f.vec3f64.fromValues(.22,.22,.22);t.default=w}));