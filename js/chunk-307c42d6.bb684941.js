(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-307c42d6"],{"41ef":function(e,t,s){},"5e96":function(e,t,s){"use strict";s("b943")},7950:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"wrapper"},[s("div",{staticClass:"d-flex"},[s("img",{staticClass:"arrow",attrs:{src:"https://i.imgur.com/3y7W3fG.png",alt:""},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.goBack.apply(null,arguments)}}}),s("div",{staticClass:"m-2"},[s("h5",{staticClass:"returnTweet"},[e._v(e._s(e.user.name))]),s("h5",{staticClass:"tweetNumber"},[e._v(e._s(e.user.totalTweets)+"貼文")])])]),s("div",{staticClass:"position-relative"},[s("img",{staticClass:"cover w-100",attrs:{src:e._f("emptyImage")(e.user.cover),alt:""}}),s("img",{staticClass:"avatar ml-3 position-absolute",attrs:{src:e._f("emptyImage")(e.user.avatar),alt:""}})]),s("div",{staticClass:"profile position-relative ml-3"},[e.isCurrentUser?s("button",{staticClass:"editProfile btn position-absolute",on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.showUserEditModal.apply(null,arguments)}}},[e._v(" 編輯個人資料 ")]):s("div",{staticClass:"followOther position-absolute d-flex"},[s("button",{staticClass:"iconWrapper d-flex",on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.sendMessage(e.user.id)}}},[s("img",{staticClass:"iconMail m-auto",attrs:{src:"https://imgur.com/nBCwk65.png",alt:""}})]),e._m(0),e.user.isFollowed?s("button",{staticClass:"following btn",attrs:{disabled:e.isProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.deleteIsFollow(e.user.id)}}},[e._v(" 正在跟隨 ")]):s("button",{staticClass:"editProfile btn",attrs:{disabled:e.isProcessing},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.addIsFollow(e.user.id)}}},[e._v(" 跟隨 ")])]),s("h2",{staticClass:"name"},[e._v(e._s(e.user.name))]),s("h5",{staticClass:"account"},[e._v("@"+e._s(e.user.account))]),s("p",{staticClass:"note"},[e._v(" "+e._s(e.user.introduction)+" ")]),s("div",{staticClass:"follow d-flex"},[s("router-link",{staticClass:"record d-flex mr-4",attrs:{to:{name:"UserFollow",params:{id:e.user.id},query:{type:"followings"}}}},[s("p",{staticClass:"number"},[e._v(e._s(e.user.totalFollowings)+"個")]),s("p",{staticClass:"text"},[e._v("跟隨中")])]),s("router-link",{staticClass:"record d-flex",attrs:{to:{name:"UserFollow",params:{id:e.user.id},query:{type:"followers"}}}},[s("p",{staticClass:"number"},[e._v(e._s(e.user.totalFollowers)+"位")]),s("p",{staticClass:"text"},[e._v("跟隨者")])])],1)])])},a=[function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("button",{staticClass:"iconWrapper d-flex"},[s("img",{staticClass:"iconNotify m-auto",attrs:{src:"https://imgur.com/fCt60a2.png",alt:""}})])}],i=s("1da1"),n=s("5530"),c=(s("96cf"),s("b0c0"),s("2708")),o=s("2f62"),l=s("27f7"),u=s("2fa3"),d={mixins:[c["a"]],props:{initialUser:{type:Object,required:!0}},data:function(){return{user:{id:-1,account:"",email:"",name:"",avatar:"",cover:null,introduction:"",role:"",totalTweets:0,totalFollowings:0,totalFollowers:0,totalLiked:0,createdAt:"",updatedAt:""},isCurrentUser:"",isProcessing:!1}},computed:Object(n["a"])({},Object(o["b"])(["currentUser"])),created:function(){this.checkCurrentPage()},methods:{checkCurrentPage:function(){var e=this.$route.name;"UserSelf"===e?(this.user=Object(n["a"])(Object(n["a"])({},this.user),this.currentUser),this.isCurrentUser=!0):"UserOther"===e&&(this.isCurrentUser=!1)},goBack:function(){this.$router.back()},showUserEditModal:function(){this.$emit("after-show-user-edit-modal")},addIsFollow:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,t.isProcessing=!0,s.next=4,l["a"].addFollowed({id:e});case 4:u["a"].fire({icon:"success",title:"成功加入跟隨"}),t.isProcessing=!1,t.$router.go(0),s.next=13;break;case 9:s.prev=9,s.t0=s["catch"](0),u["a"].fire({icon:"error",title:"無法加入追蹤，請稍後再試.."}),t.isProcessing=!1;case 13:case"end":return s.stop()}}),s,null,[[0,9]])})))()},deleteIsFollow:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,t.isProcessing=!0,s.next=4,l["a"].DeleteFollowed(e);case 4:u["a"].fire({icon:"success",title:"成功取消跟隨"}),t.isProcessing=!1,t.$router.go(0),s.next=13;break;case 9:s.prev=9,s.t0=s["catch"](0),u["a"].fire({icon:"error",title:"無法取消追蹤，請稍後再試.."}),t.isProcessing=!1;case 13:case"end":return s.stop()}}),s,null,[[0,9]])})))()},sendMessage:function(e){console.log("發送userId給後端: ",e),this.$socket.client.emit("to private message",e),this.$router.push({name:"Message"})}},watch:{initialUser:function(e){this.user=Object(n["a"])(Object(n["a"])({},this.user),e)}}},p=d,f=(s("5e96"),s("2877")),w=Object(f["a"])(p,r,a,!1,null,"5ccf617a",null);t["a"]=w.exports},af41:function(e,t,s){"use strict";s("41ef")},b943:function(e,t,s){},faf9:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"h-100"},[s("div",{staticClass:"self-buttons"},[s("button",{staticClass:"self-button",class:{active:"tweet"===e.toggleButton},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.fetchUserTweets(e.user.id)}}},[e._v(" 推文 ")]),s("button",{staticClass:"self-button",class:{active:"reply"===e.toggleButton},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.fetchUserReplyTweets(e.user.id)}}},[e._v(" 推文與回覆 ")]),s("button",{staticClass:"self-button",class:{active:"like"===e.toggleButton},on:{click:function(t){return t.stopPropagation(),t.preventDefault(),e.fetchUserLikeTweets(e.user.id)}}},[e._v(" 喜歡的內容 ")])]),"tweet"===e.toggleButton?s("div",{staticClass:"tweet-cards"},e._l(e.userTweets,(function(t){return s("div",{key:t.id,staticClass:"tweet-card"},[s("div",{staticClass:"tweet-card-top"},[s("div",{staticClass:"tweet-card-avatar"},[s("div",{on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.toUserPage(t.UserId)}}},[s("img",{staticClass:"tweet-card-img",attrs:{src:e._f("emptyImage")(e.user.avatar)}})])]),s("div",{staticClass:"tweet-card-content",on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.toReplyList(t.id)}}},[s("div",[s("span",{staticClass:"tweet-card-name"},[e._v(e._s(e.user.name))]),s("span",{staticClass:"tweet-card-account"},[e._v(" @"+e._s(e.user.account)+"・"+e._s(e._f("formatDate")(t.createdAt))+" ")]),s("p",{staticClass:"tweet-card-description"},[e._v(" "+e._s(t.description)+" ")])])])]),s("div",{staticClass:"tweet-card-icons"},[s("button",{staticClass:"tweet-reply-icon",on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.afterShowReplyModal(t.id)}}},[s("img",{staticClass:"icon-reply",attrs:{src:e.iconReply}}),s("span",[e._v(e._s(t.totalReplies))])]),t.isLiked?s("button",{staticClass:"tweet-like-icon",attrs:{disabled:e.isProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.deleteTweetLike(t.id)}}},[s("img",{staticClass:"icon-like",attrs:{src:e.iconIsLike}}),s("span",[e._v(e._s(t.totalLikes))])]):s("button",{staticClass:"tweet-like-icon",attrs:{disabled:e.isProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.addTweetCardLike(t.id)}}},[s("img",{staticClass:"icon-like",attrs:{src:e.iconUnLike}}),s("span",[e._v(e._s(t.totalLikes))])])])])})),0):"reply"===e.toggleButton?s("div",{staticClass:"tweet-cards"},e._l(e.userRepliedTweets,(function(t){return s("div",{key:t.id,staticClass:"tweet-card"},[s("div",{staticClass:"tweet-card-top"},[s("div",{staticClass:"tweet-card-avatar"},[s("div",{on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.toUserPage(t.UserId)}}},[s("img",{staticClass:"tweet-card-img",attrs:{src:e._f("emptyImage")(e.user.avatar)}})])]),s("div",{staticClass:"tweet-card-content"},[s("div",[s("span",{staticClass:"tweet-card-name"},[e._v(e._s(e.user.name))]),s("span",{staticClass:"tweet-card-account"},[e._v(" @"+e._s(e.user.account)+"・"+e._s(e._f("formatDate")(t.createdAt))+" ")]),s("div",{staticClass:"tweet-card-reply"},[s("span",{staticClass:"card-reply-title"},[e._v("回覆")]),s("span",{staticClass:"card-reply-name"},[e._v("@"+e._s(t.repliedTweet.tweetedUser.account))])]),s("p",{staticClass:"tweet-card-description"},[e._v(" "+e._s(t.comment)+" ")])])])])])})),0):"like"===e.toggleButton?s("div",{staticClass:"tweet-cards"},e._l(e.userLikeTweets,(function(t){return s("div",{key:t.id,staticClass:"tweet-card"},[s("div",{staticClass:"tweet-card-top"},[s("div",{staticClass:"tweet-card-avatar"},[s("div",{on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.toUserPage(t.likedTweet.UserId)}}},[s("img",{staticClass:"tweet-card-img",attrs:{src:e._f("emptyImage")(t.likedTweet.tweetedUser.avatar)}})])]),s("div",{staticClass:"tweet-card-content",on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.toReplyList(t.likedTweet.id)}}},[s("div",[s("span",{staticClass:"tweet-card-name"},[e._v(e._s(t.likedTweet.tweetedUser.name))]),s("span",{staticClass:"tweet-card-account"},[e._v(" @"+e._s(t.likedTweet.tweetedUser.account)+"・"+e._s(e._f("formatDate")(t.likedTweet.createdAt))+" ")]),s("p",{staticClass:"tweet-card-description"},[e._v(" "+e._s(t.likedTweet.description)+" ")])])])]),s("div",{staticClass:"tweet-card-icons"},[s("button",{staticClass:"tweet-reply-icon",on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.afterShowReplyModal(t.likedTweet.id)}}},[s("img",{staticClass:"icon-reply",attrs:{src:e.iconReply}}),s("span",[e._v(e._s(t.likedTweet.totalReplies))])]),t.likedTweet.isLiked?s("button",{staticClass:"tweet-like-icon",attrs:{disabled:e.isProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.deleteTweetLike(t.likedTweet.id)}}},[s("img",{staticClass:"icon-like",attrs:{src:e.iconIsLike}}),s("span",[e._v(e._s(t.likedTweet.totalLikes))])]):s("button",{staticClass:"tweet-like-icon",attrs:{disabled:e.isProcessing},on:{click:function(s){return s.stopPropagation(),s.preventDefault(),e.addTweetCardLike(t.likedTweet.id)}}},[s("img",{staticClass:"icon-like",attrs:{src:e.iconUnLike}}),s("span",[e._v(e._s(t.likedTweet.totalLikes))])])])])})),0):e._e()])},a=[],i=s("1da1"),n=s("5530"),c=(s("96cf"),s("b0c0"),s("a9e3"),s("ac1f"),s("1276"),s("a15b"),s("2708")),o=s("5aa1"),l=s("e809"),u=s("2fa3"),d=s("2f62"),p={name:"UserTweetListCard",props:{initialUser:{type:Object,required:!0}},mixins:[c["a"],c["b"]],data:function(){return{user:{id:-1,account:"",email:"",name:"",avatar:"",cover:null,introduction:"",role:"",totalTweets:0,totalFollowings:0,totalFollowers:0,totalLiked:0,createdAt:"",updatedAt:""},isCurrentUser:"",userTweets:[],userRepliedTweets:[],userLikeTweets:[],iconUnLike:"https://i.imgur.com/fWY8yOj.png",iconIsLike:"https://i.imgur.com/LQTMNI0.png",iconReply:"https://i.imgur.com/EwJRYkP.png",toggleButton:"tweet",isProcessing:!1,currentPage:""}},computed:Object(n["a"])({},Object(d["b"])(["currentUser"])),watch:{initialUser:function(e){this.user=Object(n["a"])(Object(n["a"])({},this.user),e),this.fetchUserTweets(this.user.id)}},created:function(){this.checkCurrentPage()},methods:{checkCurrentPage:function(){this.currentPage=this.$route.name,"UserSelf"===this.currentPage?(this.user=Object(n["a"])(Object(n["a"])({},this.user),this.currentUser),this.isCurrentUser=!0,this.fetchUserTweets(this.user.id)):"UserOther"===this.currentPage&&(this.isCurrentUser=!1)},fetchUserTweets:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var r,a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,o["a"].getUserTweets(e);case 3:r=s.sent,a=r.data,t.userTweets=a,t.userTweets.length||u["a"].fire({icon:"error",title:"沒有推文的內容"}),t.toggleButton="tweet",s.next=14;break;case 10:s.prev=10,s.t0=s["catch"](0),console.error(s.t0),u["a"].fire({icon:"error",title:s.t0.response.data.message});case 14:case"end":return s.stop()}}),s,null,[[0,10]])})))()},fetchUserReplyTweets:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var r,a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,o["a"].getUserRepliedTweets(e);case 3:r=s.sent,a=r.data,t.userRepliedTweets=a,t.userRepliedTweets.length||u["a"].fire({icon:"error",title:"沒有回覆推文的內容"}),t.toggleButton="reply",s.next=14;break;case 10:s.prev=10,s.t0=s["catch"](0),console.error(s.t0),u["a"].fire({icon:"error",title:s.t0.response.data.message});case 14:case"end":return s.stop()}}),s,null,[[0,10]])})))()},fetchUserLikeTweets:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){var r,a;return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,s.next=3,o["a"].getUserLikeTweets(e);case 3:r=s.sent,a=r.data,t.userLikeTweets=a,t.userLikeTweets.length||u["a"].fire({icon:"error",title:"沒有喜歡的內容"}),t.toggleButton="like",s.next=14;break;case 10:s.prev=10,s.t0=s["catch"](0),console.error(s.t0),u["a"].fire({icon:"error",title:s.t0.response.data.message});case 14:case"end":return s.stop()}}),s,null,[[0,10]])})))()},addTweetCardLike:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,t.isProcessing=!0,s.next=4,l["a"].addTweetLike(e);case 4:if("tweet"!==t.toggleButton){s.next=9;break}return s.next=7,t.fetchUserTweets(t.user.id);case 7:s.next=12;break;case 9:if("like"!==t.toggleButton){s.next=12;break}return s.next=12,t.fetchUserLikeTweets(t.user.id);case 12:u["a"].fire({icon:"success",title:"成功加入喜歡的內容"}),t.isProcessing=!1,s.next=20;break;case 16:s.prev=16,s.t0=s["catch"](0),t.isProcessing=!1,u["a"].fire({icon:"error",title:s.t0.response.data.message});case 20:case"end":return s.stop()}}),s,null,[[0,16]])})))()},deleteTweetLike:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.prev=0,t.isProcessing=!0,s.next=4,l["a"].deleteTweetLike(e);case 4:if("UserSelf"!==t.currentPage){s.next=9;break}return s.next=7,t.fetchUserLikeTweets(t.user.id);case 7:s.next=18;break;case 9:if("UserOther"!==t.currentPage){s.next=18;break}if("tweet"!==t.toggleButton){s.next=15;break}return s.next=13,t.fetchUserTweets(t.user.id);case 13:s.next=18;break;case 15:if("like"!==t.toggleButton){s.next=18;break}return s.next=18,t.fetchUserLikeTweets(t.user.id);case 18:u["a"].fire({icon:"success",title:"成功取消喜歡的內容"}),t.isProcessing=!1,s.next=26;break;case 22:s.prev=22,s.t0=s["catch"](0),t.isProcessing=!1,u["a"].fire({icon:"error",title:s.t0.response.data.message});case 26:case"end":return s.stop()}}),s,null,[[0,22]])})))()},afterShowReplyModal:function(e){this.$emit("after-show-reply-modal",e)},toUserPage:function(e){if(e!==this.currentUser.id||"UserSelf"===this.$route.name){if(e!==this.currentUser.id&&("UserOther"!==this.$route.name||Number(this.$route.params.id)!==e))if("UserSelf"===this.$route.name)this.$router.push({name:"UserOther",params:{id:e}});else{var t=window.location.href.split("/");t[t.length-1]=e;var s=t.join("/");window.location.href=s,window.location.reload()}}else this.$router.push({name:"UserSelf"})},toReplyList:function(e){this.$router.push({name:"ReplyList",params:{id:e}})}}},f=p,w=(s("af41"),s("2877")),g=Object(w["a"])(f,r,a,!1,null,"534c7529",null);t["a"]=g.exports}}]);
//# sourceMappingURL=chunk-307c42d6.bb684941.js.map