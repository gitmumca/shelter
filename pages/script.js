// переключение на другой index.html
const reload = document.querySelectorAll('.button_pets');
reload.forEach(el => el.addEventListener('click', () => window.location.href = '../pets/index.html'));

// LOGO переключение на main
document.querySelector('.logo').addEventListener('click', () => window.location.href = '../main/index.html');

// закрытие меню бублика после нажатия на строки меню
const items = document.querySelectorAll('.menu-item');
items.forEach(el => el.addEventListener('click', function() {
	document.querySelector('.menu-area').style.visibility = 'hidden';
	document.getElementById('menu-toggle-nav').checked = false;
  document.querySelector('.body').style.overflowY = 'visible';

  let percent = (location.pathname.indexOf('main') > -1 ? 105 : 108) - Math.trunc(320 / document.documentElement.clientWidth * 100);
  for (let i=0; i<100; i++) {
    let left;
    left = i + percent;
    document.querySelector('.menu-box').style.left = ((left > 100) ? 105 : left) + '%';
  }

}))

// закрытие меню бублика после нажатия на затемненную область
const area = document.querySelector('.menu-area');
area.addEventListener('click', function() {
  document.querySelector('.menu-area').style.visibility = 'hidden';
  document.getElementById('menu-toggle-nav').checked = false;
  document.querySelector('.body').style.overflowY = 'visible';

  let percent = (location.pathname.indexOf('main') > -1 ? 105 : 108) - Math.trunc(320 / document.documentElement.clientWidth * 100);
  for (let i=0; i<100; i++) {
    let left;
    left = i + percent;
    document.querySelector('.menu-box').style.left = ((left > 100) ? 105 : left) + '%';
  }

})

// открытие/закрытие меню бублика
const menu = document.getElementById('menu-toggle-nav');
menu.addEventListener('click', function() {
  if (document.getElementById('menu-toggle-nav').checked) {
    document.querySelector('.menu-area').style.visibility = 'visible';
    document.querySelector('.body').style.overflowY = 'hidden';
  } else {
    document.querySelector('.menu-area').style.visibility = 'hidden';
    document.querySelector('.body').style.overflowY = 'visible';
  }

  let percent = 100 - Math.trunc(320 / document.documentElement.clientWidth * 100);
  for (let i=0; i<100; i++) {
    let left;
    if (document.getElementById('menu-toggle-nav').checked) {
      left = 99 - i - percent;
      document.querySelector('.menu-box').style.left = ((left < percent) ? percent : left) + '%';
    } else {
      left = i + percent;
      document.querySelector('.menu-box').style.left = ((left > 100) ? 100 : left) + '%';
    }
  }
})

var arrAll;
var arrPage;
var curPage = 1;
var countItems = (document.documentElement.clientWidth < 768) ? 
                     3 : (document.documentElement.clientWidth < 1280) ? 6 : 8;

var countPages = (document.documentElement.clientWidth < 768) ? 
                     16 : (document.documentElement.clientWidth < 1280) ? 8 : 6;

function initArrAll() {

  let arrAdd;

  if (location.pathname.indexOf('main') > -1) {
    countItems = 8; 
    arrAll = randomArr(countItems);
    arrPage = arrAll;
  }
  else {    
    arrAll = randomArr(countItems);
    arrPage = arrAll;
    for (let i=0; i<countPages-1; i++) {
      arrAdd = randomArr(countItems);
      arrAll = (arrAll.join('') + arrAdd.join('')).split('');
    }

  }
}

function randomArr(count) {
  let flag;
  let num;    
  let arr = [];

  arr.push(getRandomIntInclusive(0,7));
  for (let i=0; i<count-1; i++) {
    do {
      flag = false;
      num = getRandomIntInclusive(0,7);
      arr.forEach(el => (el == num) ? flag = true : 0);
    } while (flag);
    arr.push(num);
  }
  return arr;
}

//максимум и минимум включаются
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; 
}

window.onload = function() {
  initArrAll();
  createCards(location.pathname.indexOf('main') > -1);
  refreshPet();
}

function createCards(index){

  let parent = document.querySelector('.cont-card');
  let count = (document.documentElement.clientWidth < 768) ? 
              3 : (document.documentElement.clientWidth < 1280) ? 6 : 8;
              
  let before = document.querySelector('.before');

  if (index) {
    parent = document.querySelector('.slider');
    count = (document.documentElement.clientWidth < 768) ? 
                1 : (document.documentElement.clientWidth < 1280) ? 2 : 3;
  }

  for (i=0; i<count; i++) {

    let myCard = document.createElement('div');
    myCard.classList.add('card');
    myCard.id = i;
    myCard.setAttribute('onclick', 'show_popup(this.id);')

    if (index) {
      if (i==1) {myCard.classList.add('card-320'); } 
      else if (i>1) {myCard.classList.add('card-768'); }
    }
    else {
      if ((i==3) || (i==4) || (i==5)) {myCard.classList.add('card-320'); } 
      else if ((i==6) || (i==7)) {myCard.classList.add('card-768'); }
    }

    let myA = document.createElement('a');
      myA.href = '#popup';
      let myDiv = document.createElement('div');
        myDiv.classList.add('card_img');
        myDiv.classList.add('pet_img');
        myA.appendChild(myDiv);

    let myH6 = document.createElement('h6');
      myH6.classList.add('subheading-pets');
      myH6.classList.add('pet_name');

    let myBtn = document.createElement('button');
      myBtn.classList.add('btn_pet');
      myBtn.textContent = "Learn more";

    myCard.appendChild(myA);
    myCard.appendChild(myH6);
    myCard.appendChild(myBtn);

    if (index) {parent.insertBefore(myCard, before); }
      else {parent.appendChild(myCard); }  
  }
  refreshPet();
}

