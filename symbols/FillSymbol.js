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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/jsonMap","../core/accessorSupport/decorators","./SimpleLineSymbol","./Symbol"],(function(e,t,r,o,l,p,i,s){var n=new l.default({esriSFS:"simple-fill",esriPFS:"picture-fill"});return function(e){function t(t){var r=e.call(this,t)||this;return r.outline=null,r.type=null,r}return r(t,e),t.prototype.hash=function(){return this.type+"."+(this.outline&&this.outline.hash())},o([p.property({type:i,json:{default:null,write:!0}})],t.prototype,"outline",void 0),o([p.property({type:n.apiValues,readOnly:!0,json:{type:n.jsonValues}})],t.prototype,"type",void 0),t=o([p.subclass("esri.symbols.FillSymbol")],t)}(p.declared(s))}));