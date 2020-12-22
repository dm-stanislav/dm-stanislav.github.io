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

              _element2.classList.add(className);
            } else {
              _destination.append(_element2);

              _element2.classList.add(className);
            }
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
}

var modalOpen = document.querySelectorAll('.open-modal');

if (modalOpen.length > 0) {
  (function () {
    var openModal = function openModal(modal) {
      if (modal && modalAllowed) {
        var activeModal = document.querySelector('.modal._open');

        if (activeModal) {
          closeModal(activeModal, false);
        } else {
          lockScroll();
        }

        modal.classList.add('_open');

        var _modalHandler;

        modal.addEventListener('click', _modalHandler = function modalHandler(e) {
          if (!e.target.closest('.modal__content')) {
            closeModal(e.target.closest('.modal'));
          } else if (modalAllowed) {
            modal.removeEventListener('click', _modalHandler);
          }
        });
        modalAllowed = false;
        setTimeout(function () {
          return modalAllowed = true;
        }, modalDuration);
      }
    };

    var closeModal = function closeModal(modal) {
      var enableScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (modal && modalAllowed) {
        modal.classList.remove('_open');

        if (enableScroll) {
          unlockScroll();
        }
      }
    };

    var lockScroll = function lockScroll() {
      var barWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = barWidth + "px";
      document.body.style.overflow = "hidden";
    };

    var unlockScroll = function unlockScroll() {
      setTimeout(function () {
        document.body.style.paddingRight = 0;
        document.body.style.overflow = "visible";
      }, modalDuration);
    };

    var modalAllowed = true;
    var modalDuration = 400;

    var _loop = function _loop(i) {
      var openButton = modalOpen[i];
      openButton.addEventListener('click', function (e) {
        var modalName = openButton.getAttribute('data-modal');
        var modal = document.getElementById(modalName);

        if (modal) {
          openModal(modal);
        }

        e.preventDefault();
      });
    };

    for (var i = 0; i < modalOpen.length; i++) {
      _loop(i);
    }

    var modalClose = document.querySelectorAll('.modal__close');

    var _loop2 = function _loop2(_i5) {
      var closeButton = modalClose[_i5];
      closeButton.addEventListener('click', function (e) {
        closeModal(closeButton.closest('.modal'));
        e.preventDefault();
      });
    };

    for (var _i5 = 0; _i5 < modalClose.length; _i5++) {
      _loop2(_i5);
    }

    window.addEventListener('keydown', function (e) {
      if (e.key === "Escape") {
        var activeModal = document.querySelector('.modal._open');
        closeModal(activeModal);
      }
    });
  })();
} // Element.prototype.matches polyfill


(function (e) {
  var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
  !matches ? e.matches = e.matchesSelector = function matches(selector) {
    var matches = document.querySelectorAll(selector);
    var th = this;
    return Array.prototype.some.call(matches, function (e) {
      return e === th;
    });
  } : e.matches = e.matchesSelector = matches;
})(Element.prototype); // Element.prototype.closest polyfill


(function (ELEMENT) {
  ELEMENT.matches = ELEMENT.matches || ELEMENT.mozMatchesSelector || ELEMENT.msMatchesSelector || ELEMENT.oMatchesSelector || ELEMENT.webkitMatchesSelector;

  ELEMENT.closest = ELEMENT.closest || function closest(selector) {
    if (!this) return null;
    if (this.matches(selector)) return this;

    if (!this.parentElement) {
      return null;
    } else return this.parentElement.closest(selector);
  };
})(Element.prototype);

