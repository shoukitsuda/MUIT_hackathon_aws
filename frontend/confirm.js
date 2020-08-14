'use strict';

{
  const selfId = document.querySelector('.self-id');
  const s = localStorage.getItem("self_id");
  selfId.textContent = s;

  const name = document.querySelector('.name');
  const g = localStorage.getItem("name");
  name.textContent = g;
  
  
  const partnerId = document.querySelector('.partner-id');
  const h = localStorage.getItem("partner_id")
  partnerId.textContent = h;

  const e_mail = document.querySelector('.e-mail');
  const i = localStorage.getItem("e_mail")
  e_mail.textContent = i;

  const password = document.querySelector('.password');
  const j = localStorage.getItem("password")
  password.textContent = j;
  

}