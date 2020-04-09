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

define(["require","exports","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f32","../../../../core/libs/gl-matrix-2/vec3f64","../../support/geometryUtils","./BufferVectorMath","./GeometryData","./Util"],(function(t,e,r,a,n,o,s,c,v){var l,i,A,f,y=s.Vec3Compact;!function(t){for(var e=.5,r=[[-e,-e,e],[e,-e,e],[e,e,e],[-e,e,e],[-e,-e,-e],[e,-e,-e],[e,e,-e],[-e,e,-e]],a=[0,0,1,-1,0,0,1,0,0,0,-1,0,0,1,0,0,0,-1],n=[0,0,1,0,1,1,0,1],o=[0,1,2,2,3,0,4,0,3,3,7,4,1,5,6,6,2,1,1,0,4,4,5,1,3,2,6,6,7,3,5,4,7,7,6,5],s=new Array(36),l=0;l<6;l++)for(var i=0;i<6;i++)s[6*l+i]=l;var A=new Array(36);for(l=0;l<6;l++)A[6*l+0]=0,A[6*l+1]=1,A[6*l+2]=2,A[6*l+3]=2,A[6*l+4]=3,A[6*l+5]=0;t.createGeometry=function(t){Array.isArray(t)||(t=[t,t,t]);for(var e=new Float32Array(24),l=0;l<8;l++)e[3*l]=r[l][0]*t[0],e[3*l+1]=r[l][1]*t[1],e[3*l+2]=r[l][2]*t[2];var i={};i[v.VertexAttrConstants.POSITION]=new Uint32Array(o),i[v.VertexAttrConstants.NORMAL]=new Uint32Array(s),i[v.VertexAttrConstants.UV0]=new Uint32Array(A);var f={};return f[v.VertexAttrConstants.POSITION]={size:3,data:e},f[v.VertexAttrConstants.NORMAL]={size:3,data:new Float32Array(a)},f[v.VertexAttrConstants.UV0]={size:2,data:new Float32Array(n)},new c.GeometryData(f,i)}}(l||(l={})),function(t){var e=.5,r=[[-e,0,-e],[e,0,-e],[e,0,e],[-e,0,e],[0,-e,0],[0,e,0]],a=[0,1,-1,1,1,0,0,1,1,-1,1,0,0,-1,-1,1,-1,0,0,-1,1,-1,-1,0],n=[5,1,0,5,2,1,5,3,2,5,0,3,4,0,1,4,1,2,4,2,3,4,3,0],o=[0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7];t.createGeometry=function(t){Array.isArray(t)||(t=[t,t,t]);for(var e=new Float32Array(18),s=0;s<6;s++)e[3*s]=r[s][0]*t[0],e[3*s+1]=r[s][1]*t[1],e[3*s+2]=r[s][2]*t[2];var l={};l[v.VertexAttrConstants.POSITION]=new Uint32Array(n),l[v.VertexAttrConstants.NORMAL]=new Uint32Array(o);var i={};return i[v.VertexAttrConstants.POSITION]={size:3,data:e},i[v.VertexAttrConstants.NORMAL]={size:3,data:new Float32Array(a)},new c.GeometryData(i,l)}}(i||(i={})),function(t){var e=.5,n=a.vec3f32.fromValues(-e,0,-e),o=a.vec3f32.fromValues(e,0,-e),s=a.vec3f32.fromValues(0,0,e),l=a.vec3f32.fromValues(0,.5,0),i=a.vec3f32.create(),A=a.vec3f32.create(),f=a.vec3f32.create(),y=a.vec3f32.create(),V=a.vec3f32.create();r.vec3.subtract(i,n,l),r.vec3.subtract(A,n,o),r.vec3.cross(f,i,A),r.vec3.normalize(f,f),r.vec3.subtract(i,o,l),r.vec3.subtract(A,o,s),r.vec3.cross(y,i,A),r.vec3.normalize(y,y),r.vec3.subtract(i,s,l),r.vec3.subtract(A,s,n),r.vec3.cross(V,i,A),r.vec3.normalize(V,V);var d=[n,o,s,l],u=[0,-1,0,f[0],f[1],f[2],y[0],y[1],y[2],V[0],V[1],V[2]],m=[0,1,2,3,1,0,3,2,1,3,0,2],O=[0,0,0,1,1,1,2,2,2,3,3,3];t.createGeometry=function(t){Array.isArray(t)||(t=[t,t,t]);for(var e=new Float32Array(12),r=0;r<4;r++)e[3*r]=d[r][0]*t[0],e[3*r+1]=d[r][1]*t[1],e[3*r+2]=d[r][2]*t[2];var a={};a[v.VertexAttrConstants.POSITION]=new Uint32Array(m),a[v.VertexAttrConstants.NORMAL]=new Uint32Array(O);var n={};return n[v.VertexAttrConstants.POSITION]={size:3,data:e},n[v.VertexAttrConstants.NORMAL]={size:3,data:new Float32Array(u)},new c.GeometryData(n,a)}}(A||(A={})),function(t){function e(t,e,a,n,o){return!(Math.abs(r.vec3.dot(e,t))>o)&&(r.vec3.cross(a,t,e),r.vec3.normalize(a,a),r.vec3.cross(n,a,t),r.vec3.normalize(n,n),!0)}function f(t,r,a,n,o,s,c){return e(t,r,o,s,c)||e(t,a,o,s,c)||e(t,n,o,s,c)}t.createBoxGeometry=l.createGeometry,t.createDiamondGeometry=i.createGeometry,t.createTetrahedronGeometry=A.createGeometry,t.createSphereGeometry=function(t,e,r,a,n,o,s){t=t||50,a=void 0!==a?a:-Math.PI,n=void 0!==n?n:2*Math.PI,o=void 0!==o?o:.5*-Math.PI,s=void 0!==s?s:Math.PI;for(var l=Math.max(3,Math.floor(e)||8),i=Math.max(2,Math.floor(r)||6),A=(l+1)*(i+1),f=new Float32Array(3*A),y=new Float32Array(3*A),V=new Float32Array(2*A),d=[],u=0,m=0;m<=i;m++){for(var O=[],h=m/i,x=o+h*s,C=Math.cos(x),w=0;w<=l;w++){var I=w/l,g=a+I*n,M=Math.cos(g)*C,z=Math.sin(x),N=-Math.sin(g)*C;f[3*u]=M*t,f[3*u+1]=z*t,f[3*u+2]=N*t,y[3*u]=M,y[3*u+1]=z,y[3*u+2]=N,V[2*u]=I,V[2*u+1]=h,O.push(u),++u}d.push(O)}var P=new Uint32Array(2*l*(i-1)*3);for(u=0,m=0;m<i;m++)for(w=0;w<l;w++){var U=d[m][w],G=d[m][w+1],F=d[m+1][w+1],S=d[m+1][w];0===m?(P[u++]=U,P[u++]=F,P[u++]=S):m===i-1?(P[u++]=U,P[u++]=G,P[u++]=F):(P[u++]=U,P[u++]=G,P[u++]=F,P[u++]=F,P[u++]=S,P[u++]=U)}v.assert(u===P.length);var p={};p[v.VertexAttrConstants.POSITION]=P,p[v.VertexAttrConstants.NORMAL]=P,p[v.VertexAttrConstants.UV0]=P;var T={};return T[v.VertexAttrConstants.POSITION]={size:3,data:f},T[v.VertexAttrConstants.NORMAL]={size:3,data:y},T[v.VertexAttrConstants.UV0]={size:2,data:V},new c.GeometryData(T,p)},t.createPolySphereGeometry=function(t,e,r){var a,n,o=t;if(r)a=[0,-1,0,1,0,0,0,0,1,-1,0,0,0,0,-1,0,1,0],n=new Uint32Array([0,1,2,0,2,3,0,3,4,0,4,1,1,5,2,2,5,3,3,5,4,4,5,1]);else{var s=o*(1+Math.sqrt(5))/2;a=[-o,s,0,o,s,0,-o,-s,0,o,-s,0,0,-o,s,0,o,s,0,-o,-s,0,o,-s,s,0,-o,s,0,o,-s,0,-o,-s,0,o],n=new Uint32Array([0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1])}for(var l=0;l<a.length;l+=3)y.scale(a,l,t/y.length(a,l));var i={};function A(e,r){var n;e>r&&(e=(n=[r,e])[0],r=n[1]);var o=e.toString()+"."+r.toString();if(i[o])return i[o];var s=a.length;return a.length+=3,y.add(a,3*e,a,3*r,a,s),y.scale(a,s,t/y.length(a,s)),s/=3,i[o]=s,s}for(l=0;l<e;l++){for(var f=n.length,V=new Uint32Array(4*f),d=0;d<f;d+=3){var u=n[d],m=n[d+1],O=n[d+2],h=A(u,m),x=A(m,O),C=A(O,u),w=4*d;V[w]=u,V[w+1]=h,V[w+2]=C,V[w+3]=m,V[w+4]=x,V[w+5]=h,V[w+6]=O,V[w+7]=C,V[w+8]=x,V[w+9]=h,V[w+10]=x,V[w+11]=C}n=V,i={}}var I=new Float32Array(a);for(l=0;l<I.length;l+=3)y.normalize(I,l);var g={};g[v.VertexAttrConstants.POSITION]=n,g[v.VertexAttrConstants.NORMAL]=n;var M={};return M[v.VertexAttrConstants.POSITION]={size:3,data:new Float32Array(a)},M[v.VertexAttrConstants.NORMAL]={size:3,data:I},new c.GeometryData(M,g)},t.createPointGeometry=function(t,e,r,a,n,o,s,l){var i=e?new Float64Array([e[0],e[1],e[2]]):new Float32Array([0,0,0]),A=t?new Float32Array([t[0],t[1],t[2]]):new Float32Array([0,0,1]),f=o?new Float32Array(o):new Float32Array([0,0]),y=r?new Uint8Array([255*r[0],255*r[1],255*r[2],r.length>3?255*r[3]:255]):new Uint8Array([255,255,255,255]),V=null!=a&&2===a.length?new Float32Array(a):new Float32Array([1,1]),d={};if(d[v.VertexAttrConstants.POSITION]={size:3,data:i},d[v.VertexAttrConstants.NORMAL]={size:3,data:A},d[v.VertexAttrConstants.UV0]={size:f.length,data:f},d[v.VertexAttrConstants.COLOR]={size:4,data:y},d[v.VertexAttrConstants.SIZE]={size:2,data:V},null!=n){var u=new Float32Array([n[0],n[1],n[2],n[3]]);d[v.VertexAttrConstants.AUXPOS1]={size:4,data:u}}if(null!=s){var m=new Float32Array([s[0],s[1],s[2],s[3]]);d[v.VertexAttrConstants.AUXPOS2]={size:4,data:m}}return null!=l?(c.GeometryData.call(l,d,c.GeometryData.DefaultIndices,c.GeometryData.DefaultOffsets,"point"),l):new c.GeometryData(d,c.GeometryData.DefaultIndices,c.GeometryData.DefaultOffsets,"point")},t.updatePointGeometry=function(t,e,r,a,n,o,s,c){var l,i=c.vertexAttributes;return null!=t&&((l=i[v.VertexAttrConstants.NORMAL].data)[0]=t[0],l[1]=t[1],l[2]=t[2]),null!=e&&((l=i[v.VertexAttrConstants.POSITION].data)[0]=e[0],l[1]=e[1],l[2]=e[2]),null!=r&&((l=i[v.VertexAttrConstants.COLOR].data)[0]=r[0],l[1]=r[1],l[2]=r[2],l[3]=r[3]),null!=a&&((l=i[v.VertexAttrConstants.SIZE].data)[0]=a[0],l[1]=a[1]),null!=n&&((l=i[v.VertexAttrConstants.AUXPOS1].data)[0]=n[0],l[1]=n[1],l[2]=n[2],l[3]=n[3]),null!=o&&((l=i[v.VertexAttrConstants.UV0].data)[0]=o[0],l[1]=o[1]),null!=s&&((l=i[v.VertexAttrConstants.AUXPOS2].data)[0]=s[0],l[1]=s[1],l[2]=s[2],l[3]=s[3]),c},t.createPointArrayGeometry=function(t,e){for(var r=new Float32Array(3*t.length),a=new Float32Array(e?3*t.length:3),n=new Uint32Array(t.length),o=new Uint32Array(t.length),s=0;s<t.length;s++)r[3*s]=t[s][0],r[3*s+1]=t[s][1],r[3*s+2]=t[s][2],e&&(a[3*s]=e[s][0],a[3*s+1]=e[s][1],a[3*s+2]=e[s][2]),n[s]=s,o[s]=0;e||(a[0]=0,a[1]=1,a[2]=0);var l=new Float32Array(2);l[0]=0,l[1]=0;var i={};i[v.VertexAttrConstants.POSITION]=n,i[v.VertexAttrConstants.NORMAL]=e?n:o,i[v.VertexAttrConstants.UV0]=o;var A={};return A[v.VertexAttrConstants.POSITION]={size:3,data:r},A[v.VertexAttrConstants.NORMAL]={size:3,data:a},A[v.VertexAttrConstants.UV0]={size:2,data:l},new c.GeometryData(A,i,c.GeometryData.DefaultOffsets,"point")},t.createTriangleGeometry=function(){var t=new Float32Array([0,0,0,0,0,100,100,0,0]),e=new Uint32Array([0,1,2]),r=new Float32Array([0,1,0]),a=new Uint32Array([0,0,0]),n=new Float32Array([0,0]),o=new Uint32Array([0,0,0]),s={};s[v.VertexAttrConstants.POSITION]=e,s[v.VertexAttrConstants.NORMAL]=a,s[v.VertexAttrConstants.UV0]=o;var l={};return l[v.VertexAttrConstants.POSITION]={size:3,data:t},l[v.VertexAttrConstants.NORMAL]={size:3,data:r},l[v.VertexAttrConstants.UV0]={size:2,data:n},new c.GeometryData(l,s)},t.createSquareGeometry=function(t){var e=new Float32Array(12);if(t)for(var r=0;r<4;r++)for(var a=0;a<3;a++)e[3*r+a]=t[r][a];else e[0]=-1,e[1]=-1,e[2]=0,e[3]=1,e[4]=-1,e[5]=0,e[6]=1,e[7]=1,e[8]=0,e[9]=-1,e[10]=1,e[11]=0;var n=new Uint32Array([0,1,2,2,3,0]),o=new Float32Array([0,0,1]),s=new Uint32Array([0,0,0,0,0,0]),l=new Float32Array([0,0,1,0,1,1,0,1]),i=new Uint8Array([255,255,255,255]),A={};A[v.VertexAttrConstants.POSITION]=n,A[v.VertexAttrConstants.NORMAL]=s,A[v.VertexAttrConstants.UV0]=n,A[v.VertexAttrConstants.COLOR]=s;var f={};return f[v.VertexAttrConstants.POSITION]={size:3,data:e},f[v.VertexAttrConstants.NORMAL]={size:3,data:o},f[v.VertexAttrConstants.UV0]={size:2,data:l},f[v.VertexAttrConstants.COLOR]={size:4,data:i},new c.GeometryData(f,A)},t.createConeGeometry=function(t,e,r,n,o,s){void 0===o&&(o=!0),void 0===s&&(s=!0);var l=0,i=e,A=t,f=a.vec3f32.fromValues(0,l,0),y=a.vec3f32.fromValues(0,l+A,0),V=a.vec3f32.fromValues(0,-1,0),d=a.vec3f32.fromValues(0,1,0);n&&(l=A,y=a.vec3f32.fromValues(0,0,0),f=a.vec3f32.fromValues(0,l,0),V=a.vec3f32.fromValues(0,1,0),d=a.vec3f32.fromValues(0,-1,0));var u=[y,f],m=[V,d],O=r+2,h=Math.sqrt(A*A+i*i);if(n)for(x=r-1;x>=0;x--){C=x*(2*Math.PI/r),w=a.vec3f32.fromValues(Math.cos(C)*i,l,Math.sin(C)*i);u.push(w);I=a.vec3f32.fromValues(A*Math.cos(C)/h,-i/h,A*Math.sin(C)/h);m.push(I)}else for(var x=0;x<r;x++){var C=x*(2*Math.PI/r),w=a.vec3f32.fromValues(Math.cos(C)*i,l,Math.sin(C)*i);u.push(w);var I=a.vec3f32.fromValues(A*Math.cos(C)/h,i/h,A*Math.sin(C)/h);m.push(I)}var g=new Uint32Array(2*(r+2)*3),M=new Uint32Array(2*(r+2)*3),z=0,N=0;if(o){for(x=3;x<u.length;x++)g[z++]=1,g[z++]=x-1,g[z++]=x,M[N++]=0,M[N++]=0,M[N++]=0;g[z++]=u.length-1,g[z++]=2,g[z++]=1,M[N++]=0,M[N++]=0,M[N++]=0}if(s){for(x=3;x<u.length;x++)g[z++]=x,g[z++]=x-1,g[z++]=0,M[N++]=x,M[N++]=x-1,M[N++]=1;g[z++]=0,g[z++]=2,g[z++]=u.length-1,M[N++]=1,M[N++]=2,M[N++]=m.length-1}var P=new Float32Array(3*O);for(x=0;x<O;x++)P[3*x]=u[x][0],P[3*x+1]=u[x][1],P[3*x+2]=u[x][2];var U=new Float32Array(3*O);for(x=0;x<O;x++)U[3*x]=m[x][0],U[3*x+1]=m[x][1],U[3*x+2]=m[x][2];var G={};G[v.VertexAttrConstants.POSITION]=g,G[v.VertexAttrConstants.NORMAL]=M;var F={};return F[v.VertexAttrConstants.POSITION]={size:3,data:P},F[v.VertexAttrConstants.NORMAL]={size:3,data:U},new c.GeometryData(F,G)},t.createCylinderGeometry=function(t,e,n,o,s,l){var i=o?a.vec3f32.clone(o):a.vec3f32.fromValues(1,0,0),A=s?a.vec3f32.clone(s):a.vec3f32.fromValues(0,0,0),f=void 0===l||l,y=a.vec3f32.create();r.vec3.normalize(y,i);var V=a.vec3f32.create();r.vec3.scale(V,y,Math.abs(t));var d=a.vec3f32.create();r.vec3.scale(d,V,-.5),r.vec3.add(d,d,A);var u=a.vec3f32.fromValues(0,1,0);Math.abs(1-r.vec3.dot(y,u))<.2&&r.vec3.set(u,0,0,1);var m=a.vec3f32.create();r.vec3.cross(m,y,u),r.vec3.normalize(m,m),r.vec3.cross(u,m,y);var O=2*n+(f?2:0),h=n+(f?2:0),x=new Float32Array(3*O),C=new Float32Array(3*h),w=new Float32Array(2*O),I=new Uint32Array(3*n*(f?4:2)),g=new Uint32Array(3*n*(f?4:2));f&&(x[3*(O-2)+0]=d[0],x[3*(O-2)+1]=d[1],x[3*(O-2)+2]=d[2],w[2*(O-2)]=0,w[2*(O-2)+1]=0,x[3*(O-1)+0]=x[3*(O-2)+0]+V[0],x[3*(O-1)+1]=x[3*(O-2)+1]+V[1],x[3*(O-1)+2]=x[3*(O-2)+2]+V[2],w[2*(O-1)]=1,w[2*(O-1)+1]=1,C[3*(h-2)+0]=-y[0],C[3*(h-2)+1]=-y[1],C[3*(h-2)+2]=-y[2],C[3*(h-1)+0]=y[0],C[3*(h-1)+1]=y[1],C[3*(h-1)+2]=y[2]);for(var M=function(t,e,r){I[t]=e,g[t]=r},z=0,N=a.vec3f32.create(),P=a.vec3f32.create(),U=0;U<n;U++){var G=U*(2*Math.PI/n);r.vec3.scale(N,u,Math.sin(G)),r.vec3.scale(P,m,Math.cos(G)),r.vec3.add(N,N,P),C[3*U+0]=N[0],C[3*U+1]=N[1],C[3*U+2]=N[2],r.vec3.scale(N,N,e),r.vec3.add(N,N,d),x[3*U+0]=N[0],x[3*U+1]=N[1],x[3*U+2]=N[2],w[2*U+0]=U/n,w[2*U+1]=0,x[3*(U+n)+0]=x[3*U+0]+V[0],x[3*(U+n)+1]=x[3*U+1]+V[1],x[3*(U+n)+2]=x[3*U+2]+V[2],w[2*(U+n)+0]=U/n,w[2*U+1]=1;var F=(U+1)%n;M(z++,U,U),M(z++,U+n,U),M(z++,F,F),M(z++,F,F),M(z++,U+n,U),M(z++,F+n,F)}if(f){for(U=0;U<n;U++){F=(U+1)%n;M(z++,O-2,h-2),M(z++,U,h-2),M(z++,F,h-2)}for(U=0;U<n;U++){F=(U+1)%n;M(z++,U+n,h-1),M(z++,O-1,h-1),M(z++,F+n,h-1)}}var S={};S[v.VertexAttrConstants.POSITION]=I,S[v.VertexAttrConstants.NORMAL]=g,S[v.VertexAttrConstants.UV0]=I;var p={};return p[v.VertexAttrConstants.POSITION]={size:3,data:x},p[v.VertexAttrConstants.NORMAL]={size:3,data:C},p[v.VertexAttrConstants.UV0]={size:2,data:w},new c.GeometryData(p,S)},t.createTubeGeometry=function(e,r,a,n,o){a=a||10,n=null==n||n,v.assert(e.length>1);for(var s=[],c=[],l=0;l<a;l++){s.push([0,-l-1,-(l+1)%a-1]);var i=l/a*2*Math.PI;c.push([Math.cos(i)*r,Math.sin(i)*r])}return t.createPathExtrusionGeometry(c,e,[[0,0,0]],s,n,o)},t.createPathExtrusionGeometry=function(t,e,s,l,i,A){void 0===A&&(A=a.vec3f32.fromValues(0,0,0));var y=t.length,d=new Float32Array(e.length*y*3+(6*s.length||0)),u=new Float32Array(e.length*y+(2*s.length||0)),m=new Float32Array(e.length*y*3+(s?6:0)),O=(e.length-1)*y*6+3*l.length*2,h=new Uint32Array(O),x=new Uint32Array(O),C=0,w=0,I=0,g=0,M=0,z=a.vec3f32.create(),N=a.vec3f32.create(),P=a.vec3f32.create(),U=a.vec3f32.create(),G=a.vec3f32.create(),F=a.vec3f32.create(),S=a.vec3f32.create(),p=n.vec3f64.create(),T=a.vec3f32.create(),R=a.vec3f32.create(),L=a.vec3f32.create(),D=a.vec3f32.create(),b=a.vec3f32.create(),E=o.plane.create();r.vec3.set(T,0,1,0),r.vec3.subtract(N,e[1],e[0]),r.vec3.normalize(N,N),i?(r.vec3.add(p,e[0],A),r.vec3.normalize(P,p)):r.vec3.set(P,0,0,1),f(N,P,T,T,G,P,V),r.vec3.copy(U,P),r.vec3.copy(D,G);for(var q=0;q<s.length;q++)r.vec3.scale(F,G,s[q][0]),r.vec3.scale(p,P,s[q][2]),r.vec3.add(F,F,p),r.vec3.add(F,F,e[0]),d[C++]=F[0],d[C++]=F[1],d[C++]=F[2],u[I++]=0;for(m[w++]=-N[0],m[w++]=-N[1],m[w++]=-N[2],q=0;q<l.length;q++)h[g++]=l[q][0]>0?l[q][0]:-l[q][0]-1+s.length,h[g++]=l[q][1]>0?l[q][1]:-l[q][1]-1+s.length,h[g++]=l[q][2]>0?l[q][2]:-l[q][2]-1+s.length,x[M++]=0,x[M++]=0,x[M++]=0;for(var B=s.length,X=s.length-1,k=0;k<e.length;k++){var Z=!1;if(k>0)r.vec3.copy(z,N),k<e.length-1?(r.vec3.subtract(N,e[k+1],e[k]),r.vec3.normalize(N,N)):Z=!0,r.vec3.add(R,z,N),r.vec3.normalize(R,R),r.vec3.add(L,e[k-1],U),o.plane.fromPositionAndNormal(e[k],R,E),o.plane.intersectRay(E,o.ray.wrap(L,z),p)?(r.vec3.subtract(p,p,e[k]),r.vec3.normalize(P,p),r.vec3.cross(G,R,P),r.vec3.normalize(G,G)):f(R,U,D,T,G,P,V),r.vec3.copy(U,P),r.vec3.copy(D,G);i&&(r.vec3.add(p,e[k],A),r.vec3.normalize(b,p));for(var j=0;j<y;j++)if(r.vec3.scale(F,G,t[j][0]),r.vec3.scale(p,P,t[j][1]),r.vec3.add(F,F,p),r.vec3.normalize(S,F),m[w++]=S[0],m[w++]=S[1],m[w++]=S[2],u[I++]=i?r.vec3.dot(F,b):F[2],r.vec3.add(F,F,e[k]),d[C++]=F[0],d[C++]=F[1],d[C++]=F[2],!Z){var H=(j+1)%y;h[g++]=B+j,h[g++]=B+y+j,h[g++]=B+H,h[g++]=B+H,h[g++]=B+y+j,h[g++]=B+y+H;for(var J=0;J<6;J++)x[M++]=h[g-6+J]-X}B+=y}var K=e[e.length-1];for(q=0;q<s.length;q++)r.vec3.scale(F,G,s[q][0]),r.vec3.scale(p,P,s[q][1]),r.vec3.add(F,F,p),r.vec3.add(F,F,K),d[C++]=F[0],d[C++]=F[1],d[C++]=F[2],u[I++]=0;var Q=w/3;m[w++]=N[0],m[w++]=N[1],m[w++]=N[2];var W=B-y;for(q=0;q<l.length;q++)h[g++]=l[q][0]>=0?B+l[q][0]:-l[q][0]-1+W,h[g++]=l[q][2]>=0?B+l[q][2]:-l[q][2]-1+W,h[g++]=l[q][1]>=0?B+l[q][1]:-l[q][1]-1+W,x[M++]=Q,x[M++]=Q,x[M++]=Q;var Y={};Y[v.VertexAttrConstants.POSITION]=h,Y[v.VertexAttrConstants.NORMAL]=x;var $={};return $[v.VertexAttrConstants.POSITION]={size:3,data:d},$.zOffset={size:1,data:u},$[v.VertexAttrConstants.NORMAL]={size:3,data:m},new c.GeometryData($,Y)},t.createPolylineGeometry=function(t,e){v.assert(t.length>1,"createPolylineGeometry(): polyline needs at least 2 points"),v.assert(3===t[0].length,"createPolylineGeometry(): malformed vertex"),v.assert(void 0===e||e.length===t.length,"createPolylineGeometry: need same number of points and normals"),v.assert(void 0===e||3===e[0].length,"createPolylineGeometry(): malformed normal");for(var r=new Float64Array(3*t.length),a=new Uint32Array(2*(t.length-1)),n=0,o=0,s=0;s<t.length;s++){for(var l=0;l<3;l++)r[n++]=t[s][l];s>0&&(a[o++]=s-1,a[o++]=s)}var i={},A={};if(i[v.VertexAttrConstants.POSITION]=a,A[v.VertexAttrConstants.POSITION]={size:3,data:r},e){var f=new Float32Array(3*e.length),y=0;for(s=0;s<t.length;s++)for(l=0;l<3;l++)f[y++]=e[s][l];i[v.VertexAttrConstants.NORMAL]=a,A[v.VertexAttrConstants.NORMAL]={size:3,data:f}}return new c.GeometryData(A,i,c.GeometryData.DefaultOffsets,"line")},t.createExtrudedTriangle=function(t,e,r,a){for(var n,o,s=new Float32Array(18),l=[[-e,0,a/2],[r,0,a/2],[0,t,a/2],[-e,0,-a/2],[r,0,-a/2],[0,t,-a/2]],i=0;i<6;i++)s[3*i]=l[i][0],s[3*i+1]=l[i][1],s[3*i+2]=l[i][2];var A=((n={})[v.VertexAttrConstants.POSITION]=new Uint32Array([0,1,2,3,0,2,2,5,3,1,4,5,5,2,1,1,0,3,3,4,1,4,3,5]),n),f=((o={})[v.VertexAttrConstants.POSITION]={size:3,data:s},o);return new c.GeometryData(f,A)},t.transformInPlace=function(t,e){for(var a=t.vertexAttributes[v.VertexAttrConstants.POSITION].data,n=0;n<a.length;n+=3){var o=a[n],s=a[n+1],c=a[n+2];r.vec3.set(d,o,s,c),r.vec3.transformMat4(d,d,e),a[n]=d[0],a[n+1]=d[1],a[n+2]=d[2]}},t.addVertexColors=function(t,e){var r=e||[1,1,1,1],a=new Uint8Array(4);a[0]=255*r[0],a[1]=255*r[1],a[2]=255*r[2],a[3]=255*(r.length>3?r[3]:1);var n={},o=t.getVertexAttr();for(var s in o)n[s]=o[s];n[v.VertexAttrConstants.COLOR]={size:4,data:a};var l={};for(var s in t.indices)l[s]=t.indices[s];var i=l[v.VertexAttrConstants.POSITION].length;return l[v.VertexAttrConstants.COLOR]=new Uint32Array(i),t=new c.GeometryData(n,l,t.componentOffsets,t.primitiveType)},t.addNormals=function(t){for(var e=t.getVertexAttr(),a=t.indices,n=s.Vec3Compact.subtract,o=a.position.length/3,c=new Float32Array(3*o),l=e.position.data,i=0,A=a.position,f=new Uint32Array(A.length),y=0;y<A.length;y+=3){n(l,3*A[y],l,3*A[y+2],u,0),n(l,3*A[y],l,3*A[y+1],d,0),r.vec3.cross(d,d,u),r.vec3.normalize(d,d);var V=i/3;c[i++]=d[0],c[i++]=d[1],c[i++]=d[2],f[y]=V,f[y+1]=V,f[y+2]=V}e[v.VertexAttrConstants.NORMAL]={size:3,data:c,offsetIdx:0,strideIdx:3},a[v.VertexAttrConstants.NORMAL]=f},t.cgToGIS=function(t,e){void 0===e&&(e=t);var r=t.getVertexAttr(),a=r.position.data,n=r.normal.data,o=e.getVertexAttr(),s=o.position.data,c=o.normal.data;if(n)for(var v=0;v<n.length;v+=3){var l=n[v+1];c[v+1]=-n[v+2],c[v+2]=l}if(a)for(v=0;v<a.length;v+=3){l=a[v+1];s[v+1]=-a[v+2],s[v+2]=l}return e},t.makeOrthoBasisDirUp=e,t.makeOrthoBasisDirUpFallback=f}(f||(f={}));var V=.99619469809,d=a.vec3f32.create(),u=a.vec3f32.create();return f}));