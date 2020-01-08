(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-363345d2","chunk-5d1b4fe9"],{"02f4":function(t,e,s){var a=s("4588"),r=s("be13");t.exports=function(t){return function(e,s){var i,n,o=String(r(e)),c=a(s),u=o.length;return c<0||c>=u?t?"":void 0:(i=o.charCodeAt(c),i<55296||i>56319||c+1===u||(n=o.charCodeAt(c+1))<56320||n>57343?t?o.charAt(c):i:t?o.slice(c,c+2):n-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,s){"use strict";var a=s("02f4")(!0);t.exports=function(t,e,s){return e+(s?a(t,e).length:1)}},"0bfb":function(t,e,s){"use strict";var a=s("cb7c");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},1954:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return t.isOpen?s("div",{staticClass:"login",on:{click:function(e){return e.target!==e.currentTarget?null:t.close(e)},scroll:function(t){t.preventDefault()},touchmove:function(t){t.preventDefault()},mousewheel:function(t){t.preventDefault()}}},["login"===t.display?s("div",{staticClass:"wrap"},[s("h2",[t._v("ACCOUNT LOGIN")]),s("i",{staticClass:"close",on:{click:t.close}},[t._v("X")]),s("ul",[s("li",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"},{name:"validate",rawName:"v-validate",value:"email|required",expression:"'email|required'"}],attrs:{type:"text",placeholder:"Email",name:"Email"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}}),s("span",[t._v(t._s(t.errors.first("Email")))]),s("i",{staticClass:"fas fa-user"})]),s("li",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"},{name:"validate",rawName:"v-validate",value:"min:12|max:16|required",expression:"'min:12|max:16|required'"}],attrs:{type:"password",placeholder:"Password",name:"password","data-vv-as":"密碼"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}}),s("span",[t._v(t._s(t.errors.first("password")))]),s("i",{staticClass:"fas fa-lock"})]),s("li",{staticClass:"googleWrap"},[s("button",{staticClass:"googleBtn",on:{click:t.googleSignIn}},[s("i",{staticClass:"fab fa-google-plus-square"}),t._v("\n          Google SignIn\n        ")])]),s("li",{staticClass:"btnBar"},[s("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.display="forgotPassword"}}},[t._v("Forgot Password?")]),s("button",{staticClass:"register",on:{click:function(e){t.display="register"}}},[t._v("Register")]),s("button",{on:{click:function(e){return e.preventDefault(),t.login(e)}}},[t._v("Login")])])])]):t._e(),"register"===t.display?s("div",{staticClass:"wrap register"},[s("h2",[t._v("Register")]),s("i",{staticClass:"close",on:{click:t.close}},[t._v("X")]),s("ul",[s("li",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.email,expression:"newUser.email"},{name:"validate",rawName:"v-validate",value:"email|required",expression:"'email|required'"}],attrs:{type:"text",placeholder:"Email",name:"Email"},domProps:{value:t.newUser.email},on:{input:function(e){e.target.composing||t.$set(t.newUser,"email",e.target.value)}}}),s("span",[t._v(t._s(t.errors.first("Email")))]),s("i",{staticClass:"fas fa-user"})]),s("li",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.password,expression:"newUser.password"},{name:"validate",rawName:"v-validate",value:"min:12|max:16|required",expression:"'min:12|max:16|required'"}],ref:"password",attrs:{type:"password",placeholder:"Password",name:"password","data-vv-as":"密碼"},domProps:{value:t.newUser.password},on:{input:function(e){e.target.composing||t.$set(t.newUser,"password",e.target.value)}}}),s("span",[t._v(t._s(t.errors.first("password")))]),s("i",{staticClass:"fas fa-lock"})]),s("li",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.passwordCheck,expression:"newUser.passwordCheck"},{name:"validate",rawName:"v-validate",value:"confirmed:password|required",expression:"'confirmed:password|required'"}],attrs:{type:"password",placeholder:"Password Confirmation",name:"password_confiremation","data-vv-as":"確認密碼"},domProps:{value:t.newUser.passwordCheck},on:{input:function(e){e.target.composing||t.$set(t.newUser,"passwordCheck",e.target.value)}}}),s("span",[t._v(t._s(t.errors.first("password_confiremation")))])]),s("li",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.newUser.displayName,expression:"newUser.displayName"},{name:"validate",rawName:"v-validate",value:"required",expression:"'required'"}],attrs:{type:"text",placeholder:"Name","data-vv-as":"姓名",name:"name"},domProps:{value:t.newUser.displayName},on:{input:function(e){e.target.composing||t.$set(t.newUser,"displayName",e.target.value)}}}),s("span",[t._v(t._s(t.errors.first("name")))])]),s("li",{staticClass:"btnBar"},[s("button",{staticClass:"register",on:{click:function(e){t.display="login"}}},[t._v("Return")]),s("button",{on:{click:function(e){return e.preventDefault(),t.signup(e)}}},[t._v("Submit")])])])]):t._e(),"forgotPassword"===t.display?s("div",{staticClass:"wrap fogotPassword"},[s("h2",[t._v("PASSWORD RESET")]),s("i",{staticClass:"close",on:{click:t.close}},[t._v("X")]),s("ul",[s("li",[s("input",{directives:[{name:"model",rawName:"v-model",value:t.resetEmail,expression:"resetEmail"},{name:"validate",rawName:"v-validate",value:"email|required",expression:"'email|required'"}],attrs:{type:"text",placeholder:"請輸入註冊時的 Email",name:"Email"},domProps:{value:t.resetEmail},on:{input:function(e){e.target.composing||(t.resetEmail=e.target.value)}}}),s("span",[t._v(t._s(t.errors.first("Email")))]),s("i",{staticClass:"fas fa-user"})]),s("li",{staticClass:"btnBar"},[s("button",{staticClass:"register",on:{click:function(e){t.display="login"}}},[t._v("Return")]),s("button",{on:{click:function(e){return e.preventDefault(),t.forgotPasswordAndReset(e)}}},[t._v("Submit")])])])]):t._e()]):t._e()},r=[],i=(s("a481"),s("6762"),s("2fdb"),s("59ca")),n=s.n(i),o=n.a.auth(),c=new n.a.auth.GoogleAuthProvider;c.addScope("https://www.googleapis.com/auth/firebase.readonly"),o.languageCode="zh-TW";var u={name:"Login",data:function(){return{display:"login",user:{},newUser:{},resetEmail:""}},methods:{login:function(){var t=this;this.$validator.validateAll().then((function(e){e&&(t.$store.commit("LOADINGCHANGE",!0),o.signInWithEmailAndPassword(t.user.email,t.user.password).then((function(e){e.user.getIdToken().then((function(e){t.serverLogin(e)}))})).catch((function(e){"auth/user-not-found"===e.code&&t.$store.dispatch("updateMessage",{message:"查無此用戶，請再次確認帳號密碼",status:"error"}),"auth/wrong-password"===e.code&&t.$store.dispatch("updateMessage",{message:"使用者帳號或密碼錯誤",status:"error"}),"auth/invalid-email"===e.code&&t.$store.dispatch("updateMessage",{message:"請輸入正確的 email 格式",status:"error"}),setTimeout((function(){t.$store.commit("LOADINGCHANGE",!1)}),500)})))}))},signup:function(){var t=this;this.$validator.validateAll().then((function(e){e&&(t.$store.commit("LOADINGCHANGE",!0),t.axios.post("".concat("https://go-where-shop.herokuapp.com","/api/user"),{email:t.newUser.email,password:t.newUser.password,passwordCheck:t.newUser.passwordCheck,displayName:t.newUser.displayName}).then((function(e){if(!e.data.success)return t.$store.dispatch("updateMessage",{message:e.data.message,status:"error"}),void t.$store.commit("LOADINGCHANGE",!1);o.signInWithEmailAndPassword(t.newUser.email,t.newUser.password).then((function(e){e.user&&!e.user.emailVerified&&e.user.sendEmailVerification().then((function(){t.newUser={},t.$store.dispatch("updateMessage",{message:"註冊成功，請驗證信箱並重新登入",status:"success"})})).catch((function(e){t.$store.dispatch("updateMessage",{message:e.message,status:"error"}),t.$store.dispatch("updateMessage",{message:"寄送驗證信失敗，請重新登入並至會員頁面操作",status:"error"})})),t.$store.commit("OPENLOGINBOX",!1),t.$store.commit("LOADINGCHANGE",!1),t.signout()})).catch((function(e){t.$store.dispatch("updateMessage",{message:e.message,status:"error"}),t.$store.commit("LOADINGCHANGE",!1)}))})))}))},close:function(){this.isRegister=!1,this.user={},this.newUser={},this.$store.commit("OPENLOGINBOX",!1)},forgotPasswordAndReset:function(){var t=this;this.$validator.validateAll().then((function(e){e&&o.sendPasswordResetEmail(t.resetEmail).then((function(){t.$store.dispatch("updateMessage",{message:"請至信箱重置密碼",status:"success"})})).catch((function(e){var s=e.message;"auth/user-not-found"===e.code&&(s="查無此註冊信箱"),t.$store.dispatch("updateMessage",{message:s,status:"error"})}))}))},signout:function(){var t=this;this.$store.commit("LOADINGCHANGE",!0),o.signOut().then((function(){t.axios.post("".concat("https://go-where-shop.herokuapp.com","/api/logout")).then((function(e){t.$store.commit("UPDATEUSER",{}),t.$store.commit("UPDATECART",{carts:[]}),t.$store.commit("UPDATELIKES",[]),setTimeout((function(){t.$store.commit("LOADINGCHANGE",!1),t.$store.dispatch("updateMessage",{status:"success",message:e.data.message})}),1e3),(t.$route.path.includes("account")||t.$route.path.includes("admin")||t.$route.path.includes("checkout"))&&t.$router.replace("/")}))}))},serverLogin:function(t){var e=this;this.axios.post("".concat("https://go-where-shop.herokuapp.com","/api/login"),{idToken:t}).then((function(t){t.data.success&&(e.$store.commit("UPDATEUSER",t.data.userInfo),e.user={},e.$store.dispatch("updateMessage",{message:"登入成功",status:"success"}),t.data.userInfo.emailVerified||e.$store.dispatch("updateMessage",{message:"請至信箱驗證並繼續購物",status:"error"})),e.$store.commit("OPENLOGINBOX",!1),e.$store.commit("LOADINGCHANGE",!1)}))},googleSignIn:function(){var t=this;o.signInWithPopup(c).then((function(e){e.user.getIdToken().then((function(e){t.serverLogin(e)}))})).catch((function(e){t.$store.dispatch("updateMessage",{status:"error",message:e.message})}))}},computed:{isOpen:function(){return this.$store.state.loginBoxOpen}}},l=u,p=(s("5571"),s("2877")),d=Object(p["a"])(l,a,r,!1,null,null,null);e["a"]=d.exports},"1d63":function(t,e,s){"use strict";var a=s("e5a2"),r=s.n(a);r.a},"214f":function(t,e,s){"use strict";s("b0c5");var a=s("2aba"),r=s("32e9"),i=s("79e5"),n=s("be13"),o=s("2b4c"),c=s("520a"),u=o("species"),l=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),p=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var s="ab".split(t);return 2===s.length&&"a"===s[0]&&"b"===s[1]}();t.exports=function(t,e,s){var d=o(t),f=!i((function(){var e={};return e[d]=function(){return 7},7!=""[t](e)})),v=f?!i((function(){var e=!1,s=/a/;return s.exec=function(){return e=!0,null},"split"===t&&(s.constructor={},s.constructor[u]=function(){return s}),s[d](""),!e})):void 0;if(!f||!v||"replace"===t&&!l||"split"===t&&!p){var m=/./[d],h=s(n,d,""[t],(function(t,e,s,a,r){return e.exec===c?f&&!r?{done:!0,value:m.call(e,s,a)}:{done:!0,value:t.call(s,e,a)}:{done:!1}})),g=h[0],_=h[1];a(String.prototype,t,g),r(RegExp.prototype,d,2==e?function(t,e){return _.call(t,this,e)}:function(t){return _.call(t,this)})}}},"28a5":function(t,e,s){"use strict";var a=s("aae3"),r=s("cb7c"),i=s("ebd6"),n=s("0390"),o=s("9def"),c=s("5f1b"),u=s("520a"),l=s("79e5"),p=Math.min,d=[].push,f="split",v="length",m="lastIndex",h=4294967295,g=!l((function(){RegExp(h,"y")}));s("214f")("split",2,(function(t,e,s,l){var _;return _="c"=="abbc"[f](/(b)*/)[1]||4!="test"[f](/(?:)/,-1)[v]||2!="ab"[f](/(?:ab)*/)[v]||4!="."[f](/(.?)(.?)/)[v]||"."[f](/()()/)[v]>1||""[f](/.?/)[v]?function(t,e){var r=String(this);if(void 0===t&&0===e)return[];if(!a(t))return s.call(r,t,e);var i,n,o,c=[],l=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),p=0,f=void 0===e?h:e>>>0,g=new RegExp(t.source,l+"g");while(i=u.call(g,r)){if(n=g[m],n>p&&(c.push(r.slice(p,i.index)),i[v]>1&&i.index<r[v]&&d.apply(c,i.slice(1)),o=i[0][v],p=n,c[v]>=f))break;g[m]===i.index&&g[m]++}return p===r[v]?!o&&g.test("")||c.push(""):c.push(r.slice(p)),c[v]>f?c.slice(0,f):c}:"0"[f](void 0,0)[v]?function(t,e){return void 0===t&&0===e?[]:s.call(this,t,e)}:s,[function(s,a){var r=t(this),i=void 0==s?void 0:s[e];return void 0!==i?i.call(s,r,a):_.call(String(r),s,a)},function(t,e){var a=l(_,t,this,e,_!==s);if(a.done)return a.value;var u=r(t),d=String(this),f=i(u,RegExp),v=u.unicode,m=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(g?"y":"g"),w=new f(g?u:"^(?:"+u.source+")",m),C=void 0===e?h:e>>>0;if(0===C)return[];if(0===d.length)return null===c(w,d)?[d]:[];var $=0,b=0,k=[];while(b<d.length){w.lastIndex=g?b:0;var E,x=c(w,g?d:d.slice(b));if(null===x||(E=p(o(w.lastIndex+(g?0:b)),d.length))===$)b=n(d,b,v);else{if(k.push(d.slice($,b)),k.length===C)return k;for(var N=1;N<=x.length-1;N++)if(k.push(x[N]),k.length===C)return k;b=$=E}}return k.push(d.slice($)),k}]}))},"39d2":function(t,e,s){"use strict";var a=s("49f3"),r=s.n(a);r.a},"3eaf":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"cartWrap",on:{click:function(t){t.stopPropagation()}}},["/checkout/cart"!==t.$route.path?s("i",{staticClass:"rwdMenu fas fa-angle-left",on:{click:function(e){return t.$store.commit("OPENCART",!1)}}}):t._e(),s("h2",[t._v("CART")]),s("ul",t._l(t.cart.carts,(function(e,a){return s("li",{key:a},[s("img",{attrs:{src:e.product.imageUrl[0],alt:""}}),s("div",[s("h3",[t._v(t._s(e.product.title))]),s("p",[t._v("X "+t._s(e.qty)+" "+t._s(e.product.unit||"個"))])]),e.coupon?s("span",{class:{"text-success":e.coupon}},[t._v("\n        "+t._s(t._f("currency")(e.final_total))+"\n      ")]):s("span",[t._v("\n        "+t._s(t._f("currency")(e.total))+"\n      ")]),s("i",{staticClass:"far fa-trash-alt",on:{click:function(s){return t.removeCartItem(e.id)}}})])})),0),t.user.emailVerified&&0===t.cart.carts.length?s("div",{staticClass:"buysomething"},[s("h4",[t._v("哇！ 購物車目前沒有商品。")]),s("button",{staticClass:"btn",on:{click:function(e){e.preventDefault(),t.$router.push("/shop/all"),t.$store.commit("OPENCART",!1)}}},[t._v("逛逛去")])]):t._e(),t.user.emailVerified?t._e():s("div",{staticClass:"buysomething"},[s("h4",[t._v("登入會員來繼續購物。")]),s("button",{staticClass:"btn",on:{click:function(e){return e.preventDefault(),t.$store.commit("OPENLOGINBOX",!0)}}},[t._v("註冊 / 登入")])]),s("h3",{class:{delete:t.cart.final_total!==t.cart.total}},[t._v("\n    總計 $ "+t._s(t._f("currency")(t.cart.total))+" 元\n  ")]),t.cart.final_total!==t.cart.total?s("h4",{staticClass:"text-right text-success"},[t._v("\n    折扣價 $ "+t._s(t._f("currency")(t.cart.final_total))+" 元\n  ")]):t._e(),t.user.emailVerified&&0!==t.cart.carts.length?s("div",{staticClass:"couponWrap"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.coupon.code,expression:"coupon.code"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.coupon.code},on:{input:function(e){e.target.composing||t.$set(t.coupon,"code",e.target.value)}}}),s("button",{staticClass:"btn btn-outline-info",on:{click:function(e){return e.preventDefault(),t.useCoupon(e)}}},[t._v("套用優惠碼")]),s("button",{staticClass:"btn btn-outline-info",on:{click:function(e){return e.preventDefault(),t.goCheckout(e)}}},[t._v("\n      "+t._s("/checkout/cart"===t.$route.path?"下一步":"結帳去")+"\n    ")])]):t._e()])},r=[],i=(s("a481"),s("28a5"),{name:"cart",data:function(){return{coupon:{code:""}}},created:function(){this.user.emailVerified&&this.$store.dispatch("getCart")},methods:{removeCartItem:function(t){var e=this,s="".concat("https://go-where-shop.herokuapp.com","/api/cart/").concat(t);this.$store.commit("LOADINGCHANGE",!0),this.axios.delete(s).then((function(){e.$store.commit("LOADINGCHANGE",!1),e.$store.dispatch("getCart")}))},useCoupon:function(){var t=this,e=this,s="".concat("https://go-where-shop.herokuapp.com","/api/coupon");this.$store.commit("LOADINGCHANGE",!0),this.axios.post(s,{code:this.coupon.code}).then((function(s){e.coupon.code="",e.$store.commit("LOADINGCHANGE",!1),s.data.success&&t.$store.dispatch("getCart"),e.$store.dispatch("updateMessage",{message:s.data.message,status:s.data.success?"success":"error"})}))},goCheckout:function(){0!==this.$store.state.cart.carts.length&&("/checkout/cart"!==this.$route.path?(this.$store.commit("OPENCART",!this.$store.state.cartOpen),this.$router.push("/checkout/cart")):this.$router.push("/checkout/formData"))}},computed:{cart:function(){return this.$store.state.cart},user:function(){return this.$store.state.user}},filters:{currency:function(t){if(void 0===t)return"";var e=String(t).split(".");return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),e.join(".")}}}),n=i,o=(s("65e1"),s("2877")),c=Object(o["a"])(n,a,r,!1,null,null,null);e["default"]=c.exports},"49f3":function(t,e,s){},"520a":function(t,e,s){"use strict";var a=s("0bfb"),r=RegExp.prototype.exec,i=String.prototype.replace,n=r,o="lastIndex",c=function(){var t=/a/,e=/b*/g;return r.call(t,"a"),r.call(e,"a"),0!==t[o]||0!==e[o]}(),u=void 0!==/()??/.exec("")[1],l=c||u;l&&(n=function(t){var e,s,n,l,p=this;return u&&(s=new RegExp("^"+p.source+"$(?!\\s)",a.call(p))),c&&(e=p[o]),n=r.call(p,t),c&&n&&(p[o]=p.global?n.index+n[0].length:e),u&&n&&n.length>1&&i.call(n[0],s,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(n[l]=void 0)})),n}),t.exports=n},5571:function(t,e,s){"use strict";var a=s("db8e"),r=s.n(a);r.a},"5f1b":function(t,e,s){"use strict";var a=s("23c6"),r=RegExp.prototype.exec;t.exports=function(t,e){var s=t.exec;if("function"===typeof s){var i=s.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==a(t))throw new TypeError("RegExp#exec called on incompatible receiver");return r.call(t,e)}},"65e1":function(t,e,s){"use strict";var a=s("e009"),r=s.n(a);r.a},"77b9":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"footer"},[s("div",[s("ul",{staticClass:"contact"},[s("li",[t._v("Contact")]),s("li",[t._v("TEL: 07-1234567")]),s("li",[t._v("MAIL: gowhere@gmail.com")]),s("li",[t._v("Time: 12:00 - 22:00")])]),s("div",[s("h5",[t._v("©Copright 2019 TSAI-HUNG LI")]),s("p",[t._v("僅個人作品練習，無任何商業用途")])]),s("ul",{staticClass:"follow"},[s("li",[t._v("Follow Go! Where?")]),s("li",[s("i",{staticClass:"fab fa-instagram"}),s("a",{attrs:{href:"#"}},[t._v("Instagram")])]),s("li",[s("i",{staticClass:"fab fa-line"}),s("a",{attrs:{href:"#"}},[t._v("Line")])]),s("li",[s("i",{staticClass:"fab fa-facebook-f"}),s("a",{attrs:{href:"#"}},[t._v("Facebook")])]),s("li",[s("i",{staticClass:"fab fa-twitter"}),s("a",{attrs:{href:"#"}},[t._v("Twitter")])])])])])}],i={name:"foot",data:function(){return{}}},n=i,o=(s("39d2"),s("2877")),c=Object(o["a"])(n,a,r,!1,null,null,null);e["a"]=c.exports},"9d8d":function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"navbar"}},[s("div",{staticClass:"logo",on:{click:function(e){return t.$router.push("/")}}},[t._v("\n    Go! Where?\n  ")]),s("ul",{staticClass:"itemNav"},[s("li",[s("router-link",{attrs:{to:"/about"}},[t._v("ABOUT")])],1),s("li",[s("router-link",{attrs:{to:"/shop/all"}},[t._v("ALL")])],1),s("li",[s("router-link",{attrs:{to:"/shop/vintage_all"}},[t._v("VINTAGE\n        "),s("i",{staticClass:"fas fa-sort-down"})]),s("ul",[s("li",[s("router-link",{attrs:{to:"/shop/vintage_top"}},[t._v("上衣")])],1),s("li",[s("router-link",{attrs:{to:"/shop/vintage_coat"}},[t._v("外套")])],1),s("li",[s("router-link",{attrs:{to:"/shop/vintage_shoes"}},[t._v("鞋子")])],1),s("li",[s("router-link",{attrs:{to:"/shop/vintage_pants"}},[t._v("褲子")])],1),s("li",[s("router-link",{attrs:{to:"/shop/vintage_dress"}},[t._v("洋裝")])],1)])],1),s("li",[s("router-link",{attrs:{to:"/shop/select_all"}},[t._v("SELECT\n        "),s("i",{staticClass:"fas fa-sort-down"})]),s("ul",[s("li",[s("router-link",{attrs:{to:"/shop/select_converse"}},[t._v("Coverse")])],1),s("li",[s("router-link",{attrs:{to:"/shop/select_keen"}},[t._v("Keen")])],1),s("li",[s("router-link",{attrs:{to:"/shop/select_vans"}},[t._v("Vans")])],1),s("li",[s("router-link",{attrs:{to:"/shop/select_martens"}},[t._v("Dr.Martens")])],1),s("li",[s("router-link",{attrs:{to:"/shop/select_carhartt"}},[t._v("Carhartt")])],1),s("li",[s("router-link",{attrs:{to:"/shop/select_thenorthface"}},[t._v("The North Face")])],1)])],1),s("li",[s("router-link",{attrs:{to:"/shop/accessories_all"}},[t._v("ACCESSORIES\n        "),s("i",{staticClass:"fas fa-sort-down"})]),s("ul",[s("li",[s("router-link",{attrs:{to:"/shop/accessories_hairpin"}},[t._v("髮夾")])],1),s("li",[s("router-link",{attrs:{to:"/shop/accessories_earpin"}},[t._v("耳環")])],1),s("li",[s("router-link",{attrs:{to:"/shop/accessories_socks"}},[t._v("襪子")])],1),s("li",[s("router-link",{attrs:{to:"/shop/accessories_bag"}},[t._v("背包")])],1)])],1),s("li",[s("router-link",{attrs:{to:"/shop/sale"}},[t._v("SALE")])],1)]),s("ul",{staticClass:"accountNav"},[void 0===t.$store.state.user.isAdmin?s("li",{on:{click:function(e){return t.$store.commit("OPENLOGINBOX",!0)}}},[s("i",{staticClass:"far fa-user"})]):s("li",{staticClass:"signed"},[s("i",{staticClass:"fas fa-user-edit"}),s("ul",{staticClass:"userBox"},[s("li",{on:{click:function(e){return t.$router.push("/account/accountinfo")}}},[t._v("會員專區")]),s("li",{on:{click:t.signout}},[t._v("登出")])])]),s("li",{on:{click:function(e){return t.$router.push("/account/userlike")}}},[s("i",{staticClass:"far fa-heart"})]),t.$route.path.includes("checkout")?t._e():s("li",{on:{click:function(e){return e.stopPropagation(),t.openCart(e)}}},[s("i",{staticClass:"fas fa-shopping-cart"}),t.cartLen?s("i",{staticClass:"cartQty"},[t._v(t._s(t.cartLen))]):t._e()])]),t._m(0)])},r=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"couponWrap"},[s("i",{staticClass:"fas fa-birthday-cake"}),s("div",{staticClass:"couponInfo"},[s("h5",[t._v("為慶祝本店週年慶，即日起在購物欄輸入comehere，即可享七折優惠！")])])])}],i=(s("a481"),s("6762"),s("2fdb"),s("59ca")),n=s.n(i),o=n.a.auth(),c={name:"navbar",data:function(){return{}},methods:{openCart:function(){this.$store.commit("OPENCART",!this.$store.state.cartOpen)},signout:function(){var t=this;this.$store.commit("LOADINGCHANGE",!0),o.signOut().then((function(){t.axios.post("".concat("https://go-where-shop.herokuapp.com","/api/logout")).then((function(e){t.$store.commit("UPDATEUSER",{}),t.$store.commit("UPDATECART",{carts:[]}),t.$store.commit("UPDATELIKES",[]),setTimeout((function(){t.$store.commit("LOADINGCHANGE",!1),t.$store.dispatch("updateMessage",{status:"success",message:e.data.message})}),1e3),(t.$route.path.includes("account")||t.$route.path.includes("admin")||t.$route.path.includes("checkout"))&&t.$router.replace("/")}))}))}},computed:{cartLen:function(){return this.$store.state.cart.carts.length}}},u=c,l=(s("cfa4"),s("2877")),p=Object(l["a"])(u,a,r,!1,null,null,null);e["a"]=p.exports},a481:function(t,e,s){"use strict";var a=s("cb7c"),r=s("4bf8"),i=s("9def"),n=s("4588"),o=s("0390"),c=s("5f1b"),u=Math.max,l=Math.min,p=Math.floor,d=/\$([$&`']|\d\d?|<[^>]*>)/g,f=/\$([$&`']|\d\d?)/g,v=function(t){return void 0===t?t:String(t)};s("214f")("replace",2,(function(t,e,s,m){return[function(a,r){var i=t(this),n=void 0==a?void 0:a[e];return void 0!==n?n.call(a,i,r):s.call(String(i),a,r)},function(t,e){var r=m(s,t,this,e);if(r.done)return r.value;var p=a(t),d=String(this),f="function"===typeof e;f||(e=String(e));var g=p.global;if(g){var _=p.unicode;p.lastIndex=0}var w=[];while(1){var C=c(p,d);if(null===C)break;if(w.push(C),!g)break;var $=String(C[0]);""===$&&(p.lastIndex=o(d,i(p.lastIndex),_))}for(var b="",k=0,E=0;E<w.length;E++){C=w[E];for(var x=String(C[0]),N=u(l(n(C.index),d.length),0),A=[],y=1;y<C.length;y++)A.push(v(C[y]));var O=C.groups;if(f){var I=[x].concat(A,N,d);void 0!==O&&I.push(O);var G=String(e.apply(void 0,I))}else G=h(x,d,N,A,O,e);N>=k&&(b+=d.slice(k,N)+G,k=N+x.length)}return b+d.slice(k)}];function h(t,e,a,i,n,o){var c=a+t.length,u=i.length,l=f;return void 0!==n&&(n=r(n),l=d),s.call(o,l,(function(s,r){var o;switch(r.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,a);case"'":return e.slice(c);case"<":o=n[r.slice(1,-1)];break;default:var l=+r;if(0===l)return s;if(l>u){var d=p(l/10);return 0===d?s:d<=u?void 0===i[d-1]?r.charAt(1):i[d-1]+r.charAt(1):s}o=i[l-1]}return void 0===o?"":o}))}}))},b0c5:function(t,e,s){"use strict";var a=s("520a");s("5ca1")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},c89d:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"message-alert"},t._l(t.messages,(function(e,a){return s("div",{key:a,staticClass:"alert alert-dismissible",class:"alert-"+e.status},[t._v("\n    "+t._s(e.message)+"\n    "),s("button",{staticClass:"close",staticStyle:{transform:"translateY(-5px)"},attrs:{type:"button","aria-label":"Close"},on:{click:function(e){return t.$store.commit("REMOVEMESSAGE",a)}}},[s("span",{attrs:{"aria-hidden":"true"}},[t._v("×")])])])})),0)},r=[],i={name:"tem_info",computed:{messages:function(){return this.$store.state.messages}}},n=i,o=(s("1d63"),s("2877")),c=Object(o["a"])(n,a,r,!1,null,null,null);e["a"]=c.exports},cfa4:function(t,e,s){"use strict";var a=s("f3ab"),r=s.n(a);r.a},db8e:function(t,e,s){},e009:function(t,e,s){},e5a2:function(t,e,s){},f3ab:function(t,e,s){}}]);
//# sourceMappingURL=chunk-363345d2.f3416735.js.map