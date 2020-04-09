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

define(["require","exports","../../../core/Evented","../../../core/Logger","../../../core/MemCache","../layers/support/MemoryManagedLayerView"],(function(e,t,i,a,r,s){Object.defineProperty(t,"__esModule",{value:!0});var o=a.getLogger("esri.views.3d.support.MemoryController");t.newMemoryController=function(e){return new n(e)};var n=function(){function e(e){this._view=e,this.events=new i,this.minQuality=.1,this._maxMemory=500,this._additionalCacheMemory=100,this._quality=1,this._stableQuality=0,this._downscaleMemoryUsed=0,this._canFastRecover=!1,this._memoryUsed=0,this._memoryPredicted=0,this._cacheStorage=new r.MemCacheStorage,this._numQualityChanges=0,this._updating=!1}return e.prototype.destroy=function(){this.events=null},e.prototype.getMemCache=function(e,t){return new r.MemCache(e,this._cacheStorage,t)},Object.defineProperty(e.prototype,"maxMemory",{get:function(){return this._maxMemory},set:function(e){null!=e&&e>0&&(this._stableQuality=0,this._canFastRecover=!1,this._maxMemory<e&&this._updateQuality(1),this._maxMemory=e)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"additionalCacheMemory",{set:function(e){null!=e&&e>=0&&(this._additionalCacheMemory=e)},enumerable:!0,configurable:!0}),e.prototype.disableMemCache=function(){this._additionalCacheMemory=-4096},Object.defineProperty(e.prototype,"memoryFactor",{get:function(){return this._quality},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"updating",{get:function(){return this._updating},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"usedMemory",{get:function(){return this._memoryUsed},enumerable:!0,configurable:!0}),e.prototype.resetStableQuality=function(){this._stableQuality=0},e.prototype.update=function(){if(this._updateMemory(),!(this._memoryPredicted<=0)||this._updating){var e=this._layersUpdating();if(this._memoryPredicted<.6&&this._canFastRecover)this._downscaleMemoryUsed=0,this._stableQuality=0,this._canFastRecover=!1,this._updateQuality(1);else if(e)(this._memoryPredicted>1.1||this._memoryUsed>1)&&(this._stableQuality>0?(this._downscaleMemoryUsed=0,this._updateQuality(this._stableQuality)):this._quality>this.minQuality&&this._downscaleMemoryUsed<this._memoryUsed&&(this._updateQuality(this._quality/1.3),this._downscaleMemoryUsed=this._memoryUsed,this._canFastRecover=!1));else if(this._downscaleMemoryUsed=0,this._memoryUsed>1)this._stableQuality=0,this._canFastRecover=!1,e=this._updateQuality(this._quality/1.3),this._downscaleMemoryUsed=this._memoryPredicted;else if(this._stableQuality!==this._quality)if(this._memoryUsed<.75&&this._quality<1){this._stableQuality=this._quality;e=this._updateQuality(this._quality+.05)}else this._quality<1&&(this._canFastRecover=!0);this.updating!==e&&(this._updating=e,this.events.emit("updating-changed",this.updating))}},e.prototype._updateQuality=function(e){return(e=Math.min(Math.max(e,this.minQuality),1))!==this._quality&&(this._quality=e,this.events.emit("quality-changed",this._quality),++this._numQualityChanges,!0)},e.prototype._layersUpdating=function(){return this._view.allLayerViews.some((function(e){return!!e.updating}))},e.prototype._updateMemory=function(){var e=this,t=0,i=0;this._view.basemapTerrain&&this._view.basemapTerrain.getUsedMemory&&(t+=this._view.basemapTerrain.getUsedMemory());var a=this._view._stage&&this._view._stage.renderView&&this._view._stage.renderView.edgeView;a&&(t+=a.getUsedMemory()),this._view.allLayerViews&&this._view.allLayerViews.forEach((function(a){if(s.isMemoryManagedLayerView(a)){var r=a.ignoresMemoryFactor()?e._quality:1;t+=a.getUsedMemory()*r,i+=a.getUnloadedMemory()*r}}));var r=null==this._warnMemoryUsage||Math.round(10*t)!==Math.round(10*this._warnMemoryUsage),n=1048576*this._maxMemory;if(t>n&&r){this._warnMemoryUsage=t;var h=function(e){return(e/1048576).toLocaleString(void 0,{maximumFractionDigits:1})+" MB"},u=Math.round(100*this._quality);o.warn("Memory Limit exceeded! Limit: "+h(n)+" Current: "+h(t)+" Projected: "+h(t+i)+" Quality: "+u+"%")}this._memoryUsed=t/n,this._memoryPredicted=(t+i)/n;var y=n-t;this._cacheStorage.maxSize=Math.max(0,y+1048576*this._additionalCacheMemory),this.events.emit("memory-used",this._memoryUsed)},Object.defineProperty(e.prototype,"test",{get:function(){return{cacheStorage:this._cacheStorage,numQualityChanges:this._numQualityChanges}},enumerable:!0,configurable:!0}),e}()}));