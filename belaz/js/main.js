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

// IBG
function ibg() {
  let ibg = document.querySelectorAll(".ibg");
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector("img")) {
      ibg[i].style.backgroundImage =
        "url(" + ibg[i].querySelector("img").getAttribute("src") + ")";
    }
  }
}

ibg();

// Selecting elements
const select = (e) => document.querySelector(e);
const selectAll = (e) => document.querySelectorAll(e);

// HEADER MENU
function tabletHeader(mqTablet) {
  const schedule = select(".header__schedule");
  const call = select(".header__call");
  const headerBody = select(".header__body");
  const headerMenu = select(".header__menu");

  if (mqTablet.matches) {
    headerMenu.append(schedule);
    headerMenu.append(call);
  } else {
    headerBody.append(schedule);
    headerBody.append(call);
  }
}

let mqTablet = window.matchMedia("screen and (max-width: 768px)");

tabletHeader(mqTablet);

mqTablet.addListener(tabletHeader);

select(".header__burger").addEventListener("click", () => {
  select(".header__menu").classList.add("is-active");
});

select(".header__menu-close").addEventListener("click", () => {
  select(".header__menu").classList.remove("is-active");
});

// Tooltips
const qnaItems = selectAll(".qna__list-item");
const qnaItemsArr = Array.prototype.slice.call(qnaItems);

qnaItemsArr.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    if (e.target.classList.contains("qna__tooltip-open")) {
      qnaItemsArr.forEach((element) => element.classList.remove("is-active"));
      e.target.parentNode.classList.add("is-active");
    } else if (e.target.classList.contains("qna__tooltip-close")) {
      e.target.parentNode.parentNode.classList.remove("is-active");
    }
  });
});

// Preloader
window.addEventListener('load', () => {
  select(".preloader").style.transition = "transform 400ms ease-in-out";
  select(".preloader").style.transform = "translateY(-101%)";
  select(".preloader").addEventListener("transitionend", () => {
    select(".preloader").style.display = "none";
  });
});
