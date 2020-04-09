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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","../core/tsSupport/assignHelper","dojo/i18n!./Attachments/nls/Attachments","../core/Error","../core/unitFormatUtils","../core/watchUtils","../core/accessorSupport/decorators","./Widget","./Attachments/AttachmentsViewModel","./Attachments/support/attachmentUtils","./support/widget"],(function(t,e,s,i,n,a,r,o,l,c,d,h,m,u,p,_){var b={addButton:!0,addSubmitButton:!0,cancelAddButton:!0,cancelUpdateButton:!0,deleteButton:!0,errorMessage:!0,progressBar:!0,updateButton:!0},f="esri-attachments",v="esri-attachments__loader-container",y="esri-attachments__loader",g="esri-attachments__container",w="esri-attachments__container--list",x="esri-attachments__container--preview",A="esri-attachments__actions",M="esri-attachments__delete-button",k="esri-attachments__add-attachment-button",F="esri-attachments__error-message",I="esri-attachments__items",E="esri-attachments__item",B="esri-attachments__item-button",S="esri-attachments__item-mask",z="esri-attachments__item-mask--icon",C="esri-attachments__image",T="esri-attachments__image--resizable",D="esri-attachments__label",H="esri-attachments__filename",O="esri-attachments__item-chevron-icon",U="esri-attachments__item-link",L="esri-attachments__item-link-overlay",R="esri-attachments__item-link-overlay-icon",V="esri-attachments__item-add-icon",N="esri-attachments__form-node",P="esri-attachments__file-fieldset",j="esri-attachments__file-label",q="esri-attachments__file-name",W="esri-attachments__file-input",X="esri-attachments__metadata",G="esri-attachments__metadata-fieldset",J="esri-attachments__progress-bar",K="esri-widget",Q="esri-button",Y="esri-button--disabled",Z="esri-button--secondary",$="esri-button--tertiary",tt="esri-button--third",et="esri-button--small",st="esri-button--half",it="esri-widget__content--empty",nt="esri-icon-right",at="esri-icon-left",rt="esri-icon-plus",ot=window.CSS;return function(t){function e(e){var s=t.call(this,e)||this;return s.abilities=null,s.displayType="list",s.graphic=null,s.label=o.widgetLabel,s.selectedFile=null,s.submitting=!1,s.viewModel=new u,s.visibleElements=r({},b),s._supportsImageOrientation=ot&&ot.supports&&ot.supports("image-orientation","from-image"),s._addAttachmentForm=null,s._updateAttachmentForm=null,s}return s(e,t),e.prototype.postInitialize=function(){var t=this;this.own(d.on(this,"viewModel.attachmentInfos","change",(function(){return t.scheduleRender()})),d.init(this,"viewModel.mode",(function(){return t._modeChanged()})))},e.prototype.castVisibleElements=function(t){return r({},b,t)},e.prototype.addAttachment=function(){var t=this,e=this._addAttachmentForm,s=this.viewModel;return this._set("submitting",!0),this._set("error",null),s.addAttachment(e).then((function(e){return t._set("submitting",!1),t._set("error",null),s.mode="view",e})).catch((function(e){throw t._set("submitting",!1),t._set("error",new l("attachments:add-attachment",o.addErrorMessage,e)),e}))},e.prototype.deleteAttachment=function(t){var e=this,s=this.viewModel;return this._set("submitting",!0),this._set("error",null),s.deleteAttachment(t).then((function(t){return e._set("submitting",!1),e._set("error",null),s.mode="view",t})).catch((function(t){throw e._set("submitting",!1),e._set("error",new l("attachments:delete-attachment",o.deleteErrorMessage,t)),t}))},e.prototype.updateAttachment=function(){var t=this,e=this.viewModel,s=this._updateAttachmentForm;return this._set("submitting",!0),this._set("error",null),e.updateAttachment(s).then((function(s){return t._set("submitting",!1),t._set("error",null),e.mode="view",s})).catch((function(e){throw t._set("submitting",!1),t._set("error",new l("attachments:update-attachment",o.updateErrorMessage,e)),e}))},e.prototype.render=function(){var t=this.submitting,e=this.viewModel.state;return _.tsx("div",{class:this.classes(f,K)},t?this._renderProgressBar():null,"loading"===e?this._renderLoading():this._renderAttachments(),this._renderErrorMessage())},e.prototype._renderErrorMessage=function(){var t=this.error,e=this.visibleElements;return t&&e.errorMessage?_.tsx("div",{key:"error-message",class:F},t.message):null},e.prototype._renderAttachments=function(){var t=this.viewModel,e=t.mode,s=t.activeAttachmentInfo;return"add"===e?this._renderAddForm():"edit"===e?this._renderDetailsForm(s):this._renderAttachmentContainer()},e.prototype._renderLoading=function(){return _.tsx("div",{class:v,key:"loader"},_.tsx("div",{class:y}))},e.prototype._renderProgressBar=function(){return this.visibleElements.progressBar?_.tsx("div",{class:J,key:"progress-bar"}):null},e.prototype._renderAddForm=function(){var t,e=this.submitting,s=this.selectedFile,i=e||!s,n=this.visibleElements.cancelAddButton?_.tsx("button",{type:"button",bind:this,disabled:e,onclick:this._cancelForm,class:this.classes(Q,$,et,st,e&&Y)},o.cancel):null,a=this.visibleElements.addSubmitButton?_.tsx("button",{type:"submit",disabled:i,class:this.classes(Q,Z,et,st,(t={},t[Y]=i,t))},o.add):null,r=s?_.tsx("span",{key:"file-name",class:q},s.name):null,l=_.tsx("form",{bind:this,afterCreate:_.storeNode,afterRemoved:_.discardNode,"data-node-ref":"_addAttachmentForm",onsubmit:this._submitAddAttachment},_.tsx("fieldset",{class:P},r,_.tsx("label",{class:this.classes(j,Q,Z)},s?o.changeFile:o.selectFile,_.tsx("input",{class:W,type:"file",name:"attachment",bind:this,onchange:this._handleFileInputChange}))),a,n);return _.tsx("div",{key:"add-form-container",class:N},l)},e.prototype._renderDetailsForm=function(t){var e,s,i,n=this,a=this.visibleElements,r=this.viewModel,l=this.selectedFile,d=this.submitting,h=t.contentType,m=t.size,u=t.url,p=r.abilities,b=d||!l,f=p.editing&&p.operations.delete&&a.deleteButton?_.tsx("button",{key:"delete-button",type:"button",disabled:d,bind:this,onclick:function(e){return n._submitDeleteAttachment(e,t)},class:this.classes(Q,et,$,M,(e={},e[Y]=d,e))},o.delete):null,v=p.editing&&p.operations.update&&a.updateButton?_.tsx("button",{disabled:b,key:"update-button",type:"submit",class:this.classes(Q,et,tt,(s={},s[Y]=b,s))},o.update):null,y=this.visibleElements.cancelUpdateButton?_.tsx("button",{disabled:d,key:"cancel-button",type:"button",bind:this,onclick:this._cancelForm,class:this.classes(Q,et,$,tt,(i={},i[Y]=d,i))},o.cancel):null,g=l?_.tsx("span",{key:"file-name",class:q},l.name):null,w=p.editing&&p.operations.update?_.tsx("fieldset",{key:"file",class:P},g,_.tsx("label",{class:this.classes(j,Q,Z)},o.changeFile,_.tsx("input",{class:W,type:"file",name:"attachment",bind:this,onchange:this._handleFileInputChange}))):null,x=_.tsx("fieldset",{key:"size",class:G},_.tsx("label",null,c.formatFileSize(m))),k=_.tsx("fieldset",{key:"content-type",class:G},_.tsx("label",null,h)),F=_.tsx("form",{bind:this,afterCreate:_.storeNode,afterRemoved:_.discardNode,"data-node-ref":"_updateAttachmentForm",onsubmit:this._submitUpdateAttachment},_.tsx("div",{class:X},x,k),w,_.tsx("div",{class:A},f,y,v));return _.tsx("div",{key:"edit-form-container",class:N},_.tsx("a",{class:U,href:u,rel:"noreferrer",target:"_blank",alt:name},this._renderImageMask({attachmentInfo:t,size:400}),_.tsx("div",{class:L},_.tsx("span",{class:R},_.tsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"32",height:"32",viewBox:"0 0 32 32"},_.tsx("path",{d:"M28 13h1v16H3V3h16v1H4v24h24zm-5-9h4.293L15.646 15.638l.707.707L28 4.707V9h1V3h-6z"}),_.tsx("path",{fill:"none",d:"M0 0h32v32H0z"}))))),F)},e.prototype._renderImageMask=function(t){var e,s,i=t.attachmentInfo,n=t.size,a=this.viewModel.supportsResizeAttachments,r=i.contentType,o=i.url,l=a&&p.isSupportedImage(r),c=this._getCSSTransform(i,l),d=c?{transform:c,"image-orientation":"none"}:{},h=-1===o.indexOf("?")?"?":"&",m=l?""+o+h+"w="+n:p.getIconPath(r),u=((e={})[z]=!l,e),b=((s={})[T]=a,s);return _.tsx("div",{class:this.classes(u,S)},_.tsx("img",{styles:d,alt:"",src:m,class:this.classes(b,C)}))},e.prototype._renderAttachmentInfo=function(t){var e=this,s=t.attachmentInfo,i=t.displayType,n=this.viewModel.abilities,a=s.name,r=s.url,l=this._renderImageMask({attachmentInfo:s,size:"list"===i?48:400}),c=n.editing?_.tsx("span",{"aria-hidden":"true",class:this.classes(O,_.isRTL()?at:nt)}):null,d=[l,_.tsx("label",{class:D},_.tsx("span",{class:H},a||o.noTitle),c)],h=n.editing?_.tsx("button",{key:"details-button",bind:this,class:B,title:o.attachmentDetails,"aria-label":o.attachmentDetails,"data-attachment-info-id":s.id,onclick:function(){return e._startEditAttachment(s)}},d):_.tsx("a",{key:"details-link",class:B,href:r,target:"_blank"},d);return _.tsx("li",{class:E,key:s},h)},e.prototype._renderAttachmentContainer=function(){var t,e=this,s=this.displayType,i=this.viewModel,n=this.visibleElements,a=i.attachmentInfos,r=i.abilities,l=a&&a.length,c=((t={})[w]="preview"!==s,t[x]="preview"===s,t),d=r.editing&&r.operations.add&&n.addButton?_.tsx("button",{bind:this,onclick:function(){return e._startAddAttachment()},class:this.classes(Q,$,k)},_.tsx("span",{"aria-hidden":"true",class:this.classes(V,rt)}),o.add):null,h=l?_.tsx("ul",{class:I},a.toArray().map((function(t){return e._renderAttachmentInfo({attachmentInfo:t,displayType:s})}))):_.tsx("div",{class:it},o.noAttachments);return _.tsx("div",{key:"attachments-container",class:this.classes(g,c)},h,d)},e.prototype._modeChanged=function(){this._set("error",null),this._set("selectedFile",null)},e.prototype._handleFileInputChange=function(t){var e=t.target,s=e&&e.files&&e.files.item(0);this._set("selectedFile",s)},e.prototype._submitDeleteAttachment=function(t,e){t.preventDefault(),this.deleteAttachment(e)},e.prototype._submitAddAttachment=function(t){t.preventDefault(),this.addAttachment()},e.prototype._submitUpdateAttachment=function(t){t.preventDefault(),this.updateAttachment()},e.prototype._startEditAttachment=function(t){var e=this.viewModel;e.activeAttachmentInfo=t,e.mode="edit"},e.prototype._startAddAttachment=function(){this.viewModel.mode="add"},e.prototype._cancelForm=function(t){t.preventDefault(),this.viewModel.mode="view"},e.prototype._getCSSTransform=function(t,e){var s=t.orientationInfo;return!this._supportsImageOrientation&&e&&s?[s.rotation?"rotate("+s.rotation+"deg)":"",s.mirrored?"scaleX(-1)":""].join(" "):""},i([h.aliasOf("viewModel.abilities")],e.prototype,"abilities",void 0),i([h.property(),_.renderable()],e.prototype,"displayType",void 0),i([h.aliasOf("viewModel.graphic")],e.prototype,"graphic",void 0),i([h.property()],e.prototype,"label",void 0),i([h.property({readOnly:!0})],e.prototype,"selectedFile",void 0),i([_.renderable(),h.property({readOnly:!0})],e.prototype,"submitting",void 0),i([_.renderable(),h.property({readOnly:!0})],e.prototype,"error",void 0),i([h.property({type:u}),_.renderable(["viewModel.activeAttachmentInfo","viewModel.mode","viewModel.state","viewModel.supportsResizeAttachments","viewModel.attachmentInfos","viewModel.graphic","viewModel.abilities","viewModel.abilities.editing","viewModel.abilities.operations"])],e.prototype,"viewModel",void 0),i([h.property(),_.renderable()],e.prototype,"visibleElements",void 0),i([h.cast("visibleElements")],e.prototype,"castVisibleElements",null),e=i([h.subclass("esri.widgets.Attachments")],e)}(h.declared(m))}));