(function () {
  "use strict";

  var BODYTYPES = ["DAYS", "MONTHS", "YEARS"];
  var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  /** @typedef {Object.<string, Function[]>} Handlers */

  /** @typedef {function(String, Function): null} AddHandler */

  /** @typedef {("DAYS"|"MONTHS"|"YEARS")} BodyType */

  /** @typedef {string|number} StringNum */

  /** @typedef {Object.<string, StringNum>} StringNumObj */

  /**
   * The local state
   * @typedef {Object} InstanceState
   * @property {Date} value
   * @property {Number} year
   * @property {Number} month
   * @property {Number} day
   * @property {Number} time
   * @property {Number} hours
   * @property {Number} minutes
   * @property {BodyType} bodyType
   * @property {Boolean} visible
   * @property {Number} cancelBlur
   */

  /** 
   * @typedef {Object} Config
   * @property {String} dateFormat
   * @property {String} timeFormat
   * @property {Boolean} showDate
   * @property {Boolean} showTime
   * @property {Number} paddingX
   * @property {Number} paddingY
   * @property {BodyType} defaultView
   * @property {"TOP"|"BOTTOM"} direction
  */

  /**
   * @class
   * @param {HTMLElement} elem 
   * @param {Config} config 
   */

  function DTS(elem, config) {
    var config = config || {};
    /** @type {Config} */

    var defaultConfig = {
      defaultView: BODYTYPES[0],
      dateFormat: "yyyy-mm-dd",
      timeFormat: "HH:MM:SS",
      showDate: true,
      showTime: false,
      paddingX: 5,
      paddingY: 5,
      direction: 'TOP'
    };

    if (!elem) {
      throw TypeError("input element or selector required for contructor");
    }

    if (Object.getPrototypeOf(elem) === String.prototype) {
      var _elem = document.querySelectorAll(elem);

      if (!_elem[0]) {
        throw Error('"' + elem + '" not found.');
      }

      elem = _elem[0];
    }

    this.config = setDefaults(config, defaultConfig);
    this.dateFormat = this.config.dateFormat;
    this.timeFormat = this.config.timeFormat;
    this.dateFormatRegEx = new RegExp("yyyy|yy|mm|dd", "gi");
    this.timeFormatRegEx = new RegExp("hh|mm|ss|a", "gi");
    this.inputElem = elem;
    this.dtbox = null;
    this.setup();
  }

  DTS.prototype.setup = function () {
    var handler = this.inputElemHandler.bind(this);
    this.inputElem.addEventListener("focus", handler, false);
    this.inputElem.addEventListener("blur", handler, false);
  };

  DTS.prototype.inputElemHandler = function (e) {
    if (e.type == "focus") {
      if (!this.dtbox) {
        this.dtbox = new DTBox(e.target, this);
      }

      this.dtbox.visible = true;
    } else if (e.type == "blur" && this.dtbox && this.dtbox.visible) {
      var self = this;
      setTimeout(function () {
        if (self.dtbox.cancelBlur > 0) {
          self.dtbox.cancelBlur -= 1;
        } else {
          self.dtbox.visible = false;
          self.inputElem.blur();
        }
      }, 100);
    }
  };
  /**
   * @class
   * @param {HTMLElement} elem 
   * @param {DTS} settings 
   */


  function DTBox(elem, settings) {
    /** @type {DTBox} */
    var self = this;
    /** @type {Handlers} */

    var handlers = {};
    /** @type {InstanceState} */

    var localState = {};
    /**
     * @param {String} key 
     * @param {*} default_val 
     */

    function getterSetter(key, default_val) {
      return {
        get: function get() {
          var val = localState[key];
          return val === undefined ? default_val : val;
        },
        set: function set(val) {
          var prevState = self.state;

          var _handlers = handlers[key] || [];

          localState[key] = val;

          for (var i = 0; i < _handlers.length; i++) {
            _handlers[i].bind(self)(localState, prevState);
          }
        }
      };
    }

    ;
    /** @type {AddHandler} */

    function addHandler(key, handlerFn) {
      if (!key || !handlerFn) {
        return false;
      }

      if (!handlers[key]) {
        handlers[key] = [];
      }

      handlers[key].push(handlerFn);
    }

    Object.defineProperties(this, {
      visible: getterSetter("visible", false),
      bodyType: getterSetter("bodyType", settings.config.defaultView),
      value: getterSetter("value"),
      year: getterSetter("year", 0),
      month: getterSetter("month", 0),
      day: getterSetter("day", 0),
      hours: getterSetter("hours", 0),
      minutes: getterSetter("minutes", 0),
      cancelBlur: getterSetter("cancelBlur", 0),
      addHandler: {
        value: addHandler
      },
      month_long: {
        get: function get() {
          return MONTHS[self.month];
        }
      },
      month_short: {
        get: function get() {
          return self.month_long.slice(0, 3);
        }
      },
      state: {
        get: function get() {
          return Object.assign({}, localState);
        }
      },
      time: {
        get: function get() {
          var hours = self.hours * 60 * 60 * 1000;
          var minutes = self.minutes * 60 * 1000;
          return hours + minutes;
        }
      }
    });
    this.el = {};
    this.settings = settings;
    this.elem = elem;
    this.setup();
  }

  DTBox.prototype.setup = function () {
    Object.defineProperties(this.el, {
      wrapper: {
        value: null,
        configurable: true
      },
      header: {
        value: null,
        configurable: true
      },
      body: {
        value: null,
        configurable: true
      },
      footer: {
        value: null,
        configurable: true
      }
    });
    this.setupWrapper();

    if (this.settings.config.showDate) {
      this.setupHeader();
      this.setupBody();
    }

    if (this.settings.config.showTime) {
      this.setupFooter();
    }

    var self = this;
    this.addHandler("visible", function (state, prevState) {
      if (state.visible && !prevState.visible) {
        document.body.appendChild(this.el.wrapper);
        var parts = self.elem.value.split(/\s*,\s*/);
        var startDate = undefined;
        var startTime = 0;

        if (self.settings.config.showDate) {
          startDate = parseDate(parts[0], self.settings);
        }

        if (self.settings.config.showTime) {
          startTime = parseTime(parts[parts.length - 1], self.settings);
          startTime = startTime || 0;
        }

        if (!(startDate && startDate.getTime())) {
          startDate = new Date();
          startDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
        }

        var value = new Date(startDate.getTime() + startTime);
        self.value = value;
        self.year = value.getFullYear();
        self.month = value.getMonth();
        self.day = value.getDate();
        self.hours = value.getHours();
        self.minutes = value.getMinutes();

        if (self.settings.config.showDate) {
          self.setHeaderContent();
          self.setBodyContent();
        }

        if (self.settings.config.showTime) {
          self.setFooterContent();
        }
      } else if (!state.visible && prevState.visible) {
        document.body.removeChild(this.el.wrapper);
      }
    });
  };

  DTBox.prototype.setupWrapper = function () {
    if (!this.el.wrapper) {
      var el = document.createElement("div");
      el.classList.add("date-selector-wrapper");
      Object.defineProperty(this.el, "wrapper", {
        value: el
      });
    }

    var self = this;
    var htmlRoot = document.getElementsByTagName('html')[0];

    function setPosition(e) {
      var minTopSpace = 300;
      var box = getOffset(self.elem);
      var config = self.settings.config;
      var paddingY = config.paddingY || 5;
      var paddingX = config.paddingX || 5;
      var top = box.top + self.elem.offsetHeight + paddingY;
      var left = box.left + paddingX;
      var bottom = htmlRoot.clientHeight - box.top + paddingY;
      self.el.wrapper.style.left = "".concat(left, "px");

      if (box.top > minTopSpace && config.direction != 'BOTTOM') {
        self.el.wrapper.style.bottom = "".concat(bottom, "px");
        self.el.wrapper.style.top = '';
      } else {
        self.el.wrapper.style.top = "".concat(top, "px");
        self.el.wrapper.style.bottom = '';
      }
    }

    function handler(e) {
      self.cancelBlur += 1;
      setTimeout(function () {
        self.elem.focus();
      }, 50);
    }

    setPosition();
    this.setPosition = setPosition;
    this.el.wrapper.addEventListener("mousedown", handler, false);
    this.el.wrapper.addEventListener("touchstart", handler, false);
    window.addEventListener('resize', this.setPosition);
  };

  DTBox.prototype.setupHeader = function () {
    if (!this.el.header) {
      var row = document.createElement("div");
      var classes = ["cal-nav-prev", "cal-nav-current", "cal-nav-next"];
      row.classList.add("cal-header");

      for (var i = 0; i < 3; i++) {
        var cell = document.createElement("div");
        cell.classList.add("cal-nav", classes[i]);
        cell.onclick = this.onHeaderChange.bind(this);
        row.appendChild(cell);
      }

      row.children[0].innerHTML = "&lt;";
      row.children[2].innerHTML = "&gt;";
      Object.defineProperty(this.el, "header", {
        value: row
      });
      tryAppendChild(row, this.el.wrapper);
    }

    this.setHeaderContent();
  };

  DTBox.prototype.setHeaderContent = function () {
    var content = this.year;

    if ("DAYS" == this.bodyType) {
      content = this.month_long + " " + content;
    } else if ("YEARS" == this.bodyType) {
      var start = this.year + 10 - this.year % 10;
      content = start - 10 + "-" + (start - 1);
    }

    this.el.header.children[1].innerText = content;
  };

  DTBox.prototype.setupBody = function () {
    if (!this.el.body) {
      var el = document.createElement("div");
      el.classList.add("cal-body");
      Object.defineProperty(this.el, "body", {
        value: el
      });
      tryAppendChild(el, this.el.wrapper);
    }

    var toAppend = null;

    function makeGrid(rows, cols, className, firstRowClass, clickHandler) {
      var grid = document.createElement("div");
      grid.classList.add(className);

      for (var i = 1; i < rows + 1; i++) {
        var row = document.createElement("div");
        row.classList.add("cal-row", "cal-row-" + i);

        if (i == 1 && firstRowClass) {
          row.classList.add(firstRowClass);
        }

        for (var j = 1; j < cols + 1; j++) {
          var col = document.createElement("div");
          col.classList.add("cal-cell", "cal-col-" + j);
          col.onclick = clickHandler;
          row.appendChild(col);
        }

        grid.appendChild(row);
      }

      return grid;
    }

    if ("DAYS" == this.bodyType) {
      toAppend = this.el.body.calDays;

      if (!toAppend) {
        toAppend = makeGrid(7, 7, "cal-days", "cal-day-names", this.onDateSelected.bind(this));

        for (var i = 0; i < 7; i++) {
          var cell = toAppend.children[0].children[i];
          cell.innerText = WEEKDAYS[i].slice(0, 2);
          cell.onclick = null;
        }

        this.el.body.calDays = toAppend;
      }
    } else if ("MONTHS" == this.bodyType) {
      toAppend = this.el.body.calMonths;

      if (!toAppend) {
        toAppend = makeGrid(3, 4, "cal-months", null, this.onMonthSelected.bind(this));

        for (var i = 0; i < 3; i++) {
          for (var j = 0; j < 4; j++) {
            var monthShort = MONTHS[4 * i + j].slice(0, 3);
            toAppend.children[i].children[j].innerText = monthShort;
          }
        }

        this.el.body.calMonths = toAppend;
      }
    } else if ("YEARS" == this.bodyType) {
      toAppend = this.el.body.calYears;

      if (!toAppend) {
        toAppend = makeGrid(3, 4, "cal-years", null, this.onYearSelected.bind(this));
        this.el.body.calYears = toAppend;
      }
    }

    empty(this.el.body);
    tryAppendChild(toAppend, this.el.body);
    this.setBodyContent();
  };

  DTBox.prototype.setBodyContent = function () {
    var grid = this.el.body.children[0];
    var classes = ["cal-cell-prev", "cal-cell-next", "cal-value"];

    if ("DAYS" == this.bodyType) {
      var oneDayMilliSecs = 24 * 60 * 60 * 1000;
      var start = new Date(this.year, this.month, 1);
      var adjusted = new Date(start.getTime() - oneDayMilliSecs * start.getDay());
      grid.children[6].style.display = "";

      for (var i = 1; i < 7; i++) {
        for (var j = 0; j < 7; j++) {
          var cell = grid.children[i].children[j];
          var month = adjusted.getMonth();
          var date = adjusted.getDate();
          cell.innerText = date;
          cell.classList.remove(classes[0], classes[1], classes[2]);

          if (month != this.month) {
            if (i == 6 && j == 0) {
              grid.children[6].style.display = "none";
              break;
            }

            cell.classList.add(month < this.month ? classes[0] : classes[1]);
          } else if (isEqualDate(adjusted, this.value)) {
            cell.classList.add(classes[2]);
          }

          adjusted = new Date(adjusted.getTime() + oneDayMilliSecs);
        }
      }
    } else if ("YEARS" == this.bodyType) {
      var year = this.year - this.year % 10 - 1;

      for (i = 0; i < 3; i++) {
        for (j = 0; j < 4; j++) {
          grid.children[i].children[j].innerText = year;
          year += 1;
        }
      }

      grid.children[0].children[0].classList.add(classes[0]);
      grid.children[2].children[3].classList.add(classes[1]);
    }
  };
  /** @param {Event} e */


  DTBox.prototype.onTimeChange = function (e) {
    e.stopPropagation();

    if (e.type == 'mousedown') {
      this.cancelBlur += 1;
      return;
    }

    var el = e.target;
    this[el.name] = parseInt(el.value) || 0;
    this.setupFooter();

    if (e.type == 'change') {
      var self = this;
      setTimeout(function () {
        self.elem.focus();
      }, 50);
    }

    this.setInputValue();
  };

  DTBox.prototype.setupFooter = function () {
    if (!this.el.footer) {
      var makeRow = function makeRow(label, name, range, changeHandler) {
        var row = document.createElement("div");
        row.classList.add('cal-time');
        var labelCol = row.appendChild(document.createElement("div"));
        labelCol.classList.add('cal-time-label');
        labelCol.innerText = label;
        var valueCol = row.appendChild(document.createElement("div"));
        valueCol.classList.add('cal-time-value');
        valueCol.innerText = '00';
        var inputCol = row.appendChild(document.createElement("div"));
        var slider = inputCol.appendChild(document.createElement("input"));
        Object.assign(slider, {
          step: 1,
          min: 0,
          max: range,
          name: name,
          type: 'range'
        });
        Object.defineProperty(footer, name, {
          value: slider
        });
        inputCol.classList.add('cal-time-slider');
        slider.onchange = changeHandler;
        slider.oninput = changeHandler;
        slider.onmousedown = changeHandler;
        self[name] = self[name] || parseInt(slider.value) || 0;
        footer.appendChild(row);
      };

      var footer = document.createElement("div");
      var handler = this.onTimeChange.bind(this);
      var self = this;
      makeRow('HH:', 'hours', 23, handler);
      makeRow('MM:', 'minutes', 59, handler);
      footer.classList.add("cal-footer");
      Object.defineProperty(this.el, "footer", {
        value: footer
      });
      tryAppendChild(footer, this.el.wrapper);
    }

    this.setFooterContent();
  };

  DTBox.prototype.setFooterContent = function () {
    if (this.el.footer) {
      var footer = this.el.footer;
      footer.hours.value = this.hours;
      footer.children[0].children[1].innerText = padded(this.hours, 2);
      footer.minutes.value = this.minutes;
      footer.children[1].children[1].innerText = padded(this.minutes, 2);
    }
  };

  DTBox.prototype.setInputValue = function () {
    var date = new Date(this.year, this.month, this.day);
    var strings = [];

    if (this.settings.config.showDate) {
      strings.push(renderDate(date, this.settings));
    }

    if (this.settings.config.showTime) {
      var joined = new Date(date.getTime() + this.time);
      strings.push(renderTime(joined, this.settings));
    }

    this.elem.value = strings.join(', ');
  };

  DTBox.prototype.onDateSelected = function (e) {
    var row = e.target.parentNode;
    var date = parseInt(e.target.innerText);

    if (!(row.nextSibling && row.nextSibling.nextSibling) && date < 8) {
      this.month += 1;
    } else if (!(row.previousSibling && row.previousSibling.previousSibling) && date > 7) {
      this.month -= 1;
    }

    this.day = parseInt(e.target.innerText);
    this.value = new Date(this.year, this.month, this.day);
    this.setInputValue();
    this.setHeaderContent();
    this.setBodyContent();
  };
  /** @param {Event} e */


  DTBox.prototype.onMonthSelected = function (e) {
    var col = 0;
    var row = 2;
    var cell = e.target;

    if (cell.parentNode.nextSibling) {
      row = cell.parentNode.previousSibling ? 1 : 0;
    }

    if (cell.previousSibling) {
      col = 3;

      if (cell.nextSibling) {
        col = cell.previousSibling.previousSibling ? 2 : 1;
      }
    }

    this.month = 4 * row + col;
    this.bodyType = "DAYS";
    this.setHeaderContent();
    this.setupBody();
  };
  /** @param {Event} e */


  DTBox.prototype.onYearSelected = function (e) {
    this.year = parseInt(e.target.innerText);
    this.bodyType = "MONTHS";
    this.setHeaderContent();
    this.setupBody();
  };
  /** @param {Event} e */


  DTBox.prototype.onHeaderChange = function (e) {
    var cell = e.target;

    if (cell.previousSibling && cell.nextSibling) {
      var idx = BODYTYPES.indexOf(this.bodyType);

      if (idx < 0 || !BODYTYPES[idx + 1]) {
        return;
      }

      this.bodyType = BODYTYPES[idx + 1];
      this.setupBody();
    } else {
      var sign = cell.previousSibling ? 1 : -1;

      switch (this.bodyType) {
        case "DAYS":
          this.month += sign * 1;
          break;

        case "MONTHS":
          this.year += sign * 1;
          break;

        case "YEARS":
          this.year += sign * 10;
      }

      if (this.month > 11 || this.month < 0) {
        this.year += Math.floor(this.month / 11);
        this.month = this.month > 11 ? 0 : 11;
      }
    }

    this.setHeaderContent();
    this.setBodyContent();
  };
  /**
   * @param {HTMLElement} elem 
   * @returns {{left:number, top:number}}
   */


  function getOffset(elem) {
    var box = elem.getBoundingClientRect();
    var left = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    var top = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    return {
      left: box.left + left,
      top: box.top + top
    };
  }

  function empty(e) {
    for (; e.children.length;) {
      e.removeChild(e.children[0]);
    }
  }

  function tryAppendChild(newChild, refNode) {
    try {
      refNode.appendChild(newChild);
      return newChild;
    } catch (e) {
      console.trace(e);
    }
  }
  /** @class */


  function hookFuncs() {
    /** @type {Handlers} */
    this._funcs = {};
  }
  /**
   * @param {string} key 
   * @param {Function} func 
   */


  hookFuncs.prototype.add = function (key, func) {
    if (!this._funcs[key]) {
      this._funcs[key] = [];
    }

    this._funcs[key].push(func);
  };
  /**
   * @param {String} key 
   * @returns {Function[]} handlers
   */


  hookFuncs.prototype.get = function (key) {
    return this._funcs[key] ? this._funcs[key] : [];
  };
  /**
   * @param {Array.<string>} arr 
   * @param {String} string 
   * @returns {Array.<string>} sorted string
   */


  function sortByStringIndex(arr, string) {
    return arr.sort(function (a, b) {
      var h = string.indexOf(a);
      var l = string.indexOf(b);
      var rank = 0;

      if (h < l) {
        rank = -1;
      } else if (l < h) {
        rank = 1;
      } else if (a.length > b.length) {
        rank = -1;
      } else if (b.length > a.length) {
        rank = 1;
      }

      return rank;
    });
  }
  /**
   * Remove keys from array that are not in format
   * @param {string[]} keys 
   * @param {string} format 
   * @returns {string[]} new filtered array
   */


  function filterFormatKeys(keys, format) {
    var out = [];
    var formatIdx = 0;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (format.slice(formatIdx).indexOf(key) > -1) {
        formatIdx += key.length;
        out.push(key);
      }
    }

    return out;
  }
  /**
   * @template {StringNumObj} FormatObj
   * @param {string} value 
   * @param {string} format 
   * @param {FormatObj} formatObj 
   * @param {function(Object.<string, hookFuncs>): null} setHooks 
   * @returns {FormatObj} formatObj
   */


  function parseData(value, format, formatObj, setHooks) {
    var hooks = {
      canSkip: new hookFuncs(),
      updateValue: new hookFuncs()
    };
    var keys = sortByStringIndex(Object.keys(formatObj), format);
    var filterdKeys = filterFormatKeys(keys, format);
    var vstart = 0; // value start

    if (setHooks) {
      setHooks(hooks);
    }

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var fstart = format.indexOf(key);
      var _vstart = vstart; // next value start

      var val = null;
      var canSkip = false;
      var funcs = hooks.canSkip.get(key);
      vstart = vstart || fstart;

      for (var j = 0; j < funcs.length; j++) {
        if (funcs[j](formatObj)) {
          canSkip = true;
          break;
        }
      }

      if (fstart > -1 && !canSkip) {
        var sep = null;
        var stop = vstart + key.length;
        var fnext = -1;
        var nextKeyIdx = i + 1;
        _vstart += key.length; // set next value start if current key is found
        // get next format token used to determine separator

        while (fnext == -1 && nextKeyIdx < keys.length) {
          var nextKey = keys[nextKeyIdx];
          nextKeyIdx += 1;

          if (filterdKeys.indexOf(nextKey) === -1) {
            continue;
          }

          fnext = nextKey ? format.indexOf(nextKey) : -1; // next format start
        }

        if (fnext > -1) {
          sep = format.slice(stop, fnext);

          if (sep) {
            var _stop = value.slice(vstart).indexOf(sep);

            if (_stop && _stop > -1) {
              stop = _stop + vstart;
              _vstart = stop + sep.length;
            }
          }
        }

        val = parseInt(value.slice(vstart, stop));
        var funcs = hooks.updateValue.get(key);

        for (var k = 0; k < funcs.length; k++) {
          val = funcs[k](val, formatObj, vstart, stop);
        }
      }

      formatObj[key] = {
        index: vstart,
        value: val
      };
      vstart = _vstart; // set next value start
    }

    return formatObj;
  }
  /**
   * @param {String} value 
   * @param {DTS} settings 
   * @returns {Date} date object
   */


  function parseDate(value, settings) {
    /** @type {{yyyy:number=, yy:number=, mm:number=, dd:number=}} */
    var formatObj = {
      yyyy: null,
      yy: null,
      mm: null,
      dd: null
    };
    var format = (settings.dateFormat || '').toLowerCase();

    if (!format) {
      throw new TypeError('dateFormat not found (' + settings.dateFormat + ')');
    }

    var formatObj = parseData(value, format, formatObj, function (hooks) {
      hooks.canSkip.add("yy", function (data) {
        return data["yyyy"].value;
      });
      hooks.updateValue.add("yy", function (val) {
        return 100 * Math.floor(new Date().getFullYear() / 100) + val;
      });
    });
    var year = formatObj["yyyy"].value || formatObj["yy"].value;
    var month = formatObj["mm"].value - 1;
    var date = formatObj["dd"].value;
    var result = new Date(year, month, date);
    return result;
  }
  /**
   * @param {String} value 
   * @param {DTS} settings 
   * @returns {Number} time in milliseconds <= (24 * 60 * 60 * 1000) - 1
   */


  function parseTime(value, settings) {
    var format = (settings.timeFormat || '').toLowerCase();

    if (!format) {
      throw new TypeError('timeFormat not found (' + settings.timeFormat + ')');
    }
    /** @type {{hh:number=, mm:number=, ss:number=, a:string=}} */


    var formatObj = {
      hh: null,
      mm: null,
      ss: null,
      a: null
    };
    var formatObj = parseData(value, format, formatObj, function (hooks) {
      hooks.updateValue.add("a", function (val, data, start, stop) {
        return value.slice(start, start + 2);
      });
    });
    var hours = formatObj["hh"].value;
    var minutes = formatObj["mm"].value;
    var am_pm = formatObj["a"].value;
    var am_pm_lower = am_pm ? am_pm.toLowerCase() : am_pm;

    if (am_pm && ["am", "pm"].indexOf(am_pm_lower) > -1) {
      if (am_pm_lower == 'am' && hours == 12) {
        hours = 0;
      } else if (am_pm_lower == 'pm') {
        hours += 12;
      }
    }

    var time = hours * 60 * 60 * 1000 + minutes * 60 * 1000;
    return time;
  }
  /**
   * @param {Date} value 
   * @param {DTS} settings 
   * @returns {String} date string
   */


  function renderDate(value, settings) {
    var format = settings.dateFormat.toLowerCase();
    var date = value.getDate();
    var month = value.getMonth() + 1;
    var year = value.getFullYear();
    var yearShort = year % 100;
    var formatObj = {
      dd: date < 10 ? "0" + date : date,
      mm: month < 10 ? "0" + month : month,
      yyyy: year,
      yy: yearShort < 10 ? "0" + yearShort : yearShort
    };
    var str = format.replace(settings.dateFormatRegEx, function (found) {
      return formatObj[found];
    });
    return str;
  }
  /**
   * @param {Date} value 
   * @param {DTS} settings 
   * @returns {String} date string
   */


  function renderTime(value, settings) {
    var Format = settings.timeFormat;
    var format = Format.toLowerCase();
    var hours = value.getHours();
    var minutes = value.getMinutes();
    var am_pm = null;
    var hh_am_pm = null;

    if (format.indexOf('a') > -1) {
      am_pm = hours >= 12 ? 'pm' : 'am';
      am_pm = Format.indexOf('A') > -1 ? am_pm.toUpperCase() : am_pm;
      hh_am_pm = hours == 0 ? '12' : hours > 12 ? hours % 12 : hours;
    }

    var formatObj = {
      hh: am_pm ? hh_am_pm : hours < 10 ? "0" + hours : hours,
      mm: minutes < 10 ? "0" + minutes : minutes,
      a: am_pm
    };
    var str = format.replace(settings.timeFormatRegEx, function (found) {
      return formatObj[found];
    });
    return str;
  }
  /**
   * checks if two dates are equal
   * @param {Date} date1 
   * @param {Date} date2 
   * @returns {Boolean} true or false
   */


  function isEqualDate(date1, date2) {
    if (!(date1 && date2)) return false;
    return date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate();
  }
  /**
   * @param {Number} val 
   * @param {Number} pad 
   * @param {*} default_val 
   * @returns {String} padded string
   */


  function padded(val, pad, default_val) {
    var default_val = default_val || 0;
    var valStr = '' + (parseInt(val) || default_val);
    var diff = Math.max(pad, valStr.length) - valStr.length;
    return ('' + default_val).repeat(diff) + valStr;
  }
  /**
   * @template X
   * @template Y
   * @param {X} obj 
   * @param {Y} objDefaults 
   * @returns {X|Y} merged object
   */


  function setDefaults(obj, objDefaults) {
    var keys = Object.keys(objDefaults);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (!Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = objDefaults[key];
      }
    }

    return obj;
  }

  window.dtsel = Object.create({}, {
    DTS: {
      value: DTS
    },
    DTObj: {
      value: DTBox
    },
    fn: {
      value: Object.defineProperties({}, {
        empty: {
          value: empty
        },
        appendAfter: {
          value: function value(newElem, refNode) {
            refNode.parentNode.insertBefore(newElem, refNode.nextSibling);
          }
        },
        getOffset: {
          value: getOffset
        },
        parseDate: {
          value: parseDate
        },
        renderDate: {
          value: renderDate
        },
        parseTime: {
          value: parseTime
        },
        renderTime: {
          value: renderTime
        },
        setDefaults: {
          value: setDefaults
        }
      })
    }
  });
})(); // BG


