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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","dojo/i18n!../nls/common","dojo/i18n!./BasemapLayerList/nls/BasemapLayerList","../core/Collection","../core/deprecate","../core/events","../core/HandleOwner","../core/has","../core/Logger","../core/watchUtils","../core/accessorSupport/decorators","../libs/sortablejs/Sortable","./Widget","./BasemapLayerList/BasemapLayerListViewModel","./LayerList/ListItem","./support/widget"],(function(e,t,i,s,r,a,n,l,o,c,d,p,u,h,y,b,_,m,g,f){var v=l.ofType(g);function I(e,t,i){e.splice(i,0,e.splice(t,1)[0])}var x="esri-basemap-layer-list esri-widget esri-widget--panel",L="esri-basemap-layer-list--new-ui",w="esri-basemap-layer-list__title-container",S="esri-basemap-layer-list__main-heading",A="esri-basemap-layer-list__editing-card",k="esri-basemap-layer-list__editing-input",E="esri-basemap-layer-list__editing-actions",T="esri-basemap-layer-list__edit-button",O="esri-basemap-layer-list__edit-button-icon",C="esri-basemap-layer-list__no-items",B="esri-basemap-layer-list__hr",R="esri-basemap-layer-list__list-heading",M="esri-basemap-layer-list__list",N="esri-basemap-layer-list__list--root",U="esri-basemap-layer-list__list--exclusive",P="esri-basemap-layer-list__list--inherited",V="esri-basemap-layer-list__list--independent",H="esri-basemap-layer-list__item",F="esri-basemap-layer-list__item--only-child",K="esri-basemap-layer-list__item--error",j="esri-basemap-layer-list__item--invisible",D="esri-basemap-layer-list__item--invisible-at-scale",z="esri-basemap-layer-list__item--updating",q="esri-basemap-layer-list__item--has-children",W="esri-basemap-layer-list__item--selectable",G="esri-basemap-layer-list__item-container",J="esri-basemap-layer-list__item-actions-menu",Q="esri-basemap-layer-list__item-actions-menu-item",X="esri-basemap-layer-list__item-actions-menu-item--active",Y="esri-basemap-layer-list__item-actions",Z="esri-basemap-layer-list__item-actions-list",$="esri-basemap-layer-list__item-action",ee="esri-basemap-layer-list__item-action-icon",te="esri-basemap-layer-list__item-action-image",ie="esri-basemap-layer-list__item-action-title",se="esri-basemap-layer-list__action-toggle",re="esri-basemap-layer-list__action-toggle--on",ae="esri-basemap-layer-list__item-label",ne="esri-basemap-layer-list__item-error-message",le="esri-basemap-layer-list__item-title",oe="esri-basemap-layer-list__item-toggle",ce="esri-basemap-layer-list__item-toggle-icon",de="esri-basemap-layer-list__item-toggle-icon",pe="esri-basemap-layer-list__item-radio-icon",ue="esri-basemap-layer-list__child-toggle",he="esri-basemap-layer-list__child-toggle--open",ye="esri-basemap-layer-list__child-toggle-icon--opened",be="esri-basemap-layer-list__child-toggle-icon--closed",_e="esri-basemap-layer-list__child-toggle-icon--closed-rtl",me="esri-button",ge="esri-button--tertiary",fe="esri-input",ve="esri-disabled",Ie="esri-disabled-element",xe="esri-hidden",Le="esri-rotating",we="esri-widget__heading",Se="esri-icon-edit",Ae="esri-icon-handle-horizontal",ke="esri-icon-visible",Ee="esri-icon-non-visible",Te="esri-icon-radio-checked",Oe="esri-icon-radio-unchecked",Ce="esri-icon-notice-triangle",Be="esri-icon-down-arrow",Re="esri-icon-right-triangle-arrow",Me="esri-icon-left-triangle-arrow",Ne="esri-icon-loading-indicator",Ue="esri-icon-default-action",Pe="esri-icon-layers",Ve="base-items",He="reference-items",Fe="exclusive",Ke="inherited";function je(e){var t=e.actionsOpen,i=e.children;t&&(e.actionsOpen=!1),i.forEach((function(e){return je(e)}))}var De=u.getLogger("esri.widgets.BasemapLayerList"),ze={statusIndicators:!0};return function(e){function t(t){var i=e.call(this,t)||this;return i._editingTitle=!1,i._editTitleInput=null,i._editTitleButton=null,i._focusOnElement=null,i._sortableBaseLayers=null,i._sortableReferenceLayers=null,i._sortableBaseLayersNode=null,i._sortableReferenceLayersNode=null,i._focusSortUid=null,i._newUI=p("esri-basemaplayerlist-new-ui"),i.basemapTitle=null,i.baseListItemCreatedFunction=null,i.editingEnabled=!1,i.iconClass=Pe,i.label=n.widgetLabel,i.multipleSelectionEnabled=!1,i.referenceListItemCreatedFunction=null,i.baseItems=null,i.referenceItems=null,i.selectedItems=new v,i.view=null,i.viewModel=new m,i.visibleElements=r({},ze),i}return i(t,e),t.prototype.postInitialize=function(){var e=this,t=this.baseItems,i=this.referenceItems;this.own([h.on(this,"baseItems","change",(function(){e._itemsChanged(t,Ve),e._toggleSortingBaseLayers()})),h.on(this,"referenceItems","change",(function(){return e._itemsChanged(i,He)})),h.init(this,"editingEnabled",(function(){return e._toggleSorting()}))])},t.prototype.destroy=function(){this._destroyBaseSortable(),this._destroyReferenceSortable()},Object.defineProperty(t.prototype,"statusIndicatorsVisible",{set:function(e){o.deprecatedProperty(De,"statusIndicatorsVisible",{replacement:"visibleElements.statusIndicators",version:"4.15"}),this.visibleElements=r({},this.visibleElements,{statusIndicators:e})},enumerable:!0,configurable:!0}),t.prototype.castVisibleElements=function(e){return r({},ze,e)},t.prototype.triggerAction=function(e,t){this.viewModel.triggerAction(e,t)},t.prototype.render=function(){var e,t=this.viewModel.state,i=((e={})[L]=this._newUI,e[xe]="loading"===t,e[ve]="disabled"===t,e);return f.tsx("div",{class:this.classes(x,i)},this._renderTitleContainer(),this._renderReferenceSection(),this._renderBaseSection())},t.prototype._destroyReferenceSortable=function(){var e=this._sortableReferenceLayers;e&&e.destroy(),this._sortableReferenceLayersNode=null},t.prototype._destroyBaseSortable=function(){var e=this._sortableBaseLayers;e&&e.destroy(),this._sortableBaseLayersNode=null},t.prototype._toggleEditingTitle=function(){var e=!this._editingTitle;this._editingTitle=e,this._focusOnElement=e?"edit-input":"edit-button",this.scheduleRender()},t.prototype._storeEditTitleInput=function(e){this._editTitleInput=e,this._focusEditElement()},t.prototype._focusEditElement=function(){this._editTitleInput&&"edit-input"===this._focusOnElement&&(this._focusOnElement=null,this._editTitleInput.focus()),this._editTitleButton&&"edit-button"===this._focusOnElement&&(this._focusOnElement=null,this._editTitleButton.focus())},t.prototype._storeEditTitleButton=function(e){this._editTitleButton=e,this._focusEditElement()},t.prototype._formSubmit=function(e){e.preventDefault();var t=this._editTitleInput;t&&(this.basemapTitle=t.value),this._toggleEditingTitle()},t.prototype._renderTitleContainer=function(){var e=this._editingTitle,t=this.editingEnabled,i=this.viewModel.basemapTitle,s=e?f.tsx("div",{class:A},f.tsx("form",{bind:this,onsubmit:this._formSubmit},f.tsx("label",{class:k},n.basemapTitle,f.tsx("input",{bind:this,class:fe,title:n.basemapTitle,"aria-label":n.basemapTitle,placeholder:n.basemapTitle,type:"text",role:"textbox",value:i,afterCreate:this._storeEditTitleInput,afterUpdate:this._focusEditElement})),f.tsx("div",{class:E},f.tsx("button",{title:a.cancel,"aria-label":a.cancel,type:"button",bind:this,class:this.classes(me,ge),onclick:this._toggleEditingTitle},a.cancel),f.tsx("button",{title:a.form.submit,"aria-label":a.form.submit,type:"button",bind:this,class:me,onclick:this._formSubmit},a.form.ok)))):f.tsx("h2",{class:this.classes(we,S)},i),r=t&&!e?f.tsx("button",{bind:this,class:T,title:a.edit,"aria-label":a.edit,onclick:this._toggleEditingTitle,afterCreate:this._storeEditTitleButton,afterUpdate:this._focusEditElement,"data-node-ref":"_editButtonNode"},f.tsx("span",{"aria-hidden":"true",class:this.classes(Se,O)})):null;return f.tsx("div",{class:w},s,r)},t.prototype._renderNoLayersInfo=function(e,t){return f.tsx("div",{key:t,class:C},e)},t.prototype._renderList=function(e,t){var i=this,s="reference"===t?this._destroyReferenceSortable:this._destroyBaseSortable;return f.tsx("ul",{key:t,"aria-label":n.widgetLabel,role:this.editingEnabled&&e.length?"listbox":void 0,afterCreate:this._sortNodeCreated,afterRemoved:s,"data-node-ref":t,bind:this,class:this.classes(M,N,V)},e.map((function(s){return i._renderItem({item:s,parent:null,itemType:t,isOnlyChild:1===e.length})})))},t.prototype._itemMovedList=function(e){var t=e.item["data-item"],i=e.to.dataset.nodeRef,s=e.from.dataset.nodeRef,r=e.newIndex;this.viewModel.transferListItem({listItem:t,from:s,to:i,newIndex:r})},t.prototype._toggleSortingBaseLayers=function(){var e=this,t=this._sortableBaseLayers,i=this._sortableBaseLayersNode,s=this.editingEnabled;if(i){var r=!s;if(t)t.option("disabled",r);else{var a=b.create(i,{dataIdAttr:"data-layer-uid",group:"root-layers",filter:"."+F,fallbackTolerance:4,disabled:r,onSort:function(){return e._sortLayersToItems({type:"base",itemIds:a.toArray()})},onAdd:function(t){return e._itemMovedList(t)}});this._sortableBaseLayers=a}}},t.prototype._toggleSortingReferenceLayers=function(){var e=this,t=this._sortableReferenceLayers,i=this._sortableReferenceLayersNode,s=this.editingEnabled;if(i){var r=!s;if(t)t.option("disabled",r);else{var a=b.create(i,{dataIdAttr:"data-layer-uid",group:"root-layers",disabled:r,fallbackTolerance:4,onSort:function(){return e._sortLayersToItems({type:"reference",itemIds:a.toArray()})},onAdd:function(t){return e._itemMovedList(t)}});this._sortableReferenceLayers=a}}},t.prototype._toggleSorting=function(){this._toggleSortingBaseLayers(),this._toggleSortingReferenceLayers()},t.prototype._sortNodeCreated=function(e){var t=e.getAttribute("data-node-ref");"base"===t&&(this._sortableBaseLayersNode=e),"reference"===t&&(this._sortableReferenceLayersNode=e),this._toggleSorting()},t.prototype._renderBaseSection=function(){var e=this.baseItems,t=this._getItems(e),i=f.tsx("h3",{class:this.classes(we,R)},n.baseHeading),s=this._renderList(t,"base"),r=[0===t.length?this._renderNoLayersInfo(n.noBaseLayers,"base"):null,s];return[f.tsx("hr",{class:B}),i,r]},t.prototype._renderReferenceSection=function(){var e=this.referenceItems,t=this._getItems(e),i=f.tsx("h3",{class:this.classes(we,R)},n.referenceHeading),s=this._renderList(t,"reference");return[i,[0===t.length?this._renderNoLayersInfo(n.noReferenceLayers,"reference"):null,s]]},t.prototype._getItems=function(e){var t=this;return e.toArray().filter((function(e){return t.errorsVisible||!e.error}))},t.prototype._getSingleActionButton=function(e){return e.actionsSections.reduce((function(e){return e})).filter((function(e){return e&&"button"===e.type})).getItemAt(0)},t.prototype._renderItem=function(e){var t,i,s,l,o,c,d,p=this,u=e.item,h=e.parent,y=e.itemType,b=e.isOnlyChild,_=this.id+"_"+u.uid,m=_+"_actions",g=_+"__list",v=_+"__title",I=this._newUI,x=u.children.length,L=!!u.error,w=!!x&&!L,S=L?n.layerError:"",A=u.visibilityMode,k=u.children&&u.children.toArray(),E=Fe,T=Ke,O=((t={})[U]=A===E,t[P]=A===T,t[V]=A!==T&&A!==E,t),C=((i={})[q]=w,i[K]=!!L,i[z]=u.updating&&!h&&this.visibleElements.statusIndicators,i[j]=I&&!u.visible,i[D]=!u.visibleAtCurrentScale,i[W]=this.editingEnabled,i),B=this._countActions(u.actionsSections),R=u.panel,N=R&&R.open?R.render():null,Y=R&&R.visible?this._renderPanelButton(R):null,Z=((s={})[X]=u.actionsOpen,s),$=u.actionsOpen?a.close:a.open,ee=1===B&&this._getSingleActionButton(u),te=ee?this._renderAction({item:u,action:ee,singleAction:!0}):null,ie=!ee&&B?f.tsx("div",{key:"actions-menu-toggle","data-item":u,bind:this,onclick:this._toggleActionsOpen,onkeydown:this._toggleActionsOpen,class:this.classes(Q,Z),tabindex:"0",role:"button","aria-controls":m,"aria-label":$,title:$},f.tsx("span",{"aria-hidden":"true",class:Ae})):null,se=ie||Y||te?f.tsx("div",{key:"esri-basemap-layer-list__actions-menu",class:J},Y,te,ie):null,re=B?this._renderActionsSections(u,u.actionsSections,m):null,ae=w?f.tsx("ul",{key:"esri-basemap-layer-list__list-items",id:g,class:this.classes(M,O),"aria-expanded":u.open?"true":"false",role:A===E?"radiogroup":"group",hidden:!u.open||null},k.map((function(e){return p._renderItem({item:e,parent:u})}))):null,le=((l={})[he]=u.open,l),oe=u.open?a.collapse:a.expand,ce=w?f.tsx("span",{onclick:this._toggleChildrenClick,onkeydown:this._toggleChildrenClick,"data-item":u,key:"esri-basemap-layer-list__toggle-children",class:this.classes(ue,le),tabindex:"0",role:"button","aria-controls":g,"aria-label":oe,title:oe},f.tsx("span",{"aria-hidden":"true",class:this.classes(be,Re)}),f.tsx("span",{"aria-hidden":"true",class:this.classes(ye,Be)}),f.tsx("span",{"aria-hidden":"true",class:this.classes(_e,Me)})):null,de=this._createLabelNode(u,h,v),pe=L?f.tsx("div",{key:"esri-basemap-layer-list__error",class:ne,role:"alert"},f.tsx("span",null,S)):null,me=this.selectedItems.indexOf(u)>-1,ge=h?null:u.get("layer.uid"),fe=((o={})["data-layer-uid"]=ge,o),ve=f.tsx("div",{key:"esri-basemap-layer-list__list-item-container",class:G},ce,de,se);return this.editingEnabled?f.tsx("li",r({key:u,bind:this,onclick:this._toggleSelection,onkeydown:this._selectionKeydown,"data-item":u,"data-item-type":y,tabIndex:0,"aria-labelledby":v,afterCreate:this._focusListItem,afterUpdate:this._focusListItem,class:this.classes(H,C,(c={},c[F]=b,c)),"aria-selected":me?"true":"false",role:"option"},fe),ve,pe,re,N,ae):f.tsx("li",{key:u,class:this.classes(H,C,(d={},d[F]=b,d))},ve,pe,re,N,ae)},t.prototype._sortLayersToItems=function(e){var t=e.type,i=e.itemIds,s="base"===t?this.get("view.map.basemap.baseLayers"):"reference"===t?this.get("view.map.basemap.referenceLayers"):null;s&&s.sort((function(e,t){var s=i.indexOf(e.uid),r=i.indexOf(t.uid);return s>r?-1:s<r?1:0}))},t.prototype._focusListItem=function(e){var t=this._focusSortUid;e&&t&&(e.dataset.layerUid===t&&(e.focus(),this._focusSortUid=null))},t.prototype._selectionKeydown=function(e){var t=c.eventKey(e);if(-1!==["ArrowDown","ArrowUp"].indexOf(t)){e.stopPropagation();var i=e.currentTarget,s=i["data-item"],r=i.dataset.itemType,a=this._sortableBaseLayers,n=this._sortableReferenceLayers,l="base"===r?a:"reference"===r?n:null,o=this.selectedItems.indexOf(s)>-1,d=l.toArray(),p=e.target,u=d.indexOf(p.dataset.layerUid),h=this.viewModel,y=h.baseItems,b=h.referenceItems;if(-1!==u){if("ArrowDown"===t){var _=(f=u+1)>=d.length;if(_&&"reference"===r&&o){var m=y.length;return this.viewModel.transferListItem({listItem:s,from:"reference",to:"base",newIndex:m}),this._focusSortUid=s.get("layer.uid"),void this.scheduleRender()}if(_&&"reference"===r){var g=y.getItemAt(0);return this._focusSortUid=g&&g.get("layer.uid"),void this.scheduleRender()}if(_)return;return o&&(I(d,u,f),l.sort(d),this._sortLayersToItems({type:r,itemIds:l.toArray()})),this._focusSortUid=d[f],void this.scheduleRender()}if("ArrowUp"===t){var f,v=(f=u-1)<0;if(v&&"base"===r&&o){if(1===y.length)return;m=0;return this.viewModel.transferListItem({listItem:s,from:"base",to:"reference",newIndex:m}),this._focusSortUid=s.get("layer.uid"),void this.scheduleRender()}if(v&&"base"===r){g=b.getItemAt(b.length-1);return this._focusSortUid=g&&g.get("layer.uid"),void this.scheduleRender()}if(v)return;o&&(I(d,u,f),l.sort(d),this._sortLayersToItems({type:r,itemIds:l.toArray()})),this._focusSortUid=d[f],this.scheduleRender()}}}else this._toggleSelection(e)},t.prototype._createLabelNode=function(e,t,i){var s,r=this.editingEnabled,a=this._newUI,l=Fe,o=Ke,c=t&&t.visibilityMode,d=((s={})[ce]=a,s[de]=a&&c!==l,s[pe]=a&&c===l,s[Te]=c===l&&e.visible,s[Oe]=c===l&&!e.visible,s[ke]=c!==l&&!a&&e.visible,s[Ee]=c!==l&&(a||!e.visible),s),p=c===l?"radio":"switch",u=e.title||n.untitledLayer,h=e.visibleAtCurrentScale?u:u+" ("+n.layerInvisibleAtScale+")",y=f.tsx("span",{key:"layer-title-container",id:i,title:h,"aria-label":h,class:le},u),b=f.tsx("span",{class:this.classes(d),"aria-hidden":"true"}),_=[r?f.tsx("span",{key:"label-icon",class:oe,bind:this,onclick:this._toggleVisibility,onkeydown:this._toggleVisibility,"data-item":e,"data-parent-visibility":c,tabIndex:0,"aria-checked":e.visible?"true":"false",role:p,"aria-labelledby":i},b):f.tsx("span",{key:"label-icon",class:oe},b),y];a&&_.reverse();var m=r?f.tsx("div",{key:"label",class:ae},_):f.tsx("div",{key:"label",class:ae,bind:this,onclick:this._toggleVisibility,onkeydown:this._toggleVisibility,"data-item":e,"data-parent-visibility":c,tabIndex:0,"aria-checked":e.visible?"true":"false",role:p,"aria-labelledby":i},_),g=!!e.error,v=g?f.tsx("span",{key:"notice-triangle","aria-hidden":"true",class:Ce}):null;return c===o||g?f.tsx("div",{key:e,class:ae},v,y):m},t.prototype._renderPanelButton=function(e){var t,i,s=e.className,r=e.open,a=e.title,n=e.image||s?s:Ue,l=this._getIconImageStyles(e),o=((t={})[X]=r,t),c=((i={})[te]=!!l["background-image"],i);return n&&(c[n]=!!n),f.tsx("div",{key:e,bind:this,"data-panel":e,onclick:this._triggerPanel,onkeydown:this._triggerPanel,class:this.classes(Q,o),role:"button",tabindex:"0",title:a,"aria-label":a},f.tsx("span",{class:this.classes(c),styles:l}))},t.prototype._watchActionSectionChanges=function(e,t){var i=this;this.handles.add(e.on("change",(function(){return i.scheduleRender()})),t),e.forEach((function(e){return i._renderOnActionChanges(e,t)}))},t.prototype._renderOnActionChanges=function(e,t){var i=this;"toggle"!==e.type?"slider"!==e.type?this.handles.add([h.init(e,["className","image","id","title","visible"],(function(){return i.scheduleRender()}))],t):this.handles.add([h.init(e,["className","id","title","visible","value","displayValueEnabled","max","min","step"],(function(){return i.scheduleRender()}))],t):this.handles.add([h.init(e,["className","image","id","title","visible","value"],(function(){return i.scheduleRender()}))],t)},t.prototype._renderOnItemChanges=function(e,t){var i=this;this.handles.add([h.init(e,["actionsOpen","visible","open","updating","title","visibleAtCurrentScale","error","visibilityMode","panel","panel.title","panel.content","panel.className"],(function(){return i.scheduleRender()})),e.actionsSections.on("change",(function(){return i.scheduleRender()})),e.children.on("change",(function(){return i.scheduleRender()}))],t),e.children.forEach((function(e){return i._renderOnItemChanges(e,t)})),e.actionsSections.forEach((function(e){return i._watchActionSectionChanges(e,t)}))},t.prototype._itemsChanged=function(e,t){var i=this;this.handles.remove(t),e.forEach((function(e){return i._renderOnItemChanges(e,t)})),this.scheduleRender()},t.prototype._renderActionsSections=function(e,t,i){var s=this,r=t.toArray().map((function(t){return f.tsx("ul",{key:t,class:Z},s._renderActionSection(e,t))}));return f.tsx("div",{role:"group","aria-expanded":e.actionsOpen?"true":"false",key:"esri-basemap-layer-list__actions-section",id:i,class:Y,hidden:!e.actionsOpen||null},r)},t.prototype._renderActionSection=function(e,t){var i=this;return(t&&t.toArray()).map((function(t){return i._renderAction({item:e,action:t})}))},t.prototype._renderAction=function(e){var t,i,s=e.item,r=e.action,a=e.singleAction,n=this._getIconImageStyles(r),l=r.active,o=r.className,c=r.disabled,d=r.title,p="button"!==r.type||r.image||o?o:Ue,u=((t={})[Q]=a&&"button"===r.type,t[$]=!a&&"toggle"!==r.type,t[se]="toggle"===r.type,t[re]="toggle"===r.type&&r.value,t[Ie]=c,t),h=((i={})[te]=!l&&!!n["background-image"],i[Ne]=l,i[Le]=l,i);p&&(h[p]=!0);var y=[f.tsx("span",{key:"action-icon","aria-hidden":"true",class:this.classes(ee,h),styles:n}),a?null:f.tsx("span",{key:"action-title",class:ie},d)];return a?f.tsx("div",{bind:this,"data-item":s,"data-action":r,role:s.actionsOpen?"button":null,key:r,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:u,tabindex:"0",title:d,"aria-label":d},y):f.tsx("li",{bind:this,"data-item":s,"data-action":r,key:r,onclick:this._triggerAction,onkeydown:this._triggerAction,classes:u,tabindex:"0",role:s.actionsOpen?"button":null,title:d,"aria-label":d},y)},t.prototype._countActions=function(e){return e.reduce((function(e,t){return e+t.length}),0)},t.prototype._getIconImageStyles=function(e){var t="esri.widgets.LayerList.ListItemPanel"===e.declaredClass||"esri.support.Action.ActionButton"===e.declaredClass||"esri.support.Action.ActionToggle"===e.declaredClass?e.image:null;return{"background-image":t?'url("'+t+'")':null}},t.prototype._toggleActionsOpen=function(e){e.stopPropagation();var t=e.currentTarget["data-item"],i=!t.actionsOpen,s=this.baseItems,r=this.referenceItems;i&&(s.forEach((function(e){return je(e)})),r.forEach((function(e){return je(e)}))),t.actionsOpen=i},t.prototype._triggerPanel=function(e){e.stopPropagation();var t=e.currentTarget["data-panel"];t&&(t.open=!t.open)},t.prototype._triggerAction=function(e){e.stopPropagation();var t=e.currentTarget,i=t["data-action"],s=t["data-item"];"toggle"===i.type&&(i.value=!i.value),this.triggerAction(i,s)},t.prototype._toggleVisibility=function(e){e.stopPropagation();var t=e.currentTarget,i=t.getAttribute("data-parent-visibility"),s=t["data-item"];i===Fe&&s.visible||(s.visible=!s.visible)},t.prototype._toggleChildrenClick=function(e){e.stopPropagation();var t=e.currentTarget["data-item"];t.open=!t.open},t.prototype._toggleSelection=function(e){e.stopPropagation();var t=this.multipleSelectionEnabled,i=this.selectedItems,s=t&&(e.metaKey||e.ctrlKey),r=e.currentTarget["data-item"],a=i.indexOf(r)>-1,n=i.length;if(!s)return n&&!(a&&1===n)?(i.removeAll(),void i.add(r)):void(a?i.remove(r):i.add(r));a?i.remove(r):i.add(r)},s([y.aliasOf("viewModel.basemapTitle")],t.prototype,"basemapTitle",void 0),s([y.aliasOf("viewModel.baseListItemCreatedFunction"),f.renderable()],t.prototype,"baseListItemCreatedFunction",void 0),s([y.property(),f.renderable()],t.prototype,"editingEnabled",void 0),s([y.property(),f.renderable()],t.prototype,"errorsVisible",void 0),s([y.property()],t.prototype,"iconClass",void 0),s([y.property()],t.prototype,"label",void 0),s([y.property()],t.prototype,"multipleSelectionEnabled",void 0),s([y.aliasOf("viewModel.referenceListItemCreatedFunction"),f.renderable()],t.prototype,"referenceListItemCreatedFunction",void 0),s([y.aliasOf("viewModel.baseItems"),f.renderable()],t.prototype,"baseItems",void 0),s([y.aliasOf("viewModel.referenceItems"),f.renderable()],t.prototype,"referenceItems",void 0),s([y.property(),f.renderable()],t.prototype,"selectedItems",void 0),s([y.property(),f.renderable()],t.prototype,"statusIndicatorsVisible",null),s([y.aliasOf("viewModel.view"),f.renderable()],t.prototype,"view",void 0),s([f.vmEvent("trigger-action"),y.property({type:m}),f.renderable("viewModel.state")],t.prototype,"viewModel",void 0),s([y.property(),f.renderable()],t.prototype,"visibleElements",void 0),s([y.cast("visibleElements")],t.prototype,"castVisibleElements",null),s([f.accessibleHandler()],t.prototype,"_toggleActionsOpen",null),s([f.accessibleHandler()],t.prototype,"_triggerPanel",null),s([f.accessibleHandler()],t.prototype,"_triggerAction",null),s([f.accessibleHandler()],t.prototype,"_toggleVisibility",null),s([f.accessibleHandler()],t.prototype,"_toggleChildrenClick",null),s([f.accessibleHandler()],t.prototype,"_toggleSelection",null),t=s([y.subclass("esri.widgets.BasemapLayerList")],t)}(y.declared(d.HandleOwnerMixin(_)))}));