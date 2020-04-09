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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../Color","../../../../symbols","../../../../core/asyncUtils","../../../../core/compilerUtils","../../../../core/Error","../../../../core/has","../../../../core/lang","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/screenUtils","../../../../core/urlUtils","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingBox","../../../../support/arcadeOnDemand","../../../../symbols/cim/CIMSymbolRasterizer","../../../../symbols/support/IconSymbol3DLayerResource","../../../../symbols/support/utils","../../../2d/arcade/utils","./constants","./ElevationAligners","./elevationAlignmentUtils","./Graphics3DDrapedGraphicLayer","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolLayer","./graphicUtils","./pointUtils","./sdfPrimitives","../support/FastSymbolUpdates","../../support/projectionUtils","../../terrain/OverlayRenderer","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/lib/RenderGeometry","../../webgl-engine/lib/Texture","../../webgl-engine/materials/HUDMaterial"],(function(e,t,r,i,a,s,o,n,l,c,u,h,p,d,m,_,f,y,v,g,b,S,x,P,z,R,M,T,I,C,E,w,U,O,A,D,F,L,G,V,H,N,k,B){Object.defineProperty(t,"__esModule",{value:!0});var q=y.mat4f64.create(),j=g.vec3f64.fromValues(0,0,1),W=[.25,.25,.75,.75],Z=[64,64],J=function(e){function t(t,r,i,a){var s=e.call(this,t,r,i,a)||this;return s._cimLayers=null,s._cimSymbolMaterials=new Map,s._cimSymbolTextures=new Map,s._cimMaterialParametersInfo=null,s._cimRequiredFields=null,s._cimScaleFactorOrFunction=null,s._size=null,s._symbolTextureRatio=1,s._outlineSize=0,s._texture=null,s._releaseTexture=null,s._elevationOptions={supportsOffsetAdjustment:!0,supportsOnTheGround:!0},s}return i(t,e),t.prototype.getCachedSize=function(){return{size:this._getIconSize()}},t.prototype.doLoad=function(e){return s(this,void 0,void 0,(function(){var t,r,i,s;return a(this,(function(a){switch(a.label){case 0:return this._validateOrThrow(),t=this._prepareMaterialParameters(),r=this._getPrimitive(),d.isSome(r)?(this._prepareResourcesPrimitive(t,r),[3,5]):[3,1];case 1:return i=R.getIconHref(this.symbol,this.symbolLayer),(s=f.dataComponents(i))&&"application/json"===s.mediaType?[4,this._prepareResourcesCIM(t,JSON.parse(s.data),e)]:[3,3];case 2:return a.sent(),[3,5];case 3:return[4,this._prepareResourcesHref(t,i,e)];case 4:a.sent(),a.label=5;case 5:return[2]}}))}))},t.prototype._validateOrThrow=function(){if(!this._drivenProperties.size){var e=O.validateSymbolLayerSize(this._getIconSize());if(e)throw new u("graphics3diconsymbollayer:invalid-size",e)}},t.prototype._getIconSize=function(){var e=this.symbolLayer,t=Math.round(null!=e.size?_.pt2px(e.size):16);return this._drivenProperties.size?Math.max(t,64):t},t.prototype._generateTextureCIM=function(e){var t=this._getGraphicHash(e),r=""===t?null:this._cimSymbolTextures.get(t);if(!r){var i={scaleFactor:this._cimScaleFactorOrFunction},a=this._context.sharedResources.cimSymbolRasterizer.rasterizeCIMSymbol(this._cimLayers,e,i);this._cimMaterialParametersInfo.anchorPos=this._getAnchorPos("relative",a.anchorPosition);var s={width:a.imageData.width,height:a.imageData.height,powerOfTwoResizeMode:2};r=new k(a.imageData,"symbol",s),this._cimSymbolTextures.set(t,r),this._context.stage.add(4,r)}return r},t.prototype._computeSize=function(e,t){var r=e.width/e.height;return r>1?[t,Math.round(t/r)]:[Math.round(t*r),t]},t.prototype._prepareMaterialParameters=function(){var e={anchorPos:this._getAnchorPos(this.symbolLayer.anchor,this.symbolLayer.anchorPosition)},t=this.symbol;if(function(e){return e&&"point-3d"===e.type&&e.hasVisibleVerticalOffset()}(t)){var r=t.verticalOffset,i=r.screenLength,a=r.minWorldLength,s=r.maxWorldLength;e.verticalOffset={screenLength:_.pt2px(i),minWorldLength:a||0,maxWorldLength:null!=s?s:1/0}}return this._context.screenSizePerspectiveEnabled&&(e.screenSizePerspective=this._context.sharedResources.screenSizePerspectiveSettings),e.occlusionTest=!0,e.slicePlaneEnabled=this._context.slicePlaneEnabled,e},t.prototype._prepareResourcesPrimitive=function(e,t){var r=this,i=this._getOutlineSize();if(K(t)&&0===i)throw new Error("Nothing to render");this._outlineSize=i,e.color=this._getFillColor(),e.outlineColor=this._getOutlineColor(),e.outlineSize=this._outlineSize;var a=this._context.sharedResources.textures.fromData(t,(function(){return function(e){var t;switch(e){case"circle":t=D.createCircle(128,64);break;case"square":t=D.createSquare(128,64);break;case"kite":t=D.createKite(128,64);break;case"cross":t=D.createCross(128,64);break;case"x":t=D.createX(128,64);break;case"triangle":t=D.createTriangle(128,64);break;default:c.neverReached(e)}return new k(t,"sdf_"+e,{mipmap:!1,wrap:{s:33071,t:33071},width:128,height:128,components:4,noUnpackFlip:!0})}(t)}));this._texture=a.texture,this._releaseTexture=function(){return r._context.sharedResources.textures.release(a.uid)},e.textureIsSignedDistanceField=!0,e.distanceFieldBoundingBox=W,e.textureId=this._texture.id;var s=this._getIconSize();this._size=[s,s],this._symbolTextureRatio=2,this._createMaterialAndAddToStage(e,this._context.stage)},t.prototype._prepareResourcesHref=function(e,t,r){return s(this,void 0,void 0,(function(){var i,s,o,n,c,p,d,_=this;return a(this,(function(a){switch(a.label){case 0:if(!h("esri-canvas-svg-support")&&f.isSVG(t))throw new u("graphics3diconsymbollayer:unsupported-image-format","IconSymbol3DLayer failed to load (SVG symbols are not supported in IE11)");return this._outlineSize=this._getOutlineSize(),e.color=this._getFillColor(),e.outlineColor=this._getOutlineColor(),e.outlineSize=this._outlineSize,e.textureIsSignedDistanceField=!1,i=this._getIconSize(),s=i*this._context.layerView.view.pixelRatio,[4,l.result(this._context.sharedResources.textures.fromUrl(t,s,{signal:r}))];case 1:if(!1===(o=a.sent()).ok)throw m.throwIfAbortError(o.error),new u("graphics3diconsymbollayer:request-failed","Failed to load (Request for icon resource failed: "+t+")");return n=o.value,c=n.uid,p=n.texture,this._releaseTexture=function(){return _._context.sharedResources.textures.release(c)},d=p.params,this._size=this._computeSize(d,i),e.textureId=p.id,this._createMaterialAndAddToStage(e,this._context.stage),[2]}}))}))},t.prototype._prepareResourcesCIM=function(e,t,r){return s(this,void 0,void 0,(function(){var i,s,o,l,c,u,h,p,d,_,f;return a(this,(function(a){switch(a.label){case 0:return i=new n.CIMSymbol({data:t}),this._context.sharedResources.cimSymbolRasterizer||(this._context.sharedResources.cimSymbolRasterizer=new P(this._context.renderCoordsHelper.spatialReference,!0)),s=this._context.layer.fields?this._context.layer.fields.map((function(e){return e.toJSON()})):null,o=this,[4,this._context.sharedResources.cimSymbolRasterizer.analyzeCIMSymbol(i,s,this._context.renderer&&"dictionary"===this._context.renderer.type?this._context.renderer.fieldMap:null,"esriGeometryPoint",{signal:r})];case 1:return o._cimLayers=a.sent(),this._context.renderer&&"dictionary"===this._context.renderer.type&&this._context.renderer.scaleExpression?(u=this._context.renderer,isNaN(u.scaleExpression)?(h=u.scaleExpression,[4,x.createRendererExpression(h,this._context.layer.spatialReference,s)]):[3,3]):[3,4];case 2:return p=a.sent(),c=function(e,t,r){var i=M.callWithFeature(p,e,{$view:r},"esriGeometryPoint",t);return null!==i?i:1},[3,4];case 3:l=Number(u.scaleExpression),a.label=4;case 4:return this._cimScaleFactorOrFunction=l||c||1,this._context.renderer?[3,5]:(_=[],[3,7]);case 5:return[4,this._context.renderer.getRequiredFields(this._context.layer.fields)];case 6:_=a.sent(),a.label=7;case 7:return d=_,m.throwIfAborted(r),f=this._context.layer.fieldsIndex,this._cimRequiredFields=d.map((function(e){return f.get(e).name})),this._cimMaterialParametersInfo=e,this._cimMaterialParametersInfo.color=this._getFillColor(),this._cimMaterialParametersInfo.outlineColor=[0,0,0,0],this._cimMaterialParametersInfo.outlineSize=0,this._cimMaterialParametersInfo.textureIsSignedDistanceField=!1,[2]}}))}))},t.prototype._getPrimitive=function(){return this.symbolLayer.resource&&this.symbolLayer.resource.href?null:this.symbolLayer.resource&&this.symbolLayer.resource.primitive||z.defaultPrimitive},t.prototype._getOutlineSize=function(){var e,t=this.symbolLayer;return d.isSome(t.outline)&&null!=t.outline.size?Math.max(_.pt2px(t.outline.size),0):(e=K(this._getPrimitive())?1.5:0,Math.max(e,0))},t.prototype._getOutlineColor=function(){var e=this._getLayerOpacity(),t=this.symbolLayer,r=d.get(t,"outline","color");if(d.isSome(r)){var i=o.toUnitRGB(r),a=r.a*e;return[i[0],i[1],i[2],a]}return[0,0,0,0]},t.prototype._getFillColor=function(){if(K(this._getPrimitive()))return T.TRANSPARENT_UNIT;var e=d.isNone(this._getPrimitive()),t=d.get(this.symbolLayer,"material","color");return this._getCombinedOpacityAndColor(t,{hasIntrinsicColor:e})},t.prototype._getAnchorPos=function(e,t){return"relative"===e?v.vec2f64.fromValues((t.x||0)+.5,.5-(t.y||0)):e in O.namedAnchorToHUDMaterialAnchorPos?O.namedAnchorToHUDMaterialAnchorPos[e]:O.namedAnchorToHUDMaterialAnchorPos.center},t.prototype._createMaterialAndAddToStage=function(e,t){if(this._cimLayers?this._fastUpdates={enabled:!1}:this._fastUpdates=F.initFastSymbolUpdatesState(this._context.renderer,this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled&&p.mixin(e,this._fastUpdates.materialParameters),this._cimLayers){var r=this._cimSymbolMaterials.get(e.textureId);return r||(r=new B(e,this._getIdHint("_icon")),this._cimSymbolMaterials.set(e.textureId,r),t.add(3,r)),r}return this._material=new B(e,this._getIdHint("_icon")),t.add(3,this._material),this._material},t.prototype._setDrapingDependentMaterialParameters=function(){this.draped&&(this._forEachMaterial((function(e){e.setParameterValues({verticalOffset:null,screenSizePerspective:null,occlusionTest:!1,slicePlaneEnabled:!1,shaderPolygonOffset:0})})),this.layerOpacityChanged())},t.prototype.destroy=function(){var t=this;e.prototype.destroy.call(this),this._forEachMaterial((function(e){t._context.stage.remove(3,e.id)})),d.isSome(this._material)&&(this._material=null),this._cimSymbolMaterials.clear(),this._cimSymbolTextures.forEach((function(e){t._context.stage.remove(4,e.id)})),this._cimSymbolTextures.clear(),this._releaseTexture&&(this._releaseTexture(),this._releaseTexture=null)},t.prototype._getScaleFactor=function(e,t){if(this._drivenProperties.size&&e.size){for(var r=0;r<3;r++){var i=e.size[r];i&&"symbol-value"!==i&&"proportional"!==i&&(e.size[r]=_.pt2px(i))}if("symbol-value"===e.size[0])return 1;if(isFinite(+e.size[0]))return+e.size[0]/t;if(isFinite(+e.size[2]))return+e.size[2]/t}return 1},t.prototype.createGraphics3DGraphic=function(e){var t,i,a=e.renderingInfo,s=e.graphic;if(this._cimLayers){if(!this._cimLayers.length)return null;var o=this._generateTextureCIM(s),n=r({textureId:o.id},this._cimMaterialParametersInfo);i=this._createMaterialAndAddToStage(n,this._context.stage),t=[o.params.width,o.params.height]}else t=this._size,i=d.expect(this._material);if(!this._validateGeometry(s.geometry))return null;var l=A.placePointOnGeometry(s.geometry);if(d.isNone(l))return this.logger.warn("unsupported geometry type for icon symbol: "+s.geometry.type),null;var c="graphic"+s.uid,u=this._getVertexOpacityAndColor(a),h=1;if(!this._fastUpdates.enabled||!this._fastUpdates.visualVariables.size){var p=t[0]>t[1]?t[0]:t[1];h=this._getScaleFactor(a,p)}h*=this._symbolTextureRatio;var m=[t[0]*h,t[1]*h],_=this.getGraphicElevationContext(s);return this.ensureDrapedStatus("on-the-ground"===_.mode)&&this._setDrapingDependentMaterialParameters(),this.draped?this._createAsOverlay(s,l,i,u,m,e.layer.uid):this._createAs3DShape(s,l,i,u,m,_,c,s.uid)},t.prototype.layerOpacityChanged=function(){var e=this._getFillColor(),t=this._getOutlineColor();return this._forEachMaterial((function(r){r.setParameterValues({color:e}),r.setParameterValues({outlineColor:t})})),!0},t.prototype.layerElevationInfoChanged=function(e,r,i){var a=this._elevationContext.mode,s=C.elevationModeChangeUpdateType(t.elevationModeChangeTypes,i,a);if(s!==C.SymbolUpdateType.UPDATE)return s;var o=C.needsElevationUpdates2D(a)||"absolute-height"===a;return this.updateGraphics3DGraphicElevationInfo(e,r,(function(){return o}))},t.prototype.slicePlaneEnabledChanged=function(){var e=this;return this.draped||this._forEachMaterial((function(t){t.setParameterValues({slicePlaneEnabled:e._context.slicePlaneEnabled})})),!0},t.prototype.physicalBasedRenderingChanged=function(){return!0},t.prototype.pixelRatioChanged=function(){return!!this._getPrimitive()},t.prototype.applyRendererDiff=function(e,t){for(var r in e.diff)switch(r){case"visualVariables":if(!F.updateFastSymbolUpdatesState(this._fastUpdates,t,this._fastVisualVariableConvertOptions()))return!1;d.isSome(this._material)&&this._material.setParameterValues(this._fastUpdates.materialParameters);break;default:return!1}return!0},t.prototype._defaultElevationInfoNoZ=function(){return X},t.prototype._createAs3DShape=function(e,t,r,i,a,s,o,n){var l=this,c=this.getFastUpdateAttrValues(e),u=c?function(e){return F.evaluateModelTransform(l._fastUpdates.materialParameters,c,e)}:null,h=H.createPointGeometry(j,null,i,a,$,null,c),p=[new V(h,o)],d=A.createStageObjectForHUD(this._context,t,p,[r],null,null,s,o,this._context.layer.uid,n,u);if(null===d)return null;var m=I.perObjectElevationAligner,_=new w(this,d.object,p,null,null,m,s);return _.alignedSampledElevation=d.sampledElevation,_.needsElevationUpdates=C.needsElevationUpdates2D(s.mode)||"absolute-height"===s.mode,_.getScreenSize=this._createScreenSizeGetter(a,u),_.calculateRelativeScreenBounds=function(e){return r.calculateRelativeScreenBounds(_.getScreenSize(),1,e)},A.extendPointGraphicElevationContext(_,t,this._context.elevationProvider),_},t.prototype._createAsOverlay=function(e,t,r,i,a,s){var o=this;r.renderPriority=this._renderPriority;var n=g.vec3f64.create();L.pointToVector(t,n,this._context.overlaySR),n[2]=G.DRAPED_Z;var l=this._context.clippingExtent;if(d.isSome(l)&&!S.containsPoint(l,n))return null;var c=this.getFastUpdateAttrValues(e),u=c?function(e){return F.evaluateModelTransform(o._fastUpdates.materialParameters,c,e)}:null,h=H.createPointGeometry(j,n,i,a,null,null,c),p=new N(h);p.material=r,p.center=n,p.bsRadius=0,p.data.layerUid=s,p.data.graphicUid=e.uid,p.calculateShaderTransformation=u;var m=new E(this,[p],null);return m.getScreenSize=this._createScreenSizeGetter(a,u),m.calculateRelativeScreenBounds=function(e){return r.calculateRelativeScreenBounds(m.getScreenSize(),1,e)},m},t.prototype._createScreenSizeGetter=function(e,t){var r=this._outlineSize+2;if(this._fastUpdates.enabled){var i=e[0]/this._symbolTextureRatio,a=e[1]/this._symbolTextureRatio;return function(e){void 0===e&&(e=v.vec2f64.create());var s=t(q);return e[0]=s[0]*i+r,e[1]=s[5]*a+r,e}}var s=e[0]/this._symbolTextureRatio+r,o=e[1]/this._symbolTextureRatio+r;return function(e){return void 0===e&&(e=v.vec2f64.create()),e[0]=s,e[1]=o,e}},t.prototype._fastVisualVariableConvertOptions=function(){var e=this._size[0]>this._size[1]?this._size[0]:this._size[1],t=g.vec3f64.fromValues(e,e,e),r=_.px2pt(1),i=e*r;return{modelSize:t,symbolSize:g.vec3f64.fromValues(i,i,i),unitInMeters:r,transformation:{anchor:g.vec3f64.ZEROS,scale:g.vec3f64.ONES,rotation:g.vec3f64.ZEROS}}},t.prototype._getGraphicHash=function(e){for(var t="",r=0,i=this._cimRequiredFields;r<i.length;r++){var a=i[r];t+=a+e.attributes[a]}return t},t.prototype._forEachMaterial=function(e){d.isSome(this._material)&&e(this._material),this._cimSymbolMaterials.forEach(e)},t.PRIMITIVE_SIZE=Z,t.elevationModeChangeTypes={definedChanged:C.SymbolUpdateType.UPDATE,staysOnTheGround:C.SymbolUpdateType.NONE,onTheGroundChanged:C.SymbolUpdateType.RECREATE},t}(U.default);function K(e){return!!d.isSome(e)&&("cross"===e||"x"===e)}t.Graphics3DIconSymbolLayer=J;var X={mode:"relative-to-ground",offset:0},$=b.vec4f64.fromValues(0,0,0,1);t.default=J}));