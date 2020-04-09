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

define({title:"אור יום",directShadow:"הצג צללים",notSupportedInHW:"ישות זו אינה נתמכת בדפדפן זה.",unsupported:"כלי אור יום נתמך רק ב-SceneView.",datePattern:"d, MMMM ,yyyy",playDay:"אנימציה של שמש וצל במשך יום",playYear:"אנימציה של שמש וצל במשך שנה",pause:"השהיה",season:"עונה",spring:"אביב",summer:"קיץ",winter:"חורף",fall:"סתו",timezoneHAST:"HAST",timezoneAKST:"AKST",timezonePST:"PST",timezoneMST:"MST",timezoneCST:"CST",timezoneEST:"EST",timezoneCET:"CET",timezoneEET:"EET",timezoneMSK:"MSK",timezoneGST:"GST",timezoneICT:"ICT",timezoneCCT:"CCT",timezoneJST:"JST",timezoneAEST:"AEST",timezoneNZST:"NZST",timezoneDateline:"קו תאריך בינלאומי - מערב",timezoneHawaii:"הוואי",timezoneAlaska:"אלסקה",timezoneBaja:"באחה קליפורניה",timezoneMountain:'שעון ההרים (ארה"ב וקנדה)',timezoneLaPaz:"צ'יוואווה, לה פאס, מאצאטלן",timezoneArizona:"אריזונה",timezoneSaskatchewan:"ססקצ'ואן",timezoneCentralAmerica:"מרכז אמריקה",timezoneCentralTime:'שעון המרכז (ארה"ב וקנדה)',timezoneMexico:"גוודלחרה, מקסיקו סיטי, מונטריי",timezoneEasternUS:'שעון המזרח (ארה"ב וקנדה)',timezoneLima:"בוגוטה, לימה, קיטו",timezoneIndiana:"אינדיאנה (מזרח) ",timezoneAtlantic:"שעון האטלנטי‬ (קנדה)",timezoneCuiaba:"קויאבה",timezoneSantiago:"סנטיאגו",timezoneManaus:"ג'ורג'טאון, לה פאס, מנאוס, סאן חואן",timezoneAsuncion:"אסונסיון",timezoneBrasilia:"ברזיליה",timezoneGreenland:"גרינלנד",timezoneMontevideo:"מונטווידיאו",timezoneCayenne:"קאיין, פורטלזה",timezoneBuenosAires:"בואנוס איירס",timezoneMidAtlantic:"מרכז-אטלנטי",timezoneAzores:"האזורים",timezoneCaboVerde:"איי קבו ורדה",timezoneDublin:"דבלין, אדינבורו, ליסבון, לונדון",timezoneReykjavik:"מונרוביה, רייקיאוויק",timezoneCasablanca:"קזבלנקה",timezoneBelgrade:"בלגרד, ברטיסלאבה, בודפשט, ליובליאנה, פראג",timezoneSarajevo:"סרייבו, סקופיה, ורשה, זאגרב",timezoneBrussels:"בריסל, קופנהגן, מדריד, פריז",timezoneWCAfrica:"מערב מרכז אפריקה",timezoneAmsterdam:"אמסטרדם, ברלין, ברן, רומא, שטוקהולם, וינה",timezoneWindhoek:"וינדהוק",timezoneMinsk:"מינסק",timezoneCairo:"קהיר",timezoneHelsinki:"הלסינקי, קייב, ריגה, סופיה, טאלין, וילנה",timezoneAthens:"אתונה, בוקרשט",timezoneJerusalem:"ירושלים",timezoneAmman:"עמאן",timezoneBeirut:"ביירות",timezoneHarare:"הרארה, פרטוריה",timezoneDamascus:"דמשק",timezoneIstanbul:"איסטנבול",timezoneKuwait:"כווית, ריאד",timezoneBaghdad:"בגדד",timezoneNairobi:"ניירובי",timezoneKaliningrad:"קלינינגרד",timezoneMoscow:"מוסקבה, סנט פטרסבורג, וולגוגרד",timezoneMuscat:"אבו דאבי, מוסקט",timezoneBaku:"באקו",timezoneYerevan:"ירוואן",timezoneTbilisi:"טביליסי",timezonePortLouis:"פורט לואיס",timezoneTashkent:"טשקנט",timezoneIslamabad:"איסלמאבד, קאראצ'י",timezoneEkaterinburg:"יקטרינבורג",timezoneAstana:"אסטנה",timezoneDhaka:"דאקה",timezoneNovosibirsk:"נובוסיבירסק",timezoneBangkok:"בנקוק, האנוי, ג'קארטה",timezoneKrasnoyarsk:"קרסנויארסק",timezoneBeijing:"בייג'ין, צ'ונגצ'ינג, הונג קונג, אורומקי",timezoneSingapore:"קואלה לומפור, סינגפור",timezoneTaipei:"טאיפה",timezonePerth:"פרת'",timezoneUlaanbaatar:"אולאנבאטר",timezoneIrkutsk:"אירקוטסק",timezoneSeoul:"סיאול",timezoneOsaka:"אוסקה, סאפורו, טוקיו",timezoneYakutsk:"יקוטסק",timezoneCanberra:"קנברה, מלבורן, סידני",timezoneBrisbane:"בריסביין",timezoneHobart:"הובארט",timezoneGuam:"גואם, פורט מורסבי",timezoneVladivostok:"ולדיווסטוק",timezoneSolomon:"איי שלמה, קלדוניה החדשה",timezoneMagadan:"מגדן",timezoneFiji:"פיג'י",timezoneAuckland:"אוקלנד, וולינגטון",timezoneNukualofa:"נוקואלופה",timezoneSamoa:"סמואה",chooseTimezone:"בחר את אזור הזמן שלך"});