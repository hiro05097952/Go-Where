(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-70628608"],{"7f7f":function(e,a,r){var t=r("86cc").f,s=Function.prototype,o=/^\s*function ([^ (]*)/,n="name";n in s||r("9e1e")&&t(s,n,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(e){return""}}})},9921:function(e,a,r){"use strict";r.r(a);var t=function(){var e=this,a=e.$createElement,r=e._self._c||a;return r("div",{staticClass:"my-5 row justify-content-center form",on:{click:function(e){e.stopPropagation()}}},[r("form",{staticClass:"col-md-11"},[r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"useremail"}},[e._v("Email")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.user.email,expression:"form.user.email"},{name:"validate",rawName:"v-validate",value:"required|email",expression:"'required|email'"}],staticClass:"form-control",attrs:{type:"email",name:"email",id:"useremail",placeholder:"請輸入 Email","data-vv-as":"Email"},domProps:{value:e.form.user.email},on:{input:function(a){a.target.composing||e.$set(e.form.user,"email",a.target.value)}}}),r("span",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("email")))])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"username"}},[e._v("收件人姓名")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.user.name,expression:"form.user.name"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",name:"name",id:"username",placeholder:"輸入姓名","data-vv-as":"姓名"},domProps:{value:e.form.user.name},on:{input:function(a){a.target.composing||e.$set(e.form.user,"name",a.target.value)}}}),r("span",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("name")))])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"usertel"}},[e._v("收件人電話")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.user.phone,expression:"form.user.phone"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"tel",id:"usertel",name:"phone",placeholder:"請輸入電話","data-vv-as":"電話"},domProps:{value:e.form.user.phone},on:{input:function(a){a.target.composing||e.$set(e.form.user,"phone",a.target.value)}}}),r("span",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("phone")))])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"useraddress"}},[e._v("收件人地址")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.form.user.address,expression:"form.user.address"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],staticClass:"form-control",attrs:{type:"text",name:"address",id:"useraddress",placeholder:"請輸入地址","data-vv-as":"地址"},domProps:{value:e.form.user.address},on:{input:function(a){a.target.composing||e.$set(e.form.user,"address",a.target.value)}}}),r("span",{staticClass:"text-danger"},[e._v(e._s(e.errors.first("address")))])]),r("div",{staticClass:"form-group"},[r("label",{attrs:{for:"comment"}},[e._v("留言")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.form.message,expression:"form.message"}],staticClass:"form-control",attrs:{id:"comment",cols:"30",rows:"10"},domProps:{value:e.form.message},on:{input:function(a){a.target.composing||e.$set(e.form,"message",a.target.value)}}})]),r("div",{staticClass:"text-right"},[r("button",{staticClass:"btn btn-teal",on:{click:function(a){return a.preventDefault(),e.$router.go(-1)}}},[e._v("上一步")]),r("button",{staticClass:"btn btn-danger ml-4",on:{click:function(a){return a.preventDefault(),e.formCommit(a)}}},[e._v("送出訂單")])])])])},s=[],o=(r("7f7f"),{name:"formData",data:function(){return{form:{message:"",user:{}}}},methods:{formCommit:function(){var e=this,a=this;this.$validator.validateAll().then((function(r){if(r){e.$store.commit("LOADINGCHANGE",!0);var t="".concat("https://go-where-shop.herokuapp.com","/api/order"),s={name:a.form.user.name,email:a.form.user.email,tel:a.form.user.phone,address:a.form.user.address,message:a.form.message};e.axios.post(t,s).then((function(e){a.$store.commit("LOADINGCHANGE",!1),e.data.success?a.$router.push("/checkout/checkorder/".concat(e.data.orderID)):a.$store.dispatch("updateMessage",{message:e.data.message,status:"error"})}))}}))}}}),n=o,i=r("2877"),m=Object(i["a"])(n,t,s,!1,null,null,null);a["default"]=m.exports}}]);
//# sourceMappingURL=chunk-70628608.4c1e838b.js.map