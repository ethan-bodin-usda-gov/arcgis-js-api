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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/MapUtils","../../../../core/mathUtils","../../../../core/maybe","../../../../core/PooledArray","../../../../core/accessorSupport/decorators","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/support/aaBoundingRect","./deconflictorDebug","../../support/debugFlags","../../support/earthUtils","../../support/geometryUtils","../../support/geometryUtils/sphere","../../webgl-engine/lib/screenSizePerspectiveUtils","../../webgl-engine/lib/Util","../../webgl-engine/materials/HUDMaterial","../../webgl-engine/materials/internal/MaterialUtil"],(function(i,t,e,r,s,a,c,o,n,h,l,p,u,f,v,d,y,g,b,m,G,x,M,B,w){Object.defineProperty(t,"__esModule",{value:!0});var S=v.vec4f64.create(),V=v.vec4f64.create(),D=v.vec4f64.create(),P=v.vec4f64.create(),A=m.sphere.create(),N=m.ray.create(),_=f.vec3f64.create(),I=d.create(),O=d.create(),T=function(){this.xMin=0,this.xMax=0,this.yMin=0,this.yMax=0,this.posView=0,this.culled=!1,this.visible=!1},z=function(i,t,e){void 0===e&&(e={}),this.graphics3DGraphic=i,this.slicePlaneEnabled=t,this.info=e};t.DeconflictorGraphic=z;var U=function(){function i(){this.active=new Map,this.visible=new Map}return i.prototype.clear=function(){this.active.clear(),this.visible.clear()},i}(),C=function(){},X=function(){this.sortArray=new h({allocator:function(i){return i||new C}})},E=function(i){function t(){var t=null!==i&&i.apply(this,arguments)||this;return t._dirty=!1,t._state=0,t.graphics=new U,t.iterators=new X,t.accBinsNumX=15,t.accBinsNumY=20,t.accBinsSizeX=0,t.accBinsSizeY=0,t.accBins=null,t.accNumTests=0,t}return e(t,i),Object.defineProperty(t.prototype,"dirty",{get:function(){return this._dirty},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this._state},enumerable:!0,configurable:!0}),t.prototype.destroy=function(){this.graphics.clear(),this.iterators=null},t.prototype.setDirty=function(){!this._dirty&&this.graphics.active.size>0&&(this._dirty=!0,this.notifyChange("updating"))},Object.defineProperty(t.prototype,"updating",{get:function(){return 0!==this._state||this._dirty},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updatingProgress",{get:function(){if(!this.updating)return 1;var i=this._state/4;return this._dirty?.5*i:i},enumerable:!0,configurable:!0}),t.prototype.needsUpdate=function(){return this.view.ready&&null!=this.view.state&&this.updating},t.prototype.update=function(i){switch(this._state){case 0:this.startUpdate(),i.madeProgress();case 1:if(this._state=1,!this.processActiveGraphics(i))return;case 2:if(this._state=2,!this.sortVisibleGraphics(i))return;case 3:if(this._state=3,!this.deconflictVisibleGraphics(i))return;default:y.drawAccelerationStruct(this,this.graphics.visible),this._state=0,this.notifyChange("updating")}},t.prototype.modifyGraphics=function(i,t){var e=this;t?i.forEach((function(i){return e.addToActiveGraphics(i)})):i.forEach((function(i){return e.removeFromActiveGraphics(i)})),this.setDirty()},t.prototype.layerSupportsDeconfliction=function(i){if(n.isNone(i)||"object3d"!==i.type)return!1;var t=i.stageObject;return 1===(t?t.getNumGeometryRecords():0)&&t.getGeometryRecord(0).material instanceof B},t.prototype.startUpdate=function(){y.prepare(this.view),this._dirty=!1,this.camera=this.view.state.camera;var i=this.camera.fullWidth,t=this.camera.fullHeight;this.initBins(i,t),this.resetIterators()},t.prototype.addToActiveGraphics=function(i){i.info[this.visibilityGroup]=new T,this.graphics.active.set(i.graphics3DGraphic.graphic.uid,i),this.setDirty()},t.prototype.removeFromActiveGraphics=function(i){this.removeFromVisibleGraphics(i),function(i,t){var e=i.graphics3DGraphic;e.destroyed||e.clearVisibilityFlag(3,t)}(i,this.visibilityGroup),delete i.info[this.visibilityGroup],this.graphics.active.delete(i.graphics3DGraphic.graphic.uid),this.setDirty()},t.prototype.addToVisibleGraphics=function(i){this.graphics.visible.set(i.graphics3DGraphic.graphic.uid,i)},t.prototype.removeFromVisibleGraphics=function(i){this.graphics.visible.delete(i.graphics3DGraphic.graphic.uid)},t.prototype.processActiveGraphics=function(i){for(var t=this.ensureActiveGraphicsIterator(),e="global"===this.view.viewingMode&&1===this.view.map.ground.opacity&&this.camera&&this.camera.relativeElevation>0;!i.done;){i.madeProgress();var r=t.next();if(r.done)return this.resetActiveGraphicsIterator(),!0;var s=r.value,a=s&&s.info[this.visibilityGroup];a&&(this.collectGraphics3DGraphics(s,e),a.culled?this.removeFromVisibleGraphics(s):this.addToVisibleGraphics(s))}return!1},t.prototype.sortVisibleGraphics=function(i){for(var t=this.ensureSortGraphicsIterator();!i.done;){var e=t.next();if(i.madeProgress(),e.done)return this.resetSortGraphicsIterator(),!0}return!1},t.prototype.deconflictVisibleGraphics=function(i){for(var t=this.ensureVisibleGraphicsIterator(),e=1===this.visibilityGroup;!i.done;){i.madeProgress();var r=t.next();if(r.done)return this.resetVisibleGraphicsIterator(),!0;var s=r.value,a=s.info[this.visibilityGroup];if(a&&!a.culled){var c=s.graphics3DGraphic,o=(!e||c.isVisible())&&!this.isConflicted(s);o&&this.addToBins(s),a.visible=o,this.setGraphicVisibility(s,o),y.drawPoly(a,o)}}return!1},t.prototype.resetIterators=function(){this.iterators.active=null,this.iterators.visible=null,this.iterators.sort=null},t.prototype.ensureActiveGraphicsIterator=function(){return this.iterators.active||(this.iterators.active=F(this.graphics.active)),this.iterators.active},t.prototype.resetActiveGraphicsIterator=function(){this.iterators.active=null},t.prototype.ensureVisibleGraphicsIterator=function(){return this.iterators.visible||(this.iterators.visible=F(this.graphics.visible)),this.iterators.visible},t.prototype.resetVisibleGraphicsIterator=function(){this.iterators.visible=null},t.prototype.ensureSortGraphicsIterator=function(){return this.iterators.sort||(this.iterators.sort=function(i,t,e){var s,a;return r(this,(function(r){switch(r.label){case 0:return t.clear(),i.forEach((function(i,r){var s=t.pushNew();s.id=r,s.prio=i.info?i.info[e].posView:Number.MAX_VALUE})),[4];case 1:r.sent(),s=t.iterableSort((function(i,t){return t.prio-i.prio})),a=s.next(),r.label=2;case 2:return a.done?[3,5]:[4];case 3:r.sent(),r.label=4;case 4:return a=s.next(),[3,2];case 5:return t.forEach((function(t){var e=i.get(t.id);e&&(i.delete(t.id),i.set(t.id,e))})),t.clear(),[2]}}))}(this.graphics.visible,this.iterators.sortArray,this.visibilityGroup)),this.iterators.sort},t.prototype.resetSortGraphicsIterator=function(){this.iterators.sort=null},t.prototype.collectGraphics3DGraphics=function(i,t){var e=i.graphics3DGraphic;if(!e.destroyed){var r=i.info[this.visibilityGroup];if(e.isVisible(0,3)){for(var s,a,c=this.getGraphicsLayers(e),n=this.iconMarginFactor,h=this.camera,l=d.empty(I),p=0,v=c;p<v.length;p++){var y=v[p];if(this.layerSupportsDeconfliction(y)){var B=y.stageObject,T=B.getGeometryRecord(0),z=T.material;if(t&&(A.radius=b.earthRadius,u.vec3.sub(N.direction,B.getCenter(),h.eye),u.vec3.copy(N.origin,h.eye),G.intersectRay(A,N,_))){var U=1-Math.abs(Math.tan(u.vec3.angle(B.getCenter(),N.direction)))/this.view.width,C=Math.pow(U,4),X=u.vec3.sqrDist(h.eye,_);if(C*u.vec3.sqrDist(h.eye,B.getCenter())>X)return void(r.culled=!0)}if(!a){var E=B.getCenter(),F=T.origin.vec3;w.transformToWorld(E,F,S),w.transformToView(S,F,h.viewMatrix,V);var j=T.geometry.data.getVertexAttr(),H=j[M.VertexAttrConstants.NORMAL].data;if(z.applyVerticalOffsetTransformation(V,H,B.objectTransformation,h,Y),i.slicePlaneEnabled&&this.slicePlaneViewSpace&&m.boundedPlane.extrusionContainsPoint(this.slicePlaneViewSpace,V))return void(r.culled=!0);var L=j[M.VertexAttrConstants.AUXPOS1].data,W="screen"!==z.getParameters().centerOffsetUnits,q=W?L:f.vec3f64.ZEROS;if(w.transformToProjection(V,h.projectionMatrix,q,D),a=w.transformToNDC(D,P),W||(a[0]+=L[0]/h.fullWidth*2,a[1]+=L[1]/h.fullHeight*2),a[0]<-1||a[1]<-1||a[2]<-1||a[0]>=1||a[1]>=1)break;s=V[2],!g.DISABLE_DECONFLICTOR_VISIBILITY_OFFSET&&r.visible&&(s*=.7)}var k=y.getScreenSize(R);k[0]*=h.pixelRatio,k[1]*=h.pixelRatio,x.applyPrecomputedScaleFactorVec2(k,Y.factor,k);var Z=d.offset(z.calculateRelativeScreenBounds(k,Y.factorAlignment.scale,O),o.lerp(0,h.fullWidth,.5+.5*a[0]),o.lerp(0,h.fullHeight,.5+.5*a[1]));if(0!==n){var J=n*Math.min(d.width(Z),d.height(Z));Z[0]-=J,Z[1]-=J,Z[2]+=J,Z[3]+=J}d.expand(l,Z)}}null==s?r.culled=!0:(r.xMin=l[0],r.yMin=l[1],r.xMax=l[2],r.yMax=l[3],r.posView=s,r.culled=!1)}else r.culled=!0}},t.prototype.isConflicted=function(i){for(var t=i.graphics3DGraphic.graphic.uid,e=i.info[this.visibilityGroup],r=Math.floor(e.xMin/this.accBinsSizeX);r<=Math.floor(e.xMax/this.accBinsSizeX);r++)if(!(r<0||r>=this.accBinsNumX))for(var s=Math.floor(e.yMin/this.accBinsSizeY);s<=Math.floor(e.yMax/this.accBinsSizeY);s++)if(!(s<0||s>=this.accBinsNumY))for(var a=this.accBins[r][s],c=0;c<a.length;c++){var o=a.data[c],n=o.info[this.visibilityGroup];if(n&&n.visible&&(o.graphics3DGraphic.graphic.uid!==t&&(this.accNumTests++,!(n.xMin>e.xMax||n.xMax<e.xMin||n.yMin>e.yMax||n.yMax<e.yMin))))return!0}return!1},t.prototype.initBins=function(i,t){if(null==this.accBins){this.accBins=[];for(var e=0;e<this.accBinsNumX;e++){this.accBins.push([]);for(var r=this.accBins[this.accBins.length-1],s=0;s<this.accBinsNumY;s++)r.push(new h)}}else for(e=0;e<this.accBinsNumX;e++)for(s=0;s<this.accBinsNumY;s++)this.accBins[e][s].clear();this.accBinsSizeX=i/this.accBinsNumX,this.accBinsSizeY=t/this.accBinsNumY,this.accNumTests=0},t.prototype.addToBins=function(i){for(var t=i.info[this.visibilityGroup],e=Math.floor(t.xMin/this.accBinsSizeX),r=Math.floor(t.xMax/this.accBinsSizeX),s=Math.floor(t.yMin/this.accBinsSizeY),a=Math.floor(t.yMax/this.accBinsSizeY),c=e;c<=r;c++)if(!(c<0||c>=this.accBinsNumX))for(var o=s;o<=a;o++)o<0||o>=this.accBinsNumY||this.accBins[c][o].push(i)},t.prototype.setGraphicVisibility=function(i,t){var e=i.graphics3DGraphic;e.destroyed||(e.setVisibilityFlag(3,t,this.visibilityGroup),1===this.visibilityGroup&&this.view.labeler.setLabelGraphicVisibility(e,t))},s([l.property({constructOnly:!0})],t.prototype,"view",void 0),s([l.property({type:Boolean,readOnly:!0})],t.prototype,"updating",null),t=s([l.subclass("esri.views.3d.layers.graphics.Deconflictor")],t)}(l.declared(a));function F(i){var t,e,s,a,o;return r(this,(function(r){switch(r.label){case 0:if(!Map.prototype.entries)return[3,5];t=i.entries(),o=t.next(),r.label=1;case 1:return o.done?[3,4]:[4,o.value[1]];case 2:r.sent(),r.label=3;case 3:return o=t.next(),[3,1];case 4:return[3,9];case 5:e=c.valuesOfMap(i),s=0,a=e,r.label=6;case 6:return s<a.length?[4,o=a[s]]:[3,9];case 7:r.sent(),r.label=8;case 8:return s++,[3,6];case 9:return[2]}}))}t.Deconflictor=E;var Y={factor:{scale:0,factor:0,minPixelSize:0,paddingPixels:0},factorAlignment:{scale:0,factor:0,minPixelSize:0,paddingPixels:0}},R=p.vec2f64.create()}));