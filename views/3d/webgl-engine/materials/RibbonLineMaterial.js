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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/assignHelper","../../../../core/Logger","../../../../core/mathUtils","../../../../core/maybe","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/geometryUtils","../../support/buffer/InterleavedLayout","../lib/ComponentUtils","../lib/geometryDataUtils","../lib/GLMaterial","../lib/Material","../lib/Util","./VisualVariableMaterialParameters","./internal/MaterialUtil","./renderers/MergedRenderer","../shaders/RibbonLineTechnique","../shaders/RibbonLineTechnique"],(function(e,t,i,n,r,a,s,o,c,u,p,l,h,v,b,f,d,m,g,C,A,S,R){var y=r.getLogger("esri.views.3d.webgl-engine.materials.RibbonLineMaterial"),x=function(e){function t(t,i){var n=e.call(this,i)||this;return n.techniqueConfig=new R.RibbonLineTechniqueConfiguration,n.params=C.copyParameters(t,O),n.validateParams(),n.params.transparent=n.params.color[3]<1||n.params.transparent,n.layout=n.createLayout(),n}return i(t,e),t.prototype.dispose=function(){},t.prototype.setParameterValues=function(e){for(var t in e)if("cap"!==t){if("join"===t)if("round"===this.params[t]!==("round"===e[t])){y.error("join cannot be changed after creation");continue}if("stipplePattern"===t)if(!!this.params[t]!==!!e[t]){y.error("stippledness cannot be changed after creation");continue}this.params[t]=e[t]}else y.error("cap cannot be changed after creation");this.validateParams(),this.parametersChanged()},t.prototype.getParameters=function(){return this.params},t.prototype.getPassParameters=function(){return this.params},t.prototype.getTechniqueConfig=function(e){this.techniqueConfig.output=e;var t=s.isSome(this.params.stipplePattern);return this.techniqueConfig.stippleEnabled=t,this.techniqueConfig.stippleIntegerRepeatsEnabled=t&&this.params.stippleIntegerRepeats,this.techniqueConfig.stippleOffColorEnabled=t&&s.isSome(this.params.stippleOffColor),this.techniqueConfig.slicePlaneEnabled=this.params.slicePlaneEnabled,this.techniqueConfig.sceneHasOcludees=this.params.sceneHasOcludees,this.techniqueConfig.roundJoins="round"===this.params.join,this.techniqueConfig.roundCaps="round"===this.params.cap,this.techniqueConfig.transparent=this.params.transparent,this.techniqueConfig.polygonOffset=this.params.polygonOffset,this.techniqueConfig.writeDepth=this.params.writeDepth,this.techniqueConfig.vvColor=this.params.vvColorEnabled,this.techniqueConfig.vvOpacity=this.params.vvOpacityEnabled,this.techniqueConfig.vvSize=this.params.vvSizeEnabled,this.techniqueConfig.innerColorEnabled=this.params.innerWidth>0&&s.isSome(this.params.innerColor),this.techniqueConfig.falloffEnabled=this.params.falloff>0,this.techniqueConfig.occluder=8===this.renderOccluded,this.techniqueConfig},t.prototype.intersect=function(e,t,i,n,r,a,s,o,c){c?C.intersectDrapedRenderLineGeometry(e,n,a,this.params.width,s):this.intersectLineGeometry(e,t,i,n,this.params.width,s)},t.prototype.intersectLineGeometry=function(e,t,i,n,r,s){if(n.options.selectionMode&&!v.isAllHidden(t.componentVisibilities,e.componentOffsets))if(m.isTranslationMatrix(i)){var o=e.data.getVertexAttr(),p=o[R.RibbonVertexAttributeConstants.POSITION].data,h=r;if(this.params.vvSizeEnabled){var b=o[R.RibbonVertexAttributeConstants.SIZEFEATUREATTRIBUTE].data[0];h*=a.clamp(this.params.vvSizeOffset[0]+b*this.params.vvSizeFactor[0],this.params.vvSizeMinSize[0],this.params.vvSizeMaxSize[0])}else o[R.RibbonVertexAttributeConstants.SIZE]&&(h*=o[R.RibbonVertexAttributeConstants.SIZE].data[0]);var f=n.camera,d=D;c.vec2.copy(d,n.point);var g=h*f.pixelRatio/2+4*f.pixelRatio;u.vec3.set(J[0],d[0]-g,d[1]+g,0),u.vec3.set(J[1],d[0]+g,d[1]+g,0),u.vec3.set(J[2],d[0]+g,d[1]-g,0),u.vec3.set(J[3],d[0]-g,d[1]-g,0);for(var C=0;C<4;C++)f.unprojectPoint(J[C],k[C]);l.plane.fromPoints(f.eye,k[0],k[1],W),l.plane.fromPoints(f.eye,k[1],k[2],X),l.plane.fromPoints(f.eye,k[2],k[3],_),l.plane.fromPoints(f.eye,k[3],k[0],Y);var A=Number.MAX_VALUE,S=this.params.isClosed?p.length-2:p.length-5;for(C=0;C<S;C+=3){q[0]=p[C]+i[12],q[1]=p[C+1]+i[13],q[2]=p[C+2]+i[14];var x=(C+3)%p.length;if(L[0]=p[x]+i[12],L[1]=p[x+1]+i[13],L[2]=p[x+2]+i[14],!(l.plane.signedDistance(W,q)<0&&l.plane.signedDistance(W,L)<0||l.plane.signedDistance(X,q)<0&&l.plane.signedDistance(X,L)<0||l.plane.signedDistance(_,q)<0&&l.plane.signedDistance(_,L)<0||l.plane.signedDistance(Y,q)<0&&l.plane.signedDistance(Y,L)<0)){if(f.projectPoint(q,M),f.projectPoint(L,B),M[2]<0&&B[2]>0){u.vec3.subtract(U,q,L);var P=f.frustum,O=-l.plane.signedDistance(P.planes[4],q)/u.vec3.dot(U,P.planes[4]);u.vec3.scale(U,U,O),u.vec3.add(q,q,U),f.projectPoint(q,M)}else if(M[2]>0&&B[2]<0){u.vec3.subtract(U,L,q);P=f.frustum,O=-l.plane.signedDistance(P.planes[4],L)/u.vec3.dot(U,P.planes[4]);u.vec3.scale(U,U,O),u.vec3.add(L,L,U),f.projectPoint(L,B)}else if(M[2]<0&&B[2]<0)continue;M[2]=0,B[2]=0;var E=l.lineSegment.distance2(l.lineSegment.fromPoints(M,B,j),d);E<A&&(A=E,u.vec3.copy(N,q),u.vec3.copy(z,L))}}var I=n.rayBeginPoint,V=n.rayEndPoint;if(A<g*g){var T=Number.MAX_VALUE;if(l.lineSegment.closestLineSegmentPoint(l.lineSegment.fromPoints(N,z,j),l.lineSegment.fromPoints(I,V,F),w)){u.vec3.subtract(w,w,I);var H=u.vec3.length(w);u.vec3.scale(w,w,1/H),T=H/u.vec3.distance(I,V)}s(T,w)}}else y.error("intersection assumes a translation-only matrix")},t.prototype.computeAttachmentOrigin=function(e,t){var i=e.data,n="getVertexAttr"in i?i.getVertexAttr():"vertexAttr"in i?i.vertexAttr:null;if(!n)return null;var r=R.RibbonVertexAttributeConstants.POSITION,a="getVertexAttr"in i?i.getIndices(r):null,s=n[r];return b.computeAttachmentOriginLines(s,a,a&&this.params.isClosed,t)},t.prototype.createLayout=function(){var e=h.newLayout().vec3f(R.RibbonVertexAttributeConstants.POSITION).f32(R.RibbonVertexAttributeConstants.SUBDIVISIONFACTOR).vec2f(R.RibbonVertexAttributeConstants.UV0).vec3f(R.RibbonVertexAttributeConstants.AUXPOS1).vec3f(R.RibbonVertexAttributeConstants.AUXPOS2);return this.params.vvSizeEnabled?e.f32(R.RibbonVertexAttributeConstants.SIZEFEATUREATTRIBUTE):e.f32(R.RibbonVertexAttributeConstants.SIZE),this.params.vvColorEnabled?e.f32(R.RibbonVertexAttributeConstants.COLORFEATUREATTRIBUTE):e.vec4f(R.RibbonVertexAttributeConstants.COLOR),this.params.vvOpacityEnabled&&e.f32(R.RibbonVertexAttributeConstants.OPACITYFEATUREATTRIBUTE),e},t.prototype.createBufferWriter=function(){return new E(this.layout,this.params)},t.prototype.createRenderer=function(e,t){return new A(e,t,this,R.ribbonVertexAttributeLocations)},t.prototype.getGLMaterial=function(e){return 0===e.output||4===e.output?new P(e):void 0},t.prototype.validateParams=function(){this.params.width&&this.params.width>1&&(this.params.width=Math.round(this.params.width)),"miter"!==this.params.join&&(this.params.miterLimit=0)},t}(d.Material),P=function(e){function t(t){var i=e.call(this,t)||this;return i.updateParameters(),i}return i(t,e),t.prototype.updateParameters=function(){this.technique=this.techniqueRep.acquireAndReleaseExisting(S.RibbonLineTechnique,this.material.getTechniqueConfig(this.output),this.technique)},t.prototype.beginSlot=function(e){return this.technique.configuration.occluder?3===e||10===e||11===e:0===this.output?(this.targetSlot=this.technique.configuration.writeDepth?5:8,e===this.targetSlot):3===e},t.prototype._updateOccludeeState=function(e){e.hasOccludees!==this.material.getParameters().sceneHasOcludees&&(this.material.setParameterValues({sceneHasOcludees:e.hasOccludees}),this.updateParameters())},t.prototype.ensureParameters=function(e){0===this.output&&this._updateOccludeeState(e)},t.prototype.bind=function(e,t){e.bindProgram(this.technique.program),this.technique.bindPass(e,this.material.getPassParameters(),t)},t.prototype.getPipelineState=function(e,t){return t?this.technique.occludeePipeline:this.technique.configuration.occluder?11===e?this.technique.occluderPipelineTransparent:10===e?this.technique.occluderPipelineOpaque:this.technique.occluderPipelineMaskWrite:this.technique.pipeline},t}(f.GLMaterial),O=n({width:0,color:[1,1,1,1],join:"miter",cap:"butt",miterLimit:5,writeDepth:!0,polygonOffset:!1,stipplePattern:null,stippleIntegerRepeats:!1,stippleOffColor:null,slicePlaneEnabled:!1,vvFastUpdate:!1,transparent:!1,isClosed:!1,falloff:0,innerWidth:0,innerColor:null,sceneHasOcludees:!1},g.Default),E=function(){function e(e,t){if(this.params=t,this.numCapSubdivisions=0,this.numJoinSubdivisions=0,this.vertexBufferLayout=e,!t.isClosed)switch(this.params.cap){case"butt":this.numCapSubdivisions=0;break;case"square":this.numCapSubdivisions=1;break;case"round":this.numCapSubdivisions=V}switch(this.params.join){case"miter":case"bevel":this.numJoinSubdivisions=t.stipplePattern?1:0;break;case"round":this.numJoinSubdivisions=T}}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){var t=2*this.numCapSubdivisions+2,i=e.indices[R.RibbonVertexAttributeConstants.POSITION].length/2+1,n=this.params.isClosed,r=n?2:2*t,a=n?0:1,s=n?i:i-1;if(e.vertexAttr[R.RibbonVertexAttributeConstants.SUBDIVISIONS])for(var o=e.vertexAttr[R.RibbonVertexAttributeConstants.SUBDIVISIONS].data,c=a;c<s;++c){r+=4+2*o[c]}else r+=(s-a)*(2*this.numJoinSubdivisions+4);return r+=2},e.prototype.write=function(e,t,i,n){var r=this,a=H,s=Z,o=G,c=t.vertexAttr[R.RibbonVertexAttributeConstants.POSITION].data,p=t.indices&&t.indices[R.RibbonVertexAttributeConstants.POSITION];p&&p.length!==2*(c.length/3-1)&&console.warn("RibbonLineMaterial does not support indices");var l=null;t.vertexAttr[R.RibbonVertexAttributeConstants.SUBDIVISIONS]&&(l=t.vertexAttr[R.RibbonVertexAttributeConstants.SUBDIVISIONS].data);var h=1,v=0;this.params.vvSizeEnabled?v=t.vertexAttr[R.RibbonVertexAttributeConstants.SIZEFEATUREATTRIBUTE].data[0]:t.vertexAttr[R.RibbonVertexAttributeConstants.SIZE]&&(h=t.vertexAttr[R.RibbonVertexAttributeConstants.SIZE].data[0]);var b=[1,1,1,1],f=0;this.params.vvColorEnabled?f=t.vertexAttr[R.RibbonVertexAttributeConstants.COLORFEATUREATTRIBUTE].data[0]:t.vertexAttr[R.RibbonVertexAttributeConstants.COLOR]&&(b=t.vertexAttr[R.RibbonVertexAttributeConstants.COLOR].data);var d=0;this.params.vvOpacityEnabled&&(d=t.vertexAttr[R.RibbonVertexAttributeConstants.OPACITYFEATUREATTRIBUTE].data[0]);var m=c.length/3,g=e.transformation,C=new Float32Array(i.buffer),A=this.vertexBufferLayout.stride/4,S=n*A,y=S,x=function(e,t,i,n,a,s){C[S++]=t[0],C[S++]=t[1],C[S++]=t[2],C[S++]=n,C[S++]=a,C[S++]=s,C[S++]=e[0],C[S++]=e[1],C[S++]=e[2],C[S++]=i[0],C[S++]=i[1],C[S++]=i[2],r.params.vvSizeEnabled?C[S++]=v:C[S++]=h,r.params.vvColorEnabled?C[S++]=f:(C[S++]=b[0],C[S++]=b[1],C[S++]=b[2],C[S++]=b[3]),r.params.vvOpacityEnabled&&(C[S++]=d)};S+=A,u.vec3.set(s,c[0],c[1],c[2]),g&&u.vec3.transformMat4(s,s,g);var P=this.params.isClosed;if(P){var O=c.length-3;u.vec3.set(a,c[O],c[O+1],c[O+2]),g&&u.vec3.transformMat4(a,a,g)}else{u.vec3.copy(a,s),u.vec3.set(o,c[3],c[4],c[5]),g&&u.vec3.transformMat4(o,o,g);for(var E=0;E<this.numCapSubdivisions;++E){x(a,s,o,U=1-E/this.numCapSubdivisions,1,-4),x(a,s,o,U,1,4)}x(a,s,o,0,0,-4),x(a,s,o,0,0,4),u.vec3.copy(a,s),u.vec3.copy(s,o)}var V=P?m:m-1;for(E=P?0:1;E<V;E++){var T=(E+1)%m*3;u.vec3.set(o,c[T+0],c[T+1],c[T+2]),g&&u.vec3.transformMat4(o,o,g),x(a,s,o,0,1,-1),x(a,s,o,0,1,1);for(var q=l?l[E]:this.numJoinSubdivisions,L=0;L<q;++L){x(a,s,o,U=(L+1)/(q+1),1,-2),x(a,s,o,U,1,2)}x(a,s,o,1,0,-2),x(a,s,o,1,0,2),u.vec3.copy(a,s),u.vec3.copy(s,o)}if(P){S=I(C,y+A,C,S,2*A)}else{x(a,s,o,0,1,-5),x(a,s,o,0,1,5);for(E=0;E<this.numCapSubdivisions;++E){var U;x(a,s,o,U=(E+1)/this.numCapSubdivisions,1,-5),x(a,s,o,U,1,5)}}I(C,y+A,C,y,A),S=I(C,S-A,C,S,A)},e}();function I(e,t,i,n,r){for(var a=0;a<r;a++)i[n++]=e[t++];return n}var V=3,T=1,q=p.vec3f64.create(),L=p.vec3f64.create(),U=p.vec3f64.create(),w=p.vec3f64.create(),D=p.vec3f64.create(),M=o.createRenderScreenPointArray3(),B=o.createRenderScreenPointArray3(),N=p.vec3f64.create(),z=p.vec3f64.create(),j=l.lineSegment.create(),F=l.lineSegment.create(),H=p.vec3f64.create(),Z=p.vec3f64.create(),G=p.vec3f64.create(),J=[o.createRenderScreenPointArray3(),o.createRenderScreenPointArray3(),o.createRenderScreenPointArray3(),o.createRenderScreenPointArray3()],k=[p.vec3f64.create(),p.vec3f64.create(),p.vec3f64.create(),p.vec3f64.create()],W=l.plane.create(),X=l.plane.create(),_=l.plane.create(),Y=l.plane.create();return x}));