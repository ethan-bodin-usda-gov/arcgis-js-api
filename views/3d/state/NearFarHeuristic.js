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

define(["require","exports","../../../core/mathUtils","../../../core/mathUtils","../../../core/unitUtils","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../support/earthUtils"],(function(t,e,r,a,n,i,s,o){Object.defineProperty(e,"__esModule",{value:!0}),e.createNearFarHeuristic=function(t,e,r){return"global"===t?new m:new u(e,r)};var u=function(){function t(t,e){this.elevationProvider=t,this.unitInMeters=n.getMetersPerUnitForSR(e)}return t.prototype.compute=function(t,e,n,s,u){u||(u={near:0,far:0});var m=o.earthRadius,x=t[2]*this.unitInMeters,p=x,y=x-s,d=this.elevationProvider?this.elevationProvider.elevationBounds:null;d&&(x=y>=0?p-this.unitInMeters*d.min:this.unitInMeters*d.max-p);var b={x:n.xmax-n.xmin,y:n.ymax-n.ymin,z:4*Math.max(n.xmax-n.xmin,n.ymax-n.ymin)},I=Math.max(b.x,b.y,b.z);i.vec3.subtract(f,e,t),v[0]=f[0]>0?n.xmax:n.xmin,v[1]=f[1]>0?n.ymax:n.ymin,v[2]=f[2]>0?I/2:-I/2,i.vec3.subtract(v,v,t),i.vec3.normalize(f,f);var g=1.1*i.vec3.dot(v,f)*this.unitInMeters,P=Math.sqrt(x*(x+2*m)),U=Math.max(n.xmax-n.xmin,n.ymax-n.ymin),q=U*M*this.unitInMeters,z=U*l*this.unitInMeters,R=r.clamp((x-z)/(q-z),0,1);R*=R*R;var w=a.lerp(P,g,R);return w*=Math.max(Math.log(Math.abs(y)),1),w=Math.min(w,Math.max(34064e4,I)),c(w/=this.unitInMeters,h,this.unitInMeters,u)},t}(),m=function(){function t(){}return t.prototype.compute=function(t,e,a,n,s){s||(s={near:0,far:0});var u=o.earthRadius,m=i.vec3.length(t)-u,h=u+Math.min(0,n),x=Math.abs(m-n),M=Math.max(x,Math.abs(m));return c(1.2*Math.sqrt(M*(M+2*h)),r.clamp(2e4-(Math.log(M)-7.983)/9.011*19e3,1e3,2e4),1,s)},t}();function c(t,e,r,a){var n=x/r;return t/e>n?(a.far=t,a.near=a.far/e):(a.near=n,a.far=a.near*e),a}var h=2e4,x=2,M=.001,l=1e-4,v=s.vec3f64.create(),f=s.vec3f64.create()}));