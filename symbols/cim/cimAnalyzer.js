// COPYRIGHT © 2019 Esri
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
// See http://js.arcgis.com/4.14/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../core/tsSupport/assignHelper","../../Color","../../core/Logger","../../core/promiseUtils","../../core/string","../../support/arcadeOnDemand","./CIMSymbolHelper","./enums","./SDFHelper","../../views/2d/arcade/utils"],function(e,t,r,n,i,o,a,s,l,c,u,f,m,h){function p(e){return e?{r:e[0],g:e[1],b:e[2],a:e[3]/255}:{r:0,g:0,b:0,a:0}}function y(e){switch(e){case"Butt":return f.CapType.BUTT;case"Square":return f.CapType.SQUARE;case"Round":default:return f.CapType.ROUND}}function d(e){switch(e){case"Bevel":return f.JoinType.BEVEL;case"Miter":return f.JoinType.MITER;case"Round":default:return f.JoinType.ROUND}}function v(e){switch(e){case"Left":default:return"left";case"Right":return"right";case"Center":return"center";case"Justify":return"justify"}}function g(e){switch(e){case"Top":default:return"top";case"Center":return"middle";case"Baseline":return"baseline";case"Bottom":return"bottom"}}function S(e){var t="normal",r="normal";if(e){var n=e.toLowerCase();-1!==n.indexOf("italic")?t="italic":-1!==n.indexOf("oblique")&&(t="oblique"),-1!==n.indexOf("bold")?r="bold":-1!==n.indexOf("light")&&(r="lighter")}return{style:t,weight:r}}function b(e){return e.underline?"underline":e.strikethrough?"line-through":"none"}function C(e,t,i,o,a){return n(this,void 0,void 0,function(){var n,s,l,c;return r(this,function(r){switch(r.label){case 0:if(n=o||[],!e)return[2,n];switch("CIMSymbolReference"===e.type?(s=e.symbol,l=e.primitiveOverrides):(s=e,l=null),c=s.type){case"CIMPointSymbol":case"CIMLineSymbol":case"CIMPolygonSymbol":return[3,1];case"CIMTextSymbol":return[3,3]}return[3,4];case 1:return[4,O(s,l,t,i,n,a)];case 2:return r.sent(),[3,4];case 3:return[3,4];case 4:return[2,n]}})})}function O(e,t,i,o,a,s){return n(this,void 0,void 0,function(){var n,l,c,m,h,p,y;return r(this,function(r){switch(r.label){case 0:if(!e)return[2];if(!(n=e.symbolLayers))return[2];c=u.CIMSymbolHelper.getSize(e),"CIMPointSymbol"===e.type&&"Map"===e.angleAlignment&&(l=f.Alignment.MAP),m=n.length,r.label=1;case 1:if(!m--)return[3,23];if(!(h=n[m])||!1===h.enable)return[3,1];switch(p=[],u.OverrideHelper.findApplicableOverrides(h,t,p),y=h.type){case"CIMSolidFill":return[3,2];case"CIMPictureFill":return[3,4];case"CIMHatchFill":return[3,6];case"CIMGradientFill":return[3,8];case"CIMSolidStroke":return[3,10];case"CIMPictureStroke":return[3,12];case"CIMGradientStroke":return[3,14];case"CIMCharacterMarker":return[3,16];case"CIMPictureMarker":return[3,17];case"CIMVectorMarker":return[3,19]}return[3,21];case 2:return[4,H(h,p,o,a)];case 3:return r.sent(),[3,22];case 4:return[4,N(h,p,o,a)];case 5:return r.sent(),[3,22];case 6:return[4,w(h,p,o,a)];case 7:return r.sent(),[3,22];case 8:return[4,M(h,p,o,a)];case 9:return r.sent(),[3,22];case 10:return[4,k(h,p,o,a,"CIMPolygonSymbol"===e.type,c)];case 11:return r.sent(),[3,22];case 12:return[4,I(h,p,o,a,"CIMPolygonSymbol"===e.type,c)];case 13:return r.sent(),[3,22];case 14:return[4,L(h,p,o,a,"CIMPolygonSymbol"===e.type,c)];case 15:return r.sent(),[3,22];case 16:return[3,22];case 17:return[4,P(h,p,o,a,l,c)];case 18:return r.sent(),[3,22];case 19:return[4,x(h,p,i,o,a,l,c,s)];case 20:return r.sent(),[3,22];case 21:U.error("Cannot analyze CIM layer",h.type),r.label=22;case 22:return[3,1];case 23:return[2]}})})}function H(e,t,i,o){return n(this,void 0,void 0,function(){var n,a,s,c,u,f;return r(this,function(r){switch(r.label){case 0:return n=e.primitiveName,a=p(e.color),s=l.numericHash(JSON.stringify(e)).toString(),u=(c=o).push,f={type:"fill",templateHash:s,materialHash:0===t.length?s:function(){return s},cim:e,materialOverrides:null,colorLocked:e.colorLocked},[4,T(n,"Color",t,i,a,A)];case 1:return u.apply(c,[(f.color=r.sent(),f.height=0,f.angle=0,f.offsetX=0,f.offsetY=0,f.scaleX=1,f)]),[2]}})})}function N(e,t,i,o){return n(this,void 0,void 0,function(){var n,a,s,c,u,f,m;return r(this,function(r){switch(r.label){case 0:return n=e.primitiveName,a=p(e.tintColor),s=l.numericHash(JSON.stringify(e)).toString(),c=l.numericHash(""+e.url+JSON.stringify(e.colorSubstitutions)).toString(),f=(u=o).push,m={type:"fill",templateHash:s,materialHash:0===t.length?c:function(){return c},cim:e,materialOverrides:null,colorLocked:e.colorLocked},[4,T(n,"TintColor",t,i,a,A)];case 1:return m.color=r.sent(),[4,T(n,"Height",t,i,e.height)];case 2:return m.height=r.sent(),[4,T(n,"ScaleX",t,i,e.scaleX)];case 3:return m.scaleX=r.sent(),[4,T(n,"Rotation",t,i,e.rotation)];case 4:return m.angle=r.sent(),[4,T(n,"OffsetX",t,i,e.offsetX)];case 5:return m.offsetX=r.sent(),[4,T(n,"OffsetY",t,i,e.offsetY)];case 6:return f.apply(u,[(m.offsetY=r.sent(),m)]),[2]}})})}function w(e,t,i,o){return n(this,void 0,void 0,function(){var n,a,s,c,u,f,m,h;return r(this,function(r){switch(r.label){case 0:return n=["Rotation","OffsetX","OffsetY"],(a=t.filter(function(t){return t.primitiveName!==e.primitiveName&&-1===n.indexOf(t.propertyName)}),s=e.primitiveName,c=l.numericHash(JSON.stringify(e)).toString(),f=(u=o).push,m={type:"fill",templateHash:c},0!==t.length)?[3,1]:(h=c,[3,3]);case 1:return[4,D(c,a,i)];case 2:h=r.sent(),r.label=3;case 3:return m.materialHash=h,m.cim=e,m.materialOverrides=a,m.colorLocked=e.colorLocked,m.color={r:128,g:128,b:128,a:1},m.height=0,m.scaleX=1,[4,T(s,"Rotation",t,i,e.rotation)];case 4:return m.angle=r.sent(),[4,T(s,"OffsetX",t,i,e.offsetX)];case 5:return m.offsetX=r.sent(),[4,T(s,"OffsetY",t,i,e.offsetY)];case 6:return f.apply(u,[(m.offsetY=r.sent(),m)]),[2]}})})}function M(e,t,i,o){return n(this,void 0,void 0,function(){var n,a,s,c,u;return r(this,function(r){switch(r.label){case 0:return n=l.numericHash(JSON.stringify(e)).toString(),(s=(a=o).push,c={type:"fill",templateHash:n},0!==t.length)?[3,1]:(u=n,[3,3]);case 1:return[4,D(n,t,i)];case 2:u=r.sent(),r.label=3;case 3:return s.apply(a,[(c.materialHash=u,c.cim=e,c.materialOverrides=null,c.colorLocked=e.colorLocked,c.color={r:128,g:128,b:128,a:1},c.height=0,c.angle=0,c.offsetX=0,c.offsetY=0,c.scaleX=1,c)]),[2]}})})}function k(e,t,i,o,a,s){return n(this,void 0,void 0,function(){var n,c,u,f,m,h,v,g,S,b;return r(this,function(r){switch(r.label){case 0:return n=l.numericHash(JSON.stringify(e)).toString(),c=e.primitiveName,u=p(e.color),f=void 0!==e.width?e.width:4,m=y(e.capStyle),h=d(e.joinStyle),v=e.miterLimit,S=(g=o).push,b={type:"line",templateHash:n,materialHash:0===t.length?n:function(){return n},cim:e,materialOverrides:null,isOutline:a,colorLocked:e.colorLocked},[4,T(c,"Color",t,i,u,A)];case 1:return b.color=r.sent(),[4,T(c,"Width",t,i,f)];case 2:return b.width=r.sent(),[4,T(c,"CapStyle",t,i,m)];case 3:return b.cap=r.sent(),[4,T(c,"JoinStyle",t,i,h)];case 4:return b.join=r.sent(),[4,T(c,"MiterLimit",t,i,v)];case 5:return S.apply(g,[(b.miterLimit=r.sent(),b.referenceWidth=s,b.zOrder=Y(e.name),b.isDashed=!1,b)]),[2]}})})}function I(e,t,i,o,a,s){return n(this,void 0,void 0,function(){var n,c,u,f,m,h,v,g,S,b,C;return r(this,function(r){switch(r.label){case 0:return n=l.numericHash(""+e.url+JSON.stringify(e.colorSubstitutions)).toString(),c=e.primitiveName,u=p(e.tintColor),f=void 0!==e.width?e.width:4,m=y(e.capStyle),h=d(e.joinStyle),v=e.miterLimit,g=l.numericHash(JSON.stringify(e)).toString(),b=(S=o).push,C={type:"line",templateHash:g,materialHash:0===t.length?n:function(){return n},cim:e,materialOverrides:null,isOutline:a,colorLocked:e.colorLocked},[4,T(c,"TintColor",t,i,u,A)];case 1:return C.color=r.sent(),[4,T(c,"Width",t,i,f)];case 2:return C.width=r.sent(),[4,T(c,"CapStyle",t,i,m)];case 3:return C.cap=r.sent(),[4,T(c,"JoinStyle",t,i,h)];case 4:return C.join=r.sent(),[4,T(c,"MiterLimit",t,i,v)];case 5:return b.apply(S,[(C.miterLimit=r.sent(),C.referenceWidth=s,C.zOrder=Y(e.name),C.isDashed=!1,C)]),[2]}})})}function L(e,t,i,o,a,s){return n(this,void 0,void 0,function(){var n,c,u,f,m,h,p,v,g,S;return r(this,function(r){switch(r.label){case 0:return n=e.primitiveName,(c=void 0!==e.width?e.width:4,u=y(e.capStyle),f=d(e.joinStyle),m=e.miterLimit,h=l.numericHash(JSON.stringify(e)).toString(),v=(p=o).push,g={type:"line",templateHash:h},0!==t.length)?[3,1]:(S=h,[3,3]);case 1:return[4,D(h,t,i)];case 2:S=r.sent(),r.label=3;case 3:return g.materialHash=S,g.cim=e,g.materialOverrides=null,g.isOutline=a,g.colorLocked=e.colorLocked,g.color={r:128,g:128,b:128,a:1},[4,T(n,"Width",t,i,c)];case 4:return g.width=r.sent(),[4,T(n,"CapStyle",t,i,u)];case 5:return g.cap=r.sent(),[4,T(n,"JoinStyle",t,i,f)];case 6:return g.join=r.sent(),[4,T(n,"MiterLimit",t,i,m)];case 7:return v.apply(p,[(g.miterLimit=r.sent(),g.referenceWidth=s,g.zOrder=Y(e.name),g.isDashed=!1,g)]),[2]}})})}function P(e,t,i,o,a,s){return n(this,void 0,void 0,function(){var n,c,u,f,m,h,y,d,v,g,S,b,C,O,H,N;return r(this,function(r){switch(r.label){case 0:for(n=e.primitiveName,c=e.size,u=e.scaleX,f=e.rotation,m=e.offsetX,h=e.offsetY,y=p(e.tintColor),d=l.numericHash(""+e.url+JSON.stringify(e.colorSubstitutions)).toString(),v=!1,g="",S=0,b=t;S<b.length;S++)C=b[S],C.primitiveName===n&&(void 0!==C.value?g+="|"+C.primitiveName+"|"+C.propertyName+"|"+JSON.stringify(C.value):C.valueExpressionInfo&&(v=!0));return H=(O=o).push,N={type:"marker",templateHash:l.numericHash(JSON.stringify(e)+g).toString(),materialHash:v?function(){return d}:d,cim:e,materialOverrides:null,colorLocked:e.colorLocked,scaleSymbolsProportionally:!1,alignment:a,anchorPoint:e.anchorPoint,isAbsoluteAnchorPoint:"Relative"!==e.anchorPointUnits},[4,T(n,"Size",t,i,c)];case 1:return N.size=r.sent(),[4,T(n,"ScaleX",t,i,u)];case 2:return N.scaleX=r.sent(),[4,T(n,"Rotation",t,i,f)];case 3:return N.rotation=r.sent(),[4,T(n,"OffsetX",t,i,m)];case 4:return N.offsetX=r.sent(),[4,T(n,"OffsetY",t,i,h)];case 5:return N.offsetY=r.sent(),[4,T(n,"TintColor",t,i,y,A)];case 6:return H.apply(O,[(N.color=r.sent(),N.outlineColor={r:0,g:0,b:0,a:0},N.outlineWidth=0,N.frameHeight=0,N.rotateClockwise=e.rotateClockwise,N.referenceSize=s,N.sizeRatio=1,N)]),[2]}})})}function x(e,t,i,o,a,l,c,u){return n(this,void 0,void 0,function(){var n,f,m,h,p,y,d,v;return r(this,function(r){switch(r.label){case 0:if(!(n=e.markerGraphics))return[2];for(f=0,e.scaleSymbolsProportionally&&(m=e.frame)&&(f=m.ymax-m.ymin),h=[],p=0,y=n;p<y.length;p++)if(d=y[p]){if(!(v=d.symbol))continue;switch(v.type){case"CIMPointSymbol":case"CIMLineSymbol":case"CIMPolygonSymbol":h.push(z(e,d,t,o,a,l,c,f,u));break;case"CIMTextSymbol":h.push(X(e,d,t,i,o,a,l,c,f))}}return[4,s.all(h)];case 1:return r.sent(),[2]}})})}function X(e,t,o,a,s,c,f,m,h){return n(this,void 0,void 0,function(){var n,y,d,C,O,H,N,w,M,k,I,L,P,x,X,z,J,R,Y,A,F,D,E,U;return r(this,function(r){switch(r.label){case 0:if(n=[],u.OverrideHelper.findApplicableOverrides(t,o,n),!("x"in(y=t.geometry)&&"y"in y))return[2];for(d=t.symbol,C=b(d),O=S(d.fontStyleName),d.font=i({family:d.fontFamilyName,decoration:C},O),H=e.frame,N=y.x-.5*(H.xmin+H.xmax),w=y.y-.5*(H.ymin+H.ymax),M=e.size/h,k=e.primitiveName,I=(d.height||0)*M,L=d.angle||0,P=((d.offsetX||0)+N)*M,x=((d.offsetY||0)+w)*M,X=p(u.CIMSymbolHelper.getFillColor(d)),z=p(u.CIMSymbolHelper.getStrokeColor(d)),J=u.CIMSymbolHelper.getStrokeWidth(d),J||(z=p(u.CIMSymbolHelper.getFillColor(d.haloSymbol)),J=d.haloSize*M),R="",Y=0,A=o;Y<A.length;Y++)F=A[Y],F.primitiveName===k&&void 0!==F.value&&(R+="|"+F.primitiveName+"|"+F.propertyName+"|"+JSON.stringify(F.value));return E=(D=c).push,U={type:"text",templateHash:l.numericHash(JSON.stringify(t)+R).toString(),materialHash:function(){return l.numericHash(JSON.stringify(d.font)).toString()},cim:d,materialOverrides:null,colorLocked:e.colorLocked,alignment:f,anchorPoint:{x:e.anchorPoint?e.anchorPoint.x:0,y:e.anchorPoint?e.anchorPoint.y:0},isAbsoluteAnchorPoint:"Relative"!==e.anchorPointUnits,fontName:d.fontFamilyName,decoration:"none",weight:"normal",style:"normal"},[4,T(k,"Height",o,s,I)];case 1:return U.size=r.sent(),[4,T(k,"Rotation",o,s,L)];case 2:return U.angle=r.sent(),[4,T(k,"OffsetX",o,s,P)];case 3:return U.offsetX=r.sent(),[4,T(k,"OffsetY",o,s,x)];case 4:return E.apply(D,[(U.offsetY=r.sent(),U.horizontalAlignment=v(d.horizontalAlignment),U.verticalAlignment=g(d.verticalAlignment),U.text=W(a,t.textString,d.textCase),U.color=X,U.outlineColor=z,U.outlineSize=J,U.referenceSize=m,U.sizeRatio=1,U)]),[2]}})})}function z(e,t,i,o,a,s,c,f,h){return n(this,void 0,void 0,function(){var n,y,d,v,g,S;return r(this,function(b){switch(b.label){case 0:if(n=t.symbol,!(y=t.geometry))return[2];if(d=m.getExtent(y),"CIMTextSymbol"===n.type)return[2];if(!(v=n.symbolLayers))return[2];g=v.length,S=function(){var n,S,b,C,O,H,N,w,M,k,I,L,P,x,X,z,R,Y,F,W,D,E,U,j,B,q,G,_,V;return r(this,function(r){switch(r.label){case 0:return n=v[g],n&&!1!==n.enable?h?[4,J(e,t,i,o,a,s,c,f)]:[3,2]:[2,"continue"];case 1:return r.sent(),[2,"continue"];case 2:switch(S=n.type){case"CIMSolidFill":case"CIMSolidStroke":return[3,3]}return[3,15];case 3:if(b=m.getSDFMetrics(d,e.frame,e.size,e.anchorPoint,"Relative"!==e.anchorPointUnits),C=b[0],O=b[1],H=b[2],N="CIMSolidFill"===n.type,w={type:"sdf",geom:y,asFill:N},M=e.primitiveName,k=e.size,I=e.rotation,L=e.offsetX,P=e.offsetY,x=n.primitiveName,X=p(N?u.CIMSymbolHelper.getFillColor(n):u.CIMSymbolHelper.getStrokeColor(n)),z=N?{r:0,g:0,b:0,a:0}:p(u.CIMSymbolHelper.getStrokeColor(n)),R=u.CIMSymbolHelper.getStrokeWidth(n),!N&&!R)return[3,16];for(Y=!1,F="",W=0,D=i;W<D.length;W++)E=D[W],E.primitiveName!==x&&E.primitiveName!==M||(void 0!==E.value?F+="|"+E.primitiveName+"|"+E.propertyName+"|"+JSON.stringify(E.value):E.valueExpressionInfo&&(Y=!0));return U=l.numericHash(JSON.stringify(w)).toString(),j=l.numericHash(JSON.stringify(n)+JSON.stringify(t)+F).toString(),q=(B=a).push,G={type:"marker",templateHash:j,materialHash:Y?function(){return U}:U,cim:w,materialOverrides:null,colorLocked:e.colorLocked,scaleSymbolsProportionally:e.scaleSymbolsProportionally,alignment:s,anchorPoint:{x:O,y:H},isAbsoluteAnchorPoint:!1},[4,T(M,"Size",i,o,k)];case 4:return G.size=r.sent(),G.scaleX=1,[4,T(M,"Rotation",i,o,I)];case 5:return G.rotation=r.sent(),[4,T(M,"OffsetX",i,o,L)];case 6:return G.offsetX=r.sent(),[4,T(M,"OffsetY",i,o,P)];case 7:return G.offsetY=r.sent(),[4,T(x,"Color",i,o,X,A)];case 8:return G.color=r.sent(),N?(_={r:0,g:0,b:0,a:0},[3,11]):[3,9];case 9:return[4,T(x,"Color",i,o,z,A)];case 10:_=r.sent(),r.label=11;case 11:return G.outlineColor=_,N?(V=0,[3,14]):[3,12];case 12:return[4,T(x,"Width",i,o,R)];case 13:V=r.sent(),r.label=14;case 14:return q.apply(B,[(G.outlineWidth=V,G.frameHeight=f,G.rotateClockwise=e.rotateClockwise,G.referenceSize=c,G.sizeRatio=C,G)]),[3,16];case 15:return J(e,t,i,o,a,s,c,f),[3,16];case 16:return[2]}})},b.label=1;case 1:return g--?[5,S()]:[3,3];case 2:return b.sent(),[3,1];case 3:return[2]}})})}function J(e,t,i,o,a,s,c,f){return n(this,void 0,void 0,function(){var n,m,h,p,y,d,v,g,S,b,C,O,H,N,w,M;return r(this,function(r){switch(r.label){case 0:return n=R(e,t),(m=[],h=["Rotation","OffsetX","OffsetY"],m=i.filter(function(t){return t.primitiveName!==e.primitiveName||-1===h.indexOf(t.propertyName)}),p=u.CIMSymbolHelper.getTextureAnchor(n),y=p[0],d=p[1],v=JSON.stringify(n),g=e.primitiveName,S=e.rotation,b=e.offsetX,C=e.offsetY,O=l.numericHash(JSON.stringify(n)).toString(),N=(H=a).push,w={type:"marker",templateHash:O},0!==m.length)?[3,1]:(M=O,[3,3]);case 1:return[4,D(v,m,o)];case 2:M=r.sent(),r.label=3;case 3:return w.materialHash=M,w.cim=n,w.materialOverrides=m,w.colorLocked=e.colorLocked,w.scaleSymbolsProportionally=e.scaleSymbolsProportionally,w.alignment=s,w.anchorPoint={x:y,y:d},w.isAbsoluteAnchorPoint=!1,w.size=e.size,w.scaleX=1,[4,T(g,"Rotation",i,o,S)];case 4:return w.rotation=r.sent(),[4,T(g,"OffsetX",i,o,b)];case 5:return w.offsetX=r.sent(),[4,T(g,"OffsetY",i,o,C)];case 6:return N.apply(H,[(w.offsetY=r.sent(),w.color={r:0,g:0,b:0,a:0},w.outlineColor={r:0,g:0,b:0,a:0},w.outlineWidth=0,w.frameHeight=f,w.rotateClockwise=e.rotateClockwise,w.referenceSize=c,w.sizeRatio=1,w)]),[2]}})})}function R(e,t){return{type:e.type,enable:!0,name:e.name,colorLocked:e.colorLocked,primitiveName:e.primitiveName,anchorPoint:e.anchorPoint,anchorPointUnits:e.anchorPointUnits,offsetX:0,offsetY:0,rotateClockwise:e.rotateClockwise,rotation:0,size:e.size,billboardMode3D:e.billboardMode3D,depth3D:e.depth3D,frame:e.frame,markerGraphics:[t],scaleSymbolsProportionally:e.scaleSymbolsProportionally,respectFrame:e.respectFrame,clippingPath:e.clippingPath}}function Y(e){if(e&&0===e.indexOf("Level_")){var t=parseInt(e.substr(6),10);if(NaN!==t)return t}return 0}function A(e){if(!e||0===e.length)return null;var t=new o(e).toRgba();return{r:t[0],g:t[1],b:t[2],a:t[3]}}function T(e,t,i,o,a,s){return n(this,void 0,void 0,function(){var n,l,u,f,m;return r(this,function(p){switch(p.label){case 0:if(!e)return[3,4];n=function(n){var i,l,u;return r(this,function(r){switch(r.label){case 0:return n.primitiveName!==e||n.propertyName!==t?[3,2]:void 0!==n.value?[2,{value:s?s(n.value):n.value}]:(i=n.valueExpressionInfo)?(l=i.expression,[4,c.createRendererExpression(l,o.spatialReference,o.fields)]):[3,2];case 1:return u=r.sent(),[2,{value:function(e,t,r){var n=h.callWithFeature(u,e,{$view:r},o.geometryType,t);return null!==n&&s&&(n=s(n)),null!==n?n:a}}];case 2:return[2]}})},l=0,u=i,p.label=1;case 1:return l<u.length?(f=u[l],[5,n(f)]):[3,4];case 2:if("object"==typeof(m=p.sent()))return[2,m.value];p.label=3;case 3:return l++,[3,1];case 4:return[2,a]}})})}function F(e,t){switch(t){case"LowerCase":return e.toLowerCase();case"Allcaps":return e.toUpperCase();default:return e}}function W(e,t,r){if(!e||-1===t.indexOf("["))return F(t,r);var n=" /-,\n",i=function(e){for(var t=e.length;t--;)if(-1===n.indexOf(e.charAt(t)))return!1;return!0},o=[],a=0,s=-1;do{if((s=t.indexOf("[",a))>=a){if(s>a){var l=t.substr(a,s-a);o.push([l,null,i(l)])}if(a=s+1,(s=t.indexOf("]",a))>=a){if(s>a){var c=t.substr(a,s-a),u=e[c];u&&o.push([null,u,!1])}a=s+1}}}while(-1!==s);if(a<t.length-1){var l=t.substr(a);o.push([l,null,i(l)])}return function(e){for(var t="",n=null,i=0,a=o;i<a.length;i++){var s=a[i],l=s[0],c=s[1],u=s[2];if(l)u?n=l:(n&&(t+=n,n=null),t+=l);else{var f=e.attributes[c];f&&(n&&(t+=n,n=null),t+=f)}}return F(t,r)}}function D(e,t,i){return n(this,void 0,void 0,function(){var n,o,a,s;return r(this,function(f){switch(f.label){case 0:n=function(e){var t,n,o;return r(this,function(r){switch(r.label){case 0:return(t=e.valueExpressionInfo)?(n=t.expression,[4,c.createRendererExpression(n,i.spatialReference,i.fields)]):[3,2];case 1:o=r.sent(),e.fn=function(e,t,r){return h.callWithFeature(o,e,{$view:r},i.geometryType,t)},r.label=2;case 2:return[2]}})},o=0,a=t,f.label=1;case 1:return o<a.length?(s=a[o],[5,n(s)]):[3,4];case 2:f.sent(),f.label=3;case 3:return o++,[3,1];case 4:return[2,function(r,n,i){for(var o=0,a=t;o<a.length;o++){var s=a[o];s.fn&&(s.value=s.fn(r,n,i))}return l.numericHash(e+u.OverrideHelper.buildOverrideKey(t)).toString()}]}})})}function E(e,t){if(!t||0===t.length)return e;var r=JSON.parse(JSON.stringify(e));return u.OverrideHelper.applyOverrides(r,t),r}Object.defineProperty(t,"__esModule",{value:!0});var U=a.getLogger("esri.symbols.cim.cimAnalyzer");t.analyzeCIMSymbol=C,t.analyzeCIMResource=E});