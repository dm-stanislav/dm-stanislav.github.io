// 
// A pagination script by dm-stanislav
// Instagram — @web_dev_tips
// 
// Elements hierarchy for correct script work:
// 
// <div class="pag">
//   <div class="pag__wrapper"> items here </div>
//   <div class="pag__control"> nothing here </div>
// </div>
// 

"use strict";

// Calling the main function
pagePagination(5, 1, "", "", 70);

function pagePagination(itemsPerPage, startingPage, prevBtnText = "", nextBtnText = "", scrollTopPlus = 3) {

  // Selecting pagination wrappers
  const pag = document.querySelectorAll('.pag');

  // Converting node lists to arrays
  const pagArr = Array.prototype.slice.call(pag);

  // For every pagination...
  pagArr.forEach(pagElement => {

    // Checking if there are such wrappers
    if(pagArr.length > 0) {

      // Selecting pagination items wrapper
      const list = pagElement.querySelector('.pag__wrapper');

      // Selecting elements
      const buttonsWrapper = pagElement.querySelector('.pag__control');
      const items = [];

      // If pag wrapper has children...
      if(list.children.length > 0 && buttonsWrapper) {
        
        // Adding class to child nodes
        for (let i = 0; i < list.children.length; i++) {
          const element = list.children[i];
          element.classList.add('pag__item')
          items.push(element);
        }

        // Settings
        let currentPage = startingPage;
        let rows = itemsPerPage;

        // Counting pages
        const pages = Math.ceil(items.length / rows);

        // Getting current pages
        function getCurrentItems(items, rowsPerPage, currentPage) {
          if(currentPage <= pages) {
            currentPage--;
            let start = rowsPerPage * currentPage;
            let end = start + rows;
            const currentItems = Array.prototype.slice.call(items, start, end);

            return currentItems;
          }
        }

        // Hiding all pages and showing current ones
        function showCurrentItems() {
          list.innerHTML = "";

          for (let i = 0; i < getCurrentItems(items, rows, currentPage).length; i++) {
            const element = getCurrentItems(items, rows, currentPage)[i];

            list.append(element);
          }
        }

        // Creating buttons
        function createBtn(wrapper, pageCount) {
          for (let i = 0; i < pageCount; i++) {
            let button = document.createElement("button");

            wrapper.append(button);
            
            button.textContent = i + 1;
            button.classList.add('pag__control-item');

            if(currentPage === i + 1) button.classList.add('_active');
          }
          controlBtns(buttonsWrapper);
        }

        // Removing active class from all the buttons
        function removeActiveBtn() {
          const btns = pagElement.querySelectorAll('.pag__control-item');
          Array.prototype.slice.call(btns).forEach(element => element.classList.remove('_active'));
        }

        // Checking buttons
        function btnCheck() {
          const nextBtn = pagElement.querySelector('.pag__control-next');
          const prevBtn = pagElement.querySelector('.pag__control-prev');
          if(currentPage <= 1) prevBtn.classList.add('_disabled')
            else prevBtn.classList.remove('_disabled');

          if(currentPage >= pages) nextBtn.classList.add('_disabled')
            else nextBtn.classList.remove('_disabled');
        }

        // Deleting all the buttons
        function removeBtns(buttons) {
          for (let i = 0; i < buttons.length; i++) {
            const element = buttons[i];
            element.remove();
          }
          const empty = pagElement.querySelectorAll('.pag__control-empty');
          if(empty.length > 0) {
            for (let i = 0; i < empty.length; i++) {
              const element = empty[i];
              element.remove();
            }
          }
        }

        // Creating empty buttons [...]
        function emptyBtn() {
          const e = document.createElement("div");
          e.classList.add('pag__control-empty');
          e.textContent = "...";
          return e;
        }

        // Creating prev/next buttons
        function controlBtns(wrapper) {
          const prevBtn = document.createElement('button');
          const nextBtn = document.createElement('button');

          prevBtn.classList.add('pag__control-btn');
          prevBtn.classList.add('pag__control-prev');

          nextBtn.classList.add('pag__control-btn');
          nextBtn.classList.add('pag__control-next');

          prevBtn.textContent = prevBtnText;
          nextBtn.textContent = nextBtnText;

          wrapper.append(nextBtn);
          wrapper.prepend(prevBtn);
        }

        // Applying pagination
        function paginationMove() {
          scrollToTop();
          list.style.transition = "opacity 0.4s ease-in-out";
          list.style.opacity = 0;
          list.addEventListener('transitionend', () => {
            if(list.style.opacity == 0) {
              showCurrentItems();
              removeActiveBtn();
              paginationCheck(currentPage, pages, btns, buttonsWrapper);
              btns[currentPage - 1].classList.add('_active');
              btnCheck();
              list.style.opacity = 1;
            }
          })
        }

        function scrollToTop() {
          if(window.pageYOffset > list.offsetTop) {
            window.scrollTo(window.pageXOffset, list.offsetTop - scrollTopPlus);
          }
        }

        // Click events
        buttonsWrapper.addEventListener('click', e => {

          // Switch pages on number click
          if(e.target.classList.contains('pag__control-item')) {
            currentPage = +e.target.textContent;
            paginationMove();
          }

          // Prev/next click
          if(e.target.classList.contains('pag__control-btn')) {
            // Next btn
            if(e.target.classList.contains('pag__control-next') && currentPage < pages) {
              currentPage++;
              paginationMove();
            }

            // Prev btn
            if(e.target.classList.contains('pag__control-prev') && currentPage > 1) {
              currentPage--;
              paginationMove();
            }
          }
        });

        // Checking the state of pagination and filling buttons
        function paginationCheck(current_page, pages_amount, buttons, buttons__wrapper) {
          // Removing buttons
          if(pages_amount > 5) {
            removeBtns(buttons);
          }

          if(current_page < 3 && pages_amount > 5) {
            for (let i = 0; i < buttons.length; i++) {
              const element = buttons[i];
              if(i < 3 || i === pages_amount - 1) buttons__wrapper.insertBefore(element, pagElement.querySelector('.pag__control-next'));
            }
            buttons__wrapper.insertBefore(emptyBtn(), buttons[buttons.length - 1])
          }

          if(current_page == 3 && pages_amount > 5) {
            for (let i = 0; i < buttons.length; i++) {
              const element = buttons[i];
              if(i <= 3 || i === pages_amount - 1) buttons__wrapper.insertBefore(element, pagElement.querySelector('.pag__control-next'));
            }
            buttons__wrapper.insertBefore(emptyBtn(), buttons[buttons.length - 1])
          }

          if(current_page > 3 && pages_amount > 5 && current_page < pages_amount - 2) {
            let neighbours = [current_page - 2, current_page - 1, current_page];
            for (let i = 0; i < buttons.length; i++) {
              const element = buttons[i];
              if(i === 0 || neighbours.includes(i) || i === pages_amount - 1) buttons__wrapper.insertBefore(element, pagElement.querySelector('.pag__control-next'));
            }
            buttons__wrapper.insertBefore(emptyBtn(), buttons[buttons.length - 1]);
            buttons__wrapper.insertBefore(emptyBtn(), buttons[neighbours[0]]);
          }

          if(current_page === pages_amount - 2 && pages_amount > 5) {
            let neighbours = [current_page - 2, current_page - 1, current_page];
            for (let i = 0; i < buttons.length; i++) {
              const element = buttons[i];
              if(i === 0 || i > buttons.length - 5) {
                buttons__wrapper.insertBefore(element, pagElement.querySelector('.pag__control-next'));
              }
            }
            buttons__wrapper.insertBefore(emptyBtn(), buttons[neighbours[0]]);
          }

          if(current_page > pages_amount - 2 && pages > 5) {
            for (let i = 0; i < buttons.length; i++) {
              const element = buttons[i];
              if(i === 0 || i >= pages_amount - 3) {
                buttons__wrapper.insertBefore(element, pagElement.querySelector('.pag__control-next'));
              }
            }
            buttons__wrapper.insertBefore(emptyBtn(), buttons[pages_amount - 3]);
          }
        }

        // Creating buttons when page loads
        createBtn(buttonsWrapper, pages);

        const btns = pagElement.querySelectorAll('.pag__control-item');

        // Initial items
        showCurrentItems();

        // Initial check
        btnCheck();

        // Initial buttons
        paginationCheck(currentPage, pages, btns, buttonsWrapper);
      }
    }
  });  
}


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

// Main responsive
const mq950 = window.matchMedia("screen and (max-width: 950px)");

function mainResponsive(mq) {
  if(mq.matches) {
    // Moving bio
    $('.main__feed').prepend($('.main__bio'));

    // Moving instagram
    $('.wrapper').insertBefore($('.main__instagram'), $('.footer'));

    // Moving tags
    $('.wrapper').insertBefore($('.main__tags'), $('.footer'));
  } else {
    // Returning bio
    $('.main__aside').prepend($('.main__bio'));

    // Returning tags
    $('.main__aside').insertBefore($('.main__tags'), $('.main__news'));

    // Returning instagram
    $('.main__aside').insertBefore($('.main__instagram'), $('.main__tags'));
  }
}

mq950.addListener(mainResponsive);
mainResponsive(mq950);