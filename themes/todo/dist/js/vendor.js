/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/vendor/modal.js":
/*!********************************!*\
  !*** ./src/js/vendor/modal.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function ($) {
  'use strict'; // MODAL CLASS DEFINITION
  // ======================

  var Modal = function Modal(element, options) {
    this.options = options;
    this.$body = $(document.body);
    this.$element = $(element);
    this.$dialog = this.$element.find('.modal-dialog');
    this.$backdrop = null;
    this.isShown = null;
    this.originalBodyPad = null;
    this.scrollbarWidth = 0;
    this.ignoreBackdropClick = false;

    if (this.options.remote) {
      this.$element.find('.modal-content').load(this.options.remote, $.proxy(function () {
        this.$element.trigger('loaded.bs.modal');
      }, this));
    }
  };

  Modal.VERSION = '3.3.7';
  Modal.TRANSITION_DURATION = 300;
  Modal.BACKDROP_TRANSITION_DURATION = 150;
  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget);
  };

  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event('show.bs.modal', {
      relatedTarget: _relatedTarget
    });
    this.$element.trigger(e);
    if (this.isShown || e.isDefaultPrevented()) return;
    this.isShown = true;
    this.checkScrollbar();
    this.setScrollbar();
    this.$body.addClass('modal-open');
    this.escape();
    this.resize();
    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this));
    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true;
      });
    });
    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade');

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body); // don't move modals dom position
      }

      that.$element.show().scrollTop(0);
      that.adjustDialog();

      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass('in');
      that.enforceFocus();
      var e = $.Event('shown.bs.modal', {
        relatedTarget: _relatedTarget
      });
      transition ? that.$dialog // wait for modal to slide in
      .one('bsTransitionEnd', function () {
        that.$element.trigger('focus').trigger(e);
      }).emulateTransitionEnd(Modal.TRANSITION_DURATION) : that.$element.trigger('focus').trigger(e);
    });
  };

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();
    e = $.Event('hide.bs.modal');
    this.$element.trigger(e);
    if (!this.isShown || e.isDefaultPrevented()) return;
    this.isShown = false;
    this.escape();
    this.resize();
    $(document).off('focusin.bs.modal');
    this.$element.removeClass('in').off('click.dismiss.bs.modal').off('mouseup.dismiss.bs.modal');
    this.$dialog.off('mousedown.dismiss.bs.modal');
    $.support.transition && this.$element.hasClass('fade') ? this.$element.one('bsTransitionEnd', $.proxy(this.hideModal, this)).emulateTransitionEnd(Modal.TRANSITION_DURATION) : this.hideModal();
  };

  Modal.prototype.enforceFocus = function () {
    $(document).off('focusin.bs.modal') // guard against infinite focus loop
    .on('focusin.bs.modal', $.proxy(function (e) {
      if (document !== e.target && this.$element[0] !== e.target && !this.$element.has(e.target).length) {
        this.$element.trigger('focus');
      }
    }, this));
  };

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide();
      }, this));
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal');
    }
  };

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this));
    } else {
      $(window).off('resize.bs.modal');
    }
  };

  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.$body.removeClass('modal-open');
      that.resetAdjustments();
      that.resetScrollbar();
      that.$element.trigger('hidden.bs.modal');
    });
  };

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };

  Modal.prototype.backdrop = function (callback) {
    var that = this;
    var animate = this.$element.hasClass('fade') ? 'fade' : '';

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;
      this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate).appendTo(this.$body);
      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false;
          return;
        }

        if (e.target !== e.currentTarget) return;
        this.options.backdrop == 'static' ? this.$element[0].focus() : this.hide();
      }, this));
      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass('in');
      if (!callback) return;
      doAnimate ? this.$backdrop.one('bsTransitionEnd', callback).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in');

      var callbackRemove = function callbackRemove() {
        that.removeBackdrop();
        callback && callback();
      };

      $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one('bsTransitionEnd', callbackRemove).emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) : callbackRemove();
    } else if (callback) {
      callback();
    }
  }; // these following methods are used to handle overflowing modals


  Modal.prototype.handleUpdate = function () {
    this.adjustDialog();
  };

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight;
    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    });
  };

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    });
  };

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth;

    if (!fullWindowWidth) {
      // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect();
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left);
    }

    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth;
    this.scrollbarWidth = this.measureScrollbar();
  };

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt(this.$body.css('padding-right') || 0, 10);
    this.originalBodyPad = document.body.style.paddingRight || '';
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth);
  };

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad);
  };

  Modal.prototype.measureScrollbar = function () {
    // thx walsh
    var scrollDiv = document.createElement('div');
    scrollDiv.className = 'modal-scrollbar-measure';
    this.$body.append(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    this.$body[0].removeChild(scrollDiv);
    return scrollbarWidth;
  }; // MODAL PLUGIN DEFINITION
  // =======================


  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.modal');
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), _typeof(option) == 'object' && option);
      if (!data) $this.data('bs.modal', data = new Modal(this, options));
      if (typeof option == 'string') data[option](_relatedTarget);else if (options.show) data.show(_relatedTarget);
    });
  }

  var old = $.fn.modal;
  $.fn.modal = Plugin;
  $.fn.modal.Constructor = Modal; // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  }; // MODAL DATA-API
  // ==============


  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this);
    var href = $this.attr('href');
    var $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')); // strip for ie7

    var option = $target.data('bs.modal') ? 'toggle' : $.extend({
      remote: !/#/.test(href) && href
    }, $target.data(), $this.data());
    if ($this.is('a')) e.preventDefault();
    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return; // only register focus restorer if modal will actually get shown

      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus');
      });
    });
    Plugin.call($target, option, this);
  });
}(jQuery);

/***/ }),

/***/ "./src/js/vendor/slick.js":
/*!********************************!*\
  !*** ./src/js/vendor/slick.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */

/* global window, document, define, jQuery, setInterval, clearInterval */
;

