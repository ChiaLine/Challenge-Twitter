(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3bfb0d35"],{"0d81":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"user-follow"},[a("nav",[a("button",{staticClass:"wrapper d-flex",on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.goPreviousPage.apply(null,arguments)}}},[a("img",{staticClass:"arrow",attrs:{src:"https://i.imgur.com/3y7W3fG.png",alt:""}}),a("div",{staticClass:"m-2"},[a("h5",{staticClass:"userName"},[t._v(t._s(t.user.name))]),a("h5",{staticClass:"tweetNumber"},[t._v(t._s(t.user.totalTweets)+" 推文")])])]),a("div",{staticClass:"card-buttons d-flex"},t._l(t.dataType,(function(e){return a("div",{key:e.id},[e.id===t.dataId?a("button",{staticClass:"card-button chosen",on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.setDataId(e.id)}}},[t._v(" "+t._s(e.buttonName)+" ")]):a("button",{staticClass:"card-button normal",on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.setDataId(e.id)}}},[t._v(" "+t._s(e.buttonName)+" ")])])})),0)]),a("FollowCards",{attrs:{"data-id":t.dataId}})],1)},n=[],r=a("5530"),i=a("1da1"),o=(a("96cf"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"follow-cards"},[1===t.dataId?t._l(t.userFollowers,(function(e){return a("div",{key:e.id,staticClass:"follow-card d-flex"},[a("img",{attrs:{src:t._f("emptyImage")(e.avatar),alt:"avatar"}}),a("div",{staticClass:"text-area flex-grow-1 d-flex flex-column"},[a("div",{staticClass:"d-flex justify-content-between"},[a("div",{staticClass:"d-flex flex-column"},[a("p",{staticClass:"name"},[t._v(t._s(e.name))]),a("p",{staticClass:"account"},[t._v("@"+t._s(e.account))])]),e.isFollowed?a("button",{staticClass:"btn following-btn",attrs:{disabled:t.isProcessing},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.deleteIsFollow(e.id)}}},[t._v(" 正在跟隨 ")]):a("button",{staticClass:"btn follow-btn",attrs:{disabled:t.isProcessing},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.addIsFollow(e.id)}}},[t._v(" 跟隨 ")])]),a("p",{staticClass:"introduction"},[t._v(t._s(e.introduction))])])])})):t._l(t.userFollowings,(function(e){return a("div",{key:e.id,staticClass:"follow-card d-flex"},[a("img",{attrs:{src:t._f("emptyImage")(e.avatar),alt:"avatar"}}),a("div",{staticClass:"text-area flex-grow-1 d-flex flex-column"},[a("div",{staticClass:"d-flex justify-content-between"},[a("div",{staticClass:"d-flex flex-column"},[a("p",{staticClass:"name"},[t._v(t._s(e.name))]),a("p",{staticClass:"account"},[t._v("@"+t._s(e.account))])]),e.isFollowed?a("button",{staticClass:"btn following-btn",attrs:{disabled:t.isProcessing},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.deleteIsFollow(e.id)}}},[t._v(" 正在跟隨 ")]):a("button",{staticClass:"btn follow-btn",attrs:{disabled:t.isProcessing},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.addIsFollow(e.id)}}},[t._v(" 跟隨 ")])]),a("p",{staticClass:"introduction"},[t._v(t._s(e.introduction))])])])}))],2)}),c=[],l=(a("a9e3"),a("2708")),u=a("2fa3"),d=a("27f7"),f=a("4360"),p=a("2f62"),v={name:"FollowCards",props:{dataId:{type:Number,default:1}},mixins:[l["a"]],data:function(){return{isProcessing:!1}},computed:Object(r["a"])({},Object(p["b"])(["userFollowings","userFollowers"])),created:function(){this.fetchCardsData()},methods:{fetchCardsData:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(a=t.$route.params.id,e.prev=1,1!==t.dataId){e.next=7;break}return e.next=5,f["a"].dispatch("fetchUserFollowers",{userId:a});case 5:e.next=9;break;case 7:return e.next=9,f["a"].dispatch("fetchUserFollowings",{userId:a});case 9:e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](1),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[1,11]])})))()},addIsFollow:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,e.isProcessing=!0,a.next=4,d["a"].addFollowed({id:t});case 4:return a.next=6,e.fetchCardsData();case 6:return a.next=8,f["a"].dispatch("fetchPopularUsers");case 8:u["a"].fire({icon:"success",title:"成功加入跟隨"}),e.isProcessing=!1,a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](0),u["a"].fire({icon:"error",title:"無法加入追蹤，請稍後再試.."}),e.isProcessing=!1;case 16:case"end":return a.stop()}}),a,null,[[0,12]])})))()},deleteIsFollow:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,e.isProcessing=!0,a.next=4,d["a"].DeleteFollowed(t);case 4:return a.next=6,e.fetchCardsData();case 6:return a.next=8,f["a"].dispatch("fetchPopularUsers");case 8:u["a"].fire({icon:"success",title:"成功取消跟隨"}),e.isProcessing=!1,a.next=16;break;case 12:a.prev=12,a.t0=a["catch"](0),u["a"].fire({icon:"error",title:"無法取消追蹤，請稍後再試.."}),e.isProcessing=!1;case 16:case"end":return a.stop()}}),a,null,[[0,12]])})))()}},watch:{dataId:function(){this.fetchCardsData()}}},w=v,m=(a("ecd7"),a("2877")),h=Object(m["a"])(w,o,c,!1,null,"a1e2b50a",null),b=h.exports,g=a("5aa1"),x={name:"UserFollow",components:{FollowCards:b},data:function(){return{dataId:1,dataType:[{id:1,buttonName:"跟隨者"},{id:2,buttonName:"正在跟隨"}],user:{id:-1,account:"dummyUser",name:"dummyUser",totalTweets:0}}},created:function(){var t=this.$route.query.type;this.checkInitialType(t);var e=this.$route.params.id;this.fetchUser(e)},methods:{setDataId:function(t){this.dataId=t},fetchUser:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var s,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,g["a"].getUserProfile(t);case 3:s=a.sent,n=s.data,e.user=Object(r["a"])({},n),a.next=11;break;case 8:a.prev=8,a.t0=a["catch"](0),u["a"].fire({icon:"warning",title:"無法取得使用者資料"});case 11:case"end":return a.stop()}}),a,null,[[0,8]])})))()},goPreviousPage:function(){this.$router.go(-1)},checkInitialType:function(t){"followers"===t?this.dataId=1:"followings"===t&&(this.dataId=2)}}},C=x,_=(a("4f7a"),Object(m["a"])(C,s,n,!1,null,"7a14a2b2",null));e["default"]=_.exports},"4f7a":function(t,e,a){"use strict";a("70c6")},"70c6":function(t,e,a){},"826a":function(t,e,a){},ecd7:function(t,e,a){"use strict";a("826a")}}]);
//# sourceMappingURL=chunk-3bfb0d35.2ec7bbe9.js.map