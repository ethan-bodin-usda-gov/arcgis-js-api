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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../geometry","../../../Graphic","../../../core/arrayUtils","../../../core/Logger","../../../core/maybe","../../../core/promiseUtils","../../../core/SetUtils","../../../core/unitUtils","../../../core/accessorSupport/decorators","../../../core/sql/WhereClause","../../../geometry/projection","../../../geometry/support/aaBoundingBox","../../../geometry/support/webMercatorUtils","../../../layers/support/fieldUtils","../../../tasks/support/Query","./I3SMeshView3D","./LayerView3D","./i3s/I3SGeometryUtil","./i3s/I3SQueryEngine","./i3s/I3SQueryFeatureAdapter","./i3s/I3SQueryFeatureStore","./i3s/I3SUtil","./support/DefinitionExpressionSceneLayerView","./support/fieldProperties","./support/layerViewUpdatingProperties","./support/PopupSceneLayerView","../support/projectionUtils","../../layers/LayerView","../../layers/support/FeatureFilter","../../support/Scheduler"],(function(e,t,r,i,n,o,s,a,l,u,p,d,c,y,f,h,g,_,F,m,v,S,E,b,w,I,x,j,R,L,O,Q,M,q,G,V,P){var C=p.getLogger("esri.views.3d.layers.SceneLayerView3D"),N=O.defineFieldProperties(),A=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._queryEngine=null,t.lodFactor=1,t.progressiveLoadFactor=1,t._elevationContext="scene",t._isIntegratedMesh=!1,t._supportsLabeling=!0,t._asyncModuleLoading=0,t._projectionEngineLoaded=!1,t}return i(t,e),Object.defineProperty(t.prototype,"filter",{set:function(e){if(d.isNone(e))this._set("filter",null);else{var t=["contains","intersects","disjoint"];e.timeExtent?(C.warn("Filters with a timeExtent are not supported for mesh scene layers"),e=null):e.spatialRelationship&&-1===t.indexOf(e.spatialRelationship)&&(C.warn("Filters with spatialRelationship other than "+t.join(", ")+" are not supported for mesh scene layers"),e=null),this._set("filter",e)}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"parsedFilterWhereClause",{get:function(){var e=d.isSome(this.filter)?this.filter.where:null;if(!e)return null;try{return g.WhereClause.create(e,this.layer.fieldsIndex)}catch(e){C.error("Failed to parse filter where clause: "+e)}return null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterSpatialRelationship",{get:function(){return d.isSome(this.filter)?this.filter.spatialRelationship:"intersects"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"parsedFilterGeometry",{get:function(){var e=this;if(d.isNone(this.filter))return null;if(!this._geometryEngine)return null;var t=this.filter,r=t.geometry,i=t.distance,n=t.units,o=this.filterSpatialRelationship;if(!i)return w.processFilterGeometry(r,o);var s=n||f.getUnitString(r.spatialReference);if(r.spatialReference.isWGS84){var l=this._geometryEngine.geodesicBuffer(r,i,s);return w.processFilterGeometry(l,o)}if(m.canProject(r,a.SpatialReference.WGS84)){l=m.project(this._geometryEngine.geodesicBuffer(m.project(r,a.SpatialReference.WGS84),i,s),r.spatialReference);return w.processFilterGeometry(l,o)}if(!_.isSupported())return C.error("Filter by geodesic buffer (distance) unsupported due to lack of projection support."),null;if(!this._projectionEngineLoaded&&(this._loadAsyncModule(_.load()).then((function(){e._set("_projectionEngineLoaded",!0)})),!this._projectionEngineLoaded))return null;var u=null;try{u=_.project(r,a.SpatialReference.WGS84)}catch(e){}if(u)try{u=_.project(this._geometryEngine.geodesicBuffer(u,i,s),r.spatialReference)}catch(e){u=null}return u||C.error("Filter by geodesic buffer (distance) unsupported, failed to project input geometry ("+r.spatialReference.wkid+") to WGS84."),w.processFilterGeometry(u,o)},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){for(var e=this,t=0,r=["layer.renderer","layer.labelingInfo","layer.labelsVisible","definitionExpressionFields","filter"];t<r.length;t++){var i=r[t];this.updatingHandles.add(this,i,(function(){return e.updatingHandles.addPromise(e._updateRequiredFields())}))}this._updateRequiredFields(),this.updatingHandles.add(this.layer,"rangeInfos",(function(t){return e._rangeInfosChanged(t)}),2),this.updatingHandles.add(this.layer,"renderer",(function(t){return e.updatingHandles.addPromise(e._rendererChange(t))}),2);for(var n=0,o=["parsedDefinitionExpression","layer.objectIdFilter","filter","parsedFilterWhereClause","parsedFilterGeometry"];n<o.length;n++){i=o[n];this.updatingHandles.add(this,i,(function(){return e._filterChange()}))}},t.prototype.destroy=function(){},t.prototype._updateRequiredFields=function(){return s(this,void 0,void 0,(function(){var e,t,r,i,n,s,a,l,u,p,f;return o(this,(function(o){switch(o.label){case 0:return t=(e=this).layer,r=e.layer,i=r.fields,n=r.renderer,s=e.definitionExpressionFields,a=new Set,[4,c.eachAlways([n?n.collectRequiredFields(a,i):null,v.collectLabelingFields(a,t),d.isSome(this.filter)?v.collectFilterFields(a,t,this.filter):null])];case 1:for(l=o.sent(),u=0,p=l;u<p.length;u++)(f=p[u]).error&&C.error(f.error);return v.collectFields(a,i,s),this._set("requiredFields",y.valuesOfSet(a).sort()),[2]}}))}))},t.prototype._rangeInfosChanged=function(e){null!=e&&e.length>0&&C.warn("Unsupported property: rangeInfos are currently only serialized to and from web scenes but do not affect rendering.")},t.prototype.createQuery=function(){var e={outFields:["*"],returnGeometry:!1,outSpatialReference:this.view.spatialReference};return d.isSome(this.filter)?this.filter.createQuery(e):new S(e)},t.prototype.queryExtent=function(e){return this._ensureQueryEngine().executeQueryForExtent(this._ensureQuery(e))},t.prototype.queryFeatureCount=function(e){return this._ensureQueryEngine().executeQueryForCount(this._ensureQuery(e))},t.prototype.queryFeatures=function(e){return this._ensureQueryEngine().executeQuery(this._ensureQuery(e))},t.prototype.queryObjectIds=function(e){return this._ensureQueryEngine().executeQueryForIds(this._ensureQuery(e))},t.prototype._ensureQueryEngine=function(){return this._queryEngine||(this._queryEngine=this._createQueryEngine()),this._queryEngine},t.prototype._createQueryEngine=function(){var e=this,t=this._createGetFeatureExtent();return new I.default({layerView:this,task:P.Task.FEATURE_QUERY_ENGINE,spatialIndex:new j.default({featureAdapter:new x.I3SQueryFeatureAdapter({objectIdField:this.layer.objectIdField,attributeStorageInfo:this.layer.attributeStorageInfo,getFeatureExtent:t}),forAllFeatures:function(t,r){return e._forAllFeatures((function(e,r,i){return t({id:e,index:r,meta:i})}),r,2)},getFeatureExtent:t,sourceSpatialReference:R.getIndexCrs(this.layer),viewSpatialReference:this.view.spatialReference})})},t.prototype._createGetFeatureExtent=function(){var e=this,t=new Float64Array(24),r=this.view.renderSpatialReference,i=this.view.spatialReference;return function(n){if(!n.meta.featureExtents){var o=new Float64Array(6*n.meta.featureIds.length);n.meta.featureExtents=o;for(var s=0;s<o.length;s+=6)o[s]=Number.POSITIVE_INFINITY}var a=n.meta.featureExtents,l=new Float64Array(a.buffer,6*n.index*Float64Array.BYTES_PER_ELEMENT,6);return l[0]===Number.POSITIVE_INFINITY?(w.boundingBoxCornerPoints(n.index,e._collection,n.meta.objectHandle,t),q.bufferToBuffer(t,r,0,t,i,0,8)?F.expandWithBuffer(F.NEGATIVE_INFINITY,t,0,8,l):F.set(l,F.ZERO)):l}},t.prototype.highlight=function(e){var t=this._highlights;if(e instanceof S){var r=t.acquireSet(),i=r.set,n=r.handle;return this.queryObjectIds(e).then((function(e){return t.setFeatureIds(i,e)})),n}return this.inherited(arguments)},t.prototype._createLayerGraphic=function(e){var t=new l(null,null,e);return t.layer=this.layer,t.sourceLayer=this.layer,t},t.prototype.canResume=function(){return this.inherited(arguments)&&(!this._controller||this._controller.rootNodeVisible)},t.prototype.isUpdating=function(){return this.updatingMeshView3D||this._asyncModuleLoading>0},t.prototype.getFilters=function(){var e=this,t=this.inherited(arguments);if(this.layer.objectIdFilter){var r=new Float64Array(this.layer.objectIdFilter.ids),i="include"===this.layer.objectIdFilter.method;r.sort(),t.push((function(t){return e._objectIdFilter(r,i,t)}))}if(this.addSqlFilter(t,this.parsedDefinitionExpression,this.definitionExpressionFields,this.logError),d.isSome(this.filter)){var n=this.parsedFilterGeometry;if(d.isSome(n)&&t.push((function(t,r){return e._geometryFilter(t,r,n,e.filterSpatialRelationship)})),this.filter.objectIds){var o=new Float64Array(this.filter.objectIds);o.sort(),t.push((function(t){return e._objectIdFilter(o,!0,t)}))}}return d.isSome(this.parsedFilterWhereClause)&&this.addSqlFilter(t,this.parsedFilterWhereClause,this.parsedFilterWhereClause.fieldNames,this.logError),t},t.prototype._geometryFilter=function(e,t,r,i){var n=r[0].spatialReference||this.view.spatialReference;if(q.mbsToMbs(t.node.mbs,this._controller.crsIndex,W,n))for(var o=w.acquireMaskFilterContext(i,this.view,n,this._collection,t.objectHandle),s=w.computeMaskNodeMBS(W,o),a=function(r){if(0===e.length)return{value:void 0};switch(w.testMaskWithGeometry(r,s,i)){case 1:return e.length=0,{value:void 0};case 0:return"continue"}R.filterInPlace(e,t.featureIds,(function(e){return w.filterWithMask(r,e,o)}))},l=0,u=r;l<u.length;l++){var p=a(u[l]);if("object"==typeof p)return p.value}else C.warnOnce("SceneLayerView.filter.geometry is using unsupported SpatialReference, skipping geometry filter")},t.prototype._filterChange=function(){var e=this,t=d.isSome(this.filter)&&!!this.filter.geometry;t&&!this._geometryEngine?this._loadAsyncModule(w.loadGeometryEngine()).then((function(t){e.destroyed||(e._set("_geometryEngine",t),e._applyFilters(!0))})):this.inherited(arguments)},t.prototype._loadAsyncModule=function(e){var t=this;this._set("_asyncModuleLoading",this._asyncModuleLoading+1);var r=function(){return t._set("_asyncModuleLoading",t._asyncModuleLoading-1)};return e.then((function(e){return r(),e}),(function(e){throw r(),e}))},t.prototype._objectIdFilter=function(e,t,r){for(var i=0,n=0;i<r.length;){u.binaryIndexOf(e,r[i])>=0===t&&(r[n]=r[i],n++),i++}r.length=n},t.prototype._ensureQuery=function(e){return this._addDefinitionExpressionToQuery(d.isNone(e)?this.createQuery():S.from(e))},n([h.property()],t.prototype,"layer",void 0),n([h.property({dependsOn:["updatingMeshView3D","_asyncModuleLoading"]})],t.prototype,"updating",void 0),n([h.property({dependsOn:["_controller.rootNodeVisible"]})],t.prototype,"suspended",void 0),n([h.property(Q.updatingProgress)],t.prototype,"updatingProgress",void 0),n([h.property({type:V})],t.prototype,"filter",null),n([h.property({readOnly:!0,dependsOn:["filter.where"]})],t.prototype,"parsedFilterWhereClause",null),n([h.property({readOnly:!0,dependsOn:["filter.spatialRelationship"]})],t.prototype,"filterSpatialRelationship",null),n([h.property({readOnly:!0,dependsOn:["filter.geometry","filter.distance","filter.units","filterSpatialRelationship","_geometryEngine","_projectionEngineLoaded"]})],t.prototype,"parsedFilterGeometry",null),n([h.property(N.requiredFields)],t.prototype,"requiredFields",void 0),n([h.property(N.availableFields)],t.prototype,"availableFields",void 0),n([h.property({readOnly:!0,aliasOf:"view.qualitySettings.sceneService.3dObject.lodFactor"})],t.prototype,"lodFactor",void 0),n([h.property({readOnly:!0,aliasOf:"_controller.updatingProgress"})],t.prototype,"updatingProgressValue",void 0),n([h.property({readOnly:!0})],t.prototype,"_asyncModuleLoading",void 0),n([h.property({readOnly:!0})],t.prototype,"_geometryEngine",void 0),n([h.property({readOnly:!0})],t.prototype,"_projectionEngineLoaded",void 0),t=n([h.subclass("esri.views.3d.layers.SceneLayerView3D")],t)}(h.declared(E.I3SMeshView3D(L.DefinitionExpressionSceneLayerView(M.PopupSceneLayerView(b.LayerView3D(G)))))),W=[0,0,0,0];return A}));