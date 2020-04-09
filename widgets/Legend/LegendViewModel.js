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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/Collection","../../core/Handles","../../core/watchUtils","../../core/accessorSupport/decorators","../../views/2d/layers/support/clusterUtils","./support/ActiveLayerInfo"],(function(e,r,t,i,a,s,n,o,y,l,d){var c="state",h="view",u="all-layer-views",p="legend-properties",f=s.ofType(d),v=["esri.layers.CSVLayer","esri.layers.FeatureLayer","esri.layers.HeatmapLayer","esri.layers.MapImageLayer","esri.layers.PointCloudLayer","esri.layers.TileLayer","esri.layers.StreamLayer","esri.layers.SceneLayer","esri.layers.GeoRSSLayer","esri.layers.GeoJSONLayer","esri.layers.GroupLayer","esri.layers.ImageryLayer","esri.layers.WMSLayer","esri.layers.WMTSLayer","esri.layers.TileImageryLayer"],L=["view.basemapView.baseLayerViews","view.groundView.layerViews","view.layerViews","view.basemapView.referenceLayerViews"];return function(e){function r(r){var t=e.call(this,r)||this;return t._handles=new n,t._layerViewByLayerId={},t._layerInfosByLayerViewId={},t._activeLayerInfosByLayerViewId={},t.activeLayerInfos=new f,t.basemapLegendVisible=!1,t.groundLegendVisible=!1,t.respectLayerVisibility=!0,t.layerInfos=[],t.view=null,t}return t(r,e),r.prototype.initialize=function(){this._handles.add(o.init(this,"view",this._viewHandles),h)},r.prototype.destroy=function(){this._destroyViewActiveLayerInfos(),this._handles.destroy(),this._handles=null,this.view=null},Object.defineProperty(r.prototype,"state",{get:function(){return this.get("view.ready")?"ready":"disabled"},enumerable:!0,configurable:!0}),r.prototype._viewHandles=function(){this._handles.remove(c),this.view&&this._handles.add(o.init(this,"state",this._stateHandles),c)},r.prototype._stateHandles=function(){this._resetAll(),"ready"===this.state&&this._watchPropertiesAndAllLayerViews()},r.prototype._resetAll=function(){this._handles.remove([u,p]),this._destroyViewActiveLayerInfos(),this.activeLayerInfos.removeAll()},r.prototype._destroyViewActiveLayerInfos=function(){Object.keys(this._activeLayerInfosByLayerViewId).forEach(this._destroyViewActiveLayerInfo,this)},r.prototype._destroyViewActiveLayerInfo=function(e){this._handles.remove(e);var r=this._activeLayerInfosByLayerViewId[e];delete this._activeLayerInfosByLayerViewId[e],r&&r.parent&&r.parent.children.remove(r)},r.prototype._watchPropertiesAndAllLayerViews=function(){var e=this.view.allLayerViews;e.length&&this._refresh(),this._handles.add(e.on("change",this._allLayerViewsChangeHandle.bind(this)),u),this._handles.add(o.watch(this,"layerInfos, basemapLegendVisible, groundLegendVisible",this._propertiesChangeHandle.bind(this)),p)},r.prototype._allLayerViewsChangeHandle=function(e){var r=this;e.removed.forEach((function(e){return r._destroyViewActiveLayerInfo(e.uid)})),this._refresh()},r.prototype._propertiesChangeHandle=function(){this._destroyViewActiveLayerInfos(),this._refresh()},r.prototype._refresh=function(){this._layerInfosByLayerViewId={},this.activeLayerInfos.removeAll(),this._generateLayerViews().filter(this._filterLayerViewsByLayerInfos,this).filter(this._isLayerViewSupported,this).forEach(this._generateActiveLayerInfo,this),this._sortActiveLayerInfos(this.activeLayerInfos)},r.prototype._sortActiveLayerInfos=function(e){var r=this;if(!(e.length<2)){var t=[];e.forEach((function(i){if(!i.parent){var a=i.layer.parent,s=a&&"uid"in a&&r._layerViewByLayerId[a.uid],n=s&&r._activeLayerInfosByLayerViewId[s.uid];n&&-1!==e.indexOf(n)&&(t.push(i),i.parent=n,n.children.add(i),r._sortActiveLayerInfos(n.children))}})),e.removeMany(t);var i={};this.view.allLayerViews.forEach((function(e,r){return i[e.layer.uid]=r})),e.sort((function(e,r){var t=i[e.layer.uid]||0;return(i[r.layer.uid]||0)-t}))}},r.prototype._generateLayerViews=function(){var e=[];return L.filter(this._filterLayerViews,this).map(this.get,this).filter((function(e){return null!=e})).forEach(this._collectLayerViews("layerViews",e)),e},r.prototype._filterLayerViews=function(e){var r=!this.basemapLegendVisible&&("view.basemapView.baseLayerViews"===e||"view.basemapView.referenceLayerViews"===e),t=!this.groundLegendVisible&&"view.groundView.layerViews"===e;return!r&&!t},r.prototype._collectLayerViews=function(e,r){var t=function(i){return i&&i.forEach((function(i){r.push(i),t(i[e])})),r};return t},r.prototype._filterLayerViewsByLayerInfos=function(e){var r=this,t=this.layerInfos;return!t||!t.length||t.some((function(t){return r._hasLayerInfo(t,e)}))},r.prototype._hasLayerInfo=function(e,r){var t=this._isLayerUIDMatching(e.layer,r.layer.uid);return t&&(this._layerInfosByLayerViewId[r.uid]=e),t},r.prototype._isLayerUIDMatching=function(e,r){return e&&(e.uid===r||this._hasLayerUID(e.layers,r))},r.prototype._hasLayerUID=function(e,r){var t=this;return e&&e.some((function(e){return t._isLayerUIDMatching(e,r)}))},r.prototype._isLayerViewSupported=function(e){return v.indexOf(e.layer.declaredClass)>-1&&(this._layerViewByLayerId[e.layer.uid]=e,!0)},r.prototype._generateActiveLayerInfo=function(e){var r=this;this._isLayerActive(e)?this._buildActiveLayerInfo(e):(this._handles.remove(e.uid),this._handles.add(o.watch(e,"suspended, layer.legendEnabled",(function(){return r._layerActiveHandle(e)})),e.uid))},r.prototype._layerActiveHandle=function(e){this._isLayerActive(e)&&(this._handles.remove(e.uid),this._buildActiveLayerInfo(e))},r.prototype._isLayerActive=function(e){return!this.respectLayerVisibility||!e.suspended&&e.get("layer.legendEnabled")},r.prototype._buildActiveLayerInfo=function(e){var r=this,t=e.layer,i=e.uid,a=this._layerInfosByLayerViewId[i],s=this._activeLayerInfosByLayerViewId[i];if(!s){var n=a&&void 0!==a.title;s=new d({layer:t,title:n?a.title:t.title,view:this.view,respectLayerVisibility:this.respectLayerVisibility,sublayerIds:a&&a.sublayerIds||[]}),this._activeLayerInfosByLayerViewId[i]=s}if(!s.parent){var y=t.parent,l=y&&this._layerViewByLayerId[y.uid];s.parent=l&&this._activeLayerInfosByLayerViewId[l.uid]}if(!this._handles.has(i)){var c=[o.watch(t,"title",(function(t){return r._titleHandle(t,s,e)})),o.watch(t,"renderer?, opacity",(function(){return r._constructLegendElements(s,e)})),o.whenTrue(this.view,"stationary",(function(){return r._scaleHandle(s,e)})),o.watch(e,"_effectiveRenderer",(function(){return r._constructLegendElements(s,e)}))];if(this.respectLayerVisibility){var h=o.watch(e,"suspended",(function(t){return r._suspendedHandle(t,s,e)})),u=o.watch(t,"legendEnabled",(function(t){return r._legendEnabledHandle(t,s,e)}));c.push(h,u)}this._handles.add(c,i)}s.isScaleDriven||this._constructLegendElements(s,e),this._addActiveLayerInfo(s,e)},r.prototype._titleHandle=function(e,r,t){r.title=e,this._constructLegendElements(r,t)},r.prototype._legendEnabledHandle=function(e,r,t){e?this._addActiveLayerInfo(r,t):this._removeActiveLayerInfo(r)},r.prototype._suspendedHandle=function(e,r,t){e?this._removeActiveLayerInfo(r):this._addActiveLayerInfo(r,t)},r.prototype._scaleHandle=function(e,r){e.isScaleDriven&&this._constructLegendElements(e,r)},r.prototype._addActiveLayerInfo=function(e,r){if(this._isLayerActive(r)&&-1===this.activeLayerInfos.indexOf(e)){var t=e.parent;t?(-1===t.children.indexOf(e)&&t.children.push(e),this._sortActiveLayerInfos(t.children)):(this.activeLayerInfos.add(e),this._sortActiveLayerInfos(this.activeLayerInfos))}},r.prototype._removeActiveLayerInfo=function(e){var r=e.parent;r?r.children.remove(e):this.activeLayerInfos.remove(e)},r.prototype._constructLegendElements=function(e,r){var t=r.layer;if(t.featureCollections?e.buildLegendElementsForFeatureCollections(t.featureCollections):t.renderer?e.buildLegendElementsForRenderer(t.renderer):t.url&&e.buildLegendElementsForTools(),t.featureReduction&&"cluster"===t.featureReduction.type){var i=r._effectiveRenderer,a=t.renderer.clone(),s=a&&"visualVariables"in a&&a.visualVariables||[];if(!(i&&"visualVariables"in i&&i.visualVariables))return null;var n=l.findSizeVV(i.visualVariables);l.getActiveSizeStops(this.view,n)&&(a.visualVariables=s.concat([n]),e.buildLegendElementsForRenderer(a))}},i([y.property({type:f})],r.prototype,"activeLayerInfos",void 0),i([y.property()],r.prototype,"basemapLegendVisible",void 0),i([y.property()],r.prototype,"groundLegendVisible",void 0),i([y.property()],r.prototype,"respectLayerVisibility",void 0),i([y.property()],r.prototype,"layerInfos",void 0),i([y.property({dependsOn:["view.ready"],readOnly:!0})],r.prototype,"state",null),i([y.property()],r.prototype,"view",void 0),r=i([y.subclass("esri.widgets.Legend.LegendViewModel")],r)}(y.declared(a))}));