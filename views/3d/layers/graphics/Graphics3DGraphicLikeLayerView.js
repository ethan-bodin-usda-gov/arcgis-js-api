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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../Graphic","../../../../core/Accessor","../../../../core/Collection","../../../../core/Handles","../../../../core/promiseUtils","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../core/accessorSupport/diffUtils","../../../../layers/Layer","../../../../layers/graphics/dehydratedFeatures","../../../../tasks/support/Query","./constants","./Graphics3DCore","./Graphics3DElevationAlignment","./Graphics3DObjectStates","./Graphics3DScaleVisibility","./graphicUtils","../../../support/WatchUpdatingTracking"],(function(t,e,i,r,s,n,a,o,p,c,l,h,u,d,y,g,f,b,v,S,w,m,C,E,V){var U=function(t){function e(e){var i=t.call(this,e)||this;return i.graphicsCore=null,i.elevationAlignment=new w,i.watchUpdatingTracking=new V.WatchUpdatingTracking,i.handles=new l,i.suspendResumeExtent=null,i}return i(e,t),e.prototype.normalizeCtorArgs=function(t){var e=null;t.scaleVisibilityEnabled&&(delete(t=s({},t)).scaleVisibilityEnabled,e=new C);var i=new S.Graphics3DCore({owner:t.owner,layer:t.layer,preferredUpdatePolicy:0,graphicSymbolSupported:!0});return s({},t,{graphicsCore:i,scaleVisibility:e})},e.prototype.initialize=function(){var t=this;this.scaleVisibility&&"minScale"in this.layer&&this.watchUpdatingTracking.add(this.layer,"scaleRangeId",(function(){return t.scaleVisibility.layerMinMaxScaleChangeHandler()})),this.elevationAlignment&&"elevationInfo"in this.layer&&this.watchUpdatingTracking.add(this.layer,"elevationInfo",(function(e,i){y.diff(e,i)&&t.watchUpdatingTracking.addPromise(t.graphicsCore.elevationInfoChange())}))},e.prototype.setup=function(){return a(this,void 0,void 0,(function(){var t,e,i,r=this;return n(this,(function(s){switch(s.label){case 0:t=function(t,e,i){return r.graphicsCore.spatialIndex.queryGraphicUIDsInExtent(t,e,i)},this.elevationAlignment.setup(this.owner,t,this.graphicsCore,this.view.elevationProvider),this.scaleVisibility&&"minScale"in this.layer&&(e=this.owner.view.basemapTerrain,this.scaleVisibility.setup(this.owner,this.layer,t,this.graphicsCore,e)),this._set("objectStates",new m.Graphics3DObjectStates(this.graphicsCore)),s.label=1;case 1:return s.trys.push([1,3,,4]),[4,this.graphicsCore.setup({elevationAlignment:this.elevationAlignment,scaleVisibility:this.scaleVisibility,objectStates:this.objectStates})];case 2:return s.sent(),[3,4];case 3:if(i=s.sent(),h.isAbortError(i))return[2];throw i;case 4:return this.handles.add(this.view.watch("clippingArea",(function(){return r.updateClippingExtent()}),!0)),this.updateClippingExtent(),this.setupSuspendResumeExtent(),this.graphicsCore.startCreateGraphics(),[2]}}))}))},e.prototype.destroy=function(){this.handles&&(this.handles.destroy(),this.handles=null),this.watchUpdatingTracking.destroy(),this.elevationAlignment&&(this.elevationAlignment.destroy(),this._set("elevationAlignment",null)),this.scaleVisibility&&(this.scaleVisibility.destroy(),this._set("scaleVisibility",null)),this.objectStates&&(this.objectStates.destroy(),this._set("objectStates",null)),this.graphicsCore&&(this.graphicsCore.destroy(),this._set("graphicsCore",null))},Object.defineProperty(e.prototype,"suspended",{get:function(){return!(!this.scaleVisibility||!this.scaleVisibility.suspended)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"updating",{get:function(){return!!(this.graphicsCore&&this.graphicsCore.updating||this.scaleVisibility&&this.scaleVisibility.updating||this.watchUpdatingTracking&&this.watchUpdatingTracking.updating)},enumerable:!0,configurable:!0}),e.prototype.getGraphicFromGraphicUid=function(t){if(this.owner.loadedGraphics){var e=this.owner.loadedGraphics.find((function(e){return e.uid===t}));if(e){var i=this.layer instanceof g?this.layer:null;return f.hydrateGraphic(e,i)}}},e.prototype.whenGraphicBounds=function(t,e){return this.graphicsCore?this.graphicsCore.whenGraphicBounds(t,e):h.reject()},e.prototype.computeAttachmentOrigin=function(t,e){return this.graphicsCore?this.graphicsCore.computeAttachmentOrigin(t,e):null},e.prototype.getSymbolLayerSize=function(t,e){return this.graphicsCore?this.graphicsCore.getSymbolLayerSize(t,e):null},e.prototype.occlude=function(t){var e=this.objectStates.acquireSet(1,null),i=e.set,r=e.handle;return this.objectStates.setUid(i,t.uid),r},e.prototype.highlight=function(t){if(t instanceof b)return A;if("number"==typeof t)return this.highlight([t]);if(t instanceof o)return this.highlight([t]);if(t instanceof c&&(t=t.toArray()),Array.isArray(t)&&t.length>0){if(t[0]instanceof o){var e=t.map((function(t){return t.uid})),i=this.objectStates.acquireSet(0,null),r=i.set,s=i.handle;return this.objectStates.setUids(r,e),s}if("number"==typeof t[0]){var n=t,a=this.objectStates.acquireSet(0,null);r=a.set,s=a.handle;return this.objectStates.setObjectIds(r,n),s}}return A},e.prototype.updateClippingExtent=function(){var t=this.view.clippingArea;this.graphicsCore.setClippingExtent(t,this.view.spatialReference)&&this.graphicsCore.recreateAllGraphics()},e.prototype.setupSuspendResumeExtent=function(){var t=this;this.scaleVisibility&&u.init(this.graphicsCore,"computedExtent",(function(e){t.suspendResumeExtent=E.enlargeExtent(e,t.suspendResumeExtent,v.SUSPEND_RESUME_EXTENT_OPTIMISM),t.scaleVisibility.setExtent(t.suspendResumeExtent)}),!0)},r([d.property({constructOnly:!0})],e.prototype,"owner",void 0),r([d.property({constructOnly:!0})],e.prototype,"layer",void 0),r([d.property({readOnly:!0,aliasOf:"owner.view"})],e.prototype,"view",void 0),r([d.property({constructOnly:!0})],e.prototype,"graphicsCore",void 0),r([d.property({constructOnly:!0})],e.prototype,"scaleVisibility",void 0),r([d.property({readOnly:!0})],e.prototype,"elevationAlignment",void 0),r([d.property({readOnly:!0})],e.prototype,"objectStates",void 0),r([d.property({readOnly:!0})],e.prototype,"watchUpdatingTracking",void 0),r([d.property({readOnly:!0,dependsOn:["scaleVisibility.suspended"]})],e.prototype,"suspended",null),r([d.property({readOnly:!0,dependsOn:["graphicsCore.updating","scaleVisibility.updating","watchUpdatingTracking.updating"]})],e.prototype,"updating",null),e=r([d.subclass("esri.views.3d.layers.graphics.Graphics3DGraphicLikeLayerView")],e)}(d.declared(p)),A={remove:function(){},pause:function(){},resume:function(){}};return U}));