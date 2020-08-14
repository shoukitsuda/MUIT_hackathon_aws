'use strict';

{
//もうちょっとちゃんと書かないといけない
//JSONからデータを抽出する方法をしらべなきゃいけない
// div:  https://a2k3nn6qqj.execute-api.ap-northeast-1.amazonaws.com/dev
// const api_URL = 'https://a2k3nn6qqj.execute-api.ap-northeast-1.amazonaws.com/dev/api/product/list/';
const api_URL = 'https://a2k3nn6qqj.execute-api.ap-northeast-1.amazonaws.com/dev/';

const request = new XMLHttpRequest();
request.open('GET', api_URL, true);

request.onload = function(){
  console.log('a');
}

//アイテムリスト(ダミーデータ)
const items = [
  {id:1, name:'チケット1枚', description: '美味しいです。', recommend: false, value: 300},
  {id:2, name:'チケット2枚', description: '美味しいです。', recommend: false, value: 500},
  {id:3, name:'ポップコーン', description: '美味しいです。', recommend: false, value: 200},
  {id:4, name:'チュロス', description: '美味しいです。', recommend: false, value: 200},
  {id:5, name:'ドリンク', description: '美味しいです。', recommend: false, value: 150},
];

//取得したリストのうちこのページに表示するもの
let display_item = null;

//このページではid:1を受け取りたい
items.forEach( item => {
  if(item.id===1){
    display_item = item;
  }
});

//商品
//本来ならreccomend = true だったらおすすめっぽくなる実装(余裕があれば)
const item_name = document.querySelector('.item_name');
item_name.textContent = display_item.name;
const item_value = document.querySelector('.item_value');
item_value.textContent = display_item.value + "P";
//特長を入れるなら(cssも変える必要あり)
// const item_description = document.querySelector('.item_description');
// item_description.textContent = display_item.description;

localStorage.setItem('item_id','1');
var selected_item_id = localStorage.getItem("item_id");  //商品idが渡されていることの確認
console.log(selected_item_id);
}


