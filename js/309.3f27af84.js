"use strict";(self["webpackChunkpanda_nails"]=self["webpackChunkpanda_nails"]||[]).push([[309],{6309:function(a,t,s){s.r(t),s.d(t,{default:function(){return Z}});var e=s(6252);function n(a,t,s,n,o,r){const l=(0,e.up)("DashNavbar"),i=(0,e.up)("router-view");return(0,e.wg)(),(0,e.iD)(e.HY,null,[(0,e.Wm)(l),(0,e.Wm)(i)],64)}var o=s(9963);const r={class:"navbar navbar-expand-lg navbar-dark bg-dark fixed-top"},l={class:"container-fluid"},i=(0,e.Uk)("後台"),c=(0,e._)("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation"},[(0,e._)("span",{class:"navbar-toggler-icon"})],-1),u={class:"collapse navbar-collapse",id:"navbarSupportedContent"},d={class:"navbar-nav me-auto mb-2 mb-lg-0"},p={class:"nav-item"},h=(0,e.Uk)("產品列表"),v={class:"nav-item"},g=(0,e.Uk)("訂單頁面"),m={class:"nav-item"},b=(0,e.Uk)("優惠卷");function k(a,t,s,n,k,f){const _=(0,e.up)("router-link");return(0,e.wg)(),(0,e.iD)("nav",r,[(0,e._)("div",l,[(0,e.Wm)(_,{class:"navbar-brand",to:"/admin"},{default:(0,e.w5)((()=>[i])),_:1}),c,(0,e._)("div",u,[(0,e._)("ul",d,[(0,e._)("li",p,[(0,e.Wm)(_,{class:"nav-link",to:"/admin/products"},{default:(0,e.w5)((()=>[h])),_:1})]),(0,e._)("li",v,[(0,e.Wm)(_,{class:"nav-link",to:"/admin/orders"},{default:(0,e.w5)((()=>[g])),_:1})]),(0,e._)("li",m,[(0,e.Wm)(_,{class:"nav-link",to:"/admin/coupon"},{default:(0,e.w5)((()=>[b])),_:1})]),(0,e._)("a",{href:"#",onClick:t[0]||(t[0]=(0,o.iM)(((...a)=>f.logout&&f.logout(...a)),["prevent"])),class:"nav-link"},"登出")])])])])}var f={methods:{logout(){const a="https://vue3-course-api.hexschool.io/v2/logout";this.$http.post(a).then((a=>{alert("登出成功"),a.data.success&&this.$router.push("/")})).catch((a=>{alert(a.response)}))}}},_=s(3744);const w=(0,_.Z)(f,[["render",k]]);var $=w,x=s(4902),C={components:{DashNavbar:$},data(){return{status:!1}},methods:{checkLogin(){const a="https://vue3-course-api.hexschool.io/v2/api/user/check";this.$http.post(a).then((a=>{a.data.success?(x.Z.emit("push-message",{style:"success",title:"登入成功"}),this.status=!0):(x.Z.emit("push-message",{style:"danger",title:"登入失敗"}),this.$router.push("/login"))})).catch((a=>{console.dir(a),x.Z.emit("push-message",{style:"danger",title:"登入失敗"}),this.$router.push("/login")}))}},created(){const a=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=a,this.checkLogin()}};const W=(0,_.Z)(C,[["render",n]]);var Z=W}}]);
//# sourceMappingURL=309.3f27af84.js.map