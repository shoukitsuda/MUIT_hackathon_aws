'use strict';

{
  var url = ''; // リクエスト先URL
var data ; // 送信データ ('param=value&...')
var request = new XMLHttpRequest();
request.open('POST', url);
request.onreadystatechange = function () {
    if (request.readyState != 4) {
        // リクエスト中
    } else if (request.status != 200) {
        // alert("It's different.")
    } else {
        // 送信成功
        // var result = request.responseText;
    }
};
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
request.send(data);

const e_mail = $(".e-mail").val();
var maillist = String(e_mail);
localStorage.setItem("e_mail", JSON.stringify(maillist4));
  
const password = $(".password").val();
  var passlist5 = String(password);
  localStorage.setItem("password", JSON.stringify(passlist5));
}