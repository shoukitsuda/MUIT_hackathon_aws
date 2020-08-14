'use strict';

{

  var url; 
  var data;
  var request = new XMLHttpRequest();
  request.open('POST', url);
  request.onreadystatechange = function () {
      if (request.readyState != 4) {
          // リクエスト中
      } else if (request.status != 200) {
          alert("It's different");
      } else {
          // 送信成功
          // var result = request.responseText;
      }
  };
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  request.send(data);


  const Input1 = document.querySelector('.self-id');
  Input1.addEventListener('blur', (event) => {
    const self_id = $('.self-id').val();
    localStorage.setItem("self_id", self_id);
  });

  const Input2 = document.querySelector('.name');
  Input2.addEventListener('blur', (event) => {
    const name = $('.name').val();
    localStorage.setItem("name", name);
  });

  const Input3 = document.querySelector('.partner-id');
  Input3.addEventListener('blur', (event) => {
    const partner_id = $('.partner-id').val();
    localStorage.setItem("partner_id", partner_id);
  });

  const Input4 = document.querySelector('.e-mail');
  Input4.addEventListener('blur', (event) => {
    const e_mail = $('.e-mail').val();
    localStorage.setItem("e_mail", e_mail);
  });
  
  const Input5 = document.querySelector('.password');
  Input5.addEventListener('blur', (event) => {
    const password = $('.password').val();
    localStorage.setItem("password", password);
  });
  
}