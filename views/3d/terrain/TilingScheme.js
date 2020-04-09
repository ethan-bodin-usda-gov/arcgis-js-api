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

define(["require","exports","../../../geometry","../../../core/Error","../../../core/mathUtils","../../../core/unitUtils","../../../geometry/SpatialReference","../../../geometry/support/aaBoundingRect","../../../layers/support/TileInfo","../support/projectionUtils"],(function(e,t,i,r,n,o,l,s,a,u){var h=u.webMercator.x2lon,c=u.webMercator.y2lat,p=function(){function e(t){var i=e.checkUnsupported(t);if(i)throw i;this.spatialReference=t.spatialReference,this._isWebMercator=this.spatialReference.isWebMercator,this._isWGS84Comparable=u.canProjectToWGS84ComparableLonLat(this.spatialReference),this.origin=[t.origin.x,t.origin.y],this.pixelSize=t.size[0],this.dpi=t.dpi;var r=t.lods.reduce((function(e,t,i){return t.level<e.min&&(e.min=t.level,e.minIndex=i),e.max=Math.max(e.max,t.level),e}),{min:1/0,minIndex:0,max:-1/0}),n=t.lods[r.minIndex],o=Math.pow(2,n.level),l=n.resolution*o,s=n.scale*o;this.levels=new Array(r.max+1);for(var a=0;a<this.levels.length;a++)this.levels[a]={resolution:l,scale:s,tileSize:[l*t.size[0],l*t.size[1]]},l/=2,s/=2}return e.prototype.clone=function(){return new e(this.toTileInfo())},e.prototype.toTileInfo=function(){return new a({dpi:this.dpi,origin:{x:this.origin[0],y:this.origin[1],spatialReference:this.spatialReference},size:[this.pixelSize,this.pixelSize],spatialReference:this.spatialReference,lods:this.levels.map((function(e,t){return{level:t,scale:e.scale,resolution:e.resolution}}))})},e.prototype.getExtent=function(e,t,i,r,o){void 0===r&&(r=s.create());var l=this.levels[e],a=l.tileSize[0],u=l.tileSize[1];return r[0]=this.origin[0]+i*a,r[2]=r[0]+a,r[3]=this.origin[1]-t*u,r[1]=r[3]-u,o&&(this._isWebMercator?(o[0]=h(r[0]),o[1]=c(r[1]),o[2]=h(r[2]),o[3]=c(r[3])):this._isWGS84Comparable&&(o[0]=n.deg2rad(r[0]),o[1]=n.deg2rad(r[1]),o[2]=n.deg2rad(r[2]),o[3]=n.deg2rad(r[3]))),r},e.prototype.getExtentGeometry=function(e,t,r,n){return void 0===n&&(n=new i.Extent),this.getExtent(e,t,r,f),n.spatialReference=this.spatialReference,n.xmin=f[0],n.ymin=f[1],n.xmax=f[2],n.ymax=f[3],n.zmin=void 0,n.zmax=void 0,n},e.prototype.ensureMaxLod=function(e){if(null==e)return!1;for(var t=!1;this.levels.length<=e;){var i=this.levels[this.levels.length-1],r=i.resolution/2;this.levels.push({resolution:r,scale:i.scale/2,tileSize:[r*this.pixelSize,r*this.pixelSize]}),t=!0}return t},e.prototype.capMaxLod=function(e){this.levels.length>e+1&&(this.levels.length=e+1)},e.prototype.getMaxLod=function(){return this.levels.length-1},e.prototype.scaleAtLevel=function(e){return this.levels[0].scale/Math.pow(2,e)},e.prototype.levelAtScale=function(e){var t=this.levels[0].scale;return e>=t?0:Math.log(t/e)*Math.LOG2E},e.prototype.resolutionAtLevel=function(e){return this.levels[0].resolution/Math.pow(2,e)},e.prototype.compatibleWith=function(t){if(!(t instanceof e)){if(e.checkUnsupported(t))return!1;t=new e(t)}if(!t.spatialReference.equals(this.spatialReference))return!1;if(t.pixelSize!==this.pixelSize)return!1;var i=Math.min(this.levels.length,t.levels.length)-1,r=this.levels[i].resolution,o=.5*r;return!(!n.floatEqualAbsolute(t.origin[0],this.origin[0],o)||!n.floatEqualAbsolute(t.origin[1],this.origin[1],o))&&(o=.5*r/Math.pow(2,i)/this.pixelSize*12,n.floatEqualAbsolute(r,t.levels[i].resolution,o))},e.prototype.rootTilesInExtent=function(t,i,r){var n=this.levels[0].tileSize;if(0===n[0]||0===n[1])return[];e.computeRowColExtent(t,n,this.origin,f);var o=f[1],l=f[3],s=f[0],a=f[2],u=a-s,h=l-o;if(u*h>r){var c=Math.floor(Math.sqrt(r));h>c&&(l=(o=o+Math.floor(.5*h)-Math.floor(.5*c))+c),u>c&&(a=(s=s+Math.floor(.5*u)-Math.floor(.5*c))+c)}for(var p=[],v=o;v<l;v++)for(var g=s;g<a;g++)p.push([0,v,g]);return i&&(i[0]=this.origin[0]+s*n[0],i[1]=this.origin[1]-l*n[1],i[2]=this.origin[0]+a*n[0],i[3]=this.origin[1]-o*n[1]),p},e.computeRowColExtent=function(e,t,i,r){var n=.001*(e[2]-e[0]+(e[3]-e[1]));r[0]=Math.floor((e[0]+n-i[0])/t[0]),r[2]=Math.ceil((e[2]-n-i[0])/t[0]),r[1]=Math.floor((i[1]-e[3]+n)/t[1]),r[3]=Math.ceil((i[1]-e[1]-n)/t[1])},e.isPowerOfTwo=function(e){var t=e.lods,i=t[0].resolution*Math.pow(2,t[0].level);return!t.some((function(e){return!n.floatEqualRelative(e.resolution,i/Math.pow(2,e.level))}))},e.hasGapInLevels=function(e){var t=e.lods.map((function(e){return e.level}));t.sort((function(e,t){return e-t}));for(var i=1;i<t.length;i++)if(t[i]!==t[0]+i)return!0;return!1},e.tileSizeSupported=function(e){var t=e.size[1];return t===e.size[0]&&0==(t&t-1)&&t>=128&&t<=512},e.checkUnsupported=function(t){return t?t.lods.length<1?new r("tilingscheme:generic","Tiling scheme must have at least one level"):e.isPowerOfTwo(t)?e.hasGapInLevels(t)?new r("tilingscheme:gaps","Tiling scheme levels must not have gaps between min and max level"):e.tileSizeSupported(t)?null:new r("tilingscheme:tile-size","Tiles must be square and size must be one of [128, 256, 512]"):new r("tilingscheme:power-of-two","Tiling scheme must be power of two"):new r("tilingscheme:tile-info-missing","Tiling scheme must have tiling information")},e.fromExtent=function(t,i){var r=t[2]-t[0],n=t[3]-t[1],l=o.getMetersPerUnitForSR(i),s=1.2*Math.max(r,n),u=new e(new a({size:[256,256],origin:{x:t[0]-.5*(s-r),y:t[3]+.5*(s-n)},lods:[{level:0,resolution:s/256,scale:1/(256/96*.0254/(s*l))}],spatialReference:i}));return u.ensureMaxLod(20),u},e.makeWebMercatorAuxiliarySphere=function(t){var i=new e(e.WebMercatorAuxiliarySphereTileInfo);return i.ensureMaxLod(t),i},e.makeGCSWithTileSize=function(t,i,r){void 0===i&&(i=256),void 0===r&&(r=16);var n=256/i,o=new e(new a({size:[i,i],origin:{x:-180,y:90,spatialReference:t},spatialReference:t,lods:[{level:0,resolution:.703125*n,scale:295497598.570834*n}]}));return o.ensureMaxLod(r),o},Object.defineProperty(e.prototype,"test",{get:function(){return{isWebMercator:this._isWebMercator,isWGS84:this._isWGS84Comparable}},enumerable:!0,configurable:!0}),e.WebMercatorAuxiliarySphereTileInfo=new a({size:[256,256],origin:{x:-20037508.342787,y:20037508.342787,spatialReference:l.WebMercator},spatialReference:l.WebMercator,lods:[{level:0,resolution:156543.03392800014,scale:591657527.591555}]}),e.WebMercatorAuxiliarySphere=e.makeWebMercatorAuxiliarySphere(19),e}(),f=s.create();return p}));