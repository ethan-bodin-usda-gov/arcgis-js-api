// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../Dictionary","../Dictionary","../Feature","../featureSetCollection","../featureSetUtils","../languageUtils","../featureset/actions/AttributeFilter","../featureset/actions/OrderBy","../featureset/actions/Top","../featureset/sources/FeatureLayerMemory","../featureset/support/OrderbyClause","../../core/promiseUtils","../../core/sql/WhereClause","../../layers/FeatureLayer"],function(e,r,t,n,a,i,l,u,s,o,f,c,d,y,p,m){function h(e,r,t){var n=e.getVariables();if(n.length>0){for(var a=[],i=0;i<n.length;i++){var l={name:n[i]};a.push(r.evaluateIdentifier(t,l))}return y.all(a).then(function(r){for(var t={},a=0;a<n.length;a++)t[n[a]]=r[a];return e.parameters=t,e})}return y.resolve(e)}function g(e,r,t){void 0===t&&(t=null);for(var n in e)if(n.toLowerCase()===r.toLowerCase())return e[n];return t}function v(e){if(null===e)return null;var r={type:g(e,"type",""),name:g(e,"name","")};if("range"===r.type)r.range=g(e,"range",[]);else{r.codedValues=[];for(var t=0,n=g(e,"codedValues",[]);t<n.length;t++){var a=n[t];r.codedValues.push({name:g(a,"name",""),code:g(a,"code",null)})}}return r}function F(e){if(null===e)return null;var r={},t=g(e,"wkt",null);null!==t&&(r.wkt=t);var n=g(e,"wkid",null);return null!==n&&(r.wkid=n),r}function b(e){if(null===e)return null;var r={hasZ:g(e,"hasz",!1),hasM:g(e,"hasm",!1)},t=g(e,"spatialreference",null);t&&(r.spatialReference=F(t));var n=g(e,"x",null);if(null!==n)return r.x=n,r.y=g(e,"y",null),r;var a=g(e,"rings",null);if(null!==a)return r.rings=a,r;var i=g(e,"paths",null);if(null!==i)return r.paths=i,r;var l=g(e,"points",null);if(null!==l)return r.points=l,r;for(var u=0,s=["xmin","xmax","ymin","ymax","zmin","zmax","mmin","mmax"];u<s.length;u++){var o=s[u],f=g(e,o,null);null!==f&&(r[o]=f)}return r}function I(e,r){for(var t=0,n=r;t<n.length;t++){if(n[t]===e)return!0}return!1}function D(e){return!!e.layerDefinition&&(!!e.featureSet&&(!1!==I(e.layerDefinition.geometryType,["","esriGeometryPoint","esriGeometryPolyline","esriGeometryPolygon","esriGeometryMultipoint","esriGeometryEnvelope"])&&(null!==e.layerDefinition.objectIdField&&""!==e.layerDefinition.objectIdField&&(!1!==u.isArray(e.layerDefinition.fields)&&(!1!==u.isArray(e.featureSet.features)&&void 0)))))}function S(e){"async"===e.mode&&(e.functions.featuresetbyid=function(r,t){return e.standardFunctionAsync(r,t,function(e,r,t){if(u.pcCheck(t,2,4),t[0]instanceof i){var n=u.toString(t[1]),a=u.defaultUndefined(t[2],null),l=u.toBoolean(u.defaultUndefined(t[3],!0));if(null===a&&(a=["*"]),!1===u.isArray(a))throw new Error("Invalid Parameter");return t[0].featureSetById(n,l,a)}throw new Error("Invalid Parameter")})},e.signatures.push({name:"featuresetbyid",min:"2",max:"4"}),e.functions.featuresetbyportalitem=function(r,t){return e.standardFunctionAsync(r,t,function(e,t,n){u.pcCheck(n,2,4);var a=u.toString(n[0]),i=u.toString(n[1]),s=u.defaultUndefined(n[2],null),o=u.toBoolean(u.defaultUndefined(n[3],!0));if(null===s&&(s=["*"]),!1===u.isArray(s))throw new Error("Invalid Parameter");if(r.services&&r.services.portal)return l.constructFeatureSetFromPortalItem(a,i,r.spatialReference,s,o,r.services.portal,r.lrucache);throw new Error("Portal is required")})},e.signatures.push({name:"featuresetbyportalitem",min:"2",max:"4"}),e.functions.featuresetbyname=function(r,t){return e.standardFunctionAsync(r,t,function(e,r,t){if(u.pcCheck(t,2,4),t[0]instanceof i){var n=u.toString(t[1]),a=u.defaultUndefined(t[2],null),l=u.toBoolean(u.defaultUndefined(t[3],!0));if(null===a&&(a=["*"]),!1===u.isArray(a))throw new Error("Invalid Parameter");return t[0].featureSetByName(n,l,a)}throw new Error("Invalid Parameter")})},e.signatures.push({name:"featuresetbyname",min:"2",max:"4"}),e.functions.featureset=function(r,n){return e.standardFunction(r,n,function(e,n,a){u.pcCheck(a,1,1);var i=a[0],l={layerDefinition:{geometryType:"",objectIdField:"",typeIdField:"",fields:[]},featureSet:{geometryType:"",features:[]}};if(u.isString(i))i=JSON.parse(i),void 0!==i.layerDefinition?(l.layerDefinition=i.layerDefinition,l.featureSet=i.featureSet,i.layerDefinition.spatialReference&&(l.layerDefinition.spatialReference=i.layerDefinition.spatialReference)):(l.featureSet.features=i.features,l.featureSet.geometryType=i.geometryType,l.layerDefinition.geometryType=l.featureSet.geometryType,l.layerDefinition.objectIdField=i.objectIdFieldName,l.layerDefinition.typeIdField=i.typeIdFieldName,l.layerDefinition.fields=i.fields,i.spatialReference&&(l.layerDefinition.spatialReference=i.spatialReference));else{if(!(a[0]instanceof t))throw new Error("Invalid Parameter");i=JSON.parse(a[0].castToText());var s=g(i,"layerdefinition");if(null!==s){l.layerDefinition.geometryType=g(s,"geometrytype",""),l.featureSet.geometryType=l.layerDefinition.geometryType,l.layerDefinition.objectIdField=g(s,"objectidfield",""),l.layerDefinition.typeIdField=g(s,"typeidfield","");var o=g(s,"spatialreference",null);o&&(l.layerDefinition.spatialReference=F(o));for(var f=0,d=g(s,"fields",[]);f<d.length;f++){var y=d[f],p={name:g(y,"name",""),alias:g(y,"alias",""),type:g(y,"type",""),nullable:g(y,"nullable",!0),editable:g(y,"editable",!0),length:g(y,"length",null),domain:v(g(y,"domain"))};l.layerDefinition.fields.push(p)}var m=g(i,"featureset",null);if(m){for(var h={},I=0,S=l.layerDefinition.fields;I<S.length;I++){var w=S[I];h[w.name.toLowerCase()]=w.name}for(var x=0,A=g(m,"features",[]);x<A.length;x++){var C=A[x],T={},k=g(C,"attributes",{});for(var w in k)T[h[w.toLowerCase()]]=k[w];l.featureSet.features.push({attributes:T,geometry:b(g(C,"geometry",null))})}}}else{l.layerDefinition.geometryType=g(i,"geometrytype",""),l.featureSet.geometryType=l.layerDefinition.geometryType,l.layerDefinition.objectIdField=g(i,"objectidfieldname",""),l.layerDefinition.typeIdField=g(i,"typeidfieldname","");var o=g(i,"spatialreference",null);o&&(l.layerDefinition.spatialReference=F(o));for(var P=0,R=g(i,"fields",[]);P<R.length;P++){var y=R[P],p={name:g(y,"name",""),alias:g(y,"alias",""),type:g(y,"type",""),nullable:g(y,"nullable",!0),editable:g(y,"editable",!0),length:g(y,"length",null),domain:v(g(y,"domain"))};l.layerDefinition.fields.push(p)}for(var h={},B=0,G=l.layerDefinition.fields;B<G.length;B++){var w=G[B];h[w.name.toLowerCase()]=w.name}for(var j=0,z=g(i,"features",[]);j<z.length;j++){var C=z[j],T={},k=g(C,"attributes",{});for(var w in k)T[h[w.toLowerCase()]]=k[w];l.featureSet.features.push({attributes:T,geometry:b(g(C,"geometry",null))})}}}if(!1===D(l))throw new Error("Invalid Parameter");return c.create(l,r.spatialReference)})},e.signatures.push({name:"featureset",min:"1",max:"1"}),e.functions.filter=function(r,t){return e.standardFunctionAsync(r,t,function(t,n,a){return u.pcCheck(a,2,2),u.isFeatureSet(a[0])?a[0].load().then(function(t){var n=p.WhereClause.create(a[1],t.getFieldsIndex()),i=n.getVariables();if(i.length>0){for(var l=[],u=0;u<i.length;u++){var o={name:i[u]};l.push(e.evaluateIdentifier(r,o))}return y.all(l).then(function(e){for(var r={},t=0;t<i.length;t++)r[i[t]]=e[t];return n.parameters=r,new s({parentfeatureset:a[0],whereclause:n})})}return y.resolve(new s({parentfeatureset:a[0],whereclause:n}))}):e.failDefferred("Filter cannot accept this parameter type")})},e.signatures.push({name:"filter",min:"2",max:"2"}),e.functions.orderby=function(r,t){return e.standardFunctionAsync(r,t,function(r,t,n){if(u.pcCheck(n,2,2),u.isFeatureSet(n[0])){var a=new d(n[1]);return y.resolve(new o({parentfeatureset:n[0],orderbyclause:a}))}return e.failDefferred("Order cannot accept this parameter type")})},e.signatures.push({name:"orderby",min:"2",max:"2"}),e.functions.top=function(r,t){return e.standardFunctionAsync(r,t,function(r,t,n){return u.pcCheck(n,2,2),u.isFeatureSet(n[0])?y.resolve(new f({parentfeatureset:n[0],topnum:n[1]})):u.isArray(n[0])?u.toNumber(n[1])>=n[0].length?n[0].slice(0):n[0].slice(0,u.toNumber(n[1])):u.isImmutableArray(n[0])?u.toNumber(n[1])>=n[0].length()?n[0].slice(0):n[0].slice(0,u.toNumber(n[1])):e.failDefferred("Top cannot accept this parameter type")})},e.signatures.push({name:"top",min:"2",max:"2"}),e.functions.first=function(r,t){return e.standardFunctionAsync(r,t,function(e,r,t){return u.pcCheck(t,1,1),u.isFeatureSet(t[0])?t[0].first(e.abortSignal).then(function(e){if(null!==e){var r=a.createFromGraphicLikeObject(e.geometry,e.attributes,t[0]);r._underlyingGraphic=e,e=r}return e}):u.isArray(t[0])?0===t[0].length?y.resolve(null):y.resolve(t[0][0]):u.isImmutableArray(t[0])?0===t[0].length()?y.resolve(null):y.resolve(t[0].get(0)):null})},e.signatures.push({name:"first",min:"1",max:"1"}),e.functions.attachments=function(r,n){return e.standardFunctionAsync(r,n,function(e,n,i){u.pcCheck(i,1,2);var s={minsize:-1,maxsize:-1,types:null};if(i.length>1)if(i[1]instanceof t){if(i[1].hasField("minsize")&&(s.minsize=u.toNumber(i[1].field("minsize"))),i[1].hasField("maxsize")&&(s.maxsize=u.toNumber(i[1].field("maxsize"))),i[1].hasField("types")){var o=u.toStringArray(i[1].field("types"),!1);o.length>0&&(s.types=o)}}else if(null!==i[1])throw new Error("Invalid Parameter");if(i[0]instanceof a){var f=i[0]._layer;return f instanceof m&&(f=l.constructFeatureSet(f,r.spatialReference,["*"],!0,r.lrucache)),null===f?[]:!1===u.isFeatureSet(f)?[]:f.load().then(function(){return f.queryAttachments(i[0].field(f.objectIdField),s.minsize,s.maxsize,s.types)})}if(null===i[0])return[];throw new Error("Invalid Parameter")})},e.signatures.push({name:"attachments",min:"1",max:"2"}),e.functions.featuresetbyrelationship=function(r,t){return e.standardFunctionAsync(r,t,function(e,t,n){u.pcCheck(n,2,4);var i=n[0],s=u.toString(n[1]),o=u.defaultUndefined(n[2],null),f=u.toBoolean(u.defaultUndefined(n[3],!0));if(null===o&&(o=["*"]),!1===u.isArray(o))throw new Error("Invalid Parameter");if(null===n[0])return null;if(!(n[0]instanceof a))throw new Error("Invalid Parameter");var c=i._layer;return c instanceof m&&(c=l.constructFeatureSet(c,r.spatialReference,["*"],!0,r.lrucache)),null===c?null:!1===u.isFeatureSet(c)?null:c.load().then(function(e){var t=e.relationshipMetaData(),n=t.filter(function(e){return e.name===s});if(0===n.length)return null;if(void 0!==n[0].relationshipTableId&&null!==n[0].relationshipTableId&&n[0].relationshipTableId>-1)return l.constructFeatureSetFromRelationship(e,n[0],i.field(e.objectIdField),e.spatialReference,o,f,r.lrucache);var a=e.serviceUrl();return a?(a="/"===a.charAt(a.length-1)?a+n[0].relatedTableId.toString():a+"/"+n[0].relatedTableId.toString(),l.constructFeatureSetFromUrl(a,e.spatialReference,o,f,r.lrucache).then(function(e){return e.load().then(function(){return e.relationshipMetaData()}).then(function(r){if(r=r.filter(function(e){return e.id===n[0].id}),null===i.field(n[0].keyField)){var t=p.WhereClause.create(r[0].keyField+" is null",e.getFieldsIndex());return e.filter(t)}var a=p.WhereClause.create(r[0].keyField+"= @id",e.getFieldsIndex());return a.parameters={id:i.field(n[0].keyField)},e.filter(a)})})):null})})},e.signatures.push({name:"featuresetbyrelationship",min:"2",max:"4"}),e.functions.groupby=function(r,t){return e.standardFunctionAsync(r,t,function(t,a,i){return u.pcCheck(i,3,3),u.isFeatureSet(i[0])?i[0].load().then(function(t){var a=[],l=[],s=[];if(u.isString(i[1]))s.push(i[1]);else if(i[1]instanceof n)s.push(i[1]);else if(u.isArray(i[1]))s=i[1];else{if(!u.isImmutableArray(i[1]))return e.failDefferred("Illegal Value: GroupBy");s=i[1].toArray()}for(var o=0,f=s;o<f.length;o++){var c=f[o];if(u.isString(c))a.push({name:u.toString(c),expression:p.WhereClause.create(u.toString(c),t.getFieldsIndex())});else{if(!(c instanceof n))return e.failDefferred("Illegal Value: GroupBy");var d=c.hasField("name")?c.field("name"):"",m=c.hasField("expression")?c.field("expression"):"";if(!d)return e.failDefferred("Illegal Value: GroupBy");a.push({name:d,expression:p.WhereClause.create(m?d:m,t.getFieldsIndex())})}}if(s=[],u.isString(i[2]))s.push(i[2]);else if(u.isArray(i[2]))s=i[2];else if(u.isImmutableArray(i[2]))s=i[2].toArray();else{if(!(i[2]instanceof n))return e.failDefferred("Illegal Value: GroupBy");s.push(i[2])}for(var g=0,v=s;g<v.length;g++){var c=v[g];if(!(c instanceof n))return e.failDefferred("Illegal Value: GroupBy");var F=c.hasField("name")?c.field("name"):"",b=c.hasField("statistic")?c.field("statistic"):"",m=c.hasField("expression")?c.field("expression"):"";if(!F||!b||!m)return e.failDefferred("Illegal Value: GroupBy");l.push({name:F,statistic:b.toLowerCase(),expression:p.WhereClause.create(m,t.getFieldsIndex())})}for(var I=[],D=0,S=a;D<S.length;D++){var w=S[D];I.push(h(w.expression,e,r))}for(var x=0,A=l;x<A.length;x++){var w=A[x];I.push(h(w.expression,e,r))}return I.length>0?y.all(I).then(function(){return y.resolve(i[0].groupby(a,l))}):y.resolve(i[0].groupby(a,l))}):e.failDefferred("Illegal Value: GroupBy")})},e.signatures.push({name:"groupby",min:"3",max:"3"}))}Object.defineProperty(r,"__esModule",{value:!0}),r.registerFunctions=S});