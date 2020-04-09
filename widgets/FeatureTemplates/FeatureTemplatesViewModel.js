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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Evented","../../core/HandleOwner","../../core/ObjectPool","../../core/watchUtils","../../core/accessorSupport/decorators","./TemplateItem","./TemplateItemGroup"],(function(e,t,r,n,o,a,i,u,l,p,s){var c=function(e){var t=e.layer;return{key:t,label:t.title}},f=function(e){return e.layer.geometryType};return function(e){function t(t){var r=e.call(this,t)||this;return r._templateToLayer=new Map,r._itemPool=new i(p),r._groupPool=new i(s),r.filterFunction=null,r.groupBy="layer",r}return r(t,e),t.prototype.destroy=function(){this._templateToLayer.clear(),this._templateToLayer=null},Object.defineProperty(t.prototype,"layers",{get:function(){return this._get("layers")},set:function(e){var t=this;if(this.handles.removeAll(),e){var r=function(){return t.notifyChange("state")};this.handles.add(e.map((function(e){return u.when(e,"loadStatus",r)})))}this._set("layers",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){var e=this.layers;return e&&0!==e.length?e.some((function(e){return"loading"===e.loadStatus||"not-loaded"===e.loadStatus}))?"loading":"ready":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"items",{get:function(){var e=this,t=this.layers;if(this._destroyItems(this._get("items")),!t||0===t.length)return[];this._templateToLayer.clear();var r=t.filter((function(e){var t=e.capabilities;return e.loaded&&t.operations.supportsEditing&&t.operations.supportsAdd})).map((function(t){var r=e._getTemplatesForLayer(t);if(r.length>0)return r.forEach((function(r){return e._templateToLayer.set(r,t)})),r})).filter((function(e){return null!=e})),n=this.groupBy;if("none"===n)return r.map((function(t){return t.filter((function(t){var r=t.name;return!e.filterFunction||e.filterFunction({label:r})}))})).map((function(t){return t.map((function(t){return e._createItem(t)}))})).reduce((function(e,t){return e.concat(t)}),[]);var o=r.reduce((function(t,r){return r.forEach((function(r){var o=("layer"===n?c:"geometry"===n?f:n)({template:r,layer:e._templateToLayer.get(r)});if(o){var a="string"==typeof o?o:o.key,i="string"==typeof o?o:o.label;t.has(a)||t.set(a,{label:i,templates:[]}),t.get(a).templates.push(r)}})),t}),new Map);if(0===o.size)return[];var a=[],i=this.filterFunction;return o.forEach((function(t){var r=t.label,n=t.templates;if(!i||e.filterFunction(t))a.push(e._createGroup(r,n.map((function(t){return e._createItem(t)}))));else{var o=n.filter((function(t){var r=t.name;return e.filterFunction({label:r})})).map((function(t){return e._createItem(t)}));o.length>0&&a.push(e._createGroup(r,o))}})),a},enumerable:!0,configurable:!0}),t.prototype.refresh=function(){this.notifyChange("items")},t.prototype.select=function(e){var t=e.clone();this.emit("select",{item:t,template:t.template})},t.prototype._getTemplatesForLayer=function(e){var t=e.templates||[],r=(e.types||[]).map((function(e){return e.templates})).reduce((function(e,t){return e.concat(t)}),[]);return t.concat(r)},t.prototype._createItem=function(e){var t=this._itemPool.acquire();return t.set({template:e,layer:this._templateToLayer.get(e)}),t},t.prototype._createGroup=function(e,t){var r=this._groupPool.acquire();return r.set("label",e),r.items=t,r},t.prototype._destroyItems=function(e){var t=this;e&&(e[0]instanceof p?e.forEach((function(e){return t._destroyItem(e)})):e.forEach((function(e){return t._destroyGroup(e)})))},t.prototype._destroyGroup=function(e){var t=this;e.items.forEach((function(e){return t._itemPool.release(e)})),e.items.length=0,this._groupPool.release(e)},t.prototype._destroyItem=function(e){this._itemPool.release(e)},n([l.property()],t.prototype,"filterFunction",void 0),n([l.property()],t.prototype,"groupBy",void 0),n([l.property()],t.prototype,"layers",null),n([l.property({dependsOn:["layers"]})],t.prototype,"state",null),n([l.property({dependsOn:["filterFunction","groupBy","layers","state"],readOnly:!0})],t.prototype,"items",null),t=n([l.subclass("esri.widgets.FeatureTemplates.FeatureTemplatesViewModel")],t)}(l.declared(a.HandleOwnerMixin(o.EventedAccessor)))}));