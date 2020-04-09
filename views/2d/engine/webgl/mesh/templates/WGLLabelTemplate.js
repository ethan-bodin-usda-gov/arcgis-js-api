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

define(["require","exports","../../../../../../core/tsSupport/extendsHelper","../../../../../../core/Error","../../../../../../core/Logger","../../../../../../core/mathUtils","../../../../../../core/mathUtils","../../../../../../core/maybe","../../../../../../core/screenUtils","../../../../engine","../../color","../../definitions","../../enums","../../number","../../WGLDisplayRecord","../../collisions/Metric","../../materialKey/MaterialKey","./segmentUtils","./WGLTextTemplate"],(function(e,t,i,n,o,r,a,s,l,h,c,u,f,m,p,g,d,_,y){Object.defineProperty(t,"__esModule",{value:!0});var v=o.getLogger("esri.views.2d.engine.webgl.WGLLabelTemplate");t.isMapAligned=function(e){switch(e){case"above-along":case"below-along":case"center-along":return 1;default:return 0}};var x,b,M=(x=function(e){var t=0;if(0===e)return 1/0;for(;!(e%2);)t++,e/=2;return t},b=new Map,function(e){return b.has(e)||b.set(e,x(e)),b.get(e)}),w=function(e){return Math.floor(127*e+127)},L=function(e){return Math.floor(10*e)},P=function(e){return Math.round(e*(254/360))},S=function(e,t){return m.i1616to32(2*Math.round(8*e),2*Math.round(8*t))},A=function(e){function t(t,i,n,o){var a=e.call(this,t,n.font.size,n.haloSize||0,n.color&&c.premultiplyAlphaRGBA(n.color)||0,n.haloColor&&c.premultiplyAlphaRGBA(n.haloColor)||0,n.horizontalAlignment,n.verticalAlignment,n.font.decoration,!1,n.angle||0,n.xoffset,n.yoffset,n.id,n.lineWidth,n.lineHeight)||this;a._outLineLabelAngle=0,a._refPlacementPadding=0,a._refPlacementDirX=0,a._refPlacementDirY=0,a._refOffsetX=0,a._refOffsetY=0,a.geometryType=f.WGLGeometryType.LABEL;var s=function(e,t){var i=!!e.minScale&&t.scaleToZoom(e.minScale)||0;return r.clamp(i,0,25.5)}(i,o),m=function(e,t){var i=!!e.maxScale&&t.scaleToZoom(e.maxScale)||255;return r.clamp(i,0,25.5)}(i,o),p=i.labelPlacement,g=h.alignmentUtils.getAlignmentFromPlacement(p),_=g[0],y=g[1];a._xAlignD=_,a._yAlignD=y,a._minZoom=s,a._maxZoom=m,a._refPlacementPadding=l.pt2px(n.haloSize)+u.TEXT_PLACEMENT_PADDING;var v=d.LabelMaterialKey.load(d.createMaterialKey(a.geometryType,t,!1,i));return v.sdf=!0,a._materialKey=v.data,a}return i(t,e),t.fromLabelClass=function(e,i,n){if("center-along"===i.labelPlacement){var o=i.symbol;o.xoffset=0,o.yoffset=0,o.angle=0,o.font.decoration="none"}return new t(e,i,i.symbol,n)},Object.defineProperty(t.prototype,"_shapedBox",{get:function(){return s.unwrap(this._shapingInfo).bounds},enumerable:!0,configurable:!0}),t.prototype.bindReferenceTemplate=function(e){var t=h.alignmentUtils.getXDirection(this._xAlignD),i=h.alignmentUtils.getYDirection(this._yAlignD);if(this._refOffsetX=0,this._refOffsetY=0,s.isNone(e))this._refSymbolAndPlacementOffset=m.i8888to32(0,0,w(t),w(i));else{if("circle"===e.boundsType&&(t||i)){var n=Math.sqrt(t*t+i*i);t/=n,i/=n}var o=Math.max(e.height,e.width),r=4*this._refPlacementPadding;this._refSymbolAndPlacementOffset=m.i8888to32(r,o,w(t),w(i)),this._referenceSize=o,this._refPlacementDirX=t,this._refPlacementDirY=i,this._refOffsetX=e.xOffset,this._refOffsetY=e.yOffset}},t.prototype.writeMesh=function(e,t,i,o,r,a,l){if(!s.isNone(this._shapingInfo)){var h,c,u=this._shapingInfo;switch(this.current={outRecords:e,outVecs:t,outMetrics:l,inId:o,inShaping:u,zoomLevel:a},i){case"esriGeometryPolyline":return this._placeLineLabels(r.geometry);case"esriGeometryPoint":return this._placePointLabels(r.geometry);case"esriGeometryPolygon":return this._placePointLabels(r.centroid);default:h="mapview-labeling",void 0===(c="Geometry of type "+i+" is not supported")&&(c="mapview-labeling"),v.error(new n(c,h))}}},t.prototype._isVisible=function(e,t){var i=L(this.current.zoomLevel);return L(e)<=i&&i<=L(t)},t.prototype._placePointLabels=function(e){var t=this.current,i=t.outRecords,n=t.outVecs,o=t.outMetrics,r=t.inId;this._writeGlyphs(i,n,r,e,o)},t.prototype._placeLineLabels=function(e){for(var t=_.smoothPaths(e.paths,this.current.inShaping.bounds.width),i=this._placeSubdivGlyphs.bind(this),n=(this._shapedBox.width+128)/4,o=0,r=t;o<r.length;o++){var a=r[o];_.pathDivide(a,n,i)}},t.prototype._placeSubdivGlyphs=function(e,t,i,n){var o=M(t),r=this._shapedBox.width/4,s=Math.min(i,n-i),l=a.log2(s/(4+r/2)),h=0===t?l:Math.min(o,l),c=Math.max(this._minZoom,this.current.zoomLevel+2-h),u=this.current.zoomLevel-c,f=this._shapedBox.width/2*Math.pow(2,u);this.current.inShaping.isMultiline?0===t&&this._placeStraight(e,c):this._placeCurved(e,c,f)},t.prototype._placeStraight=function(e,t){var i=this.current,n=i.outRecords,o=i.outVecs,r=i.outMetrics,a=i.inId;this._writeGlyphs(n,o,a,e,r,t)},t.prototype._placeCurved=function(e,t,i){var n={from:this.current.outRecords.length,count:-1},o=new g.default(this.current.inId,n,e.x,e.y,t),r=e.clone(),a=e.angle*(180/Math.PI)%360,s=(e.angle*(180/Math.PI)+180)%360;this._outLineLabelAngle=P(a),this._placeFirst(r,o,t,1),this._placeBack(e,r,o,t,i,1),this._placeForward(e,r,o,t,i,1),this._outLineLabelAngle=P(s),this._placeFirst(r,o,t,0),this._placeBack(e,r,o,t,i,0),this._placeForward(e,r,o,t,i,0),o.range.count=this.current.outRecords.length-o.range.from,o.bounds&&this.current.outMetrics.push(o)},t.prototype._placeBack=function(e,t,i,n,o,r){for(var a=e.clone(),s=e.backwardLength+0;a.prev()&&!(s>=o);)this._placeOnSegment(a,t,i,s,n,-1,r),s+=a.length+0},t.prototype._placeForward=function(e,t,i,n,o,r){for(var a=e.clone(),s=e.remainingLength+0;a.next()&&!(s>=o);)this._placeOnSegment(a,t,i,s,n,1,r),s+=a.length+0},t.prototype._placeFirst=function(e,t,i,n){for(var o=e,r=this.current.inShaping,s=r.glyphs,l=this.current.zoomLevel,h=this.current,c=h.outRecords,u=h.outVecs,f=h.inId,m=S(o.x,o.y),p=0,g=s;p<g.length;p++){var d=g[p],_=d.x>r.bounds.x?n:1-n,y=_*e.remainingLength+(1-_)*e.backwardLength,v=Math.abs(d.x+d.width/2-r.bounds.x),x=Math.max(0,l+a.log2(v/(y+0))),b=Math.max(i,x);d.maxZoom=25,d.angle=e.angle+(1-n)*Math.PI,d.minZoom=b,this._writeGlyph(c,u,d,f,m),n&&this._isVisible(d.minZoom,d.maxZoom)&&t.add(d.bounds,0,0)}},t.prototype._placeOnSegment=function(e,t,i,n,o,r,s){for(var l=this.current.inShaping.glyphs,h=this.current,c=h.outRecords,u=h.outVecs,f=h.inId,m=this.current.inShaping,p=this.current.zoomLevel,g=e.dx/e.length,d=e.dy/e.length,_={x:e.x+n*-r*g,y:e.y+n*-r*d},y=S(_.x,_.y),v=0,x=l;v<x.length;v++){var b=x[v],M=b.x>m.bounds.x?s:1-s;if(M&&1===r||!M&&-1===r){var w=Math.abs(b.x+b.width/2-m.bounds.x),L=Math.max(0,p+a.log2(w/n)-.1),P=Math.max(o,p+a.log2(w/(n+e.length+0)));0!==L&&(b.angle=e.angle+(1-s)*Math.PI,b.minZoom=P,b.maxZoom=L,this._writeGlyph(c,u,b,f,y),s&&this._isVisible(b.minZoom,b.maxZoom)&&i.add(b.bounds,e.x-t.x,e.y-t.y))}}},t.prototype._writeGlyphs=function(e,t,i,n,o,r){void 0===r&&(r=this._minZoom);var a=this._shapingInfo;if(!s.isNone(a)&&!(n.x<0||n.x>=512||n.y<0||n.y>=512)){for(var l=S(n.x+this._refOffsetX,n.y-this._refOffsetY),h={from:e.length,count:-1},c=new g.default(i,h,n.x+this._refOffsetX,n.y-this._refOffsetY,r),u=0,f=a.glyphs;u<f.length;u++){var m=f[u];m.minZoom=r,m.maxZoom=this._maxZoom,this._writeGlyph(e,t,m,i,l)}c.range.count=e.length-c.range.from,c.bounds=a.boundsT;var p=d.LabelMaterialKey.load(this._materialKey),_=this._refPlacementDirX,y=this._refPlacementDirY,v=p.vvSizeFieldStops||p.vvSizeMinMaxValue||p.vvSizeScaleStops||p.vvSizeUnitValue;c.setPlacementOffset(v,this._referenceSize,this._refPlacementPadding,_,y),o.push(c)}},t.prototype._writeGlyph=function(e,t,i,n,o){var r=d.MaterialKeyBase.load(this._materialKey),a=new p(n,this.geometryType,r.data,0,0);r.textureBinding=i.textureBinding,a.materialKey=r.data,a.indexFrom=t.indexVector.length,a.indexCount=this._writeIndices(t),a.vertexFrom=t.getVector("geometry").vertexCount,a.vertexCount=this._writeVertex(t,n,o,i),e.push(a)},t.prototype._writeVertexCommon=function(e,t,i,n){var o=this._color,r=this._haloColor,a=m.i8888to32(0,0,this._size,this._haloSize),s=Math.max(n.minZoom,this._minZoom),l=Math.min(n.maxZoom,this._maxZoom),h=m.i8888to32(L(s),L(l),this._outLineLabelAngle,0);e.push(i),e.push(t),e.push(o),e.push(r),e.push(a),e.push(this._refSymbolAndPlacementOffset),e.push(h)},t}(y.default);t.default=A}));