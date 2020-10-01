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

// Select functions
const $ = (e) => document.querySelector(e); 
const $$ = (e) => document.querySelectorAll(e);

// Header menu
$('.header__mobile-menu').addEventListener('click', () => {
  $('.header__nav').classList.add('is-active');
});

$('.header__nav-close-body').addEventListener('click', () => {
  $('.header__nav').classList.remove('is-active');
});