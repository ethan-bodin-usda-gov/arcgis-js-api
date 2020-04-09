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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/JSONSupport","../../core/lang","../../core/accessorSupport/decorators","./AuthoringInfoClassBreakInfo"],(function(e,r,o,t,n,i,s,l){Object.defineProperty(r,"__esModule",{value:!0});var p=function(e){function r(r){var o=e.call(this,r)||this;return o.field="",o.normalizationField="",o.classBreakInfos=[],o}var n;return o(r,e),n=r,r.prototype.clone=function(){return new n({field:this.field,normalizationField:this.normalizationField,classBreakInfos:i.clone(this.classBreakInfos)})},t([s.property({type:String,json:{write:!0}})],r.prototype,"field",void 0),t([s.property({type:String,json:{write:!0}})],r.prototype,"normalizationField",void 0),t([s.property({type:[l.default],json:{write:!0}})],r.prototype,"classBreakInfos",void 0),r=n=t([s.subclass("esri.renderers.support.AuthoringInfoFieldInfo")],r)}(s.declared(n.JSONSupport));r.AuthoringInfoFieldInfo=p,r.default=p}));