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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../geometry","../../../../core/arrayUtils","../../../../core/Error","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../geometry/support/quantizationUtils","../../../../geometry/support/spatialReferenceUtils","../../../../layers/support/arcgisLayerUrl","../../../../layers/support/fieldUtils","../../statistics/support/predominanceUtils","../../statistics/support/utils","../utils","./LayerAdapter","./support/utils","../../../../tasks/GenerateRendererTask","../../../../tasks/support/GenerateRendererParameters","../../../../tasks/support/QuantizationParameters","../../../../tasks/support/Query","../../../../tasks/support/StatisticDefinition","../../../../tasks/support/UniqueValueDefinition"],(function(e,t,r,a,i,n,s,o,l,u,c,m,p,d,f,h,y,v,F,g,S,x,w,_,z,E,q,V,T){return function(e){function t(t){return e.call(this,t)||this}return a(t,e),t.prototype.destroy=function(){this._hasLocalSource=null},t.prototype._isStatsSupportedOnService=function(){var e=this.layer;return!e.get("capabilities.query.supportsStatistics")||"multipatch"===this.geometryType&&!y.isHostedAgolService(e.url)&&e.version<10.5?m.reject(new u("feature-layer-adapter:not-supported","Layer does not support statistics query")):m.resolve()},t.prototype._fetchFeaturesFromMemory=function(e,t,r){return s(this,void 0,void 0,(function(){var a,i;return n(this,(function(n){switch(n.label){case 0:return a=this.layer,this._hasLocalSource?[4,a.queryFeatures(t)]:[3,2];case 1:return[2,n.sent().features];case 2:if(!e)throw new u("feature-layer-adapter:insufficient-data","view is required to fetch the features from layerView");return[4,e.whenLayerView(a)];case 3:return i=n.sent(),[4,p.whenFalseOnce(i,"updating")];case 4:return n.sent(),[4,i.queryFeatures(t,{signal:r})];case 5:return[2,n.sent().features]}}))}))},t.prototype._fetchFeaturesFromService=function(e,t){return this.layer.queryFeatures(e,{signal:t}).then((function(e){return e&&e.features}))},t.prototype._fetchFeaturesForStats=function(e){var t=this;return S.getFieldsList({field:e.field,normalizationField:e.normalizationField,valueExpression:e.valueExpression}).then((function(r){return t.getSampleFeatures({sampleSize:-1,view:e.view,requiredFields:r,signal:e.signal})}))},t.prototype._hasRequiredFieldsInView=function(e,t){return s(this,void 0,void 0,(function(){var r,a,i=this;return n(this,(function(n){switch(n.label){case 0:return[4,t.whenLayerView(this.layer)];case 1:return r=n.sent(),[4,p.whenFalseOnce(r,"updating")];case 2:return n.sent(),a=!0,e&&e.length&&(a=e.every((function(e){var t=i.getField(e);return r.availableFields.indexOf(t.name)>-1}))),[2,a]}}))}))},t.prototype._summaryStatsFromGenRend=function(e){var t=e.normalizationType,r=e.normalizationField;return this.classBreaks({field:e.field,numClasses:5,classificationMethod:"standard-deviation",standardDeviationInterval:.25,normalizationType:t,normalizationField:"field"===t?r:void 0,minValue:e.minValue,maxValue:e.maxValue,signal:e.signal}).then((function(e){var t,r,a;if(e.classBreakInfos.some((function(e){return e.hasAvg&&(t=e),!!t})),t){var i=t.maxValue-t.minValue;r=t.minValue+i/2,a=4*i}var n={min:e.minValue,max:e.maxValue,avg:r,stddev:a};return w.processSummaryStatisticsResult(n)}))},t.prototype._getSummaryStatsQuery=function(e,t){var r=e.field,a=e.normalizationType,i=e.normalizationField,n=e.normalizationTotal,s=this.supportsSQLExpression&&t?w.msSinceUnixEpochSQL(this,r):e.sqlExpression,o=w.getFieldExpr({field:r,normalizationType:a,normalizationField:i,normalizationTotal:n,layer:this}),l=s||o,u=l?g.getRangeExpr(l,e.minValue,e.maxValue):null,c=g.getSQLFilterForNormalization({field:r,normalizationField:i,normalizationType:a}),m=g.mergeWhereClauses(e.sqlWhere,c),p=g.mergeWhereClauses(m,u),d=this.layer.createQuery();return d.where=g.mergeWhereClauses(d.where,p),d.sqlFormat=s?"standard":null,d.outStatistics=w.statisticTypes.map((function(e){var t=new V;return t.statisticType="variance"===e?"var":e,t.onStatisticField=l,t.outStatisticFieldName=e+"_value",t})),d},t.prototype._summaryStatsFromServiceQuery=function(e,t){return s(this,void 0,void 0,(function(){var r,a,i,s;return n(this,(function(n){switch(n.label){case 0:return[4,this._isStatsSupportedOnService()];case 1:return n.sent(),"percent-of-total"!==e.normalizationType?[3,3]:(r=e,[4,this._getNormalizationTotal(e.field,e.normalizationType)]);case 2:r.normalizationTotal=n.sent(),n.label=3;case 3:return a=this._getSummaryStatsQuery(e,t),[4,this.layer.queryFeatures(a,{signal:e.signal})];case 4:return i=n.sent(),s=w.getSummaryStatisticsFromFeatureSet(i,t),[2,w.processSummaryStatisticsResult(s)]}}))}))},t.prototype._summaryStatsFromClientQuery=function(e,t){return s(this,void 0,void 0,(function(){var r,a,i,s,o,l,c,m,d;return n(this,(function(n){switch(n.label){case 0:if(r=e.view,a=e.signal,!r)throw new u("feature-layer-adapter:insufficient-data","view is required to query stats from layerView");return[4,r.whenLayerView(this.layer)];case 1:return i=n.sent(),[4,p.whenFalseOnce(i,"updating")];case 2:return n.sent(),[4,S.getFieldsList({field:e.field,normalizationField:e.normalizationField,valueExpression:e.valueExpression})];case 3:return s=n.sent(),[4,this._hasRequiredFieldsInView(s,r)];case 4:return o=n.sent(),l=this._getSummaryStatsQuery(e,t),!this._hasLocalSource||o?[3,6]:[4,this.layer.queryFeatures(l,{signal:a})];case 5:return m=n.sent(),[3,8];case 6:return[4,i.queryFeaturesJSON(l,{signal:a})];case 7:m=n.sent(),n.label=8;case 8:return c=m,d=w.getSummaryStatisticsFromFeatureSet(c,t),[2,w.processSummaryStatisticsResult(d)]}}))}))},t.prototype._summaryStatsFromMemory=function(e,t){return s(this,void 0,void 0,(function(){var a,i,s,o,l,c,m,p,d,f;return n(this,(function(n){switch(n.label){case 0:return a=e.field,i=e.valueExpression,s=e.view,o={field:a,valueExpression:i,normalizationField:e.normalizationField,view:s,signal:e.signal},(c=e.features)?[3,2]:[4,this._fetchFeaturesForStats(o)];case 1:c=n.sent(),n.label=2;case 2:if(!((l=c)&&l.length))throw new u("feature-layer-adapter:insufficient-data","No features are available to calculate statistics");return"percent-of-total"!==(m=r({},e)).normalizationType?[3,4]:[4,w.calculateStatsFromMemory({field:a},l)];case 3:if(p=n.sent(),null==(d=p.sum))throw new u("feature-layer-adapter:invalid","invalid normalizationTotal");m.normalizationTotal=d,n.label=4;case 4:return[4,w.calculateStatsFromMemory(m,l,t)];case 5:return f=n.sent(),[2,w.processSummaryStatisticsResult(f)]}}))}))},t.prototype._uvFromGenRenderer=function(e,t){var r=this,a=e.field,i=new T;i.attributeField=a;var n=new z;return n.classificationDefinition=i,this.generateRenderer(n,e.signal).then((function(e){var t={},i=r.getField(a);return e.uniqueValues.forEach((function(e){var r=e.value;null!=r&&""!==r&&("string"!=typeof r||""!==r.trim()&&"<null>"!==r.toLowerCase())||(r=null),null==t[r]?t[r]={count:e.count,data:v.isNumericField(i)&&r?Number(r):r}:t[r].count=t[r].count+e.count})),{count:t}})).then((function(r){return w.createUVResult(r,t,e.returnAllCodedValues)}))},t.prototype._getUVQuery=function(e){var t=e.field,r=e.sqlExpression,a="countOF"+(t||"Expr"),i=new V;i.statisticType="count",i.onStatisticField=r?"1":t,i.outStatisticFieldName=a;var n=this.layer.createQuery();return n.where=g.mergeWhereClauses(n.where,e.sqlWhere),n.sqlFormat=r?"standard":null,n.outStatistics=[i],n.groupByFieldsForStatistics=[t||r],n},t.prototype._uvFromServiceQuery=function(e,t){var r=this;return this._isStatsSupportedOnService().then((function(){return r.layer.queryFeatures(r._getUVQuery(e),{signal:e.signal})})).then((function(t){return w.getUniqueValuesFromFeatureSet(t,r,e.field,null,e.signal)})).then((function(r){return w.createUVResult(r,t,e.returnAllCodedValues)}))},t.prototype._uvFromClientQuery=function(e,t){return s(this,void 0,void 0,(function(){var r,a,i,s,o;return n(this,(function(n){switch(n.label){case 0:if(r=e.view,a=e.signal,!r)throw new u("feature-layer-adapter:insufficient-data","view is required to query stats from layerView");return[4,r.whenLayerView(this.layer)];case 1:return i=n.sent(),[4,p.whenFalseOnce(i,"updating")];case 2:return n.sent(),[4,i.queryFeaturesJSON(this._getUVQuery(e),{signal:a})];case 3:return s=n.sent(),[4,w.getUniqueValuesFromFeatureSet(s,this,e.field,null,e.signal)];case 4:return o=n.sent(),[2,w.createUVResult(o,t,e.returnAllCodedValues)]}}))}))},t.prototype._uvFromMemory=function(e,t){return s(this,void 0,void 0,(function(){var r,a,i,s,o,l,u;return n(this,(function(n){switch(n.label){case 0:return r=e.field,a=e.valueExpression,i=e.view,s=e.signal,o={field:r,valueExpression:a,view:i,signal:s},e.features?(u=e.features,[3,3]):[3,1];case 1:return[4,this._fetchFeaturesForStats(o)];case 2:u=n.sent(),n.label=3;case 3:return l=u,[2,w.calculateUniqueValuesFromMemory(e,l,t)]}}))}))},t.prototype._calcBinsSQL=function(e,t){var r=[],a=t.length;return t.forEach((function(t,i){var n=t[0],s=t[1],o=g.mergeWhereClauses(e+" >= "+n,e+(i===a-1?" <= ":" < ")+s);r.push("WHEN ("+o+") THEN "+(i+1))})),["CASE",r.join(" "),"ELSE 0","END"].join(" ")},t.prototype._getNormalizationTotal=function(e,t,r){return e&&"percent-of-total"===t?this.summaryStatistics({field:e,signal:r}).then((function(e){return e.sum})):m.resolve(null)},t.prototype._getQueryParamsForExpr=function(e,t){var r=e.valueExpression||e.sqlExpression,a=e.signal;if(!r){var i=e.field,n=i?this.getField(i):null,s=v.isDateField(n),o={field:i,normalizationType:e.normalizationType,normalizationField:e.normalizationField,normalizationTotal:t,layer:this};return{sqlExpression:s?w.msSinceUnixEpochSQL(this,i):w.getFieldExpr(o),sqlWhere:s?null:e.sqlWhere||g.getSQLFilterForNormalization(e),signal:a}}return{valueExpression:e.valueExpression,sqlExpression:e.sqlExpression,sqlWhere:e.sqlWhere,signal:a}},t.prototype._getDataRange=function(e,t,r){return null!=t&&null!=r?m.resolve({min:t,max:r}):this.summaryStatistics(e).then((function(e){return{min:e.min,max:e.max}}))},t.prototype._histogramForExpr=function(e){var t=this;return this._getNormalizationTotal(e.field,e.normalizationType,e.signal).then((function(r){var a=t._getQueryParamsForExpr(e,r);return t._getDataRange(a,e.minValue,e.maxValue).then((function(i){var n=i.min,s=i.max,o=e.numBins||10,l=w.getEqualIntervalBins(n,s,o),u=t._calcBinsSQL(a.sqlExpression,l),c=new V({statisticType:"count",outStatisticFieldName:"countOFExpr",onStatisticField:"1"}),m=t.layer.createQuery();return m.where=g.mergeWhereClauses(m.where,a.sqlWhere),m.sqlFormat="standard",m.outStatistics=[c],m.groupByFieldsForStatistics=[u],m.orderByFields=[u],t._isStatsSupportedOnService().then((function(){return t.layer.queryFeatures(m,{signal:a.signal})})).then((function(e){return w.getHistogramFromFeatureSet(e,n,s,o,r)}))}))}))},t.prototype._histogramForField=function(e){var t=this;return(null!=e.minValue&&null!=e.maxValue?m.resolve({min:e.minValue,max:e.maxValue}):this.summaryStatistics(e).then((function(e){if(!e.count)throw new u("feature-layer-adapter:insufficient-data","Either the layer has no features or none of the features have data for the field");return{min:e.min,max:e.max}}))).then((function(r){return t._getBins({min:r.min,max:r.max},e.field,e.numBins,e.signal)}))},t.prototype._getBins=function(e,t,r,a){void 0===r&&(r=10);var i=e.min,n=e.max,s=e.normTotal,o=e.excludeZerosExpr,l=e.intervals||w.getEqualIntervalBins(i,n,r),u=e.sqlExpr||t;return this._queryBins(l,u,o,a).then((function(e){return{bins:e.map((function(e,t){return{minValue:l[t][0],maxValue:l[t][1],count:e.value}})),minValue:i,maxValue:n,normalizationTotal:s}}))},t.prototype._queryBins=function(e,t,r,a){for(var i=this,n=[],s=e.length,o=0;o<s;o++){var l=g.mergeWhereClauses(r,g.mergeWhereClauses(t+" >= "+e[o][0],null!==e[o][1]?t+(o===s-1?" <= ":" < ")+e[o][1]:""));n.push(l)}return m.eachAlways(n.map((function(e){return i.queryFeatureCount(e,a)})))},t.prototype._binParamsFromGenRend=function(e,t){var r=this,a=e.field,i=e.normalizationType,n=e.normalizationField,s=e.signal,o=g.getSQLFilterForNormalization({field:a,normalizationType:i,normalizationField:n}),l=new z({classificationDefinition:w.createCBDefn({field:a,normalizationType:i,normalizationField:n,classificationMethod:e.classificationMethod,standardDeviationInterval:e.standardDeviationInterval,breakCount:e.numBins||10}),where:g.mergeWhereClauses(o,t)});return this.generateRenderer(l,s).then((function(e){var t=e.normalizationTotal,s=e.classBreaks;return w.generateBinParams({field:a,normalizationType:i,normalizationField:n,normalizationTotal:t,classBreaks:s,where:o,layer:r})}))},t.prototype._histogramFromMemory=function(e){var t=this,a=e.field,i=e.normalizationField,n=e.normalizationType,s=e.valueExpression,o=e.classificationMethod,l=e.minValue,c=e.maxValue,p=e.view,d=e.signal,f={field:a,valueExpression:s,normalizationField:i,view:p,signal:d};return(e.features?m.resolve(e.features):this._fetchFeaturesForStats(f)).then((function(i){if(!(i&&i.length))throw new u("feature-layer-adapter:insufficient-data","No features are available to calculate histogram");var f=null;if((!o||"equal-interval"===o)&&!n)f=null!=l&&null!=c?m.resolve({min:l,max:c,source:"parameters"}):t.summaryStatistics({field:a,valueExpression:s,features:i,view:p,signal:d}).then((function(e){return e.count?{min:e.min,max:e.max}:m.reject(new u("feature-layer-adapter:insufficient-data","No features are available to calculate histogram"))}));else{var h=r({},e);h.features=i,f=t._getBinParamsFromMemory(h)}return f.then((function(t){return w.calculateHistogramFromMemory(e,t,i)}))}))},t.prototype._getBinParamsFromMemory=function(e){return s(this,void 0,void 0,(function(){var t,r,a,i,s,o,l,u,c,m,p,d=this;return n(this,(function(n){return t=e.field,r=e.valueExpression,a=e.classificationMethod,i=e.standardDeviationInterval,s=e.normalizationType,o=e.normalizationField,l=e.minValue,u=e.maxValue,c=e.features,m=e.view,p=e.signal,[2,this._classBreaksFromMemory({field:t,valueExpression:r,normalizationType:s,normalizationField:o,classificationMethod:a,standardDeviationInterval:i,minValue:l,maxValue:u,numClasses:e.numBins,features:c,view:m,signal:p}).then((function(e){var r=e.normalizationTotal,a=e.classBreakInfos,i=g.getSQLFilterForNormalization({field:t,normalizationType:s,normalizationField:o});return w.generateBinParams({field:t,normalizationType:s,normalizationField:o,normalizationTotal:r,classBreaks:a,where:i,layer:d})}))]}))}))},t.prototype._classBreaksFromGenRend=function(e){var t=e.field,r=e.normalizationType,a=e.normalizationField,i=e.normalizationTotal,n=e.signal,s=g.getSQLFilterForNormalization({field:t,normalizationType:r,normalizationField:a}),o=w.getFieldExpr({field:t,normalizationType:r,normalizationField:a,normalizationTotal:i,layer:this}),l=g.getRangeExpr(o,e.minValue,e.maxValue),u=w.createCBDefn({field:t,normalizationType:r,normalizationField:a,classificationMethod:e.classificationMethod,standardDeviationInterval:e.standardDeviationInterval,breakCount:e.numClasses||5}),c=new z;return c.classificationDefinition=u,c.where=g.mergeWhereClauses(s,l),this.generateRenderer(c,n).then((function(t){return w.resolveCBResult(e,t)}))},t.prototype._classBreaksFromInterpolation=function(e){for(var t=e.minValue,r=e.maxValue,a=e.numClasses||5,i=[],n=(r-t)/a,s=0;s<a;s++){var o=t+s*n;i.push({minValue:o,maxValue:o+n})}i[a-1].maxValue=r;var l={classBreaks:i,normalizationTotal:e.normalizationTotal},u=w.resolveCBResult(e,l);return m.resolve(u)},t.prototype._classBreaksFromMemory=function(e){return s(this,void 0,void 0,(function(){var t,a,i,s,o,l,c,m,p,d,f;return n(this,(function(n){switch(n.label){case 0:return t=e.field,a=e.normalizationField,i=e.valueExpression,s=e.view,o=e.signal,l={field:t,valueExpression:i,normalizationField:a,view:s,signal:o},(m=e.features)?[3,2]:[4,this._fetchFeaturesForStats(l)];case 1:m=n.sent(),n.label=2;case 2:if(!((c=m)&&c.length))throw new u("feature-layer-adapter:insufficient-data","No features are available to calculate statistics");return"percent-of-total"!==(p=r({},e)).normalizationType?[3,4]:[4,w.calculateStatsFromMemory({field:t},c)];case 3:if(d=n.sent(),null==(f=d.sum))throw new u("feature-layer-adapter:invalid","invalid normalizationTotal");p.normalizationTotal=f,n.label=4;case 4:return[2,w.calculateClassBreaksFromMemory(p,c)]}}))}))},t.prototype._heatmapStatsFromMemory=function(e,t){return s(this,void 0,void 0,(function(){var r,a,i,s,o,l,c,m,p,d,f,h;return n(this,(function(n){switch(n.label){case 0:return r=e.blurRadius,a=e.field,i=e.view,s=e.signal,o=i.state,l=o.resolution,c=o.size,m=new E.default({extent:i.extent,tolerance:l}),p=new q({returnGeometry:!0,geometry:i.extent,quantizationParameters:m}),e.features?(f=this._quantizeFeatures(e.features,m,i),[3,3]):[3,1];case 1:return[4,this._fetchFeaturesFromMemory(i,p,s)];case 2:f=n.sent(),n.label=3;case 3:if(!(d=f)||!d.length)return[2,{count:0,min:null,max:null,avg:null,stddev:null}];if(h=w.calculateHeatmapStats(d,r,t,a,c[0],c[1]))return[2,{count:h.count,min:h.min,max:h.max,avg:h.mean,stddev:h.stdDev}];throw new u("feature-layer-adapter:invalid","unable to calculate heatmap statistics")}}))}))},t.prototype._quantizeFeatures=function(e,t,r){var a=this,i=f.toQuantizationTransform(t),n=r.spatialReference,s=r.size,l=h.isWrappable(n),u=h.getInfo(n),m=Math.round((u.valid[1]-u.valid[0])/i.scale[0]);return e.map((function(e){var t=new o.Point(c.unwrap(e.geometry));return f.quantizePoint(i,t,t,t.hasZ,t.hasM),e.geometry=l?a._wrapPoint(t,m,s[0]):t,e}))},t.prototype._wrapPoint=function(e,t,r){return e.x<0?e.x+=t:e.x>r&&(e.x-=t),e},t.prototype.getField=function(e){return void 0===e&&(e=""),this.layer.getField(e)},t.prototype.getFieldUsageInfo=function(e){return this.getField(e)?{supportsLabelingInfo:!0,supportsRenderer:!0,supportsPopupTemplate:!0,supportsLayerQuery:!0,supportsStatistics:!0}:null},t.prototype.getFieldDomain=function(e,t){return this.layer.getFieldDomain(e,t)},t.prototype.summaryStatistics=function(e){var t=this,r=e.field,a=r?this.getField(r):null,i=v.isDateField(a),n=e.valueExpression||e.sqlExpression,s=n&&!e.sqlExpression,o=this._hasLocalSource||e.features,l=e.view,c=l&&"3d"===l.type;return o||s?s||e.features||c?this._summaryStatsFromMemory(e,i):this._summaryStatsFromClientQuery(e,i):this.supportsSQLExpression||!i&&!n?(e.normalizationType&&!this.supportsSQLExpression?this._summaryStatsFromGenRend(e):this._summaryStatsFromServiceQuery(e,i)).catch((function(){return m.throwIfAborted(e.signal),t._summaryStatsFromMemory(e,i)})):m.reject(new u("feature-layer-adapter:not-supported","Layer does not support standardized SQL expression for queries"))},t.prototype.uniqueValues=function(e){var t=this,r=e.field,a=e.valueExpression,i=e.sqlExpression,n=e.signal,s=(r?this.getField(r):null)&&this.getFieldDomain(r),o=a&&(!i||!this.supportsSQLExpression),l=this._hasLocalSource||e.features||o,u=e.view,c=u&&"3d"===u.type;return l?o||e.features||c?this._uvFromMemory(e,s):this._uvFromClientQuery(e,s):this._uvFromServiceQuery(e,s).catch((function(r){return m.throwIfAborted(n),e.field?t._uvFromGenRenderer(e,s):r})).catch((function(){return m.throwIfAborted(n),o||e.features||c?t._uvFromMemory(e,s):t._uvFromClientQuery(e,s)}))},t.prototype.histogram=function(e){var t=this,r=e.field,a=e.normalizationType,i=e.normalizationField,n=e.classificationMethod,s=e.signal,o=r?this.getField(r):null,l=v.isDateField(o),c=e.valueExpression||e.sqlExpression,p=c&&!e.sqlExpression,d=this._hasLocalSource||e.features||p,f=this.supportsSQLExpression,h=!n||"equal-interval"===n,y=e.minValue,F=e.maxValue,S=null!=y&&null!=F,x=e.numBins||10;return d?this._histogramFromMemory(e):(c||f)&&h?c&&!f?m.reject(new u("feature-layer-adapter:not-supported","Layer does not support standardized SQL expression for queries")):this._histogramForExpr(e):l&&h?m.reject(new u("feature-layer-adapter:not-supported","Normalization and date field are not allowed when layer does not support standardized SQL expression for queries")):a||!h?this._binParamsFromGenRend(e).then((function(n){if(!S)return t._getBins(n,r,x,s);if(y>n.max||F<n.min)throw new u("histogram:insufficient-data","Range defined by 'minValue' and 'maxValue' does not intersect available data range of the field");if(h)return t._getBins({min:y,max:F,sqlExpr:n.sqlExpr,excludeZerosExpr:n.excludeZerosExpr},r,x,s);var o={field:r,normalizationType:a,normalizationField:i,normalizationTotal:n.normTotal,layer:t},l=w.getFieldExpr(o),c=g.getRangeExpr(l,y,F);return t._binParamsFromGenRend(e,c).then((function(e){return t._getBins(e,r,x,s)}))})):this._histogramForField(e)},t.prototype.classBreaks=function(e){var t=this,r=!1!==e.analyzeData,a=this._hasLocalSource||e.features||e.valueExpression;return r&&a?this._classBreaksFromMemory(e):(r?this._classBreaksFromGenRend(e):this._classBreaksFromInterpolation(e)).catch((function(){return m.throwIfAborted(e.signal),t._classBreaksFromMemory(e)}))},t.prototype.queryFeatureCount=function(e,t){if(this._hasLocalSource)return m.reject(new u("feature-layer-adapter:not-supported","Layer does not support count query"));var r=this.layer,a=r.createQuery();return a.where=g.mergeWhereClauses(a.where,e),r.queryFeatureCount(a,{signal:t})},t.prototype.generateRenderer=function(e,t){var r=this.layer;if(this._hasLocalSource||r.version<10.1)return m.reject(new u("feature-layer-adapter:not-supported","Layer does not support generateRenderer operation (requires ArcGIS Server version 10.1+)"));var a=new _({url:r.parsedUrl.path,source:r.dynamicDataSource,gdbVersion:r.gdbVersion}),i=r.createQuery();return e.where=g.mergeWhereClauses(e.where,i.where),a.execute(e,{signal:t})},t.prototype.heatmapStatistics=function(e){var t=this,a=e.field,i=e.fieldOffset,n=e.signal;return(a&&null==i?this.summaryStatistics({field:a,signal:n}):m.resolve(null)).then((function(a){var n=i||0;if(a){var s=a.count,o=a.min,l=a.max;s?o===l&&0===o?n=1:l<=0?n="abs":o<0&&(n=-1.01*o):n=1}return t._heatmapStatsFromMemory(e,n).then((function(e){return r({},e,{summaryStatistics:a,fieldOffset:n})}))}))},t.prototype.predominantCategories=function(e){return s(this,void 0,void 0,(function(){var t,r,a,i,s,o,l,c,m,p,d,f,h,y,v;return n(this,(function(n){switch(n.label){case 0:if(!this._hasLocalSource&&!this.supportsSQLExpression)throw new u("feature-layer-adapter:not-supported","Layer does not support advanced SQL expressions and standardized queries");return t=e.fields,r=e.view,a=e.signal,i=F.getArcadeForPredominantCategory(t),s=F.getSQLForPredominantCategoryName(t),r&&this._hasLocalSource?[4,this._uvFromMemory({valueExpression:i,view:r,signal:a})]:[3,2];case 1:return o=n.sent(),[3,4];case 2:return[4,this._uvFromServiceQuery({sqlExpression:s.expression,valueExpression:i,signal:a})];case 3:o=n.sent(),n.label=4;case 4:for(l=o.uniqueValueInfos,c=l.map((function(e){return e.value})),m=t.filter((function(e){return-1===c.indexOf(e)})),p=0,d=m;p<d.length;p++)f=d[p],l.push({value:f,count:0});for(l.sort((function(e,r){return t.indexOf(e.value)-t.indexOf(r.value)})),h=0,y=l;h<y.length;h++)(v=y[h]).value===F.noDominantCategoryField&&(v.value=null);return[2,{predominantCategoryInfos:l}]}}))}))},t.prototype.getSampleFeatures=function(e){return s(this,void 0,void 0,(function(){var t,r,a,i,s,o,u,c,p,d,f,h,y,v;return n(this,(function(n){switch(n.label){case 0:t=e.view,r=e.sampleSize,a=e.requiredFields,i=e.returnGeometry,s=e.signal,o=this.layer.createQuery(),u=1,o.outSpatialReference=e.spatialReference||t&&t.spatialReference,o.returnGeometry=!!i,o.outFields=a,c=[],p=!1,n.label=1;case 1:return n.trys.push([1,5,,6]),[4,this._hasRequiredFieldsInView(a,t)];case 2:return(p=n.sent())?[4,this._fetchFeaturesFromMemory(t,o,s)]:[3,4];case 3:if((c=n.sent()).length&&r>0&&r<=c.length)return[2,l.pickRandom(c,r,u)];n.label=4;case 4:return[3,6];case 5:return n.sent(),m.throwIfAborted(s),[3,6];case 6:return n.trys.push([6,10,,11]),this._hasLocalSource?[2,p?c:this._fetchFeaturesFromService(o,s)]:[4,this.queryFeatureCount(null,s)];case 7:return d=n.sent(),f=this.layer.capabilities.query.maxRecordCount,h=-1===r?d:r,h=f&&h>f?f:h,d<=c.length||c.length>=f?[2,c]:(y=t.extent.width/t.width/t.scale*4e5,o.maxAllowableOffset=e.resolution||y,d<=h?[2,this._fetchFeaturesFromService(o,s)]:d<=2e4?[4,this.layer.queryObjectIds()]:[3,9]);case 8:return v=n.sent(),o.objectIds=l.pickRandom(v,h,u),[2,this._fetchFeaturesFromService(o,s)];case 9:return this.layer.get("capabilities.query.supportsPagination")&&(o.num=Math.min(h,2e4)),[2,this._fetchFeaturesFromService(o,s)];case 10:return n.sent(),m.throwIfAborted(s),[2,c];case 11:return[2]}}))}))},t.prototype.load=function(e){var t=this,r=this.layer.load(e).then((function(e){t.geometryType=e.geometryType,t.objectIdField=e.objectIdField,t.supportsSQLExpression=e.get("capabilities.query.supportsSqlExpression"),t._hasLocalSource=!e.url&&!!e.source,t.hasQueryEngine=t._hasLocalSource,t.minScale=e.minScale,t.maxScale=e.maxScale,t.fullExtent=e.fullExtent}));return this.addResolvingPromise(r),m.resolve(this)},i([d.property({constructOnly:!0})],t.prototype,"layer",void 0),t=i([d.subclass("esri.renderers.smartMapping.support.adapters.FeatureLayerAdapter")],t)}(d.declared(x))}));