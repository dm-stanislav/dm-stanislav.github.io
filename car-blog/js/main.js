// WEBP CHECK
function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

// Default functions
const $ = e => document.querySelector(e);
const $$ = e => document.querySelectorAll(e);
const hasClass = e => e.classList.contains(e);

// Header
const header = $('.header');

window.addEventListener("scroll", () => {
  if(document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
    header.classList.add('_shrunk');
  } else header.classList.remove('_shrunk');
});

$('.header__mobile').addEventListener('click', () => {
  $('.header__mobile').classList.toggle('_active');
  $('.header__nav').classList.toggle('_active');
});

$('.header__search').addEventListener('click', () => {
  $('.header__form').classList.add('_active');
  $('.header__body').classList.add('_active');
});

$('.header__form-close').addEventListener('click', () => {
  $('.header__form').classList.remove('_active');
  $('.header__body').classList.remove('_active');
});

const mq768 = window.matchMedia("screen and (max-width: 768px)");
function moveForm(mq) {
  if(mq.matches) {
    // Moving header form
    $('.header__nav').append($('.header__form'));
  } else {
    // Returning header form
    $('.header .container').append($('.header__form'));
  }
}

mq768.addListener(moveForm);
moveForm(mq768);