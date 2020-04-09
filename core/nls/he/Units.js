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

define({measures:{length:"אורך",area:"שטח",volume:"נפח",angle:"זווית"},units:{millimeters:{singular:"מילימטר",plural:"מילימטרים",abbr:"ממ"},centimeters:{singular:"סנטימטר",plural:"סנטימטרים",abbr:"סמ"},decimeters:{singular:"דצימטר",plural:"דצימטרים",abbr:"דצ'"},meters:{singular:"מטר",plural:"מטרים",abbr:"מ'"},kilometers:{singular:"קילומטר",plural:"קילומטרים",abbr:'ק "מ'},inches:{singular:"אינצ'",plural:"אינצ//'ים",abbr:"אינצ'"},feet:{singular:"רגל",plural:"רגל",abbr:"רגל"},yards:{singular:"יארד",plural:"יארדים",abbr:"יארד"},miles:{singular:"מייל",plural:"מיילים",abbr:"מייל"},"nautical-miles":{singular:"מיל ימי",plural:"מיילים ימיים",abbr:"מייל ימי"},"us-feet":{singular:'רגל (ארה"ב)',plural:'רגליים (ארה"ב)',abbr:"רגל"},"square-millimeters":{singular:"מילימטר רבוע",plural:"מילימטרים רבועים",abbr:"mm²"},"square-centimeters":{singular:"סנטימטר רבוע",plural:"סנטימטרים רבועים",abbr:"cm²"},"square-decimeters":{singular:"דצימטר רבוע",plural:"דצימטרים רבועים",abbr:"dm²"},"square-meters":{singular:"מטר רבוע",plural:"מטרים רבועים",abbr:"מ²"},"square-kilometers":{singular:"קילומטר רבוע",plural:"קילומטרים רבועים",abbr:'ק"מ²'},"square-inches":{singular:"אינצ' מרובע",plural:"אינ'צים רבועים",abbr:"in²"},"square-feet":{singular:"רגל רבוע",plural:"רגליים רבועות",abbr:"רגל רבוע"},"square-yards":{singular:"יארד רבוע",plural:"יארדים רבועים",abbr:"יארד רבוע"},"square-miles":{singular:"מייל רבוע",plural:"מיילים רבועים",abbr:"מייל²"},"square-us-feet":{singular:'רגל רבועה (ארה"ב)',plural:'רגליים רבועות (ארה"ב)',abbr:"רגל רבוע"},acres:{singular:"אקר",plural:"אקרים",abbr:"אקר"},ares:{singular:"are",plural:"עשיריות דונם",abbr:"a"},hectares:{singular:"הקטר",plural:"הקטרים",abbr:"הקטר"},liters:{singular:"ליטר",plural:"ליטרים",abbr:"l"},"cubic-millimeters":{singular:"מילימטר מעוקב",plural:"מילימטרים מעוקבים",abbr:"mm³"},"cubic-centimeters":{singular:"סנטימטר מעוקב",plural:"סנטימטרים מעוקבים",abbr:"cm³"},"cubic-decimeters":{singular:"דצימטר מעוקב",plural:"דצימטרים מעוקבים",abbr:"dm³"},"cubic-meters":{singular:"מטר מעוקב",plural:"מטרים מעוקבים",abbr:"m³"},"cubic-kilometers":{singular:"קילומטר מעוקב",plural:"קילומטרים מעוקבים",abbr:"km³"},"cubic-inches":{singular:"אינצ' מעוקב",plural:"אינצ'ים מעוקבים",abbr:"in³"},"cubic-feet":{singular:"רגל מעוקב",plural:"רגליים מעוקבות",abbr:"ft³"},"cubic-yards":{singular:"יארד מעוקב",plural:"יארדים מעוקבים",abbr:"yd³"},"cubic-miles":{singular:"מייל מעוקב",plural:"מייל מעוקב",abbr:"mi³"},radians:{singular:"רדיאן",plural:"רדיאנים",abbr:""},degrees:{singular:"מעלה",plural:"מעלות",abbr:"°"},bytes:{B:"{fileSize} B",kB:"{fileSize} kB",MB:"{fileSize} MB",GB:"{fileSize} GB",TB:"{fileSize} TB"}}});