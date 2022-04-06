"use strict";(self["webpackChunkpanda_nails"]=self["webpackChunkpanda_nails"]||[]).push([[24],{7539:function(e,a,t){t.d(a,{Z:function(){return d}});var s=t(6252),i=t(5587);const n={alt:"loading.gif",src:i};function o(e,a,t,i,o,c){return(0,s.wg)(),(0,s.iD)("img",n)}var c={},l=t(3744);const r=(0,l.Z)(c,[["render",o]]);var d=r},9966:function(e,a,t){t.d(a,{Z:function(){return f}});var s=t(6252),i=t(3577),n=t(9963);const o={"aria-label":"Page navigation example"},c={class:"pagination justify-content-center"},l=(0,s._)("span",{"aria-hidden":"true"},"«",-1),r=[l],d=["onClick"],g=(0,s._)("span",{"aria-hidden":"true"},"»",-1),p=[g];function u(e,a,t,l,g,u){return(0,s.wg)(),(0,s.iD)("nav",o,[(0,s._)("ul",c,[(0,s._)("li",{class:(0,i.C_)(["page-item",{disabled:!t.pages.has_pre}])},[(0,s._)("a",{class:"page-link",href:"#","aria-label":"Previous",onClick:a[0]||(a[0]=(0,n.iM)((e=>u.changePages(t.pages.current_page-1)),["prevent"]))},r)],2),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.pages.total_pages,(e=>((0,s.wg)(),(0,s.iD)("li",{class:(0,i.C_)(["page-item",{active:e===t.pages.current_page}]),key:e+123},[(0,s._)("a",{class:"page-link",href:"#",onClick:(0,n.iM)((a=>u.changePages(e)),["prevent"])},(0,i.zw)(e),9,d)],2)))),128)),(0,s._)("li",{class:(0,i.C_)(["page-item",{disabled:!t.pages.has_next}])},[(0,s._)("a",{class:"page-link",href:"#","aria-label":"Next",onClick:a[1]||(a[1]=(0,n.iM)((e=>u.changePages(t.pages.current_page+1)),["prevent"]))},p)],2)])])}var h={props:["pages"],methods:{changePages(e){this.$emit("change-pages",e)}}},m=t(3744);const _=(0,m.Z)(h,[["render",u]]);var f=_},7024:function(e,a,t){t.r(a),t.d(a,{default:function(){return z}});var s=t(6252),i=t(3577),n=t(9963);const o=e=>((0,s.dD)("data-v-b2469b08"),e=e(),(0,s.Cn)(),e),c={class:"position-relative d-flex align-items-center justify-content-center",style:{"min-height":"350px"}},l=o((()=>(0,s._)("h2",{class:"fw-bold"},"產品頁面",-1))),r={class:"container"},d={class:"row list-unstyled row-cols-1 row-cols-md-3 row-cols-lg-4 mt-4"},g={class:"card mb-4"},p={class:"overflow-hidden"},u={class:"card-body text-start"},h={class:"card-title fs-4 fw-bold"},m={class:"position-absolute start-85 translate-middle badge rounded-pill bg-success fs-7"},_={class:"card-text d-flex justify-content-between"},f={class:"fw-bold card-text text-danger fs-5 my-1 align-self-center"},v={class:"m-start fs-6 small text-muted"},b=["onClick","disabled"],k={key:0,class:"fas fa-spinner fa-pulse"},w=o((()=>(0,s._)("i",{class:"bi bi-cart-plus fs-3"},null,-1))),y={class:"text-center"};function C(e,a,t,o,C,x){const L=(0,s.up)("LoadingComponent"),I=(0,s.up)("VLoading"),P=(0,s.up)("router-link"),$=(0,s.up)("pagination-Component");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(I,{active:C.isLoading,"z-index":1060},{default:(0,s.w5)((()=>[(0,s.Wm)(L)])),_:1},8,["active"]),(0,s._)("div",c,[(0,s._)("div",{class:"position-absolute",style:(0,i.j5)([{top:"0",bottom:"0",left:"0",right:"0","background-position":"center center",opacity:"0.3"},{backgroundImage:`url(${C.BannerImage})`}])},null,4),l]),(0,s._)("div",r,[(0,s._)("ul",d,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(C.products,(e=>((0,s.wg)(),(0,s.iD)("li",{class:"col",key:e.id},[(0,s._)("div",g,[(0,s._)("div",p,[(0,s.Wm)(P,{to:`/product/${e.id}`,class:""},{default:(0,s.w5)((()=>[(0,s._)("div",{class:"card-img-top card-img-scale",style:(0,i.j5)([{height:"300px","background-size":"cover","background-position":"center"},{backgroundImage:`url(${e.imageUrl})`}])},null,4)])),_:2},1032,["to"])]),(0,s._)("div",u,[(0,s._)("h5",h,[(0,s.Uk)((0,i.zw)(e.title)+" ",1),(0,s._)("span",m,(0,i.zw)(e.category),1)]),(0,s._)("div",_,[(0,s._)("p",f,[(0,s.Uk)(" NT $"+(0,i.zw)(e.price)+" 元 ",1),(0,s._)("del",v,(0,i.zw)(e.origin_price)+" 元",1)]),(0,s._)("button",{onClick:(0,n.iM)((a=>x.addToCart(e.id,e.title)),["prevent"]),disabled:C.isLoadingItem===e.id,class:"btn btn-outline-primary card-link text-decoration-none"},[C.isLoadingItem===e.id?((0,s.wg)(),(0,s.iD)("i",k)):(0,s.kq)("",!0),w],8,b)])])])])))),128))]),(0,s._)("div",y,[(0,s.Wm)($,{pages:C.pagination,onChangePages:x.getProducts},null,8,["pages","onChangePages"])])])],64)}var x=t(8722),L=t(4902),I=t(9966),P=t(7539),$={data(){return{products:[],pagination:{},isLoadingItem:!1,loadingStatus:{loadingItem:""},isLoading:!1,BannerImage:x,category:"流水畫"}},components:{PaginationComponent:I.Z,LoadingComponent:P.Z},methods:{getProducts(e=1,a=""){this.isLoading=!0,this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/clothes/products/?page=${e}&category=${a}`).then((e=>{this.products=e.data.products,this.pagination=e.data.pagination,this.isLoading=!1})).catch((e=>{console.dir(e),this.isLoading=!1}))},addToCart(e,a,t=1){const s={product_id:e,qty:t};this.isLoadingItem=e;const i="https://vue3-course-api.hexschool.io/v2/api/clothes/cart/";this.$http.post(i,{data:s}).then((e=>{this.isLoadingItem="",L.Z.emit("push-message",{style:"success",title:`${a}${e.data.message}`}),L.Z.emit("get-cart-num")})).catch((e=>{console.dir(e),this.isLoadingItem="",L.Z.emit("push-message",{style:"danger",title:`${e.response.data.message}`})}))}},mounted(){this.getProducts()}},Z=t(3744);const D=(0,Z.Z)($,[["render",C],["__scopeId","data-v-b2469b08"]]);var z=D},8722:function(e,a,t){e.exports=t.p+"img/banner3.3ef48998.jpg"},5587:function(e,a,t){e.exports=t.p+"img/panda_loading_2.205e407c.gif"}}]);
//# sourceMappingURL=24.0af9946f.js.map