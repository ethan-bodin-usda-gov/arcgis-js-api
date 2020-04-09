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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/MapUtils","../../../../core/maybe","../../../../core/promiseUtils","../../../../geometry/support/aaBoundingRect","../../../webgl","../../engine","./FadeRecorder","../webgl/definitions","../webgl/enums","../webgl/TiledDisplayObject","../../tiling/TileCoverage","../../tiling/TileKey"],(function(e,t,r,s,i,a,o,n,l,d,p,c,u,h,y,f,_,g){Object.defineProperty(t,"__esModule",{value:!0});p.enums.BlendFactor,p.enums.CompareFunction,p.enums.StencilOperation;function v(e,t){if(e){var r=e.getLayoutProperty("visibility");if(!r||"none"!==r.getValue()&&(void 0===e.minzoom||e.minzoom<t+1e-6)&&(void 0===e.maxzoom||e.maxzoom>=t-1e-6))return!0}return!1}var b=function(e){function t(t,r){var s=e.call(this,t,r)||this;return s._backgroundTiles=[],s._fadeRecorder=new u.FadeRecorder(400),s._pointToCallbacks=new Map,s._parsedDataQueue=new Map,s}return r(t,e),t.prototype.destroy=function(){this.removeAllChildren(),this.children.forEach((function(e){return e.destroy()}))},t.prototype.dispose=function(){this._spriteMosaic&&this._spriteMosaic.dispose(),this._glyphMosaic&&this._glyphMosaic.dispose(),e.prototype.dispose.call(this)},Object.defineProperty(t.prototype,"updating",{get:function(){return this._parsedDataQueue.size>0},enumerable:!0,configurable:!0}),t.prototype.setStyleResources=function(e,t,r){this._spriteMosaic=e,this._glyphMosaic=t,this._styleRepository=r},t.prototype.hitTest=function(e,t){return a(this,void 0,void 0,(function(){var r,s;return i(this,(function(i){return r=[e,t],s=l.createResolver(),this._pointToCallbacks.set(r,s),this.requestRender(),[2,s.promise]}))}))},t.prototype.setTileData=function(e,t){var r=this.stage;if(r.dataUploadCounter<h.MAX_GPU_UPLOADS_PER_FRAME&&t)return e.setData(t.tileData,t.client,t.refKeys),void r.dataUploadCounter++;t?this._parsedDataQueue.set(e,t):e.setData(null,null)},t.prototype.createRenderParams=function(t){return s({},e.prototype.createRenderParams.call(this,t),{renderPass:null,styleLayer:null,styleLayerId:-1,glyphMosaic:this._glyphMosaic,spriteMosaic:this._spriteMosaic,fadeRecorder:this._fadeRecorder,hasClipping:!!this._clippingInfos})},t.prototype.doRender=function(t){!this.visible||t.drawPhase!==y.WGLDrawPhase.MAP&&t.drawPhase!==y.WGLDrawPhase.DEBUG||void 0===this._spriteMosaic||e.prototype.doRender.call(this,t)},t.prototype.removeChild=function(t){return this._parsedDataQueue.has(t)&&this._parsedDataQueue.delete(t),e.prototype.removeChild.call(this,t)},t.prototype.renderChildren=function(t){if(t.drawPhase!==y.WGLDrawPhase.DEBUG){var r=this.stage;if(this._parsedDataQueue.size>0&&r.dataUploadCounter<h.MAX_GPU_UPLOADS_PER_FRAME)for(var s=o.pairsOfMap(this._parsedDataQueue),i=0;i<s.length&&r.dataUploadCounter<h.MAX_GPU_UPLOADS_PER_FRAME;i++){var a=s[i][0],n=s[i][1];a.setData(n.tileData,n.client,n.refKeys),this._parsedDataQueue.delete(a),r.dataUploadCounter++}if(this._fadeRecorder.recordLevel(t.displayLevel),this._doRender(t),(this._parsedDataQueue.size>0||this._fadeRecorder.needsRedraw())&&this.requestRender(),this._pointToCallbacks.size>0){var l=t.context,d=l.getBoundFramebufferObject();t.drawPhase=y.WGLDrawPhase.HITTEST;var p=t.painter.effects.hittest;p.bind(t),this._doRender(t),p.draw(t,this._pointToCallbacks,6),l.bindFramebuffer(d)}}else e.prototype.renderChildren.call(this,t)},t.prototype.removeAllChildren=function(){this._parsedDataQueue.clear();for(var t=0;t<this.children.length;t++){this.children[t].dispose()}e.prototype.removeAllChildren.call(this)},t.prototype._doRender=function(t){var r=t.context,s=this._styleRepository,i=s.layers;s.backgroundBucketIds.length>0&&(t.renderPass="background",this._renderBackgroundLayers(t,s.backgroundBucketIds)),e.prototype.renderChildren.call(this,t);for(var a=this.children.filter((function(e){return e.visible})),o=0,n=a;o<n.length;o++){var l=n[o];l.triangleCount=0,l.commitChanges()}r.setStencilWriteMask(0),r.setColorMask(!0,!0,!0,!0),r.setStencilOp(7680,7680,7681),r.setStencilTestEnabled(!0),r.setBlendingEnabled(!1),r.setDepthTestEnabled(!0),r.setDepthWriteEnabled(!0),r.setDepthFunction(515),r.setClearDepth(1),r.clear(r.gl.DEPTH_BUFFER_BIT),t.renderPass="opaque";for(var d=i.length-1;d>=0;d--)this._renderStyleLayer(d,t,a);r.setDepthWriteEnabled(!1),r.setBlendingEnabled(!0),r.setBlendFunctionSeparate(1,771,1,771),t.renderPass="translucent";for(d=0;d<i.length;d++)this._renderStyleLayer(d,t,a);r.setDepthTestEnabled(!1),t.renderPass="symbol";for(d=0;d<i.length;d++)this._renderStyleLayer(d,t,a);r.bindVAO(),r.setStencilTestEnabled(!0)},t.prototype._renderStyleLayer=function(e,t,r){var s=t.painter,i=t.renderPass,a=this._styleRepository.layers[e];if(void 0!==a){var o;switch(a.type){case 0:return;case 1:if("opaque"!==i&&"translucent"!==t.renderPass)return;o="vtlFill";break;case 2:if("translucent"!==i)return;o="vtlLine";break;case 4:if("symbol"!==i)return;o="vtlCircle";break;case 3:if("symbol"!==i)return;o="vtlSymbol"}var n=t.displayLevel;if(!(0===r.length||void 0!==a.minzoom&&a.minzoom>=n+1e-6||void 0!==a.maxzoom&&a.maxzoom<n-1e-6)){t.styleLayerId=e,t.styleLayer=a;for(var l=0,d=r;l<d.length;l++){if(d[l].layerData[e]){s.renderObjects(t,r,o);break}}}}},t.prototype._renderBackgroundLayers=function(e,t){for(var r=e.context,s=e.displayLevel,i=e.painter,a=e.state,o=this._styleRepository,l=!1,p=0,c=t;p<c.length;p++){var u=c[p];if(v(o.layers[u],s)){l=!0;break}}if(l){var h=this._tileInfoView.getTileCoverage(e.state,0,"smallest"),y=h.spans,b=h.lodInfo,m=b.level,D=d.create(),C=[];if(this._renderPasses){var P=this._renderPasses[0];n.isSome(this._clippingInfos)&&(P.brushes[0].prepareState(e,this._clippingInfos[0]),P.brushes[0].drawMany(e,this._clippingInfos))}for(var R,T=this._backgroundTiles,M=0,w=0,k=y;w<k.length;w++)for(var S=k[w],L=S.row,E=S.colFrom,F=S.colTo,B=E;B<=F;B++){if(M<T.length)(R=T[M]).key.set(m,L,b.normalizeCol(B),b.getWorldForColumn(B)),this._tileInfoView.getTileBounds(D,R.key,!1),R.bounds=D,R.coords[0]=D[0],R.coords[1]=D[3];else{var I=new g(m,L,b.normalizeCol(B),b.getWorldForColumn(B));R=new f.TiledDisplayObject(I,this._tileInfoView.getTileBounds(d.create(),I),[512,512],[4096,4096]),T.push(R)}R.setTransform(a,this._tileInfoView.getTileResolution(R.key)),C.push(R),M++}r.setStencilWriteMask(0),r.setColorMask(!0,!0,!0,!0),r.setStencilOp(7680,7680,7681),r.setStencilFunction(514,0,255),r.setStencilTestEnabled(!0);for(var U=0,O=t;U<O.length;U++){u=O[U];var z=o.layers[u];v(z,s)&&(e.styleLayerId=u,e.styleLayer=z,i.renderObjects(e,C,"vtlBackground"))}_.pool.release(h)}},t}(c.TileContainer);t.VectorTileContainer=b}));