function _bg() {
  var _bg = document.querySelectorAll("._bg");

  for (var i = 0; i < _bg.length; i++) {
    if (_bg[i].querySelector('img')) {
      _bg[i].style.backgroundImage = 'url(' + _bg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

_bg(); // WebP Check


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
}); // BURGER MENU

document.querySelector('.icon-menu').addEventListener('click', toggleMenu);

function toggleMenu(evt) {
  var offOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var burgerIcon = document.querySelector('.icon-menu');
  var navigation = document.querySelector('.header__body .nav');
  var overlay = document.querySelector('#overlay');

  if (!offOnly) {
    burgerIcon.classList.toggle('_active');
    navigation.classList.toggle('_active');
    overlay.classList.toggle('_active');

    if (burgerIcon.classList.contains('_active')) {// if(window.innerWidth <= 768) {
      //   document.body.style.overflow = "hidden"
      // }
    } else {
      document.body.style.overflow = "visible";
    }
  } else {
    if (burgerIcon.classList.contains('_active')) {
      burgerIcon.classList.remove('_active');
      navigation.classList.remove('_active');
      overlay.classList.remove('_active');

      if (!burgerIcon.classList.contains('_active')) {
        document.body.style.overflow = "visible";
      }
    }
  }
} // For mobile


var mq768 = window.matchMedia("screen and (max-width: 768px)");
var handleTouchStart;
var handleTouchMove;
var shrinkHeader;
var navHandler;

function forMobile(mq) {
  // Detecting swipe
  if (mq.matches) {
    var getTouches = function getTouches(evt) {
      return evt.touches;
    };

    var xDown = null;
    var yDown = null;

    handleTouchStart = function handleTouchStart(evt) {
      var firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    };

    handleTouchMove = function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }

      var xUp = evt.touches[0].clientX;
      var yUp = evt.touches[0].clientY;
      var xDiff = xDown - xUp;
      var yDiff = yDown - yUp;

      if (Math.abs(xDiff) > Math.abs(yDiff) && document.body.style.overflow !== "hidden") {
        if (xDiff < -5) {
          toggleMenu(0, true);
        }
      }

      xDown = null;
      yDown = null;
    };

    document.body.addEventListener('touchstart', handleTouchStart);
    document.body.addEventListener('touchmove', handleTouchMove); // Moving CTA

    var cta = document.querySelector('.header__cta');
    var nav = document.querySelector('.header__nav');
    nav.append(cta); // Opening dropdowns

    var dropdownItems = document.querySelectorAll('.dropdown__item');
    var sublists = document.querySelectorAll('.sublist');

    for (var i = 0; i < sublists.length; i++) {
      var element = sublists[i];
      element.style.height = "0";
    }

    navHandler = function navHandler(evt) {
      if (evt.target.tagName === "SPAN") {
        evt.preventDefault();
        var parentItem = evt.target.closest('.dropdown__item');

        for (var _i6 = 0; _i6 < dropdownItems.length; _i6++) {
          var item = dropdownItems[_i6];

          if (item !== parentItem) {
            item.classList.remove('_active');
            var sublist = item.querySelector('.sublist');
            if (sublist) sublist.style.height = 0;
          }
        }

        parentItem.classList.toggle('_active');

        if (parentItem.classList.contains('_active')) {
          var _sublist = parentItem.querySelector('.sublist');

          _sublist.style.height = _sublist.scrollHeight + 'px';
        } else {
          var _sublist2 = parentItem.querySelector('.sublist');

          if (_sublist2) _sublist2.style.height = 0;
        }
      }
    };

    nav.addEventListener('click', navHandler); // Shrink header

    window.removeEventListener('scroll', shrinkHeader);
    document.querySelector('.main').classList.remove('_shrinked');
  } else {
    document.body.removeEventListener('touchstart', handleTouchStart);
    document.body.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('scroll', shrinkHeader);
    document.body.style.overflow = "visible"; // Shrink header

    shrinkHeader = function shrinkHeader() {
      if (document.documentElement.scrollTop > 650) {
        document.querySelector('.main').classList.add('_shrinked');
      } else {
        document.querySelector('.main').classList.remove('_shrinked');
      }
    };

    window.addEventListener('scroll', shrinkHeader); // Moving CTA

    var _cta = document.querySelector('.header__cta');

    var headerBody = document.querySelector('.header__body');
    headerBody.append(_cta); // Dropdowns

    var _nav = document.querySelector('.header__nav');

    _nav.removeEventListener('click', navHandler);

    var _sublists = document.querySelectorAll('.sublist');

    for (var _i7 = 0; _i7 < _sublists.length; _i7++) {
      var _element3 = _sublists[_i7];
      _element3.style.height = "100%";
    }
  }
}

