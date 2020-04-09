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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../geometry","../../../core/Accessor","../../../core/Error","../../../core/promiseUtils","../../../core/accessorSupport/decorators","../../../geometry/coordinateFormatter","../../../geometry/projection","../../../geometry/support/spatialReferenceUtils","../../../geometry/support/webMercatorUtils","./coordinateConversionUtils"],(function(e,t,r,n,o,i,a,s,c,p,l,u,d,f){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.conversionInfo=null,t.coordinateSegments=null,t.defaultPattern=null,t.name=null,t.viewModel=null,t}return r(t,e),Object.defineProperty(t.prototype,"currentPattern",{get:function(){return this._get("currentPattern")||this._get("defaultPattern")},set:function(e){this._set("currentPattern",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasDisplayProperties",{get:function(){return!(!this.defaultPattern||!this.coordinateSegments)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"spatialReference",{get:function(){var e=this.get("conversionInfo.spatialReference")||o.SpatialReference.WGS84;return"basemap"===this.name?this._viewSpatialReference:e},set:function(e){void 0===e&&this._clearOverride("spatialReference"),this._override("spatialReference",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_viewSpatialReference",{get:function(){return this.get("viewModel.view.spatialReference")||o.SpatialReference.WGS84},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_additionalCharactersPattern",{get:function(){var e=this.get("coordinateSegments");if(!e)return null;var t=e.map((function(e){return e.alias})),r=this.currentPattern.replace(new RegExp('["nsew'+t.join()+"]","gi"),"").replace(/\ /g,"");return new RegExp("["+r+"]","g")},enumerable:!0,configurable:!0}),t.prototype.convert=function(e,t){var r=this;if(!f.isValidPoint(e))return s.reject(new a("format:invalid-point","Could not convert invalid point.",{point:e}));var n=this.get("conversionInfo.convert");return n?s.resolve().then((function(){return n(e)})):this._project(e,this.spatialReference,t).then((function(e){return r._getCoordinate(e).then((function(t){return{location:e,coordinate:t}}))}))},t.prototype.getConversionStrategy=function(){var e=this._viewSpatialReference;return this.get("conversionInfo.convert")||this.get("viewModel.formatterAvailable")||"xy"===this.name&&(e.isWebMercator||e.isWGS84)||"basemap"===this.name?"client":"server"},t.prototype.getDisplayCoordinate=function(e){if(!e)return null;if(!this.coordinateSegments||!this.currentPattern)return e;for(var t=this.currentPattern,r=this._getSegmentMatches(e,!1),n=this.coordinateSegments.length-1;n>=0;n--){var o=this.coordinateSegments[n];t=t.replace(o.alias,r[n])}return t},t.prototype.parseUserInput=function(e){var t=this.defaultPattern.replace(this._additionalCharactersPattern,"");e=e.replace(this._additionalCharactersPattern,"");for(var r=this._getSegmentMatches(e,!0),n=this.coordinateSegments.length-1;n>=0;n--){var o=this.coordinateSegments[n];t=t.replace(o.alias,r[n])}return t},t.prototype._getSegmentMatches=function(e,t){for(var r=[],n=0;n<this.coordinateSegments.length;n++){var o=this.coordinateSegments[n],i=e.match(o.searchPattern);if(i){var a=i[0];if(e=e.replace(a,"").trim(),o.substitution){var s=t?o.substitution.input(a):o.substitution.output(a);s&&(a=s)}r.push(a)}else r.push("")}return r},t.prototype.reverseConvert=function(e){var t,r=this.parseUserInput(e),n=this.get("conversionInfo.reverseConvert"),o=f.isSupportedNotation(this.name);if(n)t=n(r);else if("xy"===this.name||"basemap"===this.name)t=f.fromXY(r,this.spatialReference);else if(this.viewModel.formatterAvailable)switch(this.name){case"dd":case"ddm":case"dms":t=p.fromLatitudeLongitude(r,this.spatialReference);break;case"mgrs":t=p.fromMgrs(r,this.spatialReference,"automatic");break;case"utm":t=p.fromUtm(r,this.spatialReference,"latitude-band-indicators");break;case"usng":t=p.fromUsng(r,this.spatialReference);break;default:t=null}else if(o)return f.fromGeoCoordinateString({coordinate:r,spatialReference:this.spatialReference,formatName:this.name,geometryServicePromise:this.get("viewModel.geometryServicePromise")});return t?this._project(t,this._viewSpatialReference):s.reject(new a("format:invalid-input","Could not parse input into point.",{userInput:e}))},t.prototype._getCoordinate=function(e){var t=this.get("viewModel.view.scale");if(!f.isValidPoint(e))return s.reject(new a("format:invalid-point","Could not transform invalid point into coordinate.",{point:e}));if(this.get("viewModel.formatterAvailable")||"basemap"===this.name||"xy"===this.name)switch(this.name){case"dd":case"ddm":case"dms":var r=f.getDegreePrecision(t);return s.resolve(p.toLatitudeLongitude(e,this.name,r));case"mgrs":return s.resolve(p.toMgrs(e,"automatic",5,!1));case"usng":return s.resolve(p.toUsng(e,5,!1));case"utm":return s.resolve(p.toUtm(e,"latitude-band-indicators",!0));default:return s.resolve(f.pointToCoordinate(e,t))}return f.isSupportedNotation(this.name)?f.toGeoCoordinateString({formatName:this.name,location:e,geometryServicePromise:this.get("viewModel.geometryServicePromise")}):s.resolve(f.pointToCoordinate(e,t))},t.prototype._project=function(e,t,r){return u.equals(e.spatialReference,t)||!t?s.resolve(e):this.get("viewModel.formatterAvailable")&&l.isLoaded()?s.resolve(l.project(e,t)):this.get("viewModel.formatterAvailable")?null:d.canProject(e,t)?s.resolve(d.project(e,t)):f.project({location:e,spatialReference:t,geometryServicePromise:this.get("viewModel.geometryServicePromise"),scale:this.get("viewModel.view.scale")},r).then((function(e){return e.location}))},n([c.property()],t.prototype,"conversionInfo",void 0),n([c.property()],t.prototype,"coordinateSegments",void 0),n([c.property()],t.prototype,"currentPattern",null),n([c.property()],t.prototype,"defaultPattern",void 0),n([c.property({readOnly:!0,dependsOn:["defaultPattern","coordinateSegments"]})],t.prototype,"hasDisplayProperties",null),n([c.property()],t.prototype,"name",void 0),n([c.property({dependsOn:["_viewSpatialReference","name"],type:o.SpatialReference})],t.prototype,"spatialReference",null),n([c.property()],t.prototype,"viewModel",void 0),n([c.property({dependsOn:["viewModel.view.spatialReference"],readOnly:!0})],t.prototype,"_viewSpatialReference",null),n([c.property({readOnly:!0,dependsOn:["currentPattern"]})],t.prototype,"_additionalCharactersPattern",null),t=n([c.subclass("esri.widgets.CoordinateConversion.support.Format")],t)}(c.declared(i))}));