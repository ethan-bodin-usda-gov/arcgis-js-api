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

define(["require","exports","../../core/MapUtils","../../core/mathUtils","../../core/maybe","../../core/screenUtils","./interactiveToolUtils"],(function(e,t,o,r,i,n,a){Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(){this._pointerLocations=new Map,this._hoveredManipulators=new Map,this._grabbedManipulators=new Map,this._draggedManipulators=new Map,this._stopDrag=!1,this._revertToActiveTool=null,this._cursor=null}return Object.defineProperty(e.prototype,"cursor",{get:function(){return this._cursor},enumerable:!0,configurable:!0}),e.prototype.handleInputEvent=function(e,t){var o=function(){return e.stopPropagation()};switch(e.type){case"pointer-move":p(e.pointerType)&&this._pointerLocations.set(e.pointerId,{x:e.x,y:e.y,pointerType:e.pointerType});break;case"drag":this._grabbedManipulators.size>0&&(this._stopDrag=!0),this._stopDrag&&(o(),"end"===e.action&&(this._stopDrag=!1));break;case"pointer-down":if(!l(e)||u(e))break;var a=n.createScreenPointFromEvent(e),s=this._intersect(a,e.pointerType,t.forEachTool);if(i.isNone(s))break;var d=this._findManipulatorByKey(s,t.forEachTool);i.isSome(d)&&d.interactive&&!d.grabbing&&(this._grabbedManipulators.set(e.pointerId,{key:s,start:a}),1===this._grabbedManipulators.size&&(this._revertToActiveTool=t.activeTool,t.setActiveTool(s.tool)),d.grabbing=!0,d.events.emit("grab-changed",{action:"start",screenPoint:a}),o());break;case"pointer-up":this._handlePointerEnd(e,t);break;case"pointer-drag":if(!l(e))break;var h=this._grabbedManipulators.get(e.pointerId),y=this._draggedManipulators.get(e.pointerId),f=i.applySome(h||y,(function(e){return e.key})),v=this._findManipulatorByKey(f,t.forEachTool);if(i.isNone(v))break;(a=n.createScreenPointFromEvent(e)).x=r.clamp(a.x,0,t.view.width),a.y=r.clamp(a.y,0,t.view.height);var g=i.expect(h||y).start,_={action:e.action,start:g,screenPoint:a};switch(e.action){case"start":case"update":"update"!==_.action&&1!==this._grabbedManipulators.size||(v.dragging=!0,y||(_.action="start"),v.events.emit("drag",_),this._draggedManipulators.set(e.pointerId,{key:i.expect(f),start:g}));break;case"end":v.dragging=!1,y&&v.events.emit("drag",_),this._draggedManipulators.delete(e.pointerId),this._handlePointerEnd(e,t)}o();break;case"immediate-click":a=n.createScreenPointFromEvent(e),s=this._intersect(a,e.pointerType,t.forEachTool);var b=this._findToolAndManipulatorByKey(s,t.forEachTool,c);if(u(e)||t.forEachTool((function(e){if((!b||c.tool!==e||!e.selectionManagementDisabled)&&e.manipulators){var t=!1;e.manipulators.forEach((function(e){var o=e.manipulator;o.selected&&(o.selected=!1,t=!0)})),t&&e.manipulatorSelectionChanged&&e.manipulatorSelectionChanged()}})),!b)break;d=c.manipulator;var m=c.tool;if(!d.interactive)break;d.selectable&&!m.selectionManagementDisabled&&(d.selected=!d.selected,m.manipulatorSelectionChanged&&m.manipulatorSelectionChanged());var M=e.native.shiftKey;d.events.emit("immediate-click",{screenPoint:a,button:e.button,pointerType:e.pointerType,shiftKey:M,stopPropagation:o});break;case"click":a=n.createScreenPointFromEvent(e),s=this._intersect(a,e.pointerType,t.forEachTool),d=this._findManipulatorByKey(s,t.forEachTool);if(i.isNone(d)||!d.interactive)break;M=e.native.shiftKey;d.events.emit(e.type,{screenPoint:a,button:e.button,pointerType:e.pointerType,shiftKey:M}),o();break;case"double-click":a=n.createScreenPointFromEvent(e),s=this._intersect(a,e.pointerType,t.forEachTool),d=this._findManipulatorByKey(s,t.forEachTool);if(i.isNone(d)||!d.interactive)break;M=e.native.shiftKey;d.events.emit("double-click",{screenPoint:a,button:e.button,pointerType:e.pointerType,shiftKey:M,stopPropagation:o})}this._updateCursor(t.forEachTool)},e.prototype._handlePointerEnd=function(e,t){var o=i.applySome(this._grabbedManipulators.get(e.pointerId),(function(e){return e.key})),r=this._findManipulatorByKey(o,t.forEachTool);if(i.isSome(r)&&!r.dragging){var a=i.isSome(t.creatingTool)&&t.creatingTool===i.expect(o).tool;1!==this._grabbedManipulators.size||0!==this._draggedManipulators.size||a||(t.setActiveTool(this._revertToActiveTool),this._revertToActiveTool=null),r.grabbing&&(r.grabbing=!1,r.events.emit("grab-changed",{action:"end",screenPoint:n.createScreenPointFromEvent(e)})),this._grabbedManipulators.delete(e.pointerId)}},e.prototype._cursorFromMap=function(e,t){var r=this,n=null;return o.someMap(e,(function(e){var o=e.key,a=r._findManipulatorByKey(o,t);return!!(i.isSome(a)&&a.interactive&&"cursor"in a&&a.cursor)&&(n=a.cursor,!0)})),n},e.prototype._updateCursor=function(e){this._grabbedManipulators.size>0?this._cursor=this._cursorFromMap(this._grabbedManipulators,e)||"grabbing":this._hoveredManipulators.size>0?this._cursor=this._cursorFromMap(this._hoveredManipulators,e)||"pointer":this._cursor=null},e.prototype.clearPointers=function(e,t,o,r){var n=this;void 0===o&&(o=!0);var a=function(t){return t.tool===e&&(i.isNone(r)||t.manipulatorId===r)};this._grabbedManipulators.forEach((function(e,o){var r=e.key;if(a(r)){n._grabbedManipulators.delete(o);var s=n._findManipulatorByKey(r,t);i.isSome(s)&&(s.grabbing=!1,s.events.emit("grab-changed",{action:"end",screenPoint:null}))}})),this._draggedManipulators.forEach((function(e,o){var r=e.key;if(a(r)){n._draggedManipulators.delete(o);var s=n._findManipulatorByKey(r,t);i.isSome(s)&&(s.dragging=!1,s.events.emit("drag",{action:"cancel",screenPoint:null,start:null}))}})),o&&this._hoveredManipulators.forEach((function(e,o){var r=e.key;if(a(r)){n._hoveredManipulators.delete(o);var s=n._findManipulatorByKey(r,t);i.isSome(s)&&(s.hovering=!1)}})),this._updateCursor(t)},e.prototype._intersect=function(e,t,o){var r=null;return o((function(o){if(null==o.manipulators||!a.areToolManipulatorsEditable(o))return!1;var n=o.manipulators.intersect(e,t);return!i.isNone(n)&&(r={manipulatorId:n,tool:o},!0)})),r},e.prototype.updateHoveredStateFromKnownPointers=function(e){var t=this;this._pointerLocations.forEach((function(o,r){t._updateHoveredStateForPointerAtScreenPosition(n.createScreenPoint(o.x,o.y),r,o.pointerType,e)}))},e.prototype.handleHoverEvent=function(e,t){"pointer-up"!==e.type&&"immediate-click"!==e.type&&"pointer-move"!==e.type||!p(e.pointerType)||this._updateHoveredStateForPointerAtScreenPosition(n.createScreenPointFromEvent(e),e.pointerId,e.pointerType,t)},e.prototype._updateHoveredStateForPointerAtScreenPosition=function(e,t,o,r){var n=this._intersect(e,o,r),a=this._findManipulatorByKey(n,r),s=i.applySome(this._hoveredManipulators.get(t),(function(e){return e.key})),p=this._findManipulatorByKey(s,r);i.isSome(a)&&!a.interactive&&(a=null),p!==a&&(i.isSome(p)&&(p.hovering=!1),i.isSome(a)?(a.hovering=!0,this._hoveredManipulators.set(t,{key:i.expect(n)})):this._hoveredManipulators.delete(t),this._updateCursor(r))},e.prototype._findManipulatorByKey=function(e,t){return this._findToolAndManipulatorByKey(e,t,c)?c.manipulator:null},e.prototype._findToolAndManipulatorByKey=function(e,t,o){return i.isNone(e)?null:(o.tool=null,o.manipulator=null,t((function(t){if(t!==e.tool||null==t.manipulators||!a.areToolManipulatorsEditable(t))return!1;var r=t.manipulators.findById(e.manipulatorId);return!!i.isSome(r)&&(o.manipulator=r,o.tool=t,!0)})),null!=o.manipulator)},e}();function p(e){return"mouse"===e}function l(e){return"mouse"!==e.pointerType||0===e.button}function u(e){return!!e.native.shiftKey}t.default=s;var c={manipulator:null,tool:null}}));