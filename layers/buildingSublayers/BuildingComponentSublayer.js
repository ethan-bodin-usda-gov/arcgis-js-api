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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../PopupTemplate","../../renderers","../../request","../../core/jsonMap","../../core/Loadable","../../core/maybe","../../core/Promise","../../core/promiseUtils","../../core/accessorSupport/decorators","../../geometry/Extent","../../geometry/SpatialReference","./BuildingSublayer","../support/commonProperties","../support/fieldProperties","../support/FieldsIndex","../support/I3SLayerDefinitions","../../renderers/support/jsonUtils","../../support/popupUtils","../../symbols/support/ElevationInfo"],(function(e,r,t,o,p,i,n,l,a,s,d,y,u,f,c,m,g,v,b,O,h,S,j,P,T,x){var I=h.defineFieldProperties();return function(e){function r(r){var t=e.call(this,r)||this;return t.type="building-component",t.nodePages=null,t.materialDefinitions=null,t.textureSetDefinitions=null,t.geometryDefinitions=null,t.serviceUpdateTimeStamp=null,t.fields=null,t.outFields=null,t.listMode="show",t.renderer=null,t.definitionExpression=null,t.popupEnabled=!0,t.popupTemplate=null,t.layerType="3d-object",t}return o(r,e),Object.defineProperty(r.prototype,"parsedUrl",{get:function(){return this.layer?{path:this.layer.parsedUrl.path+"/sublayers/"+this.id,query:this.layer.parsedUrl.query}:null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"fieldsIndex",{get:function(){return new S(this.fields)},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"objectIdField",{get:function(){if(null!=this.fields)for(var e=0,r=this.fields;e<r.length;e++){var t=r[e];if("oid"===t.type)return t.name}return null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"defaultPopupTemplate",{get:function(){return this.createPopupTemplate()},enumerable:!0,configurable:!0}),r.prototype.load=function(e){var r=u.isSome(e)?e.signal:null;return this.addResolvingPromise(this._fetchService(r)),c.resolve(this)},r.prototype.createPopupTemplate=function(e){return T.createPopupTemplate(this,e)},r.prototype._fetchService=function(e){return n(this,void 0,void 0,(function(){var r,t;return i(this,(function(o){switch(o.label){case 0:return[4,s(this.parsedUrl.path,{query:{f:"json"},responseType:"json",signal:e})];case 1:return r=o.sent(),t=r.data,this.read(t,{origin:"service",url:this.parsedUrl}),[2]}}))}))},r.prototype.getField=function(e){return this.fieldsIndex.get(e)},r.prototype.getFieldDomain=function(e){var r=this.getField(e);return r&&r.domain?r.domain:null},Object.defineProperty(r.prototype,"geometryType",{get:function(){return"3d-object"===this.layerType?"mesh":"point"},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"profile",{get:function(){return"3d-object"===this.layerType?"mesh-pyramids":"points"},enumerable:!0,configurable:!0}),p([m.property({readOnly:!0,dependsOn:["layer","id"]})],r.prototype,"parsedUrl",null),p([m.property({type:j.I3SNodePageDefinition,readOnly:!0})],r.prototype,"nodePages",void 0),p([m.property({type:[j.I3SMaterialDefinition],readOnly:!0})],r.prototype,"materialDefinitions",void 0),p([m.property({type:[j.I3STextureSetDefinition],readOnly:!0})],r.prototype,"textureSetDefinitions",void 0),p([m.property({type:[j.I3SGeometryDefinition],readOnly:!0})],r.prototype,"geometryDefinitions",void 0),p([m.property({readOnly:!0})],r.prototype,"serviceUpdateTimeStamp",void 0),p([m.property({readOnly:!0})],r.prototype,"store",void 0),p([m.property({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],r.prototype,"rootNode",void 0),p([m.property({readOnly:!0})],r.prototype,"attributeStorageInfo",void 0),p([m.property(I.fields)],r.prototype,"fields",void 0),p([m.property({readOnly:!0,dependsOn:["fields"]})],r.prototype,"fieldsIndex",null),p([m.property(I.outFields)],r.prototype,"outFields",void 0),p([m.property({type:String,dependsOn:["fields"],readOnly:!0})],r.prototype,"objectIdField",null),p([m.property({readOnly:!0,type:g,aliasOf:"layer.fullExtent"})],r.prototype,"fullExtent",void 0),p([m.property({readOnly:!0,type:v,aliasOf:"layer.spatialReference"})],r.prototype,"spatialReference",void 0),p([m.property({readOnly:!0,aliasOf:"layer.version"})],r.prototype,"version",void 0),p([m.property({readOnly:!0,type:x,aliasOf:"layer.elevationInfo"})],r.prototype,"elevationInfo",void 0),p([m.property({readOnly:!0,type:Number,aliasOf:"layer.minScale"})],r.prototype,"minScale",void 0),p([m.property({readOnly:!0,type:Number,aliasOf:"layer.maxScale"})],r.prototype,"maxScale",void 0),p([m.property({type:["hide","show"],json:{write:!0}})],r.prototype,"listMode",void 0),p([m.property({types:a.webSceneRendererTypes,json:{origins:{service:{read:{source:"drawingInfo.renderer",reader:P.read}}},read:{source:"layerDefinition.drawingInfo.renderer",reader:P.read},write:{target:"layerDefinition.drawingInfo.renderer"}},value:null})],r.prototype,"renderer",void 0),p([m.property({type:String,json:{origins:{service:{read:!1,write:!1}},read:{source:"layerDefinition.definitionExpression"},write:{target:"layerDefinition.definitionExpression"}}})],r.prototype,"definitionExpression",void 0),p([m.property(O.popupEnabled)],r.prototype,"popupEnabled",void 0),p([m.property({type:l,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],r.prototype,"popupTemplate",void 0),p([m.property({readOnly:!0,type:String,json:{origins:{service:{read:{source:"store.normalReferenceFrame"}}},read:!1}})],r.prototype,"normalReferenceFrame",void 0),p([m.property({readOnly:!0,json:{read:!1},dependsOn:["fields","title"]})],r.prototype,"defaultPopupTemplate",null),p([m.enumeration.serializable()(new d.default({"3DObject":"3d-object",Point:"point"}))],r.prototype,"layerType",void 0),p([m.property({dependsOn:["layerType"]})],r.prototype,"geometryType",null),p([m.property({dependsOn:["layerType"]})],r.prototype,"profile",null),r=p([m.subclass("esri.layers.buildingSublayers.BuildingComponentSublayer")],r)}(m.declared(y.LoadableMixin(f.EsriPromiseMixin(b))))}));