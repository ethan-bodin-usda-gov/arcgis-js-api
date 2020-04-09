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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/Promise","../../../../core/promiseUtils","../../../../core/workers","../../../../core/accessorSupport/decorators"],(function(t,e,r,n,o,i,s,c,u,a,l){Object.defineProperty(e,"__esModule",{value:!0});var p=function(t){function e(e){var r=t.call(this,e)||this;return r._startupResolver=u.createResolver(),r.isReady=!1,r}return r(e,t),e.prototype.initialize=function(){this._controller=u.createAbortController(),this.addResolvingPromise(this._startWorker(this._controller.signal))},e.prototype.destroy=function(){this._controller.abort(),this._connection&&this._connection.close()},Object.defineProperty(e.prototype,"tileRenderer",{set:function(t){this.client.tileRenderer=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"closed",{get:function(){return this._connection.closed},enumerable:!0,configurable:!0}),e.prototype.startup=function(t,e,r,n){return s(this,void 0,void 0,(function(){var o,s,c,u;return i(this,(function(i){switch(i.label){case 0:return[4,this.when()];case 1:return i.sent(),o=this._controller.signal,a=r.source,s=Array.isArray(a)?{transferList:r.source,signal:o}:void 0,c=t.tileInfo.toJSON(),u={service:r,config:e,tileInfo:c,options:n},[4,this._connection.invoke("startup",u,s)];case 2:return i.sent(),this._startupResolver.resolve(),this._set("isReady",!0),[2]}var a}))}))},e.prototype.update=function(t,e){return s(this,void 0,void 0,(function(){var r;return i(this,(function(n){switch(n.label){case 0:return r={config:t,options:e},[4,this._startupResolver.promise];case 1:return n.sent(),[2,this._connection.invoke("update",r)]}}))}))},e.prototype.setHighlight=function(t){return s(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.setHighlight",t)]}}))}))},e.prototype.refresh=function(){return s(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,this._startupResolver.promise];case 1:return t.sent(),[2,this._connection.invoke("controller.refresh")]}}))}))},e.prototype.setViewState=function(t){return s(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("setViewState",t.toJSON())]}}))}))},e.prototype.queryFeatures=function(t,e){return s(this,void 0,void 0,(function(){return i(this,(function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.queryFeatures",t.toJSON(),e)]}}))}))},e.prototype.queryObjectIds=function(t,e){return s(this,void 0,void 0,(function(){return i(this,(function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.queryObjectIds",t.toJSON(),e)]}}))}))},e.prototype.queryFeatureCount=function(t,e){return s(this,void 0,void 0,(function(){return i(this,(function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.queryFeatureCount",t.toJSON(),e)]}}))}))},e.prototype.queryExtent=function(t,e){return s(this,void 0,void 0,(function(){return i(this,(function(r){return[2,this._connection.invoke("controller.queryExtent",t.toJSON(),e)]}))}))},e.prototype.queryLatestObservations=function(t,e){return s(this,void 0,void 0,(function(){return i(this,(function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.queryLatestObservations",t.toJSON(),e)]}}))}))},e.prototype.queryStatistics=function(t){return s(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.queryStatistics",t)]}}))}))},e.prototype.getObjectId=function(t){return s(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.getObjectId",t)]}}))}))},e.prototype.getLocalId=function(t){return s(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.getLocalId",t)]}}))}))},e.prototype.getAggregate=function(t){return s(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.getAggregate",t)]}}))}))},e.prototype.getAggregateValueRanges=function(){return s(this,void 0,void 0,(function(){return i(this,(function(t){switch(t.label){case 0:return[4,this._startupResolver.promise];case 1:return t.sent(),[2,this._connection.invoke("controller.getAggregateValueRanges")]}}))}))},e.prototype.mapValidLocalIds=function(t){return s(this,void 0,void 0,(function(){return i(this,(function(e){switch(e.label){case 0:return[4,this._startupResolver.promise];case 1:return e.sent(),[2,this._connection.invoke("controller.mapValidLocalIds",t)]}}))}))},e.prototype.onEdits=function(t){return s(this,void 0,void 0,(function(){var e,r,n;return i(this,(function(o){switch(o.label){case 0:return[4,this._startupResolver.promise];case 1:return o.sent(),e=t.addedFeatures,r=t.deletedFeatures,n=t.updatedFeatures,[2,this._connection.invoke("controller.onEdits",{addedFeatures:e,deletedFeatures:r,updatedFeatures:n})]}}))}))},e.prototype.enableEvent=function(t,e){return s(this,void 0,void 0,(function(){return i(this,(function(r){switch(r.label){case 0:return[4,this._startupResolver.promise];case 1:return r.sent(),[2,this._connection.invoke("controller.enableEvent",{name:t,value:e})]}}))}))},e.prototype._startWorker=function(t){return s(this,void 0,void 0,(function(){var e,r;return i(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),e=this,[4,a.open("Pipeline",{client:this.client,strategy:"dedicated",signal:t})];case 1:return e._connection=n.sent(),[3,3];case 2:return r=n.sent(),u.throwIfNotAbortError(r),[3,3];case 3:return[2]}}))}))},n([l.property()],e.prototype,"isReady",void 0),n([l.property()],e.prototype,"client",void 0),n([l.property()],e.prototype,"tileRenderer",null),e=n([l.subclass("esri.views.2d.layers.support.FeatureLayerProxy")],e)}(l.declared(c.EsriPromise));e.default=p}));