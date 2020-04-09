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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../geometry","../../core/jsonMap","../../core/JSONSupport","../../core/accessorSupport/decorators"],(function(e,t,r,o,i,p,s,n){var a=new p.JSONMap({esriNAOutputLineNone:"none",esriNAOutputLineStraight:"straight",esriNAOutputLineTrueShape:"true-shape",esriNAOutputLineTrueShapeWithMeasure:"true-shape-with-measure"}),l=new p.JSONMap({esriNAUCentimeters:"centimeters",esriNAUDecimalDegrees:"decimal-degrees",esriNAUDecimeters:"decimeters",esriNAUFeet:"feet",esriNAUInches:"inches",esriNAUKilometers:"kilometers",esriNAUMeters:"meters",esriNAUMiles:"miles",esriNAUMillimeters:"millimeters",esriNAUNauticalMiles:"nautical-miles",esriNAUPoints:"points",esriNAUYards:"yards"}),u=new p.JSONMap({esriNFSBAllowBacktrack:"allow-backtrack",esriNFSBAtDeadEndsOnly:"at-dead-ends-only",esriNFSBNoBacktrack:"no-backtrack",esriNFSBAtDeadEndsAndIntersections:"at-dead-ends-and-intersections"}),y=new p.JSONMap({esriDOTComplete:"complete",esriDOTCompleteNoEvents:"complete-no-events",esriDOTInstructionsOnly:"instructions-only",esriDOTStandard:"standard",esriDOTSummaryOnly:"summary-only"}),d=new p.JSONMap({esriCentimeters:"centimeters",esriDecimalDegrees:"decimal-degrees",esriDecimeters:"decimeters",esriFeet:"feet",esriInches:"inches",esriKilometers:"kilometers",esriMeters:"meters",esriMiles:"miles",esriMillimeters:"millimeters",esriNauticalMiles:"nautical-miles",esriPoints:"points",esriYards:"yards"});return function(e){function t(t){var r=e.call(this,t)||this;return r.accumulateAttributes=null,r.attributeParameterValues=null,r.barriers=null,r.directionsLanguage=null,r.directionsLengthUnits=null,r.directionsOutputType=null,r.directionsStyleName=null,r.directionsTimeAttribute=null,r.doNotLocateOnRestrictedElements=!0,r.findBestSequence=null,r.ignoreInvalidLocations=null,r.impedanceAttribute=null,r.outputGeometryPrecision=null,r.outputGeometryPrecisionUnits=null,r.outputLines="true-shape",r.outSpatialReference=null,r.pointBarriers=null,r.polygonBarriers=null,r.polylineBarriers=null,r.preserveFirstStop=null,r.preserveLastStop=null,r.restrictionAttributes=null,r.restrictUTurns=null,r.returnBarriers=!1,r.returnDirections=!1,r.returnPolygonBarriers=!1,r.returnPolylineBarriers=!1,r.returnRoutes=!0,r.returnStops=!1,r.returnZ=!0,r.startTime=null,r.startTimeIsUTC=!0,r.stops=null,r.travelMode=null,r.useHierarchy=null,r.useTimeWindows=null,r}return r(t,e),t.prototype.readStartTime=function(e,t){return null!=t.startTime?new Date(t.startTime):null},t.prototype.writeStartTime=function(e,t){t.startTime=e?e.getTime():null},o([n.property({type:[String],json:{write:!0}})],t.prototype,"accumulateAttributes",void 0),o([n.property({json:{write:!0}})],t.prototype,"attributeParameterValues",void 0),o([n.property({aliasOf:"pointBarriers"})],t.prototype,"barriers",void 0),o([n.property({type:String,json:{write:!0}})],t.prototype,"directionsLanguage",void 0),o([n.property({type:l.apiValues,json:{read:l.read,write:l.write}})],t.prototype,"directionsLengthUnits",void 0),o([n.property({type:y.apiValues,json:{read:y.read,write:y.write}})],t.prototype,"directionsOutputType",void 0),o([n.property({type:String,json:{write:!0}})],t.prototype,"directionsStyleName",void 0),o([n.property({type:String,json:{write:!0}})],t.prototype,"directionsTimeAttribute",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"doNotLocateOnRestrictedElements",void 0),o([n.property({json:{write:!0}})],t.prototype,"findBestSequence",void 0),o([n.property({json:{write:!0}})],t.prototype,"ignoreInvalidLocations",void 0),o([n.property({type:String,json:{write:!0}})],t.prototype,"impedanceAttribute",void 0),o([n.property({type:Number,json:{write:!0}})],t.prototype,"outputGeometryPrecision",void 0),o([n.property({type:d.apiValues,json:{read:d.read,write:d.write}})],t.prototype,"outputGeometryPrecisionUnits",void 0),o([n.property({type:a.apiValues,json:{read:a.read,write:a.write}})],t.prototype,"outputLines",void 0),o([n.property({type:i.SpatialReference,json:{write:!0}})],t.prototype,"outSpatialReference",void 0),o([n.property({json:{write:!0}})],t.prototype,"pointBarriers",void 0),o([n.property({json:{write:!0}})],t.prototype,"polygonBarriers",void 0),o([n.property({json:{write:!0}})],t.prototype,"polylineBarriers",void 0),o([n.property({json:{write:!0}})],t.prototype,"preserveFirstStop",void 0),o([n.property({json:{write:!0}})],t.prototype,"preserveLastStop",void 0),o([n.property({type:[String],json:{write:!0}})],t.prototype,"restrictionAttributes",void 0),o([n.property({type:u.apiValues,json:{read:u.read,write:u.write}})],t.prototype,"restrictUTurns",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"returnBarriers",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"returnDirections",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"returnPolygonBarriers",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"returnPolylineBarriers",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"returnRoutes",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"returnStops",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"returnZ",void 0),o([n.property({type:Date,json:{type:Number,write:!0}})],t.prototype,"startTime",void 0),o([n.reader("startTime")],t.prototype,"readStartTime",null),o([n.writer("startTime")],t.prototype,"writeStartTime",null),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"startTimeIsUTC",void 0),o([n.property({json:{write:!0}})],t.prototype,"stops",void 0),o([n.property({json:{write:!0}})],t.prototype,"travelMode",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"useHierarchy",void 0),o([n.property({type:Boolean,json:{write:!0}})],t.prototype,"useTimeWindows",void 0),t=o([n.subclass("esri.tasks.support.RouteParameters")],t)}(n.declared(s.JSONSupport))}));