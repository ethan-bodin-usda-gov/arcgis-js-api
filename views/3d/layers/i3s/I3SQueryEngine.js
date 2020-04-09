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

define(["require","exports","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/Accessor","../../../../core/Error","../../../../core/Handles","../../../../core/maybe","../../../../core/accessorSupport/decorators","../../../../geometry/Extent","../../../../layers/graphics/data/QueryEngine","../../../../tasks/support/FeatureSet","../../../../tasks/support/Query"],(function(e,t,r,n,o,i,u,s,a,y,c,l,p,d,f){Object.defineProperty(t,"__esModule",{value:!0});var h=p.default,Q=function(e){function t(t){var r=e.call(this,t)||this;return r._dataQueryEngineInstance=null,r._handles=new a,r}return n(t,e),Object.defineProperty(t.prototype,"defaultQueryJSON",{get:function(){return new f({outSpatialReference:this.spatialReference}).toJSON()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dataQueryEngine",{get:function(){return this.ensureDataQueryEngine()},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this._handles.add(this.layerView.on("visible-geometry-changed",(function(){return e.spatialIndex.events.emit("changed")})))},t.prototype.destroy=function(){this._dataQueryEngineInstance&&(this._dataQueryEngineInstance.destroy(),this._dataQueryEngineInstance=null),this._handles&&(this._handles.destroy(),this._handles=null),this._set("layerView",null)},t.prototype.executeQueryForCount=function(e,t){return i(this,void 0,void 0,(function(){return o(this,(function(r){return[2,this.dataQueryEngine.executeQueryForCount(this._ensureQueryJSON(e),t)]}))}))},t.prototype.executeQueryForExtent=function(e,t){return i(this,void 0,void 0,(function(){var r,n,i,u;return o(this,(function(o){switch(o.label){case 0:return[4,this.dataQueryEngine.executeQueryForExtent(this._ensureQueryJSON(e),t)];case 1:return r=o.sent(),n=r.count,i=r.extent,u=l.fromJSON(i),[2,{count:n,extent:u}]}}))}))},t.prototype.executeQueryForIds=function(e,t){return i(this,void 0,void 0,(function(){return o(this,(function(r){return[2,this.dataQueryEngine.executeQueryForIds(this._ensureQueryJSON(e),t)]}))}))},t.prototype.executeQuery=function(e,t){return i(this,void 0,void 0,(function(){var r,n,i,u=this;return o(this,(function(o){switch(o.label){case 0:if((r=this._ensureQueryJSON(e)).returnGeometry)throw new s("feature-store:unsupported-query","returnGeometry is not yet supported for mesh scene layer queries");if(r.returnCentroid)throw new s("feature-store:unsupported-query","returnCentroid is not yet supported for mesh scene layer queries");return[4,this.dataQueryEngine.executeQuery(r,t)];case 1:return n=o.sent(),(i=d.fromJSON(n)).features.forEach((function(e){e.geometry=null,e.layer=u.layer,e.sourceLayer=u.layer})),[2,i]}}))}))},t.prototype._ensureQueryJSON=function(e){if(y.isNone(e))return this.defaultQueryJSON;var t=e.toJSON();return t.outSpatialReference||(e.outSpatialReference=this.spatialReference),t},t.prototype.ensureDataQueryEngine=function(){if(this._dataQueryEngineInstance)return this._dataQueryEngineInstance;var e=this.layer.objectIdField||"OBJECTID",t=this.layer.fields.map((function(e){return e.toJSON()})),r=this.layerView.view.resourceController.scheduler,n=this.spatialReference.toJSON(),o=this.task,i=this.spatialIndex;return this._dataQueryEngineInstance=new h({hasZ:!0,hasM:!1,geometryType:"esriGeometryPolygon",fields:t,timeInfo:null,spatialReference:n,objectIdField:e,featureStore:i,scheduler:r,task:o}),this._dataQueryEngineInstance},r([c.property({constructOnly:!0})],t.prototype,"layerView",void 0),r([c.property({constructOnly:!0})],t.prototype,"task",void 0),r([c.property({constructOnly:!0})],t.prototype,"spatialIndex",void 0),r([c.property({readOnly:!0,aliasOf:"layerView.view.spatialReference"})],t.prototype,"spatialReference",void 0),r([c.property({readOnly:!0,aliasOf:"layerView.layer"})],t.prototype,"layer",void 0),r([c.property({readOnly:!0,dependsOn:["spatialReference"]})],t.prototype,"defaultQueryJSON",null),t=r([c.subclass("esri.views.3d.layers.i3s.I3SQueryEngine")],t)}(c.declared(u));t.I3SQueryEngine=Q,t.default=Q}));