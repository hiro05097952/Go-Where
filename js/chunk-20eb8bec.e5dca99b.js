(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-20eb8bec"],{"07e3":function(e,t){var r={}.hasOwnProperty;e.exports=function(e,t){return r.call(e,t)}},"11e9":function(e,t,r){var n=r("52a7"),s=r("4630"),a=r("6821"),i=r("6a99"),o=r("69a8"),u=r("c69a"),c=Object.getOwnPropertyDescriptor;t.f=r("9e1e")?c:function(e,t){if(e=a(e),t=i(t,!0),u)try{return c(e,t)}catch(r){}if(o(e,t))return s(!n.f.call(e,t),e[t])}},"1bc3":function(e,t,r){var n=r("f772");e.exports=function(e,t){if(!n(e))return e;var r,s;if(t&&"function"==typeof(r=e.toString)&&!n(s=r.call(e)))return s;if("function"==typeof(r=e.valueOf)&&!n(s=r.call(e)))return s;if(!t&&"function"==typeof(r=e.toString)&&!n(s=r.call(e)))return s;throw TypeError("Can't convert object to primitive value")}},"1ec9":function(e,t,r){var n=r("f772"),s=r("e53d").document,a=n(s)&&n(s.createElement);e.exports=function(e){return a?s.createElement(e):{}}},"294c":function(e,t){e.exports=function(e){try{return!!e()}catch(t){return!0}}},"35e8":function(e,t,r){var n=r("d9f6"),s=r("aebd");e.exports=r("8e60")?function(e,t,r){return n.f(e,t,s(1,r))}:function(e,t,r){return e[t]=r,e}},"454f":function(e,t,r){r("46a7");var n=r("584a").Object;e.exports=function(e,t,r){return n.defineProperty(e,t,r)}},"456d":function(e,t,r){var n=r("4bf8"),s=r("0d58");r("5eda")("keys",(function(){return function(e){return s(n(e))}}))},"46a7":function(e,t,r){var n=r("63b6");n(n.S+n.F*!r("8e60"),"Object",{defineProperty:r("d9f6").f})},"584a":function(e,t){var r=e.exports={version:"2.6.9"};"number"==typeof __e&&(__e=r)},"5eda":function(e,t,r){var n=r("5ca1"),s=r("8378"),a=r("79e5");e.exports=function(e,t){var r=(s.Object||{})[e]||Object[e],i={};i[e]=t(r),n(n.S+n.F*a((function(){r(1)})),"Object",i)}},"63b6":function(e,t,r){var n=r("e53d"),s=r("584a"),a=r("d864"),i=r("35e8"),o=r("07e3"),u="prototype",c=function(e,t,r){var f,d,l,p=e&c.F,m=e&c.G,v=e&c.S,w=e&c.P,b=e&c.B,h=e&c.W,y=m?s:s[t]||(s[t]={}),g=y[u],P=m?n:v?n[t]:(n[t]||{})[u];for(f in m&&(r=t),r)d=!p&&P&&void 0!==P[f],d&&o(y,f)||(l=d?P[f]:r[f],y[f]=m&&"function"!=typeof P[f]?r[f]:b&&d?a(l,n):h&&P[f]==l?function(e){var t=function(t,r,n){if(this instanceof e){switch(arguments.length){case 0:return new e;case 1:return new e(t);case 2:return new e(t,r)}return new e(t,r,n)}return e.apply(this,arguments)};return t[u]=e[u],t}(l):w&&"function"==typeof l?a(Function.call,l):l,w&&((y.virtual||(y.virtual={}))[f]=l,e&c.R&&g&&!g[f]&&i(g,f,l)))};c.F=1,c.G=2,c.S=4,c.P=8,c.B=16,c.W=32,c.U=64,c.R=128,e.exports=c},"794b":function(e,t,r){e.exports=!r("8e60")&&!r("294c")((function(){return 7!=Object.defineProperty(r("1ec9")("div"),"a",{get:function(){return 7}}).a}))},"79aa":function(e,t){e.exports=function(e){if("function"!=typeof e)throw TypeError(e+" is not a function!");return e}},"85f2":function(e,t,r){e.exports=r("454f")},"8e60":function(e,t,r){e.exports=!r("294c")((function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a}))},"8e6e":function(e,t,r){var n=r("5ca1"),s=r("990b"),a=r("6821"),i=r("11e9"),o=r("f1ae");n(n.S,"Object",{getOwnPropertyDescriptors:function(e){var t,r,n=a(e),u=i.f,c=s(n),f={},d=0;while(c.length>d)r=u(n,t=c[d++]),void 0!==r&&o(f,t,r);return f}})},9093:function(e,t,r){var n=r("ce10"),s=r("e11e").concat("length","prototype");t.f=Object.getOwnPropertyNames||function(e){return n(e,s)}},"990b":function(e,t,r){var n=r("9093"),s=r("2621"),a=r("cb7c"),i=r("7726").Reflect;e.exports=i&&i.ownKeys||function(e){var t=n.f(a(e)),r=s.f;return r?t.concat(r(e)):t}},ac6a:function(e,t,r){for(var n=r("cadf"),s=r("0d58"),a=r("2aba"),i=r("7726"),o=r("32e9"),u=r("84f2"),c=r("2b4c"),f=c("iterator"),d=c("toStringTag"),l=u.Array,p={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},m=s(p),v=0;v<m.length;v++){var w,b=m[v],h=p[b],y=i[b],g=y&&y.prototype;if(g&&(g[f]||o(g,f,l),g[d]||o(g,d,b),u[b]=l,h))for(w in n)g[w]||a(g,w,n[w],!0)}},aebd:function(e,t){e.exports=function(e,t){return{enumerable:!(1&e),configurable:!(2&e),writable:!(4&e),value:t}}},bd86:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var n=r("85f2"),s=r.n(n);function a(e,t,r){return t in e?s()(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}},d864:function(e,t,r){var n=r("79aa");e.exports=function(e,t,r){if(n(e),void 0===t)return e;switch(r){case 1:return function(r){return e.call(t,r)};case 2:return function(r,n){return e.call(t,r,n)};case 3:return function(r,n,s){return e.call(t,r,n,s)}}return function(){return e.apply(t,arguments)}}},d898:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"accountInfo"}},[r("ul",[r("li",[r("label",{attrs:{for:"displayName"}},[e._v("姓名")]),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.userInfo.displayName,expression:"userInfo.displayName"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"text",id:"displayName",name:"name","data-vv-as":"姓名"},domProps:{value:e.userInfo.displayName},on:{input:function(t){t.target.composing||e.$set(e.userInfo,"displayName",t.target.value)}}}),r("span",[e._v(e._s(e.errors.first("name")))])])]),r("li",[r("label",{attrs:{for:"email"}},[e._v("帳號")]),r("input",{attrs:{type:"text",id:"email",disabled:""},domProps:{value:e.userInfo.email}})]),r("li",{staticClass:"emailVerified"},[r("h3",[e._v("信箱驗證")]),r("p",{class:{"text-success":e.storeUser.emailVerified,"text-danger":!e.storeUser.emailVerified}},[e._v("\n        "+e._s(e.storeUser.emailVerified?"通過驗證":"尚未驗證")+"\n      ")]),e.storeUser.emailVerified?e._e():r("button",{staticClass:"btn btn-outline-primary btn-sm",attrs:{disabled:e.emailBtnDisable},on:{click:function(t){return t.preventDefault(),e.sendEmailVerificationAgain(t)}}},[e._v("\n        "+e._s(e.emailBtnDisable?"重新驗證 "+e.btnTime:"重新驗證")+"\n      ")])]),r("li",{class:{passwordEditing:e.isEditing.password}},[r("label",[e._v("密碼")]),e.isEditing.password?r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.password.currentPassword,expression:"password.currentPassword"},{name:"validate",rawName:"v-validate",value:"min:12|max:16|required",expression:"'min:12|max:16|required'"}],attrs:{type:"password",placeholder:"請輸入目前密碼",name:"password","data-vv-as":"密碼"},domProps:{value:e.password.currentPassword},on:{input:function(t){t.target.composing||e.$set(e.password,"currentPassword",t.target.value)}}}),r("span",[e._v(e._s(e.errors.first("password")))]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.password.newPassword,expression:"password.newPassword"},{name:"validate",rawName:"v-validate",value:"min:12|max:16|required",expression:"'min:12|max:16|required'"}],ref:"newPassword",attrs:{type:"password",placeholder:"請輸入新密碼",name:"newPassword","data-vv-as":"新密碼"},domProps:{value:e.password.newPassword},on:{input:function(t){t.target.composing||e.$set(e.password,"newPassword",t.target.value)}}}),r("span",[e._v(e._s(e.errors.first("newPassword")))]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.password.newPasswordConfirm,expression:"password.newPasswordConfirm"},{name:"validate",rawName:"v-validate",value:"confirmed:newPassword|required",expression:"'confirmed:newPassword|required'"}],attrs:{type:"password",placeholder:"密碼確認",name:"newPasswordConfirm","data-vv-as":"密碼確認"},domProps:{value:e.password.newPasswordConfirm},on:{input:function(t){t.target.composing||e.$set(e.password,"newPasswordConfirm",t.target.value)}}}),r("span",[e._v(e._s(e.errors.first("newPasswordConfirm")))])]):r("a",{attrs:{href:"#"},on:{click:function(t){t.preventDefault(),e.isEditing.password=!0}}},[e._v("重新設定密碼")])]),r("li",[r("label",{attrs:{for:"address"}},[e._v("地址")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.userInfo.address,expression:"userInfo.address"}],attrs:{type:"text",id:"address"},domProps:{value:e.userInfo.address},on:{input:function(t){t.target.composing||e.$set(e.userInfo,"address",t.target.value)}}})]),r("li",{staticClass:"subscribe"},[r("h3",[e._v("訂閱")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.userInfo.subscribe,expression:"userInfo.subscribe"}],attrs:{type:"checkbox",name:"subscribe",id:"subscribe","true-value":1,"false-value":0},domProps:{checked:Array.isArray(e.userInfo.subscribe)?e._i(e.userInfo.subscribe,null)>-1:e._q(e.userInfo.subscribe,1)},on:{change:function(t){var r=e.userInfo.subscribe,n=t.target,s=n.checked?1:0;if(Array.isArray(r)){var a=null,i=e._i(r,a);n.checked?i<0&&e.$set(e.userInfo,"subscribe",r.concat([a])):i>-1&&e.$set(e.userInfo,"subscribe",r.slice(0,i).concat(r.slice(i+1)))}else e.$set(e.userInfo,"subscribe",s)}}}),r("label",{attrs:{for:"subscribe"}},[e._v("Go! Where? 最新商品情報")])]),r("li",{staticClass:"btnBar"},[r("button",{staticClass:"cancel",on:{click:e.reset}},[e._v("取消")]),r("button",{on:{click:function(t){return t.preventDefault(),e.setNewPassword(t)}}},[e._v("儲存變更")])])])])},s=[],a=(r("8e6e"),r("ac6a"),r("456d"),r("bd86")),i=r("59ca"),o=r.n(i);function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(r,!0).forEach((function(t){Object(a["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(r).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var f=o.a.auth(),d={name:"accountInfo",data:function(){return{isEditing:{password:!1},intervalID:"",btnTime:30,userInfo:{},password:{}}},mounted:function(){var e=this;this.axios.get("".concat("https://go-where-shop.herokuapp.com","/api/user")).then((function(t){e.userInfo=t.data.userInfo}))},methods:{sendEmailVerificationAgain:function(){var e=this;f.currentUser.emailVerified||(e.$store.commit("LOADINGCHANGE",!0),f.currentUser.sendEmailVerification().then((function(){e.$store.commit("LOADINGCHANGE",!1),e.intervalID=setInterval((function(){e.btnTime>0?e.btnTime-=1:(clearInterval(e.intervalID),e.btnTime=30)}),1e3)})).catch((function(t){e.$store.dispatch("updateMessage",{message:t.message,status:"error"}),e.$store.commit("LOADINGCHANGE",!1)})))},reset:function(){this.newUserInfo={},this.isEditing={password:!1}},setNewPassword:function(){var e=this;this.$store.commit("LOADINGCHANGE",!0);var t="".concat("https://go-where-shop.herokuapp.com","/api/user"),r=this.isEditing.password?c({},this.password,{},this.userInfo):c({},this.userInfo);this.$validator.validateAll().then((function(n){n&&e.axios.put(t,r).then((function(t){t.data.success?(e.reset(),e.$store.dispatch("updateMessage",{message:t.data.message,status:"success"})):e.$store.dispatch("updateMessage",{message:t.data.message,status:"error"}),e.$store.commit("LOADINGCHANGE",!1)}))}))}},computed:{emailBtnDisable:function(){return!!this.$store.state.user.emailVerified||30!==this.btnTime},storeUser:function(){return this.$store.state.user}}},l=d,p=r("2877"),m=Object(p["a"])(l,n,s,!1,null,null,null);t["default"]=m.exports},d9f6:function(e,t,r){var n=r("e4ae"),s=r("794b"),a=r("1bc3"),i=Object.defineProperty;t.f=r("8e60")?Object.defineProperty:function(e,t,r){if(n(e),t=a(t,!0),n(r),s)try{return i(e,t,r)}catch(o){}if("get"in r||"set"in r)throw TypeError("Accessors not supported!");return"value"in r&&(e[t]=r.value),e}},e4ae:function(e,t,r){var n=r("f772");e.exports=function(e){if(!n(e))throw TypeError(e+" is not an object!");return e}},e53d:function(e,t){var r=e.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=r)},f1ae:function(e,t,r){"use strict";var n=r("86cc"),s=r("4630");e.exports=function(e,t,r){t in e?n.f(e,t,s(0,r)):e[t]=r}},f772:function(e,t){e.exports=function(e){return"object"===typeof e?null!==e:"function"===typeof e}}}]);
//# sourceMappingURL=chunk-20eb8bec.e5dca99b.js.map