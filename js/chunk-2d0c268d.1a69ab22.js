(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c268d"],{"49d6":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"orderList"}},[t._l(t.orders,(function(e,r){return s("ul",{key:r,staticClass:"listWrap"},[s("li",{staticClass:"listHeader"},[s("p",[t._v("訂單編號： "+t._s(e.id))]),s("p",{class:{"text-success":e.is_paid}},[t._v(t._s(e.is_paid?"已付款":"未付款"))])]),t._l(e.products,(function(e,r){return s("li",{key:r},[s("img",{attrs:{src:e.imageUrl[0],alt:""}}),s("ul",{staticClass:"productWrap"},[s("li",[t._v(t._s(e.title))]),s("li",[s("h4",[t._v("$"+t._s(e.price))]),s("p",[t._v("x"+t._s(e.qty))])])])])})),s("li",{staticClass:"priceWrap"},[s("div",[s("h5",[t._v("下單時間："+t._s(t._f("timeConvertor")(e.create_time)))]),e.is_paid?s("h5",[t._v("付款時間："+t._s(t._f("timeConvertor")(e.ecpay.PaymentDate)))]):t._e()]),s("p",[t._v("總計： $"+t._s(e.total))])]),e.is_paid?t._e():s("li",{staticClass:"btnWrap"},[s("button",{staticClass:"btn btn-primary",on:{click:function(s){return s.preventDefault(),t.removeOrder(e.id)}}},[t._v("\n        取消訂單\n      ")]),s("button",{staticClass:"btn btn-success",on:{click:function(s){return s.preventDefault(),t.$router.push("/checkout/checkorder/"+e.id)}}},[t._v("\n      付款\n      ")])])],2)})),0===t.orders.length?s("h2",{staticClass:"noOrder"},[t._v("尚無訂單資料")]):t._e()],2)},a=[],i={name:"orderList",data:function(){return{orders:[]}},created:function(){this.getOrders()},methods:{getOrders:function(){var t=this;this.$store.commit("LOADINGCHANGE",!0),this.axios.get("".concat("https://go-where-shop.herokuapp.com","/api/orders")).then((function(e){t.orders=e.data.orders,t.$store.commit("LOADINGCHANGE",!1)}))},removeOrder:function(t){var e=this;this.$store.commit("LOADINGCHANGE",!0),this.axios.delete("".concat("https://go-where-shop.herokuapp.com","/api/order/").concat(t)).then((function(t){e.$store.dispatch("updateMessage",{status:t.data.success?"success":"error",message:t.data.message}),e.$store.commit("LOADINGCHANGE",!1),e.getOrders()}))}},computed:{storeUser:function(){return this.$store.state.user}},filters:{timeConvertor:function(t){var e=new Date(t);return"".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate())}}},o=i,n=s("2877"),c=Object(n["a"])(o,r,a,!1,null,null,null);e["default"]=c.exports}}]);
//# sourceMappingURL=chunk-2d0c268d.1a69ab22.js.map