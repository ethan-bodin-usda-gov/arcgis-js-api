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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/accessorSupport/decorators","./Edges3D"],(function(e,r,t,o,s,p){return function(e){function r(r){var t=e.call(this,r)||this;return t.type="solid",t}var p;return t(r,e),p=r,r.prototype.clone=function(){return new p(this.cloneProperties())},o([s.property({type:["solid"]})],r.prototype,"type",void 0),r=p=o([s.subclass("esri.symbols.support.SolidEdges3D")],r)}(s.declared(p))}));