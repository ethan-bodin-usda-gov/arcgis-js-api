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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../request","../core/promiseUtils","../core/queryUtils","../core/accessorSupport/decorators","../geometry/support/normalizeUtils","./Task","./mixins/NAServiceDescription","./support/ServiceAreaSolveResult"],(function(e,r,t,i,s,o,a,n,u,l,c,p,f){var m=n.createQueryParamsHelper({accumulateAttributes:{name:"accumulateAttributeNames"},attributeParameterValues:!0,defaultBreaks:!0,facilities:!0,outSpatialReference:{name:"outSR",getter:function(e){return e.outSpatialReference.wkid}},pointBarriers:{name:"barriers"},polylineBarriers:!0,polygonBarriers:!0,restrictionAttributes:{name:"restrictionAttributeNames"},returnPointBarriers:{name:"returnBarriers"},travelMode:!0});return function(e){function r(r){var t=e.call(this,r)||this;return t.url=null,t}return i(r,e),r.prototype.solve=function(e,r){var i=this,s=[],n=[],u={},c={};return e.facilities&&e.facilities.features&&this._collectGeometries(e.facilities.features,n,"facilities.features",u),e.pointBarriers&&e.pointBarriers.features&&this._collectGeometries(e.pointBarriers.features,n,"pointBarriers.features",u),e.polylineBarriers&&e.polylineBarriers.features&&this._collectGeometries(e.polylineBarriers.features,n,"polylineBarriers.features",u),e.polygonBarriers&&e.polygonBarriers.features&&this._collectGeometries(e.polygonBarriers.features,n,"polygonBarriers.features",u),l.normalizeCentralMeridian(n).then((function(e){for(var r in u){var t=u[r];s.push(r),c[r]=e.slice(t[0],t[1])}return i._isInputGeometryZAware(c,s)?i.getServiceDescription():a.resolve({dontCheck:!0})})).then((function(a){("dontCheck"in a?a.dontCheck:a.hasZ)||i._dropZValuesOffInputGeometry(c,s);var n=function(r){c[r].forEach((function(t,i){e.get(r)[i].geometry=t}))};for(var u in c)n(u);var l={query:t({},i.parsedUrl.query,{f:"json"},m.toQueryParams(e))};return(i.requestOptions||r)&&(l=t({},i.requestOptions,r,l)),o(i.parsedUrl.path+"/solveServiceArea",l)})).then((function(e){return f.fromJSON(e.data)}))},r.prototype._collectGeometries=function(e,r,t,i){i[t]=[r.length,r.length+e.length],e.forEach((function(e){r.push(e.geometry)}))},s([u.property()],r.prototype,"url",void 0),r=s([u.subclass("esri.tasks.ServiceAreaTask")],r)}(u.declared(p.NAServiceDescriptionMixin(c)))}));