(function (factory) {
  'use strict';

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "jquery")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function ($) {
  'use strict';

  var Slick = window.Slick || {};

  Slick = function () {
    var instanceUid = 0;

    function Slick(element, settings) {
      var _ = this,
          dataSettings;

      _.defaults = {
        accessibility: true,
        adaptiveHeight: false,
        appendArrows: $(element),
        appendDots: $(element),
        arrows: true,
        asNavFor: null,
        prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
        nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
        autoplay: false,
        autoplaySpeed: 3000,
        centerMode: false,
        centerPadding: '50px',
        cssEase: 'ease',
        customPaging: function customPaging(slider, i) {
          return $('<button type="button" />').text(i + 1);
        },
        dots: false,
        dotsClass: 'slick-dots',
        draggable: true,
        easing: 'linear',
        edgeFriction: 0.35,
        fade: false,
        focusOnSelect: false,
        focusOnChange: false,
        infinite: true,
        initialSlide: 0,
        lazyLoad: 'ondemand',
        mobileFirst: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        pauseOnDotsHover: false,
        respondTo: 'window',
        responsive: null,
        rows: 1,
        rtl: false,
        slide: '',
        slidesPerRow: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 500,
        swipe: true,
        swipeToSlide: false,
        touchMove: true,
        touchThreshold: 5,
        useCSS: true,
        useTransform: true,
        variableWidth: false,
        vertical: false,
        verticalSwiping: false,
        waitForAnimate: true,
        zIndex: 1000
      };
      _.initials = {
        animating: false,
        dragging: false,
        autoPlayTimer: null,
        currentDirection: 0,
        currentLeft: null,
        currentSlide: 0,
        direction: 1,
        $dots: null,
        listWidth: null,
        listHeight: null,
        loadIndex: 0,
        $nextArrow: null,
        $prevArrow: null,
        scrolling: false,
        slideCount: null,
        slideWidth: null,
        $slideTrack: null,
        $slides: null,
        sliding: false,
        slideOffset: 0,
        swipeLeft: null,
        swiping: false,
        $list: null,
        touchObject: {},
        transformsEnabled: false,
        unslicked: false
      };
      $.extend(_, _.initials);
      _.activeBreakpoint = null;
      _.animType = null;
      _.animProp = null;
      _.breakpoints = [];
      _.breakpointSettings = [];
      _.cssTransitions = false;
      _.focussed = false;
      _.interrupted = false;
      _.hidden = 'hidden';
      _.paused = true;
      _.positionProp = null;
      _.respondTo = null;
      _.rowCount = 1;
      _.shouldClick = true;
      _.$slider = $(element);
      _.$slidesCache = null;
      _.transformType = null;
      _.transitionType = null;
      _.visibilityChange = 'visibilitychange';
      _.windowWidth = 0;
      _.windowTimer = null;
      dataSettings = $(element).data('slick') || {};
      _.options = $.extend({}, _.defaults, settings, dataSettings);
      _.currentSlide = _.options.initialSlide;
      _.originalSettings = _.options;

      if (typeof document.mozHidden !== 'undefined') {
        _.hidden = 'mozHidden';
        _.visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        _.hidden = 'webkitHidden';
        _.visibilityChange = 'webkitvisibilitychange';
      }

      _.autoPlay = $.proxy(_.autoPlay, _);
      _.autoPlayClear = $.proxy(_.autoPlayClear, _);
      _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
      _.changeSlide = $.proxy(_.changeSlide, _);
      _.clickHandler = $.proxy(_.clickHandler, _);
      _.selectHandler = $.proxy(_.selectHandler, _);
      _.setPosition = $.proxy(_.setPosition, _);
      _.swipeHandler = $.proxy(_.swipeHandler, _);
      _.dragHandler = $.proxy(_.dragHandler, _);
      _.keyHandler = $.proxy(_.keyHandler, _);
      _.instanceUid = instanceUid++; // A simple way to check for HTML strings
      // Strict HTML recognition (must start with <)
      // Extracted from jQuery v1.11 source

      _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;

      _.registerBreakpoints();

      _.init(true);
    }

    return Slick;
  }();

  Slick.prototype.activateADA = function () {
    var _ = this;

    _.$slideTrack.find('.slick-active').attr({
      'aria-hidden': 'false'
    }).find('a, input, button, select').attr({
      'tabindex': '0'
    });
  };

  Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
    var _ = this;

    if (typeof index === 'boolean') {
      addBefore = index;
      index = null;
    } else if (index < 0 || index >= _.slideCount) {
      return false;
    }

    _.unload();

    if (typeof index === 'number') {
      if (index === 0 && _.$slides.length === 0) {
        $(markup).appendTo(_.$slideTrack);
      } else if (addBefore) {
        $(markup).insertBefore(_.$slides.eq(index));
      } else {
        $(markup).insertAfter(_.$slides.eq(index));
      }
    } else {
      if (addBefore === true) {
        $(markup).prependTo(_.$slideTrack);
      } else {
        $(markup).appendTo(_.$slideTrack);
      }
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index);
    });

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.animateHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.animate({
        height: targetHeight
      }, _.options.speed);
    }
  };

  Slick.prototype.animateSlide = function (targetLeft, callback) {
    var animProps = {},
        _ = this;

    _.animateHeight();

    if (_.options.rtl === true && _.options.vertical === false) {
      targetLeft = -targetLeft;
    }

    if (_.transformsEnabled === false) {
      if (_.options.vertical === false) {
        _.$slideTrack.animate({
          left: targetLeft
        }, _.options.speed, _.options.easing, callback);
      } else {
        _.$slideTrack.animate({
          top: targetLeft
        }, _.options.speed, _.options.easing, callback);
      }
    } else {
      if (_.cssTransitions === false) {
        if (_.options.rtl === true) {
          _.currentLeft = -_.currentLeft;
        }

        $({
          animStart: _.currentLeft
        }).animate({
          animStart: targetLeft
        }, {
          duration: _.options.speed,
          easing: _.options.easing,
          step: function step(now) {
            now = Math.ceil(now);

            if (_.options.vertical === false) {
              animProps[_.animType] = 'translate(' + now + 'px, 0px)';

              _.$slideTrack.css(animProps);
            } else {
              animProps[_.animType] = 'translate(0px,' + now + 'px)';

              _.$slideTrack.css(animProps);
            }
          },
          complete: function complete() {
            if (callback) {
              callback.call();
            }
          }
        });
      } else {
        _.applyTransition();

        targetLeft = Math.ceil(targetLeft);

        if (_.options.vertical === false) {
          animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
        } else {
          animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
        }

        _.$slideTrack.css(animProps);

        if (callback) {
          setTimeout(function () {
            _.disableTransition();

            callback.call();
          }, _.options.speed);
        }
      }
    }
  };

  Slick.prototype.getNavTarget = function () {
    var _ = this,
        asNavFor = _.options.asNavFor;

    if (asNavFor && asNavFor !== null) {
      asNavFor = $(asNavFor).not(_.$slider);
    }

    return asNavFor;
  };

  Slick.prototype.asNavFor = function (index) {
    var _ = this,
        asNavFor = _.getNavTarget();

    if (asNavFor !== null && _typeof(asNavFor) === 'object') {
      asNavFor.each(function () {
        var target = $(this).slick('getSlick');

        if (!target.unslicked) {
          target.slideHandler(index, true);
        }
      });
    }
  };

  Slick.prototype.applyTransition = function (slide) {
    var _ = this,
        transition = {};

    if (_.options.fade === false) {
      transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
    } else {
      transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
    }

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.autoPlay = function () {
    var _ = this;

    _.autoPlayClear();

    if (_.slideCount > _.options.slidesToShow) {
      _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed);
    }
  };

  Slick.prototype.autoPlayClear = function () {
    var _ = this;

    if (_.autoPlayTimer) {
      clearInterval(_.autoPlayTimer);
    }
  };

  Slick.prototype.autoPlayIterator = function () {
    var _ = this,
        slideTo = _.currentSlide + _.options.slidesToScroll;

    if (!_.paused && !_.interrupted && !_.focussed) {
      if (_.options.infinite === false) {
        if (_.direction === 1 && _.currentSlide + 1 === _.slideCount - 1) {
          _.direction = 0;
        } else if (_.direction === 0) {
          slideTo = _.currentSlide - _.options.slidesToScroll;

          if (_.currentSlide - 1 === 0) {
            _.direction = 1;
          }
        }
      }

      _.slideHandler(slideTo);
    }
  };

  Slick.prototype.buildArrows = function () {
    var _ = this;

    if (_.options.arrows === true) {
      _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
      _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

      if (_.slideCount > _.options.slidesToShow) {
        _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

        if (_.htmlExpr.test(_.options.prevArrow)) {
          _.$prevArrow.prependTo(_.options.appendArrows);
        }

        if (_.htmlExpr.test(_.options.nextArrow)) {
          _.$nextArrow.appendTo(_.options.appendArrows);
        }

        if (_.options.infinite !== true) {
          _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
        }
      } else {
        _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
          'aria-disabled': 'true',
          'tabindex': '-1'
        });
      }
    }
  };

  Slick.prototype.buildDots = function () {
    var _ = this,
        i,
        dot;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$slider.addClass('slick-dotted');

      dot = $('<ul />').addClass(_.options.dotsClass);

      for (i = 0; i <= _.getDotCount(); i += 1) {
        dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
      }

      _.$dots = dot.appendTo(_.options.appendDots);

      _.$dots.find('li').first().addClass('slick-active');
    }
  };

  Slick.prototype.buildOut = function () {
    var _ = this;

    _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');
    _.slideCount = _.$slides.length;

    _.$slides.each(function (index, element) {
      $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '');
    });

    _.$slider.addClass('slick-slider');

    _.$slideTrack = _.slideCount === 0 ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
    _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent();

    _.$slideTrack.css('opacity', 0);

    if (_.options.centerMode === true || _.options.swipeToSlide === true) {
      _.options.slidesToScroll = 1;
    }

    $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

    _.setupInfinite();

    _.buildArrows();

    _.buildDots();

    _.updateDots();

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    if (_.options.draggable === true) {
      _.$list.addClass('draggable');
    }
  };

  Slick.prototype.buildRows = function () {
    var _ = this,
        a,
        b,
        c,
        newSlides,
        numOfSlides,
        originalSlides,
        slidesPerSection;

    newSlides = document.createDocumentFragment();
    originalSlides = _.$slider.children();

    if (_.options.rows > 0) {
      slidesPerSection = _.options.slidesPerRow * _.options.rows;
      numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);

      for (a = 0; a < numOfSlides; a++) {
        var slide = document.createElement('div');

        for (b = 0; b < _.options.rows; b++) {
          var row = document.createElement('div');

          for (c = 0; c < _.options.slidesPerRow; c++) {
            var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);

            if (originalSlides.get(target)) {
              row.appendChild(originalSlides.get(target));
            }
          }

          slide.appendChild(row);
        }

        newSlides.appendChild(slide);
      }

      _.$slider.empty().append(newSlides);

      _.$slider.children().children().children().css({
        'width': 100 / _.options.slidesPerRow + '%',
        'display': 'inline-block'
      });
    }
  };

  Slick.prototype.checkResponsive = function (initial, forceUpdate) {
    var _ = this,
        breakpoint,
        targetBreakpoint,
        respondToWidth,
        triggerBreakpoint = false;

    var sliderWidth = _.$slider.width();

    var windowWidth = window.innerWidth || $(window).width();

    if (_.respondTo === 'window') {
      respondToWidth = windowWidth;
    } else if (_.respondTo === 'slider') {
      respondToWidth = sliderWidth;
    } else if (_.respondTo === 'min') {
      respondToWidth = Math.min(windowWidth, sliderWidth);
    }

    if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
      targetBreakpoint = null;

      for (breakpoint in _.breakpoints) {
        if (_.breakpoints.hasOwnProperty(breakpoint)) {
          if (_.originalSettings.mobileFirst === false) {
            if (respondToWidth < _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          } else {
            if (respondToWidth > _.breakpoints[breakpoint]) {
              targetBreakpoint = _.breakpoints[breakpoint];
            }
          }
        }
      }

      if (targetBreakpoint !== null) {
        if (_.activeBreakpoint !== null) {
          if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
            _.activeBreakpoint = targetBreakpoint;

            if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
              _.unslick(targetBreakpoint);
            } else {
              _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

              if (initial === true) {
                _.currentSlide = _.options.initialSlide;
              }

              _.refresh(initial);
            }

            triggerBreakpoint = targetBreakpoint;
          }
        } else {
          _.activeBreakpoint = targetBreakpoint;

          if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
            _.unslick(targetBreakpoint);
          } else {
            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);

            if (initial === true) {
              _.currentSlide = _.options.initialSlide;
            }

            _.refresh(initial);
          }

          triggerBreakpoint = targetBreakpoint;
        }
      } else {
        if (_.activeBreakpoint !== null) {
          _.activeBreakpoint = null;
          _.options = _.originalSettings;

          if (initial === true) {
            _.currentSlide = _.options.initialSlide;
          }

          _.refresh(initial);

          triggerBreakpoint = targetBreakpoint;
        }
      } // only trigger breakpoints during an actual break. not on initialize.


      if (!initial && triggerBreakpoint !== false) {
        _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
      }
    }
  };

  Slick.prototype.changeSlide = function (event, dontAnimate) {
    var _ = this,
        $target = $(event.currentTarget),
        indexOffset,
        slideOffset,
        unevenOffset; // If target is a link, prevent default action.


    if ($target.is('a')) {
      event.preventDefault();
    } // If target is not the <li> element (ie: a child), find the <li>.


    if (!$target.is('li')) {
      $target = $target.closest('li');
    }

    unevenOffset = _.slideCount % _.options.slidesToScroll !== 0;
    indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

    switch (event.data.message) {
      case 'previous':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
        }

        break;

      case 'next':
        slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;

        if (_.slideCount > _.options.slidesToShow) {
          _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
        }

        break;

      case 'index':
        var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;

        _.slideHandler(_.checkNavigable(index), false, dontAnimate);

        $target.children().trigger('focus');
        break;

      default:
        return;
    }
  };

  Slick.prototype.checkNavigable = function (index) {
    var _ = this,
        navigables,
        prevNavigable;

    navigables = _.getNavigableIndexes();
    prevNavigable = 0;

    if (index > navigables[navigables.length - 1]) {
      index = navigables[navigables.length - 1];
    } else {
      for (var n in navigables) {
        if (index < navigables[n]) {
          index = prevNavigable;
          break;
        }

        prevNavigable = navigables[n];
      }
    }

    return index;
  };

  Slick.prototype.cleanUpEvents = function () {
    var _ = this;

    if (_.options.dots && _.$dots !== null) {
      $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, true)).off('mouseleave.slick', $.proxy(_.interrupt, _, false));

      if (_.options.accessibility === true) {
        _.$dots.off('keydown.slick', _.keyHandler);
      }
    }

    _.$slider.off('focus.slick blur.slick');

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
      _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
        _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
      }
    }

    _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);

    _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);

    _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);

    _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

    _.$list.off('click.slick', _.clickHandler);

    $(document).off(_.visibilityChange, _.visibility);

    _.cleanUpSlideEvents();

    if (_.options.accessibility === true) {
      _.$list.off('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().off('click.slick', _.selectHandler);
    }

    $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
    $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
    $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
    $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
  };

  Slick.prototype.cleanUpSlideEvents = function () {
    var _ = this;

    _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));

    _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));
  };

  Slick.prototype.cleanUpRows = function () {
    var _ = this,
        originalSlides;

    if (_.options.rows > 0) {
      originalSlides = _.$slides.children().children();
      originalSlides.removeAttr('style');

      _.$slider.empty().append(originalSlides);
    }
  };

  Slick.prototype.clickHandler = function (event) {
    var _ = this;

    if (_.shouldClick === false) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
    }
  };

  Slick.prototype.destroy = function (refresh) {
    var _ = this;

    _.autoPlayClear();

    _.touchObject = {};

    _.cleanUpEvents();

    $('.slick-cloned', _.$slider).detach();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.$prevArrow.length) {
      _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.prevArrow)) {
        _.$prevArrow.remove();
      }
    }

    if (_.$nextArrow && _.$nextArrow.length) {
      _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');

      if (_.htmlExpr.test(_.options.nextArrow)) {
        _.$nextArrow.remove();
      }
    }

    if (_.$slides) {
      _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
        $(this).attr('style', $(this).data('originalStyling'));
      });

      _.$slideTrack.children(this.options.slide).detach();

      _.$slideTrack.detach();

      _.$list.detach();

      _.$slider.append(_.$slides);
    }

    _.cleanUpRows();

    _.$slider.removeClass('slick-slider');

    _.$slider.removeClass('slick-initialized');

    _.$slider.removeClass('slick-dotted');

    _.unslicked = true;

    if (!refresh) {
      _.$slider.trigger('destroy', [_]);
    }
  };

  Slick.prototype.disableTransition = function (slide) {
    var _ = this,
        transition = {};

    transition[_.transitionType] = '';

    if (_.options.fade === false) {
      _.$slideTrack.css(transition);
    } else {
      _.$slides.eq(slide).css(transition);
    }
  };

  Slick.prototype.fadeSlide = function (slideIndex, callback) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).css({
        zIndex: _.options.zIndex
      });

      _.$slides.eq(slideIndex).animate({
        opacity: 1
      }, _.options.speed, _.options.easing, callback);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 1,
        zIndex: _.options.zIndex
      });

      if (callback) {
        setTimeout(function () {
          _.disableTransition(slideIndex);

          callback.call();
        }, _.options.speed);
      }
    }
  };

  Slick.prototype.fadeSlideOut = function (slideIndex) {
    var _ = this;

    if (_.cssTransitions === false) {
      _.$slides.eq(slideIndex).animate({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      }, _.options.speed, _.options.easing);
    } else {
      _.applyTransition(slideIndex);

      _.$slides.eq(slideIndex).css({
        opacity: 0,
        zIndex: _.options.zIndex - 2
      });
    }
  };

  Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
    var _ = this;

    if (filter !== null) {
      _.$slidesCache = _.$slides;

      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.focusHandler = function () {
    var _ = this;

    _.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*', function (event) {
      event.stopImmediatePropagation();
      var $sf = $(this);
      setTimeout(function () {
        if (_.options.pauseOnFocus) {
          _.focussed = $sf.is(':focus');

          _.autoPlay();
        }
      }, 0);
    });
  };

  Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
    var _ = this;

    return _.currentSlide;
  };

  Slick.prototype.getDotCount = function () {
    var _ = this;

    var breakPoint = 0;
    var counter = 0;
    var pagerQty = 0;

    if (_.options.infinite === true) {
      if (_.slideCount <= _.options.slidesToShow) {
        ++pagerQty;
      } else {
        while (breakPoint < _.slideCount) {
          ++pagerQty;
          breakPoint = counter + _.options.slidesToScroll;
          counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
      }
    } else if (_.options.centerMode === true) {
      pagerQty = _.slideCount;
    } else if (!_.options.asNavFor) {
      pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
    } else {
      while (breakPoint < _.slideCount) {
        ++pagerQty;
        breakPoint = counter + _.options.slidesToScroll;
        counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
      }
    }

    return pagerQty - 1;
  };

  Slick.prototype.getLeft = function (slideIndex) {
    var _ = this,
        targetLeft,
        verticalHeight,
        verticalOffset = 0,
        targetSlide,
        coef;

    _.slideOffset = 0;
    verticalHeight = _.$slides.first().outerHeight(true);

    if (_.options.infinite === true) {
      if (_.slideCount > _.options.slidesToShow) {
        _.slideOffset = _.slideWidth * _.options.slidesToShow * -1;
        coef = -1;

        if (_.options.vertical === true && _.options.centerMode === true) {
          if (_.options.slidesToShow === 2) {
            coef = -1.5;
          } else if (_.options.slidesToShow === 1) {
            coef = -2;
          }
        }

        verticalOffset = verticalHeight * _.options.slidesToShow * coef;
      }

      if (_.slideCount % _.options.slidesToScroll !== 0) {
        if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
          if (slideIndex > _.slideCount) {
            _.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1;
            verticalOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1;
          } else {
            _.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1;
            verticalOffset = _.slideCount % _.options.slidesToScroll * verticalHeight * -1;
          }
        }
      }
    } else {
      if (slideIndex + _.options.slidesToShow > _.slideCount) {
        _.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth;
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight;
      }
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideOffset = 0;
      verticalOffset = 0;
    }

    if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
      _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2;
    } else if (_.options.centerMode === true && _.options.infinite === true) {
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
    } else if (_.options.centerMode === true) {
      _.slideOffset = 0;
      _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
    }

    if (_.options.vertical === false) {
      targetLeft = slideIndex * _.slideWidth * -1 + _.slideOffset;
    } else {
      targetLeft = slideIndex * verticalHeight * -1 + verticalOffset;
    }

    if (_.options.variableWidth === true) {
      if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
      } else {
        targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
      }

      if (_.options.rtl === true) {
        if (targetSlide[0]) {
          targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
        } else {
          targetLeft = 0;
        }
      } else {
        targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
      }

      if (_.options.centerMode === true) {
        if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
        } else {
          targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
        }

        if (_.options.rtl === true) {
          if (targetSlide[0]) {
            targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
          } else {
            targetLeft = 0;
          }
        } else {
          targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
        }

        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
      }
    }

    return targetLeft;
  };

  Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
    var _ = this;

    return _.options[option];
  };

  Slick.prototype.getNavigableIndexes = function () {
    var _ = this,
        breakPoint = 0,
        counter = 0,
        indexes = [],
        max;

    if (_.options.infinite === false) {
      max = _.slideCount;
    } else {
      breakPoint = _.options.slidesToScroll * -1;
      counter = _.options.slidesToScroll * -1;
      max = _.slideCount * 2;
    }

    while (breakPoint < max) {
      indexes.push(breakPoint);
      breakPoint = counter + _.options.slidesToScroll;
      counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
    }

    return indexes;
  };

  Slick.prototype.getSlick = function () {
    return this;
  };

  Slick.prototype.getSlideCount = function () {
    var _ = this,
        slidesTraversed,
        swipedSlide,
        centerOffset;

    centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

    if (_.options.swipeToSlide === true) {
      _.$slideTrack.find('.slick-slide').each(function (index, slide) {
        if (slide.offsetLeft - centerOffset + $(slide).outerWidth() / 2 > _.swipeLeft * -1) {
          swipedSlide = slide;
          return false;
        }
      });

      slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
      return slidesTraversed;
    } else {
      return _.options.slidesToScroll;
    }
  };

  Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'index',
        index: parseInt(slide)
      }
    }, dontAnimate);
  };

  Slick.prototype.init = function (creation) {
    var _ = this;

    if (!$(_.$slider).hasClass('slick-initialized')) {
      $(_.$slider).addClass('slick-initialized');

      _.buildRows();

      _.buildOut();

      _.setProps();

      _.startLoad();

      _.loadSlider();

      _.initializeEvents();

      _.updateArrows();

      _.updateDots();

      _.checkResponsive(true);

      _.focusHandler();
    }

    if (creation) {
      _.$slider.trigger('init', [_]);
    }

    if (_.options.accessibility === true) {
      _.initADA();
    }

    if (_.options.autoplay) {
      _.paused = false;

      _.autoPlay();
    }
  };

  Slick.prototype.initADA = function () {
    var _ = this,
        numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
        tabControlIndexes = _.getNavigableIndexes().filter(function (val) {
      return val >= 0 && val < _.slideCount;
    });

    _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
      'aria-hidden': 'true',
      'tabindex': '-1'
    }).find('a, input, button, select').attr({
      'tabindex': '-1'
    });

    if (_.$dots !== null) {
      _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
        var slideControlIndex = tabControlIndexes.indexOf(i);
        $(this).attr({
          'role': 'tabpanel',
          'id': 'slick-slide' + _.instanceUid + i,
          'tabindex': -1
        });

        if (slideControlIndex !== -1) {
          var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex;

          if ($('#' + ariaButtonControl).length) {
            $(this).attr({
              'aria-describedby': ariaButtonControl
            });
          }
        }
      });

      _.$dots.attr('role', 'tablist').find('li').each(function (i) {
        var mappedSlideIndex = tabControlIndexes[i];
        $(this).attr({
          'role': 'presentation'
        });
        $(this).find('button').first().attr({
          'role': 'tab',
          'id': 'slick-slide-control' + _.instanceUid + i,
          'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
          'aria-label': i + 1 + ' of ' + numDotGroups,
          'aria-selected': null,
          'tabindex': '-1'
        });
      }).eq(_.currentSlide).find('button').attr({
        'aria-selected': 'true',
        'tabindex': '0'
      }).end();
    }

    for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) {
      if (_.options.focusOnChange) {
        _.$slides.eq(i).attr({
          'tabindex': '0'
        });
      } else {
        _.$slides.eq(i).removeAttr('tabindex');
      }
    }

    _.activateADA();
  };

  Slick.prototype.initArrowEvents = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.off('click.slick').on('click.slick', {
        message: 'previous'
      }, _.changeSlide);

      _.$nextArrow.off('click.slick').on('click.slick', {
        message: 'next'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$prevArrow.on('keydown.slick', _.keyHandler);

        _.$nextArrow.on('keydown.slick', _.keyHandler);
      }
    }
  };

  Slick.prototype.initDotEvents = function () {
    var _ = this;

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('click.slick', {
        message: 'index'
      }, _.changeSlide);

      if (_.options.accessibility === true) {
        _.$dots.on('keydown.slick', _.keyHandler);
      }
    }

    if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {
      $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, true)).on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initSlideEvents = function () {
    var _ = this;

    if (_.options.pauseOnHover) {
      _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));

      _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));
    }
  };

  Slick.prototype.initializeEvents = function () {
    var _ = this;

    _.initArrowEvents();

    _.initDotEvents();

    _.initSlideEvents();

    _.$list.on('touchstart.slick mousedown.slick', {
      action: 'start'
    }, _.swipeHandler);

    _.$list.on('touchmove.slick mousemove.slick', {
      action: 'move'
    }, _.swipeHandler);

    _.$list.on('touchend.slick mouseup.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('touchcancel.slick mouseleave.slick', {
      action: 'end'
    }, _.swipeHandler);

    _.$list.on('click.slick', _.clickHandler);

    $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

    if (_.options.accessibility === true) {
      _.$list.on('keydown.slick', _.keyHandler);
    }

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
    $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
    $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
    $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
    $(_.setPosition);
  };

  Slick.prototype.initUI = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.show();

      _.$nextArrow.show();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.show();
    }
  };

  Slick.prototype.keyHandler = function (event) {
    var _ = this; //Dont slide if the cursor is inside the form fields and arrow keys are pressed


    if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
      if (event.keyCode === 37 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'next' : 'previous'
          }
        });
      } else if (event.keyCode === 39 && _.options.accessibility === true) {
        _.changeSlide({
          data: {
            message: _.options.rtl === true ? 'previous' : 'next'
          }
        });
      }
    }
  };

  Slick.prototype.lazyLoad = function () {
    var _ = this,
        loadRange,
        cloneRange,
        rangeStart,
        rangeEnd;

    function loadImages(imagesScope) {
      $('img[data-lazy]', imagesScope).each(function () {
        var image = $(this),
            imageSource = $(this).attr('data-lazy'),
            imageSrcSet = $(this).attr('data-srcset'),
            imageSizes = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
            imageToLoad = document.createElement('img');

        imageToLoad.onload = function () {
          image.animate({
            opacity: 0
          }, 100, function () {
            if (imageSrcSet) {
              image.attr('srcset', imageSrcSet);

              if (imageSizes) {
                image.attr('sizes', imageSizes);
              }
            }

            image.attr('src', imageSource).animate({
              opacity: 1
            }, 200, function () {
              image.removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');
            });

            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
          });
        };

        imageToLoad.onerror = function () {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
        };

        imageToLoad.src = imageSource;
      });
    }

    if (_.options.centerMode === true) {
      if (_.options.infinite === true) {
        rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
        rangeEnd = rangeStart + _.options.slidesToShow + 2;
      } else {
        rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
        rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
      }
    } else {
      rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
      rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);

      if (_.options.fade === true) {
        if (rangeStart > 0) rangeStart--;
        if (rangeEnd <= _.slideCount) rangeEnd++;
      }
    }

    loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

    if (_.options.lazyLoad === 'anticipated') {
      var prevSlide = rangeStart - 1,
          nextSlide = rangeEnd,
          $slides = _.$slider.find('.slick-slide');

      for (var i = 0; i < _.options.slidesToScroll; i++) {
        if (prevSlide < 0) prevSlide = _.slideCount - 1;
        loadRange = loadRange.add($slides.eq(prevSlide));
        loadRange = loadRange.add($slides.eq(nextSlide));
        prevSlide--;
        nextSlide++;
      }
    }

    loadImages(loadRange);

    if (_.slideCount <= _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-slide');
      loadImages(cloneRange);
    } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
      cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
      loadImages(cloneRange);
    } else if (_.currentSlide === 0) {
      cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
      loadImages(cloneRange);
    }
  };

  Slick.prototype.loadSlider = function () {
    var _ = this;

    _.setPosition();

    _.$slideTrack.css({
      opacity: 1
    });

    _.$slider.removeClass('slick-loading');

    _.initUI();

    if (_.options.lazyLoad === 'progressive') {
      _.progressiveLazyLoad();
    }
  };

  Slick.prototype.next = Slick.prototype.slickNext = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'next'
      }
    });
  };

  Slick.prototype.orientationChange = function () {
    var _ = this;

    _.checkResponsive();

    _.setPosition();
  };

  Slick.prototype.pause = Slick.prototype.slickPause = function () {
    var _ = this;

    _.autoPlayClear();

    _.paused = true;
  };

  Slick.prototype.play = Slick.prototype.slickPlay = function () {
    var _ = this;

    _.autoPlay();

    _.options.autoplay = true;
    _.paused = false;
    _.focussed = false;
    _.interrupted = false;
  };

  Slick.prototype.postSlide = function (index) {
    var _ = this;

    if (!_.unslicked) {
      _.$slider.trigger('afterChange', [_, index]);

      _.animating = false;

      if (_.slideCount > _.options.slidesToShow) {
        _.setPosition();
      }

      _.swipeLeft = null;

      if (_.options.autoplay) {
        _.autoPlay();
      }

      if (_.options.accessibility === true) {
        _.initADA();

        if (_.options.focusOnChange) {
          var $currentSlide = $(_.$slides.get(_.currentSlide));
          $currentSlide.attr('tabindex', 0).focus();
        }
      }
    }
  };

  Slick.prototype.prev = Slick.prototype.slickPrev = function () {
    var _ = this;

    _.changeSlide({
      data: {
        message: 'previous'
      }
    });
  };

  Slick.prototype.preventDefault = function (event) {
    event.preventDefault();
  };

  Slick.prototype.progressiveLazyLoad = function (tryCount) {
    tryCount = tryCount || 1;

    var _ = this,
        $imgsToLoad = $('img[data-lazy]', _.$slider),
        image,
        imageSource,
        imageSrcSet,
        imageSizes,
        imageToLoad;

    if ($imgsToLoad.length) {
      image = $imgsToLoad.first();
      imageSource = image.attr('data-lazy');
      imageSrcSet = image.attr('data-srcset');
      imageSizes = image.attr('data-sizes') || _.$slider.attr('data-sizes');
      imageToLoad = document.createElement('img');

      imageToLoad.onload = function () {
        if (imageSrcSet) {
          image.attr('srcset', imageSrcSet);

          if (imageSizes) {
            image.attr('sizes', imageSizes);
          }
        }

        image.attr('src', imageSource).removeAttr('data-lazy data-srcset data-sizes').removeClass('slick-loading');

        if (_.options.adaptiveHeight === true) {
          _.setPosition();
        }

        _.$slider.trigger('lazyLoaded', [_, image, imageSource]);

        _.progressiveLazyLoad();
      };

      imageToLoad.onerror = function () {
        if (tryCount < 3) {
          /**
           * try to load the image 3 times,
           * leave a slight delay so we don't get
           * servers blocking the request.
           */
          setTimeout(function () {
            _.progressiveLazyLoad(tryCount + 1);
          }, 500);
        } else {
          image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');

          _.$slider.trigger('lazyLoadError', [_, image, imageSource]);

          _.progressiveLazyLoad();
        }
      };

      imageToLoad.src = imageSource;
    } else {
      _.$slider.trigger('allImagesLoaded', [_]);
    }
  };

  Slick.prototype.refresh = function (initializing) {
    var _ = this,
        currentSlide,
        lastVisibleIndex;

    lastVisibleIndex = _.slideCount - _.options.slidesToShow; // in non-infinite sliders, we don't want to go past the
    // last visible index.

    if (!_.options.infinite && _.currentSlide > lastVisibleIndex) {
      _.currentSlide = lastVisibleIndex;
    } // if less slides than to show, go to start.


    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    currentSlide = _.currentSlide;

    _.destroy(true);

    $.extend(_, _.initials, {
      currentSlide: currentSlide
    });

    _.init();

    if (!initializing) {
      _.changeSlide({
        data: {
          message: 'index',
          index: currentSlide
        }
      }, false);
    }
  };

  Slick.prototype.registerBreakpoints = function () {
    var _ = this,
        breakpoint,
        currentBreakpoint,
        l,
        responsiveSettings = _.options.responsive || null;

    if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
      _.respondTo = _.options.respondTo || 'window';

      for (breakpoint in responsiveSettings) {
        l = _.breakpoints.length - 1;

        if (responsiveSettings.hasOwnProperty(breakpoint)) {
          currentBreakpoint = responsiveSettings[breakpoint].breakpoint; // loop through the breakpoints and cut out any existing
          // ones with the same breakpoint number, we don't want dupes.

          while (l >= 0) {
            if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
              _.breakpoints.splice(l, 1);
            }

            l--;
          }

          _.breakpoints.push(currentBreakpoint);

          _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
        }
      }

      _.breakpoints.sort(function (a, b) {
        return _.options.mobileFirst ? a - b : b - a;
      });
    }
  };

  Slick.prototype.reinit = function () {
    var _ = this;

    _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');
    _.slideCount = _.$slides.length;

    if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
      _.currentSlide = _.currentSlide - _.options.slidesToScroll;
    }

    if (_.slideCount <= _.options.slidesToShow) {
      _.currentSlide = 0;
    }

    _.registerBreakpoints();

    _.setProps();

    _.setupInfinite();

    _.buildArrows();

    _.updateArrows();

    _.initArrowEvents();

    _.buildDots();

    _.updateDots();

    _.initDotEvents();

    _.cleanUpSlideEvents();

    _.initSlideEvents();

    _.checkResponsive(false, true);

    if (_.options.focusOnSelect === true) {
      $(_.$slideTrack).children().on('click.slick', _.selectHandler);
    }

    _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

    _.setPosition();

    _.focusHandler();

    _.paused = !_.options.autoplay;

    _.autoPlay();

    _.$slider.trigger('reInit', [_]);
  };

  Slick.prototype.resize = function () {
    var _ = this;

    if ($(window).width() !== _.windowWidth) {
      clearTimeout(_.windowDelay);
      _.windowDelay = window.setTimeout(function () {
        _.windowWidth = $(window).width();

        _.checkResponsive();

        if (!_.unslicked) {
          _.setPosition();
        }
      }, 50);
    }
  };

  Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
    var _ = this;

    if (typeof index === 'boolean') {
      removeBefore = index;
      index = removeBefore === true ? 0 : _.slideCount - 1;
    } else {
      index = removeBefore === true ? --index : index;
    }

    if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
      return false;
    }

    _.unload();

    if (removeAll === true) {
      _.$slideTrack.children().remove();
    } else {
      _.$slideTrack.children(this.options.slide).eq(index).remove();
    }

    _.$slides = _.$slideTrack.children(this.options.slide);

    _.$slideTrack.children(this.options.slide).detach();

    _.$slideTrack.append(_.$slides);

    _.$slidesCache = _.$slides;

    _.reinit();
  };

  Slick.prototype.setCSS = function (position) {
    var _ = this,
        positionProps = {},
        x,
        y;

    if (_.options.rtl === true) {
      position = -position;
    }

    x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
    y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
    positionProps[_.positionProp] = position;

    if (_.transformsEnabled === false) {
      _.$slideTrack.css(positionProps);
    } else {
      positionProps = {};

      if (_.cssTransitions === false) {
        positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';

        _.$slideTrack.css(positionProps);
      } else {
        positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';

        _.$slideTrack.css(positionProps);
      }
    }
  };

  Slick.prototype.setDimensions = function () {
    var _ = this;

    if (_.options.vertical === false) {
      if (_.options.centerMode === true) {
        _.$list.css({
          padding: '0px ' + _.options.centerPadding
        });
      }
    } else {
      _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);

      if (_.options.centerMode === true) {
        _.$list.css({
          padding: _.options.centerPadding + ' 0px'
        });
      }
    }

    _.listWidth = _.$list.width();
    _.listHeight = _.$list.height();

    if (_.options.vertical === false && _.options.variableWidth === false) {
      _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);

      _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children('.slick-slide').length));
    } else if (_.options.variableWidth === true) {
      _.$slideTrack.width(5000 * _.slideCount);
    } else {
      _.slideWidth = Math.ceil(_.listWidth);

      _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length));
    }

    var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();

    if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);
  };

  Slick.prototype.setFade = function () {
    var _ = this,
        targetLeft;

    _.$slides.each(function (index, element) {
      targetLeft = _.slideWidth * index * -1;

      if (_.options.rtl === true) {
        $(element).css({
          position: 'relative',
          right: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      } else {
        $(element).css({
          position: 'relative',
          left: targetLeft,
          top: 0,
          zIndex: _.options.zIndex - 2,
          opacity: 0
        });
      }
    });

    _.$slides.eq(_.currentSlide).css({
      zIndex: _.options.zIndex - 1,
      opacity: 1
    });
  };

  Slick.prototype.setHeight = function () {
    var _ = this;

    if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
      var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);

      _.$list.css('height', targetHeight);
    }
  };

  Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
    /**
     * accepts arguments in format of:
     *
     *  - for changing a single option's value:
     *     .slick("setOption", option, value, refresh )
     *
     *  - for changing a set of responsive options:
     *     .slick("setOption", 'responsive', [{}, ...], refresh )
     *
     *  - for updating multiple values at once (not responsive)
     *     .slick("setOption", { 'option': value, ... }, refresh )
     */
    var _ = this,
        l,
        item,
        option,
        value,
        refresh = false,
        type;

    if ($.type(arguments[0]) === 'object') {
      option = arguments[0];
      refresh = arguments[1];
      type = 'multiple';
    } else if ($.type(arguments[0]) === 'string') {
      option = arguments[0];
      value = arguments[1];
      refresh = arguments[2];

      if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
        type = 'responsive';
      } else if (typeof arguments[1] !== 'undefined') {
        type = 'single';
      }
    }

    if (type === 'single') {
      _.options[option] = value;
    } else if (type === 'multiple') {
      $.each(option, function (opt, val) {
        _.options[opt] = val;
      });
    } else if (type === 'responsive') {
      for (item in value) {
        if ($.type(_.options.responsive) !== 'array') {
          _.options.responsive = [value[item]];
        } else {
          l = _.options.responsive.length - 1; // loop through the responsive object and splice out duplicates.

          while (l >= 0) {
            if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
              _.options.responsive.splice(l, 1);
            }

            l--;
          }

          _.options.responsive.push(value[item]);
        }
      }
    }

    if (refresh) {
      _.unload();

      _.reinit();
    }
  };

  Slick.prototype.setPosition = function () {
    var _ = this;

    _.setDimensions();

    _.setHeight();

    if (_.options.fade === false) {
      _.setCSS(_.getLeft(_.currentSlide));
    } else {
      _.setFade();
    }

    _.$slider.trigger('setPosition', [_]);
  };

  Slick.prototype.setProps = function () {
    var _ = this,
        bodyStyle = document.body.style;

    _.positionProp = _.options.vertical === true ? 'top' : 'left';

    if (_.positionProp === 'top') {
      _.$slider.addClass('slick-vertical');
    } else {
      _.$slider.removeClass('slick-vertical');
    }

    if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
      if (_.options.useCSS === true) {
        _.cssTransitions = true;
      }
    }

    if (_.options.fade) {
      if (typeof _.options.zIndex === 'number') {
        if (_.options.zIndex < 3) {
          _.options.zIndex = 3;
        }
      } else {
        _.options.zIndex = _.defaults.zIndex;
      }
    }

    if (bodyStyle.OTransform !== undefined) {
      _.animType = 'OTransform';
      _.transformType = '-o-transform';
      _.transitionType = 'OTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.MozTransform !== undefined) {
      _.animType = 'MozTransform';
      _.transformType = '-moz-transform';
      _.transitionType = 'MozTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.webkitTransform !== undefined) {
      _.animType = 'webkitTransform';
      _.transformType = '-webkit-transform';
      _.transitionType = 'webkitTransition';
      if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
    }

    if (bodyStyle.msTransform !== undefined) {
      _.animType = 'msTransform';
      _.transformType = '-ms-transform';
      _.transitionType = 'msTransition';
      if (bodyStyle.msTransform === undefined) _.animType = false;
    }

    if (bodyStyle.transform !== undefined && _.animType !== false) {
      _.animType = 'transform';
      _.transformType = 'transform';
      _.transitionType = 'transition';
    }

    _.transformsEnabled = _.options.useTransform && _.animType !== null && _.animType !== false;
  };

  Slick.prototype.setSlideClasses = function (index) {
    var _ = this,
        centerOffset,
        allSlides,
        indexOffset,
        remainder;

    allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');

    _.$slides.eq(index).addClass('slick-current');

    if (_.options.centerMode === true) {
      var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;
      centerOffset = Math.floor(_.options.slidesToShow / 2);

      if (_.options.infinite === true) {
        if (index >= centerOffset && index <= _.slideCount - 1 - centerOffset) {
          _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          indexOffset = _.options.slidesToShow + index;
          allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false');
        }

        if (index === 0) {
          allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center');
        } else if (index === _.slideCount - 1) {
          allSlides.eq(_.options.slidesToShow).addClass('slick-center');
        }
      }

      _.$slides.eq(index).addClass('slick-center');
    } else {
      if (index >= 0 && index <= _.slideCount - _.options.slidesToShow) {
        _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
      } else if (allSlides.length <= _.options.slidesToShow) {
        allSlides.addClass('slick-active').attr('aria-hidden', 'false');
      } else {
        remainder = _.slideCount % _.options.slidesToShow;
        indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

        if (_.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow) {
          allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false');
        } else {
          allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false');
        }
      }
    }

    if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
      _.lazyLoad();
    }
  };

  Slick.prototype.setupInfinite = function () {
    var _ = this,
        i,
        slideIndex,
        infiniteCount;

    if (_.options.fade === true) {
      _.options.centerMode = false;
    }

    if (_.options.infinite === true && _.options.fade === false) {
      slideIndex = null;

      if (_.slideCount > _.options.slidesToShow) {
        if (_.options.centerMode === true) {
          infiniteCount = _.options.slidesToShow + 1;
        } else {
          infiniteCount = _.options.slidesToShow;
        }

        for (i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) {
          slideIndex = i - 1;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned');
        }

        for (i = 0; i < infiniteCount + _.slideCount; i += 1) {
          slideIndex = i;
          $(_.$slides[slideIndex]).clone(true).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned');
        }

        _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
          $(this).attr('id', '');
        });
      }
    }
  };

  Slick.prototype.interrupt = function (toggle) {
    var _ = this;

    if (!toggle) {
      _.autoPlay();
    }

    _.interrupted = toggle;
  };

  Slick.prototype.selectHandler = function (event) {
    var _ = this;

    var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');
    var index = parseInt(targetElement.attr('data-slick-index'));
    if (!index) index = 0;

    if (_.slideCount <= _.options.slidesToShow) {
      _.slideHandler(index, false, true);

      return;
    }

    _.slideHandler(index);
  };

  Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
    var targetSlide,
        animSlide,
        oldSlide,
        slideLeft,
        targetLeft = null,
        _ = this,
        navTarget;

    sync = sync || false;

    if (_.animating === true && _.options.waitForAnimate === true) {
      return;
    }

    if (_.options.fade === true && _.currentSlide === index) {
      return;
    }

    if (sync === false) {
      _.asNavFor(index);
    }

    targetSlide = index;
    targetLeft = _.getLeft(targetSlide);
    slideLeft = _.getLeft(_.currentSlide);
    _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

    if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) {
      if (_.options.fade === false) {
        targetSlide = _.currentSlide;

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
          _.animateSlide(slideLeft, function () {
            _.postSlide(targetSlide);
          });
        } else {
          _.postSlide(targetSlide);
        }
      }

      return;
    }

    if (_.options.autoplay) {
      clearInterval(_.autoPlayTimer);
    }

    if (targetSlide < 0) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = _.slideCount - _.slideCount % _.options.slidesToScroll;
      } else {
        animSlide = _.slideCount + targetSlide;
      }
    } else if (targetSlide >= _.slideCount) {
      if (_.slideCount % _.options.slidesToScroll !== 0) {
        animSlide = 0;
      } else {
        animSlide = targetSlide - _.slideCount;
      }
    } else {
      animSlide = targetSlide;
    }

    _.animating = true;

    _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

    oldSlide = _.currentSlide;
    _.currentSlide = animSlide;

    _.setSlideClasses(_.currentSlide);

    if (_.options.asNavFor) {
      navTarget = _.getNavTarget();
      navTarget = navTarget.slick('getSlick');

      if (navTarget.slideCount <= navTarget.options.slidesToShow) {
        navTarget.setSlideClasses(_.currentSlide);
      }
    }

    _.updateDots();

    _.updateArrows();

    if (_.options.fade === true) {
      if (dontAnimate !== true) {
        _.fadeSlideOut(oldSlide);

        _.fadeSlide(animSlide, function () {
          _.postSlide(animSlide);
        });
      } else {
        _.postSlide(animSlide);
      }

      _.animateHeight();

      return;
    }

    if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
      _.animateSlide(targetLeft, function () {
        _.postSlide(animSlide);
      });
    } else {
      _.postSlide(animSlide);
    }
  };

  Slick.prototype.startLoad = function () {
    var _ = this;

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
      _.$prevArrow.hide();

      _.$nextArrow.hide();
    }

    if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
      _.$dots.hide();
    }

    _.$slider.addClass('slick-loading');
  };

  Slick.prototype.swipeDirection = function () {
    var xDist,
        yDist,
        r,
        swipeAngle,
        _ = this;

    xDist = _.touchObject.startX - _.touchObject.curX;
    yDist = _.touchObject.startY - _.touchObject.curY;
    r = Math.atan2(yDist, xDist);
    swipeAngle = Math.round(r * 180 / Math.PI);

    if (swipeAngle < 0) {
      swipeAngle = 360 - Math.abs(swipeAngle);
    }

    if (swipeAngle <= 45 && swipeAngle >= 0) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle <= 360 && swipeAngle >= 315) {
      return _.options.rtl === false ? 'left' : 'right';
    }

    if (swipeAngle >= 135 && swipeAngle <= 225) {
      return _.options.rtl === false ? 'right' : 'left';
    }

    if (_.options.verticalSwiping === true) {
      if (swipeAngle >= 35 && swipeAngle <= 135) {
        return 'down';
      } else {
        return 'up';
      }
    }

    return 'vertical';
  };

  Slick.prototype.swipeEnd = function (event) {
    var _ = this,
        slideCount,
        direction;

    _.dragging = false;
    _.swiping = false;

    if (_.scrolling) {
      _.scrolling = false;
      return false;
    }

    _.interrupted = false;
    _.shouldClick = _.touchObject.swipeLength > 10 ? false : true;

    if (_.touchObject.curX === undefined) {
      return false;
    }

    if (_.touchObject.edgeHit === true) {
      _.$slider.trigger('edge', [_, _.swipeDirection()]);
    }

    if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
      direction = _.swipeDirection();

      switch (direction) {
        case 'left':
        case 'down':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
          _.currentDirection = 0;
          break;

        case 'right':
        case 'up':
          slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
          _.currentDirection = 1;
          break;

        default:
      }

      if (direction != 'vertical') {
        _.slideHandler(slideCount);

        _.touchObject = {};

        _.$slider.trigger('swipe', [_, direction]);
      }
    } else {
      if (_.touchObject.startX !== _.touchObject.curX) {
        _.slideHandler(_.currentSlide);

        _.touchObject = {};
      }
    }
  };

  Slick.prototype.swipeHandler = function (event) {
    var _ = this;

    if (_.options.swipe === false || 'ontouchend' in document && _.options.swipe === false) {
      return;
    } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
      return;
    }

    _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
    _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;

    if (_.options.verticalSwiping === true) {
      _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold;
    }

    switch (event.data.action) {
      case 'start':
        _.swipeStart(event);

        break;

      case 'move':
        _.swipeMove(event);

        break;

      case 'end':
        _.swipeEnd(event);

        break;
    }
  };

  Slick.prototype.swipeMove = function (event) {
    var _ = this,
        edgeWasHit = false,
        curLeft,
        swipeDirection,
        swipeLength,
        positionOffset,
        touches,
        verticalSwipeLength;

    touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

    if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
      return false;
    }

    curLeft = _.getLeft(_.currentSlide);
    _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
    _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
    _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
    verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

    if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
      _.scrolling = true;
      return false;
    }

    if (_.options.verticalSwiping === true) {
      _.touchObject.swipeLength = verticalSwipeLength;
    }

    swipeDirection = _.swipeDirection();

    if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
      _.swiping = true;
      event.preventDefault();
    }

    positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);

    if (_.options.verticalSwiping === true) {
      positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
    }

    swipeLength = _.touchObject.swipeLength;
    _.touchObject.edgeHit = false;

    if (_.options.infinite === false) {
      if (_.currentSlide === 0 && swipeDirection === 'right' || _.currentSlide >= _.getDotCount() && swipeDirection === 'left') {
        swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
        _.touchObject.edgeHit = true;
      }
    }

    if (_.options.vertical === false) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    } else {
      _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset;
    }

    if (_.options.verticalSwiping === true) {
      _.swipeLeft = curLeft + swipeLength * positionOffset;
    }

    if (_.options.fade === true || _.options.touchMove === false) {
      return false;
    }

    if (_.animating === true) {
      _.swipeLeft = null;
      return false;
    }

    _.setCSS(_.swipeLeft);
  };

  Slick.prototype.swipeStart = function (event) {
    var _ = this,
        touches;

    _.interrupted = true;

    if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
      _.touchObject = {};
      return false;
    }

    if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
      touches = event.originalEvent.touches[0];
    }

    _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
    _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
    _.dragging = true;
  };

  Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
    var _ = this;

    if (_.$slidesCache !== null) {
      _.unload();

      _.$slideTrack.children(this.options.slide).detach();

      _.$slidesCache.appendTo(_.$slideTrack);

      _.reinit();
    }
  };

  Slick.prototype.unload = function () {
    var _ = this;

    $('.slick-cloned', _.$slider).remove();

    if (_.$dots) {
      _.$dots.remove();
    }

    if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
      _.$prevArrow.remove();
    }

    if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
      _.$nextArrow.remove();
    }

    _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '');
  };

  Slick.prototype.unslick = function (fromBreakpoint) {
    var _ = this;

    _.$slider.trigger('unslick', [_, fromBreakpoint]);

    _.destroy();
  };

  Slick.prototype.updateArrows = function () {
    var _ = this,
        centerOffset;

    centerOffset = Math.floor(_.options.slidesToShow / 2);

    if (_.options.arrows === true && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
      _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

      if (_.currentSlide === 0) {
        _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
        _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');

        _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
      }
    }
  };

  Slick.prototype.updateDots = function () {
    var _ = this;

    if (_.$dots !== null) {
      _.$dots.find('li').removeClass('slick-active').end();

      _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active');
    }
  };

  Slick.prototype.visibility = function () {
    var _ = this;

    if (_.options.autoplay) {
      if (document[_.hidden]) {
        _.interrupted = true;
      } else {
        _.interrupted = false;
      }
    }
  };

  $.fn.slick = function () {
    var _ = this,
        opt = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        l = _.length,
        i,
        ret;

    for (i = 0; i < l; i++) {
      if (_typeof(opt) == 'object' || typeof opt == 'undefined') _[i].slick = new Slick(_[i], opt);else ret = _[i].slick[opt].apply(_[i].slick, args);
      if (typeof ret != 'undefined') return ret;
    }

    return _;
  };
});

/***/ }),

/***/ "./src/js/vendor/tab.js":
/*!******************************!*\
  !*** ./src/js/vendor/tab.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */
+function ($) {
  'use strict'; // TAB CLASS DEFINITION
  // ====================

  var Tab = function Tab(element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element); // jscs:enable requireDollarBeforejQueryAssignment
  };

  Tab.VERSION = '3.3.7';
  Tab.TRANSITION_DURATION = 150;

  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest('ul:not(.dropdown-menu)');
    var selector = $this.data('target');

    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return;
    var $previous = $ul.find('.active:last a');
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    });
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    });
    $previous.trigger(hideEvent);
    $this.trigger(showEvent);
    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return;
    var $target = $(selector);
    this.activate($this.closest('li'), $ul);
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      });
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      });
    });
  };

  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find('> .active');
    var transition = callback && $.support.transition && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length);

    function next() {
      $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', false);
      element.addClass('active').find('[data-toggle="tab"]').attr('aria-expanded', true);

      if (transition) {
        element[0].offsetWidth; // reflow for transition

        element.addClass('in');
      } else {
        element.removeClass('fade');
      }

      if (element.parent('.dropdown-menu').length) {
        element.closest('li.dropdown').addClass('active').end().find('[data-toggle="tab"]').attr('aria-expanded', true);
      }

      callback && callback();
    }

    $active.length && transition ? $active.one('bsTransitionEnd', next).emulateTransitionEnd(Tab.TRANSITION_DURATION) : next();
    $active.removeClass('in');
  }; // TAB PLUGIN DEFINITION
  // =====================


  function Plugin(option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data('bs.tab');
      if (!data) $this.data('bs.tab', data = new Tab(this));
      if (typeof option == 'string') data[option]();
    });
  }

  var old = $.fn.tab;
  $.fn.tab = Plugin;
  $.fn.tab.Constructor = Tab; // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  }; // TAB DATA-API
  // ============


  var clickHandler = function clickHandler(e) {
    e.preventDefault();
    Plugin.call($(this), 'show');
  };

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler).on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler);
}(jQuery);

/***/ }),

/***/ "./src/js/vendor/vendor.js":
/*!*********************************!*\
  !*** ./src/js/vendor/vendor.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slick__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slick */ "./src/js/vendor/slick.js");
