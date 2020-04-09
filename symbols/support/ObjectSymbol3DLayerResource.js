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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/jsonMap","../../core/JSONSupport","../../core/urlUtils","../../core/accessorSupport/decorators"],(function(e,r,t,o,i,n,p,c){Object.defineProperty(r,"__esModule",{value:!0});var s=i.strict()({sphere:"sphere",cylinder:"cylinder",cube:"cube",cone:"cone",diamond:"diamond",tetrahedron:"tetrahedron",invertedCone:"inverted-cone"}),u=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}var i;return t(r,e),i=r,r.prototype.clone=function(){return new i({href:this.href,primitive:this.primitive})},o([c.property({type:String,json:{read:p.read,write:p.write}})],r.prototype,"href",void 0),o([c.enumeration.serializable()(s)],r.prototype,"primitive",void 0),r=i=o([c.subclass("esri.symbols.support.ObjectSymbol3DLayerResource")],r)}(c.declared(n.JSONSupport));r.ObjectSymbol3DLayerResource=u,r.defaultPrimitive="sphere",r.default=u}));