mq768.addEventListener('change', forMobile);
forMobile(mq768); // Products slider

var products = new Swiper('.products__slider', {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction"
  },
  loop: true,
  autoplay: {
    delay: 3500
  },
  speed: 900,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 20,
    stretch: 50,
    slideshadows: true
  }
});
var testimonials = new Swiper('.testimonials__inner', {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  pagination: {
    el: ".swiper-pagination",
    type: "fraction"
  },
  loop: true,
  autoplay: {
    delay: 3500
  },
  speed: 500,
  spaceBetween: 30,
  slidesPerView: 3,
  breakpoints: {
    320: {
      slidesPerView: 1
    },
    576: {
      slidesPerView: 2
    },
    769: {
      slidesPerView: 3
    }
  }
}); // Modal

+function placeholderDisappear() {
  var form = document.querySelector('.count__form');
  form.addEventListener('input', function (evt) {
    var placeholder = evt.target.nextElementSibling;
    var input = evt.target;

    if (placeholder) {
      if (input.value.length > 0 && placeholder.classList.contains('fake-placeholder')) {
        placeholder.style.display = "none";
      } else {
        placeholder.style.display = "block";
      }
    }
  });
}(); // Form select

var selectItems = Array.prototype.slice.call(document.querySelectorAll('.select'));

