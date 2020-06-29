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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/assignHelper","../../Color","../../core/maybe","../../core/watchUtils","../../core/accessorSupport/decorators","../Histogram","../Slider","../Widget","./support/utils","../support/widget"],(function(o,t,e,i,n,r,a,s,p,l,m,u,c,d){Object.defineProperty(t,"__esModule",{value:!0});var g="zoom-cap",h="zoom-cap--max",v="zoom-cap--min",f="zoom-cap--line",y="zoom-cap--mask",w="zoom-cap--underline",x=function(o){function t(t){var e=o.call(this,t)||this;e.hasTimeData=null,e.histogram=new l({layout:"vertical"}),e.histogramConfig=null,e.inputFormatFunction=null,e.inputParseFunction=null,e.labelFormatFunction=null,e.precision=4,e.slider=new m({layout:"vertical",visibleElements:{labels:!0,rangeLabels:!0},labelInputsEnabled:!0,rangeLabelInputsEnabled:!0}),e.state=null,e.viewModel=null,e.zoomOptions=null;var i=e.slider;return e.own(i.on("max-change",(function(o){return e.emit("max-change",o)})),i.on("min-change",(function(o){return e.emit("min-change",o)})),i.on("thumb-change",(function(o){return e.emit("thumb-change",o)})),i.on("thumb-drag",(function(o){return e.emit("thumb-drag",o)})),s.watch(e,["histogramConfig","max","min","zoomOptions"],(function(){var o=e,t=o.histogram,i=o.histogramConfig,r=o.viewModel,a=r.max,s=r.min,p=e.getParamsFromHistogramConfig(i);t.set(n({},p,{max:a,min:s}))})),s.watch(e,"labelFormatFunction",(function(){var o=e,t=o.histogram,i=o.labelFormatFunction;t.set({labelFormatFunction:i})}))),e._onMaxZoomCapPointerDown=e._onMaxZoomCapPointerDown.bind(e),e._onMinZoomCapPointerDown=e._onMinZoomCapPointerDown.bind(e),e}return e(t,o),t.prototype.postInitialize=function(){var o=this,t=this.histogramConfig,e=void 0===t?{}:t,i=this.viewModel,r=i.labelFormatFunction,a=i.max,p=i.min,l=this.getParamsFromHistogramConfig(e);this.own(s.watch(i,"max",(function(){return o.notifyChange("max")})),s.watch(i,"min",(function(){return o.notifyChange("min")}))),this.histogram.set(n({labelFormatFunction:r},l,{max:a,min:p})),this.slider.set({viewModel:i})},Object.defineProperty(t.prototype,"max",{get:function(){return this.viewModel?this.viewModel.getUnzoomedMax():null},set:function(o){this.viewModel.max=o,this._set("max",o)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"min",{get:function(){return this.viewModel?this.viewModel.getUnzoomedMin():null},set:function(o){this.viewModel.min=o,this._set("min",o)},enumerable:!0,configurable:!0}),t.prototype.renderContent=function(o,t,e){return this.slider.extraNodes=[o,this.renderHistogram(e)],d.tsx("div",{class:t},this.slider.render())},t.prototype.renderHistogram=function(o){return this.histogramConfig?d.tsx("div",{class:o||null},this.histogram.render()):null},t.prototype.renderBackgroundFillDefinition=function(o){return d.tsx("pattern",{id:o,patternUnits:"userSpaceOnUse",x:"0",y:"0",width:"15",height:"15"},d.tsx("image",{x:"0",y:"0",width:"15",height:"15",href:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNjY2MiIC8+PHBhdGggZD0iTTAgMCBMOCAwIEw4IDggTDAgOCBaIiBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDgpIiAvPjxwYXRoIGQ9Ik0wIDAgTDggMCBMOCA4IEwwIDggWiIgZmlsbD0iI2NjYyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCw4KSIgLz48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgsMCkiIC8+PC9zdmc+"}))},t.prototype.renderRampFillDefinition=function(o,t){return d.tsx("linearGradient",{id:o,x1:"0",x2:"0",y1:"0",y2:"1"},this.renderRampFillStops(t))},t.prototype.renderRampFillStops=function(o){var t=this;return o.reverse().map((function(o,e){return t.renderStop(o,e)}))},t.prototype.renderStop=function(o,t){var e=this.getPropsForStop(o),i=e.color,n=e.offset,r=e.opacity;return d.tsx("stop",{key:t+"-stop",offset:n,"stop-color":i,"stop-opacity":r})},t.prototype.renderZoomCaps=function(){return[this.renderMaxZoomCap(),this.renderMinZoomCap()]},t.prototype.renderMinZoomCap=function(){if(this.zoomOptions&&a.isSome(this.zoomOptions.min))return d.tsx("svg",{key:"bottom",class:this.classes(g,v),viewBox:"0 0 30 11",xmlns:"http://www.w3.org/2000/svg",onpointerdown:this._onMinZoomCapPointerDown},d.tsx("polygon",{class:y,key:"mask",fill:"#1B8617",points:"0 11.3846154 30 11.3846154 30 1 25 5.38461538 20 1 15 5.38461538 10 1 5 5.38461538 0 1"}),d.tsx("polygon",{class:w,key:"underline",fill:"#69DCFF",points:"0 0 5 4.38461538 10 0 15 4.38461538 20 0 25 4.38461538 30 0 30 4.61538462 25 9 20 4.61538462 15 9 10 4.61538462 5 9 0 4.61538462"}),d.tsx("polygon",{class:f,key:"line",fill:"#DA5656",points:"0 1 5 5.38461538 10 1 15 5.38461538 20 1 25 5.38461538 30 1 30 5.61538462 25 10 20 5.61538462 15 10 10 5.61538462 5 10 0 5.61538462"}))},t.prototype.renderMaxZoomCap=function(){if(this.zoomOptions&&a.isSome(this.zoomOptions.max))return d.tsx("svg",{key:"top",class:this.classes(g,h),viewBox:"0 0 30 11",xmlns:"http://www.w3.org/2000/svg",onpointerdown:this._onMaxZoomCapPointerDown},d.tsx("polygon",{class:y,key:"mask",points:"0 -1.81994377e-12 30 -1.81994377e-12 30 8.23076923 25 3.61538462 20 8.23076923 15 3.61538462 10 8.23076923 5 3.61538462 0 8.23076923"}),d.tsx("polygon",{class:w,key:"underline",points:"0 5.61538462 5 1 10 5.61538462 15 1 20 5.61538462 25 1 30 5.61538462 30 10.2307692 25 5.61538462 20 10.2307692 15 5.61538462 10 10.2307692 5 5.61538462 0 10.2307692"}),d.tsx("polygon",{class:f,key:"line",points:"0 4.61538462 5 -1.87329639e-12 10 4.61538462 15 -1.87329639e-12 20 4.61538462 25 -1.87329639e-12 30 4.61538462 30 9.23076923 25 4.61538462 20 9.23076923 15 4.61538462 10 9.23076923 5 4.61538462 0 9.23076923"}))},t.prototype.getPropsForStop=function(o){var t=o.color,e=o.offset;return{color:t instanceof r?t.toCss(!0):r.fromString(t).toCss(!0),offset:(100*e).toFixed(2)+"%",opacity:t instanceof r?t.toRgba()[3]:null}},t.prototype.getParamsFromHistogramConfig=function(o){return o?{average:o.average,barCreatedFunction:o.barCreatedFunction,bins:o.bins,dataLineCreatedFunction:o.dataLineCreatedFunction,dataLines:this._getDataLines(o)}:null},t.prototype._onMaxZoomCapPointerDown=function(){var o=this.zoomOptions;if(o&&a.isSome(o.max)){var t=o.min;this.zoomOptions=a.isSome(t)?{min:t}:null}},t.prototype._onMinZoomCapPointerDown=function(){var o=this.zoomOptions;if(o&&a.isSome(o.min)){var t=o.max;this.zoomOptions=a.isSome(t)?{max:t}:null}},t.prototype._getDataLines=function(o){var t=o.average,e=o.standardDeviation,i=o.standardDeviationCount;return this._getStandardDeviationDataLines(e,t,i||1).concat(o.dataLines||[])},t.prototype._getStandardDeviationDataLines=function(o,t,e){return c.getDeviationValues(o,t,e).map((function(o){return{value:o}}))},i([p.aliasOf("viewModel.hasTimeData")],t.prototype,"hasTimeData",void 0),i([p.property()],t.prototype,"histogram",void 0),i([p.property()],t.prototype,"histogramConfig",void 0),i([p.aliasOf("viewModel.inputFormatFunction")],t.prototype,"inputFormatFunction",void 0),i([p.aliasOf("viewModel.inputParseFunction")],t.prototype,"inputParseFunction",void 0),i([p.aliasOf("viewModel.labelFormatFunction")],t.prototype,"labelFormatFunction",void 0),i([p.property({dependsOn:["viewModel.max","viewModel.zoomOptions"]})],t.prototype,"max",null),i([p.property({dependsOn:["viewModel.min","viewModel.zoomOptions"]})],t.prototype,"min",null),i([p.aliasOf("viewModel.precision")],t.prototype,"precision",void 0),i([p.property()],t.prototype,"slider",void 0),i([p.aliasOf("viewModel.state")],t.prototype,"state",void 0),i([p.aliasOf("viewModel.values")],t.prototype,"values",void 0),i([p.property()],t.prototype,"viewModel",void 0),i([p.aliasOf("viewModel.zoomOptions")],t.prototype,"zoomOptions",void 0),t=i([p.subclass("esri.widgets.smartMapping.SmartMappingSliderBase")],t)}(p.declared(u));t.SmartMappingSliderBase=x}));