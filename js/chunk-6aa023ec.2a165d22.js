(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6aa023ec"],{"00b4":function(t,e,r){"use strict";r("ac1f");var a=r("23e7"),n=r("da84"),o=r("c65b"),s=r("e330"),i=r("1626"),c=r("861d"),u=function(){var t=!1,e=/[ac]/;return e.exec=function(){return t=!0,/./.exec.apply(this,arguments)},!0===e.test("abc")&&t}(),l=n.Error,d=s(/./.test);a({target:"RegExp",proto:!0,forced:!u},{test:function(t){var e=this.exec;if(!i(e))return d(this,t);var r=o(e,this,t);if(null!==r&&!c(r))throw new l("RegExp exec method returned something other than an Object or null");return!!r}})},"06c5":function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r("fb6a"),r("d3b7"),r("b0c0"),r("a630"),r("3ca3"),r("ac1f"),r("00b4");function a(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,a=new Array(e);r<e;r++)a[r]=t[r];return a}function n(t,e){if(t){if("string"===typeof t)return a(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(t,e):void 0}}},"22d2":function(t,e,r){"use strict";r("9355")},3835:function(t,e,r){"use strict";function a(t){if(Array.isArray(t))return t}r.d(e,"a",(function(){return i}));r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0");function n(t,e){var r=null==t?null:"undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var a,n,o=[],s=!0,i=!1;try{for(r=r.call(t);!(s=(a=r.next()).done);s=!0)if(o.push(a.value),e&&o.length===e)break}catch(c){i=!0,n=c}finally{try{s||null==r["return"]||r["return"]()}finally{if(i)throw n}}return o}}var o=r("06c5");r("d9e2");function s(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function i(t,e){return a(t)||n(t,e)||Object(o["a"])(t,e)||s()}},4575:function(t,e,r){"use strict";var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("form",{staticClass:"d-flex flex-column align-items-center w-100",on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.afterSubmit.apply(null,arguments)}}},[t._l(t.forms,(function(e){return r("div",{key:e.id,staticClass:"position-relative w-100 my-3 form-group"},[r("label",{staticClass:"position-absolute label",attrs:{for:e.category}},[t._v(" "+t._s(e.label)+" ")]),"checkbox"===e.category?r("input",{directives:[{name:"model",rawName:"v-model",value:t.user[e.type],expression:"user[form.type]"}],staticClass:"w-100 input",class:{"account-input":"account"===e.category,regist:!t.show},attrs:{id:e.id,name:e.category,required:"",type:"checkbox"},domProps:{checked:Array.isArray(t.user[e.type])?t._i(t.user[e.type],null)>-1:t.user[e.type]},on:{focusout:function(r){return t.wordLimit(t.user[e.type])},change:function(r){var a=t.user[e.type],n=r.target,o=!!n.checked;if(Array.isArray(a)){var s=null,i=t._i(a,s);n.checked?i<0&&t.$set(t.user,e.type,a.concat([s])):i>-1&&t.$set(t.user,e.type,a.slice(0,i).concat(a.slice(i+1)))}else t.$set(t.user,e.type,o)}}}):"radio"===e.category?r("input",{directives:[{name:"model",rawName:"v-model",value:t.user[e.type],expression:"user[form.type]"}],staticClass:"w-100 input",class:{"account-input":"account"===e.category,regist:!t.show},attrs:{id:e.id,name:e.category,required:"",type:"radio"},domProps:{checked:t._q(t.user[e.type],null)},on:{focusout:function(r){return t.wordLimit(t.user[e.type])},change:function(r){return t.$set(t.user,e.type,null)}}}):r("input",{directives:[{name:"model",rawName:"v-model",value:t.user[e.type],expression:"user[form.type]"}],staticClass:"w-100 input",class:{"account-input":"account"===e.category,regist:!t.show},attrs:{id:e.id,name:e.category,required:"",type:e.category},domProps:{value:t.user[e.type]},on:{focusout:function(r){return t.wordLimit(t.user[e.type])},input:function(r){r.target.composing||t.$set(t.user,e.type,r.target.value)}}}),"account"===e.category?r("span",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],class:{"account-input-text":"account"===e.category}},[t._v("@")]):t._e(),"name"===e.category?r("span",{directives:[{name:"show",rawName:"v-show",value:t.isNameWarning,expression:"isNameWarning"}],staticClass:"position-absolute warning"},[t._v(t._s(t.nameWarning))]):t._e()])})),t.isRegistered()?r("button",{staticClass:"btn save-btn align-self-end mx-0"},[t._v(" 儲存 ")]):r("button",{staticClass:"btn login-btn w-100"},[t._v("註冊")])],2)},n=[],o=(r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0"),r("d9e2"),r("06c5"));function s(t,e){var r="undefined"!==typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=Object(o["a"])(t))||e&&t&&"number"===typeof t.length){r&&(t=r);var a=0,n=function(){};return{s:n,n:function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}},e:function(t){throw t},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var s,i=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){c=!0,s=t},f:function(){try{i||null==r["return"]||r["return"]()}finally{if(c)throw s}}}}var i=r("5530"),c=(r("b0c0"),r("2f62")),u={data:function(){return{user:{account:"",name:"",email:"",password:"",checkPassword:""},forms:[{label:"帳號",category:"account",type:"account",id:1,data:""},{label:"名稱",category:"name",type:"name",id:2,data:""},{label:"Email",category:"email",type:"email",id:3,data:""},{label:"密碼",category:"password",type:"password",id:4,data:""},{label:"密碼確認",category:"password",type:"password-check",id:5,data:""}],nameWarning:"字數超出上限!",isNameWarning:!1,show:!1}},computed:Object(i["a"])({},Object(c["b"])(["currentUser"])),created:function(){this.getcurrentUser()},methods:{getcurrentUser:function(){"Regist"===this.$route.name?(this.show=!1,this.user=Object(i["a"])({},this.user)):"Setting"===this.$route.name&&(this.show=!0,this.user=Object(i["a"])(Object(i["a"])({},this.user),this.currentUser))},isRegistered:function(){return"Regist"!==this.$route.name&&("Setting"===this.$route.name||void 0)},wordLimit:function(t){t.length>50?(event.target.classList.add("error"),this.isNameWarning=!0):(event.target.classList.remove("error"),this.isNameWarning=!1)},afterSubmit:function(t){var e,r=t.target,a=new FormData(r),n=[],o=s(a.values());try{for(o.s();!(e=o.n()).done;){var i=e.value;n.push(i)}}catch(c){o.e(c)}finally{o.f()}this.$emit("after-submit",n)}}},l=u,d=(r("22d2"),r("2877")),f=Object(d["a"])(l,a,n,!1,null,"05325936",null);e["a"]=f.exports},"4ef5":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[r("NavBar",{staticClass:"col-md-2",on:{"after-show-tweet-modal":t.afterShowTweetModal}}),r("div",{staticClass:"setting-main col-md-10"},[r("h5",{staticClass:"setting-title p-3"},[t._v("帳戶設定")]),r("div",{staticClass:"setting-form"},[r("SetProfile",{staticClass:"p-3",on:{"after-submit":t.handleAfterSubmit}})],1)]),t.showModal?r("TweetModal",{on:{"after-hide-modal":t.afterHideModal}}):t._e()],1)},n=[],o=r("5530"),s=r("3835"),i=r("1da1"),c=(r("96cf"),r("d000")),u=r("4575"),l=r("4287"),d=r("5aa1"),f=r("2fa3"),m=r("2f62"),p={name:"Setting",components:{NavBar:c["a"],SetProfile:u["a"],TweetModal:l["a"]},data:function(){return{showModal:!1}},methods:{afterShowTweetModal:function(){this.showModal=!0},afterHideModal:function(){this.showModal=!1},handleAfterSubmit:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var a,n,o,i,c,u;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a=Object(s["a"])(t,5),n=a[0],o=a[1],i=a[2],c=a[3],u=a[4],r.prev=1,r.next=4,d["a"].update(e.currentUser.id,{account:n,name:o,email:i,password:c,checkPassword:u});case 4:e.$router.go(0),r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](1),f["a"].fire({icon:"error",title:r.t0.response.data.message});case 10:case"end":return r.stop()}}),r,null,[[1,7]])})))()}},computed:Object(o["a"])({},Object(m["b"])(["currentUser"]))},h=p,y=(r("f5c4"),r("2877")),b=Object(y["a"])(h,a,n,!1,null,"d56c5d0c",null);e["default"]=b.exports},7197:function(t,e,r){},9355:function(t,e,r){},a630:function(t,e,r){var a=r("23e7"),n=r("4df4"),o=r("1c7e"),s=!o((function(t){Array.from(t)}));a({target:"Array",stat:!0,forced:s},{from:n})},d28b:function(t,e,r){var a=r("746f");a("iterator")},f5c4:function(t,e,r){"use strict";r("7197")}}]);
//# sourceMappingURL=chunk-6aa023ec.2a165d22.js.map