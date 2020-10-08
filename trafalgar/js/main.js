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
$(".header__mobile-menu").addEventListener("click", () => {
  $(".header__nav").classList.add("is-active");
});

$(".header__nav-close-body").addEventListener("click", () => {
  $(".header__nav").classList.remove("is-active");
});

// Testimonials slider
const tesItems = $$(".testimonials__item");

if (tesItems.length > 0) {
  let allowClick = true;
  let autoscroll = true;
  let autoscrollTime = 10000;

  // Elements
  const tesAmount = tesItems.length;
  const tesTrack = $(".testimonials__track");
  const tesTrackStyles = window.getComputedStyle(tesTrack);
  let itemWidth = tesItems[0].clientWidth + 100;
  const btnNext = $(".testimonials__btn--next");
  const btnPrev = $(".testimonials__btn--prev");

  let currentItem = 0;
  let position = (currentItem * itemWidth + itemWidth) * -1;

  // Creating bubbles
  for (let i = 0; i < tesAmount; i++) {
    let newBubble = document.createElement("button");
    $(".testimonials__bubbles").append(newBubble);
    newBubble.setAttribute("data-index", i);
    newBubble.classList.add("testimonials__bubble-item");
  }

  const bubbles = $$(".testimonials__bubbles button");

  function setPosition() {
    tesTrack.style.transform = `translateX(${position}px)`;
  }

  let timer =
    parseFloat(tesTrackStyles.getPropertyValue("transition-duration")) * 1000;

  function moveForwards() {
    if (allowClick) {
      allowClick = false;
      setTimeout(() => (allowClick = true), timer * 2);

      itemWidth = tesItems[0].clientWidth + 100;
      tesTrack.style.opacity = "0";

      bubbles[currentItem].classList.remove("is-active");
      currentItem++;
      position = (currentItem * itemWidth + itemWidth) * -1;

      if (currentItem < tesItems.length) {
        bubbles[currentItem].classList.add("is-active");
      } else {
        bubbles[0].classList.add("is-active");
      }

      tesTrack.addEventListener("transitionend", () => {
        setPosition();
        tesTrack.style.opacity = "1";

        if (currentItem >= tesItems.length) {
          position = itemWidth * -1;
          setPosition();
          currentItem = 0;
        }
      });
    }
  }

  function moveBackwards() {
    if (allowClick) {
      allowClick = false;
      setTimeout(() => (allowClick = true), timer * 2);

      itemWidth = tesItems[0].clientWidth + 100;
      tesTrack.style.opacity = "0";

      bubbles[currentItem].classList.remove("is-active");
      currentItem--;
      position = (currentItem * itemWidth + itemWidth) * -1;

      if (currentItem >= 0) {
        bubbles[currentItem].classList.add("is-active");
      } else {
        bubbles[bubbles.length - 1].classList.add("is-active");
      }

      tesTrack.addEventListener("transitionend", () => {
        setPosition();
        tesTrack.style.opacity = "1";

        if (currentItem <= -1) {
          position = tesItems.length * itemWidth * -1;
          setPosition();
          currentItem = tesItems.length - 1;
        }
      });
    }
  }

  // Click on bubbles
  $(".testimonials__bubbles").addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.dataset.index;

      currentItem = index;
      position = (currentItem * itemWidth + itemWidth) * -1;

      for (let i = 0; i < bubbles.length; i++) {
        const element = bubbles[i];
        element.classList.remove("is-active");
      }

      e.target.classList.add("is-active");

      tesTrack.style.opacity = "0";
      tesTrack.addEventListener("transitionend", () => {
        setPosition();
        tesTrack.style.opacity = "1";
      });
    }
  });

  // Making it cyclic
  const firstItem = tesItems[0];
  const lastItem = tesItems[tesItems.length - 1];

  tesTrack.append(firstItem.cloneNode(true));
  tesTrack.prepend(lastItem.cloneNode(true));

  // Initial position
  setPosition();
  bubbles[0].classList.add("is-active");

  let autoscrollInterval;

  // Autoscroll
  if (autoscroll) {
    autoscrollInterval = setInterval(() => {
      if (
        !document.hidden &&
        !document.activeElement.classList.contains("testimonials__bubble-item")
      ) {
        moveForwards();
      }
    }, autoscrollTime);
  }

  btnNext.addEventListener("click", () => {
    moveForwards();
    if (autoscroll) {
      clearInterval(autoscrollInterval);
      autoscrollInterval = setInterval(() => {
        if (
          !document.hidden &&
          !document.activeElement.classList.contains(
            "testimonials__bubble-item"
          )
        ) {
          moveForwards();
        }
      }, autoscrollTime);
    }
  });

  btnPrev.addEventListener("click", () => {
    moveBackwards();
    if (autoscroll) {
      clearInterval(autoscrollInterval);
      autoscrollInterval = setInterval(() => {
        if (
          !document.hidden &&
          !document.activeElement.classList.contains(
            "testimonials__bubble-item"
          )
        ) {
          moveForwards();
        }
      }, autoscrollTime);
    }
  });

  tesTrack.addEventListener("click", () => {
    moveForwards();
    if (autoscroll) {
      clearInterval(autoscrollInterval);
      autoscrollInterval = setInterval(() => {
        if (
          !document.hidden &&
          !document.activeElement.classList.contains(
            "testimonials__bubble-item"
          )
        ) {
          moveForwards();
        }
      }, autoscrollTime);
    }
  });
}

// Header on scroll
window.addEventListener('scroll', headerScroll);

function headerScroll() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    $('.header').classList.add('is-active');
    $('.header').classList.remove('isnt-active');
  } else {
    $('.header').classList.remove('is-active');
    $('.header').classList.add('isnt-active');
  }
}