document.querySelectorAll('.svg_left').forEach(el => el.classList.remove('svg_left_hover'));

function refreshPet() {
  document.querySelectorAll('.pet_img').forEach(function (el, ind) {
    el.style.background = 'url(' + pets[arrPage[ind]].img + ') 0px/auto 100% no-repeat';
  })

  document.querySelectorAll('.pet_name').forEach(function (el, ind) {
    el.innerHTML = pets[arrPage[ind]].name;
  })

  document.querySelectorAll('.card_img').forEach(el => el.style.opacity = 0);
  document.querySelectorAll('.card_img').forEach(el => el.style.opacity = 1);

}

// первый-вправо-влево-последний 5 кнопок
const nav = document.querySelectorAll('.svg_nav');
nav.forEach(el => el.addEventListener('click', function() {

    if (el.id == 'first') {curPage = 1;}
    if (el.id == 'left') {if (curPage > 1) {curPage = curPage - 1; } }
    if (el.id == 'right') {if (curPage < countPages) {curPage = curPage + 1; } }
    if (el.id == 'last') {curPage = countPages;}

    arrPage = arrAll.join('').slice(countItems * (curPage-1), countItems * curPage).split('');
    document.querySelector('.center').innerHTML = curPage;

    if (curPage == 1) {document.querySelectorAll('.svg_left').forEach(el => el.classList.remove('svg_left_hover'));}
    else {document.querySelectorAll('.svg_left').forEach(el => el.classList.add('svg_left_hover'));}

    if (curPage == countPages) {document.querySelectorAll('.svg_right').forEach(el => el.classList.remove('svg_right_hover'));}
    else {document.querySelectorAll('.svg_right').forEach(el => el.classList.add('svg_right_hover'));}

    refreshPet();
}))

// влево-вправо 2 кнопки
const circle = document.querySelectorAll('.svg_circle');
circle.forEach(el => el.addEventListener('click', function() {

    let str = arrPage.join('');
    let count = (document.documentElement.clientWidth < 768) ? 
                1 : (document.documentElement.clientWidth < 1280) ? 2 : 3;

    if (el.id == 'right') { for (let i=0; i<count; i++) {str = str.slice(1) + str[0]; } }
    if (el.id == 'left')  { for (let i=0; i<count; i++) {str = str[str.length-1] + str.slice(0,str.length-1); } }

    arrPage = str.split('');
    refreshPet();
}))

function show_popup(index) {

  let cur = pets[arrPage[index]];

  document.querySelector('.m-img').style.background = 'url(' + cur.img + ') 0px/auto 100% no-repeat';
  document.querySelector('.m-name').innerHTML = cur.name;
  document.querySelector('.m-type').innerHTML = cur.type + ' - ' + cur.breed;
  document.querySelector('.m-description').innerHTML = cur.description;
  document.querySelector('.m-age').innerHTML = cur.age; 
  document.querySelector('.m-inoculations').innerHTML = cur.inoculations.join(', ');
  document.querySelector('.m-diseases').innerHTML = cur.diseases;
  document.querySelector('.m-parasites').innerHTML = cur.parasites;
  
  document.getElementById('popup').style.visibility = 'visible';
  document.getElementById('popup').style.opacity = '1';

  document.querySelector('.body').style.overflowY = 'hidden';
}

// закрытие питомца крестиком
const popup_close = document.querySelector('.popup-close');
popup_close.addEventListener('click', function() {
	document.getElementById('popup').style.visibility = 'hidden';
  document.querySelector('.body').style.overflowY = 'visible';
})

// закрытие питомца снаружи окна
const popup_area = document.querySelector('.popup-area');
popup_area.addEventListener('click', function() {
  document.getElementById('popup').style.visibility = 'hidden';
  document.querySelector('.body').style.overflowY = 'visible';
})

// наведение мышки и активизация кнопки закрытия
popup_close.addEventListener('mouseover', function() {
  this.style.backgroundColor = 'var(--color-primary-light)';
  this.style.borderColor = 'var(--color-primary-light)';
})

popup_close.addEventListener('mouseout', function() {
  this.style.backgroundColor = 'transparent';
  this.style.borderColor = 'var(--color-primary)';
})

// наведение мышки и активизация кнопки закрытия по затемненной области
popup_area.addEventListener('mouseover', function() {
  let popup = document.querySelector('.popup-close');
  popup.style.backgroundColor = 'var(--color-primary-light)';
  popup.style.borderColor = 'var(--color-primary-light)';
}) 

popup_area.addEventListener('mouseout', function() {
  let popup = document.querySelector('.popup-close');
  popup.style.backgroundColor = 'transparent';
  popup.style.borderColor = 'var(--color-primary)';
}) 


