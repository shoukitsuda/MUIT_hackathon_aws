'use strict';

{

    const selfId = document.querySelector('.self-id');
  const s = localStorage.getItem("self_id");
  selfId.textContent = s + 'さん、こんにちは！';
    
    const ownPoint = document.querySelector('#own-point');
    ownPoint.textContent = 200;
}
