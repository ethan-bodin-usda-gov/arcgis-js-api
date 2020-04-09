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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../Color","../../core/JSONSupport","../../core/accessorSupport/decorators"],(function(r,o,e,t,p,c,l){Object.defineProperty(o,"__esModule",{value:!0});var n=function(r){function o(o){var e=r.call(this,o)||this;return e.color=null,e.ratio=null,e}var c;return e(o,r),c=o,o.prototype.clone=function(){return new c({color:this.color,ratio:this.ratio})},t([l.property({type:p,json:{write:!0}})],o.prototype,"color",void 0),t([l.property({type:Number,json:{write:!0}})],o.prototype,"ratio",void 0),o=c=t([l.subclass("esri.renderers.support.HeatmapColorStop")],o)}(l.declared(c.JSONSupport));o.HeatmapColorStop=n,o.default=n}));