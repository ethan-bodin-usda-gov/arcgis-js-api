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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","../geometry","../request","../core/Error","../core/HandleOwner","../core/maybe","../core/MultiOriginJSONSupport","../core/promiseUtils","../core/urlUtils","../core/accessorSupport/decorators","./Layer","./mixins/ArcGISCachedService","./mixins/ArcGISMapService","./mixins/ArcGISService","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/RefreshableLayer","./mixins/ScaleRangeLayer","./mixins/SublayersOwner","./support/arcgisLayerUrl","./support/arcgisLayerUrl","./support/commonProperties","./support/Sublayer"],(function(e,r,t,o,i,a,n,s,l,p,c,u,y,d,f,v,h,S,g,m,_,b,O,T,w,L,R,A,I){var U=["Canvas/World_Dark_Gray_Base","Canvas/World_Dark_Gray_Reference","Canvas/World_Light_Gray_Base","Canvas/World_Light_Gray_Reference","Elevation/World_Hillshade","Ocean/World_Ocean_Base","Ocean/World_Ocean_Reference","Ocean_Basemap","Reference/World_Boundaries_and_Places","Reference/World_Boundaries_and_Places_Alternate","Reference/World_Transportation","World_Imagery","World_Street_Map","World_Topo_Map"];return function(e){function r(r,t){var o=e.call(this,r)||this;return o.listMode="show",o.isReference=null,o.resampling=!0,o.sourceJSON=null,o.spatialReference=null,o.path=null,o.sublayers=null,o.type="tile",o.url=null,o}return o(r,e),r.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?t({url:e},r):e},r.prototype.load=function(e){var r=this,t=u.isSome(e)?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Image Service","Map Service"]},e).then((function(){return r._fetchService(t)}),(function(){return r._fetchService(t)}))),d.resolve(this)},Object.defineProperty(r.prototype,"attributionDataUrl",{get:function(){return this._getDefaultAttribution(this._getMapName(this.parsedUrl.path.toLowerCase()))},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"operationalLayerType",{get:function(){if(this.capabilities&&this.capabilities.operations)return this.capabilities.operations.supportsExportMap?"ArcGISTiledMapServiceLayer":"ArcGISTiledImageServiceLayer";var e=this.url||this.portalItem&&this.portalItem.url;return e&&/\/ImageServer(\/|\/?$)/i.test(e)?"ArcGISTiledImageServiceLayer":"ArcGISTiledMapServiceLayer"},enumerable:!0,configurable:!0}),r.prototype.readSpatialReference=function(e,r){return(e=e||r.tileInfo&&r.tileInfo.spatialReference)&&s.SpatialReference.fromJSON(e)},r.prototype.writeSublayers=function(e,r,o,i){if(this.loaded&&e){var a=e.slice().reverse().flatten((function(e){var r=e.sublayers;return r&&r.toArray().reverse()})).toArray(),n=[],s=t({writeSublayerStructure:!1},i);a.forEach((function(e){var r=e.write({},s);n.push(r)})),n.some((function(e){return Object.keys(e).length>1}))&&(r.layers=n)}},Object.defineProperty(r.prototype,"tileServers",{get:function(){return this._getDefaultTileServers(this.parsedUrl.path)},enumerable:!0,configurable:!0}),r.prototype.castTileServers=function(e){return Array.isArray(e)?e.map((function(e){return f.urlToObject(e).path})):null},r.prototype.fetchTile=function(e,r,t,o){void 0===o&&(o={});var i=o.signal,a=o.timestamp,n=this.getTileUrl(e,r,t),s={responseType:"image",signal:i};return null!=a&&(s.query={_ts:o.timestamp}),l(n,s).then((function(e){return e.data}))},r.prototype.getTileUrl=function(e,r,o){var i=!this.tilemapCache&&this.supportsBlankTile,a=f.objectToQuery(t({},this.parsedUrl.query,{blankTile:!i&&null})),n=this.tileServers;return(n&&n.length?n[r%n.length]:this.parsedUrl.path)+"/tile/"+e+"/"+r+"/"+o+(a?"?"+a:"")},r.prototype._fetchService=function(e){var r=this;return d.create((function(o,i){if(r.sourceJSON){o({data:r.sourceJSON})}else{if(!r.parsedUrl)throw new p("tile-layer:undefined-url","layer's url is not defined");l(r.parsedUrl.path,{query:t({f:"json"},r.parsedUrl.query),responseType:"json",signal:e}).then(o,i)}})).then((function(t){if(t.ssl&&(r.url=r.url.replace(/^http:/i,"https:")),r.sourceJSON=t.data,r.read(t.data,{origin:"service",url:r.parsedUrl}),10.1===r.version&&!R.isHostedAgolService(r.url))return r._fetchServerVersion(r.url,e).then((function(e){r.read({currentVersion:e})})).catch((function(){}))}))},r.prototype._fetchServerVersion=function(e,r){if(!L.isArcGISUrl(e))return d.reject();var t=e.replace(/(.*\/rest)\/.*/i,"$1")+"/info";return l(t,{query:{f:"json"},responseType:"json",signal:r}).then((function(e){if(e.data&&e.data.currentVersion)return e.data.currentVersion;throw new p("tile-layer:version-not-available")}))},r.prototype._getMapName=function(e){var r=e.match(/^(?:https?:)?\/\/(server|services)\.arcgisonline\.com\/arcgis\/rest\/services\/([^\/]+(\/[^\/]+)*)\/mapserver/i);return r&&r[2]},r.prototype._getDefaultAttribution=function(e){if(e){var r;e=e.toLowerCase();for(var t=0,o=U.length;t<o;t++)if((r=U[t]).toLowerCase().indexOf(e)>-1)return f.makeAbsolute("//static.arcgis.com/attribution/"+r)}},r.prototype._getDefaultTileServers=function(e){var r=-1!==e.search(/^(?:https?:)?\/\/server\.arcgisonline\.com/i),t=-1!==e.search(/^(?:https?:)?\/\/services\.arcgisonline\.com/i);return r||t?[e,e.replace(r?/server\.arcgisonline/i:/services\.arcgisonline/i,r?"services.arcgisonline":"server.arcgisonline")]:[]},i([v.property({readOnly:!0,dependsOn:["parsedUrl"]})],r.prototype,"attributionDataUrl",null),i([v.property({type:["show","hide","hide-children"]})],r.prototype,"listMode",void 0),i([v.property({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:function(){return{enabled:!1}}}}})],r.prototype,"isReference",void 0),i([v.property({readOnly:!0})],r.prototype,"operationalLayerType",null),i([v.property()],r.prototype,"popupTemplates",void 0),i([v.property({type:Boolean})],r.prototype,"resampling",void 0),i([v.property()],r.prototype,"sourceJSON",void 0),i([v.property({type:s.SpatialReference})],r.prototype,"spatialReference",void 0),i([v.reader("spatialReference",["spatialReference","tileInfo"])],r.prototype,"readSpatialReference",null),i([v.property({type:String,json:{origins:{"web-scene":{read:!0,write:!0}},read:!1}})],r.prototype,"path",void 0),i([v.property({readOnly:!0})],r.prototype,"sublayers",void 0),i([v.writer("sublayers",{layers:{type:[I]}})],r.prototype,"writeSublayers",null),i([v.property({json:{read:!1,write:!1}})],r.prototype,"popupEnabled",void 0),i([v.property({dependsOn:["parsedUrl"]})],r.prototype,"tileServers",null),i([v.cast("tileServers")],r.prototype,"castTileServers",null),i([v.property({readOnly:!0,json:{read:!1}})],r.prototype,"type",void 0),i([v.property(A.url)],r.prototype,"url",void 0),r=i([v.subclass("esri.layers.TileLayer")],r)}(v.declared(w.SublayersOwner(T.ScaleRangeLayer(O.RefreshableLayer(_.OperationalLayer(b.PortalLayer(S.ArcGISCachedService(g.ArcGISMapService(m.ArcGISService(y.MultiOriginJSONMixin(c.HandleOwnerMixin(h))))))))))))}));