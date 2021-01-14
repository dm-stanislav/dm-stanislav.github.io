"use strict";

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
            if (_destination.children[_place - 1]) {
              _destination.insertBefore(_element2, _destination.children[_place - 1]);
            } else {
              _destination.append(_element2);
            }

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

          if (_parent.children[_index]) {
            _parent.insertBefore(element, _parent.children[_index]);
          } else {
            _parent.append(element);
          }
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
}

document.addEventListener('DOMContentLoaded', function () {
  var forms = document.querySelectorAll('form');
  if (forms.length <= 0) return;

  var _loop = function _loop(i) {
    var form = forms[i];
    form.addEventListener('submit', formSubmit);

    function formSubmit(evt) {
      evt.preventDefault();
      var errors = validateForm(form);

      if (errors === 0) {
        form.submit();
      } else {
        return false;
      }
    }

    function validateForm(form) {
      var errors = 0;
      var requiredInputs = form.querySelectorAll('._req');

      for (var j = 0; j < requiredInputs.length; j++) {
        var input = requiredInputs[j];
        formRemoveError(input.parentElement);

        if (input.parentElement.classList.contains('_email')) {
          if (emailTest(input)) {
            formAddError(input.parentElement);
            errors++;
          }
        } else if (input.parentElement.classList.contains('_tel')) {
          if (telTest(input)) {
            formAddError(input.parentElement);
            errors++;
          }
        } else {
          if (input.value === '') {
            formAddError(input.parentElement);
            errors++;
          }
        }
      }

      var requiredCheck = form.querySelectorAll('._req-check');

      for (var _j = 0; _j < requiredCheck.length; _j++) {
        var checkWrapper = requiredCheck[_j];
        formRemoveError(checkWrapper);
        var inputs = checkWrapper.querySelectorAll('input');
        var checkedInputs = 0;

        for (var x = 0; x < inputs.length; x++) {
          var _input = inputs[x];

          if (_input.checked) {
            checkedInputs++;
          }
        }

        if (!checkedInputs) {
          formAddError(checkWrapper);
          errors++;
        }
      }

      return errors;
    }

    function formAddError(input) {
      input.classList.add('_error');
    }

    function formRemoveError(input) {
      input.classList.remove('_error');
    }

    function emailTest(input) {
      return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }

    function telTest(input) {
      return !/^\+[1-9]{1}[0-9]{3,14}$/.test(input.value);
    }

    var formImage = form.querySelectorAll('._img-file');

    var _loop2 = function _loop2(j) {
      var img = formImage[j];
      var preview = img.querySelector('._img-preview');
      var input = img.querySelector('input');

      if (preview) {
        var uploadFile = function uploadFile(file) {
          if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
            alert('Invalid file extension.');
            formImage.value = '';
            return;
          }

          if (file.size > 2 * 1024 * 1024) {
            alert('ERROR: maximum file size is 2 MB');
            formImage.value = '';
            return;
          }

          var reader = new FileReader();

          reader.onload = function (evt) {
            preview.innerHTML = "<img src=\"".concat(evt.target.result, "\" alt=\"Uploaded picture\">");
          };

          reader.onerror = function (evt) {
            alert('ERROR');
          };

          reader.readAsDataURL(file);
        };

        input.addEventListener('change', function () {
          uploadFile(input.files[0]);
        });
      }
    };

    for (var j = 0; j < formImage.length; j++) {
      _loop2(j);
    }
  };

  for (var i = 0; i < forms.length; i++) {
    _loop(i);
  }
});

(function animateOnScroll() {
  // Settings
  var animThreshold = 0.6;
  var once = true;
  var initialCallTime = 350;
  var animItems = document.querySelectorAll('._animate');
  if (animItems.length === 0) return;
  window.addEventListener('scroll', anim);

  function anim() {
    for (var i = 0; i < animItems.length; i++) {
      var item = animItems[i];
      var itemHeight = item.offsetHeight;
      var itemOffset = getPosition(item).top;
      var animStart = 1 / animThreshold;
      var itemPoint = 200;

      if (itemHeight > window.innerHeight) {
        itemPoint = 200;
      }

      if (pageYOffset > itemOffset - itemPoint) {
        item.classList.add('_animated');
      } else {
        if (!once) {
          item.classList.remove('_animated');
        }
      }
    }
  }

  setTimeout(function () {
    return anim();
  }, initialCallTime);

  function getPosition(element) {
    var top = 0;
    var left = 0;

    while (element) {
      top += element.offsetTop;
      left += element.offsetLeft;
      element = element.offsetParent;
    }

    return {
      top: top,
      left: left
    };
  }
})(); // WebP Check


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
}); // Set IMG as Background

