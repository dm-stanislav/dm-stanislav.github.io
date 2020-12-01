"use strict";

// 
// Selecting elements to move
var moveElements = document.querySelectorAll("[data-move]");

if (moveElements.length > 0) {
  (function () {
    // Main function
    var movingElements = function movingElements() {
      for (var _i3 = 0; _i3 < moveElementsInfo.length; _i3++) {
        var _item = moveElementsInfo[_i3];
        var _element2 = _item.element;
        var _destination = _item.destination;
        var _place = _item.place;
        var className = "_moved";
        var _breakpoint2 = mediaQueries[_i3];

        if (_breakpoint2.matches) {
          if (!_element2.classList.contains(className)) {
            _destination.insertBefore(_element2, _destination.children[_place - 1]);

            _element2.classList.add(className);
          }
        } else {
          moveBack(_element2);

          _element2.classList.remove(className);
        }
      }
    }; // Moving back


    var moveBack = function moveBack(element) {
      for (var _i4 = 0; _i4 < moveElementsOriginal.length; _i4++) {
        var _item2 = moveElementsOriginal[_i4];

        if (_item2.element === element) {
          var _index = _item2.index;
          var _parent = _item2.parent;

          _parent.insertBefore(element, _parent.children[_index]);
        }
      }
    };

    // Original position of elements
    var moveElementsOriginal = []; // Move elements info

    var moveElementsInfo = []; // Media queries

    var mediaQueries = [];

    for (var i = 0; i < moveElements.length; i++) {
      var element = moveElements[i];
      var moveAttr = element.getAttribute("data-move");

      if (moveAttr) {
        var moveArr = moveAttr.split(",");
        var breakpoint = !isNaN(+moveArr[0].trim()) ? +moveArr[0].trim() : 767.98;
        var destination = document.querySelector("".concat(moveArr[1].trim()));
        var place = !isNaN(moveArr[2].trim()) ? moveArr[2].trim() : 1;
        var type = moveArr[3] === "max" || moveArr[3] === "min" ? moveArr[3] : "max";

        if (destination && moveArr.length > 0) {
          moveElementsInfo.push({
            element: element,
            breakpoint: breakpoint,
            destination: destination,
            place: place,
            type: type
          });
        }
      }
    } // Sorting elements by place


    moveElementsInfo.sort(function (a, b) {
      return a["place"] > b["place"] ? 1 : -1;
    }); // Getting the default elements' position

    for (var _i = 0; _i < moveElements.length; _i++) {
      var _element = moveElements[_i];
      var parent = _element.parentNode;
      var index = void 0;

      for (var j = 0; j < parent.children.length; j++) {
        var child = parent.children[j];
        if (child === _element) index = j;
      }

      moveElementsOriginal.push({
        element: _element,
        parent: parent,
        index: index
      });
    } // Media Queries


    for (var _i2 = 0; _i2 < moveElementsInfo.length; _i2++) {
      var item = moveElementsInfo[_i2];
      var _type = item.type;
      var _breakpoint = item.breakpoint;
      var media_query = window.matchMedia("(".concat(_type, "-width: ").concat(_breakpoint, "px)"));
      media_query.addEventListener("change", function () {
        return movingElements();
      });
      mediaQueries.push(media_query);
    }

    movingElements();
  })();
} // WebP Check


function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  }
}); // HEADER MOBILE MENU

document.querySelector('.icon-menu').addEventListener('click', function () {
  document.querySelector('.nav').classList.add('_active');
});
document.querySelector('.nav__close').addEventListener('click', function (e) {
  document.querySelector('.nav').classList.remove('_active');
});
var navCategories = document.querySelector('.nav__categories');
navCategories.addEventListener('click', function (e) {
  navCategories.classList.toggle('_active');

  if (e.target.classList.contains('categories__arrow')) {
    e.target.parentNode.classList.add('_active');
  }
});
var mq2 = window.matchMedia("(max-width: 991.98px)");
document.querySelector('.categories__list').addEventListener('click', function (e) {
  if (mq2.matches) {
    if (e.target.classList.contains('categories__arrow') || e.target.closest('.categories__arrow')) {
      e.target.closest('.categories__item').classList.toggle('_active');

      if (e.target.closest('.categories__item').classList.contains('_active')) {
        var itemChildren = e.target.closest('.categories__item').children;
        var itemChildrenArr = Array.prototype.slice.call(itemChildren);
        var sublist = itemChildrenArr.find(function (el) {
          return el.classList.contains('sublist');
        });
        sublist.style.maxHeight = sublist.scrollHeight + "px";
      } else {
        var _itemChildren = e.target.closest('.categories__item').children;

        var _itemChildrenArr = Array.prototype.slice.call(_itemChildren);

        var _sublist = _itemChildrenArr.find(function (el) {
          return el.classList.contains('sublist');
        });

        _sublist.style.maxHeight = 0 + "px";
      }
    }
  }
}); // SELECT

var select_items_nl = document.querySelectorAll('.select');

if (select_items_nl.length > 0) {
  var select_items = Array.prototype.slice.call(select_items_nl, 0);
  select_items.forEach(function (item) {
    var open = item.querySelector('.select__open');
    var input = item.querySelector('.select__input');
    var current = item.querySelector('.select__current');
    var icon = item.querySelector('.select__icon');
    var list = item.querySelector('.select__list');
    var items = item.querySelectorAll('.select__item');
    item.addEventListener('click', function (e) {
      if (e.target === current || e.target === icon) {
        open.classList.toggle('_active');
      }

      if (open.classList.contains('_active')) {
        list.style.maxHeight = list.scrollHeight + "px";
      } else {
        list.style.maxHeight = 0;
      }

      if (e.target.classList.contains('select__item')) {
        input.value = e.target.dataset.searchCategory;
        current.textContent = e.target.textContent;

        for (var i = 0; i < items.length; i++) {
          var element = items[i];
          element.classList.remove('_active');
        }

        e.target.classList.add('_active');
      }
    });
  });
}

window.addEventListener('click', function (e) {
  for (var i = 0; i < select_items_nl.length; i++) {
    var element = select_items_nl[i];
    var open = element.querySelector('.select__open');
    var list = element.querySelector('.select__list');

    if (!open.contains(e.target)) {
      list.style.maxHeight = 0;
      open.classList.remove('_active');
    }
  }
});
window.addEventListener('mouseup', function clickOutside(e) {
  if (!document.querySelector('.nav').contains(e.target)) {
    // NAVIGATION MENU
    document.querySelector('.nav').classList.remove('_active');
    navCategories.classList.remove('_active');
  }
}); // Swiper

new Swiper('.swiper-container', {
  loop: true,
  spaceBetween: 32,
  slidesPerView: 'auto',
  grabCursor: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  autoplay: {
    delay: 5000
  }
});