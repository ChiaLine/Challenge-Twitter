(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-741908be"],{"101a":function(t,e,s){},"355a":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"AdminUserList"},[s("div",[s("h6",{staticClass:"m-3"},[t._v("使用者列表")]),s("div",{staticClass:"cards"},t._l(t.users,(function(e){return s("div",{key:e.id,staticClass:"card"},[s("div",{staticClass:"card-img-top"},[s("img",{staticClass:"background-img",attrs:{src:t._f("emptyImage")(e.cover)}})]),s("div",{staticClass:"user-img-container"},[s("img",{staticClass:"user-img",attrs:{src:t._f("emptyImage")(e.avatar)}})]),s("div",{staticClass:"card-body"},[s("h5",[t._v(t._s(e.name))]),s("p",[t._v("@"+t._s(e.account))]),s("div",{staticClass:"card-body-bottom"},[s("img",{staticClass:"card-body-icon",attrs:{src:"https://i.imgur.com/EwJRYkP.png"}}),s("p",[t._v(t._s(e.totalTweets))]),s("img",{staticClass:"card-body-icon",attrs:{src:"https://i.imgur.com/fWY8yOj.png"}}),s("p",[t._v(t._s(e.totalLiked))])]),s("p",[s("span",[t._v(t._s(e.totalFollowings)+"個跟隨中")]),s("span",[t._v(t._s(e.totalFollowers)+"位跟隨者")])])])])})),0)])])},r=[],n=s("1da1"),i=(s("96cf"),s("be6c")),c=s("2fa3"),o=s("2708"),u={name:"AdminUserList",mixins:[o["a"]],data:function(){return{users:[]}},created:function(){this.fetchUsers()},methods:{fetchUsers:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var s,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,i["a"].getUsersList();case 3:s=e.sent,a=s.data,t.users=a,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),c["a"].fire({icon:"error",title:e.t0.response.data.message});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}}},d=u,l=(s("39cb"),s("2877")),m=Object(l["a"])(d,a,r,!1,null,"28b00a1a",null);e["default"]=m.exports},"39cb":function(t,e,s){"use strict";s("101a")},be6c:function(t,e,s){"use strict";var a=s("2fa3"),r=function(){return localStorage.getItem("adminToken")};e["a"]={getTweetsList:function(){return a["b"].get("/admin/tweets",{headers:{Authorization:"Bearer ".concat(r())}})},deleteTweet:function(t){return a["b"].delete("/admin/tweets/".concat(t),{headers:{Authorization:"Bearer ".concat(r())}})},getUsersList:function(){return a["b"].get("/admin/users",{headers:{Authorization:"Bearer ".concat(r())}})}}}}]);
//# sourceMappingURL=chunk-741908be.2411daf5.js.map