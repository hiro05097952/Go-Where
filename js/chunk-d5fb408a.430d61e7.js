(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d5fb408a"],{"60bc":function(t,s,a){},"9ab2":function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"itemInfo"}},[a("div",{staticClass:"content"},[a("h2",{staticClass:"path"},[t._v("/\n      "),a("router-link",{attrs:{to:"/shop/all"}},[t._v(" Product")]),t._v(" /\n      "),a("a",{attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.$router.push("/shop/"+t.$store.state.fromPage)}}},[t._v("\n       "+t._s(t.$store.state.fromPage)+"\n      ")])],1),a("div",{staticClass:"imageWrap"},[a("img",{attrs:{src:t.product.imageUrl[0]}}),t.product.imageUrl[1]?a("img",{staticClass:"hoverImg",attrs:{src:t.product.imageUrl[1]}}):t._e()]),a("ul",{staticClass:"itemInfo"},[a("li",[a("h2",[t._v(t._s(t.product.title))])]),a("li",[a("h4",[t._v(t._s(t.product.content||"-"))])]),a("li",{staticClass:"origin"},[t._v("NT$ "+t._s(t.product.origin_price))]),a("li",{staticClass:"final"},[t._v("NT$ "+t._s(t.product.price))]),a("li",[a("div",{staticClass:"form-control",on:{click:function(t){t.stopPropagation()}}},[a("button",{staticClass:"btn less",on:{click:function(s){return t.qtyChange(-1)}}},[a("i",{staticClass:"fas fa-minus"})]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.buyQty,expression:"buyQty"}],attrs:{type:"number",max:"10",min:"1"},domProps:{value:t.buyQty},on:{input:function(s){s.target.composing||(t.buyQty=s.target.value)}}}),a("button",{staticClass:"btn plus",on:{click:function(s){return t.qtyChange(1)}}},[a("i",{staticClass:"fas fa-plus"})]),a("button",{staticClass:"btn btn-outline-info commit",on:{click:function(s){return t.addtoCart(t.product.id,t.buyQty)}}},[t._v("加入購物車")])])])])])])},e=[],o={name:"itemInfo",data:function(){return{buyQty:1}},created:function(){this.$store.dispatch("getOnePro",this.$route.params.pro_id)},methods:{addtoCart:function(t){var s=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,i="".concat("https://go-where-shop.herokuapp.com","/api/cart"),e={product_id:t,qty:a};this.$store.commit("LOADINGCHANGE",!0),this.axios.post(i,e).then((function(t){s.$store.commit("LOADINGCHANGE",!1),s.$store.dispatch("getCart"),s.$store.dispatch("updateMessage",{message:t.data.message,status:t.data.success?"success":"error"}),t.data.success||s.$store.commit("OPENLOGINBOX",!0)}))},qtyChange:function(t){1===t&&this.buyQty>=10?this.buyQty=10:-1===t&&this.buyQty<=1?this.buyQty=1:this.buyQty+=t}},computed:{product:function(){return this.$store.state.product},user:function(){return this.$store.state.user}}},n=o,r=(a("b1bd"),a("2877")),c=Object(r["a"])(n,i,e,!1,null,null,null);s["default"]=c.exports},b1bd:function(t,s,a){"use strict";var i=a("60bc"),e=a.n(i);e.a}}]);
//# sourceMappingURL=chunk-d5fb408a.430d61e7.js.map