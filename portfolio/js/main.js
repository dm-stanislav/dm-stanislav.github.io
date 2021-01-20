"use strict";

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
  var animThreshold = 0.5;
  var once = false;
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
      var itemPoint = window.innerHeight - itemHeight / animStart;

      if (itemHeight > window.innerHeight) {
        itemPoint = window.innerHeight - window.innerHeight / animStart;
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
document.querySelector('.menu-icon').addEventListener('click', function (evt) {
  if (!document.body.classList.contains('_menu')) openMenu();else closeMenu();
});

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

(function menuItemDelay() {
  var items = document.querySelectorAll('.menu__body li');
  if (items.length === 0) return;

  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    item.style.transition = "transform 0.5s ease-in-out ".concat(0.2 + 0.15 * i, "s");
  }
})();

window.addEventListener('resize', function () {
  parallaxScroll();
});

function parallaxScroll() {
  var sensitivity = 0.1;
  var items = document.querySelectorAll('._parallax');
  if (items.length === 0) return;
  window.addEventListener('scroll', function () {
    var scrollAmount = window.pageYOffset || window.scrollY;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      if (!item.classList.contains('_reverse')) {
        item.style.transform = "translateY(".concat(scrollAmount * sensitivity, "px)");
      } else {
        if (window.innerWidth < 768) {
          item.style.transform = "translateY(0px)";
        } else {
          item.style.transform = "translateY(".concat(scrollAmount * sensitivity * -1, "px)");
        }
      }
    }
  });
}

parallaxScroll();

(function tabs() {
  var tabs = document.querySelectorAll('.tabs');
  if (tabs.length === 0) return;

  for (var j = 0; j < tabs.length; j++) {
    var tab = tabs[j];
    var btns = tab.querySelectorAll('.tabs__btn');
    var pages = tab.querySelectorAll('.tabs__content');
    tab.addEventListener('click', function (evt) {
      var btn = evt.target.closest('.tabs__btn');
      var tabID = btn.dataset.tab;
      if (!tabID && !btn) return;
      document.querySelector('.tabs__btn._active').classList.remove('_active');
      btn.classList.add('_active');
      document.querySelector('.tabs__content._active').classList.remove('_active');
      document.querySelector(".tabs__content.".concat(tabID)).classList.add('_active');
    });
  }
})();

(function addBgToHeader() {
  var header = document.querySelector('header');
  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 10) header.classList.add('_add-bg');else header.classList.remove('_add-bg');
  });
})();