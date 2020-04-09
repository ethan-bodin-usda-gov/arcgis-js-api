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

define(["require","exports","../../../../core/Error"],(function(e,r,t){Object.defineProperty(r,"__esModule",{value:!0});var o=0,n=10,i=10,c=12,a=16;function d(e,r,t){return{identifier:String.fromCharCode.apply(null,new Uint8Array(e,t+o,n)),version:r.getUint16(t+i,!0),checksum:r.getUint32(t+c,!0)}}var l=0,u=4,w=8,s=16,f=24,h=32,g=40,p=48,U=56,v=64,y=72,M=80,m=84,z=88;function L(e,r,t){var o=[];r=B(e,r,o);for(var n=[],i=0;i<o.length;i++){n.length=0,r=B(e,r,n);for(var c=0;c<n.length;c++)t.push(n[c]+o[i])}return r}function B(e,r,o){var n=new DataView(e,r),i=n.getUint8(0),c=31&i,a=!!(32&i),d=(192&i)>>6,l=0;if(0===d)l=n.getUint32(1,!0),r+=5;else if(1===d)l=n.getUint16(1,!0),r+=3;else{if(2!==d)throw new t("lepcc-decode-error","Bad count type");l=n.getUint8(1),r+=2}if(a)throw new t("lepcc-decode-error","LUT not implemented");for(var u=Math.ceil(l*c/8),w=new Uint8Array(e,r,u),s=0,f=0,h=0,g=-1>>>32-c,p=0;p<l;p++){for(;f<c;)s|=w[h]<<f,f+=8,h+=1;o[p]=s&g,s>>>=c,(f-=c)+c>32&&(s|=w[h-1]>>8-f)}return r+h}r.decodeXYZ=function(e){var r=new DataView(e,0),o=0,n=d(e,r,o),i=n.identifier,c=n.version;if(o+=a,"LEPCC     "!==i)throw new t("lepcc-decode-error","Bad identifier");if(c>1)throw new t("lepcc-decode-error","Unknown version");var B=function(e,r){return{sizeLo:e.getUint32(r+l,!0),sizeHi:e.getUint32(r+u,!0),minX:e.getFloat64(r+w,!0),minY:e.getFloat64(r+s,!0),minZ:e.getFloat64(r+f,!0),maxX:e.getFloat64(r+h,!0),maxY:e.getFloat64(r+g,!0),maxZ:e.getFloat64(r+p,!0),errorX:e.getFloat64(r+U,!0),errorY:e.getFloat64(r+v,!0),errorZ:e.getFloat64(r+y,!0),count:e.getUint32(r+M,!0),reserved:e.getUint32(r+m,!0)}}(r,o);if(o+=z,B.sizeHi*Math.pow(2,32)+B.sizeLo!==e.byteLength)throw new t("lepcc-decode-error","Bad size");var b=new Float64Array(3*B.count),F=[],C=[],A=[],k=[];if(o=L(e,o,F),o=L(e,o,C),o=L(e,o,A),(o=L(e,o,k))!==e.byteLength)throw new t("lepcc-decode-error","Bad length");for(var X=0,Y=0,Z=0;Z<F.length;Z++){Y+=F[Z];for(var P=0,x=0;x<C[Z];x++){P+=A[X];var H=k[X];b[3*X]=Math.min(B.maxX,B.minX+2*B.errorX*P),b[3*X+1]=Math.min(B.maxY,B.minY+2*B.errorY*Y),b[3*X+2]=Math.min(B.maxZ,B.minZ+2*B.errorZ*H),X++}}return{errorX:B.errorX,errorY:B.errorY,errorZ:B.errorZ,result:b}};var b=0,F=4,C=8,A=12,k=14,X=15,Y=16;r.decodeRGB=function(e){var r=new DataView(e,0),o=0,n=d(e,r,o),i=n.identifier,c=n.version;if(o+=a,"ClusterRGB"!==i)throw new t("lepcc-decode-error","Bad identifier");if(c>1)throw new t("lepcc-decode-error","Unknown version");var l=function(e,r){return{sizeLo:e.getUint32(r+b,!0),sizeHi:e.getUint32(r+F,!0),count:e.getUint32(r+C,!0),colorMapCount:e.getUint16(r+A,!0),lookupMethod:e.getUint8(r+k),compressionMethod:e.getUint8(r+X)}}(r,o);if(o+=Y,l.sizeHi*Math.pow(2,32)+l.sizeLo!==e.byteLength)throw new t("lepcc-decode-error","Bad size");if((2===l.lookupMethod||1===l.lookupMethod)&&0===l.compressionMethod){if(3*l.colorMapCount+l.count+o!==e.byteLength||l.colorMapCount>256)throw new t("lepcc-decode-error","Bad count");for(var u=new Uint8Array(e,o,3*l.colorMapCount),w=new Uint8Array(e,o+3*l.colorMapCount,l.count),s=new Uint8Array(3*l.count),f=0;f<l.count;f++){var h=w[f];s[3*f]=u[3*h],s[3*f+1]=u[3*h+1],s[3*f+2]=u[3*h+2]}return s}if(0===l.lookupMethod&&0===l.compressionMethod){if(3*l.count+o!==e.byteLength||0!==l.colorMapCount)throw new t("lepcc-decode-error","Bad count");return new Uint8Array(e,o).slice()}if(l.lookupMethod<=2&&1===l.compressionMethod){if(o+3!==e.byteLength||1!==l.colorMapCount)throw new t("lepcc-decode-error","Bad count");var g=r.getUint8(o),p=r.getUint8(o+1),U=r.getUint8(o+2);for(s=new Uint8Array(3*l.count),f=0;f<l.count;f++)s[3*f]=g,s[3*f+1]=p,s[3*f+2]=U;return s}throw new t("lepcc-decode-error","Bad method "+l.lookupMethod+","+l.compressionMethod)};var Z=0,P=4,x=8,H=12,D=14,V=15,E=16;r.decodeIntensity=function(e){var r=new DataView(e,0),o=0,n=d(e,r,o),i=n.identifier,c=n.version;if(o+=a,"Intensity "!==i)throw new t("lepcc-decode-error","Bad identifier");if(c>1)throw new t("lepcc-decode-error","Unknown version");var l=function(e,r){return{sizeLo:e.getUint32(r+Z,!0),sizeHi:e.getUint32(r+P,!0),count:e.getUint32(r+x,!0),scaleFactor:e.getUint16(r+H,!0),bitsPerPoint:e.getUint8(r+D),reserved:e.getUint8(r+V)}}(r,o);if(o+=E,l.sizeHi*Math.pow(2,32)+l.sizeLo!==e.byteLength)throw new t("lepcc-decode-error","Bad size");var u=new Uint16Array(l.count);if(8===l.bitsPerPoint){if(l.count+o!==e.byteLength)throw new t("lepcc-decode-error","Bad size");for(var w=new Uint8Array(e,o,l.count),s=0;s<l.count;s++)u[s]=w[s]*l.scaleFactor}else if(16===l.bitsPerPoint){if(2*l.count+o!==e.byteLength)throw new t("lepcc-decode-error","Bad size");for(w=new Uint16Array(e,o,l.count),s=0;s<l.count;s++)u[s]=w[s]*l.scaleFactor}else{if(B(e,o,w=[])!==e.byteLength)throw new t("lepcc-decode-error","Bad size");for(s=0;s<l.count;s++)u[s]=w[s]*l.scaleFactor}return u}}));