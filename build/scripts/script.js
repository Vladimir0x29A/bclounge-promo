"use strict";

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    function raf(fn) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          fn();
        });
      });
    } //Fixed menu


    var fixedSection = document.querySelector('.section-header');
    var fixedSectionTop = fixedSection.getBoundingClientRect().top + window.pageYOffset;
    window.addEventListener("scroll", function () {
      if (fixedSection.classList.contains('fixed') && window.pageYOffset < fixedSectionTop) {
        fixedSection.classList.remove('fixed');
      } else if (!fixedSection.classList.contains('fixed') && window.pageYOffset > fixedSectionTop) {
        fixedSection.classList.add('fixed');
      }
    }); // Burger menu

    var header = document.querySelector(".section-header");
    var burgerMenu = document.querySelector(".section-header .menu");
    var burgerButton = document.querySelector(".burger-button");

    function headerMenuHandler(list, block, display) {
      block.addEventListener("click", function () {
        if (list.classList.contains('open')) {
          headerListHide(list, block);
        } else {
          list.style.display = display || "block";
          raf(function () {
            list.classList.add('open');
            block.classList.add('open');
            setLangWrapperWidth();
          });
        }
      });
    }

    function burgerButtonHandler() {
      header.classList.toggle("open");
    }

    burgerButton.addEventListener("click", burgerButtonHandler);
    headerMenuHandler(burgerMenu, burgerButton, "flex"); // Language selection

    var headerLangBlock = document.querySelector('.section-header .menu-lang');
    var headerLangList = document.querySelector('.section-header .menu-lang-select');
    var menuWrapper = document.querySelector('.section-header .wrapper .wrapper-menu');

    function headerListHide(list, block, wrapper) {
      var handlerLangBlockTransitionLeave = function handlerLangBlockTransitionLeave() {
        if (!list.classList.contains("open")) {
          wrapper.removeAttribute("style");
        }

        list.removeEventListener('transitionend', handlerLangBlockTransitionLeave);
      };

      list.classList.remove('open');
      block.classList.remove('open');
      list.addEventListener('transitionend', handlerLangBlockTransitionLeave);
    }

    function headerListHandler(list, block, wrapper) {
      block.addEventListener("click", function () {
        if (list.classList.contains('open')) {
          headerListHide(list, block, wrapper);
        } else {
          wrapper.style.display = "block";
          raf(function () {
            list.classList.add('open');
            block.classList.add('open');
          });
        }
      });
      document.addEventListener("click", function (e) {
        if (!block.contains(e.target)) {
          if (list.classList.contains('open')) {
            headerListHide(list, block, wrapper);
          }
        }
      });
    }

    headerListHandler(headerLangList, headerLangBlock, menuWrapper); // Calculate blocks' size to set as language selector wrapper size

    var windowWidth;
    var headerMenuLinks = document.querySelector('.section-header .menu-links');
    var langWrapper = document.querySelector('.section-header .wrapper-menu > .wrapper');
    var langWrapperWidth, previousLangWrapperWidth;

    function setLangWrapperWidth() {
      var headerLangBlockWidth = headerLangBlock.getBoundingClientRect().width;
      var headerLangLinksWidth = headerMenuLinks.getBoundingClientRect().width;
      previousLangWrapperWidth = langWrapperWidth;
      langWrapperWidth = headerLangLinksWidth + headerLangBlockWidth;

      if (windowWidth <= 560 && langWrapperWidth !== 0) {
        langWrapper.style.maxWidth = langWrapperWidth + "px";
      } else {
        langWrapper.removeAttribute("style");
      }
    } // Adaptive scale


    var imageSlogan = document.querySelector('.section-slogan .button'); // let imageSteps = document.querySelector('.section-steps .block-image');

    function scale(docobj, maxScreen, minScreen, maxValue, minValue, additionalString) {
      // console.log(getComputedStyle(docobj).transform);
      var m = (maxValue - minValue) / (maxScreen - minScreen);
      var b = minValue - m * minScreen;
      var result = Math.floor((windowWidth * m + b) * 100) / 100;
      additionalString = additionalString || "";

      if (windowWidth < maxScreen && windowWidth > minScreen) {
        docobj.style.transform = additionalString + "scale(".concat(result, ")");
      } else {
        docobj.removeAttribute("style");
      }
    }

    function eventWindowResize(fn) {
      windowWidth = document.documentElement.clientWidth;
      fn();
      window.addEventListener("resize", function () {
        windowWidth = document.documentElement.clientWidth;
        fn();
      });
    }

    eventWindowResize(function () {
      setLangWrapperWidth();
      scale(imageSlogan, 767, 560, 1, .8); // scale(imageSteps, 860, 460, .7, .5);
    });
  });
})();