(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2278fd67"],{8786:function(t,s,i){"use strict";i.r(s);var n=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{attrs:{id:"itemInfo"}},[i("div",{staticClass:"content"},[i("h2",{staticClass:"path"},[t._v("/\n      "),i("router-link",{attrs:{to:"/shop/all"}},[t._v(" Product")]),t._v(" /\n      "),i("a",{attrs:{href:"#"},on:{click:function(s){return s.preventDefault(),t.$router.push("/shop/"+t.$store.state.fromPage)}}},[t._v("\n       "+t._s(t.$store.state.fromPage)+"\n      ")])],1),i("div",{staticClass:"imageWrap"},[i("img",{attrs:{src:t.product.imageUrl}}),t.product.description?i("img",{staticClass:"hoverImg",attrs:{src:t.product.description}}):t._e()]),i("ul",{staticClass:"itemInfo"},[i("li",[i("h2",[t._v(t._s(t.product.title))])]),i("li",[i("h4",[t._v(t._s(t.product.content||"-"))])]),i("li",{staticClass:"origin"},[t._v("NT$ "+t._s(t.product.origin_price))]),i("li",{staticClass:"final"},[t._v("NT$ "+t._s(t.product.price))]),i("li",[i("div",{staticClass:"form-control",on:{click:function(t){t.stopPropagation()}}},[i("button",{staticClass:"btn less",on:{click:function(s){return t.qtyChange(-1)}}},[i("i",{staticClass:"fas fa-minus"})]),i("input",{directives:[{name:"model",rawName:"v-model",value:t.buyQty,expression:"buyQty"}],attrs:{type:"number",max:"10",min:"1"},domProps:{value:t.buyQty},on:{input:function(s){s.target.composing||(t.buyQty=s.target.value)}}}),i("button",{staticClass:"btn plus",on:{click:function(s){return t.qtyChange(1)}}},[i("i",{staticClass:"fas fa-plus"})]),i("button",{staticClass:"btn btn-outline-info commit",on:{click:function(s){return t.addtoCart(t.product.id,t.buyQty)}}},[t._v("加入購物車")])])])])])])},o=[],a={name:"itemInfo",data:function(){return{buyQty:1}},created:function(){this.$store.dispatch("getOnePro",this.$route.params.pro_id)},methods:{addtoCart:function(t){var s=this,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1,n="".concat("https://vue-course-api.hexschool.io","/api/").concat("hiro","/cart"),o={data:{product_id:t,qty:i}};this.$store.commit("LOADINGCHANGE",!0),this.axios.post(n,o).then((function(){s.$store.commit("LOADINGCHANGE",!1),s.$store.dispatch("getCart")}))},qtyChange:function(t){1===t&&this.buyQty>=10?this.buyQty=10:-1===t&&this.buyQty<=1?this.buyQty=1:this.buyQty+=t}},computed:{product:function(){return this.$store.state.product}}},r=a,e=(i("d1fd"),i("2877")),c=Object(e["a"])(r,n,o,!1,null,null,null);s["default"]=c.exports},bb17:function(t,s,i){},d1fd:function(t,s,i){"use strict";var n=i("bb17"),o=i.n(n);o.a}}]);
//# sourceMappingURL=chunk-2278fd67.ca67f62e.js.map