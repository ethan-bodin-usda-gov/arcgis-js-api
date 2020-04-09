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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","@dojo/framework/shim/Map","dojo/i18n!../nls/common","dojo/i18n!./Editor/nls/Editor","dojo/i18n!./FeatureTemplates/nls/FeatureTemplates","../intl","../core/events","../core/HandleOwner","../core/watchUtils","../core/accessorSupport/decorators","../layers/support/fieldUtils","./Attachments","./FeatureForm","./FeatureTemplates","./Spinner","./Widget","./Editor/EditorViewModel","./FeatureTemplates/ItemList","./support/widget"],(function(e,t,r,i,a,n,o,s,l,d,c,u,p,h,f,v,m,w,_,y,g,k,b){var M="esri-editor esri-widget",x="esri-editor__header",A="esri-editor__scroller",F="esri-editor__content",W="esri-editor__content-group",T="esri-editor__temp-wrapper",C="esri-editor__message",H="esri-editor__controls",E="esri-editor__title",I="esri-editor__back-button",D="esri-editor__mode-selection",S="esri-editor__progress-bar",U="esri-editor__warning-card",L="esri-editor__warning-header",B="esri-editor__warning-heading",O="esri-editor__warning-message",V="esri-editor__warning-divider",P="esri-editor__warning-option",R="esri-editor__warning-option--primary",j="esri-editor__warning-option--negative",q="esri-editor__warning-option--positive",K="esri-editor__feature-list-item",G="esri-editor__feature-list-item--disabled",N="esri-editor__feature-list-name",z="esri-editor__feature-list-icon",J="esri-editor__control-button",Q="esri-editor__overlay",X="esri-icon-right",Y="esri-icon-left",Z="esri-icon-notice-triangle",$="esri-icon-edit",ee="esri-button",te="esri-button--disabled",re="esri-button--secondary",ie="esri-button--tertiary",ae="esri-heading",ne="esri-interactive";function oe(e){e.focus()}return function(e){function t(t){var r=e.call(this,t)||this;return r._candidateCommitted=!1,r._featureForm=new m,r._attachments=new v({visibleElements:{addSubmitButton:!1,cancelAddButton:!1,cancelUpdateButton:!1,deleteButton:!1,errorMessage:!1,progressBar:!1,updateButton:!1}}),r._featureTemplates=new w,r._filterText="",r._prompt=null,r._spinner=new _,r.activeWorkflow=null,r.allowedWorkflows=null,r.iconClass=$,r.label=s.widgetLabel,r.layerInfos=null,r.supportingWidgetDefaults=null,r.view=null,r.viewModel=new g,r._handleHeaderClickOrKeyDown=function(e){e.currentTarget["data-prevent-back"]||r._handleBack.call(r,e)},r._setCandidateFeature=function(e,t){if(void 0===t&&(t=!1),!r._candidateCommitted){var i=r.viewModel.activeWorkflow;i.data.edits.feature=e,t&&(i.next(),r._candidateCommitted=!0)}},r._handleSave=r._handleSave.bind(r),r._handleBack=r._handleBack.bind(r),r._handleDone=r._handleDone.bind(r),r._handleDelete=r._handleDelete.bind(r),r._handleAdd=r._handleAdd.bind(r),r._handleEdit=r._handleEdit.bind(r),r._handleAttachmentAdd=r._handleAttachmentAdd.bind(r),r._handleAttachmentUpdate=r._handleAttachmentUpdate.bind(r),r._handleAttachmentDelete=r._handleAttachmentDelete.bind(r),r}return r(t,e),t.prototype.postInitialize=function(){var e=this;this.own([p.init(this,"viewModel",(function(t){e._featureForm.viewModel=t?t.featureFormViewModel:null,e._attachments.viewModel=t?t.attachmentsViewModel:null,e._featureTemplates.viewModel=t?t.featureTemplatesViewModel:null,e._spinner.viewModel=t?t.spinnerViewModel:null})),p.init(this,"view",(function(t,r){var i="editor-"+e.id+"-spinner";r&&r.ui.remove(e._spinner,i),t&&t.ui.add(e._spinner,{key:i,position:"manual"})})),p.on(this,"viewModel.sketchViewModel","create",(function(){e.scheduleRender()})),p.on(this,"viewModel.activeWorkflow","cancel-request",(function(t){var r=t.controller;e._prompt={title:s.cancelRequestTitle,message:s.cancelRequestWarningMessage,options:[{label:o.form.no,type:"neutral",action:function(){return r.deny(),e._prompt=null}},{label:o.form.yes,type:"negative",action:function(){r.allow(),e._prompt=null}}]},e.scheduleRender()})),p.init(this,"supportingWidgetDefaults",(function(t){t&&(e._featureForm.set(t.featureForm),e._attachments.set(t.attachments),e._featureTemplates.set(t.featureTemplates),e.viewModel.sketchViewModel.set(t.sketch))})),p.watch(this,"_attachments.error",(function(t){t&&(e._prompt={title:s.errorWarningTitle,message:t.message,options:[{label:o.form.ok,type:"neutral",action:function(){e._prompt=null}}]})})),p.watch(this,"viewModel.failures",(function(t){if(t){var r=t[0],i=r.error,a=r.retry,n=r.cancel;e._prompt={title:s.errorWarningTitle,message:d.substitute(s.errorWarningMessageTemplate,{errorMessage:i.message}),options:[{label:s.retry,type:"positive",action:function(){a(),e._prompt=null}},{label:s.ignore,type:"neutral",action:function(){return n(),e._prompt=null}}]}}})),p.watch(this,"viewModel.state",(function(t){"awaiting-update-feature-candidate"===t&&(e._candidateCommitted=!1)})),p.watch(this,["_attachments.selectedFile","_attachments.submitting"],(function(){return e.scheduleRender()})),p.whenNot(this,"viewModel.activeWorkflow",(function(){return e._featureTemplates.filterText=""}))])},t.prototype.destroy=function(){this._attachments.destroy(),this._featureForm.destroy(),this._featureTemplates.destroy()},t.prototype.startCreateWorkflowAtFeatureTypeSelection=function(){return this.viewModel.startCreateWorkflowAtFeatureTypeSelection()},t.prototype.startCreateWorkflowAtFeatureCreation=function(e){return this.viewModel.startCreateWorkflowAtFeatureCreation(e)},t.prototype.startCreateWorkflowAtFeatureEdit=function(e){return this.viewModel.startCreateWorkflowAtFeatureEdit(e)},t.prototype.startUpdateWorkflowAtFeatureSelection=function(){return this.viewModel.startUpdateWorkflowAtFeatureSelection()},t.prototype.startUpdateWorkflowAtMultipleFeatureSelection=function(e){return this.viewModel.startUpdateWorkflowAtMultipleFeatureSelection(e)},t.prototype.startUpdateWorkflowAtFeatureEdit=function(e){return this.viewModel.startUpdateWorkflowAtFeatureEdit(e)},t.prototype.deleteFeatureFromWorkflow=function(){return this.viewModel.deleteFeatureFromWorkflow()},t.prototype.cancelWorkflow=function(e){return this.viewModel.cancelWorkflow(e)},t.prototype.render=function(){var e=this._attachments,t=this.viewModel;if(!t)return b.tsx("div",{class:M});var r=t.state,i=this._prompt?b.tsx("div",{class:Q,key:"overlay"},this.renderPrompt({message:this._prompt.message,title:this._prompt.title,options:this._prompt.options})):null;return b.tsx("div",{class:M},t.syncing||e.submitting?this.renderProgressBar():null,"disabled"===r?null:"ready"===r?this.renderLanding():"awaiting-feature-creation-info"===r?this.renderTemplates():"editing-new-feature"===r||"editing-existing-feature"===r?this.renderAttributeEditing():"awaiting-feature-to-update"===r?this.renderFeatureUpdating():"awaiting-update-feature-candidate"===r?this.renderFeatureList():"awaiting-feature-to-create"===r?this.renderFeatureCreation():"adding-attachment"===r?this.renderAttachmentAdding():"editing-attachment"===r?this.renderAttachmentEditing():null,i)},t.prototype.renderTemplates=function(){return b.tsx("div",{class:T,key:"wrapper"},this.renderHeader(s.selectTemplate,!0),b.tsx("div",{key:"content",class:F},this._featureTemplates.render()))},t.prototype.renderAttributeEditing=function(){var e=this.viewModel,t=e.activeWorkflow,r=e.featureFormViewModel,i=t.data.edits.feature,a="update"===t.type&&!t.data.edits.modified||r.inputFields.length>0&&!r.valid,n="create"===t.type?o.add:o.update,l=[{label:n,type:"primary",disabled:a,clickHandler:this._handleSave}],c=!1;"update"===t.type&&(t.data.editableItem.hasAttachments&&(c=!0),t.data.editableItem.supports.indexOf("delete")>-1&&l.push({label:o.delete,type:"tertiary",clickHandler:this._handleDelete}));var u=this._getLabel(i);return b.tsx("div",{class:T,key:"wrapper"},this.renderHeader(u,!0),b.tsx("div",{key:"content",class:this.classes(F,A)},b.tsx("div",{class:W},r.inputFields.length>0?this._featureForm.render():this.renderMessage(d.substitute(s.clickToFinishTemplate,{button:n})),c?b.tsx("div",{key:"attachments"},b.tsx("div",null,s.attachments),this._attachments.render()):null)),this.renderControls(l))},t.prototype.renderAttachmentAdding=function(){var e=this._attachments,t=[{label:e.submitting?o.cancel:o.add,disabled:e.submitting||!e.selectedFile,type:"primary",clickHandler:this._handleAttachmentAdd}];return b.tsx("div",{class:T,key:"wrapper"},this.renderHeader(s.addAttachment,!0,e.submitting),b.tsx("div",{key:"content",class:this.classes(F,A)},e.render()),this.renderControls(t))},t.prototype.renderAttachmentEditing=function(){var e=this._attachments,t=[{label:o.update,disabled:e.submitting||!e.selectedFile,type:"primary",clickHandler:this._handleAttachmentUpdate},{label:o.delete,disabled:e.submitting,type:"tertiary",clickHandler:this._handleAttachmentDelete}];return b.tsx("div",{class:T,key:"wrapper"},this.renderHeader(s.editAttachment,!0,e.submitting),b.tsx("div",{key:"content",class:this.classes(F,A)},e.render()),this.renderControls(t))},t.prototype.renderFeatureUpdating=function(){return b.tsx("div",{class:T,key:"wrapper"},this.renderHeader(s.selectFeature,!0),b.tsx("div",{key:"content",class:this.classes(F,A)},this.renderMessage(s.selectFeatureToEdit)))},t.prototype.renderMessage=function(e){return b.tsx("div",{class:C},e)},t.prototype.renderFeatureCreation=function(){var e=this.viewModel,t=e.sketchViewModel,r=e.activeWorkflow.data.creationInfo.layer,i=t.canUndo()&&t.createGraphic?t.createGraphic:null,a=this._getSketchingTip(r.geometryType,i);return b.tsx("div",{class:T,key:"wrapper"},this.renderHeader(s.placeFeature,!0),b.tsx("div",{key:"content",class:this.classes(F,A)},this.renderMessage(a)))},t.prototype.renderControls=function(e){var t=this;return b.tsx("div",{class:H,key:"controls"},e.map((function(e,r){var i=e.disabled,a=void 0!==i&&i,n=e.label,o=e.type,s=e.clickHandler;return t.renderButton({label:n,class:t.classes(J,ee,"secondary"===o?re:"tertiary"===o?ie:null,a?te:null),disabled:a,clickHandler:s,key:r})})))},t.prototype.renderPrompt=function(e){var t=this,r=e.title,i=e.message,a=e.options,n=void 0===a?[]:a;return b.tsx("div",{class:U,role:"alert"},b.tsx("div",{class:L},b.tsx("span",{class:Z,"aria-hidden":"true"}),b.tsx("h4",{class:this.classes(ae,B)},r)),b.tsx("div",{class:O},i),b.tsx("div",{class:V}),n.map((function(e,r){var i=e.label,a=e.action,n=e.type,o=0===r;return b.tsx("div",{afterCreate:o?oe:null,class:t.classes(P,o?R:null,"positive"===n?q:"negative"===n?j:null),key:r,onclick:a,onkeydown:function(e){var t=c.eventKey(e);"Enter"!==t&&" "!==t||(e.preventDefault(),a.call(null))},tabIndex:0,role:"button"},i)})))},t.prototype.renderProgressBar=function(){return b.tsx("div",{class:this.classes(S),key:"progress-bar"})},t.prototype.renderButton=function(e){return b.tsx("button",{class:e.class,disabled:e.disabled,key:e.key,onclick:e.clickHandler},e.label)},t.prototype.renderHeader=function(e,t,r){return void 0===t&&(t=!1),void 0===r&&(r=!1),b.tsx("header",{class:x,key:"header"},t?b.tsx("div",{"aria-label":o.back,class:this.classes(I,ne,r?te:null),key:"back-button","data-prevent-back":r,onclick:this._handleHeaderClickOrKeyDown,onkeydown:this._handleHeaderClickOrKeyDown,role:"button",tabIndex:0,title:o.back},b.tsx("span",{"aria-hidden":"true",class:b.isRTL()?X:Y})):null,b.tsx("h4",{class:this.classes(E,ae)},e))},t.prototype.renderLanding=function(){var e=this.viewModel,t=e.allowedWorkflows,r=e.canCreate,i=e.canUpdate,a=b.isRTL()?Y:X;return b.tsx("div",{class:T,key:"wrapper"},this.renderHeader(s.widgetLabel),b.tsx("div",{key:"content",class:F,role:"group"},b.tsx("div",{class:D,key:"mode-selection"},t.indexOf("update")>-1?b.tsx("div",{"aria-disabled":i?"false":"true",class:this.classes(K,i?null:G),key:"update",onclick:this._handleEdit,onkeydown:this._handleEdit,role:"button",tabIndex:i?0:-1},b.tsx("span",{class:N},s.editFeature),b.tsx("span",{"aria-hidden":"true",class:this.classes(z,a)})):null,t.indexOf("create")>-1?b.tsx("div",{class:this.classes(K,r?null:G),key:"create",onclick:this._handleAdd,onkeydown:this._handleAdd,role:"button",tabIndex:r?0:-1},b.tsx("span",{class:N},s.addFeature),b.tsx("span",{"aria-hidden":"true",class:this.classes(z,a)})):null)))},t.prototype.renderFeatureList=function(){var e=this,t=this.viewModel,r=t.editableItems,i=t.activeWorkflow.data.candidates,a=d.substitute(s.multipleFeaturesTemplate,{total:i.length}),o=new n.default;i.map((function(t){return{label:e._getLabel(t),id:t.attributes[t.layer.objectIdField],data:t}})).filter((function(t){var r=t.label,i=t.data,a=e._filterText.toLowerCase(),n=i.layer.title;return e.viewModel.editableItems.find((function(e){return e.layer===i.layer})).supports.indexOf("update")>-1&&(!a||r.toLowerCase().indexOf(a)>-1||n.toLowerCase().indexOf(a)>-1)})).forEach((function(e){var t=e.data.layer;o.has(t)?o.get(t).items.push(e):o.set(t,{id:t.id,label:t.title,items:[e]})}));var c=r.filter((function(e){var t=e.layer;return o.has(t)})).map((function(e){var t=e.layer;return o.get(t)})).toArray();return b.tsx("div",{class:T,key:"wrapper"},this.renderHeader(a,!0),b.tsx("div",{key:"content",class:this.classes(F,A)},k.ItemList({id:this.id,filterText:this._filterText,items:c,messages:{filterPlaceholder:l.filterPlaceholder,noItems:l.noItems,noMatches:l.noMatches},onItemMouseEnter:function(t){var r=t.data;return e._setCandidateFeature(r)},onItemMouseLeave:function(){return e._setCandidateFeature(null)},onItemSelect:function(t){var r=t.data;return e._setCandidateFeature(r,!0)},onFilterChange:function(t){return e._filterText=t}})))},t.prototype._getSketchingTip=function(e,t){if("point"===e)return s.tips.clickToAddPoint;if("polygon"===e||"polyline"===e){if(!t)return s.tips.clickToStart;var r=t.geometry["polygon"===e?"rings":"paths"][0];return"polygon"===e&&r<4?s.tips.clickToContinue:s.tips.clickToContinueThenDoubleClickToEnd}return s.tips.clickToAddFeature},t.prototype._getLabel=function(e){var t=e.layer,r=t.objectIdField,i=e.attributes,a=f.getDisplayFieldName(t);return a&&""+i[a]||d.substitute(s.untitledFeatureTemplate,{id:i[r]})},t.prototype._handleDelete=function(){var e=this;this._prompt={title:s.deleteWarningTitle,message:s.deleteWarningMessage,options:[{label:s.keepFeature,type:"neutral",action:function(){return e._prompt=null}},{label:o.delete,type:"positive",action:function(){e.viewModel.deleteFeatureFromWorkflow(),e._prompt=null}}]}},t.prototype._handleSave=function(){this.viewModel.activeWorkflow.commit()},t.prototype._handleAttachmentAdd=function(){var e=this._attachments,t=this.viewModel.activeWorkflow;e.addAttachment().then((function(){return t.previous()}))},t.prototype._handleAttachmentUpdate=function(){var e=this._attachments,t=this.viewModel.activeWorkflow;e.updateAttachment().then((function(){return t.previous()}))},t.prototype._handleAttachmentDelete=function(){var e=this;this._prompt={title:s.deleteAttachmentWarningTitle,message:s.deleteAttachmentWarningMessage,options:[{label:s.keepAttachment,type:"neutral",action:function(){return e._prompt=null}},{label:o.delete,type:"positive",action:function(){var t=e._attachments,r=e.viewModel.activeWorkflow;t.deleteAttachment(t.viewModel.activeAttachmentInfo).then((function(){r.previous(),e._prompt=null}))}}]}},t.prototype._handleAdd=function(){this.viewModel.canCreate&&this.viewModel.startCreateWorkflowAtFeatureTypeSelection()},t.prototype._handleEdit=function(){this.viewModel.canUpdate&&this.viewModel.startUpdateWorkflowAtFeatureSelection()},t.prototype._handleDone=function(){this.viewModel.cancelWorkflow({force:!0})},t.prototype._handleBack=function(){var e=this,t=this.viewModel.activeWorkflow,r=t.stepId,i=t.data,a=t.type,n=function(){t.hasPreviousStep?t.previous():e.viewModel.cancelWorkflow({force:!0})};if("editing-new-feature"===r||"editing-existing-feature"===r&&i.edits.modified){var o="create"===a?s.cancelAddWarningMessage:s.cancelEditWarningMessage,l="create"===a?s.cancelAddTitle:s.cancelEditTitle,d="create"===a?s.continueAdding:s.continueEditing,c="create"===a?s.discardFeature:s.discardEdits;this._prompt={title:l,message:o,options:[{label:d,type:"neutral",action:function(){return e._prompt=null}},{label:c,type:"negative",action:function(){n(),e._prompt=null}}]}}else n()},i([h.property()],t.prototype,"_attachments",void 0),i([h.aliasOf("viewModel.activeWorkflow")],t.prototype,"activeWorkflow",void 0),i([h.aliasOf("viewModel.allowedWorkflows")],t.prototype,"allowedWorkflows",void 0),i([h.property()],t.prototype,"iconClass",void 0),i([h.property()],t.prototype,"label",void 0),i([h.aliasOf("viewModel.layerInfos")],t.prototype,"layerInfos",void 0),i([h.property()],t.prototype,"supportingWidgetDefaults",void 0),i([h.aliasOf("viewModel.view")],t.prototype,"view",void 0),i([h.property(),b.renderable(["viewModel.canCreate","viewModel.canUpdate","viewModel.failures","viewModel.state","viewModel.syncing","viewModel.activeWorkflow.data.edits.modified"]),b.vmEvent(["workflow-cancel","workflow-commit"])],t.prototype,"viewModel",void 0),i([b.accessibleHandler()],t.prototype,"_handleDelete",null),i([b.accessibleHandler()],t.prototype,"_handleAttachmentAdd",null),i([b.accessibleHandler()],t.prototype,"_handleAttachmentUpdate",null),i([b.accessibleHandler()],t.prototype,"_handleAttachmentDelete",null),i([b.accessibleHandler()],t.prototype,"_handleAdd",null),i([b.accessibleHandler()],t.prototype,"_handleEdit",null),i([b.accessibleHandler()],t.prototype,"_handleDone",null),i([b.accessibleHandler()],t.prototype,"_handleBack",null),t=i([h.subclass("esri.widgets.Editor")],t)}(h.declared(u.HandleOwnerMixin(y)))}));