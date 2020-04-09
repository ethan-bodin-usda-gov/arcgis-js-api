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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/accessorSupport/decorators","./mixins/ChartMediaInfo","./support/chartMediaInfoUtils"],(function(e,t,r,o,i,p,n){return function(e){function t(t){var r=e.call(this,t)||this;return r.type="pie-chart",r}var p;return r(t,e),p=t,t.prototype.clone=function(){return new p({title:this.title,caption:this.caption,value:this.value?this.value.clone():null})},o([i.property({type:["pie-chart"],readOnly:!0,json:{type:["piechart"],read:!1,write:n.chartTypeKebabDict.write}})],t.prototype,"type",void 0),t=p=o([i.subclass("esri.popup.content.PieChartMediaInfo")],t)}(i.declared(p))}));