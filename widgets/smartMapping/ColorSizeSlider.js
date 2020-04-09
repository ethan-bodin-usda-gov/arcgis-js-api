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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","dojo/i18n!./ColorSizeSlider/nls/ColorSizeSlider","../../core/maybe","../../core/accessorSupport/decorators","../../renderers/visualVariables/support/ColorSizeStop","../../renderers/visualVariables/support/ColorStop","../../renderers/visualVariables/support/SizeStop","./SmartMappingSliderBase","./ColorSizeSlider/ColorSizeSliderViewModel","./support/utils","./../support/widget"],(function(e,i,r,l,t,o,a,s,n,d,p,u,m,v,c){var h="esri-color-size-slider",b="esri-color-size-slider__ramp",g="esri-color-size-slider__slider-container",S="esri-color-size-slider__histogram-container",f="esri-widget",z="esri-widget--panel",w="esri-disabled";return function(e){function i(i){var r=e.call(this,i)||this;return r._bgFillId=null,r._backgroundFillColor="#e0e0e0",r._minRampFillWidth=.2,r._rampFillId=null,r._rampNode=null,r._maxRampFillWidth=1,r.label=o.widgetLabel,r.stops=null,r.viewModel=new m,r.zoomOptions=null,r._bgFillId=r.id+"-bg-fill",r._rampFillId=r.id+"-linear-gradient",r}var r;return l(i,e),r=i,i.fromRendererResult=function(e,i){var l=e.color.visualVariable.stops,t=e.size.visualVariables,o=e.statistics,a=o.avg,s=o.stddev,d=e.renderer.authoringInfo.visualVariables[0],p=d.minSliderValue,u=d.maxSliderValue,m=t[0],v=l.map((function(e,i){var r=e.color,t=e.label,o=e.value;return new n({color:r,label:t,value:o,size:0===i?m.minSize:i===l.length-1?m.maxSize:null})}));return new r({max:u,min:p,stops:v,histogramConfig:{average:a,standardDeviation:s,bins:i?i.bins:[]}})},i.prototype.updateFromRendererResult=function(e,i){var r=e.color.visualVariable.stops,l=e.size.visualVariables,t=e.statistics,o=t.avg,a=t.stddev,s=e.renderer.authoringInfo.visualVariables[0],d=s.minSliderValue,p=s.maxSliderValue,u=l[0],m=r.map((function(e,i){var l=e.color,t=e.label,o=e.value;return new n({color:l,label:t,value:o,size:0===i?u.minSize:i===r.length-1?u.maxSize:null})}));this.set({max:p,min:d,stops:m,histogramConfig:{average:o,standardDeviation:a,bins:i?i.bins:[]}})},i.prototype.updateVisualVariables=function(e){var i=this;return e.map((function(e){var r=e.clone();if("size"===e.type)if(a.isSome(e.minSize)&&a.isSome(e.maxSize)){var l=i.stops,t=l[0],o=l[l.length-1];r.set({maxDataValue:o.value,minDataValue:t.value,maxSize:o.size,minSize:t.size})}else e.stops&&r.set({stops:i.stops.map((function(e){var i=e.label,r=e.size,l=e.value;return new p({label:i,size:r,value:l})}))});else"color"===e.type&&r.set({stops:i.stops.map((function(e){var i=e.color,r=e.label,l=e.value;return new d({color:i,label:r,value:l})}))});return r}))},i.prototype.render=function(){var e,i=this.state,r=this.label,l="disabled"===i,t=this.classes(h,f,z,((e={})[w]=l,e));return c.tsx("div",{"aria-label":r,class:t},l?null:this.renderContent(this.renderRamp(),g,S))},i.prototype.renderRamp=function(){var e=this._bgFillId,i=this._rampFillId,r=this.viewModel,l=this.zoomOptions,t=r.getColorStopInfo();return c.tsx("div",{afterCreate:c.storeNode,bind:this,class:b,"data-node-ref":"_rampNode"},c.tsx("svg",{xmlns:"http://www.w3.org/2000/svg"},c.tsx("defs",null,this.renderRampFillDefinition(i,t),this.renderBackgroundFillDefinition(e)),c.tsx("rect",{x:"0",y:"0",fill:this._backgroundFillColor,height:"100%",width:"100%"}),this.renderPaths()),l?this.renderZoomCaps():null)},i.prototype.renderPaths=function(){if(this._rampNode){var e=this._rampNode,i=e.offsetHeight,r=void 0===i?0:i,l=e.offsetWidth,t=void 0===l?0:l;if(a.isSome(r)&&a.isSome(t)){var o=this,s=o.stops,n=o.values,d=o.viewModel,p=d.max,u=d.min,m=o._bgFillId,h=o._maxRampFillWidth,b=o._minRampFillWidth,g=o._rampFillId,S=[h,b];s[0].size<s[s.length-1].size&&S.reverse();var f=S[0],z=S[1],w=n[0],x=n[1],_=v.getPathForSizeStops({bottomValue:w,bottomWidth:f,max:p,min:u,pathHeight:r,pathWidth:t,topValue:x,topWidth:z});return[c.tsx("path",{key:"background",d:_,fill:"url(#"+m+")"}),c.tsx("path",{key:"fill",d:_,fill:"url(#"+g+")"})]}}},t([s.property()],i.prototype,"label",void 0),t([s.aliasOf("viewModel.stops")],i.prototype,"stops",void 0),t([s.property(),c.renderable(["viewModel.hasTimeData","viewModel.inputFormatFunction","viewModel.inputParseFunction","viewModel.labelFormatFunction","viewModel.max","viewModel.min","viewModel.stops","viewModel.values","viewModel.zoomOptions"])],i.prototype,"viewModel",void 0),t([s.aliasOf("viewModel.zoomOptions")],i.prototype,"zoomOptions",void 0),i=r=t([s.subclass("esri.widgets.smartMapping.ColorSizeSlider")],i)}(s.declared(u.SmartMappingSliderBase))}));