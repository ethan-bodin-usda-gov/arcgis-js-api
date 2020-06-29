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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/extendsHelper","../../../Color","./support/colors","./support/SymbologyBase","./support/utils"],(function(e,o,a,r,t,s,n,l){var i={light:{color:[153,153,153,.25],width:"1px"},dark:{color:[153,153,153,.25],width:"1px"},darker:{color:[26,26,26,.25],width:"1px"}},p={lightBasemaps:{primary:"relationship-blue-orange-brown",secondary:["relationship-brewer-yellow-blue-black","relationship-brewer-pink-blue-purple","relationship-purple-green-blue","relationship-blue-green-purple","relationship-blue-orange-green","relationship-mustard-blue-wine","relationship-pink-blue-purple","relationship-olive-blue-green","relationship-yellow-cyan-blue","relationship-blue-pink-purple","relationship-purple-green-wine"]},darkBasemaps:{primary:"relationship-blue-orange-brown",secondary:["relationship-brewer-yellow-blue-black","relationship-brewer-pink-blue-purple","relationship-purple-green-blue","relationship-blue-green-purple","relationship-blue-orange-green","relationship-mustard-blue-wine","relationship-pink-blue-purple","relationship-olive-blue-green","relationship-yellow-cyan-blue","relationship-blue-pink-purple","relationship-purple-green-wine"]}},c={default:{name:"default",label:"Default",description:"Default theme for visualizing features based on relationship between two attributes.",schemes:{point:{light:{common:{noDataColor:"#aaaaaa",outline:i.light,size:"8px"},primary:p.lightBasemaps.primary,secondary:p.lightBasemaps.secondary},dark:{common:{noDataColor:"#aaaaaa",outline:i.darker,size:"8px"},primary:p.darkBasemaps.primary,secondary:p.darkBasemaps.secondary}},polyline:{light:{common:{noDataColor:"#aaaaaa",width:"2px"},primary:p.lightBasemaps.primary,secondary:p.lightBasemaps.secondary},dark:{common:{noDataColor:"#aaaaaa",width:"2px"},primary:p.darkBasemaps.primary,secondary:p.darkBasemaps.secondary}},polygon:{light:{common:{noDataColor:"#aaaaaa",outline:i.light,fillOpacity:.8},primary:p.lightBasemaps.primary,secondary:p.lightBasemaps.secondary},dark:{common:{noDataColor:"#aaaaaa",outline:i.dark,fillOpacity:.8},primary:p.darkBasemaps.primary,secondary:p.darkBasemaps.secondary}}}}};function u(e,o,a){var r="mesh"!==e.geometryType&&e.worldScale?e.view:null,n=s[o],i=e.theme||"default";if(n){var p,c=i+"/"+e.basemap+"/"+o,u=[];for(var h in n)if("stops"!==h&&"name"!==h&&"tags"!==h){var y=+h,d=n[h];u.push({numClasses:y,colors:d})}switch(e.geometryType){case"point":case"multipoint":var f=a;return function(e,o){return{id:e.id,name:e.name,tags:e.tags.slice(),colorsForClassBreaks:m(e.colorsForClassBreaks),noDataColor:new t(e.noDataColor),outline:{color:new t(e.outline.color),width:e.outline.width},size:o?l.toWorldScale(e.size,o):e.size,opacity:e.opacity}}({id:c,name:n.name,tags:n.tags,colorsForClassBreaks:u,noDataColor:f.noDataColor,opacity:1,outline:f.outline,size:f.size},r);case"polyline":var C=a;return function(e,o){return{id:e.id,name:e.name,tags:e.tags.slice(),colorsForClassBreaks:m(e.colorsForClassBreaks),noDataColor:new t(e.noDataColor),opacity:e.opacity,width:o?l.toWorldScale(e.width,o):e.width}}({id:c,name:n.name,tags:n.tags,colorsForClassBreaks:u,noDataColor:C.noDataColor,opacity:1,width:C.width},r);case"polygon":var g=a,w={id:c,name:n.name,tags:n.tags,colorsForClassBreaks:u,noDataColor:g.noDataColor,opacity:g.fillOpacity,outline:g.outline};return{id:(p=w).id,name:p.name,tags:p.tags.slice(),colorsForClassBreaks:m(p.colorsForClassBreaks),noDataColor:new t(p.noDataColor),outline:{color:new t(p.outline.color),width:p.outline.width},opacity:p.opacity};case"mesh":var b=a;return function(e){return{id:e.id,name:e.name,tags:e.tags.slice(),colorsForClassBreaks:m(e.colorsForClassBreaks),noDataColor:new t(e.noDataColor),opacity:e.opacity}}({id:c,name:n.name,tags:n.tags,colorsForClassBreaks:u,noDataColor:b.noDataColor,opacity:b.fillOpacity})}}}function m(e){return e.map((function(e){return{numClasses:e.numClasses,colors:e.colors.map((function(e){return e.map((function(e){return new t(e)}))}))}}))}return new(function(e){function o(){return e.call(this,{themeDictionary:c})||this}return r(o,e),o.prototype.getSchemes=function(e){var o=this.getRawSchemes({theme:"default",basemap:e.basemap,geometryType:e.geometryType,basemapTheme:e.basemapTheme});if(o){var r=o.schemesInfo,t=o.basemapId,s=o.basemapTheme,n=a({},e,{basemap:t});return{primaryScheme:u(n,r.primary,r.common),secondarySchemes:r.secondary.map((function(e){return u(n,e,r.common)})).filter(Boolean),basemapId:t,basemapTheme:s}}},o.prototype.getSchemeByName=function(e){return this.filterSchemesByName(e)},o.prototype.getSchemesByTag=function(e){return this.filterSchemesByTag(e)},o.prototype.cloneScheme=function(e){if(e){var o=a({},e);return o.colorsForClassBreaks=o.colorsForClassBreaks.map((function(e){return{numClasses:e.numClasses,colors:e.colors.map((function(e){return e.map((function(e){return new t(e)}))}))}})),o.noDataColor&&(o.noDataColor=new t(o.noDataColor)),"outline"in o&&o.outline&&(o.outline={color:o.outline.color&&new t(o.outline.color),width:o.outline.width}),o}},o.prototype.flatten2DArray=function(e,o){var a=[],r=(o||"HH").split(""),t=r[0],s=r[1];"L"===t&&e.reverse();var n="H"===s;return e.forEach((function(e){n&&e.reverse(),a=a.concat(e)})),a},o.prototype.getColors=function(e,o,a){var r;return e.colorsForClassBreaks.some((function(e){return e.numClasses===o&&(r=e.colors),!!r})),(r=r.map((function(e){return e.map((function(e){return new t(e)}))})))?this.flatten2DArray(r,a):null},o.prototype.flipColors=function(e,o){var a=o?e:this.cloneScheme(e);return a.colorsForClassBreaks.forEach((function(e){for(var o=e.colors.reverse(),a=[],r=function(e){var r=[];o.forEach((function(o){r.push(o[e])})),a.push(r)},t=0;t<e.numClasses;t++)r(t);e.colors=a})),a},o.prototype.getMatchingSchemes=function(e){var o=this,a=e.theme||"default",r=e.geometryType,t=e.colors,s=e.numClasses,n=this.themes.get(a);if(n){var l=n.supportedBasemaps,i=[];return l.forEach((function(e){var n=o.getSchemes({theme:a,basemap:e,geometryType:r});if(n){var l=o._compareColorsComprehensive(n.primaryScheme,t,s);l&&i.push(l),n.secondarySchemes.forEach((function(e){(l=o._compareColorsComprehensive(e,t,s))&&i.push(l)}))}})),i}},o.prototype._compareColors=function(e,o,a,r){var t,s=this.getColors(e,a,r);s&&(1===l.hasIdenticalColors(o,s)&&(t=e));return t},o.prototype._compareColorsByFocus=function(e,o,a,r){var t,s=1;do{(t=this._compareColors(e,o,a,r))||(e=this.flipColors(e),s++)}while(!t&&s<=4);return t},o.prototype._compareColorsComprehensive=function(e,o,a){return this._compareColorsByFocus(e,o,a,"HH")||this._compareColorsByFocus(e,o,a,"HL")||this._compareColorsByFocus(e,o,a,"LH")||this._compareColorsByFocus(e,o,a,"LL")},o}(n))}));