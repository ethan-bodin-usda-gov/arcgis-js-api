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

define({title:"ضوء النهار",directShadow:"عرض الظلال",notSupportedInHW:"هذه الميزة غير مدعومة في هذا المستعرض.",unsupported:"أداة ضوء النهار مدعومة فقط في SceneView.",datePattern:"dd MMMM, yyyy",playDay:"تحريك الشمس والظل على مدار يوم",playYear:"تحريك الشمس والظل على مدار سنة",pause:"إيقاف مؤقت",season:"الموسم",spring:"ربيع",summer:"صيف",winter:"شتاء",fall:"خريف",timezoneHAST:"HAST",timezoneAKST:"AKST",timezonePST:"PST",timezoneMST:"MST",timezoneCST:"CST",timezoneEST:"EST",timezoneCET:"CET",timezoneEET:"EET",timezoneMSK:"MSK",timezoneGST:"GST",timezoneICT:"ICT",timezoneCCT:"CCT",timezoneJST:"JST",timezoneAEST:"AEST",timezoneNZST:"NZST",timezoneDateline:"خط التاريخ الدولي غربًا",timezoneHawaii:"هاواي",timezoneAlaska:"ألاسكا",timezoneBaja:"باها كاليفورنيا",timezoneMountain:"التوقيت الجبلي (أمريكا وكندا)",timezoneLaPaz:"شيهواهوا، لاباز، مازاتلان",timezoneArizona:"أريزونا",timezoneSaskatchewan:"ساسكاتشوان",timezoneCentralAmerica:"وسط أمريكا",timezoneCentralTime:"توقيت المنطقة الوسطى (أمريكا وكندا)",timezoneMexico:"غوادالاجارا، مكسيكو، مونتيري",timezoneEasternUS:"التوقيت الشرقي (أمريكا وكندا)",timezoneLima:"بوغوتا، ليما، كويتو",timezoneIndiana:"الهند (الشرق) ",timezoneAtlantic:"توقيت المحيط الأطلسي (كندا)",timezoneCuiaba:"كويابا",timezoneSantiago:"سانتياغو",timezoneManaus:"جورج تاون، لاباز، مانوس، سان جوان",timezoneAsuncion:"أسونسيون",timezoneBrasilia:"البرازيل",timezoneGreenland:"غرينلاند",timezoneMontevideo:"مونتفيدو",timezoneCayenne:"كاين، فروتاليزا",timezoneBuenosAires:"بوينس آيرس",timezoneMidAtlantic:"وسط المحيط الأطلسي",timezoneAzores:"أزورس",timezoneCaboVerde:"جُزر الرأس الأخضر.",timezoneDublin:"دبلن، إدنبرة، لشبونة، لندن",timezoneReykjavik:"مونروفيا، ريكيافيك",timezoneCasablanca:"الدار البيضاء",timezoneBelgrade:"بلغراد، براتسلافا، بودابست، لوبليانا، براغ",timezoneSarajevo:"سراييفو، صوفيا، وارسو، زغرب",timezoneBrussels:"بروكسل، كوبينهاجن، مدريد، باريس",timezoneWCAfrica:"غرب أفريقيا الوسطى",timezoneAmsterdam:"أمستردام، برلين، برن، روما، ستوكهولم، فيينا",timezoneWindhoek:"وندهوك",timezoneMinsk:"مينسك",timezoneCairo:"القاهرة",timezoneHelsinki:"هلسنكي، كييف، ريجا، صوفيا، تالين، فيلنيوس",timezoneAthens:"أثينا، بوخارست",timezoneJerusalem:"القدس",timezoneAmman:"عمّان",timezoneBeirut:"بيروت",timezoneHarare:"هراري، بريتوريا",timezoneDamascus:"دمشق",timezoneIstanbul:"إسطنبول",timezoneKuwait:"الكويت، الرياض",timezoneBaghdad:"بغداد",timezoneNairobi:"نيروبي",timezoneKaliningrad:"كالينينغراد",timezoneMoscow:"موسكو، سانت بطرسبرغ، فولغوغراد",timezoneMuscat:"أبو ظبي، مسقط",timezoneBaku:"باكو",timezoneYerevan:"يريفان",timezoneTbilisi:"تبليسي",timezonePortLouis:"بورت لويس",timezoneTashkent:"طشقند",timezoneIslamabad:"إسلام آباد، كاراتشي",timezoneEkaterinburg:"إكاترينبرج",timezoneAstana:"آستانا",timezoneDhaka:"دكا",timezoneNovosibirsk:"نوفوسيبرسك",timezoneBangkok:"بانكوك، هانوي، جاكرتا",timezoneKrasnoyarsk:"كراسنويارسك",timezoneBeijing:"بكين، شونجكينج، هونج كونج، أورومكي",timezoneSingapore:"كوالا لومبور، سنغافورة",timezoneTaipei:"تايبيه",timezonePerth:"بيرث",timezoneUlaanbaatar:"أولان باتار",timezoneIrkutsk:"إركوتسك",timezoneSeoul:"سيول",timezoneOsaka:"أوساكا، سبورو، طوكيو",timezoneYakutsk:"ياكوتسك",timezoneCanberra:"كنبرا، ملبورن، سيدني",timezoneBrisbane:"بريسبان",timezoneHobart:"هوبارت",timezoneGuam:"جوام، بورت مورسبي",timezoneVladivostok:"فلاديفوستوك",timezoneSolomon:"جزر سليمان، كاليدونيا الجديدة",timezoneMagadan:"ماجادان",timezoneFiji:"فيجي",timezoneAuckland:"أوكلاند، ولنجتون",timezoneNukualofa:"نوكو ألوفا",timezoneSamoa:"ساموا",chooseTimezone:"اختر منطقتك الزمنية"});