function setBackground() {
  var setBackground = document.querySelectorAll("._bg");

  for (var i = 0; i < setBackground.length; i++) {
    if (setBackground[i].querySelector('img')) {
      setBackground[i].style.backgroundImage = 'url(' + setBackground[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

setBackground(); // DETECT SWIPE

function userSwiped() {
  document.addEventListener('touchstart', handleTouchStart);
  document.addEventListener('touchmove', handleTouchMove);
  var yDown = null;
  var xDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
  }

  function handleTouchStart(evt) {
    var firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        /* left swipe */
      } else {
        if (document.body.classList.contains('_menu')) {
          closeMenu();
        }
      }
    } else {
      if (yDiff > 0) {
        /* up swipe */
      } else {
          /* down swipe */
        }
    }

    xDown = null;
    yDown = null;
  }
}

userSwiped();

function openMenu() {
  document.querySelector('.menu-icon').classList.add('_active');
  document.querySelector('.menu__body').classList.add('_active');
  document.body.classList.add('_menu');
}

function closeMenu() {
  document.querySelector('.menu-icon').classList.remove('_active');
  document.querySelector('.menu__body').classList.remove('_active');
  document.body.classList.remove('_menu');
}

document.querySelector('.menu-icon').addEventListener('click', function () {
  if (document.body.classList.contains('_menu')) {
    closeMenu();
  } else {
    openMenu();
  }
});
var showcaseScene = document.querySelector('.vegetables__parallax');
var showcaseParallax = new Parallax(showcaseScene);
var formScene = document.querySelector('.call__vegetables');
var formParallax = new Parallax(formScene);

(function offers() {
  var pizza = document.querySelector('.showcase .pizza');
  var offers = document.querySelectorAll('.offers');
  var items = document.querySelectorAll('.showcase .offers__item');
  if (offers.length === 0) return;
  pizza.addEventListener('click', showcaseOffers);

  function showcaseOffers(evt) {
    if (evt.target.closest('.offers__icon')) {
      if (!evt.target.closest('.offers__item').classList.contains('_active')) {
        for (var i = 0; i < items.length; i++) {
          var element = items[i];
          element.classList.remove('_active');
        }

        evt.target.closest('.offers__item').classList.add('_active');
      } else {
        evt.target.closest('.offers__item').classList.remove('_active');
      }
    }
  }
})();

(function tabs() {
  var tabs = document.querySelectorAll('.tabs');
  if (tabs.length === 0) return;

  var _loop3 = function _loop3(i) {
    var tab = tabs[i];
    tab.addEventListener('click', tabHandler);
    var tabContent = tab.querySelectorAll('.tabs__content');
    var tabButtons = tab.querySelectorAll('.tabs__heading');

    function tabHandler(evt) {
      var button = evt.target.closest('.tabs__heading');

      if (button) {
        var activeTab = button.dataset.tab;
        closeAllTabs();
        openTab(activeTab, button);
      }
    }

    function closeAllTabs() {
      for (var j = 0; j < tabContent.length; j++) {
        var element = tabContent[j];
        element.classList.remove('_active');
      }

      for (var _j2 = 0; _j2 < tabButtons.length; _j2++) {
        var _element3 = tabButtons[_j2];

        _element3.classList.remove('_active');
      }
    }

    function openTab(tab, button) {
      for (var j = 0; j < tabContent.length; j++) {
        var element = tabContent[j];

        if (element.classList.contains(tab)) {
          element.classList.add('_active');
          button.classList.add('_active');
        }
      }
    }
  };

  for (var i = 0; i < tabs.length; i++) {
    _loop3(i);
  }
})();

var gallery = new Swiper('#gallery-slider', {
  loop: true,
  autoplay: {
    delay: 3000
  },
  speed: 700,
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 0
    },
    576: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 20
    },
    890: {
      slidesPerView: 4,
      spaceBetween: 25
    },
    992: {
      slidesPerView: 5,
      spaceBetween: 30
    },
    1160: {
      slidesPerView: 5,
      spaceBetween: 40
    }
  }
});

(function header() {
  var initialScroll = window.pageYOffset || document.documentElement.scrollTop;
  ;
  var allowShrinking = true;
  var header = document.querySelector('header');
  var duration;
  window.addEventListener('scroll', headerHandler, false);

  function headerHandler() {
    var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (window.pageYOffset > 10) {
      duration = window.getComputedStyle(header).getPropertyValue('animation-duration');
      duration = parseFloat(duration) * 1000;

      if (currentScroll < initialScroll) {
        if (!allowShrinking) return;
        allowShrinking = false;
        header.classList.add('_shrinked');
        header.style.animationName = 'headerIn';
        setTimeout(function () {
          return allowShrinking = true;
        }, duration);
      } else {
        if (!allowShrinking) return;
        allowShrinking = false;
        header.style.animationName = 'headerOut';
        setTimeout(function () {
          header.classList.remove('_shrinked');
          allowShrinking = true;
        }, duration);
      }
    } else {
      duration = window.getComputedStyle(header).getPropertyValue('animation-duration');
      duration = parseFloat(duration) * 1000;
      setTimeout(function () {
        header.classList.remove('_shrinked');
      }, duration);
    }

    initialScroll = currentScroll <= 0 ? 0 : currentScroll;
  }

  headerHandler();
})();
