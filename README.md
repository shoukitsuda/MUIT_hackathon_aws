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
- partnerHasPartner: string
- self_id: string
- name: string
- partner_id: string
- partner_name: string
- point: int
```json
{
    "status": 200,
    "body": {
        "partnerHasPartner": true,
        "self_id": "qwixgkqh4m",
        "name": "test8",
        "partner_id": "",
        "partner_name": "",
        "point": 0
    }
}
```

### クイズ画面
**<クイズの取得>**
APIのurl: `ルートURL/api/quize/{self_id}`  
method: Get  
フロントへ送るパラメータ:
- id: string
- conetnt(クイズ問題文): string
- choices(クイズの選択肢): string配列
- answer(クイズの回答): string
```json
{
    "status": 200,
    "body": {
        "content": "1+2は?",
        "id": "2",
        "choices": [
            "a: 1",
            "b: 2",
            "c: 3",
            "d: 4"
        ],
        "answer": "c"
    }
}
```

**<クイズ結果の送信>**  
APIのurl: `ルートURL/api/quize/result`  
method: Post
フロントから受け取るパラメータ:
- self_id(ユーザのid): string
- quize_id(クイズのid): string
- answer(クイズへの回答): string //DBへの変更 conductテーブルにanswerカラム追加 
- result(クイズ結果): boolean
```json
{
    "status": 200,
    "body": {
        "point": 190
    }
}
```

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
```json
{
    "status": 200,
    "body": {
        "hasSuccess": true,
        "self_id": "abcdefghij",
        "e_mail": "test@gmail.com",
        "name": "wife",
        "point": 190,
        "partner_id": "klmnopqrst",
        "partner_name": "husband"  
    }
}
```
