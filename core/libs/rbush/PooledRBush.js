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

define(["require","exports","../../tsSupport/extendsHelper","../../arrayUtils","../../PooledArray","../quickselect/quickselect"],(function(t,i,n,e,r,a){Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function t(t,i){void 0===t&&(t=9),this.compareMinX=c,this.compareMinY=u,this.toBBox=function(t){return t},this._maxEntries=Math.max(4,t||9),this._minEntries=Math.max(2,Math.ceil(.4*this._maxEntries)),i&&("function"==typeof i?this.toBBox=i:this._initFormat(i)),this.clear()}return t.prototype.destroy=function(){this.clear(),v.prune(),M.prune(),B.prune(),X.prune()},t.prototype.all=function(t){this._all(this.data,t)},t.prototype.search=function(t,i){var n=this.data,e=this.toBBox;if(d(t,n))for(v.clear();n;){for(var r=0,a=n.children.length;r<a;r++){var o=n.children[r],h=n.leaf?e(o):o;d(t,h)&&(n.leaf?i(o):p(t,h)?this._all(o,i):v.push(o))}n=v.pop()}},t.prototype.collides=function(t){var i=this.data,n=this.toBBox;if(!d(t,i))return!1;for(v.clear();i;){for(var e=0,r=i.children.length;e<r;e++){var a=i.children[e],o=i.leaf?n(a):a;if(d(t,o)){if(i.leaf||p(t,o))return!0;v.push(a)}}i=v.pop()}return!1},t.prototype.load=function(t,i){if(void 0===i&&(i=t.length),!i)return this;if(i<this._minEntries){for(var n=0,e=i;n<e;n++)this.insert(t[n]);return this}var r=this._build(t.slice(0,i),0,i-1,0);if(this.data.children.length)if(this.data.height===r.height)this._splitRoot(this.data,r);else{if(this.data.height<r.height){var a=this.data;this.data=r,r=a}this._insert(r,this.data.height-r.height-1,!0)}else this.data=r;return this},t.prototype.insert=function(t){return t&&this._insert(t,this.data.height-1),this},t.prototype.clear=function(){return this.data=new g([]),this},t.prototype.remove=function(t){if(!t)return this;var i,n,r,a,o=this.data,h=this.toBBox(t);for(B.clear(),X.clear();o||B.length;){if(o||(o=B.pop(),i=B.data[B.length-1],n=X.pop(),r=!0),o.leaf&&-1!==(a=e.indexOf(o.children,t,o.children.length,o.indexHint)))return o.children.splice(a,1),B.push(o),this._condense(B),this;r||o.leaf||!p(o,h)?i?(n++,o=i.children[n],r=!1):o=null:(B.push(o),X.push(n),n=0,i=o,o=o.children[0])}return this},t.prototype.toJSON=function(){return this.data},t.prototype.fromJSON=function(t){return this.data=t,this},t.prototype._all=function(t,i){for(M.clear();t;){if(!0===t.leaf)for(var n=0,e=t.children;n<e.length;n++){i(e[n])}else M.pushArray(t.children);t=M.pop()}},t.prototype._build=function(t,i,n,e){var r=n-i+1,a=this._maxEntries;if(r<=a){var o=new g(t.slice(i,n+1));return h(o,this.toBBox),o}e||(e=Math.ceil(Math.log(r)/Math.log(a)),a=Math.ceil(r/Math.pow(a,e-1)));var s=new y([]);s.height=e;var l=Math.ceil(r/a),c=l*Math.ceil(Math.sqrt(a));x(t,i,n,c,this.compareMinX);for(var u=i;u<=n;u+=c){var m=Math.min(u+c-1,n);x(t,u,m,l,this.compareMinY);for(var f=u;f<=m;f+=l){var p=Math.min(f+l-1,m);s.children.push(this._build(t,f,p,e-1))}}return h(s,this.toBBox),s},t.prototype._chooseSubtree=function(t,i,n,e){for(;e.push(i),!0!==i.leaf&&e.length-1!==n;){for(var r=1/0,a=1/0,o=void 0,h=0,s=i.children.length;h<s;h++){var l=i.children[h],c=m(l),u=(f=t,p=l,(Math.max(p.maxX,f.maxX)-Math.min(p.minX,f.minX))*(Math.max(p.maxY,f.maxY)-Math.min(p.minY,f.minY))-c);u<a?(a=u,r=c<r?c:r,o=l):u===a&&c<r&&(r=c,o=l)}i=o||i.children[0]}var f,p;return i},t.prototype._insert=function(t,i,n){var e=this.toBBox,r=n?t:e(t);B.clear();var a=this._chooseSubtree(r,this.data,i,B);for(a.children.push(t),l(a,r);i>=0&&B.data[i].children.length>this._maxEntries;)this._split(B,i),i--;this._adjustParentBBoxes(r,B,i)},t.prototype._split=function(t,i){var n=t.data[i],e=n.children.length,r=this._minEntries;this._chooseSplitAxis(n,r,e);var a=this._chooseSplitIndex(n,r,e),o=n.children.splice(a,n.children.length-a),s=n.leaf?new g(o):new y(o);s.height=n.height,h(n,this.toBBox),h(s,this.toBBox),i?t.data[i-1].children.push(s):this._splitRoot(n,s)},t.prototype._splitRoot=function(t,i){this.data=new y([t,i]),this.data.height=t.height+1,h(this.data,this.toBBox)},t.prototype._chooseSplitIndex=function(t,i,n){var e,r,a,o,h,l,c,u,f;e=r=1/0;for(var p=i;p<=n-i;p++){var d=s(t,0,p,this.toBBox),x=s(t,p,n,this.toBBox),v=(o=d,h=x,l=void 0,c=void 0,u=void 0,f=void 0,l=Math.max(o.minX,h.minX),c=Math.max(o.minY,h.minY),u=Math.min(o.maxX,h.maxX),f=Math.min(o.maxY,h.maxY),Math.max(0,u-l)*Math.max(0,f-c)),M=m(d)+m(x);v<e?(e=v,a=p,r=M<r?M:r):v===e&&M<r&&(r=M,a=p)}return a},t.prototype._chooseSplitAxis=function(t,i,n){var e=t.leaf?this.compareMinX:c,r=t.leaf?this.compareMinY:u;this._allDistMargin(t,i,n,e)<this._allDistMargin(t,i,n,r)&&t.children.sort(e)},t.prototype._allDistMargin=function(t,i,n,e){t.children.sort(e);for(var r=this.toBBox,a=s(t,0,i,r),o=s(t,n-i,n,r),h=f(a)+f(o),c=i;c<n-i;c++){var u=t.children[c];l(a,t.leaf?r(u):u),h+=f(a)}for(c=n-i-1;c>=i;c--){u=t.children[c];l(o,t.leaf?r(u):u),h+=f(o)}return h},t.prototype._adjustParentBBoxes=function(t,i,n){for(var e=n;e>=0;e--)l(i.data[e],t)},t.prototype._condense=function(t){for(var i=t.length-1;i>=0;i--){var n=t.data[i];if(0===n.children.length)if(i>0){var r=t.data[i-1],a=r.children;a.splice(e.indexOf(a,n,a.length,r.indexHint),1)}else this.clear();else h(n,this.toBBox)}},t.prototype._initFormat=function(t){var i=["return a"," - b",";"];this.compareMinX=new Function("a","b",i.join(t[0])),this.compareMinY=new Function("a","b",i.join(t[1])),this.toBBox=new Function("a","return {minX: a"+t[0]+", minY: a"+t[1]+", maxX: a"+t[2]+", maxY: a"+t[3]+"};")},t}();function h(t,i){s(t,0,t.children.length,i,t)}function s(t,i,n,e,r){r||(r=new g(null)),r.minX=1/0,r.minY=1/0,r.maxX=-1/0,r.maxY=-1/0;for(var a=i,o=void 0;a<n;a++)o=t.children[a],l(r,t.leaf?e(o):o);return r}function l(t,i){t.minX=Math.min(t.minX,i.minX),t.minY=Math.min(t.minY,i.minY),t.maxX=Math.max(t.maxX,i.maxX),t.maxY=Math.max(t.maxY,i.maxY)}function c(t,i){return t.minX-i.minX}function u(t,i){return t.minY-i.minY}function m(t){return(t.maxX-t.minX)*(t.maxY-t.minY)}function f(t){return t.maxX-t.minX+(t.maxY-t.minY)}function p(t,i){return t.minX<=i.minX&&t.minY<=i.minY&&i.maxX<=t.maxX&&i.maxY<=t.maxY}function d(t,i){return i.minX<=t.maxX&&i.minY<=t.maxY&&i.maxX>=t.minX&&i.maxY>=t.minY}function x(t,i,n,e,r){for(var o=[i,n];o.length;)if(!((n=o.pop())-(i=o.pop())<=e)){var h=i+Math.ceil((n-i)/e/2)*e;a(t,h,i,n,r),o.push(i,h,h,n)}}i.PooledRBush=o;var v=new r,M=new r,B=new r,X=new r({deallocator:null}),Y=function(){this.minX=1/0,this.minY=1/0,this.maxX=-1/0,this.maxY=-1/0};i.BBox=Y;var _=function(t){function i(){var i=null!==t&&t.apply(this,arguments)||this;return i.height=1,i.indexHint=new e.PositionHint,i}return n(i,t),i}(Y),g=function(t){function i(i){var n=t.call(this)||this;return n.children=i,n.leaf=!0,n}return n(i,t),i}(_),y=function(t){function i(i){var n=t.call(this)||this;return n.children=i,n.leaf=!1,n}return n(i,t),i}(_);i.default=o}));