if (selectItems.length > 0) {
  var _loop3 = function _loop3(i) {
    var item = selectItems[i];
    var list = item.querySelector('.select__list');
    var current = item.querySelector('.select__displayed span');
    item.addEventListener('click', function (evt) {
      var clickedEl = evt.target;

      if (clickedEl.closest('.select__displayed')) {
        item.classList.toggle('_active');

        if (item.classList.contains('_active')) {
          list.style.height = list.scrollHeight + "px";
        } else {
          list.style.height = 0;
        }
      }

      if (clickedEl.classList.contains('select__item')) {
        if (!clickedEl.closest('.select__item').classList.contains('_checked')) {
          clickedEl.closest('.select__item').classList.add('_checked');
          var checkedElements = item.querySelectorAll('._checked span');
          var str = [];

          for (var index = 0; index < checkedElements.length; index++) {
            var element = checkedElements[index];
            str.push(element.textContent);
          }

          current.textContent = str.join('; ');
        } else {
          clickedEl.closest('.select__item').classList.remove('_checked');

          var _checkedElements = item.querySelectorAll('._checked span');

          var _str = [];

          for (var _index2 = 0; _index2 < _checkedElements.length; _index2++) {
            var _element4 = _checkedElements[_index2];

            _str.push(_element4.textContent);
          }

          if (_str.length > 0) current.textContent = _str.join('; ');else current.textContent = "Оберіть категорію";
        }
      }
    });
  };

  for (var i = 0; i < selectItems.length; i++) {
    _loop3(i);
  }
}

