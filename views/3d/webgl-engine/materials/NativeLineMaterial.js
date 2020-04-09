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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/assignHelper","../../../../core/Logger","../../../../core/maybe","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../support/geometryUtils","../../support/buffer/BufferView","../lib/ComponentUtils","../lib/geometryDataUtils","../lib/GLMaterial","../lib/Material","../lib/Util","./internal/bufferWriterUtils","./internal/DefaultBufferWriter","./internal/MaterialUtil","./renderers/MergedRenderer","../shaders/NativeLineTechnique"],(function(e,t,r,n,i,a,s,o,c,l,p,u,f,h,d,m,g,v,P,y,A,C){var S=i.getLogger("esri.views.3d.webgl-engine.materials.NativeLineMaterial"),b=function(e){function t(t,r){var n=e.call(this,r)||this;return n.techniqueConfig=new C.NativeLineTechniqueConfiguration,n.params=y.copyParameters(t,q),n}return r(t,e),t.prototype.setParameterValues=function(e){var t=this.params;for(var r in e)t[r]=e[r];this.parametersChanged()},t.prototype.getParameters=function(){return this.params},t.prototype.getTechniqueConfig=function(e){this.techniqueConfig.output=e,this.techniqueConfig.slicePlaneEnabled=this.params.slicePlaneEnabled,this.techniqueConfig.vertexColors=this.params.vertexColors,this.techniqueConfig.transparent=this.params.color[3]<1||this.params.width<1;var t=a.isSome(this.params.stipplePattern);return this.techniqueConfig.stippleEnabled=t,this.techniqueConfig.stippleOffColorEnabled=t&&a.isSome(this.params.stippleOffColor),this.techniqueConfig.stippleIntegerRepeatsEnabled=t&&this.params.stippleIntegerRepeats,this.techniqueConfig.sceneHasOcludees=this.params.sceneHasOcludees,this.techniqueConfig},t.prototype.getPassParameters=function(){return this.params},t.prototype.intersect=function(e,t,r,n,i,a,s,o,c){c?y.intersectDrapedRenderLineGeometry(e,n,a,1,s):this.intersectLineGeometry(e,t,r,n,s)},t.prototype.intersectLineGeometry=function(e,t,r,n,i){if(n.options.selectionMode&&!f.isAllHidden(t.componentVisibilities,e.componentOffsets))if(g.isTranslationMatrix(r)){var a=e.data.getVertexAttr().position.data,s=n.camera,l=U;o.vec2.copy(l,n.point);c.vec3.set(E[0],l[0]-2,l[1]+2,0),c.vec3.set(E[1],l[0]+2,l[1]+2,0),c.vec3.set(E[2],l[0]+2,l[1]-2,0),c.vec3.set(E[3],l[0]-2,l[1]-2,0);for(var u=0;u<4;u++)s.unprojectPoint(E[u],H[u]);p.plane.fromPoints(s.eye,H[0],H[1],G),p.plane.fromPoints(s.eye,H[1],H[2],j),p.plane.fromPoints(s.eye,H[2],H[3],W),p.plane.fromPoints(s.eye,H[3],H[0],X);var h=Number.MAX_VALUE;for(u=0;u<a.length-5;u+=3)if(L[0]=a[u]+r[12],L[1]=a[u+1]+r[13],L[2]=a[u+2]+r[14],V[0]=a[u+3]+r[12],V[1]=a[u+4]+r[13],V[2]=a[u+5]+r[14],!(p.plane.signedDistance(G,L)<0&&p.plane.signedDistance(G,V)<0||p.plane.signedDistance(j,L)<0&&p.plane.signedDistance(j,V)<0||p.plane.signedDistance(W,L)<0&&p.plane.signedDistance(W,V)<0||p.plane.signedDistance(X,L)<0&&p.plane.signedDistance(X,V)<0)){if(s.projectPoint(L,R),s.projectPoint(V,B),R[2]<0&&B[2]>0){c.vec3.subtract(w,L,V);var d=s.frustum,m=-p.plane.signedDistance(d.planes[4],L)/c.vec3.dot(w,d.planes[4]);c.vec3.scale(w,w,m),c.vec3.add(L,L,w),s.projectPoint(L,R)}else if(R[2]>0&&B[2]<0){c.vec3.subtract(w,V,L);d=s.frustum,m=-p.plane.signedDistance(d.planes[4],V)/c.vec3.dot(w,d.planes[4]);c.vec3.scale(w,w,m),c.vec3.add(V,V,w),s.projectPoint(V,B)}else if(R[2]<0&&B[2]<0)continue;R[2]=0,B[2]=0;var v=p.lineSegment.distance2(p.lineSegment.fromPoints(R,B,I),l);v<h&&(h=v,c.vec3.copy(M,L),c.vec3.copy(T,V))}var P=n.rayBeginPoint,y=n.rayEndPoint;if(h<4){var A=Number.MAX_VALUE;if(p.lineSegment.closestLineSegmentPoint(p.lineSegment.fromPoints(M,T,I),p.lineSegment.fromPoints(P,y,N),D)){c.vec3.subtract(D,D,P);var C=c.vec3.length(D);c.vec3.scale(D,D,1/C),A=C/c.vec3.distance(P,y)}i(A,D)}}else S.error("intersection assumes a translation-only matrix")},t.prototype.computeAttachmentOrigin=function(e,t){var r=e.data,n="getVertexAttr"in r?r.getVertexAttr():"vertexAttr"in r?r.vertexAttr:null;if(!n)return null;var i=n[g.VertexAttrConstants.POSITION];return h.computeAttachmentOriginLines(i,null,!1,t)},t.prototype.createBufferWriter=function(){var e=this.params.vertexColors?P.PositionColorLayout:P.PositionLayout;return a.isNone(this.params.stipplePattern)?new P.DefaultBufferWriter(e):new O(e.clone().vec3f(g.VertexAttrConstants.AUXPOS1))},t.prototype.createRenderer=function(e,t){return new A(e,t,this)},t.prototype.getGLMaterial=function(e){return 0===e.output||4===e.output?new x(e):void 0},t}(m.Material),x=function(e){function t(t){var r=e.call(this,t)||this;return r.updateParameters(),r}return r(t,e),t.prototype.updateParameters=function(){this.technique=this.techniqueRep.acquireAndReleaseExisting(C.NativeLineTechnique,this.material.getTechniqueConfig(this.output),this.technique)},t.prototype.beginSlot=function(e){return 3===e},t.prototype._updateOccludeeState=function(e){e.hasOccludees!==this.material.getParameters().sceneHasOcludees&&(this.material.setParameterValues({sceneHasOcludees:e.hasOccludees}),this.updateParameters())},t.prototype.ensureParameters=function(e){0===this.output&&this._updateOccludeeState(e)},t.prototype.bind=function(e,t){e.bindProgram(this.technique.program),this.technique.bindPass(e,this.material.getPassParameters(),t)},t.prototype.getPipelineState=function(e,t){return t?this.technique.opaqueOccludeeState:this.technique.pipeline},t}(d.GLMaterial),O=function(){function e(e){this.vertexBufferLayout=e}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){return e.indices[g.VertexAttrConstants.POSITION].length},e.prototype.write=function(e,t,r,n){v.writeDefaultAttributes(t,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,r,n),this.writeAuxpos1(e,t,r,n)},e.prototype.writeAuxpos1=function(e,t,r,n){var i=r.getField(g.VertexAttrConstants.AUXPOS1,u.BufferViewVec3f),a=t.indices[g.VertexAttrConstants.POSITION],s=t.vertexAttr[g.VertexAttrConstants.POSITION].data,o=e.transformation,c=i.typedBufferStride,l=i.typedBuffer;n*=c;for(var p=0;p<a.length;p+=2)for(var f=3*a[p],h=s[f],d=s[f+1],m=s[f+2],v=o[0]*h+o[4]*d+o[8]*m+o[12],P=o[1]*h+o[5]*d+o[9]*m+o[13],y=o[2]*h+o[6]*d+o[10]*m+o[14],A=0;A<2;++A)l[n]=v,l[n+1]=P,l[n+2]=y,n+=c},e}(),q={color:[1,1,1,1],vertexColors:!1,slicePlaneEnabled:!1,width:1,stipplePattern:null,stippleIntegerRepeats:!1,stippleOffColor:null,sceneHasOcludees:!1},L=l.vec3f64.create(),V=l.vec3f64.create(),w=l.vec3f64.create(),D=l.vec3f64.create(),R=s.createRenderScreenPointArray3(),B=s.createRenderScreenPointArray3(),M=l.vec3f64.create(),T=l.vec3f64.create(),I=p.lineSegment.create(),N=p.lineSegment.create(),U=l.vec3f64.create(),E=[s.createRenderScreenPointArray3(),s.createRenderScreenPointArray3(),s.createRenderScreenPointArray3(),s.createRenderScreenPointArray3()],H=[l.vec3f64.create(),l.vec3f64.create(),l.vec3f64.create(),l.vec3f64.create()],G=p.plane.create(),j=p.plane.create(),W=p.plane.create(),X=p.plane.create();return b}));