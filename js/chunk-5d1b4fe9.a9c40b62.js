(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d1b4fe9"],{"02f4":function(t,e,n){var r=n("4588"),c=n("be13");t.exports=function(t){return function(e,n){var i,o,a=String(c(e)),s=r(n),u=a.length;return s<0||s>=u?t?"":void 0:(i=a.charCodeAt(s),i<55296||i>56319||s+1===u||(o=a.charCodeAt(s+1))<56320||o>57343?t?a.charAt(s):i:t?a.slice(s,s+2):o-56320+(i-55296<<10)+65536)}}},"0390":function(t,e,n){"use strict";var r=n("02f4")(!0);t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},"0bfb":function(t,e,n){"use strict";var r=n("cb7c");t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},"214f":function(t,e,n){"use strict";n("b0c5");var r=n("2aba"),c=n("32e9"),i=n("79e5"),o=n("be13"),a=n("2b4c"),s=n("520a"),u=a("species"),l=!i((function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")})),f=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var p=a(t),h=!i((function(){var e={};return e[p]=function(){return 7},7!=""[t](e)})),v=h?!i((function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[u]=function(){return n}),n[p](""),!e})):void 0;if(!h||!v||"replace"===t&&!l||"split"===t&&!f){var d=/./[p],g=n(o,p,""[t],(function(t,e,n,r,c){return e.exec===s?h&&!c?{done:!0,value:d.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}})),m=g[0],b=g[1];r(String.prototype,t,m),c(RegExp.prototype,p,2==e?function(t,e){return b.call(t,this,e)}:function(t){return b.call(t,this)})}}},"28a5":function(t,e,n){"use strict";var r=n("aae3"),c=n("cb7c"),i=n("ebd6"),o=n("0390"),a=n("9def"),s=n("5f1b"),u=n("520a"),l=n("79e5"),f=Math.min,p=[].push,h="split",v="length",d="lastIndex",g=4294967295,m=!l((function(){RegExp(g,"y")}));n("214f")("split",2,(function(t,e,n,l){var b;return b="c"=="abbc"[h](/(b)*/)[1]||4!="test"[h](/(?:)/,-1)[v]||2!="ab"[h](/(?:ab)*/)[v]||4!="."[h](/(.?)(.?)/)[v]||"."[h](/()()/)[v]>1||""[h](/.?/)[v]?function(t,e){var c=String(this);if(void 0===t&&0===e)return[];if(!r(t))return n.call(c,t,e);var i,o,a,s=[],l=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),f=0,h=void 0===e?g:e>>>0,m=new RegExp(t.source,l+"g");while(i=u.call(m,c)){if(o=m[d],o>f&&(s.push(c.slice(f,i.index)),i[v]>1&&i.index<c[v]&&p.apply(s,i.slice(1)),a=i[0][v],f=o,s[v]>=h))break;m[d]===i.index&&m[d]++}return f===c[v]?!a&&m.test("")||s.push(""):s.push(c.slice(f)),s[v]>h?s.slice(0,h):s}:"0"[h](void 0,0)[v]?function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}:n,[function(n,r){var c=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,c,r):b.call(String(c),n,r)},function(t,e){var r=l(b,t,this,e,b!==n);if(r.done)return r.value;var u=c(t),p=String(this),h=i(u,RegExp),v=u.unicode,d=(u.ignoreCase?"i":"")+(u.multiline?"m":"")+(u.unicode?"u":"")+(m?"y":"g"),x=new h(m?u:"^(?:"+u.source+")",d),_=void 0===e?g:e>>>0;if(0===_)return[];if(0===p.length)return null===s(x,p)?[p]:[];var C=0,$=0,y=[];while($<p.length){x.lastIndex=m?$:0;var k,E=s(x,m?p:p.slice($));if(null===E||(k=f(a(x.lastIndex+(m?0:$)),p.length))===C)$=o(p,$,v);else{if(y.push(p.slice(C,$)),y.length===_)return y;for(var w=1;w<=E.length-1;w++)if(y.push(E[w]),y.length===_)return y;$=C=k}}return y.push(p.slice(C)),y}]}))},"3eaf":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cartWrap",on:{click:function(t){t.stopPropagation()}}},["ItemInfo"!==t.$route.name?n("i",{staticClass:"rwdMenu",on:{click:function(e){return t.$store.commit("OPENCART",!1)}}},[t._v("<<")]):t._e(),t._m(0),n("ul",t._l(t.cart.carts,(function(e,r){return n("li",{key:r},[n("img",{attrs:{src:e.product.imageUrl,alt:""}}),n("div",[n("h3",[t._v(t._s(e.product.title))]),n("p",[t._v("X "+t._s(e.qty)+" "+t._s(e.product.unit||"個"))])]),e.coupon?n("span",{class:{"text-success":e.coupon}},[t._v("\n        "+t._s(t._f("currency")(e.final_total))+"\n      ")]):n("span",[t._v("\n        "+t._s(t._f("currency")(e.total))+"\n      ")]),n("i",{staticClass:"far fa-trash-alt",on:{click:function(n){return t.removeCartItem(e.id)}}})])})),0),t.user.emailVerified&&null!=t.cart.carts?n("div",{staticClass:"buysomething"},[n("h4",[t._v("哇！ 購物車目前沒有商品。")]),n("button",{staticClass:"btn",on:{click:function(e){e.preventDefault(),t.$router.push("/shop/all"),t.$store.commit("OPENCART",!1)}}},[t._v("逛逛去")])]):t._e(),t.user.emailVerified?t._e():n("div",{staticClass:"buysomething"},[n("h4",[t._v("登入會員來繼續購物。")]),n("button",{staticClass:"btn",on:{click:function(e){return e.preventDefault(),t.$store.commit("OPENLOGINBOX",!0)}}},[t._v("註冊 / 登入")])]),n("h3",{class:{delete:t.cart.final_total!==t.cart.total}},[t._v("\n    總計 $ "+t._s(t._f("currency")(t.cart.total))+" 元\n  ")]),t.cart.final_total!==t.cart.total?n("h4",{staticClass:"text-right text-success"},[t._v("\n    折扣價 $ "+t._s(t._f("currency")(t.cart.final_total))+" 元\n  ")]):t._e(),t.user.emailVerified&&null!=t.cart.carts?n("div",{staticClass:"couponWrap"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.coupon.code,expression:"coupon.code"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.coupon.code},on:{input:function(e){e.target.composing||t.$set(t.coupon,"code",e.target.value)}}}),n("button",{staticClass:"btn btn-outline-info",on:{click:function(e){return e.preventDefault(),t.useCoupon(e)}}},[t._v("套用優惠碼")]),n("button",{staticClass:"btn btn-outline-info",on:{click:function(e){return e.preventDefault(),t.goCheckout(e)}}},[t._v("\n      "+t._s("/checkout/cart"===t.$route.path?"下一步":"結帳去")+"\n    ")])]):t._e()])},c=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h2",[t._v("Cart"),n("i",{staticClass:"fas fa-cart-plus"})])}],i=(n("a481"),n("28a5"),{name:"cart",data:function(){return{coupon:{code:""}}},created:function(){this.user.emailVerified&&this.$store.dispatch("getCart")},methods:{removeCartItem:function(t){var e=this,n="".concat("https://go-where-shop.herokuapp.com","/api/cart/").concat(t);this.$store.commit("LOADINGCHANGE",!0),this.axios.delete(n).then((function(){e.$store.commit("LOADINGCHANGE",!1),e.$store.dispatch("getCart")}))},useCoupon:function(){var t=this,e=this,n="".concat("https://go-where-shop.herokuapp.com","/api/coupon");this.$store.commit("LOADINGCHANGE",!0),this.axios.post(n,{code:this.coupon.code}).then((function(n){e.coupon.code="",e.$store.commit("LOADINGCHANGE",!1),n.data.success?t.$store.dispatch("getCart"):e.$store.dispatch("updateMessage",{message:n.data.message,status:"danger"})}))},goCheckout:function(){null==this.$store.state.cart.carts&&("/checkout/cart"!==this.$route.path?(this.$store.commit("OPENCART",!this.$store.state.cartOpen),this.$router.push("/checkout/cart")):this.$router.push("/checkout/formData"))}},computed:{cart:function(){return this.$store.state.cart},user:function(){return this.$store.state.user}},filters:{currency:function(t){if(void 0===t)return"";var e=String(t).split(".");return e[0]=e[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),e.join(".")}}}),o=i,a=(n("65e1"),n("2877")),s=Object(a["a"])(o,r,c,!1,null,null,null);e["default"]=s.exports},"520a":function(t,e,n){"use strict";var r=n("0bfb"),c=RegExp.prototype.exec,i=String.prototype.replace,o=c,a="lastIndex",s=function(){var t=/a/,e=/b*/g;return c.call(t,"a"),c.call(e,"a"),0!==t[a]||0!==e[a]}(),u=void 0!==/()??/.exec("")[1],l=s||u;l&&(o=function(t){var e,n,o,l,f=this;return u&&(n=new RegExp("^"+f.source+"$(?!\\s)",r.call(f))),s&&(e=f[a]),o=c.call(f,t),s&&o&&(f[a]=f.global?o.index+o[0].length:e),u&&o&&o.length>1&&i.call(o[0],n,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(o[l]=void 0)})),o}),t.exports=o},"5f1b":function(t,e,n){"use strict";var r=n("23c6"),c=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==r(t))throw new TypeError("RegExp#exec called on incompatible receiver");return c.call(t,e)}},"65e1":function(t,e,n){"use strict";var r=n("e009"),c=n.n(r);c.a},a481:function(t,e,n){"use strict";var r=n("cb7c"),c=n("4bf8"),i=n("9def"),o=n("4588"),a=n("0390"),s=n("5f1b"),u=Math.max,l=Math.min,f=Math.floor,p=/\$([$&`']|\d\d?|<[^>]*>)/g,h=/\$([$&`']|\d\d?)/g,v=function(t){return void 0===t?t:String(t)};n("214f")("replace",2,(function(t,e,n,d){return[function(r,c){var i=t(this),o=void 0==r?void 0:r[e];return void 0!==o?o.call(r,i,c):n.call(String(i),r,c)},function(t,e){var c=d(n,t,this,e);if(c.done)return c.value;var f=r(t),p=String(this),h="function"===typeof e;h||(e=String(e));var m=f.global;if(m){var b=f.unicode;f.lastIndex=0}var x=[];while(1){var _=s(f,p);if(null===_)break;if(x.push(_),!m)break;var C=String(_[0]);""===C&&(f.lastIndex=a(p,i(f.lastIndex),b))}for(var $="",y=0,k=0;k<x.length;k++){_=x[k];for(var E=String(_[0]),w=u(l(o(_.index),p.length),0),A=[],I=1;I<_.length;I++)A.push(v(_[I]));var N=_.groups;if(h){var R=[E].concat(A,w,p);void 0!==N&&R.push(N);var S=String(e.apply(void 0,R))}else S=g(E,p,w,A,N,e);w>=y&&($+=p.slice(y,w)+S,y=w+E.length)}return $+p.slice(y)}];function g(t,e,r,i,o,a){var s=r+t.length,u=i.length,l=h;return void 0!==o&&(o=c(o),l=p),n.call(a,l,(function(n,c){var a;switch(c.charAt(0)){case"$":return"$";case"&":return t;case"`":return e.slice(0,r);case"'":return e.slice(s);case"<":a=o[c.slice(1,-1)];break;default:var l=+c;if(0===l)return n;if(l>u){var p=f(l/10);return 0===p?n:p<=u?void 0===i[p-1]?c.charAt(1):i[p-1]+c.charAt(1):n}a=i[l-1]}return void 0===a?"":a}))}}))},b0c5:function(t,e,n){"use strict";var r=n("520a");n("5ca1")({target:"RegExp",proto:!0,forced:r!==/./.exec},{exec:r})},e009:function(t,e,n){}}]);
//# sourceMappingURL=chunk-5d1b4fe9.a9c40b62.js.map