'use strict';

{

//もうちょっとちゃんしたGET/POSTを調べる必要あり
//JSONからデータを抽出する方法をしらべなきゃいけない
const api_URL = 'https/sssffsa';

const request = new XMLHttpRequest();
request.open('GET', URL, true);

//ユーザーIDをローカルストレージから引き出す(メールアドレス使う)
const selfID = localStorage.getItem("e_mail");
console.log(selfID);

//アイテムリスト(ダミーデータ)
const items = [
  {id:1, name:'チケット1枚', description: '美味しいです。', recommend: false, value: 300},
  {id:2, name:'チケット2枚', description: '美味しいです。', recommend: false, value: 500},
  {id:3, name:'ポップコーン', description: '美味しいです。', recommend: false, value: 200},
  {id:4, name:'チュロス', description: '美味しいです。', recommend: false, value: 200},
  {id:5, name:'ドリンク', description: '美味しいです。', recommend: false, value: 150},
];

//ユーザID(ダミーデータ)
const users = [
  {id:1, e_mail:'aaaa@gmail.com', name:'山田太郎', password:'123', answer_limit:'20200814', point:200, partoner_id:'fdaf'},
  {id:2, e_mail:'aaaa@gmail.com', name:'山田太郎', password:'123', answer_limit:'20200814', point:200, partoner_id:'fdaf'},
  {id:3, e_mail:'aaaa@gmail.com', name:'山田太郎', password:'123', answer_limit:'20200814', point:200, partoner_id:'fdaf'},
  {id:4, e_mail:'aaaa@gmail.com', name:'山田太郎', password:'123', answer_limit:'20200814', point:200, partoner_id:'fdaf'},
];

//Getでとってきた情報とe-mailが合致するものを探してユーザーを一意に特定する処理をかく


const point_str = users[0].point+'P';
console.log(point_str);

//リスト取得
//Get
//api/product/list/
//ポイント取得
//Get(User)

//クソコード

//ポイント
const own_point = document.querySelector('.own_point');
own_point.textContent = point_str;

//商品
//本来ならreccomend = trueだったら赤文字にするとかやるはずだった
const item1 = document.querySelector('.item1');
const item1_name = document.querySelector('.item1_name');
item1_name.textContent = items[0].name;
const item1_value = document.querySelector('.item1_value');
item1_value.textContent = items[0].value + "P";

const item2 = document.querySelector('.item2');
const item2_name = document.querySelector('.item2_name');
item2_name.textContent = items[1].name;
const item2_value = document.querySelector('.item2_value');
item2_value.textContent = items[1].value + "P";

const item3 = document.querySelector('.item3');
const item3_name = document.querySelector('.item3_name');
item3_name.textContent = items[2].name;
const item3_value = document.querySelector('.item3_value');
item3_value.textContent = items[2].value + "P";

const item4 = document.querySelector('.item4');
const item4_name = document.querySelector('.item4_name');
item4_name.textContent = items[3].name;
const item4_value = document.querySelector('.item4_value');
item4_value.textContent = items[3].value + "P";

const item5 = document.querySelector('.item5');
const item5_name = document.querySelector('.item5_name');
item5_name.textContent = items[4].name;
const item5_value = document.querySelector('.item5_value');
item5_value.textContent = items[4].value + "P";
}


