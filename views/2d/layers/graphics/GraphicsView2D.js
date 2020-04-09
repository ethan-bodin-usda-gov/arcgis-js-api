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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/Accessor","../../../../core/HandleOwner","../../../../core/Identifiable","../../../../core/MapPool","../../../../core/MapUtils","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/promiseUtils","../../../../core/screenUtils","../../../../core/accessorSupport/decorators","../../../../geometry/Polygon","../../../../geometry/SpatialReference","../../../../geometry/support/aaBoundingRect","../../../../geometry/support/coordsUtils","../../../../geometry/support/jsonUtils","../../../../geometry/support/spatialReferenceUtils","../../../../layers/graphics/data/projectionSupport","../../../../symbols/support/cimSymbolUtils","../../../../symbols/support/defaults","../../engine","../../engine/webgl/definitions","../features/support/AttributeStore","../features/support/TileStore","./GraphicContainer","./GraphicProcessingQueue","./GraphicStore","./graphicsUtils","../../../layers/GraphicsView"],(function(e,t,i,r,a,o,n,s,h,p,l,c,d,u,g,f,_,y,v,m,S,b,w,T,G,I,U,P,C,A,O,M,R,H,x){Object.defineProperty(t,"__esModule",{value:!0});function F(e,t,i){if(i.has(e))return i.get(e);var r={tile:t,addedOrModified:[],removed:[]};return i.set(e,r),r}var D=function(e){function t(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i];var r=e.apply(this,t)||this;return r._tiles=new Map,r._graphicStoreUpdate=!1,r._graphicsSet=new Set,r._matcher=u.resolve(null),r._tileUpdateSet=new Set,r._tilesToUpdate=new Map,r._graphicIdToAbortController=new Map,r._attached=!1,r._highlightIds=new Map,r._updatingGraphicsTimer=null,r.lastUpdateId=-1,r.updateRequested=!1,r.graphicUpdateHandler=r.graphicUpdateHandler.bind(r),r.addOrUpdateGraphic=r.addOrUpdateGraphic.bind(r),r._processAnalyzedGraphics=r._processAnalyzedGraphics.bind(r),r._graphicsChangeHandler=r._graphicsChangeHandler.bind(r),r}return i(t,e),t.prototype.initialize=function(){var e=this;this._tileStore=new A.default(this.view.featuresTilingScheme),this.container=new O.default(this.view.featuresTilingScheme,null),this._attributeStore=new C.default({type:"local",initialize:function(t){return u.resolve(e.container.attributeView.initialize(t))},update:function(t){return e.container.attributeView.requestUpdate(t)},render:function(){return e.container.requestRender()}});this._graphicStore=new R.default(this.view.featuresTilingScheme,this.view.state.scale,this.uid,this.graphics,(function(t){e._attributeStore.createLocalId(t.uid),e._setFilterState(t.uid,t.visible)}),(function(t){e._attributeStore.freeLocalId(t.uid)})),this._graphicProcessingQueue=new M.default({process:this.addOrUpdateGraphic});var t=new U.WGLTemplateStore(this.container.getMaterialItems.bind(this.container),!0),i=this._tileStore.tileScheme.tileInfo;this._matcher=this.renderer?U.createMatcher(t,null,this.renderer):U.createMatcher(t,null),this._meshFactory=new U.WGLMeshFactory(null,this.uid,null,t,null,i),this._templateStore=t,this.watch("renderer",(function(i){i&&(e._matcher=e.renderer?U.createMatcher(t,null,e.renderer):U.createMatcher(t,null))})),this._tileStore.on("update",this._onTileUpdate.bind(this)),this.container.on("attach",(function(){e.graphics.items.length>0&&e._graphicsChangeHandler({target:e.graphics,added:e.graphics.items,removed:[],moved:[]}),e.handles.add(e.graphics.on("change",e._graphicsChangeHandler),"graphics"),e._attached=!0,e.notifyChange("updating")})),this.container.on("detach",(function(){e._graphicProcessingQueue&&e._graphicProcessingQueue.clear()}))},t.prototype.destroy=function(){this._updatingGraphicsTimer&&(clearTimeout(this._updatingGraphicsTimer),this._updatingGraphicsTimer=null,this.notifyChange("updating")),this.container.dispose(),this._set("graphics",null),this._graphicProcessingQueue&&(this._graphicProcessingQueue.destroy(),this._graphicProcessingQueue=null),this._graphicStore.clear(),this._tileStore.destroy(),this._attributeStore=null},Object.defineProperty(t.prototype,"updating",{get:function(){return!this._attached||null!==this._updatingGraphicsTimer||this._graphicProcessingQueue.updating||this._tileUpdateSet.size>0||this._tilesToUpdate.size>0},enumerable:!0,configurable:!0}),t.prototype.install=function(e){e.addChild(this.container)},t.prototype.uninstall=function(e){e.removeChild(this.container)},t.prototype.hitTest=function(e,t){if(!this.view||!this.view.position)return u.resolve();var i=this.view.toMap(f.createScreenPoint(e,t));return this.searchFeatures(i).then((function(e){return e&&e.length?e[0]:null}))},t.prototype.searchFeatures=function(e,t){var i=this;return void 0===t&&(t=2),u.create((function(r){r(i._graphicStore.hitTest(e.x,e.y,t,i.view.state.resolution,i.view.state.rotation))}))},t.prototype.update=function(e){var t=e.state,i=this.view.featuresTilingScheme.getClosestInfoForScale(t.scale).level;this._graphicStore.updateLevel(i),this._tileStore.setViewState(t),this._graphicStoreUpdate=!0,this.updateRequested=!1},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.requestUpdate=function(){this.updateRequested||(this.updateRequested=!0,this.view.requestUpdate(this))},t.prototype.processUpdate=function(e){this.updateRequested&&(this.updateRequested=!1,this.update(e))},t.prototype.graphicUpdateHandler=function(e){var t=e.graphic,i=e.property,r=e.newValue,a=t;switch(i){case"attributes":break;case"geometry":case"symbol":this._graphicProcessingQueue.push(a,"update");break;case"visible":this._setFilterState(a.uid,r),this._attributeStore.sendUpdates()}},t.prototype.addHighlight=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t];if(this._highlightIds.has(r)){var a=this._highlightIds.get(r);this._highlightIds.set(r,a+1)}else this._highlightIds.set(r,1)}this._updateHighlight()},t.prototype.removeHighlight=function(e){for(var t=0,i=e;t<i.length;t++){var r=i[t];if(this._highlightIds.has(r)){var a=this._highlightIds.get(r)-1;0===a?this._highlightIds.delete(r):this._highlightIds.set(r,a)}}this._updateHighlight()},t.prototype._updateHighlight=function(){this._attributeStore.setHighlight(c.keysOfMap(this._highlightIds))},t.prototype._getIntersectingTiles=function(e){var t=this._graphicStore.getBounds(e);return!t||0===m.width(t)||0===m.height(t)?[]:this._tileStore.boundsIntersections(t)},t.prototype._updateTile=function(e){var t=this,i=e.tile,r=this._getGraphicsData(this._templateStore,i,e.addedOrModified);return this._processGraphics(i.key,r).then((function(r){return t._patchTile(i.key,{addOrUpdate:r,remove:e.removed}),r}))},t.prototype._patchTile=function(e,t){if(this._tiles.has(e)){var i=this._tiles.get(e);this.container.onTileData(i,t),this.container.requestRender()}},t.prototype._graphicsChangeHandler=function(e){var t=this;if(!this._graphicStoreUpdate){var i=this.view.state,r=this.view.featuresTilingScheme.getClosestInfoForScale(i.scale).level;this._graphicStore.updateLevel(r),this._tileStore.setViewState(i)}for(var a=e.added,o=e.removed,n=e.moved,s=this._tilesToUpdate,h=[],p=new Array(a.length),l=0;l<a.length;l++){var c=a[l];p[l]=c,this._graphicsSet.add(c),h.push(this.addGraphic(c))}for(var d=0,g=o;d<g.length;d++){var f=g[d];this._abortProcessingGraphic(f.uid);for(var _=0,y=this._getIntersectingTiles(f);_<y.length;_++){var v=y[_];F(v.key.id,v,s).removed.push(this._attributeStore.getLocalId(f.uid))}this._graphicsSet.delete(f),this._graphicStore.remove(f)}for(var m=0,S=n;m<S.length;m++)for(var b=S[m],w=0,T=this._getIntersectingTiles(b);w<T.length;w++){v=T[w];F(v.key.id,v,s).addedOrModified.push(b)}this._flipUpdatingGraphics(),u.all(h).then((function(){for(var e,i=0;i<p.length;i++){e=p[i];for(var r=0,a=t._getIntersectingTiles(e);r<a.length;r++){var o=a[r];F(o.key.id,o,s).addedOrModified.push(e)}}t._graphicStore.updateZ();var n=[];return s.forEach((function(e){return n.push(t._updateTile(e))})),u.all(n).then((function(){s.clear(),t.notifyChange("updating")}))})).catch((function(){s.clear(),t.notifyChange("updating")}))},t.prototype._getArcadeInfo=function(e){var t=(e.attributes?Object.keys(e.attributes):[]).map((function(t){return{name:t,alias:t,type:"string"==typeof e.attributes[t]?"esriFieldTypeString":"esriFieldTypeDouble"}}));return d.isNone(e.geometry)?null:{geometryType:b.getJsonType(e.geometry),spatialReference:v.fromJSON(e.geometry.spatialReference),fields:t}},t.prototype._getSymbolForGraphic=function(e,t){return n(this,void 0,void 0,(function(){return o(this,(function(i){return d.isSome(e.symbol)?[2,e.symbol]:this.renderer?[2,this.renderer.getSymbolAsync(e,{scale:this.view.scale,abortOptions:t})]:[2,this._getNullSymbol(e)]}))}))},t.prototype._getSymbolResources=function(e,t){return n(this,void 0,void 0,(function(){var i,r,a,n,s,h,p,l,c;return o(this,(function(o){switch(o.label){case 0:return this.container.attached?(i=this._getArcadeInfo(e),a=G.expandSymbol,[4,this._getSymbolForGraphic(e,t)]):[2,u.resolve(null)];case 1:return[4,a.apply(void 0,[o.sent(),null,i,t])];case 2:if("text"!==(r=o.sent()).type)return[3,4];for(n=[],s=r,h=U.bidiText(s.text)[0],p=0;p<h.length;p++)n.push(h.charCodeAt(p));return l={symbol:r.toJSON(),id:0,glyphIds:n},[4,this.container.getMaterialItems([l])];case 3:return c=o.sent()[0].mosaicItem,[2,{symbol:r,mosaicItem:c}];case 4:return[2,{symbol:r,mosaicItem:null}]}}))}))},t.prototype._projectAndNormalizeGeometry=function(e){return n(this,void 0,void 0,(function(){var t,i,r,a=this;return o(this,(function(o){return d.isNone(e.geometry)?[2,u.resolve(null)]:(t=e.geometry,b.isPolygon(t)?(i=t.rings,t.rings=i):b.isPolyline(t)?(r=t.paths,t.paths=r):b.isExtent(t)&&(t=y.fromExtent(t)),[2,T.checkProjectionSupport(t.spatialReference,this.view.spatialReference).then((function(){var e=H.normalizeCentralMeridian(t),i=T.project(e,t.spatialReference,a.view.spatialReference);return S.closeRingsAndFixWinding(i),i}))])}))}))},t.prototype._onTileUpdate=function(e){var t=w.getInfo(this.view.spatialReference);if(e.added&&e.added.length>0)for(var i=0,r=e.added;i<r.length;i++){var a=r[i];this._addNewTile(a,t)}if(e.removed&&e.removed.length>0)for(var o=0,n=e.removed;o<n.length;o++){var s=n[o];this._removeTile(s.key)}},t.prototype.addOrUpdateGraphic=function(e,t,i){return this._addOrUpdateGraphic(e,t,i)},t.prototype.addGraphic=function(e){var t=this;this._abortProcessingGraphic(e.uid);var i=g.createAbortController();this._graphicIdToAbortController.set(e.uid,i);var r={signal:i.signal};return this._addOrUpdateGraphic(e,"add",r).then((function(){t._graphicIdToAbortController.delete(e.uid)})).catch((function(i){if(t._graphicIdToAbortController.delete(e.uid),!u.isAbortError(i))throw i}))},t.prototype._addOrUpdateGraphic=function(e,t,i){var r=this,a=this._projectAndNormalizeGeometry(e),o=this._getSymbolResources(e,i);return u.all([a,o]).then((function(a){var o=a[0],n=a[1];return"add"===t?r._addProjectedGraphic(e,n,o):r._updateGraphic(e,n,o,i)}))},t.prototype._addProjectedGraphic=function(e,t,i){this._graphicsSet.has(e)&&this._graphicStore.add(e,t,i)},t.prototype._updateGraphic=function(e,t,i,r){var a=this;if(!this._graphicStore.has(e)||u.isAborted(r))return u.resolve();for(var o=this._graphicStore.update(e,t,i),n=o.oldBounds,s=o.newBounds,h=0===m.width(n)&&0===m.height(n),p=0===m.width(s)&&0===m.height(s),c=h?[]:this._tileStore.boundsIntersections(n),d=p?[]:this._tileStore.boundsIntersections(s),g=l.acquire(),f=0,_=c;f<_.length;f++){var y=_[f];g.set(y.key,{addOrUpdate:null,remove:[this._attributeStore.getLocalId(e.uid)]})}for(var v=0,S=d;v<S.length;v++){y=S[v];var b=this._getGraphicData(this._templateStore,y,e);if(g.has(y.key)){var w=g.get(y.key);w.remove.length=0,w.addOrUpdate=b}else g.set(y.key,{addOrUpdate:b,remove:null})}var T=[];return g.forEach((function(e,t){var i=a._processGraphics(t,e.addOrUpdate,r).then((function(i){a._patchTile(t,{addOrUpdate:i,remove:e.remove})}));T.push(i)})),l.release(g),u.all(T).then((function(){}))},t.prototype._addTile=function(e,t){var i=m.create();this.view.featuresTilingScheme.getTileBounds(i,e);var r=new U.WGLTile(e,i,!0),a={clear:!0,addOrUpdate:t,remove:[]};this._tiles.set(e,r),this.container.addChild(r),r.setData(a,!1,!1)},t.prototype._addNewTile=function(e,t){var i=this,r=this._graphicStore.queryTileData(this._templateStore,e);if(t)for(var a=Math.round((t.valid[1]-t.valid[0])/e.resolution),o=0,n=r;o<n.length;o++){var s=n[o];s.geometry&&b.isPoint(s.geometry)&&this._wrapPoints(s,a)}var h=e.key;this._tileUpdateSet.add(e.key),this.notifyChange("updating"),this._processGraphics(h,r).then((function(e){i._addTile(h,e),i._tileUpdateSet.delete(h),i.notifyChange("updating")})).catch((function(e){if(i._tileUpdateSet.delete(h),i.notifyChange("updating"),!u.isAbortError(e))throw e}))},t.prototype._removeTile=function(e){if(this._tiles.has(e)){var t=this._tiles.get(e);this.container.removeChild(t),t.destroy(),this._tiles.delete(e)}},t.prototype._setFilterState=function(e,t){var i=this._attributeStore.getLocalId(e),r=this._attributeStore.getHighlightFlag(e);this._attributeStore.setData(i,0,0,r|(t?P.FILTER_FLAG_0:0))},t.prototype._getGraphicsData=function(e,t,i){var r=w.getInfo(this.view.spatialReference),a=this._graphicStore.getGraphicsData(e,t,i);if(r)for(var o=Math.round((r.valid[1]-r.valid[0])/t.resolution),n=0,s=a;n<s.length;n++){var h=s[n];h.geometry&&b.isPoint(h.geometry)&&this._wrapPoints(h,o)}return a.sort((function(e,t){return e.insertAfter-t.insertAfter})),a},t.prototype._getGraphicData=function(e,t,i){var r=this._graphicStore.getGraphicData(e,t,i),a=[r],o=w.getInfo(this.view.spatialReference);if(o){var n=Math.round((o.valid[1]-o.valid[0])/t.resolution);r.geometry&&b.isPoint(r.geometry)&&this._wrapPoints(r,n)}return a},t.prototype._wrapPoints=function(e,t){var i=e.geometry;512===t?i.x<20?e.geometry={points:[[i.x,i.y],[t,0]]}:i.x>492&&(e.geometry={points:[[i.x,i.y],[-t,0]]}):i.x<-20?e.geometry={points:[[i.x,i.y],[t,0]]}:i.x>532&&(e.geometry={points:[[i.x,i.y],[-t,0]]})},t.prototype._processGraphics=function(e,t,i){return n(this,void 0,void 0,(function(){var r,a;return o(this,(function(o){switch(o.label){case 0:return t&&t.length&&this._meshFactory?(r=this._meshFactory,[4,this._matcher.then((function(e){return r.analyze(t,e,null,null,i)}))]):[2,null];case 1:return a=o.sent(),this._attributeStore.sendUpdates(),[2,this._processAnalyzedGraphics(e,a)]}}))}))},t.prototype._processAnalyzedGraphics=function(e,t){for(var i=this._meshFactory,r=i.createMeshData(t.length),a=this._attributeStore,o=0,n=t;o<n.length;o++){var s=n[o];s.insertAfter=-1===s.insertAfter?-1:a.getLocalId(s.insertAfter),s.localId=a.getLocalId(s.attributes[this.uid]),i.write(r,s,null,null,e.level,null)}return U.TileData.fromMeshData(r)},t.prototype._abortProcessingGraphic=function(e){this._graphicIdToAbortController.has(e)&&this._graphicIdToAbortController.get(e).abort()},t.prototype._getNullSymbol=function(e){var t=e.geometry;return b.isPolyline(t)?I.errorPolylineSymbol2D:b.isPolygon(t)||b.isExtent(t)?I.errorPolygonSymbol2D:I.errorPointSymbol2D},t.prototype._flipUpdatingGraphics=function(){var e=this;this._updatingGraphicsTimer&&clearTimeout(this._updatingGraphicsTimer),this._updatingGraphicsTimer=setTimeout((function(){e._updatingGraphicsTimer=null,e.notifyChange("updating")}),160),this.notifyChange("updating")},r([_.property()],t.prototype,"_graphicProcessingQueue",void 0),r([_.property({constructOnly:!0})],t.prototype,"graphics",void 0),r([_.property({dependsOn:["_graphicProcessingQueue.updating"]})],t.prototype,"updating",null),r([_.property()],t.prototype,"view",void 0),r([_.property()],t.prototype,"updateRequested",void 0),t=r([_.subclass("esri.views.2d.layers.support.GraphicsView2D")],t)}(_.declared(x.GraphicsView(h.HandleOwnerMixin(p.IdentifiableMixin(s)))));t.default=D}));