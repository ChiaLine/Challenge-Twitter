# 簡易推特 API

[![Framework](https://img.shields.io/badge/Framework-Vue-aliceblue.svg)](https://www.npmjs.com/package/vue)
[![Framework](https://img.shields.io/badge/Framework-Bootstrap-steelblue.svg)](https://getbootstrap.com/docs/4.4/getting-started/introduction/)
[![Package](https://img.shields.io/badge/Package-Axios-lightblue.svg)](https://www.npmjs.com/package/axios)

此為簡易推特專案(Simple Twitter)專用的一個前端網頁，提供類似 Twitter 的社群媒體服務功能，例如發佈推文、點讚、或是追隨等動作，主要使用技術包含 Vue.js + Bootstrap + Axios

<span style="color: red">注意:</span> `簡易推特專案一共需要前端網頁以及後端API伺服器，而此 Github Repo 頁面為前端 Repo，如果要前往後端 Github Repo 的頁面，請看接下來的前後端協作資訊，裡面有後端 Github Repo 連結。`

<br>

- 前後端協作資訊:
  - [後端 Github Repo 連結](https://github.com/Richie-Yang/twitter-api-2020)
  - [ERD 資訊連結](https://app.quickdatabasediagrams.com/#/d/BdkVRy)
  - [API 文件連結](https://app.swaggerhub.com/apis-docs/Richie-Yang/simpleTwitter/1.0.0-oas3)

<br>
<br>

## <strong>功能描述</strong>

> ### 登入註冊
>> - 一般使用者註冊
>> - 一般使用者登入
>> - 管理者登入

> ### 推文功能
>> - 新增推文、或是回覆推文資訊
>> - 查詢推文、以及推文回覆資訊
>> - 可對推文點讚、收回點讚動作

> ### 使用者功能
>> - 可修改自己的帳號密碼、或大頭貼、封面和簡介
>> - 查詢使用者的詳細資料
>> - 查詢使用者的推文歷史
>> - 查詢使用者的按讚歷史
>> - 查詢使用者的追蹤與被追隨名單

> ### 追隨功能
>> - 可對其他使用者進行追隨
>> - 可對其他使用者取消追隨

> ### 後台功能
>> - 顯示所有使用者清單
>> - 顯示所有推文清單
>> - 刪除推文資訊

<br>
<br>

## <strong>測試用帳號</strong>
> 1. root (這個帳號只能使用於後台)
```text
account : root
password : 12345678
```

> 2. 五個使用者帳號密碼 (這個帳號只能使用於前台)
```text
account : user1
password : 12345678
```
```text
account : user2
password : 12345678
```
```text
account : user3
password : 12345678
```
```text
account : user4
password : 12345678
```
```text
account : user5
password : 12345678
```

<br>
<br>


## <strong>環境建置需求</strong>
- Git
  - [下載連結](https://git-scm.com/downloads) 
- Node.js 14.16.X
  - [下載連結](https://nodejs.org/dist/v14.16.0/)
- 終端機工具 Terminal、CMD、Git Bash
  - <span style="color: red">注意:</span> `只需要上述的終端機工具項目其中一個即可`
  - [Git Bash下載連結](https://gitforwindows.org/)


<br>
<br>

## 安裝專案
1. Clone 專案到本地
```
git clone https://github.com/ChiaLine/Challenge-Twitter.git
```
2. 進入此專案資料夾
```
cd Challenge-Twitter
```
3. 安裝套件
```
npm install
```

4. 啟動專案
```
npm run serve
```

5. 成功啟動後，請到瀏覽器輸入終端機提供的網址瀏覽專案
```
http://localhost:8080/ 
```

＊＊＊ 選擇打包為靜態檔案
```
npm run build
```

＊＊＊ 檢查專案的環境
```
npm run lint
```

### 相關套件
See [Configuration Reference](https://cli.vuejs.org/config/).
<br>
<br>

## <strong>感謝，參與此次專案的協作者們，大家辛苦了!</strong>
| 組員 | 負責範圍 | 個人 Github 連結 |
| --- | --- | --- | 
| Egg | 前端 | https://github.com/ChiaLine |
| 罐子 Kuan | 前端 | https://github.com/Kanmurio406 |
| Christine | 前端 | https://github.com/Christinnne |
| 靜易 | 後端 | https://github.com/z88243310 |
| Richie | 後端 | https://github.com/Richie-Yang |

<br>
<br>

<p style="font-size: 1.2em">更新時間 : 2021.03.03</p>
