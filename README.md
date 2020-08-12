# MUIT_hackathon_aws
## APIまとめ
### 初期設定画面
**<初期設定>**
APIのurl: `ルートURL/api/setting`
method: Post
フロントが送ってくるパラメータ:
- e_mail: string
- name: string
- partner_id: string
- password: string
フロントエンドが受け取るパラメータ
(フロントがデータを保存してくれるなら)
- self_id: string
- e_mail: string
- name: string
- partner_id: string
- partner_name: string

### クイズ画面
**<クイズの取得>**
APIのurl: `ルートURL/api/quize/{self_id}`
method: Get
フロントへ送るパラメータ:
- conetnt(クイズ問題文): string
- choices(クイズの選択肢): string配列
- answer(クイズの回答): string

**<クイズ結果の送信>**
APIのurl: `ルートURL/api/quize/result`
method: Post
フロントから受け取るパラメータ:
- self_id(ユーザのid): string
- result(クイズ結果): boolean

### ポイント交換画面
**<ポイント交換>**
APIのURL: `api/product/exchange/`
method:Post
params:
- product_id: int
- self_id: string

**<商品詳細>**
APIのURL:`api/product/description/{product_id}`
method:Get
params:
- name: string
- description: string
- reccomend: boolean
- value: int

**<商品リスト取得>**
APIのURL:`api/product/list/`
method:Get
params:
[
  {
     product_id: int,
     name: String,
     description: String,
     reccomend: boolean,
     value: int
   }
]

### ログイン画面
**<初期設定>**
APIのurl: `ルートURL/api/login`
method: Post
フロントが送ってくるパラメータ:
- e_mail: string ||  self_id: String
- password: string
フロントエンドが受け取るパラメータ
 if 認証成功
- hasSccess: boolean = true
- self_id: string
- e_mail: string
- name: string
- partner_id: string
- partner_name: string
else
- hasSccess: boolean = false
  =======以下はnull======
- self_id: string
- e_mail: string
- name: string
- partner_id: string
- partner_name: string
