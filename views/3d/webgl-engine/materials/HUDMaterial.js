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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/tsSupport/assignHelper","../../../../core/screenUtils","../../../../core/libs/gl-matrix-2/mat3","../../../../core/libs/gl-matrix-2/mat3f64","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/types/mat4","../../../../geometry/support/aaBoundingRect","../../support/buffer/InterleavedLayout","../lib/ComponentUtils","../lib/geometryDataUtils","../lib/GLMaterialTexture","../lib/Material","../lib/screenSizePerspectiveUtils","../lib/Util","./internal/bufferWriterUtils","./internal/MaterialUtil","./renderers/MergedRenderer","../shaders/HUDMaterial.glsl","../shaders/HUDMaterialTechnique"],(function(e,t,r,i,n,a,s,o,c,l,u,f,p,h,d,v,m,g,x,A,S,P,C,O,y,V,b){var q=function(e){function t(t,r){var i=e.call(this,r)||this;return i.techniqueConfig=new b.HUDMaterialTechniqueConfiguration,i.params=O.copyParameters(t,J),i}return r(t,e),t.prototype.dispose=function(){},t.prototype.setParameterValues=function(e){for(var t in e)"textureId"===t&&P.assert(!!this.params.textureId,"Can only change texture of material that already has a texture"),this.params[t]=e[t];this.parametersChanged()},t.prototype.getParameters=function(){return this.params},t.prototype.getTechniqueConfig=function(e){return this.techniqueConfig.output=e,this.techniqueConfig.slicePlaneEnabled=this.params.slicePlaneEnabled,this.techniqueConfig.verticalOffset=!!this.params.verticalOffset,this.techniqueConfig.screenSizePerspective=!!this.params.screenSizePerspective,this.techniqueConfig.screenCenterOffsetUnitsEnabled="screen"===this.params.centerOffsetUnits?1:0,this.techniqueConfig.polygonOffsetEnabled=this.params.polygonOffset,this.techniqueConfig.occlusionTestEnabled=this.params.occlusionTest,this.techniqueConfig.sdf=this.params.textureIsSignedDistanceField,this.techniqueConfig.vvSize=!!this.params.vvSizeEnabled,this.techniqueConfig.vvColor=!!this.params.vvColorEnabled,0===e&&(this.techniqueConfig.debugDrawBorder=!!this.params.debugDrawBorder),4===e&&(this.techniqueConfig.binaryHighlightOcclusion=this.params.binaryHighlightOcclusion),this.techniqueConfig.depthEnabled=this.params.depthEnabled,this.techniqueConfig},t.prototype.intersect=function(e,t,r,i,n,a,s,o,c){c?this.intersectDrapedHudGeometry(e,a,s,o):this.intersectHudGeometry(e,t,r,i,s,o)},t.prototype.intersectDrapedHudGeometry=function(e,t,r,i){var n=e.getAttribute(P.VertexAttrConstants.POSITION),a=e.getAttribute(P.VertexAttrConstants.SIZE),s=this.params,o=V.calculateAnchorPosForRendering(s),c=1,l=1;if(i){var u=i(G);c=u[0],l=u[5]}c*=e.pixelRatio,l*=e.pixelRatio;for(var f=j*e.pixelRatio,p=0;p<n.data.length/n.size;p++){var h=p*n.size,d=n.data[h],v=n.data[h+1],m=p*a.size;W[0]=a.data[m]*c,W[1]=a.data[m+1]*l;var g=void 0;s.textureIsSignedDistanceField&&(g=s.outlineSize*e.pixelRatio/2),T(t,d,v,W,f,g,s,o)&&r()}},t.prototype.intersectHudGeometry=function(e,t,r,i,n,s){if(i.options.selectionMode&&i.options.hud&&!m.isAllHidden(t.componentVisibilities,e.componentOffsets)){var c,l,u,h,d,v,g,x,A,C,O,y,b,q=e.data,z=this.params,I=1,M=1;if(a.mat3.fromMat4(F,r),s){var U=s(G);I=U[0],M=U[5],l=(c=F)[0],u=c[1],h=c[2],d=c[3],v=c[4],g=c[5],x=c[6],A=c[7],C=c[8],O=1/Math.sqrt(l*l+u*u+h*h),y=1/Math.sqrt(d*d+v*v+g*g),b=1/Math.sqrt(x*x+A*A+C*C),c[0]=l*O,c[1]=u*O,c[2]=h*O,c[3]=d*y,c[4]=v*y,c[5]=g*y,c[6]=x*b,c[7]=A*b,c[8]=C*b}var H=q.getVertexAttr()[P.VertexAttrConstants.POSITION],X=q.getVertexAttr()[P.VertexAttrConstants.SIZE],j=q.getVertexAttr()[P.VertexAttrConstants.NORMAL],k=q.getVertexAttr()[P.VertexAttrConstants.AUXPOS1];P.assert(H.size>=3);var J=i.point,K=i.camera,Q=V.calculateAnchorPosForRendering(z);I*=K.pixelRatio,M*=K.pixelRatio;for(var Y="screen"===this.params.centerOffsetUnits,$=0;$<H.data.length/H.size;$++){var _=$*H.size;f.vec3.set(w,H.data[_],H.data[_+1],H.data[_+2]),f.vec3.transformMat4(w,w,r);var ee=$*X.size;W[0]=X.data[ee]*I,W[1]=X.data[ee+1]*M,f.vec3.transformMat4(w,w,K.viewMatrix);var te=$*k.size;if(f.vec3.set(N,k.data[te+0],k.data[te+1],k.data[te+2]),!Y&&(w[0]+=N[0],w[1]+=N[1],0!==N[2])){var re=N[2];f.vec3.normalize(N,w),f.vec3.subtract(w,w,f.vec3.scale(N,N,re))}var ie=$*j.size;if(f.vec3.set(E,j.data[ie],j.data[ie+1],j.data[ie+2]),this.applyVerticalOffsetTransformation(w,E,F,K,R),K.applyProjection(w,D),D[0]>-1){var ne=Math.floor(D[0])+this.params.screenOffset[0],ae=Math.floor(D[1])+this.params.screenOffset[1];Y&&(ne+=N[0],0!==N[1]&&(ae+=S.applyScaleFactor(N[1],R.factorAlignment))),S.applyPrecomputedScaleFactorVec2(W,R.factor,W);var se=Z*K.pixelRatio,oe=void 0;if(z.textureIsSignedDistanceField&&(oe=z.outlineSize*K.pixelRatio/2),T(J,ne,ae,W,se,oe,z,Q)){var ce=i.ray;f.vec3.transformMat4(B,w,o.mat4.invert(L,K.viewMatrix)),D[0]=J[0],D[1]=J[1],K.unprojectPoint(D,w);var le=p.vec3f64.create();f.vec3.copy(le,ce.direction);var ue=1/f.vec3.length(le);f.vec3.scale(le,le,ue),n(f.vec3.distance(ce.origin,w)*ue,le,-1,1,!0,B)}}}}},t.prototype.computeAttachmentOrigin=function(e,t){var r=e.data,i="getVertexAttr"in r?r.getVertexAttr():"vertexAttr"in r?r.vertexAttr:null;if(!i)return null;var n=P.VertexAttrConstants.POSITION,a=i[n],s="getIndices"in r?r.getIndices(n):"indices"in r?r.indices[n]:null;return g.computeAttachmentOriginPoints(a,s,t)},t.prototype.createBufferWriter=function(){return new Q(this)},t.prototype.createRenderer=function(e,t){return new y(e,t,this)},t.prototype.normalAndViewAngle=function(e,t,r,i){return void 0===i&&(i=X),f.vec3.transformMat3(i.normal,e,t),f.vec3.transformMat4(i.normal,i.normal,r.viewInverseTransposeMatrix),i.cosAngle=f.vec3.dot(H,k),i},t.prototype.updateScaleInfo=function(e,t){var r=this.params;r.screenSizePerspective?e.factor=S.precomputeScaleFactor(X.cosAngle,t,r.screenSizePerspective,e.factor):(e.factor.scale=1,e.factor.factor=0,e.factor.minPixelSize=0,e.factor.paddingPixels=0),r.screenSizePerspectiveAlignment?e.factorAlignment=S.precomputeScaleFactor(X.cosAngle,t,r.screenSizePerspectiveAlignment,e.factorAlignment):(e.factorAlignment.factor=e.factor.factor,e.factorAlignment.scale=e.factor.scale,e.factorAlignment.minPixelSize=e.factor.minPixelSize,e.factorAlignment.paddingPixels=e.factor.paddingPixels)},t.prototype.applyVerticalOffsetTransformation=function(e,t,r,i,n,s){var o=this.params;if(h.isMat4(r)&&(r=a.mat3.fromMat4(F,r)),!o.verticalOffset||!o.verticalOffset.screenLength){if(n&&(o.screenSizePerspective||o.screenSizePerspectiveAlignment)){var c=f.vec3.length(e);this.updateScaleInfo(n,c)}else n&&(n.factor.scale=1,n.factorAlignment.scale=1);return s?f.vec3.copy(s,e):e}var l=this.normalAndViewAngle(t,r,i),u=f.vec3.length(e),p=o.screenSizePerspectiveAlignment||o.screenSizePerspective,d=O.verticalOffsetAtDistance(i,u,o.verticalOffset,l.cosAngle,p);return n&&this.updateScaleInfo(n,u),f.vec3.add(s||e,e,f.vec3.scale(l.normal,l.normal,d))},t.prototype.getGLMaterial=function(e){return 0===e.output?new I(e):4===e.output?new M(e):void 0},t.prototype.calculateRelativeScreenBounds=function(e,t,r){return void 0===r&&(r=d.create()),function(e,t,r,i){void 0===i&&(i=U);l.vec2.copy(i,e.anchorPos),i[0]*=-t[0],i[1]*=-t[1],i[0]+=e.screenOffset[0]*r,i[1]+=e.screenOffset[1]*r}(this.params,e,t,r),r[2]=r[0]+e[0],r[3]=r[1]+e[1],r},t.shouldRenderVisibilityDuringRenderPass=function(e){return 0===e||4},t}(A.Material),z=function(e){function t(t){var r=e.call(this,x.makeCtorParameters(t,t.material.getParameters()))||this;return r.updateParameters(),r}return r(t,e),t.prototype.beginSlot=function(e){return e===(this.params.drawInSecondSlot?19:18)},t.prototype.updateParameters=function(){this.params=O.copyParameters(this.material.getParameters()),this.updateTexture(this.params.textureId),this.selectProgram()},t.prototype.selectProgram=function(){this.technique=this.techniqueRep.acquireAndReleaseExisting(b.HUDMaterialTechnique,this.material.getTechniqueConfig(this.output),this.technique)},t.prototype.bind=function(e,t){e.bindProgram(this.technique.program),this.bindTexture(e,this.technique.program),this.bindTextureScale(e,this.technique.program),this.technique.bindPass(e,this.params,t)},t}(x),I=function(e){function t(t){var r=e.call(this,i({},t,{output:0}))||this;return r.isOcclusionSlot=!1,r}return r(t,e),t.prototype.beginSlot=function(e){var t=this.params.drawInSecondSlot?19:18;return this.params.occlusionTest?(this.isOcclusionSlot=12===e,12===e||e===t):(this.isOcclusionSlot=!1,e===t)},t.prototype.getTechnique=function(){return this.isOcclusionSlot?this.occlusionTechnique:this.technique},t.prototype.selectProgram=function(){this.technique=this.techniqueRep.acquireAndReleaseExisting(b.HUDMaterialTechnique,this.material.getTechniqueConfig(this.output),this.technique),this.occlusionTechnique=this.techniqueRep.acquireAndReleaseExisting(b.HUDMaterialTechnique,this.material.getTechniqueConfig(6),this.occlusionTechnique)},t.prototype.bind=function(e,t){var r=this.getTechnique();e.bindProgram(r.program),this.isOcclusionSlot||(this.bindTexture(e,r.program),this.bindTextureScale(e,r.program)),r.bindPass(e,this.params,t)},t}(z),M=function(e){function t(t){return e.call(this,i({},t,{output:4}))||this}return r(t,e),t}(z);function T(e,t,r,i,n,a,s,o){var c=t-n-(o[0]>0?i[0]*o[0]:0),l=c+i[0]+2*n,u=r-n-(o[1]>0?i[1]*o[1]:0),f=u+i[1]+2*n;if(s.textureIsSignedDistanceField){var p=s.distanceFieldBoundingBox;c+=i[0]*p[0],u+=i[1]*p[1],l-=i[0]*(1-p[2]),f-=i[1]*(1-p[3]),c-=a,l+=a,u-=a,f+=a}return e[0]>c&&e[0]<l&&e[1]>u&&e[1]<f}var R={factor:{scale:0,factor:0,minPixelSize:0,paddingPixels:0},factorAlignment:{scale:0,factor:0,minPixelSize:0,paddingPixels:0}},U=u.vec2f64.create(),w=p.vec3f64.create(),E=p.vec3f64.create(),D=n.createRenderScreenPointArray3(),H=p.vec3f64.create(),B=p.vec3f64.create(),F=s.mat3f64.create(),L=c.mat4f64.create(),N=p.vec3f64.create(),X={normal:H,cosAngle:0},G=c.mat4f64.create(),Z=1,j=2,W=[0,0],k=p.vec3f64.fromValues(0,0,1),J={texCoordScale:[1,1],occlusionTest:!0,binaryHighlightOcclusion:!0,drawInSecondSlot:!1,color:[1,1,1,1],outlineColor:[1,1,1,1],outlineSize:0,textureIsSignedDistanceField:!1,distanceFieldBoundingBox:null,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],screenOffset:[0,0],verticalOffset:null,screenSizePerspective:null,screenSizePerspectiveAlignment:null,slicePlaneEnabled:!1,anchorPos:u.vec2f64.fromValues(.5,.5),shaderPolygonOffset:1e-5,polygonOffset:!1,textureId:null,centerOffsetUnits:"world",depthEnabled:!0,debugDrawBorder:!1},K=v.newLayout().vec3f(P.VertexAttrConstants.POSITION).vec3f(P.VertexAttrConstants.NORMAL).vec2f(P.VertexAttrConstants.UV0).vec4u8(P.VertexAttrConstants.COLOR).vec2f(P.VertexAttrConstants.SIZE).vec4f(P.VertexAttrConstants.AUXPOS1).vec4f(P.VertexAttrConstants.AUXPOS2),Q=function(){function e(e){this.material=e,this.vertexBufferLayout=K}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){return 6*e.indices[P.VertexAttrConstants.POSITION].length},e.prototype.write=function(e,t,r,i){C.writePosition(t.indices[P.VertexAttrConstants.POSITION],t.vertexAttr[P.VertexAttrConstants.POSITION].data,e.transformation,r.position,i,6),C.writeNormal(t.indices[P.VertexAttrConstants.NORMAL],t.vertexAttr[P.VertexAttrConstants.NORMAL].data,e.invTranspTransformation,r.normal,i,6);var n=t.vertexAttr[P.VertexAttrConstants.UV0].data,a=void 0,s=void 0,o=void 0,c=void 0;if(null==n||n.length<4){var l=this.material.getParameters();a=0,s=0,o=l.texCoordScale[0],c=l.texCoordScale[1]}else a=n[0],s=n[1],o=n[2],c=n[3];o=Math.min(1.99999,o+1),c=Math.min(1.99999,c+1);for(var u=t.indices[P.VertexAttrConstants.POSITION].length,f=r.uv0,p=i,h=0;h<u;++h)f.set(p,0,a),f.set(p,1,s),p+=1,f.set(p,0,o),f.set(p,1,s),p+=1,f.set(p,0,o),f.set(p,1,c),p+=1,f.set(p,0,o),f.set(p,1,c),p+=1,f.set(p,0,a),f.set(p,1,c),p+=1,f.set(p,0,a),f.set(p,1,s),p+=1;C.writeColor(t.indices[P.VertexAttrConstants.COLOR],t.vertexAttr[P.VertexAttrConstants.COLOR].data,4,r.color,i,6);var d=t.indices[P.VertexAttrConstants.SIZE],v=t.vertexAttr[P.VertexAttrConstants.SIZE].data,m=d.length,g=r.size;for(p=i,h=0;h<m;++h)for(var x=v[2*d[h]],A=v[2*d[h]+1],S=0;S<6;++S)g.set(p,0,x),g.set(p,1,A),p+=1;t.indices[P.VertexAttrConstants.AUXPOS1]&&t.vertexAttr[P.VertexAttrConstants.AUXPOS1]&&C.writeBufferVec4(t.indices[P.VertexAttrConstants.AUXPOS1],t.vertexAttr[P.VertexAttrConstants.AUXPOS1].data,r.auxpos1,i,6),t.indices[P.VertexAttrConstants.AUXPOS2]&&t.vertexAttr[P.VertexAttrConstants.AUXPOS2]&&C.writeBufferVec4(t.indices[P.VertexAttrConstants.AUXPOS2],t.vertexAttr[P.VertexAttrConstants.AUXPOS2].data,r.auxpos2,i,6)},e}();return q}));