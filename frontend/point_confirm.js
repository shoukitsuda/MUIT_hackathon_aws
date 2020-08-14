'use strict';

{
  //アイテムリスト(ダミーデータ)
  const items = [
    {id:1, name:'チケット1枚', description: '美味しいです。', recommend: false, value: 300},
    {id:2, name:'チケット2枚', description: '美味しいです。', recommend: false, value: 500},
    {id:3, name:'ポップコーン', description: '美味しいです。', recommend: false, value: 200},
    {id:4, name:'チュロス', description: '美味しいです。', recommend: false, value: 200},
    {id:5, name:'ドリンク', description: '美味しいです。', recommend: false, value: 150},
  ];

  //ローカルストレージから直前に保存された商品idを抽出
  const selected_item_id = localStorage.getItem("item_id");
  
  console.log(selected_item_id);
  //ローカルストレージから直前に保存された商品idを削除
  localStorage.removeItem("item_id");

  //product_idが渡される(product_idはどうやって渡される？)(最悪point_confirm.jsを5つつくる???)
  //とりあえずid:1を受け取りたいとする
  let purchase_item;

  items.forEach( item => {
    if(String(item.id)===selected_item_id){
      purchase_item = item;
    }
  });

  //user_idを元にuserのpointに反映される
  const getted_before_point = 1200;  //とりあえず
  const getted_after_point = getted_before_point - purchase_item.value; 
  const div_before_point = document.querySelector('.before');
  const div_after_point = document.querySelector('.after');
  const before_point = document.createElement('before_point');
  const after_point = document.createElement('after_point');
  before_point.textContent = getted_before_point + "P";
  after_point.textContent = getted_after_point + "P";
  div_before_point.appendChild(before_point);
  div_after_point.appendChild(after_point);

  //多分購入後のユーザー情報をPOSTする
  
}

