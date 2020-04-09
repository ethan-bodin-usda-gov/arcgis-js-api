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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!../nls/common","dojo/i18n!./CoordinateConversion/nls/CoordinateConversion","../core/events","../core/global","../core/Logger","../core/accessorSupport/decorators","./Widget","./CoordinateConversion/CoordinateConversionViewModel","./CoordinateConversion/support/Conversion","./support/widget"],(function(e,t,o,i,n,s,r,a,l,d,p,c,u,_){var v="esri-coordinate-conversion esri-widget",h="esri-coordinate-conversion--capture-mode",b="esri-coordinate-conversion--no-basemap",g="esri-coordinate-conversion__popup",y="esri-coordinate-conversion__conversion-list",m="esri-coordinate-conversion__row",f="esri-coordinate-conversion__display",x="esri-coordinate-conversion__conversions-view--expanded",C="esri-coordinate-conversion__conversions-view--expand-down",w="esri-coordinate-conversion__conversions-view--expand-up",k="esri-coordinate-conversion__conversions-view",I="esri-coordinate-conversion__select-primary",M="esri-coordinate-conversion__select-row",V="esri-coordinate-conversion__tools",P="esri-coordinate-conversion__mode-toggle",T="esri-coordinate-conversion__row-button",F="esri-coordinate-conversion__back-button",O="esri-coordinate-conversion__button",S="esri-coordinate-conversion__input-coordinate",D="esri-coordinate-conversion__input-form",E="esri-coordinate-conversion__input-group",L="esri-coordinate-conversion__input-coordinate--rejected",H="esri-coordinate-conversion__heading",A="esri-coordinate-conversion__pattern-input",R="esri-coordinate__settings",q="esri-coordinate-conversion__settings-group",B="esri-coordinate-conversion__settings-group-horizontal",U="esri-coordinate-conversion__preview-coordinate",j="esri-disabled",G="esri-input",N="esri-button",z="esri-widget__heading",K="esri-widget--button",W="esri-icon-left-arrow",J="esri-icon-map-pin",Q="esri-icon-up",X="esri-icon-duplicate",Y="esri-icon-edit",Z="esri-select",$="esri-icon-down",ee="esri-icon-refresh",te="esri-icon-close",oe="esri-icon-settings2",ie=l.getLogger("esri.widgets.CoordinateConversion");return function(e){function t(t){var o=e.call(this,t)||this;return o._popupMessage=null,o._popupId=null,o._coordinateInput=null,o._badInput=!1,o._goToEnabled=!1,o._conversionFormat=null,o._settingsFormat=null,o._previewConversion=null,o._expanded=!1,o._popupVisible=!1,o._settingsVisible=!1,o._inputVisible=!1,o.conversions=null,o.currentLocation=null,o.formats=null,o.goToOverride=null,o.label=s.widgetLabel,o.mode=null,o.orientation="auto",o.requestDelay=null,o.view=null,o.viewModel=new c,o}return o(t,e),Object.defineProperty(t.prototype,"multipleConversions",{get:function(){var e=this._get("multipleConversions");return"boolean"!=typeof e||e},set:function(e){!1===e&&(this._expanded=!1,this.conversions.splice(1,this.conversions.length-1)),this._set("multipleConversions",e)},enumerable:!0,configurable:!0}),t.prototype.reverseConvert=function(e,t){return this.viewModel.reverseConvert(e,t)},t.prototype.render=function(){var e,t=this.get("viewModel.state"),o="disabled"===t?_.tsx("div",{key:"esri-coordinate__no-basemap"},s.noBasemap):null,i=!o&&this._inputVisible?this._renderInputForm():null,n=!o&&this._settingsVisible?this._renderSettings():null,r=o||i||n?null:this._renderConversionsView(),a=this._popupVisible?this._renderPopup():null,l=((e={})[h]="capture"===this.mode,e[j]="loading"===t,e[b]="disabled"===t,e);return _.tsx("div",{class:this.classes(v,l)},a,o,r,n,i)},t.prototype._addConversion=function(e){var t=e.target,o=t.options[t.options.selectedIndex]["data-format"],i=t["data-index"],n=new u({format:o});t.options.selectedIndex=0,i>=0&&this.conversions.removeAt(i),this.conversions.add(n,i)},t.prototype._findSettingsFormat=function(){return this._settingsFormat||this.conversions.reduceRight((function(e,t){var o=t.format;return o.get("hasDisplayProperties")?o:e}),null)||this.formats.find((function(e){return e.hasDisplayProperties}))},t.prototype._hidePopup=function(){this._popupId&&(clearTimeout(this._popupId),this._popupId=null),this._popupVisible=!1,this._popupMessage=null,this.scheduleRender()},t.prototype._onConvertComplete=function(){this._inputVisible=!1,this._coordinateInput.value=""},t.prototype._onCopy=function(e){var t=e.currentTarget["data-conversion"].displayCoordinate;"clipboardData"in a?a.clipboardData.setData("text",t):e.clipboardData.setData("text/plain",t),this._showPopup(s.copySuccessMessage),e.preventDefault()},t.prototype._processUserInput=function(e){var t=this,o=r.eventKey(e),i=this.viewModel;if("Enter"!==o&&o)this._badInput&&(this._badInput=!1);else{var n=this._coordinateInput["data-format"],a=this._coordinateInput.value;this._reverseConvert(a,n).then((function(e){"capture"===t.mode?i.resume():t.mode="capture",t.currentLocation=e,i.setLocation(e),t._onConvertComplete()})).catch((function(e){ie.error(e),t._showPopup(s.invalidCoordinate),t._badInput=!0}))}},t.prototype._reverseConvert=function(e,t){var o=this,i=this.viewModel;return t.reverseConvert(e).then((function(e){return o._goToEnabled&&i.goToLocation(e).catch((function(e){ie.warn(e),o._showPopup(s.locationOffBasemap)})),e}))},t.prototype._setInputFormat=function(e){var t=e.target,o=t[t.options.selectedIndex]["data-format"];this._conversionFormat=o},t.prototype._setPreviewConversion=function(){var e=this._findSettingsFormat(),t=this.viewModel;if(e){var o=this.conversions.find((function(t){return t.format===e}));this._previewConversion=new u({format:e,position:{location:this.currentLocation,coordinate:o&&o.position.coordinate}}),this._previewConversion.position.coordinate||t.previewConversion(this._previewConversion)}},t.prototype._setSettingsFormat=function(e){var t=e.target,o=t[t.options.selectedIndex]["data-format"];this._settingsFormat=o,this._setPreviewConversion()},t.prototype._showPopup=function(e,t){var o=this;void 0===t&&(t=2500),this._popupMessage=e,this._popupVisible?clearTimeout(this._popupId):this._popupVisible=!0,this.scheduleRender(),this._popupId=setTimeout((function(){o._popupId=null,o._hidePopup()}),t)},t.prototype._toggleGoTo=function(){this._goToEnabled=!this._goToEnabled},t.prototype._updateCurrentPattern=function(e){e.stopPropagation();var t=e.target,o=this._findSettingsFormat();o&&(o.currentPattern=t.value)},t.prototype._renderConversion=function(e,t){var o=this.id+"__list-item-"+t,i=e.format.name+" "+s.conversionOutputSuffix,n=0===t,r=n||this._expanded,a=n?this._renderFirstConversion(e):this._renderTools(t,e,o),l=n&&!e.displayCoordinate?s.noLocation:e.displayCoordinate,d=_.tsx("div",{"aria-label":l,class:f,"data-conversion":e,role:"listitem",tabindex:"0",title:l},l),p=this._renderOptions(this.formats.filter((function(t){return t!==e.format})));return r?_.tsx("li",{"aria-label":i,class:m,id:o,key:e,role:"group",title:i,tabindex:"0"},_.tsx("select",{"aria-controls":o,"aria-label":s.selectFormat,class:this.classes(Z,M),bind:this,"data-index":t,onchange:this._addConversion,title:s.selectFormat},_.tsx("option",{"aria-label":e.format.name,selected:!0,title:e.format.name},e.format.name.toUpperCase()),p),d,a):null},t.prototype._renderCopyButton=function(e){return _.tsx("li",{"aria-label":n.copy,bind:this,class:this.classes(K,T),"data-conversion":e,onclick:this._copyCoordinateOutput,onkeydown:this._copyCoordinateOutput,oncopy:this._onCopy,role:"button",tabindex:"0",title:n.copy},_.tsx("span",{"aria-hidden":"true",class:X}))},t.prototype._renderFirstConversion=function(e){var t,o=this.id,i=((t={})[$]=!this._expanded,t[Q]=this._expanded,t),r="live"===this.mode?s.captureMode:s.liveMode,a=this._expanded?n.collapse:n.expand,l=e.displayCoordinate&&"capture"===this.mode?this._renderCopyButton(e):null,d=this.multipleConversions?_.tsx("li",{"aria-controls":o+"__"+y,"aria-label":a,bind:this,class:K,key:"esri-coordinate-conversion__expand-button",onclick:this._toggleExpand,onkeydown:this._toggleExpand,role:"button",tabindex:"0",title:a},_.tsx("span",{"aria-hidden":"true",class:this.classes(i)})):_.tsx("li",{"aria-label":r,bind:this,class:this.classes(K,P),key:"esri-coordinate-conversion__mode-toggle",onclick:this._toggleMode,onkeydown:this._toggleMode,role:"button",tabindex:"0",title:r},_.tsx("span",{"aria-hidden":"true",class:J}));return _.tsx("ul",{class:V},l,d)},t.prototype._renderInputForm=function(){var e,t=this._conversionFormat||this.conversions.getItemAt(0).format,o=this.formats.findIndex((function(e){return e.name===t.name})),i=this.id,r=i+"__"+S,a=i+"__"+S+"__header",l=this._renderOptions(this.formats,!0,o),d=((e={})[L]=this._badInput,e);return _.tsx("div",{"aria-labelledby":a,class:D,key:"esri-coordinate-conversion__input-form",role:"search"},_.tsx("div",{class:H},_.tsx("div",{"aria-label":n.back,bind:this,class:this.classes(K,F),onclick:this._toggleInputVisibility,onkeydown:this._toggleInputVisibility,role:"button",tabindex:"0",title:n.back},_.tsx("span",{"aria-hidden":"true",class:W})),_.tsx("h4",{class:z,id:a},s.inputCoordTitle)),_.tsx("div",{class:E},_.tsx("select",{"aria-controls":r,"aria-label":s.selectFormat,bind:this,class:this.classes(Z,M),onchange:this._setInputFormat,title:s.selectFormat},l),_.tsx("input",{afterCreate:_.storeNode,"aria-labelledby":a,"aria-required":"true",bind:this,class:this.classes(S,G,d),"data-format":t,"data-node-ref":"_coordinateInput",id:r,onkeydown:this._processUserInput,placeholder:s.inputCoordTitle,role:"textbox",spellcheck:!1,title:s.inputCoordTitle,type:"text"})),_.tsx("div",{class:E},_.tsx("label",{"aria-label":s.goTo},_.tsx("input",{bind:this,checked:this._goToEnabled,onclick:this._toggleGoTo,title:s.goTo,type:"checkbox"}),s.goTo),_.tsx("button",{"aria-label":s.convert,bind:this,class:this.classes(O,N),onclick:this._processUserInput,title:s.convert,type:"button"},s.convert)))},t.prototype._renderConversionsView=function(){var e,t=this,o=this.id+"__"+y,i=this._renderPrimaryTools(),n=this._renderOptions(this.formats),r=this.conversions.map((function(e,o){return t._renderConversion(e,o)})).toArray(),a=this._expanded?_.tsx("div",{class:m},_.tsx("select",{"aria-controls":o,"aria-label":s.addConversion,bind:this,class:this.classes(Z,I),onchange:this._addConversion,title:s.addConversion},_.tsx("option",{disabled:!0,selected:!0,value:""},s.addConversion),n),i):null,l=((e={})[x]=this._expanded,e[w]="expand-up"===this.orientation,e[C]="expand-down"===this.orientation,e);return _.tsx("div",{class:this.classes(k,l),key:"esri-coordinate-conversion__main-view"},_.tsx("ul",{"aria-expanded":this._expanded?"true":"false",class:y,id:o},r),a)},t.prototype._renderOptions=function(e,t,o){var i=this,n=this.conversions.getItemAt(0);return e.map((function(e,s){var r=!(t||!n)&&(n.format.name===e.name||i.conversions.map((function(e){return e.format.name})).includes(e.name));return _.tsx("option",{"aria-label":e.name,"data-format":e,disabled:r,key:e.name,selected:s===o,value:e.name},e.name.toUpperCase())})).toArray()},t.prototype._renderPopup=function(){return _.tsx("div",{class:g,role:"alert"},this._popupMessage)},t.prototype._renderPrimaryTools=function(){var e="live"===this.mode?s.captureMode:s.liveMode;return _.tsx("ul",{class:V},_.tsx("li",{bind:this,class:K,onclick:this._toggleInputVisibility,onkeydown:this._toggleInputVisibility,role:"button",tabindex:"0",title:s.inputCoordTitle},_.tsx("span",{"aria-hidden":"true",class:Y})),_.tsx("li",{bind:this,class:this.classes(K,P),onclick:this._toggleMode,onkeydown:this._toggleMode,role:"button",tabindex:"0",title:e},_.tsx("span",{"aria-hidden":"true",class:J})),_.tsx("li",{bind:this,class:K,onclick:this._toggleSettingsVisibility,onkeydown:this._toggleSettingsVisibility,role:"button",tabindex:"0",title:s.settingsTitle},_.tsx("span",{"aria-hidden":"true",class:oe})))},t.prototype._renderSettings=function(){var e=this.id,t=e+"__"+A,o=e+"__"+A+"__header",i=e+"__"+U,r=this.formats.filter((function(e){return e.hasDisplayProperties})),a=this._findSettingsFormat(),l=r.indexOf(a),d=this._renderOptions(r,!0,l),p=a.get("currentPattern");return _.tsx("div",{"aria-labelledby":o,class:R,key:"esri-coordinate-conversion__settings"},_.tsx("div",{class:H},_.tsx("div",{bind:this,class:this.classes(K,F),onclick:this._toggleSettingsVisibility,onkeydown:this._toggleSettingsVisibility,role:"button",tabindex:"0",title:n.back},_.tsx("span",{"aria-hidden":"true",class:W})),_.tsx("h4",{class:z,id:o},s.settingsTitle)),_.tsx("div",{class:q},_.tsx("label",{for:t},s.changeCoordinateDisplay),_.tsx("select",{"aria-label":s.selectFormat,class:Z,bind:this,onchange:this._setSettingsFormat,title:s.selectFormat},d),_.tsx("div",{class:B},_.tsx("input",{"aria-controls":i,bind:this,class:this.classes(A,G),id:t,oninput:this._updateCurrentPattern,spellcheck:!1,title:s.changeCoordinateDisplay,type:"text",value:p}),_.tsx("div",{"aria-controls":t,bind:this,class:K,onclick:this._setDefaultPattern,onkeydown:this._setDefaultPattern,role:"button",tabindex:"0",title:s.defaultPattern},_.tsx("span",{"aria-hidden":"true",class:ee})))),_.tsx("div",{class:q},_.tsx("label",null,n.preview,_.tsx("div",{class:U,id:i,tabindex:"0"},this._previewConversion.displayCoordinate))))},t.prototype._renderTools=function(e,t,o){var i=t.displayCoordinate&&"capture"===this.mode?this._renderCopyButton(t):null;return _.tsx("ul",{class:V,role:"listitem"},i,_.tsx("li",{"aria-controls":o,"aria-label":s.removeConversion,bind:this,class:this.classes(K,T),"data-index":e,key:o+"__"+K,onclick:this._removeConversion,onkeydown:this._removeConversion,tabindex:"0",role:"button",title:s.removeConversion},_.tsx("span",{"aria-hidden":"true",class:te})))},t.prototype._copyCoordinateOutput=function(e){var t=e.target;if(!("createTextRange"in document.body)){var o=window.getSelection(),i=document.createRange();i.selectNodeContents(t),o.removeAllRanges(),o.addRange(i)}document.execCommand("copy")},t.prototype._removeConversion=function(e){var t=e.currentTarget["data-index"];this.conversions.removeAt(t)},t.prototype._setDefaultPattern=function(e){e.stopPropagation();var t=this._findSettingsFormat();t&&(t.currentPattern=t.get("defaultPattern"))},t.prototype._toggleExpand=function(){this._expanded=!this._expanded},t.prototype._toggleInputVisibility=function(){this._inputVisible=!this._inputVisible,this._popupVisible&&this._hidePopup(),this._inputVisible?this.viewModel.pause():this.viewModel.resume()},t.prototype._toggleMode=function(){this.mode="live"===this.mode?"capture":"live"},t.prototype._toggleSettingsVisibility=function(){this._settingsVisible=!this._settingsVisible,this._popupVisible&&this._hidePopup(),this._settingsVisible?(this._setPreviewConversion(),this.viewModel.pause()):this.viewModel.resume()},i([d.aliasOf("viewModel.conversions")],t.prototype,"conversions",void 0),i([d.aliasOf("viewModel.currentLocation"),_.renderable()],t.prototype,"currentLocation",void 0),i([d.aliasOf("viewModel.formats"),_.renderable()],t.prototype,"formats",void 0),i([d.aliasOf("viewModel.goToOverride")],t.prototype,"goToOverride",void 0),i([d.property()],t.prototype,"label",void 0),i([d.aliasOf("viewModel.mode"),_.renderable()],t.prototype,"mode",void 0),i([d.property(),_.renderable()],t.prototype,"orientation",void 0),i([d.aliasOf("viewModel.requestDelay")],t.prototype,"requestDelay",void 0),i([d.property(),_.renderable()],t.prototype,"multipleConversions",null),i([d.aliasOf("viewModel.locationSymbol")],t.prototype,"locationSymbol",void 0),i([d.aliasOf("viewModel.view"),_.renderable()],t.prototype,"view",void 0),i([d.property({type:c}),_.renderable(["viewModel.state","viewModel.waitingForConversions"])],t.prototype,"viewModel",void 0),i([_.accessibleHandler()],t.prototype,"_copyCoordinateOutput",null),i([_.accessibleHandler()],t.prototype,"_removeConversion",null),i([_.accessibleHandler()],t.prototype,"_setDefaultPattern",null),i([_.accessibleHandler()],t.prototype,"_toggleExpand",null),i([_.accessibleHandler()],t.prototype,"_toggleInputVisibility",null),i([_.accessibleHandler()],t.prototype,"_toggleMode",null),i([_.accessibleHandler()],t.prototype,"_toggleSettingsVisibility",null),t=i([d.subclass("esri.widgets.CoordinateConversion")],t)}(d.declared(p))}));