/* harmony import */ var _slick__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_slick__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal */ "./src/js/vendor/modal.js");
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tab */ "./src/js/vendor/tab.js");
/* harmony import */ var _tab__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_tab__WEBPACK_IMPORTED_MODULE_2__);




/***/ }),

/***/ 1:
/*!***************************************!*\
  !*** multi ./src/js/vendor/vendor.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/travispurcell/vvv-local/www/todo/public_html/wp-content/themes/todo/src/js/vendor/vendor.js */"./src/js/vendor/vendor.js");


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3ZlbmRvci9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdmVuZG9yL3NsaWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZW5kb3IvdGFiLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy92ZW5kb3IvdmVuZG9yLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpRdWVyeVwiIl0sIm5hbWVzIjpbIiQiLCJNb2RhbCIsImVsZW1lbnQiLCJvcHRpb25zIiwiJGJvZHkiLCJkb2N1bWVudCIsImJvZHkiLCIkZWxlbWVudCIsIiRkaWFsb2ciLCJmaW5kIiwiJGJhY2tkcm9wIiwiaXNTaG93biIsIm9yaWdpbmFsQm9keVBhZCIsInNjcm9sbGJhcldpZHRoIiwiaWdub3JlQmFja2Ryb3BDbGljayIsInJlbW90ZSIsImxvYWQiLCJwcm94eSIsInRyaWdnZXIiLCJWRVJTSU9OIiwiVFJBTlNJVElPTl9EVVJBVElPTiIsIkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04iLCJERUZBVUxUUyIsImJhY2tkcm9wIiwia2V5Ym9hcmQiLCJzaG93IiwicHJvdG90eXBlIiwidG9nZ2xlIiwiX3JlbGF0ZWRUYXJnZXQiLCJoaWRlIiwidGhhdCIsImUiLCJFdmVudCIsInJlbGF0ZWRUYXJnZXQiLCJpc0RlZmF1bHRQcmV2ZW50ZWQiLCJjaGVja1Njcm9sbGJhciIsInNldFNjcm9sbGJhciIsImFkZENsYXNzIiwiZXNjYXBlIiwicmVzaXplIiwib24iLCJvbmUiLCJ0YXJnZXQiLCJpcyIsInRyYW5zaXRpb24iLCJzdXBwb3J0IiwiaGFzQ2xhc3MiLCJwYXJlbnQiLCJsZW5ndGgiLCJhcHBlbmRUbyIsInNjcm9sbFRvcCIsImFkanVzdERpYWxvZyIsIm9mZnNldFdpZHRoIiwiZW5mb3JjZUZvY3VzIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJwcmV2ZW50RGVmYXVsdCIsIm9mZiIsInJlbW92ZUNsYXNzIiwiaGlkZU1vZGFsIiwiaGFzIiwid2hpY2giLCJ3aW5kb3ciLCJoYW5kbGVVcGRhdGUiLCJyZXNldEFkanVzdG1lbnRzIiwicmVzZXRTY3JvbGxiYXIiLCJyZW1vdmVCYWNrZHJvcCIsInJlbW92ZSIsImNhbGxiYWNrIiwiYW5pbWF0ZSIsImRvQW5pbWF0ZSIsImNyZWF0ZUVsZW1lbnQiLCJjdXJyZW50VGFyZ2V0IiwiZm9jdXMiLCJjYWxsYmFja1JlbW92ZSIsIm1vZGFsSXNPdmVyZmxvd2luZyIsInNjcm9sbEhlaWdodCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsImNzcyIsInBhZGRpbmdMZWZ0IiwiYm9keUlzT3ZlcmZsb3dpbmciLCJwYWRkaW5nUmlnaHQiLCJmdWxsV2luZG93V2lkdGgiLCJpbm5lcldpZHRoIiwiZG9jdW1lbnRFbGVtZW50UmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJpZ2h0IiwiTWF0aCIsImFicyIsImxlZnQiLCJjbGllbnRXaWR0aCIsIm1lYXN1cmVTY3JvbGxiYXIiLCJib2R5UGFkIiwicGFyc2VJbnQiLCJzdHlsZSIsInNjcm9sbERpdiIsImNsYXNzTmFtZSIsImFwcGVuZCIsInJlbW92ZUNoaWxkIiwiUGx1Z2luIiwib3B0aW9uIiwiZWFjaCIsIiR0aGlzIiwiZGF0YSIsImV4dGVuZCIsIm9sZCIsImZuIiwibW9kYWwiLCJDb25zdHJ1Y3RvciIsIm5vQ29uZmxpY3QiLCJocmVmIiwiYXR0ciIsIiR0YXJnZXQiLCJyZXBsYWNlIiwidGVzdCIsInNob3dFdmVudCIsImNhbGwiLCJqUXVlcnkiLCJmYWN0b3J5IiwiZGVmaW5lIiwiU2xpY2siLCJpbnN0YW5jZVVpZCIsInNldHRpbmdzIiwiXyIsImRhdGFTZXR0aW5ncyIsImRlZmF1bHRzIiwiYWNjZXNzaWJpbGl0eSIsImFkYXB0aXZlSGVpZ2h0IiwiYXBwZW5kQXJyb3dzIiwiYXBwZW5kRG90cyIsImFycm93cyIsImFzTmF2Rm9yIiwicHJldkFycm93IiwibmV4dEFycm93IiwiYXV0b3BsYXkiLCJhdXRvcGxheVNwZWVkIiwiY2VudGVyTW9kZSIsImNlbnRlclBhZGRpbmciLCJjc3NFYXNlIiwiY3VzdG9tUGFnaW5nIiwic2xpZGVyIiwiaSIsInRleHQiLCJkb3RzIiwiZG90c0NsYXNzIiwiZHJhZ2dhYmxlIiwiZWFzaW5nIiwiZWRnZUZyaWN0aW9uIiwiZmFkZSIsImZvY3VzT25TZWxlY3QiLCJmb2N1c09uQ2hhbmdlIiwiaW5maW5pdGUiLCJpbml0aWFsU2xpZGUiLCJsYXp5TG9hZCIsIm1vYmlsZUZpcnN0IiwicGF1c2VPbkhvdmVyIiwicGF1c2VPbkZvY3VzIiwicGF1c2VPbkRvdHNIb3ZlciIsInJlc3BvbmRUbyIsInJlc3BvbnNpdmUiLCJyb3dzIiwicnRsIiwic2xpZGUiLCJzbGlkZXNQZXJSb3ciLCJzbGlkZXNUb1Nob3ciLCJzbGlkZXNUb1Njcm9sbCIsInNwZWVkIiwic3dpcGUiLCJzd2lwZVRvU2xpZGUiLCJ0b3VjaE1vdmUiLCJ0b3VjaFRocmVzaG9sZCIsInVzZUNTUyIsInVzZVRyYW5zZm9ybSIsInZhcmlhYmxlV2lkdGgiLCJ2ZXJ0aWNhbCIsInZlcnRpY2FsU3dpcGluZyIsIndhaXRGb3JBbmltYXRlIiwiekluZGV4IiwiaW5pdGlhbHMiLCJhbmltYXRpbmciLCJkcmFnZ2luZyIsImF1dG9QbGF5VGltZXIiLCJjdXJyZW50RGlyZWN0aW9uIiwiY3VycmVudExlZnQiLCJjdXJyZW50U2xpZGUiLCJkaXJlY3Rpb24iLCIkZG90cyIsImxpc3RXaWR0aCIsImxpc3RIZWlnaHQiLCJsb2FkSW5kZXgiLCIkbmV4dEFycm93IiwiJHByZXZBcnJvdyIsInNjcm9sbGluZyIsInNsaWRlQ291bnQiLCJzbGlkZVdpZHRoIiwiJHNsaWRlVHJhY2siLCIkc2xpZGVzIiwic2xpZGluZyIsInNsaWRlT2Zmc2V0Iiwic3dpcGVMZWZ0Iiwic3dpcGluZyIsIiRsaXN0IiwidG91Y2hPYmplY3QiLCJ0cmFuc2Zvcm1zRW5hYmxlZCIsInVuc2xpY2tlZCIsImFjdGl2ZUJyZWFrcG9pbnQiLCJhbmltVHlwZSIsImFuaW1Qcm9wIiwiYnJlYWtwb2ludHMiLCJicmVha3BvaW50U2V0dGluZ3MiLCJjc3NUcmFuc2l0aW9ucyIsImZvY3Vzc2VkIiwiaW50ZXJydXB0ZWQiLCJoaWRkZW4iLCJwYXVzZWQiLCJwb3NpdGlvblByb3AiLCJyb3dDb3VudCIsInNob3VsZENsaWNrIiwiJHNsaWRlciIsIiRzbGlkZXNDYWNoZSIsInRyYW5zZm9ybVR5cGUiLCJ0cmFuc2l0aW9uVHlwZSIsInZpc2liaWxpdHlDaGFuZ2UiLCJ3aW5kb3dXaWR0aCIsIndpbmRvd1RpbWVyIiwib3JpZ2luYWxTZXR0aW5ncyIsIm1vekhpZGRlbiIsIndlYmtpdEhpZGRlbiIsImF1dG9QbGF5IiwiYXV0b1BsYXlDbGVhciIsImF1dG9QbGF5SXRlcmF0b3IiLCJjaGFuZ2VTbGlkZSIsImNsaWNrSGFuZGxlciIsInNlbGVjdEhhbmRsZXIiLCJzZXRQb3NpdGlvbiIsInN3aXBlSGFuZGxlciIsImRyYWdIYW5kbGVyIiwia2V5SGFuZGxlciIsImh0bWxFeHByIiwicmVnaXN0ZXJCcmVha3BvaW50cyIsImluaXQiLCJhY3RpdmF0ZUFEQSIsImFkZFNsaWRlIiwic2xpY2tBZGQiLCJtYXJrdXAiLCJpbmRleCIsImFkZEJlZm9yZSIsInVubG9hZCIsImluc2VydEJlZm9yZSIsImVxIiwiaW5zZXJ0QWZ0ZXIiLCJwcmVwZW5kVG8iLCJjaGlsZHJlbiIsImRldGFjaCIsInJlaW5pdCIsImFuaW1hdGVIZWlnaHQiLCJ0YXJnZXRIZWlnaHQiLCJvdXRlckhlaWdodCIsImhlaWdodCIsImFuaW1hdGVTbGlkZSIsInRhcmdldExlZnQiLCJhbmltUHJvcHMiLCJ0b3AiLCJhbmltU3RhcnQiLCJkdXJhdGlvbiIsInN0ZXAiLCJub3ciLCJjZWlsIiwiY29tcGxldGUiLCJhcHBseVRyYW5zaXRpb24iLCJzZXRUaW1lb3V0IiwiZGlzYWJsZVRyYW5zaXRpb24iLCJnZXROYXZUYXJnZXQiLCJub3QiLCJzbGljayIsInNsaWRlSGFuZGxlciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInNsaWRlVG8iLCJidWlsZEFycm93cyIsInJlbW92ZUF0dHIiLCJhZGQiLCJidWlsZERvdHMiLCJkb3QiLCJnZXREb3RDb3VudCIsImZpcnN0IiwiYnVpbGRPdXQiLCJ3cmFwQWxsIiwid3JhcCIsInNldHVwSW5maW5pdGUiLCJ1cGRhdGVEb3RzIiwic2V0U2xpZGVDbGFzc2VzIiwiYnVpbGRSb3dzIiwiYSIsImIiLCJjIiwibmV3U2xpZGVzIiwibnVtT2ZTbGlkZXMiLCJvcmlnaW5hbFNsaWRlcyIsInNsaWRlc1BlclNlY3Rpb24iLCJjcmVhdGVEb2N1bWVudEZyYWdtZW50Iiwicm93IiwiZ2V0IiwiYXBwZW5kQ2hpbGQiLCJlbXB0eSIsImNoZWNrUmVzcG9uc2l2ZSIsImluaXRpYWwiLCJmb3JjZVVwZGF0ZSIsImJyZWFrcG9pbnQiLCJ0YXJnZXRCcmVha3BvaW50IiwicmVzcG9uZFRvV2lkdGgiLCJ0cmlnZ2VyQnJlYWtwb2ludCIsInNsaWRlcldpZHRoIiwid2lkdGgiLCJtaW4iLCJoYXNPd25Qcm9wZXJ0eSIsInVuc2xpY2siLCJyZWZyZXNoIiwiZXZlbnQiLCJkb250QW5pbWF0ZSIsImluZGV4T2Zmc2V0IiwidW5ldmVuT2Zmc2V0IiwiY2xvc2VzdCIsIm1lc3NhZ2UiLCJjaGVja05hdmlnYWJsZSIsIm5hdmlnYWJsZXMiLCJwcmV2TmF2aWdhYmxlIiwiZ2V0TmF2aWdhYmxlSW5kZXhlcyIsIm4iLCJjbGVhblVwRXZlbnRzIiwiaW50ZXJydXB0IiwidmlzaWJpbGl0eSIsImNsZWFuVXBTbGlkZUV2ZW50cyIsIm9yaWVudGF0aW9uQ2hhbmdlIiwiY2xlYW5VcFJvd3MiLCJzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24iLCJzdG9wUHJvcGFnYXRpb24iLCJkZXN0cm95IiwiZmFkZVNsaWRlIiwic2xpZGVJbmRleCIsIm9wYWNpdHkiLCJmYWRlU2xpZGVPdXQiLCJmaWx0ZXJTbGlkZXMiLCJzbGlja0ZpbHRlciIsImZpbHRlciIsImZvY3VzSGFuZGxlciIsIiRzZiIsImdldEN1cnJlbnQiLCJzbGlja0N1cnJlbnRTbGlkZSIsImJyZWFrUG9pbnQiLCJjb3VudGVyIiwicGFnZXJRdHkiLCJnZXRMZWZ0IiwidmVydGljYWxIZWlnaHQiLCJ2ZXJ0aWNhbE9mZnNldCIsInRhcmdldFNsaWRlIiwiY29lZiIsImZsb29yIiwib2Zmc2V0TGVmdCIsIm91dGVyV2lkdGgiLCJnZXRPcHRpb24iLCJzbGlja0dldE9wdGlvbiIsImluZGV4ZXMiLCJtYXgiLCJwdXNoIiwiZ2V0U2xpY2siLCJnZXRTbGlkZUNvdW50Iiwic2xpZGVzVHJhdmVyc2VkIiwic3dpcGVkU2xpZGUiLCJjZW50ZXJPZmZzZXQiLCJnb1RvIiwic2xpY2tHb1RvIiwiY3JlYXRpb24iLCJzZXRQcm9wcyIsInN0YXJ0TG9hZCIsImxvYWRTbGlkZXIiLCJpbml0aWFsaXplRXZlbnRzIiwidXBkYXRlQXJyb3dzIiwiaW5pdEFEQSIsIm51bURvdEdyb3VwcyIsInRhYkNvbnRyb2xJbmRleGVzIiwidmFsIiwic2xpZGVDb250cm9sSW5kZXgiLCJpbmRleE9mIiwiYXJpYUJ1dHRvbkNvbnRyb2wiLCJtYXBwZWRTbGlkZUluZGV4IiwiZW5kIiwiaW5pdEFycm93RXZlbnRzIiwiaW5pdERvdEV2ZW50cyIsImluaXRTbGlkZUV2ZW50cyIsImFjdGlvbiIsImluaXRVSSIsInRhZ05hbWUiLCJtYXRjaCIsImtleUNvZGUiLCJsb2FkUmFuZ2UiLCJjbG9uZVJhbmdlIiwicmFuZ2VTdGFydCIsInJhbmdlRW5kIiwibG9hZEltYWdlcyIsImltYWdlc1Njb3BlIiwiaW1hZ2UiLCJpbWFnZVNvdXJjZSIsImltYWdlU3JjU2V0IiwiaW1hZ2VTaXplcyIsImltYWdlVG9Mb2FkIiwib25sb2FkIiwib25lcnJvciIsInNyYyIsInNsaWNlIiwicHJldlNsaWRlIiwibmV4dFNsaWRlIiwicHJvZ3Jlc3NpdmVMYXp5TG9hZCIsIm5leHQiLCJzbGlja05leHQiLCJwYXVzZSIsInNsaWNrUGF1c2UiLCJwbGF5Iiwic2xpY2tQbGF5IiwicG9zdFNsaWRlIiwiJGN1cnJlbnRTbGlkZSIsInByZXYiLCJzbGlja1ByZXYiLCJ0cnlDb3VudCIsIiRpbWdzVG9Mb2FkIiwiaW5pdGlhbGl6aW5nIiwibGFzdFZpc2libGVJbmRleCIsImN1cnJlbnRCcmVha3BvaW50IiwibCIsInJlc3BvbnNpdmVTZXR0aW5ncyIsInR5cGUiLCJzcGxpY2UiLCJzb3J0IiwiY2xlYXJUaW1lb3V0Iiwid2luZG93RGVsYXkiLCJyZW1vdmVTbGlkZSIsInNsaWNrUmVtb3ZlIiwicmVtb3ZlQmVmb3JlIiwicmVtb3ZlQWxsIiwic2V0Q1NTIiwicG9zaXRpb24iLCJwb3NpdGlvblByb3BzIiwieCIsInkiLCJzZXREaW1lbnNpb25zIiwicGFkZGluZyIsIm9mZnNldCIsInNldEZhZGUiLCJzZXRIZWlnaHQiLCJzZXRPcHRpb24iLCJzbGlja1NldE9wdGlvbiIsIml0ZW0iLCJ2YWx1ZSIsImFyZ3VtZW50cyIsIm9wdCIsImJvZHlTdHlsZSIsIldlYmtpdFRyYW5zaXRpb24iLCJ1bmRlZmluZWQiLCJNb3pUcmFuc2l0aW9uIiwibXNUcmFuc2l0aW9uIiwiT1RyYW5zZm9ybSIsInBlcnNwZWN0aXZlUHJvcGVydHkiLCJ3ZWJraXRQZXJzcGVjdGl2ZSIsIk1velRyYW5zZm9ybSIsIk1velBlcnNwZWN0aXZlIiwid2Via2l0VHJhbnNmb3JtIiwibXNUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm0iLCJhbGxTbGlkZXMiLCJyZW1haW5kZXIiLCJldmVuQ29lZiIsImluZmluaXRlQ291bnQiLCJjbG9uZSIsInRhcmdldEVsZW1lbnQiLCJwYXJlbnRzIiwic3luYyIsImFuaW1TbGlkZSIsIm9sZFNsaWRlIiwic2xpZGVMZWZ0IiwibmF2VGFyZ2V0Iiwic3dpcGVEaXJlY3Rpb24iLCJ4RGlzdCIsInlEaXN0IiwiciIsInN3aXBlQW5nbGUiLCJzdGFydFgiLCJjdXJYIiwic3RhcnRZIiwiY3VyWSIsImF0YW4yIiwicm91bmQiLCJQSSIsInN3aXBlRW5kIiwic3dpcGVMZW5ndGgiLCJlZGdlSGl0IiwibWluU3dpcGUiLCJmaW5nZXJDb3VudCIsIm9yaWdpbmFsRXZlbnQiLCJ0b3VjaGVzIiwic3dpcGVTdGFydCIsInN3aXBlTW92ZSIsImVkZ2VXYXNIaXQiLCJjdXJMZWZ0IiwicG9zaXRpb25PZmZzZXQiLCJ2ZXJ0aWNhbFN3aXBlTGVuZ3RoIiwicGFnZVgiLCJjbGllbnRYIiwicGFnZVkiLCJjbGllbnRZIiwic3FydCIsInBvdyIsInVuZmlsdGVyU2xpZGVzIiwic2xpY2tVbmZpbHRlciIsImZyb21CcmVha3BvaW50IiwiYXJncyIsIkFycmF5IiwicmV0IiwiYXBwbHkiLCJUYWIiLCIkdWwiLCJzZWxlY3RvciIsIiRwcmV2aW91cyIsImhpZGVFdmVudCIsImFjdGl2YXRlIiwiY29udGFpbmVyIiwiJGFjdGl2ZSIsInRhYiJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RyxDQUFDLENBQUMwRyxFQUFGLENBQUtvYSxHQUFmO0VBRUE5Z0IsQ0FBQyxDQUFDMEcsRUFBRixDQUFLb2EsR0FBTCxHQUF1QjNhLE1BQXZCO0VBQ0FuRyxDQUFDLENBQUMwRyxFQUFGLENBQUtvYSxHQUFMLENBQVNsYSxXQUFULEdBQXVCMFosR0FBdkIsQ0F6SFksQ0E0SFo7RUFDQTs7RUFFQXRnQixDQUFDLENBQUMwRyxFQUFGLENBQUtvYSxHQUFMLENBQVNqYSxVQUFULEdBQXNCLFlBQVk7SUFDaEM3RyxDQUFDLENBQUMwRyxFQUFGLENBQUtvYSxHQUFMLEdBQVdyYSxHQUFYO0lBQ0EsT0FBTyxJQUFQO0VBQ0QsQ0FIRCxDQS9IWSxDQXFJWjtFQUNBOzs7RUFFQSxJQUFJK0gsWUFBWSxHQUFHLFNBQWZBLFlBQWUsQ0FBVXpNLENBQVYsRUFBYTtJQUM5QkEsQ0FBQyxDQUFDd0IsY0FBRjtJQUNBNEMsTUFBTSxDQUFDaUIsSUFBUCxDQUFZcEgsQ0FBQyxDQUFDLElBQUQsQ0FBYixFQUFxQixNQUFyQjtFQUNELENBSEQ7O0VBS0FBLENBQUMsQ0FBQ0ssUUFBRCxDQUFELENBQ0dtQyxFQURILENBQ00sdUJBRE4sRUFDK0IscUJBRC9CLEVBQ3NEZ00sWUFEdEQsRUFFR2hNLEVBRkgsQ0FFTSx1QkFGTixFQUUrQixzQkFGL0IsRUFFdURnTSxZQUZ2RDtBQUlELENBakpBLENBaUpDbkgsTUFqSkQsQ0FBRCxDOzs7Ozs7Ozs7Ozs7QUNUQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0RBLHdCIiwiZmlsZSI6InZlbmRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiBtb2RhbC5qcyB2My4zLjdcbiAqIGh0dHA6Ly9nZXRib290c3RyYXAuY29tL2phdmFzY3JpcHQvI21vZGFsc1xuICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gKiBDb3B5cmlnaHQgMjAxMS0yMDE2IFR3aXR0ZXIsIEluYy5cbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuXG4rZnVuY3Rpb24gKCQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIE1PREFMIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4gIHZhciBNb2RhbCA9IGZ1bmN0aW9uIChlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zICAgICAgICAgICAgID0gb3B0aW9uc1xuICAgIHRoaXMuJGJvZHkgICAgICAgICAgICAgICA9ICQoZG9jdW1lbnQuYm9keSlcbiAgICB0aGlzLiRlbGVtZW50ICAgICAgICAgICAgPSAkKGVsZW1lbnQpXG4gICAgdGhpcy4kZGlhbG9nICAgICAgICAgICAgID0gdGhpcy4kZWxlbWVudC5maW5kKCcubW9kYWwtZGlhbG9nJylcbiAgICB0aGlzLiRiYWNrZHJvcCAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5pc1Nob3duICAgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMub3JpZ2luYWxCb2R5UGFkICAgICA9IG51bGxcbiAgICB0aGlzLnNjcm9sbGJhcldpZHRoICAgICAgPSAwXG4gICAgdGhpcy5pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcblxuICAgIGlmICh0aGlzLm9wdGlvbnMucmVtb3RlKSB7XG4gICAgICB0aGlzLiRlbGVtZW50XG4gICAgICAgIC5maW5kKCcubW9kYWwtY29udGVudCcpXG4gICAgICAgIC5sb2FkKHRoaXMub3B0aW9ucy5yZW1vdGUsICQucHJveHkoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlcignbG9hZGVkLmJzLm1vZGFsJylcbiAgICAgICAgfSwgdGhpcykpXG4gICAgfVxuICB9XG5cbiAgTW9kYWwuVkVSU0lPTiAgPSAnMy4zLjcnXG5cbiAgTW9kYWwuVFJBTlNJVElPTl9EVVJBVElPTiA9IDMwMFxuICBNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgTW9kYWwuREVGQVVMVFMgPSB7XG4gICAgYmFja2Ryb3A6IHRydWUsXG4gICAga2V5Ym9hcmQ6IHRydWUsXG4gICAgc2hvdzogdHJ1ZVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uIChfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmlzU2hvd24gPyB0aGlzLmhpZGUoKSA6IHRoaXMuc2hvdyhfcmVsYXRlZFRhcmdldClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKF9yZWxhdGVkVGFyZ2V0KSB7XG4gICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgdmFyIGUgICAgPSAkLkV2ZW50KCdzaG93LmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKGUpXG5cbiAgICBpZiAodGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gdHJ1ZVxuXG4gICAgdGhpcy5jaGVja1Njcm9sbGJhcigpXG4gICAgdGhpcy5zZXRTY3JvbGxiYXIoKVxuICAgIHRoaXMuJGJvZHkuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKVxuXG4gICAgdGhpcy5lc2NhcGUoKVxuICAgIHRoaXMucmVzaXplKClcblxuICAgIHRoaXMuJGVsZW1lbnQub24oJ2NsaWNrLmRpc21pc3MuYnMubW9kYWwnLCAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgJC5wcm94eSh0aGlzLmhpZGUsIHRoaXMpKVxuXG4gICAgdGhpcy4kZGlhbG9nLm9uKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoYXQuJGVsZW1lbnQub25lKCdtb3VzZXVwLmRpc21pc3MuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAoJChlLnRhcmdldCkuaXModGhhdC4kZWxlbWVudCkpIHRoYXQuaWdub3JlQmFja2Ryb3BDbGljayA9IHRydWVcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIHRoaXMuYmFja2Ryb3AoZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHRyYW5zaXRpb24gPSAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGF0LiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJylcblxuICAgICAgaWYgKCF0aGF0LiRlbGVtZW50LnBhcmVudCgpLmxlbmd0aCkge1xuICAgICAgICB0aGF0LiRlbGVtZW50LmFwcGVuZFRvKHRoYXQuJGJvZHkpIC8vIGRvbid0IG1vdmUgbW9kYWxzIGRvbSBwb3NpdGlvblxuICAgICAgfVxuXG4gICAgICB0aGF0LiRlbGVtZW50XG4gICAgICAgIC5zaG93KClcbiAgICAgICAgLnNjcm9sbFRvcCgwKVxuXG4gICAgICB0aGF0LmFkanVzdERpYWxvZygpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIHRoYXQuJGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gZm9yY2UgcmVmbG93XG4gICAgICB9XG5cbiAgICAgIHRoYXQuJGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgdGhhdC5lbmZvcmNlRm9jdXMoKVxuXG4gICAgICB2YXIgZSA9ICQuRXZlbnQoJ3Nob3duLmJzLm1vZGFsJywgeyByZWxhdGVkVGFyZ2V0OiBfcmVsYXRlZFRhcmdldCB9KVxuXG4gICAgICB0cmFuc2l0aW9uID9cbiAgICAgICAgdGhhdC4kZGlhbG9nIC8vIHdhaXQgZm9yIG1vZGFsIHRvIHNsaWRlIGluXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhhdC4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpLnRyaWdnZXIoZSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignZm9jdXMnKS50cmlnZ2VyKGUpXG4gICAgfSlcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZSkgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBlID0gJC5FdmVudCgnaGlkZS5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoZSlcblxuICAgIGlmICghdGhpcy5pc1Nob3duIHx8IGUuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdGhpcy5pc1Nob3duID0gZmFsc2VcblxuICAgIHRoaXMuZXNjYXBlKClcbiAgICB0aGlzLnJlc2l6ZSgpXG5cbiAgICAkKGRvY3VtZW50KS5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKVxuXG4gICAgdGhpcy4kZWxlbWVudFxuICAgICAgLnJlbW92ZUNsYXNzKCdpbicpXG4gICAgICAub2ZmKCdjbGljay5kaXNtaXNzLmJzLm1vZGFsJylcbiAgICAgIC5vZmYoJ21vdXNldXAuZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICB0aGlzLiRkaWFsb2cub2ZmKCdtb3VzZWRvd24uZGlzbWlzcy5icy5tb2RhbCcpXG5cbiAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgdGhpcy4kZWxlbWVudFxuICAgICAgICAub25lKCdic1RyYW5zaXRpb25FbmQnLCAkLnByb3h5KHRoaXMuaGlkZU1vZGFsLCB0aGlzKSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLlRSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgIHRoaXMuaGlkZU1vZGFsKClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5lbmZvcmNlRm9jdXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgJChkb2N1bWVudClcbiAgICAgIC5vZmYoJ2ZvY3VzaW4uYnMubW9kYWwnKSAvLyBndWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIC5vbignZm9jdXNpbi5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50ICE9PSBlLnRhcmdldCAmJlxuICAgICAgICAgICAgdGhpcy4kZWxlbWVudFswXSAhPT0gZS50YXJnZXQgJiZcbiAgICAgICAgICAgICF0aGlzLiRlbGVtZW50LmhhcyhlLnRhcmdldCkubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy4kZWxlbWVudC50cmlnZ2VyKCdmb2N1cycpXG4gICAgICAgIH1cbiAgICAgIH0sIHRoaXMpKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLmVzY2FwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5rZXlib2FyZCkge1xuICAgICAgdGhpcy4kZWxlbWVudC5vbigna2V5ZG93bi5kaXNtaXNzLmJzLm1vZGFsJywgJC5wcm94eShmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLndoaWNoID09IDI3ICYmIHRoaXMuaGlkZSgpXG4gICAgICB9LCB0aGlzKSlcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzU2hvd24pIHtcbiAgICAgIHRoaXMuJGVsZW1lbnQub2ZmKCdrZXlkb3duLmRpc21pc3MuYnMubW9kYWwnKVxuICAgIH1cbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuaXNTaG93bikge1xuICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUuYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuaGFuZGxlVXBkYXRlLCB0aGlzKSlcbiAgICB9IGVsc2Uge1xuICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLmJzLm1vZGFsJylcbiAgICB9XG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuaGlkZU1vZGFsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0aGF0ID0gdGhpc1xuICAgIHRoaXMuJGVsZW1lbnQuaGlkZSgpXG4gICAgdGhpcy5iYWNrZHJvcChmdW5jdGlvbiAoKSB7XG4gICAgICB0aGF0LiRib2R5LnJlbW92ZUNsYXNzKCdtb2RhbC1vcGVuJylcbiAgICAgIHRoYXQucmVzZXRBZGp1c3RtZW50cygpXG4gICAgICB0aGF0LnJlc2V0U2Nyb2xsYmFyKClcbiAgICAgIHRoYXQuJGVsZW1lbnQudHJpZ2dlcignaGlkZGVuLmJzLm1vZGFsJylcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlbW92ZUJhY2tkcm9wID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuJGJhY2tkcm9wICYmIHRoaXMuJGJhY2tkcm9wLnJlbW92ZSgpXG4gICAgdGhpcy4kYmFja2Ryb3AgPSBudWxsXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYmFja2Ryb3AgPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICB2YXIgYW5pbWF0ZSA9IHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3MoJ2ZhZGUnKSA/ICdmYWRlJyA6ICcnXG5cbiAgICBpZiAodGhpcy5pc1Nob3duICYmIHRoaXMub3B0aW9ucy5iYWNrZHJvcCkge1xuICAgICAgdmFyIGRvQW5pbWF0ZSA9ICQuc3VwcG9ydC50cmFuc2l0aW9uICYmIGFuaW1hdGVcblxuICAgICAgdGhpcy4kYmFja2Ryb3AgPSAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKVxuICAgICAgICAuYWRkQ2xhc3MoJ21vZGFsLWJhY2tkcm9wICcgKyBhbmltYXRlKVxuICAgICAgICAuYXBwZW5kVG8odGhpcy4kYm9keSlcblxuICAgICAgdGhpcy4kZWxlbWVudC5vbignY2xpY2suZGlzbWlzcy5icy5tb2RhbCcsICQucHJveHkoZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaWdub3JlQmFja2Ryb3BDbGljaykge1xuICAgICAgICAgIHRoaXMuaWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSBlLmN1cnJlbnRUYXJnZXQpIHJldHVyblxuICAgICAgICB0aGlzLm9wdGlvbnMuYmFja2Ryb3AgPT0gJ3N0YXRpYydcbiAgICAgICAgICA/IHRoaXMuJGVsZW1lbnRbMF0uZm9jdXMoKVxuICAgICAgICAgIDogdGhpcy5oaWRlKClcbiAgICAgIH0sIHRoaXMpKVxuXG4gICAgICBpZiAoZG9BbmltYXRlKSB0aGlzLiRiYWNrZHJvcFswXS5vZmZzZXRXaWR0aCAvLyBmb3JjZSByZWZsb3dcblxuICAgICAgdGhpcy4kYmFja2Ryb3AuYWRkQ2xhc3MoJ2luJylcblxuICAgICAgaWYgKCFjYWxsYmFjaykgcmV0dXJuXG5cbiAgICAgIGRvQW5pbWF0ZSA/XG4gICAgICAgIHRoaXMuJGJhY2tkcm9wXG4gICAgICAgICAgLm9uZSgnYnNUcmFuc2l0aW9uRW5kJywgY2FsbGJhY2spXG4gICAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKE1vZGFsLkJBQ0tEUk9QX1RSQU5TSVRJT05fRFVSQVRJT04pIDpcbiAgICAgICAgY2FsbGJhY2soKVxuXG4gICAgfSBlbHNlIGlmICghdGhpcy5pc1Nob3duICYmIHRoaXMuJGJhY2tkcm9wKSB7XG4gICAgICB0aGlzLiRiYWNrZHJvcC5yZW1vdmVDbGFzcygnaW4nKVxuXG4gICAgICB2YXIgY2FsbGJhY2tSZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoYXQucmVtb3ZlQmFja2Ryb3AoKVxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgICAkLnN1cHBvcnQudHJhbnNpdGlvbiAmJiB0aGlzLiRlbGVtZW50Lmhhc0NsYXNzKCdmYWRlJykgP1xuICAgICAgICB0aGlzLiRiYWNrZHJvcFxuICAgICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIGNhbGxiYWNrUmVtb3ZlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChNb2RhbC5CQUNLRFJPUF9UUkFOU0lUSU9OX0RVUkFUSU9OKSA6XG4gICAgICAgIGNhbGxiYWNrUmVtb3ZlKClcblxuICAgIH0gZWxzZSBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrKClcbiAgICB9XG4gIH1cblxuICAvLyB0aGVzZSBmb2xsb3dpbmcgbWV0aG9kcyBhcmUgdXNlZCB0byBoYW5kbGUgb3ZlcmZsb3dpbmcgbW9kYWxzXG5cbiAgTW9kYWwucHJvdG90eXBlLmhhbmRsZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmFkanVzdERpYWxvZygpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuYWRqdXN0RGlhbG9nID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBtb2RhbElzT3ZlcmZsb3dpbmcgPSB0aGlzLiRlbGVtZW50WzBdLnNjcm9sbEhlaWdodCA+IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcblxuICAgIHRoaXMuJGVsZW1lbnQuY3NzKHtcbiAgICAgIHBhZGRpbmdMZWZ0OiAgIXRoaXMuYm9keUlzT3ZlcmZsb3dpbmcgJiYgbW9kYWxJc092ZXJmbG93aW5nID8gdGhpcy5zY3JvbGxiYXJXaWR0aCA6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiB0aGlzLmJvZHlJc092ZXJmbG93aW5nICYmICFtb2RhbElzT3ZlcmZsb3dpbmcgPyB0aGlzLnNjcm9sbGJhcldpZHRoIDogJydcbiAgICB9KVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnJlc2V0QWRqdXN0bWVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kZWxlbWVudC5jc3Moe1xuICAgICAgcGFkZGluZ0xlZnQ6ICcnLFxuICAgICAgcGFkZGluZ1JpZ2h0OiAnJ1xuICAgIH0pXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUuY2hlY2tTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZ1bGxXaW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgaWYgKCFmdWxsV2luZG93V2lkdGgpIHsgLy8gd29ya2Fyb3VuZCBmb3IgbWlzc2luZyB3aW5kb3cuaW5uZXJXaWR0aCBpbiBJRThcbiAgICAgIHZhciBkb2N1bWVudEVsZW1lbnRSZWN0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICBmdWxsV2luZG93V2lkdGggPSBkb2N1bWVudEVsZW1lbnRSZWN0LnJpZ2h0IC0gTWF0aC5hYnMoZG9jdW1lbnRFbGVtZW50UmVjdC5sZWZ0KVxuICAgIH1cbiAgICB0aGlzLmJvZHlJc092ZXJmbG93aW5nID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCA8IGZ1bGxXaW5kb3dXaWR0aFxuICAgIHRoaXMuc2Nyb2xsYmFyV2lkdGggPSB0aGlzLm1lYXN1cmVTY3JvbGxiYXIoKVxuICB9XG5cbiAgTW9kYWwucHJvdG90eXBlLnNldFNjcm9sbGJhciA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYm9keVBhZCA9IHBhcnNlSW50KCh0aGlzLiRib2R5LmNzcygncGFkZGluZy1yaWdodCcpIHx8IDApLCAxMClcbiAgICB0aGlzLm9yaWdpbmFsQm9keVBhZCA9IGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0IHx8ICcnXG4gICAgaWYgKHRoaXMuYm9keUlzT3ZlcmZsb3dpbmcpIHRoaXMuJGJvZHkuY3NzKCdwYWRkaW5nLXJpZ2h0JywgYm9keVBhZCArIHRoaXMuc2Nyb2xsYmFyV2lkdGgpXG4gIH1cblxuICBNb2RhbC5wcm90b3R5cGUucmVzZXRTY3JvbGxiYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kYm9keS5jc3MoJ3BhZGRpbmctcmlnaHQnLCB0aGlzLm9yaWdpbmFsQm9keVBhZClcbiAgfVxuXG4gIE1vZGFsLnByb3RvdHlwZS5tZWFzdXJlU2Nyb2xsYmFyID0gZnVuY3Rpb24gKCkgeyAvLyB0aHggd2Fsc2hcbiAgICB2YXIgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gJ21vZGFsLXNjcm9sbGJhci1tZWFzdXJlJ1xuICAgIHRoaXMuJGJvZHkuYXBwZW5kKHNjcm9sbERpdilcbiAgICB2YXIgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYub2Zmc2V0V2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGhcbiAgICB0aGlzLiRib2R5WzBdLnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGhcbiAgfVxuXG5cbiAgLy8gTU9EQUwgUExVR0lOIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uLCBfcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICR0aGlzICAgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgICA9ICR0aGlzLmRhdGEoJ2JzLm1vZGFsJylcbiAgICAgIHZhciBvcHRpb25zID0gJC5leHRlbmQoe30sIE1vZGFsLkRFRkFVTFRTLCAkdGhpcy5kYXRhKCksIHR5cGVvZiBvcHRpb24gPT0gJ29iamVjdCcgJiYgb3B0aW9uKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLm1vZGFsJywgKGRhdGEgPSBuZXcgTW9kYWwodGhpcywgb3B0aW9ucykpKVxuICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gJ3N0cmluZycpIGRhdGFbb3B0aW9uXShfcmVsYXRlZFRhcmdldClcbiAgICAgIGVsc2UgaWYgKG9wdGlvbnMuc2hvdykgZGF0YS5zaG93KF9yZWxhdGVkVGFyZ2V0KVxuICAgIH0pXG4gIH1cblxuICB2YXIgb2xkID0gJC5mbi5tb2RhbFxuXG4gICQuZm4ubW9kYWwgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi5tb2RhbC5Db25zdHJ1Y3RvciA9IE1vZGFsXG5cblxuICAvLyBNT0RBTCBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT09PVxuXG4gICQuZm4ubW9kYWwubm9Db25mbGljdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAkLmZuLm1vZGFsID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gTU9EQUwgREFUQS1BUElcbiAgLy8gPT09PT09PT09PT09PT1cblxuICAkKGRvY3VtZW50KS5vbignY2xpY2suYnMubW9kYWwuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwibW9kYWxcIl0nLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciAkdGhpcyAgID0gJCh0aGlzKVxuICAgIHZhciBocmVmICAgID0gJHRoaXMuYXR0cignaHJlZicpXG4gICAgdmFyICR0YXJnZXQgPSAkKCR0aGlzLmF0dHIoJ2RhdGEtdGFyZ2V0JykgfHwgKGhyZWYgJiYgaHJlZi5yZXBsYWNlKC8uKig/PSNbXlxcc10rJCkvLCAnJykpKSAvLyBzdHJpcCBmb3IgaWU3XG4gICAgdmFyIG9wdGlvbiAgPSAkdGFyZ2V0LmRhdGEoJ2JzLm1vZGFsJykgPyAndG9nZ2xlJyA6ICQuZXh0ZW5kKHsgcmVtb3RlOiAhLyMvLnRlc3QoaHJlZikgJiYgaHJlZiB9LCAkdGFyZ2V0LmRhdGEoKSwgJHRoaXMuZGF0YSgpKVxuXG4gICAgaWYgKCR0aGlzLmlzKCdhJykpIGUucHJldmVudERlZmF1bHQoKVxuXG4gICAgJHRhcmdldC5vbmUoJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoc2hvd0V2ZW50KSB7XG4gICAgICBpZiAoc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSByZXR1cm4gLy8gb25seSByZWdpc3RlciBmb2N1cyByZXN0b3JlciBpZiBtb2RhbCB3aWxsIGFjdHVhbGx5IGdldCBzaG93blxuICAgICAgJHRhcmdldC5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHRoaXMuaXMoJzp2aXNpYmxlJykgJiYgJHRoaXMudHJpZ2dlcignZm9jdXMnKVxuICAgICAgfSlcbiAgICB9KVxuICAgIFBsdWdpbi5jYWxsKCR0YXJnZXQsIG9wdGlvbiwgdGhpcylcbiAgfSlcblxufShqUXVlcnkpOyIsIi8qXG4gICAgIF8gXyAgICAgIF8gICAgICAgX1xuIF9fX3wgKF8pIF9fX3wgfCBfXyAgKF8pX19fXG4vIF9ffCB8IHwvIF9ffCB8LyAvICB8IC8gX198XG5cXF9fIFxcIHwgfCAoX198ICAgPCBfIHwgXFxfXyBcXFxufF9fXy9ffF98XFxfX198X3xcXF8oXykvIHxfX18vXG4gICAgICAgICAgICAgICAgICAgfF9fL1xuXG4gVmVyc2lvbjogMS44LjBcbiAgQXV0aG9yOiBLZW4gV2hlZWxlclxuIFdlYnNpdGU6IGh0dHA6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pb1xuICAgIERvY3M6IGh0dHA6Ly9rZW53aGVlbGVyLmdpdGh1Yi5pby9zbGlja1xuICAgIFJlcG86IGh0dHA6Ly9naXRodWIuY29tL2tlbndoZWVsZXIvc2xpY2tcbiAgSXNzdWVzOiBodHRwOi8vZ2l0aHViLmNvbS9rZW53aGVlbGVyL3NsaWNrL2lzc3Vlc1xuXG4gKi9cbi8qIGdsb2JhbCB3aW5kb3csIGRvY3VtZW50LCBkZWZpbmUsIGpRdWVyeSwgc2V0SW50ZXJ2YWwsIGNsZWFySW50ZXJ2YWwgKi9cbjsoZnVuY3Rpb24oZmFjdG9yeSkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG5cbn0oZnVuY3Rpb24oJCkge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICB2YXIgU2xpY2sgPSB3aW5kb3cuU2xpY2sgfHwge307XG5cbiAgICBTbGljayA9IChmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgaW5zdGFuY2VVaWQgPSAwO1xuXG4gICAgICAgIGZ1bmN0aW9uIFNsaWNrKGVsZW1lbnQsIHNldHRpbmdzKSB7XG5cbiAgICAgICAgICAgIHZhciBfID0gdGhpcywgZGF0YVNldHRpbmdzO1xuXG4gICAgICAgICAgICBfLmRlZmF1bHRzID0ge1xuICAgICAgICAgICAgICAgIGFjY2Vzc2liaWxpdHk6IHRydWUsXG4gICAgICAgICAgICAgICAgYWRhcHRpdmVIZWlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFwcGVuZEFycm93czogJChlbGVtZW50KSxcbiAgICAgICAgICAgICAgICBhcHBlbmREb3RzOiAkKGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgIGFycm93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhc05hdkZvcjogbnVsbCxcbiAgICAgICAgICAgICAgICBwcmV2QXJyb3c6ICc8YnV0dG9uIGNsYXNzPVwic2xpY2stcHJldlwiIGFyaWEtbGFiZWw9XCJQcmV2aW91c1wiIHR5cGU9XCJidXR0b25cIj5QcmV2aW91czwvYnV0dG9uPicsXG4gICAgICAgICAgICAgICAgbmV4dEFycm93OiAnPGJ1dHRvbiBjbGFzcz1cInNsaWNrLW5leHRcIiBhcmlhLWxhYmVsPVwiTmV4dFwiIHR5cGU9XCJidXR0b25cIj5OZXh0PC9idXR0b24+JyxcbiAgICAgICAgICAgICAgICBhdXRvcGxheTogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXlTcGVlZDogMzAwMCxcbiAgICAgICAgICAgICAgICBjZW50ZXJNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjZW50ZXJQYWRkaW5nOiAnNTBweCcsXG4gICAgICAgICAgICAgICAgY3NzRWFzZTogJ2Vhc2UnLFxuICAgICAgICAgICAgICAgIGN1c3RvbVBhZ2luZzogZnVuY3Rpb24oc2xpZGVyLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkKCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAvPicpLnRleHQoaSArIDEpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZG90czogZmFsc2UsXG4gICAgICAgICAgICAgICAgZG90c0NsYXNzOiAnc2xpY2stZG90cycsXG4gICAgICAgICAgICAgICAgZHJhZ2dhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGVhc2luZzogJ2xpbmVhcicsXG4gICAgICAgICAgICAgICAgZWRnZUZyaWN0aW9uOiAwLjM1LFxuICAgICAgICAgICAgICAgIGZhZGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25TZWxlY3Q6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGZvY3VzT25DaGFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGluZmluaXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgICAgICAgICAgICBsYXp5TG9hZDogJ29uZGVtYW5kJyxcbiAgICAgICAgICAgICAgICBtb2JpbGVGaXJzdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlLFxuICAgICAgICAgICAgICAgIHBhdXNlT25Gb2N1czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwYXVzZU9uRG90c0hvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByZXNwb25kVG86ICd3aW5kb3cnLFxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IG51bGwsXG4gICAgICAgICAgICAgICAgcm93czogMSxcbiAgICAgICAgICAgICAgICBydGw6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlOiAnJyxcbiAgICAgICAgICAgICAgICBzbGlkZXNQZXJSb3c6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAxLFxuICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAxLFxuICAgICAgICAgICAgICAgIHNwZWVkOiA1MDAsXG4gICAgICAgICAgICAgICAgc3dpcGU6IHRydWUsXG4gICAgICAgICAgICAgICAgc3dpcGVUb1NsaWRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB0b3VjaE1vdmU6IHRydWUsXG4gICAgICAgICAgICAgICAgdG91Y2hUaHJlc2hvbGQ6IDUsXG4gICAgICAgICAgICAgICAgdXNlQ1NTOiB0cnVlLFxuICAgICAgICAgICAgICAgIHVzZVRyYW5zZm9ybTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB2YXJpYWJsZVdpZHRoOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2ZXJ0aWNhbDogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmVydGljYWxTd2lwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB3YWl0Rm9yQW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IDEwMDBcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIF8uaW5pdGlhbHMgPSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgYXV0b1BsYXlUaW1lcjogbnVsbCxcbiAgICAgICAgICAgICAgICBjdXJyZW50RGlyZWN0aW9uOiAwLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRMZWZ0OiBudWxsLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRTbGlkZTogMCxcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb246IDEsXG4gICAgICAgICAgICAgICAgJGRvdHM6IG51bGwsXG4gICAgICAgICAgICAgICAgbGlzdFdpZHRoOiBudWxsLFxuICAgICAgICAgICAgICAgIGxpc3RIZWlnaHQ6IG51bGwsXG4gICAgICAgICAgICAgICAgbG9hZEluZGV4OiAwLFxuICAgICAgICAgICAgICAgICRuZXh0QXJyb3c6IG51bGwsXG4gICAgICAgICAgICAgICAgJHByZXZBcnJvdzogbnVsbCxcbiAgICAgICAgICAgICAgICBzY3JvbGxpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlQ291bnQ6IG51bGwsXG4gICAgICAgICAgICAgICAgc2xpZGVXaWR0aDogbnVsbCxcbiAgICAgICAgICAgICAgICAkc2xpZGVUcmFjazogbnVsbCxcbiAgICAgICAgICAgICAgICAkc2xpZGVzOiBudWxsLFxuICAgICAgICAgICAgICAgIHNsaWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0OiAwLFxuICAgICAgICAgICAgICAgIHN3aXBlTGVmdDogbnVsbCxcbiAgICAgICAgICAgICAgICBzd2lwaW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAkbGlzdDogbnVsbCxcbiAgICAgICAgICAgICAgICB0b3VjaE9iamVjdDoge30sXG4gICAgICAgICAgICAgICAgdHJhbnNmb3Jtc0VuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHVuc2xpY2tlZDogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICQuZXh0ZW5kKF8sIF8uaW5pdGlhbHMpO1xuXG4gICAgICAgICAgICBfLmFjdGl2ZUJyZWFrcG9pbnQgPSBudWxsO1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9IG51bGw7XG4gICAgICAgICAgICBfLmFuaW1Qcm9wID0gbnVsbDtcbiAgICAgICAgICAgIF8uYnJlYWtwb2ludHMgPSBbXTtcbiAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzID0gW107XG4gICAgICAgICAgICBfLmNzc1RyYW5zaXRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICBfLmZvY3Vzc2VkID0gZmFsc2U7XG4gICAgICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG4gICAgICAgICAgICBfLmhpZGRlbiA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgXy5wYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgXy5wb3NpdGlvblByb3AgPSBudWxsO1xuICAgICAgICAgICAgXy5yZXNwb25kVG8gPSBudWxsO1xuICAgICAgICAgICAgXy5yb3dDb3VudCA9IDE7XG4gICAgICAgICAgICBfLnNob3VsZENsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIF8uJHNsaWRlciA9ICQoZWxlbWVudCk7XG4gICAgICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IG51bGw7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSBudWxsO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9IG51bGw7XG4gICAgICAgICAgICBfLnZpc2liaWxpdHlDaGFuZ2UgPSAndmlzaWJpbGl0eWNoYW5nZSc7XG4gICAgICAgICAgICBfLndpbmRvd1dpZHRoID0gMDtcbiAgICAgICAgICAgIF8ud2luZG93VGltZXIgPSBudWxsO1xuXG4gICAgICAgICAgICBkYXRhU2V0dGluZ3MgPSAkKGVsZW1lbnQpLmRhdGEoJ3NsaWNrJykgfHwge307XG5cbiAgICAgICAgICAgIF8ub3B0aW9ucyA9ICQuZXh0ZW5kKHt9LCBfLmRlZmF1bHRzLCBzZXR0aW5ncywgZGF0YVNldHRpbmdzKTtcblxuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSBfLm9wdGlvbnMuaW5pdGlhbFNsaWRlO1xuXG4gICAgICAgICAgICBfLm9yaWdpbmFsU2V0dGluZ3MgPSBfLm9wdGlvbnM7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIF8uaGlkZGVuID0gJ21vekhpZGRlbic7XG4gICAgICAgICAgICAgICAgXy52aXNpYmlsaXR5Q2hhbmdlID0gJ21venZpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQud2Via2l0SGlkZGVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIF8uaGlkZGVuID0gJ3dlYmtpdEhpZGRlbic7XG4gICAgICAgICAgICAgICAgXy52aXNpYmlsaXR5Q2hhbmdlID0gJ3dlYmtpdHZpc2liaWxpdHljaGFuZ2UnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLmF1dG9QbGF5ID0gJC5wcm94eShfLmF1dG9QbGF5LCBfKTtcbiAgICAgICAgICAgIF8uYXV0b1BsYXlDbGVhciA9ICQucHJveHkoXy5hdXRvUGxheUNsZWFyLCBfKTtcbiAgICAgICAgICAgIF8uYXV0b1BsYXlJdGVyYXRvciA9ICQucHJveHkoXy5hdXRvUGxheUl0ZXJhdG9yLCBfKTtcbiAgICAgICAgICAgIF8uY2hhbmdlU2xpZGUgPSAkLnByb3h5KF8uY2hhbmdlU2xpZGUsIF8pO1xuICAgICAgICAgICAgXy5jbGlja0hhbmRsZXIgPSAkLnByb3h5KF8uY2xpY2tIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8uc2VsZWN0SGFuZGxlciA9ICQucHJveHkoXy5zZWxlY3RIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8uc2V0UG9zaXRpb24gPSAkLnByb3h5KF8uc2V0UG9zaXRpb24sIF8pO1xuICAgICAgICAgICAgXy5zd2lwZUhhbmRsZXIgPSAkLnByb3h5KF8uc3dpcGVIYW5kbGVyLCBfKTtcbiAgICAgICAgICAgIF8uZHJhZ0hhbmRsZXIgPSAkLnByb3h5KF8uZHJhZ0hhbmRsZXIsIF8pO1xuICAgICAgICAgICAgXy5rZXlIYW5kbGVyID0gJC5wcm94eShfLmtleUhhbmRsZXIsIF8pO1xuXG4gICAgICAgICAgICBfLmluc3RhbmNlVWlkID0gaW5zdGFuY2VVaWQrKztcblxuICAgICAgICAgICAgLy8gQSBzaW1wbGUgd2F5IHRvIGNoZWNrIGZvciBIVE1MIHN0cmluZ3NcbiAgICAgICAgICAgIC8vIFN0cmljdCBIVE1MIHJlY29nbml0aW9uIChtdXN0IHN0YXJ0IHdpdGggPClcbiAgICAgICAgICAgIC8vIEV4dHJhY3RlZCBmcm9tIGpRdWVyeSB2MS4xMSBzb3VyY2VcbiAgICAgICAgICAgIF8uaHRtbEV4cHIgPSAvXig/OlxccyooPFtcXHdcXFddKz4pW14+XSopJC87XG5cblxuICAgICAgICAgICAgXy5yZWdpc3RlckJyZWFrcG9pbnRzKCk7XG4gICAgICAgICAgICBfLmluaXQodHJ1ZSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBTbGljaztcblxuICAgIH0oKSk7XG5cbiAgICBTbGljay5wcm90b3R5cGUuYWN0aXZhdGVBREEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suZmluZCgnLnNsaWNrLWFjdGl2ZScpLmF0dHIoe1xuICAgICAgICAgICAgJ2FyaWEtaGlkZGVuJzogJ2ZhbHNlJ1xuICAgICAgICB9KS5maW5kKCdhLCBpbnB1dCwgYnV0dG9uLCBzZWxlY3QnKS5hdHRyKHtcbiAgICAgICAgICAgICd0YWJpbmRleCc6ICcwJ1xuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYWRkU2xpZGUgPSBTbGljay5wcm90b3R5cGUuc2xpY2tBZGQgPSBmdW5jdGlvbihtYXJrdXAsIGluZGV4LCBhZGRCZWZvcmUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHR5cGVvZihpbmRleCkgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgYWRkQmVmb3JlID0gaW5kZXg7XG4gICAgICAgICAgICBpbmRleCA9IG51bGw7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPCAwIHx8IChpbmRleCA+PSBfLnNsaWRlQ291bnQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBfLnVubG9hZCgpO1xuXG4gICAgICAgIGlmICh0eXBlb2YoaW5kZXgpID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwICYmIF8uJHNsaWRlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFkZEJlZm9yZSkge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5pbnNlcnRCZWZvcmUoXy4kc2xpZGVzLmVxKGluZGV4KSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQobWFya3VwKS5pbnNlcnRBZnRlcihfLiRzbGlkZXMuZXEoaW5kZXgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhZGRCZWZvcmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkucHJlcGVuZFRvKF8uJHNsaWRlVHJhY2spO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKG1hcmt1cCkuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXMgPSBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suYXBwZW5kKF8uJHNsaWRlcyk7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudCkuYXR0cignZGF0YS1zbGljay1pbmRleCcsIGluZGV4KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVzQ2FjaGUgPSBfLiRzbGlkZXM7XG5cbiAgICAgICAgXy5yZWluaXQoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYW5pbWF0ZUhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXM7XG4gICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09PSAxICYmIF8ub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gXy4kc2xpZGVzLmVxKF8uY3VycmVudFNsaWRlKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgIF8uJGxpc3QuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0YXJnZXRIZWlnaHRcbiAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmFuaW1hdGVTbGlkZSA9IGZ1bmN0aW9uKHRhcmdldExlZnQsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgdmFyIGFuaW1Qcm9wcyA9IHt9LFxuICAgICAgICAgICAgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5hbmltYXRlSGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUgJiYgXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IC10YXJnZXRMZWZ0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChfLnRyYW5zZm9ybXNFbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB0YXJnZXRMZWZ0XG4gICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkLCBfLm9wdGlvbnMuZWFzaW5nLCBjYWxsYmFjayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogdGFyZ2V0TGVmdFxuICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCwgXy5vcHRpb25zLmVhc2luZywgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMucnRsID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uY3VycmVudExlZnQgPSAtKF8uY3VycmVudExlZnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbVN0YXJ0OiBfLmN1cnJlbnRMZWZ0XG4gICAgICAgICAgICAgICAgfSkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1TdGFydDogdGFyZ2V0TGVmdFxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IF8ub3B0aW9ucy5zcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiBfLm9wdGlvbnMuZWFzaW5nLFxuICAgICAgICAgICAgICAgICAgICBzdGVwOiBmdW5jdGlvbihub3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vdyA9IE1hdGguY2VpbChub3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlKCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3cgKyAncHgsIDBweCknO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKGFuaW1Qcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUoMHB4LCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3cgKyAncHgpJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhhbmltUHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIF8uYXBwbHlUcmFuc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IE1hdGguY2VpbCh0YXJnZXRMZWZ0KTtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGFuaW1Qcm9wc1tfLmFuaW1UeXBlXSA9ICd0cmFuc2xhdGUzZCgnICsgdGFyZ2V0TGVmdCArICdweCwgMHB4LCAwcHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhbmltUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlM2QoMHB4LCcgKyB0YXJnZXRMZWZ0ICsgJ3B4LCAwcHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MoYW5pbVByb3BzKTtcblxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBfLmRpc2FibGVUcmFuc2l0aW9uKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgXy5vcHRpb25zLnNwZWVkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldE5hdlRhcmdldCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGFzTmF2Rm9yID0gXy5vcHRpb25zLmFzTmF2Rm9yO1xuXG4gICAgICAgIGlmICggYXNOYXZGb3IgJiYgYXNOYXZGb3IgIT09IG51bGwgKSB7XG4gICAgICAgICAgICBhc05hdkZvciA9ICQoYXNOYXZGb3IpLm5vdChfLiRzbGlkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFzTmF2Rm9yO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5hc05hdkZvciA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYXNOYXZGb3IgPSBfLmdldE5hdlRhcmdldCgpO1xuXG4gICAgICAgIGlmICggYXNOYXZGb3IgIT09IG51bGwgJiYgdHlwZW9mIGFzTmF2Rm9yID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgICAgIGFzTmF2Rm9yLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuc2xpY2soJ2dldFNsaWNrJyk7XG4gICAgICAgICAgICAgICAgaWYoIXRhcmdldC51bnNsaWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnNsaWRlSGFuZGxlcihpbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXBwbHlUcmFuc2l0aW9uID0gZnVuY3Rpb24oc2xpZGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0cmFuc2l0aW9uID0ge307XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdHJhbnNpdGlvbltfLnRyYW5zaXRpb25UeXBlXSA9IF8udHJhbnNmb3JtVHlwZSArICcgJyArIF8ub3B0aW9ucy5zcGVlZCArICdtcyAnICsgXy5vcHRpb25zLmNzc0Vhc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uW18udHJhbnNpdGlvblR5cGVdID0gJ29wYWNpdHkgJyArIF8ub3B0aW9ucy5zcGVlZCArICdtcyAnICsgXy5vcHRpb25zLmNzc0Vhc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyh0cmFuc2l0aW9uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZSkuY3NzKHRyYW5zaXRpb24pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmF1dG9QbGF5ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uYXV0b1BsYXlDbGVhcigpO1xuXG4gICAgICAgIGlmICggXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyApIHtcbiAgICAgICAgICAgIF8uYXV0b1BsYXlUaW1lciA9IHNldEludGVydmFsKCBfLmF1dG9QbGF5SXRlcmF0b3IsIF8ub3B0aW9ucy5hdXRvcGxheVNwZWVkICk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXV0b1BsYXlDbGVhciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5hdXRvUGxheVRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKF8uYXV0b1BsYXlUaW1lcik7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYXV0b1BsYXlJdGVyYXRvciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHNsaWRlVG8gPSBfLmN1cnJlbnRTbGlkZSArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICBpZiAoICFfLnBhdXNlZCAmJiAhXy5pbnRlcnJ1cHRlZCAmJiAhXy5mb2N1c3NlZCApIHtcblxuICAgICAgICAgICAgaWYgKCBfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlICkge1xuXG4gICAgICAgICAgICAgICAgaWYgKCBfLmRpcmVjdGlvbiA9PT0gMSAmJiAoIF8uY3VycmVudFNsaWRlICsgMSApID09PSAoIF8uc2xpZGVDb3VudCAtIDEgKSkge1xuICAgICAgICAgICAgICAgICAgICBfLmRpcmVjdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIF8uZGlyZWN0aW9uID09PSAwICkge1xuXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlVG8gPSBfLmN1cnJlbnRTbGlkZSAtIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoIF8uY3VycmVudFNsaWRlIC0gMSA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uc2xpZGVIYW5kbGVyKCBzbGlkZVRvICk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZEFycm93cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSApIHtcblxuICAgICAgICAgICAgXy4kcHJldkFycm93ID0gJChfLm9wdGlvbnMucHJldkFycm93KS5hZGRDbGFzcygnc2xpY2stYXJyb3cnKTtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdyA9ICQoXy5vcHRpb25zLm5leHRBcnJvdykuYWRkQ2xhc3MoJ3NsaWNrLWFycm93Jyk7XG5cbiAgICAgICAgICAgIGlmKCBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuXG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZUNsYXNzKCdzbGljay1oaWRkZW4nKS5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbiB0YWJpbmRleCcpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2staGlkZGVuJykucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gdGFiaW5kZXgnKTtcblxuICAgICAgICAgICAgICAgIGlmIChfLmh0bWxFeHByLnRlc3QoXy5vcHRpb25zLnByZXZBcnJvdykpIHtcbiAgICAgICAgICAgICAgICAgICAgXy4kcHJldkFycm93LnByZXBlbmRUbyhfLm9wdGlvbnMuYXBwZW5kQXJyb3dzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5odG1sRXhwci50ZXN0KF8ub3B0aW9ucy5uZXh0QXJyb3cpKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5hcHBlbmRUbyhfLm9wdGlvbnMuYXBwZW5kQXJyb3dzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvd1xuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93LmFkZCggXy4kbmV4dEFycm93IClcblxuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdhcmlhLWRpc2FibGVkJzogJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGREb3RzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgaSwgZG90O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stZG90dGVkJyk7XG5cbiAgICAgICAgICAgIGRvdCA9ICQoJzx1bCAvPicpLmFkZENsYXNzKF8ub3B0aW9ucy5kb3RzQ2xhc3MpO1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDw9IF8uZ2V0RG90Q291bnQoKTsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgZG90LmFwcGVuZCgkKCc8bGkgLz4nKS5hcHBlbmQoXy5vcHRpb25zLmN1c3RvbVBhZ2luZy5jYWxsKHRoaXMsIF8sIGkpKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uJGRvdHMgPSBkb3QuYXBwZW5kVG8oXy5vcHRpb25zLmFwcGVuZERvdHMpO1xuXG4gICAgICAgICAgICBfLiRkb3RzLmZpbmQoJ2xpJykuZmlyc3QoKS5hZGRDbGFzcygnc2xpY2stYWN0aXZlJyk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5idWlsZE91dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLiRzbGlkZXMgPVxuICAgICAgICAgICAgXy4kc2xpZGVyXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKCBfLm9wdGlvbnMuc2xpZGUgKyAnOm5vdCguc2xpY2stY2xvbmVkKScpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1zbGlkZScpO1xuXG4gICAgICAgIF8uc2xpZGVDb3VudCA9IF8uJHNsaWRlcy5sZW5ndGg7XG5cbiAgICAgICAgXy4kc2xpZGVzLmVhY2goZnVuY3Rpb24oaW5kZXgsIGVsZW1lbnQpIHtcbiAgICAgICAgICAgICQoZWxlbWVudClcbiAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zbGljay1pbmRleCcsIGluZGV4KVxuICAgICAgICAgICAgICAgIC5kYXRhKCdvcmlnaW5hbFN0eWxpbmcnLCAkKGVsZW1lbnQpLmF0dHIoJ3N0eWxlJykgfHwgJycpO1xuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlcicpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2sgPSAoXy5zbGlkZUNvdW50ID09PSAwKSA/XG4gICAgICAgICAgICAkKCc8ZGl2IGNsYXNzPVwic2xpY2stdHJhY2tcIi8+JykuYXBwZW5kVG8oXy4kc2xpZGVyKSA6XG4gICAgICAgICAgICBfLiRzbGlkZXMud3JhcEFsbCgnPGRpdiBjbGFzcz1cInNsaWNrLXRyYWNrXCIvPicpLnBhcmVudCgpO1xuXG4gICAgICAgIF8uJGxpc3QgPSBfLiRzbGlkZVRyYWNrLndyYXAoXG4gICAgICAgICAgICAnPGRpdiBjbGFzcz1cInNsaWNrLWxpc3RcIi8+JykucGFyZW50KCk7XG4gICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKCdvcGFjaXR5JywgMCk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlIHx8IF8ub3B0aW9ucy5zd2lwZVRvU2xpZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA9IDE7XG4gICAgICAgIH1cblxuICAgICAgICAkKCdpbWdbZGF0YS1sYXp5XScsIF8uJHNsaWRlcikubm90KCdbc3JjXScpLmFkZENsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgXy5zZXR1cEluZmluaXRlKCk7XG5cbiAgICAgICAgXy5idWlsZEFycm93cygpO1xuXG4gICAgICAgIF8uYnVpbGREb3RzKCk7XG5cbiAgICAgICAgXy51cGRhdGVEb3RzKCk7XG5cblxuICAgICAgICBfLnNldFNsaWRlQ2xhc3Nlcyh0eXBlb2YgXy5jdXJyZW50U2xpZGUgPT09ICdudW1iZXInID8gXy5jdXJyZW50U2xpZGUgOiAwKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRyYWdnYWJsZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kbGlzdC5hZGRDbGFzcygnZHJhZ2dhYmxlJyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuYnVpbGRSb3dzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBhLCBiLCBjLCBuZXdTbGlkZXMsIG51bU9mU2xpZGVzLCBvcmlnaW5hbFNsaWRlcyxzbGlkZXNQZXJTZWN0aW9uO1xuXG4gICAgICAgIG5ld1NsaWRlcyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgb3JpZ2luYWxTbGlkZXMgPSBfLiRzbGlkZXIuY2hpbGRyZW4oKTtcblxuICAgICAgICBpZihfLm9wdGlvbnMucm93cyA+IDApIHtcblxuICAgICAgICAgICAgc2xpZGVzUGVyU2VjdGlvbiA9IF8ub3B0aW9ucy5zbGlkZXNQZXJSb3cgKiBfLm9wdGlvbnMucm93cztcbiAgICAgICAgICAgIG51bU9mU2xpZGVzID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsU2xpZGVzLmxlbmd0aCAvIHNsaWRlc1BlclNlY3Rpb25cbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIGZvcihhID0gMDsgYSA8IG51bU9mU2xpZGVzOyBhKyspe1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGZvcihiID0gMDsgYiA8IF8ub3B0aW9ucy5yb3dzOyBiKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBmb3IoYyA9IDA7IGMgPCBfLm9wdGlvbnMuc2xpZGVzUGVyUm93OyBjKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAoYSAqIHNsaWRlc1BlclNlY3Rpb24gKyAoKGIgKiBfLm9wdGlvbnMuc2xpZGVzUGVyUm93KSArIGMpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcmlnaW5hbFNsaWRlcy5nZXQodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5hcHBlbmRDaGlsZChvcmlnaW5hbFNsaWRlcy5nZXQodGFyZ2V0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3U2xpZGVzLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy4kc2xpZGVyLmVtcHR5KCkuYXBwZW5kKG5ld1NsaWRlcyk7XG4gICAgICAgICAgICBfLiRzbGlkZXIuY2hpbGRyZW4oKS5jaGlsZHJlbigpLmNoaWxkcmVuKClcbiAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgJ3dpZHRoJzooMTAwIC8gXy5vcHRpb25zLnNsaWRlc1BlclJvdykgKyAnJScsXG4gICAgICAgICAgICAgICAgICAgICdkaXNwbGF5JzogJ2lubGluZS1ibG9jaydcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmNoZWNrUmVzcG9uc2l2ZSA9IGZ1bmN0aW9uKGluaXRpYWwsIGZvcmNlVXBkYXRlKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgYnJlYWtwb2ludCwgdGFyZ2V0QnJlYWtwb2ludCwgcmVzcG9uZFRvV2lkdGgsIHRyaWdnZXJCcmVha3BvaW50ID0gZmFsc2U7XG4gICAgICAgIHZhciBzbGlkZXJXaWR0aCA9IF8uJHNsaWRlci53aWR0aCgpO1xuICAgICAgICB2YXIgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCAkKHdpbmRvdykud2lkdGgoKTtcblxuICAgICAgICBpZiAoXy5yZXNwb25kVG8gPT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgICByZXNwb25kVG9XaWR0aCA9IHdpbmRvd1dpZHRoO1xuICAgICAgICB9IGVsc2UgaWYgKF8ucmVzcG9uZFRvID09PSAnc2xpZGVyJykge1xuICAgICAgICAgICAgcmVzcG9uZFRvV2lkdGggPSBzbGlkZXJXaWR0aDtcbiAgICAgICAgfSBlbHNlIGlmIChfLnJlc3BvbmRUbyA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgIHJlc3BvbmRUb1dpZHRoID0gTWF0aC5taW4od2luZG93V2lkdGgsIHNsaWRlcldpZHRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy5vcHRpb25zLnJlc3BvbnNpdmUgJiZcbiAgICAgICAgICAgIF8ub3B0aW9ucy5yZXNwb25zaXZlLmxlbmd0aCAmJlxuICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludCA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvciAoYnJlYWtwb2ludCBpbiBfLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF8uYnJlYWtwb2ludHMuaGFzT3duUHJvcGVydHkoYnJlYWtwb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3JpZ2luYWxTZXR0aW5ncy5tb2JpbGVGaXJzdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25kVG9XaWR0aCA8IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gXy5icmVha3BvaW50c1ticmVha3BvaW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25kVG9XaWR0aCA+IF8uYnJlYWtwb2ludHNbYnJlYWtwb2ludF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50ID0gXy5icmVha3BvaW50c1ticmVha3BvaW50XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRhcmdldEJyZWFrcG9pbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5hY3RpdmVCcmVha3BvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRCcmVha3BvaW50ICE9PSBfLmFjdGl2ZUJyZWFrcG9pbnQgfHwgZm9yY2VVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfLmJyZWFrcG9pbnRTZXR0aW5nc1t0YXJnZXRCcmVha3BvaW50XSA9PT0gJ3Vuc2xpY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy51bnNsaWNrKHRhcmdldEJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5vcmlnaW5hbFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5nc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8ub3B0aW9ucy5pbml0aWFsU2xpZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfLmJyZWFrcG9pbnRTZXR0aW5nc1t0YXJnZXRCcmVha3BvaW50XSA9PT0gJ3Vuc2xpY2snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnVuc2xpY2sodGFyZ2V0QnJlYWtwb2ludCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMgPSAkLmV4dGVuZCh7fSwgXy5vcmlnaW5hbFNldHRpbmdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludFNldHRpbmdzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRCcmVha3BvaW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW5pdGlhbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucmVmcmVzaChpbml0aWFsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQnJlYWtwb2ludCA9IHRhcmdldEJyZWFrcG9pbnQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5hY3RpdmVCcmVha3BvaW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYWN0aXZlQnJlYWtwb2ludCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIF8ub3B0aW9ucyA9IF8ub3JpZ2luYWxTZXR0aW5ncztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluaXRpYWwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlID0gXy5vcHRpb25zLmluaXRpYWxTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfLnJlZnJlc2goaW5pdGlhbCk7XG4gICAgICAgICAgICAgICAgICAgIHRyaWdnZXJCcmVha3BvaW50ID0gdGFyZ2V0QnJlYWtwb2ludDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIG9ubHkgdHJpZ2dlciBicmVha3BvaW50cyBkdXJpbmcgYW4gYWN0dWFsIGJyZWFrLiBub3Qgb24gaW5pdGlhbGl6ZS5cbiAgICAgICAgICAgIGlmKCAhaW5pdGlhbCAmJiB0cmlnZ2VyQnJlYWtwb2ludCAhPT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2JyZWFrcG9pbnQnLCBbXywgdHJpZ2dlckJyZWFrcG9pbnRdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jaGFuZ2VTbGlkZSA9IGZ1bmN0aW9uKGV2ZW50LCBkb250QW5pbWF0ZSkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgICR0YXJnZXQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLFxuICAgICAgICAgICAgaW5kZXhPZmZzZXQsIHNsaWRlT2Zmc2V0LCB1bmV2ZW5PZmZzZXQ7XG5cbiAgICAgICAgLy8gSWYgdGFyZ2V0IGlzIGEgbGluaywgcHJldmVudCBkZWZhdWx0IGFjdGlvbi5cbiAgICAgICAgaWYoJHRhcmdldC5pcygnYScpKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGFyZ2V0IGlzIG5vdCB0aGUgPGxpPiBlbGVtZW50IChpZTogYSBjaGlsZCksIGZpbmQgdGhlIDxsaT4uXG4gICAgICAgIGlmKCEkdGFyZ2V0LmlzKCdsaScpKSB7XG4gICAgICAgICAgICAkdGFyZ2V0ID0gJHRhcmdldC5jbG9zZXN0KCdsaScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdW5ldmVuT2Zmc2V0ID0gKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCk7XG4gICAgICAgIGluZGV4T2Zmc2V0ID0gdW5ldmVuT2Zmc2V0ID8gMCA6IChfLnNsaWRlQ291bnQgLSBfLmN1cnJlbnRTbGlkZSkgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5kYXRhLm1lc3NhZ2UpIHtcblxuICAgICAgICAgICAgY2FzZSAncHJldmlvdXMnOlxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0ID0gaW5kZXhPZmZzZXQgPT09IDAgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC0gaW5kZXhPZmZzZXQ7XG4gICAgICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoXy5jdXJyZW50U2xpZGUgLSBzbGlkZU9mZnNldCwgZmFsc2UsIGRvbnRBbmltYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ25leHQnOlxuICAgICAgICAgICAgICAgIHNsaWRlT2Zmc2V0ID0gaW5kZXhPZmZzZXQgPT09IDAgPyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgOiBpbmRleE9mZnNldDtcbiAgICAgICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmN1cnJlbnRTbGlkZSArIHNsaWRlT2Zmc2V0LCBmYWxzZSwgZG9udEFuaW1hdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnaW5kZXgnOlxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGV2ZW50LmRhdGEuaW5kZXggPT09IDAgPyAwIDpcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleCB8fCAkdGFyZ2V0LmluZGV4KCkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG5cbiAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihfLmNoZWNrTmF2aWdhYmxlKGluZGV4KSwgZmFsc2UsIGRvbnRBbmltYXRlKTtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LmNoaWxkcmVuKCkudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2hlY2tOYXZpZ2FibGUgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIG5hdmlnYWJsZXMsIHByZXZOYXZpZ2FibGU7XG5cbiAgICAgICAgbmF2aWdhYmxlcyA9IF8uZ2V0TmF2aWdhYmxlSW5kZXhlcygpO1xuICAgICAgICBwcmV2TmF2aWdhYmxlID0gMDtcbiAgICAgICAgaWYgKGluZGV4ID4gbmF2aWdhYmxlc1tuYXZpZ2FibGVzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBpbmRleCA9IG5hdmlnYWJsZXNbbmF2aWdhYmxlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIG4gaW4gbmF2aWdhYmxlcykge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IG5hdmlnYWJsZXNbbl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBwcmV2TmF2aWdhYmxlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldk5hdmlnYWJsZSA9IG5hdmlnYWJsZXNbbl07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGVhblVwRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZG90cyAmJiBfLiRkb3RzICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgICQoJ2xpJywgXy4kZG90cylcbiAgICAgICAgICAgICAgICAub2ZmKCdjbGljay5zbGljaycsIF8uY2hhbmdlU2xpZGUpXG4gICAgICAgICAgICAgICAgLm9mZignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKVxuICAgICAgICAgICAgICAgIC5vZmYoJ21vdXNlbGVhdmUuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCBmYWxzZSkpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRkb3RzLm9mZigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIub2ZmKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJyk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy4kcHJldkFycm93ICYmIF8uJHByZXZBcnJvdy5vZmYoJ2NsaWNrLnNsaWNrJywgXy5jaGFuZ2VTbGlkZSk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cgJiYgXy4kbmV4dEFycm93Lm9mZignY2xpY2suc2xpY2snLCBfLmNoYW5nZVNsaWRlKTtcblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy4kcHJldkFycm93ICYmIF8uJHByZXZBcnJvdy5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdyAmJiBfLiRuZXh0QXJyb3cub2ZmKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaHN0YXJ0LnNsaWNrIG1vdXNlZG93bi5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcbiAgICAgICAgXy4kbGlzdC5vZmYoJ3RvdWNobW92ZS5zbGljayBtb3VzZW1vdmUuc2xpY2snLCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCd0b3VjaGVuZC5zbGljayBtb3VzZXVwLnNsaWNrJywgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9mZigndG91Y2hjYW5jZWwuc2xpY2sgbW91c2VsZWF2ZS5zbGljaycsIF8uc3dpcGVIYW5kbGVyKTtcblxuICAgICAgICBfLiRsaXN0Lm9mZignY2xpY2suc2xpY2snLCBfLmNsaWNrSGFuZGxlcik7XG5cbiAgICAgICAgJChkb2N1bWVudCkub2ZmKF8udmlzaWJpbGl0eUNoYW5nZSwgXy52aXNpYmlsaXR5KTtcblxuICAgICAgICBfLmNsZWFuVXBTbGlkZUV2ZW50cygpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kbGlzdC5vZmYoJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub2ZmKCdjbGljay5zbGljaycsIF8uc2VsZWN0SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAkKHdpbmRvdykub2ZmKCdvcmllbnRhdGlvbmNoYW5nZS5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5vcmllbnRhdGlvbkNoYW5nZSk7XG5cbiAgICAgICAgJCh3aW5kb3cpLm9mZigncmVzaXplLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCBfLnJlc2l6ZSk7XG5cbiAgICAgICAgJCgnW2RyYWdnYWJsZSE9dHJ1ZV0nLCBfLiRzbGlkZVRyYWNrKS5vZmYoJ2RyYWdzdGFydCcsIF8ucHJldmVudERlZmF1bHQpO1xuXG4gICAgICAgICQod2luZG93KS5vZmYoJ2xvYWQuc2xpY2suc2xpY2stJyArIF8uaW5zdGFuY2VVaWQsIF8uc2V0UG9zaXRpb24pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5jbGVhblVwU2xpZGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kbGlzdC5vZmYoJ21vdXNlZW50ZXIuc2xpY2snLCAkLnByb3h5KF8uaW50ZXJydXB0LCBfLCB0cnVlKSk7XG4gICAgICAgIF8uJGxpc3Qub2ZmKCdtb3VzZWxlYXZlLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgZmFsc2UpKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2xlYW5VcFJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsIG9yaWdpbmFsU2xpZGVzO1xuXG4gICAgICAgIGlmKF8ub3B0aW9ucy5yb3dzID4gMCkge1xuICAgICAgICAgICAgb3JpZ2luYWxTbGlkZXMgPSBfLiRzbGlkZXMuY2hpbGRyZW4oKS5jaGlsZHJlbigpO1xuICAgICAgICAgICAgb3JpZ2luYWxTbGlkZXMucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIF8uJHNsaWRlci5lbXB0eSgpLmFwcGVuZChvcmlnaW5hbFNsaWRlcyk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuY2xpY2tIYW5kbGVyID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uc2hvdWxkQ2xpY2sgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24ocmVmcmVzaCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5Q2xlYXIoKTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0ID0ge307XG5cbiAgICAgICAgXy5jbGVhblVwRXZlbnRzKCk7XG5cbiAgICAgICAgJCgnLnNsaWNrLWNsb25lZCcsIF8uJHNsaWRlcikuZGV0YWNoKCk7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMpIHtcbiAgICAgICAgICAgIF8uJGRvdHMucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8uJHByZXZBcnJvdyAmJiBfLiRwcmV2QXJyb3cubGVuZ3RoICkge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3dcbiAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkIHNsaWNrLWFycm93IHNsaWNrLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2FyaWEtaGlkZGVuIGFyaWEtZGlzYWJsZWQgdGFiaW5kZXgnKVxuICAgICAgICAgICAgICAgIC5jc3MoJ2Rpc3BsYXknLCcnKTtcblxuICAgICAgICAgICAgaWYgKCBfLmh0bWxFeHByLnRlc3QoIF8ub3B0aW9ucy5wcmV2QXJyb3cgKSkge1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy4kbmV4dEFycm93ICYmIF8uJG5leHRBcnJvdy5sZW5ndGggKSB7XG5cbiAgICAgICAgICAgIF8uJG5leHRBcnJvd1xuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQgc2xpY2stYXJyb3cgc2xpY2staGlkZGVuJylcbiAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignYXJpYS1oaWRkZW4gYXJpYS1kaXNhYmxlZCB0YWJpbmRleCcpXG4gICAgICAgICAgICAgICAgLmNzcygnZGlzcGxheScsJycpO1xuXG4gICAgICAgICAgICBpZiAoIF8uaHRtbEV4cHIudGVzdCggXy5vcHRpb25zLm5leHRBcnJvdyApKSB7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBpZiAoXy4kc2xpZGVzKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stc2xpZGUgc2xpY2stYWN0aXZlIHNsaWNrLWNlbnRlciBzbGljay12aXNpYmxlIHNsaWNrLWN1cnJlbnQnKVxuICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdhcmlhLWhpZGRlbicpXG4gICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtc2xpY2staW5kZXgnKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignc3R5bGUnLCAkKHRoaXMpLmRhdGEoJ29yaWdpbmFsU3R5bGluZycpKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRsaXN0LmRldGFjaCgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIuYXBwZW5kKF8uJHNsaWRlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBfLmNsZWFuVXBSb3dzKCk7XG5cbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1zbGlkZXInKTtcbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1pbml0aWFsaXplZCcpO1xuICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRvdHRlZCcpO1xuXG4gICAgICAgIF8udW5zbGlja2VkID0gdHJ1ZTtcblxuICAgICAgICBpZighcmVmcmVzaCkge1xuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2Rlc3Ryb3knLCBbX10pO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmRpc2FibGVUcmFuc2l0aW9uID0gZnVuY3Rpb24oc2xpZGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0cmFuc2l0aW9uID0ge307XG5cbiAgICAgICAgdHJhbnNpdGlvbltfLnRyYW5zaXRpb25UeXBlXSA9ICcnO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHRyYW5zaXRpb24pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlKS5jc3ModHJhbnNpdGlvbik7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZmFkZVNsaWRlID0gZnVuY3Rpb24oc2xpZGVJbmRleCwgY2FsbGJhY2spIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uY3NzVHJhbnNpdGlvbnMgPT09IGZhbHNlKSB7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5jc3Moe1xuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlcy5lcShzbGlkZUluZGV4KS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcsIGNhbGxiYWNrKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBfLmFwcGx5VHJhbnNpdGlvbihzbGlkZUluZGV4KTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKHNsaWRlSW5kZXgpLmNzcyh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgIF8uZGlzYWJsZVRyYW5zaXRpb24oc2xpZGVJbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCgpO1xuICAgICAgICAgICAgICAgIH0sIF8ub3B0aW9ucy5zcGVlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5mYWRlU2xpZGVPdXQgPSBmdW5jdGlvbihzbGlkZUluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyXG4gICAgICAgICAgICB9LCBfLm9wdGlvbnMuc3BlZWQsIF8ub3B0aW9ucy5lYXNpbmcpO1xuXG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIF8uYXBwbHlUcmFuc2l0aW9uKHNsaWRlSW5kZXgpO1xuXG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoc2xpZGVJbmRleCkuY3NzKHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgIHpJbmRleDogXy5vcHRpb25zLnpJbmRleCAtIDJcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZmlsdGVyU2xpZGVzID0gU2xpY2sucHJvdG90eXBlLnNsaWNrRmlsdGVyID0gZnVuY3Rpb24oZmlsdGVyKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChmaWx0ZXIgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUgPSBfLiRzbGlkZXM7XG5cbiAgICAgICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUuZmlsdGVyKGZpbHRlcikuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG5cbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5mb2N1c0hhbmRsZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy4kc2xpZGVyXG4gICAgICAgICAgICAub2ZmKCdmb2N1cy5zbGljayBibHVyLnNsaWNrJylcbiAgICAgICAgICAgIC5vbignZm9jdXMuc2xpY2sgYmx1ci5zbGljaycsICcqJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAgICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB2YXIgJHNmID0gJCh0aGlzKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMucGF1c2VPbkZvY3VzICkge1xuICAgICAgICAgICAgICAgICAgICBfLmZvY3Vzc2VkID0gJHNmLmlzKCc6Zm9jdXMnKTtcbiAgICAgICAgICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSwgMCk7XG5cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRDdXJyZW50ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrQ3VycmVudFNsaWRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuICAgICAgICByZXR1cm4gXy5jdXJyZW50U2xpZGU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldERvdENvdW50ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIHZhciBicmVha1BvaW50ID0gMDtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICB2YXIgcGFnZXJRdHkgPSAwO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgICArK3BhZ2VyUXR5O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgICAgICArK3BhZ2VyUXR5O1xuICAgICAgICAgICAgICAgICAgICBicmVha1BvaW50ID0gY291bnRlciArIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbDtcbiAgICAgICAgICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBwYWdlclF0eSA9IF8uc2xpZGVDb3VudDtcbiAgICAgICAgfSBlbHNlIGlmKCFfLm9wdGlvbnMuYXNOYXZGb3IpIHtcbiAgICAgICAgICAgIHBhZ2VyUXR5ID0gMSArIE1hdGguY2VpbCgoXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgLyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAoYnJlYWtQb2ludCA8IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgICsrcGFnZXJRdHk7XG4gICAgICAgICAgICAgICAgYnJlYWtQb2ludCA9IGNvdW50ZXIgKyBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGFnZXJRdHkgLSAxO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5nZXRMZWZ0ID0gZnVuY3Rpb24oc2xpZGVJbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHRhcmdldExlZnQsXG4gICAgICAgICAgICB2ZXJ0aWNhbEhlaWdodCxcbiAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gMCxcbiAgICAgICAgICAgIHRhcmdldFNsaWRlLFxuICAgICAgICAgICAgY29lZjtcblxuICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gMDtcbiAgICAgICAgdmVydGljYWxIZWlnaHQgPSBfLiRzbGlkZXMuZmlyc3QoKS5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoXy5zbGlkZVdpZHRoICogXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgKiAtMTtcbiAgICAgICAgICAgICAgICBjb2VmID0gLTFcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IHRydWUgJiYgXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZWYgPSAtMS41O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZWYgPSAtMlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZlcnRpY2FsT2Zmc2V0ID0gKHZlcnRpY2FsSGVpZ2h0ICogXy5vcHRpb25zLnNsaWRlc1RvU2hvdykgKiBjb2VmO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsID4gXy5zbGlkZUNvdW50ICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggPiBfLnNsaWRlQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSAoc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudCkpICogXy5zbGlkZVdpZHRoKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLSAoc2xpZGVJbmRleCAtIF8uc2xpZGVDb3VudCkpICogdmVydGljYWxIZWlnaHQpICogLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnNsaWRlT2Zmc2V0ID0gKChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwpICogXy5zbGlkZVdpZHRoKSAqIC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKF8uc2xpZGVDb3VudCAlIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkgKiB2ZXJ0aWNhbEhlaWdodCkgKiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzbGlkZUluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA+IF8uc2xpZGVDb3VudCkge1xuICAgICAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAtIF8uc2xpZGVDb3VudCkgKiBfLnNsaWRlV2lkdGg7XG4gICAgICAgICAgICAgICAgdmVydGljYWxPZmZzZXQgPSAoKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSAtIF8uc2xpZGVDb3VudCkgKiB2ZXJ0aWNhbEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCA9IDA7XG4gICAgICAgICAgICB2ZXJ0aWNhbE9mZnNldCA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAoKF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIC8gMikgLSAoKF8uc2xpZGVXaWR0aCAqIF8uc2xpZGVDb3VudCkgLyAyKTtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgKz0gXy5zbGlkZVdpZHRoICogTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMikgLSBfLnNsaWRlV2lkdGg7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc2xpZGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgXy5zbGlkZU9mZnNldCArPSBfLnNsaWRlV2lkdGggKiBNYXRoLmZsb29yKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKChzbGlkZUluZGV4ICogXy5zbGlkZVdpZHRoKSAqIC0xKSArIF8uc2xpZGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKChzbGlkZUluZGV4ICogdmVydGljYWxIZWlnaHQpICogLTEpICsgdmVydGljYWxPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZhcmlhYmxlV2lkdGggPT09IHRydWUpIHtcblxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93IHx8IF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXggKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0U2xpZGVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0TGVmdCA9IChfLiRzbGlkZVRyYWNrLndpZHRoKCkgLSB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0IC0gdGFyZ2V0U2xpZGUud2lkdGgoKSkgKiAtMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gIDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gdGFyZ2V0U2xpZGVbMF0gPyB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0ICogLTEgOiAwO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50IDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgfHwgXy5vcHRpb25zLmluZmluaXRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmVxKHNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy4kc2xpZGVUcmFjay5jaGlsZHJlbignLnNsaWNrLXNsaWRlJykuZXEoc2xpZGVJbmRleCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyAxKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5vcHRpb25zLnJ0bCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0U2xpZGVbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldExlZnQgPSAoXy4kc2xpZGVUcmFjay53aWR0aCgpIC0gdGFyZ2V0U2xpZGVbMF0ub2Zmc2V0TGVmdCAtIHRhcmdldFNsaWRlLndpZHRoKCkpICogLTE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gIDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRMZWZ0ID0gdGFyZ2V0U2xpZGVbMF0gPyB0YXJnZXRTbGlkZVswXS5vZmZzZXRMZWZ0ICogLTEgOiAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRhcmdldExlZnQgKz0gKF8uJGxpc3Qud2lkdGgoKSAtIHRhcmdldFNsaWRlLm91dGVyV2lkdGgoKSkgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldExlZnQ7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldE9wdGlvbiA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0dldE9wdGlvbiA9IGZ1bmN0aW9uKG9wdGlvbikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICByZXR1cm4gXy5vcHRpb25zW29wdGlvbl07XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmdldE5hdmlnYWJsZUluZGV4ZXMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBicmVha1BvaW50ID0gMCxcbiAgICAgICAgICAgIGNvdW50ZXIgPSAwLFxuICAgICAgICAgICAgaW5kZXhlcyA9IFtdLFxuICAgICAgICAgICAgbWF4O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBtYXggPSBfLnNsaWRlQ291bnQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBicmVha1BvaW50ID0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICogLTE7XG4gICAgICAgICAgICBjb3VudGVyID0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICogLTE7XG4gICAgICAgICAgICBtYXggPSBfLnNsaWRlQ291bnQgKiAyO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKGJyZWFrUG9pbnQgPCBtYXgpIHtcbiAgICAgICAgICAgIGluZGV4ZXMucHVzaChicmVha1BvaW50KTtcbiAgICAgICAgICAgIGJyZWFrUG9pbnQgPSBjb3VudGVyICsgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICAgICAgY291bnRlciArPSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyA/IF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCA6IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXhlcztcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0U2xpY2sgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICByZXR1cm4gdGhpcztcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ2V0U2xpZGVDb3VudCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHNsaWRlc1RyYXZlcnNlZCwgc3dpcGVkU2xpZGUsIGNlbnRlck9mZnNldDtcblxuICAgICAgICBjZW50ZXJPZmZzZXQgPSBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSA/IF8uc2xpZGVXaWR0aCAqIE1hdGguZmxvb3IoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIpIDogMDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnN3aXBlVG9TbGlkZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stc2xpZGUnKS5lYWNoKGZ1bmN0aW9uKGluZGV4LCBzbGlkZSkge1xuICAgICAgICAgICAgICAgIGlmIChzbGlkZS5vZmZzZXRMZWZ0IC0gY2VudGVyT2Zmc2V0ICsgKCQoc2xpZGUpLm91dGVyV2lkdGgoKSAvIDIpID4gKF8uc3dpcGVMZWZ0ICogLTEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXBlZFNsaWRlID0gc2xpZGU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgc2xpZGVzVHJhdmVyc2VkID0gTWF0aC5hYnMoJChzd2lwZWRTbGlkZSkuYXR0cignZGF0YS1zbGljay1pbmRleCcpIC0gXy5jdXJyZW50U2xpZGUpIHx8IDE7XG5cbiAgICAgICAgICAgIHJldHVybiBzbGlkZXNUcmF2ZXJzZWQ7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuZ29UbyA9IFNsaWNrLnByb3RvdHlwZS5zbGlja0dvVG8gPSBmdW5jdGlvbihzbGlkZSwgZG9udEFuaW1hdGUpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ2luZGV4JyxcbiAgICAgICAgICAgICAgICBpbmRleDogcGFyc2VJbnQoc2xpZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIGRvbnRBbmltYXRlKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKGNyZWF0aW9uKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICghJChfLiRzbGlkZXIpLmhhc0NsYXNzKCdzbGljay1pbml0aWFsaXplZCcpKSB7XG5cbiAgICAgICAgICAgICQoXy4kc2xpZGVyKS5hZGRDbGFzcygnc2xpY2staW5pdGlhbGl6ZWQnKTtcblxuICAgICAgICAgICAgXy5idWlsZFJvd3MoKTtcbiAgICAgICAgICAgIF8uYnVpbGRPdXQoKTtcbiAgICAgICAgICAgIF8uc2V0UHJvcHMoKTtcbiAgICAgICAgICAgIF8uc3RhcnRMb2FkKCk7XG4gICAgICAgICAgICBfLmxvYWRTbGlkZXIoKTtcbiAgICAgICAgICAgIF8uaW5pdGlhbGl6ZUV2ZW50cygpO1xuICAgICAgICAgICAgXy51cGRhdGVBcnJvd3MoKTtcbiAgICAgICAgICAgIF8udXBkYXRlRG90cygpO1xuICAgICAgICAgICAgXy5jaGVja1Jlc3BvbnNpdmUodHJ1ZSk7XG4gICAgICAgICAgICBfLmZvY3VzSGFuZGxlcigpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3JlYXRpb24pIHtcbiAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdpbml0JywgW19dKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy5pbml0QURBKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcblxuICAgICAgICAgICAgXy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIF8uYXV0b1BsYXkoKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRBREEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgICAgIG51bURvdEdyb3VwcyA9IE1hdGguY2VpbChfLnNsaWRlQ291bnQgLyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSxcbiAgICAgICAgICAgICAgICB0YWJDb250cm9sSW5kZXhlcyA9IF8uZ2V0TmF2aWdhYmxlSW5kZXhlcygpLmZpbHRlcihmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh2YWwgPj0gMCkgJiYgKHZhbCA8IF8uc2xpZGVDb3VudCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVzLmFkZChfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1jbG9uZWQnKSkuYXR0cih7XG4gICAgICAgICAgICAnYXJpYS1oaWRkZW4nOiAndHJ1ZScsXG4gICAgICAgICAgICAndGFiaW5kZXgnOiAnLTEnXG4gICAgICAgIH0pLmZpbmQoJ2EsIGlucHV0LCBidXR0b24sIHNlbGVjdCcpLmF0dHIoe1xuICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoXy4kZG90cyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgXy4kc2xpZGVzLm5vdChfLiRzbGlkZVRyYWNrLmZpbmQoJy5zbGljay1jbG9uZWQnKSkuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlQ29udHJvbEluZGV4ID0gdGFiQ29udHJvbEluZGV4ZXMuaW5kZXhPZihpKTtcblxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogJ3RhYnBhbmVsJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogJ3NsaWNrLXNsaWRlJyArIF8uaW5zdGFuY2VVaWQgKyBpLFxuICAgICAgICAgICAgICAgICAgICAndGFiaW5kZXgnOiAtMVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlQ29udHJvbEluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgIHZhciBhcmlhQnV0dG9uQ29udHJvbCA9ICdzbGljay1zbGlkZS1jb250cm9sJyArIF8uaW5zdGFuY2VVaWQgKyBzbGlkZUNvbnRyb2xJbmRleFxuICAgICAgICAgICAgICAgICAgIGlmICgkKCcjJyArIGFyaWFCdXR0b25Db250cm9sKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgJ2FyaWEtZGVzY3JpYmVkYnknOiBhcmlhQnV0dG9uQ29udHJvbFxuICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBfLiRkb3RzLmF0dHIoJ3JvbGUnLCAndGFibGlzdCcpLmZpbmQoJ2xpJykuZWFjaChmdW5jdGlvbihpKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hcHBlZFNsaWRlSW5kZXggPSB0YWJDb250cm9sSW5kZXhlc1tpXTtcblxuICAgICAgICAgICAgICAgICQodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICdyb2xlJzogJ3ByZXNlbnRhdGlvbidcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICQodGhpcykuZmluZCgnYnV0dG9uJykuZmlyc3QoKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ3JvbGUnOiAndGFiJyxcbiAgICAgICAgICAgICAgICAgICAgJ2lkJzogJ3NsaWNrLXNsaWRlLWNvbnRyb2wnICsgXy5pbnN0YW5jZVVpZCArIGksXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLWNvbnRyb2xzJzogJ3NsaWNrLXNsaWRlJyArIF8uaW5zdGFuY2VVaWQgKyBtYXBwZWRTbGlkZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1sYWJlbCc6IChpICsgMSkgKyAnIG9mICcgKyBudW1Eb3RHcm91cHMsXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLXNlbGVjdGVkJzogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogJy0xJ1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KS5lcShfLmN1cnJlbnRTbGlkZSkuZmluZCgnYnV0dG9uJykuYXR0cih7XG4gICAgICAgICAgICAgICAgJ2FyaWEtc2VsZWN0ZWQnOiAndHJ1ZScsXG4gICAgICAgICAgICAgICAgJ3RhYmluZGV4JzogJzAnXG4gICAgICAgICAgICB9KS5lbmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGk9Xy5jdXJyZW50U2xpZGUsIG1heD1pK18ub3B0aW9ucy5zbGlkZXNUb1Nob3c7IGkgPCBtYXg7IGkrKykge1xuICAgICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPbkNoYW5nZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVzLmVxKGkpLmF0dHIoeyd0YWJpbmRleCc6ICcwJ30pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXMuZXEoaSkucmVtb3ZlQXR0cigndGFiaW5kZXgnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfLmFjdGl2YXRlQURBKCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRBcnJvd0V2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLiRwcmV2QXJyb3dcbiAgICAgICAgICAgICAgIC5vZmYoJ2NsaWNrLnNsaWNrJylcbiAgICAgICAgICAgICAgIC5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdwcmV2aW91cydcbiAgICAgICAgICAgICAgIH0sIF8uY2hhbmdlU2xpZGUpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93XG4gICAgICAgICAgICAgICAub2ZmKCdjbGljay5zbGljaycpXG4gICAgICAgICAgICAgICAub24oJ2NsaWNrLnNsaWNrJywge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnbmV4dCdcbiAgICAgICAgICAgICAgIH0sIF8uY2hhbmdlU2xpZGUpO1xuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgICAgIF8uJG5leHRBcnJvdy5vbigna2V5ZG93bi5zbGljaycsIF8ua2V5SGFuZGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuaW5pdERvdEV2ZW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgJCgnbGknLCBfLiRkb3RzKS5vbignY2xpY2suc2xpY2snLCB7XG4gICAgICAgICAgICAgICAgbWVzc2FnZTogJ2luZGV4J1xuICAgICAgICAgICAgfSwgXy5jaGFuZ2VTbGlkZSk7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuYWNjZXNzaWJpbGl0eSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGRvdHMub24oJ2tleWRvd24uc2xpY2snLCBfLmtleUhhbmRsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8ub3B0aW9ucy5wYXVzZU9uRG90c0hvdmVyID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgJCgnbGknLCBfLiRkb3RzKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VlbnRlci5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIHRydWUpKVxuICAgICAgICAgICAgICAgIC5vbignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0U2xpZGVFdmVudHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMucGF1c2VPbkhvdmVyICkge1xuXG4gICAgICAgICAgICBfLiRsaXN0Lm9uKCdtb3VzZWVudGVyLnNsaWNrJywgJC5wcm94eShfLmludGVycnVwdCwgXywgdHJ1ZSkpO1xuICAgICAgICAgICAgXy4kbGlzdC5vbignbW91c2VsZWF2ZS5zbGljaycsICQucHJveHkoXy5pbnRlcnJ1cHQsIF8sIGZhbHNlKSk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5pbml0aWFsaXplRXZlbnRzID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uaW5pdEFycm93RXZlbnRzKCk7XG5cbiAgICAgICAgXy5pbml0RG90RXZlbnRzKCk7XG4gICAgICAgIF8uaW5pdFNsaWRlRXZlbnRzKCk7XG5cbiAgICAgICAgXy4kbGlzdC5vbigndG91Y2hzdGFydC5zbGljayBtb3VzZWRvd24uc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdzdGFydCdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaG1vdmUuc2xpY2sgbW91c2Vtb3ZlLnNsaWNrJywge1xuICAgICAgICAgICAgYWN0aW9uOiAnbW92ZSdcbiAgICAgICAgfSwgXy5zd2lwZUhhbmRsZXIpO1xuICAgICAgICBfLiRsaXN0Lm9uKCd0b3VjaGVuZC5zbGljayBtb3VzZXVwLnNsaWNrJywge1xuICAgICAgICAgICAgYWN0aW9uOiAnZW5kJ1xuICAgICAgICB9LCBfLnN3aXBlSGFuZGxlcik7XG4gICAgICAgIF8uJGxpc3Qub24oJ3RvdWNoY2FuY2VsLnNsaWNrIG1vdXNlbGVhdmUuc2xpY2snLCB7XG4gICAgICAgICAgICBhY3Rpb246ICdlbmQnXG4gICAgICAgIH0sIF8uc3dpcGVIYW5kbGVyKTtcblxuICAgICAgICBfLiRsaXN0Lm9uKCdjbGljay5zbGljaycsIF8uY2xpY2tIYW5kbGVyKTtcblxuICAgICAgICAkKGRvY3VtZW50KS5vbihfLnZpc2liaWxpdHlDaGFuZ2UsICQucHJveHkoXy52aXNpYmlsaXR5LCBfKSk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRsaXN0Lm9uKCdrZXlkb3duLnNsaWNrJywgXy5rZXlIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPblNlbGVjdCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgJChfLiRzbGlkZVRyYWNrKS5jaGlsZHJlbigpLm9uKCdjbGljay5zbGljaycsIF8uc2VsZWN0SGFuZGxlcik7XG4gICAgICAgIH1cblxuICAgICAgICAkKHdpbmRvdykub24oJ29yaWVudGF0aW9uY2hhbmdlLnNsaWNrLnNsaWNrLScgKyBfLmluc3RhbmNlVWlkLCAkLnByb3h5KF8ub3JpZW50YXRpb25DaGFuZ2UsIF8pKTtcblxuICAgICAgICAkKHdpbmRvdykub24oJ3Jlc2l6ZS5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgJC5wcm94eShfLnJlc2l6ZSwgXykpO1xuXG4gICAgICAgICQoJ1tkcmFnZ2FibGUhPXRydWVdJywgXy4kc2xpZGVUcmFjaykub24oJ2RyYWdzdGFydCcsIF8ucHJldmVudERlZmF1bHQpO1xuXG4gICAgICAgICQod2luZG93KS5vbignbG9hZC5zbGljay5zbGljay0nICsgXy5pbnN0YW5jZVVpZCwgXy5zZXRQb3NpdGlvbik7XG4gICAgICAgICQoXy5zZXRQb3NpdGlvbik7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmluaXRVSSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmFycm93cyA9PT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgIF8uJHByZXZBcnJvdy5zaG93KCk7XG4gICAgICAgICAgICBfLiRuZXh0QXJyb3cuc2hvdygpO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmRvdHMgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRkb3RzLnNob3coKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmtleUhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcbiAgICAgICAgIC8vRG9udCBzbGlkZSBpZiB0aGUgY3Vyc29yIGlzIGluc2lkZSB0aGUgZm9ybSBmaWVsZHMgYW5kIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICAgICAgaWYoIWV2ZW50LnRhcmdldC50YWdOYW1lLm1hdGNoKCdURVhUQVJFQXxJTlBVVHxTRUxFQ1QnKSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM3ICYmIF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF8ub3B0aW9ucy5ydGwgPT09IHRydWUgPyAnbmV4dCcgOiAgJ3ByZXZpb3VzJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmtleUNvZGUgPT09IDM5ICYmIF8ub3B0aW9ucy5hY2Nlc3NpYmlsaXR5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF8ub3B0aW9ucy5ydGwgPT09IHRydWUgPyAncHJldmlvdXMnIDogJ25leHQnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5sYXp5TG9hZCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGxvYWRSYW5nZSwgY2xvbmVSYW5nZSwgcmFuZ2VTdGFydCwgcmFuZ2VFbmQ7XG5cbiAgICAgICAgZnVuY3Rpb24gbG9hZEltYWdlcyhpbWFnZXNTY29wZSkge1xuXG4gICAgICAgICAgICAkKCdpbWdbZGF0YS1sYXp5XScsIGltYWdlc1Njb3BlKS5lYWNoKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGltYWdlID0gJCh0aGlzKSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTb3VyY2UgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtbGF6eScpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVNyY1NldCA9ICQodGhpcykuYXR0cignZGF0YS1zcmNzZXQnKSxcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VTaXplcyAgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtc2l6ZXMnKSB8fCBfLiRzbGlkZXIuYXR0cignZGF0YS1zaXplcycpLFxuICAgICAgICAgICAgICAgICAgICBpbWFnZVRvTG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQub25sb2FkID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKHsgb3BhY2l0eTogMCB9LCAxMDAsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlU3JjU2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3Jjc2V0JywgaW1hZ2VTcmNTZXQgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1hZ2VTaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc2l6ZXMnLCBpbWFnZVNpemVzICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignc3JjJywgaW1hZ2VTb3VyY2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5hbmltYXRlKHsgb3BhY2l0eTogMSB9LCAyMDAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1sYXp5IGRhdGEtc3Jjc2V0IGRhdGEtc2l6ZXMnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stbG9hZGluZycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRlZCcsIFtfLCBpbWFnZSwgaW1hZ2VTb3VyY2VdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGltYWdlVG9Mb2FkLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoICdkYXRhLWxhenknIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyggJ3NsaWNrLWxvYWRpbmcnIClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcyggJ3NsaWNrLWxhenlsb2FkLWVycm9yJyApO1xuXG4gICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCdsYXp5TG9hZEVycm9yJywgWyBfLCBpbWFnZSwgaW1hZ2VTb3VyY2UgXSk7XG5cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgaW1hZ2VUb0xvYWQuc3JjID0gaW1hZ2VTb3VyY2U7XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByYW5nZVN0YXJ0ID0gXy5jdXJyZW50U2xpZGUgKyAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAvIDIgKyAxKTtcbiAgICAgICAgICAgICAgICByYW5nZUVuZCA9IHJhbmdlU3RhcnQgKyBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICsgMjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmFuZ2VTdGFydCA9IE1hdGgubWF4KDAsIF8uY3VycmVudFNsaWRlIC0gKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgLyAyICsgMSkpO1xuICAgICAgICAgICAgICAgIHJhbmdlRW5kID0gMiArIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMiArIDEpICsgXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gXy5vcHRpb25zLmluZmluaXRlID8gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIF8uY3VycmVudFNsaWRlIDogXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICByYW5nZUVuZCA9IE1hdGguY2VpbChyYW5nZVN0YXJ0ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdyk7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VTdGFydCA+IDApIHJhbmdlU3RhcnQtLTtcbiAgICAgICAgICAgICAgICBpZiAocmFuZ2VFbmQgPD0gXy5zbGlkZUNvdW50KSByYW5nZUVuZCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbG9hZFJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZScpLnNsaWNlKHJhbmdlU3RhcnQsIHJhbmdlRW5kKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAnYW50aWNpcGF0ZWQnKSB7XG4gICAgICAgICAgICB2YXIgcHJldlNsaWRlID0gcmFuZ2VTdGFydCAtIDEsXG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlID0gcmFuZ2VFbmQsXG4gICAgICAgICAgICAgICAgJHNsaWRlcyA9IF8uJHNsaWRlci5maW5kKCcuc2xpY2stc2xpZGUnKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2U2xpZGUgPCAwKSBwcmV2U2xpZGUgPSBfLnNsaWRlQ291bnQgLSAxO1xuICAgICAgICAgICAgICAgIGxvYWRSYW5nZSA9IGxvYWRSYW5nZS5hZGQoJHNsaWRlcy5lcShwcmV2U2xpZGUpKTtcbiAgICAgICAgICAgICAgICBsb2FkUmFuZ2UgPSBsb2FkUmFuZ2UuYWRkKCRzbGlkZXMuZXEobmV4dFNsaWRlKSk7XG4gICAgICAgICAgICAgICAgcHJldlNsaWRlLS07XG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsb2FkSW1hZ2VzKGxvYWRSYW5nZSk7XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBjbG9uZVJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1zbGlkZScpO1xuICAgICAgICAgICAgbG9hZEltYWdlcyhjbG9uZVJhbmdlKTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBjbG9uZVJhbmdlID0gXy4kc2xpZGVyLmZpbmQoJy5zbGljay1jbG9uZWQnKS5zbGljZSgwLCBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGxvYWRJbWFnZXMoY2xvbmVSYW5nZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXy5jdXJyZW50U2xpZGUgPT09IDApIHtcbiAgICAgICAgICAgIGNsb25lUmFuZ2UgPSBfLiRzbGlkZXIuZmluZCgnLnNsaWNrLWNsb25lZCcpLnNsaWNlKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKiAtMSk7XG4gICAgICAgICAgICBsb2FkSW1hZ2VzKGNsb25lUmFuZ2UpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmxvYWRTbGlkZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgXy5zZXRQb3NpdGlvbigpO1xuXG4gICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHtcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfSk7XG5cbiAgICAgICAgXy4kc2xpZGVyLnJlbW92ZUNsYXNzKCdzbGljay1sb2FkaW5nJyk7XG5cbiAgICAgICAgXy5pbml0VUkoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAncHJvZ3Jlc3NpdmUnKSB7XG4gICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5uZXh0ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrTmV4dCA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAnbmV4dCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLm9yaWVudGF0aW9uQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uY2hlY2tSZXNwb25zaXZlKCk7XG4gICAgICAgIF8uc2V0UG9zaXRpb24oKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucGF1c2UgPSBTbGljay5wcm90b3R5cGUuc2xpY2tQYXVzZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5Q2xlYXIoKTtcbiAgICAgICAgXy5wYXVzZWQgPSB0cnVlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wbGF5ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUGxheSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmF1dG9QbGF5KCk7XG4gICAgICAgIF8ub3B0aW9ucy5hdXRvcGxheSA9IHRydWU7XG4gICAgICAgIF8ucGF1c2VkID0gZmFsc2U7XG4gICAgICAgIF8uZm9jdXNzZWQgPSBmYWxzZTtcbiAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IGZhbHNlO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wb3N0U2xpZGUgPSBmdW5jdGlvbihpbmRleCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiggIV8udW5zbGlja2VkICkge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYWZ0ZXJDaGFuZ2UnLCBbXywgaW5kZXhdKTtcblxuICAgICAgICAgICAgXy5hbmltYXRpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICBfLnNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG4gICAgICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLmFjY2Vzc2liaWxpdHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBfLmluaXRBREEoKTtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZm9jdXNPbkNoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgJGN1cnJlbnRTbGlkZSA9ICQoXy4kc2xpZGVzLmdldChfLmN1cnJlbnRTbGlkZSkpO1xuICAgICAgICAgICAgICAgICAgICAkY3VycmVudFNsaWRlLmF0dHIoJ3RhYmluZGV4JywgMCkuZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcmV2ID0gU2xpY2sucHJvdG90eXBlLnNsaWNrUHJldiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLmNoYW5nZVNsaWRlKHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiAncHJldmlvdXMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucHJvZ3Jlc3NpdmVMYXp5TG9hZCA9IGZ1bmN0aW9uKCB0cnlDb3VudCApIHtcblxuICAgICAgICB0cnlDb3VudCA9IHRyeUNvdW50IHx8IDE7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgJGltZ3NUb0xvYWQgPSAkKCAnaW1nW2RhdGEtbGF6eV0nLCBfLiRzbGlkZXIgKSxcbiAgICAgICAgICAgIGltYWdlLFxuICAgICAgICAgICAgaW1hZ2VTb3VyY2UsXG4gICAgICAgICAgICBpbWFnZVNyY1NldCxcbiAgICAgICAgICAgIGltYWdlU2l6ZXMsXG4gICAgICAgICAgICBpbWFnZVRvTG9hZDtcblxuICAgICAgICBpZiAoICRpbWdzVG9Mb2FkLmxlbmd0aCApIHtcblxuICAgICAgICAgICAgaW1hZ2UgPSAkaW1nc1RvTG9hZC5maXJzdCgpO1xuICAgICAgICAgICAgaW1hZ2VTb3VyY2UgPSBpbWFnZS5hdHRyKCdkYXRhLWxhenknKTtcbiAgICAgICAgICAgIGltYWdlU3JjU2V0ID0gaW1hZ2UuYXR0cignZGF0YS1zcmNzZXQnKTtcbiAgICAgICAgICAgIGltYWdlU2l6ZXMgID0gaW1hZ2UuYXR0cignZGF0YS1zaXplcycpIHx8IF8uJHNsaWRlci5hdHRyKCdkYXRhLXNpemVzJyk7XG4gICAgICAgICAgICBpbWFnZVRvTG9hZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbWFnZVNyY1NldCkge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NyY3NldCcsIGltYWdlU3JjU2V0ICk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGltYWdlU2l6ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3NpemVzJywgaW1hZ2VTaXplcyApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoICdzcmMnLCBpbWFnZVNvdXJjZSApXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLWxhenkgZGF0YS1zcmNzZXQgZGF0YS1zaXplcycpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stbG9hZGluZycpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBfLm9wdGlvbnMuYWRhcHRpdmVIZWlnaHQgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIF8uc2V0UG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRlZCcsIFsgXywgaW1hZ2UsIGltYWdlU291cmNlIF0pO1xuICAgICAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCgpO1xuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWFnZVRvTG9hZC5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIHRyeUNvdW50IDwgMyApIHtcblxuICAgICAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgICAgICogdHJ5IHRvIGxvYWQgdGhlIGltYWdlIDMgdGltZXMsXG4gICAgICAgICAgICAgICAgICAgICAqIGxlYXZlIGEgc2xpZ2h0IGRlbGF5IHNvIHdlIGRvbid0IGdldFxuICAgICAgICAgICAgICAgICAgICAgKiBzZXJ2ZXJzIGJsb2NraW5nIHRoZSByZXF1ZXN0LlxuICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnByb2dyZXNzaXZlTGF6eUxvYWQoIHRyeUNvdW50ICsgMSApO1xuICAgICAgICAgICAgICAgICAgICB9LCA1MDAgKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCAnZGF0YS1sYXp5JyApXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQ2xhc3MoICdzbGljay1sb2FkaW5nJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoICdzbGljay1sYXp5bG9hZC1lcnJvcicgKTtcblxuICAgICAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignbGF6eUxvYWRFcnJvcicsIFsgXywgaW1hZ2UsIGltYWdlU291cmNlIF0pO1xuXG4gICAgICAgICAgICAgICAgICAgIF8ucHJvZ3Jlc3NpdmVMYXp5TG9hZCgpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpbWFnZVRvTG9hZC5zcmMgPSBpbWFnZVNvdXJjZTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYWxsSW1hZ2VzTG9hZGVkJywgWyBfIF0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uKCBpbml0aWFsaXppbmcgKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLCBjdXJyZW50U2xpZGUsIGxhc3RWaXNpYmxlSW5kZXg7XG5cbiAgICAgICAgbGFzdFZpc2libGVJbmRleCA9IF8uc2xpZGVDb3VudCAtIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG5cbiAgICAgICAgLy8gaW4gbm9uLWluZmluaXRlIHNsaWRlcnMsIHdlIGRvbid0IHdhbnQgdG8gZ28gcGFzdCB0aGVcbiAgICAgICAgLy8gbGFzdCB2aXNpYmxlIGluZGV4LlxuICAgICAgICBpZiggIV8ub3B0aW9ucy5pbmZpbml0ZSAmJiAoIF8uY3VycmVudFNsaWRlID4gbGFzdFZpc2libGVJbmRleCApKSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IGxhc3RWaXNpYmxlSW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBsZXNzIHNsaWRlcyB0aGFuIHRvIHNob3csIGdvIHRvIHN0YXJ0LlxuICAgICAgICBpZiAoIF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuICAgICAgICAgICAgXy5jdXJyZW50U2xpZGUgPSAwO1xuXG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50U2xpZGUgPSBfLmN1cnJlbnRTbGlkZTtcblxuICAgICAgICBfLmRlc3Ryb3kodHJ1ZSk7XG5cbiAgICAgICAgJC5leHRlbmQoXywgXy5pbml0aWFscywgeyBjdXJyZW50U2xpZGU6IGN1cnJlbnRTbGlkZSB9KTtcblxuICAgICAgICBfLmluaXQoKTtcblxuICAgICAgICBpZiggIWluaXRpYWxpemluZyApIHtcblxuICAgICAgICAgICAgXy5jaGFuZ2VTbGlkZSh7XG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiAnaW5kZXgnLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogY3VycmVudFNsaWRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZmFsc2UpO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVnaXN0ZXJCcmVha3BvaW50cyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcywgYnJlYWtwb2ludCwgY3VycmVudEJyZWFrcG9pbnQsIGwsXG4gICAgICAgICAgICByZXNwb25zaXZlU2V0dGluZ3MgPSBfLm9wdGlvbnMucmVzcG9uc2l2ZSB8fCBudWxsO1xuXG4gICAgICAgIGlmICggJC50eXBlKHJlc3BvbnNpdmVTZXR0aW5ncykgPT09ICdhcnJheScgJiYgcmVzcG9uc2l2ZVNldHRpbmdzLmxlbmd0aCApIHtcblxuICAgICAgICAgICAgXy5yZXNwb25kVG8gPSBfLm9wdGlvbnMucmVzcG9uZFRvIHx8ICd3aW5kb3cnO1xuXG4gICAgICAgICAgICBmb3IgKCBicmVha3BvaW50IGluIHJlc3BvbnNpdmVTZXR0aW5ncyApIHtcblxuICAgICAgICAgICAgICAgIGwgPSBfLmJyZWFrcG9pbnRzLmxlbmd0aC0xO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNpdmVTZXR0aW5ncy5oYXNPd25Qcm9wZXJ0eShicmVha3BvaW50KSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QnJlYWtwb2ludCA9IHJlc3BvbnNpdmVTZXR0aW5nc1ticmVha3BvaW50XS5icmVha3BvaW50O1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvb3AgdGhyb3VnaCB0aGUgYnJlYWtwb2ludHMgYW5kIGN1dCBvdXQgYW55IGV4aXN0aW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIG9uZXMgd2l0aCB0aGUgc2FtZSBicmVha3BvaW50IG51bWJlciwgd2UgZG9uJ3Qgd2FudCBkdXBlcy5cbiAgICAgICAgICAgICAgICAgICAgd2hpbGUoIGwgPj0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBfLmJyZWFrcG9pbnRzW2xdICYmIF8uYnJlYWtwb2ludHNbbF0gPT09IGN1cnJlbnRCcmVha3BvaW50ICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uYnJlYWtwb2ludHMuc3BsaWNlKGwsMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBsLS07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRzLnB1c2goY3VycmVudEJyZWFrcG9pbnQpO1xuICAgICAgICAgICAgICAgICAgICBfLmJyZWFrcG9pbnRTZXR0aW5nc1tjdXJyZW50QnJlYWtwb2ludF0gPSByZXNwb25zaXZlU2V0dGluZ3NbYnJlYWtwb2ludF0uc2V0dGluZ3M7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgXy5icmVha3BvaW50cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCBfLm9wdGlvbnMubW9iaWxlRmlyc3QgKSA/IGEtYiA6IGItYTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVpbml0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIF8uJHNsaWRlcyA9XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrXG4gICAgICAgICAgICAgICAgLmNoaWxkcmVuKF8ub3B0aW9ucy5zbGlkZSlcbiAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLXNsaWRlJyk7XG5cbiAgICAgICAgXy5zbGlkZUNvdW50ID0gXy4kc2xpZGVzLmxlbmd0aDtcblxuICAgICAgICBpZiAoXy5jdXJyZW50U2xpZGUgPj0gXy5zbGlkZUNvdW50ICYmIF8uY3VycmVudFNsaWRlICE9PSAwKSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IF8uY3VycmVudFNsaWRlIC0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA8PSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBfLnJlZ2lzdGVyQnJlYWtwb2ludHMoKTtcblxuICAgICAgICBfLnNldFByb3BzKCk7XG4gICAgICAgIF8uc2V0dXBJbmZpbml0ZSgpO1xuICAgICAgICBfLmJ1aWxkQXJyb3dzKCk7XG4gICAgICAgIF8udXBkYXRlQXJyb3dzKCk7XG4gICAgICAgIF8uaW5pdEFycm93RXZlbnRzKCk7XG4gICAgICAgIF8uYnVpbGREb3RzKCk7XG4gICAgICAgIF8udXBkYXRlRG90cygpO1xuICAgICAgICBfLmluaXREb3RFdmVudHMoKTtcbiAgICAgICAgXy5jbGVhblVwU2xpZGVFdmVudHMoKTtcbiAgICAgICAgXy5pbml0U2xpZGVFdmVudHMoKTtcblxuICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZShmYWxzZSwgdHJ1ZSk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mb2N1c09uU2VsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAkKF8uJHNsaWRlVHJhY2spLmNoaWxkcmVuKCkub24oJ2NsaWNrLnNsaWNrJywgXy5zZWxlY3RIYW5kbGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2V0U2xpZGVDbGFzc2VzKHR5cGVvZiBfLmN1cnJlbnRTbGlkZSA9PT0gJ251bWJlcicgPyBfLmN1cnJlbnRTbGlkZSA6IDApO1xuXG4gICAgICAgIF8uc2V0UG9zaXRpb24oKTtcbiAgICAgICAgXy5mb2N1c0hhbmRsZXIoKTtcblxuICAgICAgICBfLnBhdXNlZCA9ICFfLm9wdGlvbnMuYXV0b3BsYXk7XG4gICAgICAgIF8uYXV0b1BsYXkoKTtcblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcigncmVJbml0JywgW19dKTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUucmVzaXplID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSAhPT0gXy53aW5kb3dXaWR0aCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KF8ud2luZG93RGVsYXkpO1xuICAgICAgICAgICAgXy53aW5kb3dEZWxheSA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIF8ud2luZG93V2lkdGggPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgICAgICAgICBfLmNoZWNrUmVzcG9uc2l2ZSgpO1xuICAgICAgICAgICAgICAgIGlmKCAhXy51bnNsaWNrZWQgKSB7IF8uc2V0UG9zaXRpb24oKTsgfVxuICAgICAgICAgICAgfSwgNTApO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5yZW1vdmVTbGlkZSA9IFNsaWNrLnByb3RvdHlwZS5zbGlja1JlbW92ZSA9IGZ1bmN0aW9uKGluZGV4LCByZW1vdmVCZWZvcmUsIHJlbW92ZUFsbCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAodHlwZW9mKGluZGV4KSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICByZW1vdmVCZWZvcmUgPSBpbmRleDtcbiAgICAgICAgICAgIGluZGV4ID0gcmVtb3ZlQmVmb3JlID09PSB0cnVlID8gMCA6IF8uc2xpZGVDb3VudCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbmRleCA9IHJlbW92ZUJlZm9yZSA9PT0gdHJ1ZSA/IC0taW5kZXggOiBpbmRleDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPCAxIHx8IGluZGV4IDwgMCB8fCBpbmRleCA+IF8uc2xpZGVDb3VudCAtIDEpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgaWYgKHJlbW92ZUFsbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbigpLnJlbW92ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jaGlsZHJlbih0aGlzLm9wdGlvbnMuc2xpZGUpLmVxKGluZGV4KS5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlcyA9IF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKTtcblxuICAgICAgICBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKHRoaXMub3B0aW9ucy5zbGlkZSkuZGV0YWNoKCk7XG5cbiAgICAgICAgXy4kc2xpZGVUcmFjay5hcHBlbmQoXy4kc2xpZGVzKTtcblxuICAgICAgICBfLiRzbGlkZXNDYWNoZSA9IF8uJHNsaWRlcztcblxuICAgICAgICBfLnJlaW5pdCgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRDU1MgPSBmdW5jdGlvbihwb3NpdGlvbikge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIHBvc2l0aW9uUHJvcHMgPSB7fSxcbiAgICAgICAgICAgIHgsIHk7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHBvc2l0aW9uID0gLXBvc2l0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHggPSBfLnBvc2l0aW9uUHJvcCA9PSAnbGVmdCcgPyBNYXRoLmNlaWwocG9zaXRpb24pICsgJ3B4JyA6ICcwcHgnO1xuICAgICAgICB5ID0gXy5wb3NpdGlvblByb3AgPT0gJ3RvcCcgPyBNYXRoLmNlaWwocG9zaXRpb24pICsgJ3B4JyA6ICcwcHgnO1xuXG4gICAgICAgIHBvc2l0aW9uUHJvcHNbXy5wb3NpdGlvblByb3BdID0gcG9zaXRpb247XG5cbiAgICAgICAgaWYgKF8udHJhbnNmb3Jtc0VuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLmNzcyhwb3NpdGlvblByb3BzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aW9uUHJvcHMgPSB7fTtcbiAgICAgICAgICAgIGlmIChfLmNzc1RyYW5zaXRpb25zID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlKCcgKyB4ICsgJywgJyArIHkgKyAnKSc7XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5jc3MocG9zaXRpb25Qcm9wcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uUHJvcHNbXy5hbmltVHlwZV0gPSAndHJhbnNsYXRlM2QoJyArIHggKyAnLCAnICsgeSArICcsIDBweCknO1xuICAgICAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY3NzKHBvc2l0aW9uUHJvcHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldERpbWVuc2lvbnMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy52ZXJ0aWNhbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGxpc3QuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogKCcwcHggJyArIF8ub3B0aW9ucy5jZW50ZXJQYWRkaW5nKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy4kbGlzdC5oZWlnaHQoXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSkgKiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KTtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uJGxpc3QuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogKF8ub3B0aW9ucy5jZW50ZXJQYWRkaW5nICsgJyAwcHgnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXy5saXN0V2lkdGggPSBfLiRsaXN0LndpZHRoKCk7XG4gICAgICAgIF8ubGlzdEhlaWdodCA9IF8uJGxpc3QuaGVpZ2h0KCk7XG5cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSAmJiBfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uc2xpZGVXaWR0aCA9IE1hdGguY2VpbChfLmxpc3RXaWR0aCAvIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpO1xuICAgICAgICAgICAgXy4kc2xpZGVUcmFjay53aWR0aChNYXRoLmNlaWwoKF8uc2xpZGVXaWR0aCAqIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLmxlbmd0aCkpKTtcblxuICAgICAgICB9IGVsc2UgaWYgKF8ub3B0aW9ucy52YXJpYWJsZVdpZHRoID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLiRzbGlkZVRyYWNrLndpZHRoKDUwMDAgKiBfLnNsaWRlQ291bnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zbGlkZVdpZHRoID0gTWF0aC5jZWlsKF8ubGlzdFdpZHRoKTtcbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suaGVpZ2h0KE1hdGguY2VpbCgoXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSkgKiBfLiRzbGlkZVRyYWNrLmNoaWxkcmVuKCcuc2xpY2stc2xpZGUnKS5sZW5ndGgpKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2Zmc2V0ID0gXy4kc2xpZGVzLmZpcnN0KCkub3V0ZXJXaWR0aCh0cnVlKSAtIF8uJHNsaWRlcy5maXJzdCgpLndpZHRoKCk7XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmFyaWFibGVXaWR0aCA9PT0gZmFsc2UpIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4oJy5zbGljay1zbGlkZScpLndpZHRoKF8uc2xpZGVXaWR0aCAtIG9mZnNldCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldEZhZGUgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICB0YXJnZXRMZWZ0O1xuXG4gICAgICAgIF8uJHNsaWRlcy5lYWNoKGZ1bmN0aW9uKGluZGV4LCBlbGVtZW50KSB7XG4gICAgICAgICAgICB0YXJnZXRMZWZ0ID0gKF8uc2xpZGVXaWR0aCAqIGluZGV4KSAqIC0xO1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5ydGwgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAncmVsYXRpdmUnLFxuICAgICAgICAgICAgICAgICAgICByaWdodDogdGFyZ2V0TGVmdCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAyLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZScsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRhcmdldExlZnQsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgICAgICAgICAgekluZGV4OiBfLm9wdGlvbnMuekluZGV4IC0gMixcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBfLiRzbGlkZXMuZXEoXy5jdXJyZW50U2xpZGUpLmNzcyh7XG4gICAgICAgICAgICB6SW5kZXg6IF8ub3B0aW9ucy56SW5kZXggLSAxLFxuICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICB9KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc2V0SGVpZ2h0ID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuc2xpZGVzVG9TaG93ID09PSAxICYmIF8ub3B0aW9ucy5hZGFwdGl2ZUhlaWdodCA9PT0gdHJ1ZSAmJiBfLm9wdGlvbnMudmVydGljYWwgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gXy4kc2xpZGVzLmVxKF8uY3VycmVudFNsaWRlKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgIF8uJGxpc3QuY3NzKCdoZWlnaHQnLCB0YXJnZXRIZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldE9wdGlvbiA9XG4gICAgU2xpY2sucHJvdG90eXBlLnNsaWNrU2V0T3B0aW9uID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFjY2VwdHMgYXJndW1lbnRzIGluIGZvcm1hdCBvZjpcbiAgICAgICAgICpcbiAgICAgICAgICogIC0gZm9yIGNoYW5naW5nIGEgc2luZ2xlIG9wdGlvbidzIHZhbHVlOlxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsIG9wdGlvbiwgdmFsdWUsIHJlZnJlc2ggKVxuICAgICAgICAgKlxuICAgICAgICAgKiAgLSBmb3IgY2hhbmdpbmcgYSBzZXQgb2YgcmVzcG9uc2l2ZSBvcHRpb25zOlxuICAgICAgICAgKiAgICAgLnNsaWNrKFwic2V0T3B0aW9uXCIsICdyZXNwb25zaXZlJywgW3t9LCAuLi5dLCByZWZyZXNoIClcbiAgICAgICAgICpcbiAgICAgICAgICogIC0gZm9yIHVwZGF0aW5nIG11bHRpcGxlIHZhbHVlcyBhdCBvbmNlIChub3QgcmVzcG9uc2l2ZSlcbiAgICAgICAgICogICAgIC5zbGljayhcInNldE9wdGlvblwiLCB7ICdvcHRpb24nOiB2YWx1ZSwgLi4uIH0sIHJlZnJlc2ggKVxuICAgICAgICAgKi9cblxuICAgICAgICB2YXIgXyA9IHRoaXMsIGwsIGl0ZW0sIG9wdGlvbiwgdmFsdWUsIHJlZnJlc2ggPSBmYWxzZSwgdHlwZTtcblxuICAgICAgICBpZiggJC50eXBlKCBhcmd1bWVudHNbMF0gKSA9PT0gJ29iamVjdCcgKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbiA9ICBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICByZWZyZXNoID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgdHlwZSA9ICdtdWx0aXBsZSc7XG5cbiAgICAgICAgfSBlbHNlIGlmICggJC50eXBlKCBhcmd1bWVudHNbMF0gKSA9PT0gJ3N0cmluZycgKSB7XG5cbiAgICAgICAgICAgIG9wdGlvbiA9ICBhcmd1bWVudHNbMF07XG4gICAgICAgICAgICB2YWx1ZSA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgIHJlZnJlc2ggPSBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICAgIGlmICggYXJndW1lbnRzWzBdID09PSAncmVzcG9uc2l2ZScgJiYgJC50eXBlKCBhcmd1bWVudHNbMV0gKSA9PT0gJ2FycmF5JyApIHtcblxuICAgICAgICAgICAgICAgIHR5cGUgPSAncmVzcG9uc2l2ZSc7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBhcmd1bWVudHNbMV0gIT09ICd1bmRlZmluZWQnICkge1xuXG4gICAgICAgICAgICAgICAgdHlwZSA9ICdzaW5nbGUnO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggdHlwZSA9PT0gJ3NpbmdsZScgKSB7XG5cbiAgICAgICAgICAgIF8ub3B0aW9uc1tvcHRpb25dID0gdmFsdWU7XG5cblxuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnbXVsdGlwbGUnICkge1xuXG4gICAgICAgICAgICAkLmVhY2goIG9wdGlvbiAsIGZ1bmN0aW9uKCBvcHQsIHZhbCApIHtcblxuICAgICAgICAgICAgICAgIF8ub3B0aW9uc1tvcHRdID0gdmFsO1xuXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICdyZXNwb25zaXZlJyApIHtcblxuICAgICAgICAgICAgZm9yICggaXRlbSBpbiB2YWx1ZSApIHtcblxuICAgICAgICAgICAgICAgIGlmKCAkLnR5cGUoIF8ub3B0aW9ucy5yZXNwb25zaXZlICkgIT09ICdhcnJheScgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUgPSBbIHZhbHVlW2l0ZW1dIF07XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGwgPSBfLm9wdGlvbnMucmVzcG9uc2l2ZS5sZW5ndGgtMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBsb29wIHRocm91Z2ggdGhlIHJlc3BvbnNpdmUgb2JqZWN0IGFuZCBzcGxpY2Ugb3V0IGR1cGxpY2F0ZXMuXG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKCBsID49IDAgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMucmVzcG9uc2l2ZVtsXS5icmVha3BvaW50ID09PSB2YWx1ZVtpdGVtXS5icmVha3BvaW50ICkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnJlc3BvbnNpdmUuc3BsaWNlKGwsMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgbC0tO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMucmVzcG9uc2l2ZS5wdXNoKCB2YWx1ZVtpdGVtXSApO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggcmVmcmVzaCApIHtcblxuICAgICAgICAgICAgXy51bmxvYWQoKTtcbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBfLnNldERpbWVuc2lvbnMoKTtcblxuICAgICAgICBfLnNldEhlaWdodCgpO1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uc2V0Q1NTKF8uZ2V0TGVmdChfLmN1cnJlbnRTbGlkZSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5zZXRGYWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignc2V0UG9zaXRpb24nLCBbX10pO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXRQcm9wcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcyxcbiAgICAgICAgICAgIGJvZHlTdHlsZSA9IGRvY3VtZW50LmJvZHkuc3R5bGU7XG5cbiAgICAgICAgXy5wb3NpdGlvblByb3AgPSBfLm9wdGlvbnMudmVydGljYWwgPT09IHRydWUgPyAndG9wJyA6ICdsZWZ0JztcblxuICAgICAgICBpZiAoXy5wb3NpdGlvblByb3AgPT09ICd0b3AnKSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIuYWRkQ2xhc3MoJ3NsaWNrLXZlcnRpY2FsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfLiRzbGlkZXIucmVtb3ZlQ2xhc3MoJ3NsaWNrLXZlcnRpY2FsJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keVN0eWxlLldlYmtpdFRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYm9keVN0eWxlLk1velRyYW5zaXRpb24gIT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgYm9keVN0eWxlLm1zVHJhbnNpdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoXy5vcHRpb25zLnVzZUNTUyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIF8uY3NzVHJhbnNpdGlvbnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuZmFkZSApIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIF8ub3B0aW9ucy56SW5kZXggPT09ICdudW1iZXInICkge1xuICAgICAgICAgICAgICAgIGlmKCBfLm9wdGlvbnMuekluZGV4IDwgMyApIHtcbiAgICAgICAgICAgICAgICAgICAgXy5vcHRpb25zLnpJbmRleCA9IDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLm9wdGlvbnMuekluZGV4ID0gXy5kZWZhdWx0cy56SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYm9keVN0eWxlLk9UcmFuc2Zvcm0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgXy5hbmltVHlwZSA9ICdPVHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctby10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICdPVHJhbnNpdGlvbic7XG4gICAgICAgICAgICBpZiAoYm9keVN0eWxlLnBlcnNwZWN0aXZlUHJvcGVydHkgPT09IHVuZGVmaW5lZCAmJiBib2R5U3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUuTW96VHJhbnNmb3JtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAnTW96VHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctbW96LXRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zaXRpb25UeXBlID0gJ01velRyYW5zaXRpb24nO1xuICAgICAgICAgICAgaWYgKGJvZHlTdHlsZS5wZXJzcGVjdGl2ZVByb3BlcnR5ID09PSB1bmRlZmluZWQgJiYgYm9keVN0eWxlLk1velBlcnNwZWN0aXZlID09PSB1bmRlZmluZWQpIF8uYW5pbVR5cGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYm9keVN0eWxlLndlYmtpdFRyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ3dlYmtpdFRyYW5zZm9ybSc7XG4gICAgICAgICAgICBfLnRyYW5zZm9ybVR5cGUgPSAnLXdlYmtpdC10cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICd3ZWJraXRUcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUucGVyc3BlY3RpdmVQcm9wZXJ0eSA9PT0gdW5kZWZpbmVkICYmIGJvZHlTdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9PT0gdW5kZWZpbmVkKSBfLmFuaW1UeXBlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJvZHlTdHlsZS5tc1RyYW5zZm9ybSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBfLmFuaW1UeXBlID0gJ21zVHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICctbXMtdHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNpdGlvblR5cGUgPSAnbXNUcmFuc2l0aW9uJztcbiAgICAgICAgICAgIGlmIChib2R5U3R5bGUubXNUcmFuc2Zvcm0gPT09IHVuZGVmaW5lZCkgXy5hbmltVHlwZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChib2R5U3R5bGUudHJhbnNmb3JtICE9PSB1bmRlZmluZWQgJiYgXy5hbmltVHlwZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIF8uYW5pbVR5cGUgPSAndHJhbnNmb3JtJztcbiAgICAgICAgICAgIF8udHJhbnNmb3JtVHlwZSA9ICd0cmFuc2Zvcm0nO1xuICAgICAgICAgICAgXy50cmFuc2l0aW9uVHlwZSA9ICd0cmFuc2l0aW9uJztcbiAgICAgICAgfVxuICAgICAgICBfLnRyYW5zZm9ybXNFbmFibGVkID0gXy5vcHRpb25zLnVzZVRyYW5zZm9ybSAmJiAoXy5hbmltVHlwZSAhPT0gbnVsbCAmJiBfLmFuaW1UeXBlICE9PSBmYWxzZSk7XG4gICAgfTtcblxuXG4gICAgU2xpY2sucHJvdG90eXBlLnNldFNsaWRlQ2xhc3NlcyA9IGZ1bmN0aW9uKGluZGV4KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgY2VudGVyT2Zmc2V0LCBhbGxTbGlkZXMsIGluZGV4T2Zmc2V0LCByZW1haW5kZXI7XG5cbiAgICAgICAgYWxsU2xpZGVzID0gXy4kc2xpZGVyXG4gICAgICAgICAgICAuZmluZCgnLnNsaWNrLXNsaWRlJylcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stYWN0aXZlIHNsaWNrLWNlbnRlciBzbGljay1jdXJyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgICAgXy4kc2xpZGVzXG4gICAgICAgICAgICAuZXEoaW5kZXgpXG4gICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWN1cnJlbnQnKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmNlbnRlck1vZGUgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgdmFyIGV2ZW5Db2VmID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAlIDIgPT09IDAgPyAxIDogMDtcblxuICAgICAgICAgICAgY2VudGVyT2Zmc2V0ID0gTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMik7XG5cbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IHRydWUpIHtcblxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+PSBjZW50ZXJPZmZzZXQgJiYgaW5kZXggPD0gKF8uc2xpZGVDb3VudCAtIDEpIC0gY2VudGVyT2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4IC0gY2VudGVyT2Zmc2V0ICsgZXZlbkNvZWYsIGluZGV4ICsgY2VudGVyT2Zmc2V0ICsgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXhPZmZzZXQgLSBjZW50ZXJPZmZzZXQgKyAxICsgZXZlbkNvZWYsIGluZGV4T2Zmc2V0ICsgY2VudGVyT2Zmc2V0ICsgMilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuZXEoYWxsU2xpZGVzLmxlbmd0aCAtIDEgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jZW50ZXInKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IF8uc2xpZGVDb3VudCAtIDEpIHtcblxuICAgICAgICAgICAgICAgICAgICBhbGxTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC5lcShfLm9wdGlvbnMuc2xpZGVzVG9TaG93KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jZW50ZXInKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBfLiRzbGlkZXNcbiAgICAgICAgICAgICAgICAuZXEoaW5kZXgpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1jZW50ZXInKTtcblxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8PSAoXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykpIHtcblxuICAgICAgICAgICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXgsIGluZGV4ICsgXy5vcHRpb25zLnNsaWRlc1RvU2hvdylcbiAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChhbGxTbGlkZXMubGVuZ3RoIDw9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgcmVtYWluZGVyID0gXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2hvdztcbiAgICAgICAgICAgICAgICBpbmRleE9mZnNldCA9IF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gdHJ1ZSA/IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgKyBpbmRleCA6IGluZGV4O1xuXG4gICAgICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cgPT0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICYmIChfLnNsaWRlQ291bnQgLSBpbmRleCkgPCBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgYWxsU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoaW5kZXhPZmZzZXQgLSAoXy5vcHRpb25zLnNsaWRlc1RvU2hvdyAtIHJlbWFpbmRlciksIGluZGV4T2Zmc2V0ICsgcmVtYWluZGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAgICAgICAgIGFsbFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgLnNsaWNlKGluZGV4T2Zmc2V0LCBpbmRleE9mZnNldCArIF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoJ3NsaWNrLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmxhenlMb2FkID09PSAnb25kZW1hbmQnIHx8IF8ub3B0aW9ucy5sYXp5TG9hZCA9PT0gJ2FudGljaXBhdGVkJykge1xuICAgICAgICAgICAgXy5sYXp5TG9hZCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zZXR1cEluZmluaXRlID0gZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgaSwgc2xpZGVJbmRleCwgaW5maW5pdGVDb3VudDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8ub3B0aW9ucy5jZW50ZXJNb2RlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLmluZmluaXRlID09PSB0cnVlICYmIF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICBzbGlkZUluZGV4ID0gbnVsbDtcblxuICAgICAgICAgICAgaWYgKF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZUNvdW50ID0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdyArIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5maW5pdGVDb3VudCA9IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3c7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gXy5zbGlkZUNvdW50OyBpID4gKF8uc2xpZGVDb3VudCAtXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZpbml0ZUNvdW50KTsgaSAtPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlSW5kZXggPSBpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgJChfLiRzbGlkZXNbc2xpZGVJbmRleF0pLmNsb25lKHRydWUpLmF0dHIoJ2lkJywgJycpXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zbGljay1pbmRleCcsIHNsaWRlSW5kZXggLSBfLnNsaWRlQ291bnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAucHJlcGVuZFRvKF8uJHNsaWRlVHJhY2spLmFkZENsYXNzKCdzbGljay1jbG9uZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGluZmluaXRlQ291bnQgICsgXy5zbGlkZUNvdW50OyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICQoXy4kc2xpZGVzW3NsaWRlSW5kZXhdKS5jbG9uZSh0cnVlKS5hdHRyKCdpZCcsICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnLCBzbGlkZUluZGV4ICsgXy5zbGlkZUNvdW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFwcGVuZFRvKF8uJHNsaWRlVHJhY2spLmFkZENsYXNzKCdzbGljay1jbG9uZWQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXy4kc2xpZGVUcmFjay5maW5kKCcuc2xpY2stY2xvbmVkJykuZmluZCgnW2lkXScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQodGhpcykuYXR0cignaWQnLCAnJyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLmludGVycnVwdCA9IGZ1bmN0aW9uKCB0b2dnbGUgKSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzO1xuXG4gICAgICAgIGlmKCAhdG9nZ2xlICkge1xuICAgICAgICAgICAgXy5hdXRvUGxheSgpO1xuICAgICAgICB9XG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSB0b2dnbGU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNlbGVjdEhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICB2YXIgdGFyZ2V0RWxlbWVudCA9XG4gICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkuaXMoJy5zbGljay1zbGlkZScpID9cbiAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldCkgOlxuICAgICAgICAgICAgICAgICQoZXZlbnQudGFyZ2V0KS5wYXJlbnRzKCcuc2xpY2stc2xpZGUnKTtcblxuICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludCh0YXJnZXRFbGVtZW50LmF0dHIoJ2RhdGEtc2xpY2staW5kZXgnKSk7XG5cbiAgICAgICAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xuXG4gICAgICAgIGlmIChfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLnNsaWRlSGFuZGxlcihpbmRleCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIH1cblxuICAgICAgICBfLnNsaWRlSGFuZGxlcihpbmRleCk7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnNsaWRlSGFuZGxlciA9IGZ1bmN0aW9uKGluZGV4LCBzeW5jLCBkb250QW5pbWF0ZSkge1xuXG4gICAgICAgIHZhciB0YXJnZXRTbGlkZSwgYW5pbVNsaWRlLCBvbGRTbGlkZSwgc2xpZGVMZWZ0LCB0YXJnZXRMZWZ0ID0gbnVsbCxcbiAgICAgICAgICAgIF8gPSB0aGlzLCBuYXZUYXJnZXQ7XG5cbiAgICAgICAgc3luYyA9IHN5bmMgfHwgZmFsc2U7XG5cbiAgICAgICAgaWYgKF8uYW5pbWF0aW5nID09PSB0cnVlICYmIF8ub3B0aW9ucy53YWl0Rm9yQW5pbWF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSB0cnVlICYmIF8uY3VycmVudFNsaWRlID09PSBpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN5bmMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfLmFzTmF2Rm9yKGluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRhcmdldFNsaWRlID0gaW5kZXg7XG4gICAgICAgIHRhcmdldExlZnQgPSBfLmdldExlZnQodGFyZ2V0U2xpZGUpO1xuICAgICAgICBzbGlkZUxlZnQgPSBfLmdldExlZnQoXy5jdXJyZW50U2xpZGUpO1xuXG4gICAgICAgIF8uY3VycmVudExlZnQgPSBfLnN3aXBlTGVmdCA9PT0gbnVsbCA/IHNsaWRlTGVmdCA6IF8uc3dpcGVMZWZ0O1xuXG4gICAgICAgIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSBmYWxzZSAmJiAoaW5kZXggPCAwIHx8IGluZGV4ID4gXy5nZXREb3RDb3VudCgpICogXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSkge1xuICAgICAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFNsaWRlID0gXy5jdXJyZW50U2xpZGU7XG4gICAgICAgICAgICAgICAgaWYgKGRvbnRBbmltYXRlICE9PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5hbmltYXRlU2xpZGUoc2xpZGVMZWZ0LCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUodGFyZ2V0U2xpZGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuaW5maW5pdGUgPT09IGZhbHNlICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSB0cnVlICYmIChpbmRleCA8IDAgfHwgaW5kZXggPiAoXy5zbGlkZUNvdW50IC0gXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKSkpIHtcbiAgICAgICAgICAgIGlmIChfLm9wdGlvbnMuZmFkZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuICAgICAgICAgICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSAmJiBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93KSB7XG4gICAgICAgICAgICAgICAgICAgIF8uYW5pbWF0ZVNsaWRlKHNsaWRlTGVmdCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZSh0YXJnZXRTbGlkZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIF8ucG9zdFNsaWRlKHRhcmdldFNsaWRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIF8ub3B0aW9ucy5hdXRvcGxheSApIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoXy5hdXRvUGxheVRpbWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YXJnZXRTbGlkZSA8IDApIHtcbiAgICAgICAgICAgIGlmIChfLnNsaWRlQ291bnQgJSBfLm9wdGlvbnMuc2xpZGVzVG9TY3JvbGwgIT09IDApIHtcbiAgICAgICAgICAgICAgICBhbmltU2xpZGUgPSBfLnNsaWRlQ291bnQgLSAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gXy5zbGlkZUNvdW50ICsgdGFyZ2V0U2xpZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0U2xpZGUgPj0gXy5zbGlkZUNvdW50KSB7XG4gICAgICAgICAgICBpZiAoXy5zbGlkZUNvdW50ICUgXy5vcHRpb25zLnNsaWRlc1RvU2Nyb2xsICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYW5pbVNsaWRlID0gdGFyZ2V0U2xpZGUgLSBfLnNsaWRlQ291bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhbmltU2xpZGUgPSB0YXJnZXRTbGlkZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignYmVmb3JlQ2hhbmdlJywgW18sIF8uY3VycmVudFNsaWRlLCBhbmltU2xpZGVdKTtcblxuICAgICAgICBvbGRTbGlkZSA9IF8uY3VycmVudFNsaWRlO1xuICAgICAgICBfLmN1cnJlbnRTbGlkZSA9IGFuaW1TbGlkZTtcblxuICAgICAgICBfLnNldFNsaWRlQ2xhc3NlcyhfLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXNOYXZGb3IgKSB7XG5cbiAgICAgICAgICAgIG5hdlRhcmdldCA9IF8uZ2V0TmF2VGFyZ2V0KCk7XG4gICAgICAgICAgICBuYXZUYXJnZXQgPSBuYXZUYXJnZXQuc2xpY2soJ2dldFNsaWNrJyk7XG5cbiAgICAgICAgICAgIGlmICggbmF2VGFyZ2V0LnNsaWRlQ291bnQgPD0gbmF2VGFyZ2V0Lm9wdGlvbnMuc2xpZGVzVG9TaG93ICkge1xuICAgICAgICAgICAgICAgIG5hdlRhcmdldC5zZXRTbGlkZUNsYXNzZXMoXy5jdXJyZW50U2xpZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuICAgICAgICBfLnVwZGF0ZURvdHMoKTtcbiAgICAgICAgXy51cGRhdGVBcnJvd3MoKTtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLmZhZGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGlmIChkb250QW5pbWF0ZSAhPT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgXy5mYWRlU2xpZGVPdXQob2xkU2xpZGUpO1xuXG4gICAgICAgICAgICAgICAgXy5mYWRlU2xpZGUoYW5pbVNsaWRlLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfLnBvc3RTbGlkZShhbmltU2xpZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXy5hbmltYXRlSGVpZ2h0KCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9udEFuaW1hdGUgIT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy5hbmltYXRlU2xpZGUodGFyZ2V0TGVmdCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgXy5wb3N0U2xpZGUoYW5pbVNsaWRlKTtcbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zdGFydExvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5hcnJvd3MgPT09IHRydWUgJiYgXy5zbGlkZUNvdW50ID4gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cuaGlkZSgpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LmhpZGUoKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5kb3RzID09PSB0cnVlICYmIF8uc2xpZGVDb3VudCA+IF8ub3B0aW9ucy5zbGlkZXNUb1Nob3cpIHtcblxuICAgICAgICAgICAgXy4kZG90cy5oaWRlKCk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlci5hZGRDbGFzcygnc2xpY2stbG9hZGluZycpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZURpcmVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciB4RGlzdCwgeURpc3QsIHIsIHN3aXBlQW5nbGUsIF8gPSB0aGlzO1xuXG4gICAgICAgIHhEaXN0ID0gXy50b3VjaE9iamVjdC5zdGFydFggLSBfLnRvdWNoT2JqZWN0LmN1clg7XG4gICAgICAgIHlEaXN0ID0gXy50b3VjaE9iamVjdC5zdGFydFkgLSBfLnRvdWNoT2JqZWN0LmN1clk7XG4gICAgICAgIHIgPSBNYXRoLmF0YW4yKHlEaXN0LCB4RGlzdCk7XG5cbiAgICAgICAgc3dpcGVBbmdsZSA9IE1hdGgucm91bmQociAqIDE4MCAvIE1hdGguUEkpO1xuICAgICAgICBpZiAoc3dpcGVBbmdsZSA8IDApIHtcbiAgICAgICAgICAgIHN3aXBlQW5nbGUgPSAzNjAgLSBNYXRoLmFicyhzd2lwZUFuZ2xlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgoc3dpcGVBbmdsZSA8PSA0NSkgJiYgKHN3aXBlQW5nbGUgPj0gMCkpIHtcbiAgICAgICAgICAgIHJldHVybiAoXy5vcHRpb25zLnJ0bCA9PT0gZmFsc2UgPyAnbGVmdCcgOiAncmlnaHQnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPD0gMzYwKSAmJiAoc3dpcGVBbmdsZSA+PSAzMTUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gJ2xlZnQnIDogJ3JpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKChzd2lwZUFuZ2xlID49IDEzNSkgJiYgKHN3aXBlQW5nbGUgPD0gMjI1KSkge1xuICAgICAgICAgICAgcmV0dXJuIChfLm9wdGlvbnMucnRsID09PSBmYWxzZSA/ICdyaWdodCcgOiAnbGVmdCcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBpZiAoKHN3aXBlQW5nbGUgPj0gMzUpICYmIChzd2lwZUFuZ2xlIDw9IDEzNSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2Rvd24nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3VwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAndmVydGljYWwnO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZUVuZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgc2xpZGVDb3VudCxcbiAgICAgICAgICAgIGRpcmVjdGlvbjtcblxuICAgICAgICBfLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIF8uc3dpcGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChfLnNjcm9sbGluZykge1xuICAgICAgICAgICAgXy5zY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uaW50ZXJydXB0ZWQgPSBmYWxzZTtcbiAgICAgICAgXy5zaG91bGRDbGljayA9ICggXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA+IDEwICkgPyBmYWxzZSA6IHRydWU7XG5cbiAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LmN1clggPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggXy50b3VjaE9iamVjdC5lZGdlSGl0ID09PSB0cnVlICkge1xuICAgICAgICAgICAgXy4kc2xpZGVyLnRyaWdnZXIoJ2VkZ2UnLCBbXywgXy5zd2lwZURpcmVjdGlvbigpIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LnN3aXBlTGVuZ3RoID49IF8udG91Y2hPYmplY3QubWluU3dpcGUgKSB7XG5cbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IF8uc3dpcGVEaXJlY3Rpb24oKTtcblxuICAgICAgICAgICAgc3dpdGNoICggZGlyZWN0aW9uICkge1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnZG93bic6XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDb3VudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMuc3dpcGVUb1NsaWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmNoZWNrTmF2aWdhYmxlKCBfLmN1cnJlbnRTbGlkZSArIF8uZ2V0U2xpZGVDb3VudCgpICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlICsgXy5nZXRTbGlkZUNvdW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50RGlyZWN0aW9uID0gMDtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICBjYXNlICd1cCc6XG5cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDb3VudCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBfLm9wdGlvbnMuc3dpcGVUb1NsaWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmNoZWNrTmF2aWdhYmxlKCBfLmN1cnJlbnRTbGlkZSAtIF8uZ2V0U2xpZGVDb3VudCgpICkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF8uY3VycmVudFNsaWRlIC0gXy5nZXRTbGlkZUNvdW50KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgXy5jdXJyZW50RGlyZWN0aW9uID0gMTtcblxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG5cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiggZGlyZWN0aW9uICE9ICd2ZXJ0aWNhbCcgKSB7XG5cbiAgICAgICAgICAgICAgICBfLnNsaWRlSGFuZGxlciggc2xpZGVDb3VudCApO1xuICAgICAgICAgICAgICAgIF8udG91Y2hPYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgICBfLiRzbGlkZXIudHJpZ2dlcignc3dpcGUnLCBbXywgZGlyZWN0aW9uIF0pO1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCBfLnRvdWNoT2JqZWN0LnN0YXJ0WCAhPT0gXy50b3VjaE9iamVjdC5jdXJYICkge1xuXG4gICAgICAgICAgICAgICAgXy5zbGlkZUhhbmRsZXIoIF8uY3VycmVudFNsaWRlICk7XG4gICAgICAgICAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS5zd2lwZUhhbmRsZXIgPSBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHZhciBfID0gdGhpcztcblxuICAgICAgICBpZiAoKF8ub3B0aW9ucy5zd2lwZSA9PT0gZmFsc2UpIHx8ICgnb250b3VjaGVuZCcgaW4gZG9jdW1lbnQgJiYgXy5vcHRpb25zLnN3aXBlID09PSBmYWxzZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChfLm9wdGlvbnMuZHJhZ2dhYmxlID09PSBmYWxzZSAmJiBldmVudC50eXBlLmluZGV4T2YoJ21vdXNlJykgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfLnRvdWNoT2JqZWN0LmZpbmdlckNvdW50ID0gZXZlbnQub3JpZ2luYWxFdmVudCAmJiBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMubGVuZ3RoIDogMTtcblxuICAgICAgICBfLnRvdWNoT2JqZWN0Lm1pblN3aXBlID0gXy5saXN0V2lkdGggLyBfLm9wdGlvbnNcbiAgICAgICAgICAgIC50b3VjaFRocmVzaG9sZDtcblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdC5taW5Td2lwZSA9IF8ubGlzdEhlaWdodCAvIF8ub3B0aW9uc1xuICAgICAgICAgICAgICAgIC50b3VjaFRocmVzaG9sZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoZXZlbnQuZGF0YS5hY3Rpb24pIHtcblxuICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgICAgIF8uc3dpcGVTdGFydChldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ21vdmUnOlxuICAgICAgICAgICAgICAgIF8uc3dpcGVNb3ZlKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICBfLnN3aXBlRW5kKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnN3aXBlTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgZWRnZVdhc0hpdCA9IGZhbHNlLFxuICAgICAgICAgICAgY3VyTGVmdCwgc3dpcGVEaXJlY3Rpb24sIHN3aXBlTGVuZ3RoLCBwb3NpdGlvbk9mZnNldCwgdG91Y2hlcywgdmVydGljYWxTd2lwZUxlbmd0aDtcblxuICAgICAgICB0b3VjaGVzID0gZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkID8gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzIDogbnVsbDtcblxuICAgICAgICBpZiAoIV8uZHJhZ2dpbmcgfHwgXy5zY3JvbGxpbmcgfHwgdG91Y2hlcyAmJiB0b3VjaGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VyTGVmdCA9IF8uZ2V0TGVmdChfLmN1cnJlbnRTbGlkZSk7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5jdXJYID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlc1swXS5wYWdlWCA6IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIF8udG91Y2hPYmplY3QuY3VyWSA9IHRvdWNoZXMgIT09IHVuZGVmaW5lZCA/IHRvdWNoZXNbMF0ucGFnZVkgOiBldmVudC5jbGllbnRZO1xuXG4gICAgICAgIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPSBNYXRoLnJvdW5kKE1hdGguc3FydChcbiAgICAgICAgICAgIE1hdGgucG93KF8udG91Y2hPYmplY3QuY3VyWCAtIF8udG91Y2hPYmplY3Quc3RhcnRYLCAyKSkpO1xuXG4gICAgICAgIHZlcnRpY2FsU3dpcGVMZW5ndGggPSBNYXRoLnJvdW5kKE1hdGguc3FydChcbiAgICAgICAgICAgIE1hdGgucG93KF8udG91Y2hPYmplY3QuY3VyWSAtIF8udG91Y2hPYmplY3Quc3RhcnRZLCAyKSkpO1xuXG4gICAgICAgIGlmICghXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyAmJiAhXy5zd2lwaW5nICYmIHZlcnRpY2FsU3dpcGVMZW5ndGggPiA0KSB7XG4gICAgICAgICAgICBfLnNjcm9sbGluZyA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsU3dpcGluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdC5zd2lwZUxlbmd0aCA9IHZlcnRpY2FsU3dpcGVMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICBzd2lwZURpcmVjdGlvbiA9IF8uc3dpcGVEaXJlY3Rpb24oKTtcblxuICAgICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudCAhPT0gdW5kZWZpbmVkICYmIF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggPiA0KSB7XG4gICAgICAgICAgICBfLnN3aXBpbmcgPSB0cnVlO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBvc2l0aW9uT2Zmc2V0ID0gKF8ub3B0aW9ucy5ydGwgPT09IGZhbHNlID8gMSA6IC0xKSAqIChfLnRvdWNoT2JqZWN0LmN1clggPiBfLnRvdWNoT2JqZWN0LnN0YXJ0WCA/IDEgOiAtMSk7XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBwb3NpdGlvbk9mZnNldCA9IF8udG91Y2hPYmplY3QuY3VyWSA+IF8udG91Y2hPYmplY3Quc3RhcnRZID8gMSA6IC0xO1xuICAgICAgICB9XG5cblxuICAgICAgICBzd2lwZUxlbmd0aCA9IF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGg7XG5cbiAgICAgICAgXy50b3VjaE9iamVjdC5lZGdlSGl0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5pbmZpbml0ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGlmICgoXy5jdXJyZW50U2xpZGUgPT09IDAgJiYgc3dpcGVEaXJlY3Rpb24gPT09ICdyaWdodCcpIHx8IChfLmN1cnJlbnRTbGlkZSA+PSBfLmdldERvdENvdW50KCkgJiYgc3dpcGVEaXJlY3Rpb24gPT09ICdsZWZ0JykpIHtcbiAgICAgICAgICAgICAgICBzd2lwZUxlbmd0aCA9IF8udG91Y2hPYmplY3Quc3dpcGVMZW5ndGggKiBfLm9wdGlvbnMuZWRnZUZyaWN0aW9uO1xuICAgICAgICAgICAgICAgIF8udG91Y2hPYmplY3QuZWRnZUhpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5vcHRpb25zLnZlcnRpY2FsID09PSBmYWxzZSkge1xuICAgICAgICAgICAgXy5zd2lwZUxlZnQgPSBjdXJMZWZ0ICsgc3dpcGVMZW5ndGggKiBwb3NpdGlvbk9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gY3VyTGVmdCArIChzd2lwZUxlbmd0aCAqIChfLiRsaXN0LmhlaWdodCgpIC8gXy5saXN0V2lkdGgpKSAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIGlmIChfLm9wdGlvbnMudmVydGljYWxTd2lwaW5nID09PSB0cnVlKSB7XG4gICAgICAgICAgICBfLnN3aXBlTGVmdCA9IGN1ckxlZnQgKyBzd2lwZUxlbmd0aCAqIHBvc2l0aW9uT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8ub3B0aW9ucy5mYWRlID09PSB0cnVlIHx8IF8ub3B0aW9ucy50b3VjaE1vdmUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy5hbmltYXRpbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIF8uc3dpcGVMZWZ0ID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uc2V0Q1NTKF8uc3dpcGVMZWZ0KTtcblxuICAgIH07XG5cbiAgICBTbGljay5wcm90b3R5cGUuc3dpcGVTdGFydCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgdmFyIF8gPSB0aGlzLFxuICAgICAgICAgICAgdG91Y2hlcztcblxuICAgICAgICBfLmludGVycnVwdGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAoXy50b3VjaE9iamVjdC5maW5nZXJDb3VudCAhPT0gMSB8fCBfLnNsaWRlQ291bnQgPD0gXy5vcHRpb25zLnNsaWRlc1RvU2hvdykge1xuICAgICAgICAgICAgXy50b3VjaE9iamVjdCA9IHt9O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGV2ZW50Lm9yaWdpbmFsRXZlbnQgIT09IHVuZGVmaW5lZCAmJiBldmVudC5vcmlnaW5hbEV2ZW50LnRvdWNoZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdG91Y2hlcyA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8udG91Y2hPYmplY3Quc3RhcnRYID0gXy50b3VjaE9iamVjdC5jdXJYID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlcy5wYWdlWCA6IGV2ZW50LmNsaWVudFg7XG4gICAgICAgIF8udG91Y2hPYmplY3Quc3RhcnRZID0gXy50b3VjaE9iamVjdC5jdXJZID0gdG91Y2hlcyAhPT0gdW5kZWZpbmVkID8gdG91Y2hlcy5wYWdlWSA6IGV2ZW50LmNsaWVudFk7XG5cbiAgICAgICAgXy5kcmFnZ2luZyA9IHRydWU7XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVuZmlsdGVyU2xpZGVzID0gU2xpY2sucHJvdG90eXBlLnNsaWNrVW5maWx0ZXIgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uJHNsaWRlc0NhY2hlICE9PSBudWxsKSB7XG5cbiAgICAgICAgICAgIF8udW5sb2FkKCk7XG5cbiAgICAgICAgICAgIF8uJHNsaWRlVHJhY2suY2hpbGRyZW4odGhpcy5vcHRpb25zLnNsaWRlKS5kZXRhY2goKTtcblxuICAgICAgICAgICAgXy4kc2xpZGVzQ2FjaGUuYXBwZW5kVG8oXy4kc2xpZGVUcmFjayk7XG5cbiAgICAgICAgICAgIF8ucmVpbml0KCk7XG5cbiAgICAgICAgfVxuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51bmxvYWQgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgJCgnLnNsaWNrLWNsb25lZCcsIF8uJHNsaWRlcikucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMpIHtcbiAgICAgICAgICAgIF8uJGRvdHMucmVtb3ZlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXy4kcHJldkFycm93ICYmIF8uaHRtbEV4cHIudGVzdChfLm9wdGlvbnMucHJldkFycm93KSkge1xuICAgICAgICAgICAgXy4kcHJldkFycm93LnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKF8uJG5leHRBcnJvdyAmJiBfLmh0bWxFeHByLnRlc3QoXy5vcHRpb25zLm5leHRBcnJvdykpIHtcbiAgICAgICAgICAgIF8uJG5leHRBcnJvdy5yZW1vdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIF8uJHNsaWRlc1xuICAgICAgICAgICAgLnJlbW92ZUNsYXNzKCdzbGljay1zbGlkZSBzbGljay1hY3RpdmUgc2xpY2stdmlzaWJsZSBzbGljay1jdXJyZW50JylcbiAgICAgICAgICAgIC5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgICAgICAgICAgIC5jc3MoJ3dpZHRoJywgJycpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51bnNsaWNrID0gZnVuY3Rpb24oZnJvbUJyZWFrcG9pbnQpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG4gICAgICAgIF8uJHNsaWRlci50cmlnZ2VyKCd1bnNsaWNrJywgW18sIGZyb21CcmVha3BvaW50XSk7XG4gICAgICAgIF8uZGVzdHJveSgpO1xuXG4gICAgfTtcblxuICAgIFNsaWNrLnByb3RvdHlwZS51cGRhdGVBcnJvd3MgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBjZW50ZXJPZmZzZXQ7XG5cbiAgICAgICAgY2VudGVyT2Zmc2V0ID0gTWF0aC5mbG9vcihfLm9wdGlvbnMuc2xpZGVzVG9TaG93IC8gMik7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXJyb3dzID09PSB0cnVlICYmXG4gICAgICAgICAgICBfLnNsaWRlQ291bnQgPiBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICYmXG4gICAgICAgICAgICAhXy5vcHRpb25zLmluZmluaXRlICkge1xuXG4gICAgICAgICAgICBfLiRwcmV2QXJyb3cucmVtb3ZlQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICdmYWxzZScpO1xuICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgaWYgKF8uY3VycmVudFNsaWRlID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICBfLiRwcmV2QXJyb3cuYWRkQ2xhc3MoJ3NsaWNrLWRpc2FibGVkJykuYXR0cignYXJpYS1kaXNhYmxlZCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LnJlbW92ZUNsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAnZmFsc2UnKTtcblxuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmN1cnJlbnRTbGlkZSA+PSBfLnNsaWRlQ291bnQgLSBfLm9wdGlvbnMuc2xpZGVzVG9TaG93ICYmIF8ub3B0aW9ucy5jZW50ZXJNb2RlID09PSBmYWxzZSkge1xuXG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5jdXJyZW50U2xpZGUgPj0gXy5zbGlkZUNvdW50IC0gMSAmJiBfLm9wdGlvbnMuY2VudGVyTW9kZSA9PT0gdHJ1ZSkge1xuXG4gICAgICAgICAgICAgICAgXy4kbmV4dEFycm93LmFkZENsYXNzKCdzbGljay1kaXNhYmxlZCcpLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIF8uJHByZXZBcnJvdy5yZW1vdmVDbGFzcygnc2xpY2stZGlzYWJsZWQnKS5hdHRyKCdhcmlhLWRpc2FibGVkJywgJ2ZhbHNlJyk7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnVwZGF0ZURvdHMgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKF8uJGRvdHMgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgXy4kZG90c1xuICAgICAgICAgICAgICAgIC5maW5kKCdsaScpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcygnc2xpY2stYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgLmVuZCgpO1xuXG4gICAgICAgICAgICBfLiRkb3RzXG4gICAgICAgICAgICAgICAgLmZpbmQoJ2xpJylcbiAgICAgICAgICAgICAgICAuZXEoTWF0aC5mbG9vcihfLmN1cnJlbnRTbGlkZSAvIF8ub3B0aW9ucy5zbGlkZXNUb1Njcm9sbCkpXG4gICAgICAgICAgICAgICAgLmFkZENsYXNzKCdzbGljay1hY3RpdmUnKTtcblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgU2xpY2sucHJvdG90eXBlLnZpc2liaWxpdHkgPSBmdW5jdGlvbigpIHtcblxuICAgICAgICB2YXIgXyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCBfLm9wdGlvbnMuYXV0b3BsYXkgKSB7XG5cbiAgICAgICAgICAgIGlmICggZG9jdW1lbnRbXy5oaWRkZW5dICkge1xuXG4gICAgICAgICAgICAgICAgXy5pbnRlcnJ1cHRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBfLmludGVycnVwdGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICB9O1xuXG4gICAgJC5mbi5zbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgXyA9IHRoaXMsXG4gICAgICAgICAgICBvcHQgPSBhcmd1bWVudHNbMF0sXG4gICAgICAgICAgICBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgIGwgPSBfLmxlbmd0aCxcbiAgICAgICAgICAgIGksXG4gICAgICAgICAgICByZXQ7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBvcHQgPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgX1tpXS5zbGljayA9IG5ldyBTbGljayhfW2ldLCBvcHQpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJldCA9IF9baV0uc2xpY2tbb3B0XS5hcHBseShfW2ldLnNsaWNrLCBhcmdzKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0ICE9ICd1bmRlZmluZWQnKSByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfO1xuICAgIH07XG5cbn0pKTtcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICogQm9vdHN0cmFwOiB0YWIuanMgdjMuMy43XG4gKiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS9qYXZhc2NyaXB0LyN0YWJzXG4gKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAqIENvcHlyaWdodCAyMDExLTIwMTYgVHdpdHRlciwgSW5jLlxuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG5cbitmdW5jdGlvbiAoJCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gVEFCIENMQVNTIERFRklOSVRJT05cbiAgLy8gPT09PT09PT09PT09PT09PT09PT1cblxuICB2YXIgVGFiID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAvLyBqc2NzOmRpc2FibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgICB0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpXG4gICAgLy8ganNjczplbmFibGUgcmVxdWlyZURvbGxhckJlZm9yZWpRdWVyeUFzc2lnbm1lbnRcbiAgfVxuXG4gIFRhYi5WRVJTSU9OID0gJzMuMy43J1xuXG4gIFRhYi5UUkFOU0lUSU9OX0RVUkFUSU9OID0gMTUwXG5cbiAgVGFiLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciAkdGhpcyAgICA9IHRoaXMuZWxlbWVudFxuICAgIHZhciAkdWwgICAgICA9ICR0aGlzLmNsb3Nlc3QoJ3VsOm5vdCguZHJvcGRvd24tbWVudSknKVxuICAgIHZhciBzZWxlY3RvciA9ICR0aGlzLmRhdGEoJ3RhcmdldCcpXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBzZWxlY3RvciA9ICR0aGlzLmF0dHIoJ2hyZWYnKVxuICAgICAgc2VsZWN0b3IgPSBzZWxlY3RvciAmJiBzZWxlY3Rvci5yZXBsYWNlKC8uKig/PSNbXlxcc10qJCkvLCAnJykgLy8gc3RyaXAgZm9yIGllN1xuICAgIH1cblxuICAgIGlmICgkdGhpcy5wYXJlbnQoJ2xpJykuaGFzQ2xhc3MoJ2FjdGl2ZScpKSByZXR1cm5cblxuICAgIHZhciAkcHJldmlvdXMgPSAkdWwuZmluZCgnLmFjdGl2ZTpsYXN0IGEnKVxuICAgIHZhciBoaWRlRXZlbnQgPSAkLkV2ZW50KCdoaWRlLmJzLnRhYicsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6ICR0aGlzWzBdXG4gICAgfSlcbiAgICB2YXIgc2hvd0V2ZW50ID0gJC5FdmVudCgnc2hvdy5icy50YWInLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiAkcHJldmlvdXNbMF1cbiAgICB9KVxuXG4gICAgJHByZXZpb3VzLnRyaWdnZXIoaGlkZUV2ZW50KVxuICAgICR0aGlzLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fCBoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHJldHVyblxuXG4gICAgdmFyICR0YXJnZXQgPSAkKHNlbGVjdG9yKVxuXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGhpcy5jbG9zZXN0KCdsaScpLCAkdWwpXG4gICAgdGhpcy5hY3RpdmF0ZSgkdGFyZ2V0LCAkdGFyZ2V0LnBhcmVudCgpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAkcHJldmlvdXMudHJpZ2dlcih7XG4gICAgICAgIHR5cGU6ICdoaWRkZW4uYnMudGFiJyxcbiAgICAgICAgcmVsYXRlZFRhcmdldDogJHRoaXNbMF1cbiAgICAgIH0pXG4gICAgICAkdGhpcy50cmlnZ2VyKHtcbiAgICAgICAgdHlwZTogJ3Nob3duLmJzLnRhYicsXG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6ICRwcmV2aW91c1swXVxuICAgICAgfSlcbiAgICB9KVxuICB9XG5cbiAgVGFiLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb250YWluZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyICRhY3RpdmUgICAgPSBjb250YWluZXIuZmluZCgnPiAuYWN0aXZlJylcbiAgICB2YXIgdHJhbnNpdGlvbiA9IGNhbGxiYWNrXG4gICAgICAmJiAkLnN1cHBvcnQudHJhbnNpdGlvblxuICAgICAgJiYgKCRhY3RpdmUubGVuZ3RoICYmICRhY3RpdmUuaGFzQ2xhc3MoJ2ZhZGUnKSB8fCAhIWNvbnRhaW5lci5maW5kKCc+IC5mYWRlJykubGVuZ3RoKVxuXG4gICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICRhY3RpdmVcbiAgICAgICAgLnJlbW92ZUNsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnPiAuZHJvcGRvd24tbWVudSA+IC5hY3RpdmUnKVxuICAgICAgICAgIC5yZW1vdmVDbGFzcygnYWN0aXZlJylcbiAgICAgICAgLmVuZCgpXG4gICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG5cbiAgICAgIGVsZW1lbnRcbiAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAuZmluZCgnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJylcbiAgICAgICAgICAuYXR0cignYXJpYS1leHBhbmRlZCcsIHRydWUpXG5cbiAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgIGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLy8gcmVmbG93IGZvciB0cmFuc2l0aW9uXG4gICAgICAgIGVsZW1lbnQuYWRkQ2xhc3MoJ2luJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2xhc3MoJ2ZhZGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoZWxlbWVudC5wYXJlbnQoJy5kcm9wZG93bi1tZW51JykubGVuZ3RoKSB7XG4gICAgICAgIGVsZW1lbnRcbiAgICAgICAgICAuY2xvc2VzdCgnbGkuZHJvcGRvd24nKVxuICAgICAgICAgICAgLmFkZENsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgIC5lbmQoKVxuICAgICAgICAgIC5maW5kKCdbZGF0YS10b2dnbGU9XCJ0YWJcIl0nKVxuICAgICAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgICAgfVxuXG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpXG4gICAgfVxuXG4gICAgJGFjdGl2ZS5sZW5ndGggJiYgdHJhbnNpdGlvbiA/XG4gICAgICAkYWN0aXZlXG4gICAgICAgIC5vbmUoJ2JzVHJhbnNpdGlvbkVuZCcsIG5leHQpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChUYWIuVFJBTlNJVElPTl9EVVJBVElPTikgOlxuICAgICAgbmV4dCgpXG5cbiAgICAkYWN0aXZlLnJlbW92ZUNsYXNzKCdpbicpXG4gIH1cblxuXG4gIC8vIFRBQiBQTFVHSU4gREVGSU5JVElPTlxuICAvLyA9PT09PT09PT09PT09PT09PT09PT1cblxuICBmdW5jdGlvbiBQbHVnaW4ob3B0aW9uKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICB2YXIgZGF0YSAgPSAkdGhpcy5kYXRhKCdicy50YWInKVxuXG4gICAgICBpZiAoIWRhdGEpICR0aGlzLmRhdGEoJ2JzLnRhYicsIChkYXRhID0gbmV3IFRhYih0aGlzKSkpXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSAnc3RyaW5nJykgZGF0YVtvcHRpb25dKClcbiAgICB9KVxuICB9XG5cbiAgdmFyIG9sZCA9ICQuZm4udGFiXG5cbiAgJC5mbi50YWIgICAgICAgICAgICAgPSBQbHVnaW5cbiAgJC5mbi50YWIuQ29uc3RydWN0b3IgPSBUYWJcblxuXG4gIC8vIFRBQiBOTyBDT05GTElDVFxuICAvLyA9PT09PT09PT09PT09PT1cblxuICAkLmZuLnRhYi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICQuZm4udGFiID0gb2xkXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG5cbiAgLy8gVEFCIERBVEEtQVBJXG4gIC8vID09PT09PT09PT09PVxuXG4gIHZhciBjbGlja0hhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIFBsdWdpbi5jYWxsKCQodGhpcyksICdzaG93JylcbiAgfVxuXG4gICQoZG9jdW1lbnQpXG4gICAgLm9uKCdjbGljay5icy50YWIuZGF0YS1hcGknLCAnW2RhdGEtdG9nZ2xlPVwidGFiXCJdJywgY2xpY2tIYW5kbGVyKVxuICAgIC5vbignY2xpY2suYnMudGFiLmRhdGEtYXBpJywgJ1tkYXRhLXRvZ2dsZT1cInBpbGxcIl0nLCBjbGlja0hhbmRsZXIpXG5cbn0oalF1ZXJ5KTtcbiIsImltcG9ydCAnLi9zbGljayc7XG5pbXBvcnQgJy4vbW9kYWwnO1xuaW1wb3J0ICcuL3RhYic7IiwibW9kdWxlLmV4cG9ydHMgPSBqUXVlcnk7Il0sInNvdXJjZVJvb3QiOiIifQ==