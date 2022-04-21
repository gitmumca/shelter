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
  document.querySelector('.menu-box').style.left == '100%';
  document.querySelector('.body').style.overflowY = 'visible';
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
//    setTimeout(15);
    left = i + percent;
    document.querySelector('.menu-box').style.left = ((left > 100) ? 105 : left) + '%';
  }

})

// открытие/закрытие меню бублика
const menu = document.getElementById('menu-toggle-nav');
menu.addEventListener('click', function() {
/*
  let percent = (location.pathname.indexOf('main') > -1 ? 105 : 108) - Math.trunc(320 / document.documentElement.clientWidth * 100);
  let start = Date.now();

  let timerIn = setInterval(function() {
    let left;
    let timePassed = Date.now() - start;
      if (document.getElementById('menu-toggle-nav').checked) {
        left = Math.trunc((2000 - timePassed) / 20);
        document.querySelector('.menu-box').style.left = (left < percent) ? percent : left + '%';
      } else {
        left = 160 - Math.trunc((2000 - timePassed) / 20);
        document.querySelector('.menu-box').style.left = (left > 100) ? 105 : left + '%';
      }
      console.log(document.querySelector('.menu-box').style.left, 'timePassed', timePassed);
      if (timePassed > 2000) clearInterval(timerIn);
    }, 10); 
*/

  if (document.getElementById('menu-toggle-nav').checked) {
    document.querySelector('.menu-area').style.visibility = 'visible';
    document.querySelector('.body').style.overflowY = 'hidden';
  } else {
    document.querySelector('.menu-area').style.visibility = 'hidden';
    document.querySelector('.body').style.overflowY = 'visible';
  }

  let percent = (location.pathname.indexOf('main') > -1 ? 105 : 108) - Math.trunc(320 / document.documentElement.clientWidth * 100);
  for (let i=0; i<100; i++) {
    let left;
//    setTimeout(15);
    if (document.getElementById('menu-toggle-nav').checked) {
      left = 100 - i;
      document.querySelector('.menu-box').style.left = ((left < percent) ? percent : left) + '%';
    } else {
      left = i + percent;
      document.querySelector('.menu-box').style.left = ((left > 100) ? 105 : left) + '%';
    }
  }
})

var arrAll = (document.documentElement.clientWidth <= 320) ? 
               [0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,0,0,0,1,1,1,2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7] 
                  : (document.documentElement.clientWidth <= 768) ? 
                  [0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,7]   
                  : [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5];

var arrPage = (document.documentElement.clientWidth <= 320) ? 
                  [0,0,0] 
                  : (document.documentElement.clientWidth <= 768) ? 
                  [0,0,0,0,0,0]   
                  : [0,0,0,0,0,0,0,0];

var curPage = 1;
var countItems = (document.documentElement.clientWidth <= 320) ? 
                     3 : (document.documentElement.clientWidth <= 768) ? 6 : 8;

var countPages = (document.documentElement.clientWidth <= 320) ? 
                     16 : (document.documentElement.clientWidth <= 768) ? 8 : 6;

function initArrAll() {

  arrAll = randomArr8();
  arrPage = arrAll;
  if (location.pathname.indexOf('main') > -1) {
    countItems = 8; 
  }
  else {
    arrAllAdd = '' + arrAll[1] + arrAll[0] + arrAll[3] + arrAll[2] + arrAll[5] + arrAll[4] + arrAll[7] + arrAll[6];
    arrAll = (arrAll.join('') + arrAllAdd + arrAll.join('') + arrAllAdd + arrAll.join('') + arrAllAdd + arrAll.join('') + arrAllAdd).split('');

  }
}

