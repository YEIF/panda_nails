"use strict";(self["webpackChunkpanda_nails"]=self["webpackChunkpanda_nails"]||[]).push([[54],{4054:function(a,t,s){s.r(t),s.d(t,{default:function(){return y}});var e=s(6252);function n(a,t,s,n,o,l){const r=(0,e.up)("DashNavbar"),i=(0,e.up)("RouterView");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e.Wm)(r),(0,e.Wm)(i)],64)}var o=s(9963);const l={class:"navbar navbar-expand-lg navbar-dark bg-dark fixed-top"},r={class:"container-fluid"},i=(0,e.Uk)("後台"),c=(0,e._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,e._)("span",{class:"navbar-toggler-icon"})],-1),u={class:"collapse navbar-collapse",id:"navbarSupportedContent"},d={class:"navbar-nav me-auto mb-2 mb-lg-0"},p={class:"nav-item"},h=(0,e.Uk)("產品列表"),v={class:"nav-item"},m=(0,e.Uk)("訂單頁面"),g={class:"nav-item"},k=(0,e.Uk)("優惠卷"),b={class:"nav-item"},f=(0,e.Uk)("文章列表");function _(a,t,s,n,_,w){const $=(0,e.up)("RouterLink");return(0,e.wg)(),(0,e.iD)("nav",l,[(0,e._)("div",r,[(0,e.Wm)($,{class:"navbar-brand",to:"/admin"},{default:(0,e.w5)((()=>[i])),_:1}),c,(0,e._)("div",u,[(0,e._)("ul",d,[(0,e._)("li",p,[(0,e.Wm)($,{class:"nav-link",to:"/admin/products"},{default:(0,e.w5)((()=>[h])),_:1})]),(0,e._)("li",v,[(0,e.Wm)($,{class:"nav-link",to:"/admin/orders"},{default:(0,e.w5)((()=>[m])),_:1})]),(0,e._)("li",g,[(0,e.Wm)($,{class:"nav-link",to:"/admin/coupon"},{default:(0,e.w5)((()=>[k])),_:1})]),(0,e._)("li",b,[(0,e.Wm)($,{class:"nav-link",to:"/admin/article"},{default:(0,e.w5)((()=>[f])),_:1})]),(0,e._)("a",{href:"#",onClick:t[0]||(t[0]=(0,o.iM)(((...a)=>w.logout&&w.logout(...a)),["prevent"])),class:"nav-link"},"登出")])])])])}var w={methods:{logout(){const a="https://vue3-course-api.hexschool.io/v2/logout";this.$http.post(a).then((a=>{alert("登出成功"),a.data.success&&(document.cookie="hexToken=;expires=;",this.$router.push("/"))})).catch((a=>{alert(a.response)}))}}},$=s(3744);const x=(0,$.Z)(w,[["render",_]]);var W=x,C=s(4902),U={components:{DashNavbar:W},data(){return{status:!1}},methods:{checkLogin(){const a="https://vue3-course-api.hexschool.io/v2/api/user/check";this.$http.post(a).then((a=>{a.data.success?(C.Z.emit("push-message",{style:"success",title:"登入成功"}),this.status=!0):(C.Z.emit("push-message",{style:"danger",title:"登入失敗"}),this.$router.push("/login"))})).catch((a=>{C.Z.emit("push-message",{style:"danger",title:`${a.response.data.message}`}),this.$router.push("/login")}))}},created(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=a,this.checkLogin()}};const Z=(0,$.Z)(U,[["render",n]]);var y=Z}}]);
//# sourceMappingURL=54.19e67cf6.js.map