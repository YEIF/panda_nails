"use strict";(self["webpackChunkpanda_nails"]=self["webpackChunkpanda_nails"]||[]).push([[471],{908:function(e,o,t){function n(e){const o=new Date(1e3*e);return o.toLocaleDateString()}function l(e){const o=new Date(1e3*e),t=` ${o.getFullYear()}/${o.getMonth()+1}/${o.getDate()}  ${o.getHours()}:${o.getMinutes()}:${o.getSeconds()}`;return t}function a(e){const o=e.toString().split(".");return o[0]=o[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),o.join(".")}t.d(o,{D:function(){return n},lf:function(){return l},$E:function(){return a}})},9471:function(e,o,t){t.r(o),t.d(o,{default:function(){return se}});var n=t(6252),l=t(3577);const a={class:"container"},s={class:"text-end mt-4"},i={class:"table mt-4"},d=(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"名稱"),(0,n._)("th",null,"折扣百分比"),(0,n._)("th",null,"到期日"),(0,n._)("th",null,"是否啟用"),(0,n._)("th",null,"編輯")])],-1),u={key:0,class:"text-success"},p={key:1,class:"text-muted text-danger"},c={class:"btn-group"},r=["onClick"],m=["onClick"];function h(e,o,t,h,b,_){const C=(0,n.up)("VLoading"),g=(0,n.up)("CouponModalComponent"),f=(0,n.up)("DelCouponModalComponent");return(0,n.wg)(),(0,n.iD)("div",a,[(0,n.Wm)(C,{active:b.isLoading,"z-index":1060},null,8,["active"]),(0,n._)("div",s,[(0,n._)("button",{class:"btn btn-primary",type:"button",onClick:o[0]||(o[0]=e=>_.openCouponModal("new"))}," 建立新的優惠券 ")]),(0,n._)("table",i,[d,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(b.coupons,((e,o)=>((0,n.wg)(),(0,n.iD)("tr",{key:o},[(0,n._)("td",null,(0,l.zw)(e.title),1),(0,n._)("td",null,(0,l.zw)(e.percent)+"%",1),(0,n._)("td",null,(0,l.zw)(_.DateFn(e.due_date)),1),(0,n._)("td",null,[1===e.is_enabled?((0,n.wg)(),(0,n.iD)("span",u,"啟用")):((0,n.wg)(),(0,n.iD)("span",p,"未啟用"))]),(0,n._)("td",null,[(0,n._)("div",c,[(0,n._)("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:o=>_.openCouponModal("edit",e)}," 編輯 ",8,r),(0,n._)("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:o=>_.openCouponModal("del",e)}," 刪除 ",8,m)])])])))),128))])]),(0,n.Wm)(g,{ref:"couponModal","temp-coupon":b.tempCoupon,"is-new":b.isNew,onGetCoupons:_.getCoupons},null,8,["temp-coupon","is-new","onGetCoupons"]),(0,n.Wm)(f,{ref:"delCouponModal","temp-coupon":b.tempCoupon,onGetCoupons:_.getCoupons},null,8,["temp-coupon","onGetCoupons"])])}var b=t(908),_=t(9963);const C={class:"modal fade",id:"couponModal",tabindex:"-1",role:"dialog","aria-labelledby":"exampleModalLabel","aria-hidden":"true",ref:"modal"},g={class:"modal-dialog",role:"document"},f={class:"modal-content"},v={class:"modal-header"},y={class:"modal-title",id:"exampleModalLabel"},w={key:0},M={key:1},$=(0,n._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),k={class:"modal-body"},x={class:"mb-3"},D=(0,n._)("label",{for:"title"},"標題",-1),L={class:"mb-3"},N=(0,n._)("label",{for:"coupon_code"},"優惠碼",-1),Z={class:"mb-3"},S=(0,n._)("label",{for:"due_date"},"到期日",-1),z={class:"mb-3"},V=(0,n._)("label",{for:"price"},"折扣百分比",-1),O={class:"mb-3"},U={class:"form-check"},W=(0,n._)("label",{class:"form-check-label",for:"is_enabled"}," 是否啟用 ",-1),G={class:"modal-footer"};function H(e,o,t,a,s,i){const d=(0,n.up)("VLoading");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(d,{active:s.isLoading,"z-index":1060},null,8,["active"]),(0,n._)("div",C,[(0,n._)("div",g,[(0,n._)("div",f,[(0,n._)("div",v,[(0,n._)("h3",y,[t.isNew?((0,n.wg)(),(0,n.iD)("span",w,"新增優惠卷")):((0,n.wg)(),(0,n.iD)("span",M,"編輯優惠卷"))]),$]),(0,n._)("div",k,[(0,n._)("div",x,[D,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"title","onUpdate:modelValue":o[0]||(o[0]=e=>s.localCoupon.title=e),placeholder:"請輸入標題"},null,512),[[_.nr,s.localCoupon.title]])]),(0,n._)("div",L,[N,(0,n.wy)((0,n._)("input",{type:"text",class:"form-control",id:"coupon_code","onUpdate:modelValue":o[1]||(o[1]=e=>s.localCoupon.code=e),placeholder:"請輸入優惠碼"},null,512),[[_.nr,s.localCoupon.code]])]),(0,n._)("div",Z,[S,(0,n.wy)((0,n._)("input",{type:"date",class:"form-control",id:"due_date","onUpdate:modelValue":o[2]||(o[2]=e=>s.due_date=e)},null,512),[[_.nr,s.due_date]])]),(0,n._)("div",z,[V,(0,n.wy)((0,n._)("input",{type:"number",class:"form-control",id:"price",min:"0","onUpdate:modelValue":o[3]||(o[3]=e=>s.localCoupon.percent=e),placeholder:"請輸入折扣百分比"},null,512),[[_.nr,s.localCoupon.percent,void 0,{number:!0}]])]),(0,n._)("div",O,[(0,n._)("div",U,[(0,n.wy)((0,n._)("input",{class:"form-check-input",type:"checkbox","true-value":1,"false-value":0,"onUpdate:modelValue":o[4]||(o[4]=e=>s.localCoupon.is_enabled=e),id:"is_enabled"},null,512),[[_.e8,s.localCoupon.is_enabled]]),W])])]),(0,n._)("div",G,[(0,n._)("button",{type:"button",class:"btn btn-secondary",onClick:o[5]||(o[5]=(...o)=>e.hideModal&&e.hideModal(...o))}," Close "),(0,n._)("button",{type:"button",class:"btn btn-primary",onClick:o[6]||(o[6]=e=>i.updateCoupon(s.localCoupon))},(0,l.zw)(t.isNew?"新增優惠卷":"更新優惠券"),1)])])])],512)],64)}var J=t(6716),Y=t(4902),j={mixins:[J.Z],props:{tempCoupon:{type:Object,default(){return{}}},isNew:{type:Boolean,default:!1}},emits:["get-coupons"],data(){return{localCoupon:{},due_date:"",isLoading:!1}},watch:{tempCoupon(){this.localCoupon=this.tempCoupon;const e=new Date(1e3*this.localCoupon.due_date).toISOString().split("T");[this.due_date]=e},due_date(){this.localCoupon.due_date=Math.floor(new Date(this.due_date)/1e3)}},methods:{updateCoupon(){this.isLoading=!0;let e="https://vue3-course-api.hexschool.io/v2/api/clothes/admin/coupon",o="post",t="新增";this.isNew||(e=`https://vue3-course-api.hexschool.io/v2/api/clothes/admin/coupon/${this.localCoupon.id}`,o="put",t="更新"),this.$http[o](e,{data:this.localCoupon}).then((e=>{this.isLoading=!1,Y.Z.emit("push-message",{style:"success",title:`${t}${this.localCoupon.title}優惠卷`}),this.$emit("get-coupons"),this.hideModal()})).catch((e=>{this.isLoading=!1,Y.Z.emit("push-message",{style:"danger",title:`${t}${this.localCoupon.title}優惠卷`,content:`${e.response.data.message}`})}))}}},F=t(3744);const B=(0,F.Z)(j,[["render",H]]);var T=B;const E={id:"delCouponModal",ref:"modal",class:"modal fade",tabindex:"-1","aria-labelledby":"delCouponModalLabel","aria-hidden":"true"},I={class:"modal-dialog"},K={class:"modal-content border-0"},q=(0,n._)("div",{class:"modal-header bg-danger text-white"},[(0,n._)("h5",{id:"delCouponModalLabel",class:"modal-title"},[(0,n._)("span",null,"刪除產品")]),(0,n._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),A={class:"modal-body"},P=(0,n.Uk)(" 是否刪除 "),Q={class:"text-danger"},R=(0,n.Uk)(" 優惠卷(刪除後將無法恢復)。 "),X={class:"modal-footer"};function ee(e,o,t,a,s,i){const d=(0,n.up)("VLoading");return(0,n.wg)(),(0,n.iD)(n.HY,null,[(0,n.Wm)(d,{active:s.isLoading,"z-index":1060},null,8,["active"]),(0,n._)("div",E,[(0,n._)("div",I,[(0,n._)("div",K,[q,(0,n._)("div",A,[P,(0,n._)("strong",Q,(0,l.zw)(t.tempCoupon.title),1),R]),(0,n._)("div",X,[(0,n._)("button",{type:"button",class:"btn btn-outline-secondary",onClick:o[0]||(o[0]=(...o)=>e.hideModal&&e.hideModal(...o))}," 取消 "),(0,n._)("button",{type:"button",class:"btn btn-danger",onClick:o[1]||(o[1]=e=>i.delCoupon())}," 確認刪除 ")])])])],512)],64)}var oe={props:{tempCoupon:{type:Object,default(){return{}}}},emits:["get-coupons"],mixins:[J.Z],data(){return{isLoading:!1}},methods:{delCoupon(){this.isLoading=!0;const e=`https://vue3-course-api.hexschool.io/v2/api/clothes/admin/coupon/${this.tempCoupon.id}`;this.$http.delete(e).then((e=>{this.isLoading=!1,this.$emit("get-coupons"),this.hideModal(),Y.Z.emit("push-message",{style:"success",title:`已刪除${this.tempCoupon.title}優惠卷`})})).catch((e=>{this.isLoading=!1,Y.Z.emit("push-message",{style:"danger",title:`${e.response.data.message}`})}))}}};const te=(0,F.Z)(oe,[["render",ee]]);var ne=te,le={components:{CouponModalComponent:T,DelCouponModalComponent:ne},data(){return{coupons:{},tempCoupon:{title:"",is_enabled:0,percent:100,code:""},isLoading:!1,isNew:!1}},methods:{getCoupons(){this.isLoading=!0;const e="https://vue3-course-api.hexschool.io/v2/api/clothes/admin/coupons";this.$http.get(e).then((e=>{this.coupons=e.data.coupons,this.isLoading=!1})).catch((e=>{Y.Z.emit("push-message",{style:"danger",title:`${e.response.data.message}`})}))},DateFn:b.D,openCouponModal(e,o){"new"===e?(this.isNew=!0,this.tempCoupon={due_date:(new Date).getTime()/1e3,is_enabled:0},this.$refs.couponModal.openModal()):"edit"===e?(this.isNew=!1,this.tempCoupon=JSON.parse(JSON.stringify(o)),this.$refs.couponModal.openModal()):"del"===e&&(this.isNew=!1,this.tempCoupon=JSON.parse(JSON.stringify(o)),this.$refs.delCouponModal.openModal())}},mounted(){this.getCoupons()}};const ae=(0,F.Z)(le,[["render",h]]);var se=ae}}]);
//# sourceMappingURL=471.43bb8d06.js.map