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

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./FeatureForm/nls/FeatureForm","dojo/date/locale","../moment","../core/accessorSupport/decorators","../layers/support/domains","../layers/support/fieldUtils","./Widget","./FeatureForm/FeatureFormViewModel","./support/widget"],(function(e,t,a,r,i,n,l,d,o,s,u,p,f,c){var h="esri-feature-form",m="esri-feature-form__form",v="esri-feature-form__label",_="esri-feature-form__input",y="esri-feature-form__input--date",b="esri-feature-form__input--time",g="esri-feature-form__input--disabled",F="esri-feature-form__input--invalid",w="esri-feature-form__input-icon--invalid",x="esri-feature-form__field-error-message",D="esri-feature-form__description-text",I="esri-feature-form__date-input-part",M="esri-feature-form__date-input-container",N="esri-feature-form__date-format-hint",V="esri-feature-form__group",k="esri-feature-form__group-label",C="esri-feature-form__group-description",O="esri-feature-form__group--collapsed",E="esri-feature-form__group--sequential",S="esri-feature-form__group--active",K="esri-icon-notice-triangle",A="esri-widget",U="esri-widget--panel",R="esri-input",T="esri-select",q={datePattern:"M/d/y",timePattern:"h:mm:ss a"};return function(e){function t(t){var a=e.call(this,t)||this;return a._fieldFocusNeeded=!1,a._activeDateEdit=null,a._activeInputName=null,a.feature=null,a.fieldConfig=null,a.groupDisplay="all",a.label=n.widgetLabel,a.layer=null,a.strict=null,a.viewModel=new f,a._handleFormKeyDown=a._handleFormKeyDown.bind(a),a._handleInputBlur=a._handleInputBlur.bind(a),a._handleInputFocus=a._handleInputFocus.bind(a),a._handleNumberInputMouseDown=a._handleNumberInputMouseDown.bind(a),a._handleInputKeyDown=a._handleInputKeyDown.bind(a),a._handleOptionChange=a._handleOptionChange.bind(a),a._handleGroupClick=a._handleGroupClick.bind(a),a._handleSubmit=a._handleSubmit.bind(a),a._afterScrollerCreateOrUpdate=a._afterScrollerCreateOrUpdate.bind(a),a}return r(t,e),t.prototype.postInitialize=function(){var e=this;this.own(this.watch("feature",(function(){var t=e._getFocusableInput("forward");e._activeInputName=t&&t.name,e._fieldFocusNeeded=!0})),this.on("submit",(function(t){if(t.invalid.length>0){var a=t.invalid[0];e._activeInputName=a,e._fieldFocusNeeded=!0,e.scheduleRender()}})))},t.prototype.getValues=function(){return null},t.prototype.submit=function(){return null},t.prototype.render=function(){var e=this.viewModel.state;return c.tsx("div",{class:this.classes(h,A,U)},"ready"===e?this.renderForm():null)},t.prototype.renderForm=function(){return c.tsx("form",{class:m,novalidate:!0,onsubmit:this._handleSubmit,onkeydown:this._handleFormKeyDown},this.renderFields())},t.prototype.renderFields=function(){var e=this;return this.viewModel.inputFields.map((function(t,a){return(r=t)&&r.inputFields?e.renderGroup(t,a):e.renderLabeledField(t);var r}))},t.prototype.renderGroup=function(e,t){var a=this,r=e.description,i=e.label,n=e.inputFields,l=this.viewModel.findField(this._activeInputName),d=l&&l.group===e,o=this.id+"_group_"+t,s=this.id+"_group-label_"+t,u=this.id+"_group-description_"+t,p=r?c.tsx("p",{class:this.classes(C,D),id:u},r):null,f="sequential"===this.groupDisplay,h=f?d?"true":"false":void 0;return c.tsx("fieldset",{class:this.classes(V,f?E:null,!f||d?null:O,d?S:null),"aria-expanded":h,"aria-labelledby":s,"aria-describedby":r?u:"","data-group":e,id:o,key:t,onclick:this._handleGroupClick},c.tsx("div",{class:k,id:s},i),p,n.map((function(e){return a.renderLabeledField(e)})))},t.prototype._getFocusableInput=function(e,t){for(var a=this.viewModel._allInputFields,r="forward"===e?a:a.slice().reverse(),i=t?r.indexOf(t)+1:0;i<r.length;i++){var n=r[i];if(n.visible&&n.editable)return n}return null},t.prototype.renderLabeledField=function(e){var t=e.label,a=e.layer,r=e.type;return c.tsx("label",{key:a.id+"-"+e.name,class:v},[t,"unsupported"!==r?this.renderInputField(e):this.renderUnsupportedField(e),this.renderAuxiliaryText(e)])},t.prototype.renderInputField=function(e){var t=this.viewModel,r=e.domain,i=e.editable,n=e.name,l=e.type,d=t.getValue(n),o=!i,s=this.getCommonInputProps(e);return r&&"coded-value"===r.type&&!o?this.renderSelectInputField(d,r.codedValues.map((function(e){return{value:e.code,name:e.name}})),s):"text"===l&&"text-area"===e.editorType||"rich-text"===e.editorType?c.tsx("textarea",a({},s)):"date"===l?this.renderDateInputField(d,s):c.tsx("input",a({type:"text"===l?"text":"number"},s))},t.prototype.renderDateInputField=function(e,t){var r=this._formatDate(0),i=r.date,n=r.time,l=this.id+"-"+t.key,d=l+"-date",o=l+"-time",s=t["data-field"];return c.tsx("div",{key:t.key+"-date",class:M},c.tsx("div",{class:I},c.tsx("input",a({"aria-label":s.label,"aria-describedby":d,type:"text"},t,{"data-date-part":"date",class:this.classes(t.class,y),value:this._formatDate(e).date})),c.tsx("div",{class:N,id:d},i)),c.tsx("div",{class:I},c.tsx("input",a({"aria-describedby":o,"aria-label":s.label,type:"text"},t,{"data-date-part":"time",class:this.classes(t.class,b),value:this._formatDate(e).time})),c.tsx("div",{class:N,id:o},n)))},t.prototype.renderUnsupportedField=function(e){var t=this.viewModel.getValue(e.name);return c.tsx("input",{class:this.classes(R,_,g),disabled:!0,type:"text",value:""+t})},t.prototype.renderSelectInputField=function(e,t,r){var i=!1,n=t.map((function(t){return t.value===e&&(i=!0),c.tsx("option",{value:""+t.value,key:t.name},t.name)}));null==e||""===e||i||n.unshift(c.tsx("option",{value:""+e,key:"outlier-option"},e));var l=r["data-field"];return l.required||null!=l.value||n.unshift(c.tsx("option",{value:"",key:"empty-option"})),c.tsx("select",a({},r,{class:this.classes(r.class,T),onchange:this._handleOptionChange}),n)},t.prototype.renderAuxiliaryText=function(e){return e.valid?e.valid&&e.description?c.tsx("div",{key:"description",class:D},e.description):void 0:c.tsx("div",{key:"error-message"},c.tsx("span",{class:this.classes(w,K)}),c.tsx("div",{class:x},e.errorMessage))},t.prototype.getCommonInputProps=function(e){var t=this.viewModel,r=e.editable,i=e.name,n=e.required,l=e.maxLength,d=e.hint,o=e.type,s=e.valid,u=t.getValue(i),p=!r;return a({afterCreate:this._afterScrollerCreateOrUpdate,afterUpdate:this._afterScrollerCreateOrUpdate,"aria-invalid":s?"false":"true",class:this.classes(R,_,p?g:null,s?null:F),key:i,maxlength:l>-1?""+l:""},this._getNumberFieldConstraints(e),{disabled:p,value:null==u?"":""+u,"data-field":e,onfocus:this._handleInputFocus,onblur:this._handleInputBlur,onkeydown:this._handleInputKeyDown,onmousedown:"number"===o?this._handleNumberInputMouseDown:null,required:n,title:d})},t.prototype._handleNumberInputMouseDown=function(e){var t=e.target;t.disabled||t.focus(),this.scheduleRender()},t.prototype._getNumberFieldConstraints=function(e){var t=s.getDomainRange(e.domain)||u.getFieldRange(e.field);return t&&t.max!==Number.MAX_VALUE&&t.min!==Number.MIN_VALUE?t:{min:null,max:null}},t.prototype._afterScrollerCreateOrUpdate=function(e){var t=e["data-field"],a=this.viewModel.findField(this._activeInputName);t.editable&&this._fieldFocusNeeded&&a===t&&(this._fieldFocusNeeded=!1,e.focus())},t.prototype._handleInputFocus=function(e){var t=e.target;this._activeInputName=t["data-field"].name},t.prototype._handleInputBlur=function(e){var t,r=e.target,i=r["data-field"],n=e.relatedTarget,l=n&&n["data-field"];if("date"===i.type){var d=r.getAttribute("data-date-part");this._activeDateEdit=a({},this._activeDateEdit,((t={})[d]={value:r.value,input:r},t))}if(l&&"date"===i.type&&"date"===l.type&&i.field===l.field){if(""!==r.value&&""===n.value){d=n.getAttribute("data-date-part");n.value=this._formatDate(Date.now())[d]}}else this._commitValue(r),this.scheduleRender()},t.prototype._commitValue=function(e){var t=e["data-field"];if(this._activeDateEdit){var a=this._activeDateEdit,r=a.date,i=a.time,n=this._getDateEditValue(t,"date"),l=this._getDateEditValue(t,"time"),d=""===n||""===l;if(r){var o=r.input;o.value=d?"":n,this._updateFieldValue(o)}if(i){var s=i.input;s.value=d?"":l,this._updateFieldValue(s)}this._activeDateEdit=null}else this._updateFieldValue(e)},t.prototype._getDateEditValue=function(e,t){var a=this._activeDateEdit[t];if(a){if(""===a.value)return"";var r=this._parseDate(a.value,t);return r?this._formatDate(r.getTime())[t]:this._formatDate(e.value)[t]}},t.prototype._handleInputKeyDown=function(e){var t=e.key,a=e.altKey,r=e.ctrlKey,i=e.metaKey,n=e.shiftKey;if("Tab"===t){var l=(p=e.target)["data-field"],d=n?"backward":"forward",o=p.getAttribute("data-date-part");if(!!("backward"===d&&"time"===o||"forward"===d&&"date"===o))return;this._commitValue(p);var s=this.viewModel.findField(l.name),u=this._getFocusableInput(d,s);return this._activeInputName=u&&u.name,void(u?(e.preventDefault(),this._fieldFocusNeeded=!0):this.renderNow())}if("Enter"===t)this._updateFieldValue(e.target),this.scheduleRender();else{var p,f=(l=(p=e.target)["data-field"]).field.type,c="single"===f||"double"===f;if(("integer"===f||"small-integer"===f||c)&&(!a&&!r&&!i)&&1===t.length){var h=Number(t),m=["-","+"],v=c?m.concat(["e","."]):m;isNaN(h)&&-1===v.indexOf(t)&&e.preventDefault()}}},t.prototype._updateFieldValue=function(e){var t=e["data-field"];this.viewModel.setValue(t.name,this._parseValue(e))},t.prototype._parseValue=function(e){var t=e["data-field"],a=e.value,r=t.required,i=t.type;if(!r&&""===a)return null;if("number"===i)return parseFloat(a);if("date"===i){if(!a)return null;var n=e.getAttribute("data-date-part"),l=Number(a);if(!isNaN(l))return l;var o=this._parseDate(a,n);if(!o)return null;var s=d(o),u=t.domain,p=d(),f=p;if(u&&"range"===u.type){var c=d(u.maxValue);p.isAfter(c)||(f=c)}var h=this.viewModel.getValue(t.name),m=d(null!=h?h:f);return"date"===n?(s.hour(m.hour()),s.minutes(m.minutes()),s.seconds(m.seconds())):(s.date(m.date()),s.month(m.month()),s.year(m.year())),s.valueOf()}return a},t.prototype._handleOptionChange=function(e){this._updateFieldValue(e.target),this.scheduleRender()},t.prototype._handleGroupClick=function(e){var t=e.currentTarget;if("false"===t.getAttribute("aria-expanded")){var a=t["data-group"];this._activeInputName=a.inputFields[0].name,this._fieldFocusNeeded=!0,this.scheduleRender()}},t.prototype._handleSubmit=function(e){e.preventDefault()},t.prototype._handleFormKeyDown=function(e){"Enter"===e.key&&this.viewModel.submit()},t.prototype._formatDate=function(e){if(null==e)return{date:"",time:""};var t=new Date(e);return{date:l.format(t,a({selector:"date"},q)),time:l.format(t,a({selector:"time"},q))}},t.prototype._parseDate=function(e,t){return null==e||""===e?null:l.parse(e,a({selector:t},q))},i([o.aliasOf("viewModel.feature")],t.prototype,"feature",void 0),i([o.aliasOf("viewModel.fieldConfig")],t.prototype,"fieldConfig",void 0),i([o.property(),c.renderable()],t.prototype,"groupDisplay",void 0),i([o.property()],t.prototype,"label",void 0),i([o.aliasOf("viewModel.layer")],t.prototype,"layer",void 0),i([o.aliasOf("viewModel.strict")],t.prototype,"strict",void 0),i([o.property(),c.renderable(["viewModel.inputFields","viewModel.state"]),c.vmEvent(["value-change","submit"])],t.prototype,"viewModel",void 0),i([o.aliasOf("viewModel.getValues")],t.prototype,"getValues",null),i([o.aliasOf("viewModel.submit")],t.prototype,"submit",null),t=i([o.subclass("esri.widgets.FeatureForm")],t)}(o.declared(p))}));