function randomArr8() {
  let flag;
  let num;    
  let arr = [];

  arr.push(getRandomIntInclusive(0,7));
  for (let i=0; i<7; i++) {
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

//var superHeroes;
function createCards(index){

  let parent = document.querySelector('.cont-card');
  let count = (document.documentElement.clientWidth <= 320) ? 
              3 : (document.documentElement.clientWidth <= 768) ? 6 : 8;
  let before = document.querySelector('.before');

  if (index) {
    parent = document.querySelector('.slider');
    count = (document.documentElement.clientWidth <= 320) ? 
                1 : (document.documentElement.clientWidth <= 768) ? 2 : 3;
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
/*      myBtn.id = i;
      myBtn.setAttribute('onclick', 'show_popup(this.id);')*/

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
/*
  for (let i=0; i<countItems; i++) {
    let pet_img = document.querySelector('.pet_img' + i);
    pet_img.style.opacity = 0
  }
 

  for (let i=0; i<countItems; i++) {
    let pet_img = document.querySelector('.pet_img' + i);
    pet_img.style.opacity = 1
  }
   
  for (let i=0; i<countItems; i++) {
    let pet_img = document.querySelector('.pet_img' + i);
    if (pet_img != null) {
      pet_img.style.background = 'url(' + pets[arrPage[i]].img + ') 0px/auto 100% no-repeat';
    }

    let pet_name = document.querySelector('.pet_name' + i);
    if (pet_name != null) {
      pet_name.innerHTML = pets[arrPage[i]].name;
    }
  }
*/  

/*
  let start = Date.now();
  let timerIn = setInterval(function() {
    let timePassed = Date.now() - start;
    let opacity = 1 - (2000 - timePassed) / 2000;
    opacity = (opacity < 0) ? 0 : opacity;

    document.querySelectorAll('.card_img').forEach(el => el.style.opacity = opacity);
    document.querySelectorAll('.pet_name').forEach(el => el.style.opacity = opacity);

    if (timePassed > 2000) clearInterval(timerIn);
  }, 10);
*/

/*
  let percent = (location.pathname.indexOf('main') > -1 ? 105 : 108) - Math.trunc(320 / document.documentElement.clientWidth * 100);
  document.querySelectorAll('.card_img').forEach(el => el.style.opacity = 0);
  document.querySelectorAll('.pet_name').forEach(el => el.style.opacity = 0);
*/

  document.querySelectorAll('.pet_img').forEach(function (el, ind) {
    el.style.background = 'url(' + pets[arrPage[ind]].img + ') 0px/auto 100% no-repeat';
  })

  document.querySelectorAll('.pet_name').forEach(function (el, ind) {
    el.innerHTML = pets[arrPage[ind]].name;
  })

  document.querySelectorAll('.card_img').forEach(el => el.style.opacity = 0);
  document.querySelectorAll('.card_img').forEach(el => el.style.opacity = 1);
/*  
  for (let i=0; i<1001; i++) {
    document.querySelectorAll('.card_img').forEach(el => el.style.opacity = i/1000);
    document.querySelectorAll('.pet_name').forEach(el => el.style.opacity = i/1000);
    console.log(i, i/100, document.querySelector('.card_img').style.opacity);
  }
*/  
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
    let count = (document.documentElement.clientWidth <= 320) ? 
              1 : (document.documentElement.clientWidth <= 768) ? 2 : 3;

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

/*
// открытие popup-меню по нажатию на карточке
const cards = document.querySelectorAll('.card');
cards.forEach(el => el.setAttribute('onclick', 'show_popup(this.id);'))
*/
/*
// открытие popup-меню по кнопке
const btn_pets = document.querySelectorAll('.btn_pet');
btn_pets.forEach(el => el.setAttribute('onclick', 'show_popup(this.id);'))
*/

/*
const btn_pets = document.querySelectorAll('.btn_pet');
btn_pets.forEach(el => el.addEventListener('click', function() {

  let cur = pets[arrPage[el.id]];

  document.querySelector('.m-img').style.background = 'url(' + cur.img + ') 0px/auto 100% no-repeat';
  document.querySelector('.m-name').innerHTML = cur.name;
  document.querySelector('.m-type').innerHTML = cur.type + ' - ' + cur.breed;
  document.querySelector('.m-description').innerHTML = cur.description;
  document.querySelector('.m-age').innerHTML = cur.age; 
  document.querySelector('.m-inoculations').innerHTML = cur.inoculations;
  document.querySelector('.m-diseases').innerHTML = cur.diseases;
  document.querySelector('.m-parasites').innerHTML = cur.parasites;
  
  document.getElementById('popup').style.visibility = 'visible';
  document.getElementById('popup').style.opacity = '1';
}))
*/

/*
function showHeroes(jsonObj) {
  var heroes = jsonObj['members'];

  for (var i = 0; i < heroes.length; i++) {
    var myArticle = document.createElement('article');
    var myH2 = document.createElement('h2');
    var myPara1 = document.createElement('p');
    var myPara2 = document.createElement('p');
    var myPara3 = document.createElement('p');
    var myList = document.createElement('ul');

    myH2.textContent = heroes[i].name;
    myPara1.textContent = 'Secret identity: ' + heroes[i].secretIdentity;
    myPara2.textContent = 'Age: ' + heroes[i].age;
    myPara3.textContent = 'Superpowers:';

    var superPowers = heroes[i].powers;
    for (var j = 0; j < superPowers.length; j++) {
      var listItem = document.createElement('li');
      listItem.textContent = superPowers[j];
      myList.appendChild(listItem);
    }

    myArticle.appendChild(myH2);
    myArticle.appendChild(myPara1);
    myArticle.appendChild(myPara2);
    myArticle.appendChild(myPara3);
    myArticle.appendChild(myList);

    section.appendChild(myArticle);
  }
}
*/

/*
  let myLeft = document.createElement('button');
    myLeft.classList.add('svg_circle');
    myLeft.classList.add('svg_circle1280');
    myLeft.id = 'left';

    let myImg = document.createElement('img');
      myImg.src="assets/svg/arrow-left.svg";

    myLeft.appendChild(myImg);
*/


/*
  let myRight = document.createElement('button');
    myRight.classList.add('svg_circle');
    myRight.classList.add('svg_circle1280');
    myRight.id = 'right';

    myImg.src="assets/svg/arrow-right.svg";
    myRight.appendChild(myImg);
*/
//  console.log(slider);

/*  
  var request = new XMLHttpRequest();
    request.open('GET', 'pets.json');
    request.send();
    superHeroes = request.response;
    console.log("----", superHeroes, "-----");

    populateHeader(superHeroes);
//    showHeroes(superHeroes);
*/
  
//

/*
function load() {
    var xhr = new XMLHttpRequest();

    xhr.timeout = 1000;
    xhr.responseType = 'json';
    xhr.open('GET', 'pets.json');
    xhr.send();
}

//pets = JSON.parse(load());
console.log(load());
*/

/*
var DATA;


function loadJson(callback)
{
    var XmlHttpRequest = new XMLHttpRequest();
    XmlHttpRequest.overrideMimeType("application/json");
    XmlHttpRequest.open('GET', 'pets.json', true);
    XmlHttpRequest.onreadystatechange = function ()
    {
        if (XmlHttpRequest.readyState == 4 && XmlHttpRequest.status == "200")
        {
            callback(XmlHttpRequest.responseText);
        }
    }
    XmlHttpRequest.send(null);
}
 
loadJson(function(response)
{
    jsonResponse = JSON.parse(response);
    console.log(jsonResponse);
}); 
loadJson();
*/

/*
  fr = new FileReader();
  fr.onload = receivedText;
  fr.readAsText("pets.json");

  function receivedText(e) {
    let lines = e.target.result;
    var newArr = JSON.parse(lines); 
    console.log(newArr);
  }
*/

// динамические элементы

/*
var request = new XMLHttpRequest();

function getFile (fileName) {

    request.open('GET', fileName);
    request.responseType = 'json';
    request.send();
}

getFile('pets.json'); 

request.onload = function() {
  var superHeroes = request.response;
  console.log('------', superHeroes);
}
  
  var request = new XMLHttpRequest();
    request.open('GET', 'pets.json');
    request.send();
    superHeroes = request.response;
    console.log("----", superHeroes, "-----");

//    populateHeader(superHeroes);
//    showHeroes(superHeroes);
*/