window.addEventListener('click', function (evt) {
  if (!evt.target.closest('.select')) {
    for (var _i8 = 0; _i8 < selectItems.length; _i8++) {
      var item = selectItems[_i8];
      var list = item.querySelector('.select__list');
      item.classList.remove('_active');
      list.style.height = "0";
    }
  }
}); // Scroll animation

AOS.init(); // Date picker

new dtsel.DTS('input[name="date"]', {
  dateFormat: "mm / dd / yyyy"
});
new dtsel.DTS('input[name="time"]', {
  showDate: false,
  showTime: true,
  timeFormat: "HH : MM",
  paddingX: -100
}); // Form validation

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('count__form');
  form.addEventListener('submit', formSend);

  function formSend(evt) {
    evt.preventDefault();
    var error = formValidate(form);

    if (error === 0) {
      evt.target.submit();
    } else {
      form.closest('#count').scrollTo(0, 0);
      return false;
    }
  }

  function formValidate(form) {
    var error = 0;
    var formReq = form.querySelectorAll('._req');

    for (var _i9 = 0; _i9 < formReq.length; _i9++) {
      var item = formReq[_i9];
      formRemoveError(item);

      if (item.classList.contains('_email')) {
        if (emailTest(item)) {
          formAddError(item);
          error++;
        }
      } else if (item.classList.contains('_tel')) {
        if (telTest(item)) {
          formAddError(item);
          error++;
        }
      } else {
        if (item.value === "") {
          formAddError(item);
          error++;
        }
      }
    }

    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }

  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  function telTest(input) {
    return !/^\+[1-9]{1}[0-9]{3,14}$/.test(input.value);
  }
});