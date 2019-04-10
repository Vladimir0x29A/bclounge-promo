"use strict";

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    function raf(fn) {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          fn();
        });
      });
    }

    function qs(selector) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (all) return parent.querySelectorAll(selector);
      return parent.querySelector(selector);
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
      // windowWidth = document.documentElement.clientWidth;
      windowWidth = window.innerWidth;
      fn();
      window.addEventListener("resize", function () {
        // windowWidth = document.documentElement.clientWidth;
        windowWidth = window.innerWidth;
        fn();
      });
    }

    eventWindowResize(function () {
      setLangWrapperWidth();
      scale(imageSlogan, 767, 560, 1, .8); // scale(imageSteps, 860, 460, .7, .5);
    }); // Advantages Lines

    var advLg = 0,
        advMd = 0;
    var sectAdv = document.querySelector('.section-advantages');
    var advTitle = sectAdv.querySelector('.title-section');
    var advTitleRect, advTitleHalfHeight, advSvgLinesTopOffset; // let advTitleHalfHeight = advTitle.getBoundingClientRect().height / 2;

    var advBlockImage = sectAdv.querySelector('.block-image');
    var advLogo = advBlockImage.querySelector('.logo');
    var advLogoHalfHeight;
    var advItemBlock = sectAdv.querySelector('.item-block');
    var advItem1 = advItemBlock.querySelector('.item:nth-child(1)');
    var advItem2 = advItemBlock.querySelector('.item:nth-child(2)');
    var advItem3 = advItemBlock.querySelector('.item:nth-child(3)');
    var advItem4 = advItemBlock.querySelector('.item:nth-child(4)');
    var advSvgLines = document.querySelector('#svg-advantage-lines-1');
    var commonPath = advSvgLines.querySelector('.line.common');
    var advSvgLinesPathBorder = advSvgLines.querySelector('.border');
    var advSvgObj = {
      'title': {
        x: 50,
        y: 112,
        align: 'tl'
      },
      'first': {
        x: 40,
        y: 90,
        align: 'tr'
      },
      'second': {
        x: 70,
        align: 'cr'
      },
      'third': {
        x: 36,
        y: 50,
        align: 'br'
      },
      'forth': {
        x: 46,
        y: 50,
        align: 'bl'
      }
    };
    var alingObj = {
      top: 0,
      center: 0,
      bottom: 0
    };
    var advSvgKeys = Object.keys(advSvgObj);

    function advLines() {
      var parent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document;

      var qs = function qs(sel) {
        return parent.querySelector(sel);
      };

      return advSvgKeys.map(function (key) {
        return {
          // path: qs(`.line.${key}`),
          cirS: qs("circle.start.".concat(key)),
          cirE: qs("circle.end.".concat(key))
        };
      });
    }

    var advEls = advLines();
    var lineLength = 50;
    var lineOffsetXTitle = 50,
        lineOffsetYTitle = 112;
    var lineOffsetXFirst = 40,
        lineOffsetYFirst = 90;
    var lineOffsetXSecond = 70;
    var lineOffsetXThird = 36,
        lineOffsetYThird = 50;
    var lineOffsetXForth = 46,
        lineOffsetYForth = 50;

    function advDrawLinesLg() {
      var advItemBlockRect = advItemBlock.getBoundingClientRect();
      var advItem1Margin = parseFloat(getComputedStyle(advItem1).marginRight); // *** top & bottom side offset

      var advHOffset1 = Math.ceil(advItem1.getBoundingClientRect().width + advItem1Margin); // let advHOffset2 = Math.ceil(advItem2.getBoundingClientRect().width);

      var advItem1Height = advItem1.getBoundingClientRect().height;
      var advItem1HalfHeight = advItem1Height / 2; // *** top

      var advItem2HalfHeight = advItem2.getBoundingClientRect().height / 2;
      var advItem3HalfHeight = advItem3.getBoundingClientRect().height / 2;
      var advItem4HalfHeight = advItem4.getBoundingClientRect().height / 2;
      var advVOffset = Math.ceil(advItem1Height + parseFloat(getComputedStyle(advItem2).marginTop) + advItem2HalfHeight); // *** center

      advTitle.style.top = -advTitleHalfHeight + advItem1HalfHeight + 'px';
      advLogoHalfHeight = advLogo.getBoundingClientRect().height / 2; // advLogo.style.transform = `translate(-50%, ${-advItemBlockRect.height / 2 + advVOffset - advLogoHalfHeight}px)`;
      // advLogo.style.transform = `translate(-50%, ${advVOffset - advLogoHalfHeight}px)`;

      advLogo.style.transform = "translate(-50%, ".concat(-advLogoHalfHeight, "px)");
      advSvgLines.style.transform = "translate(-50%, ".concat(-advVOffset, "px)");
      advBlockImage.style.transform = "translate(0, ".concat(advVOffset, "px)");
      var advSvgWidth = advItemBlockRect.width - advHOffset1 * 2;
      var advSvgHeight = advItemBlockRect.height;
      advSvgLines.setAttribute("width", advSvgWidth);
      advSvgLines.setAttribute("height", advSvgHeight);
      var bottomOffset = advSvgHeight - Math.max(advItem3HalfHeight, advItem4HalfHeight);
      advSvgLinesPathBorder.setAttribute("d", "M .5,.5 H ".concat(advSvgWidth - .5, " V ").concat(advSvgHeight - .5, " H .5 z"));
      advSvgObj.title.path = "M ".concat(advItem1Margin, ",").concat(advItem1HalfHeight, " h ").concat(lineLength, " L ").concat(advSvgWidth / 2 - lineOffsetXTitle, ",").concat(advVOffset - lineOffsetYTitle);
      advSvgObj.first.path = "M ".concat(advSvgWidth - advItem1Margin, ",").concat(advItem1HalfHeight, " h -").concat(lineLength, " L ").concat(advSvgWidth / 2 + lineOffsetXFirst, ",").concat(advVOffset - lineOffsetYFirst);
      advSvgObj.second.path = "M ".concat(advSvgWidth, ",").concat(advVOffset - .5, " H ").concat(advSvgWidth / 2 + lineOffsetXSecond);
      advSvgObj.third.path = "M ".concat(advSvgWidth - advItem1Margin, ",").concat(bottomOffset, " h -").concat(lineLength, " L ").concat(advSvgWidth / 2 + lineOffsetXThird, ",").concat(advVOffset + lineOffsetYThird);
      advSvgObj.forth.path = "M ".concat(advItem1Margin, ",").concat(bottomOffset, " h ").concat(lineLength, " L ").concat(advSvgWidth / 2 - lineOffsetXForth, ",").concat(advVOffset + lineOffsetYForth);
      commonPath.setAttribute("d", advSvgKeys.reduce(function (result, current) {
        return result + advSvgObj[current].path;
      }, advSvgObj[advSvgKeys[0]].path));
      advEls[0].cirS.setAttribute("cx", advItem1Margin);
      advEls[0].cirS.setAttribute("cy", advItem1HalfHeight);
      advEls[1].cirS.setAttribute("cx", advSvgWidth - advItem1Margin);
      advEls[1].cirS.setAttribute("cy", advItem1HalfHeight);
      advEls[2].cirS.setAttribute("cx", advSvgWidth - 2);
      advEls[2].cirS.setAttribute("cy", advVOffset - .5);
      advEls[3].cirS.setAttribute("cx", advSvgWidth - advItem1Margin);
      advEls[3].cirS.setAttribute("cy", bottomOffset);
      advEls[4].cirS.setAttribute("cx", advItem1Margin);
      advEls[4].cirS.setAttribute("cy", bottomOffset);
      advEls[0].cirE.setAttribute("cx", advSvgWidth / 2 - lineOffsetXTitle);
      advEls[0].cirE.setAttribute("cy", advVOffset - lineOffsetYTitle);
      advEls[1].cirE.setAttribute("cx", advSvgWidth / 2 + lineOffsetXFirst);
      advEls[1].cirE.setAttribute("cy", advVOffset - lineOffsetYFirst);
      advEls[2].cirE.setAttribute("cx", advSvgWidth / 2 + lineOffsetXSecond);
      advEls[2].cirE.setAttribute("cy", advVOffset - .5);
      advEls[3].cirE.setAttribute("cx", advSvgWidth / 2 + lineOffsetXThird);
      advEls[3].cirE.setAttribute("cy", advVOffset + lineOffsetYThird);
      advEls[4].cirE.setAttribute("cx", advSvgWidth / 2 - lineOffsetXForth);
      advEls[4].cirE.setAttribute("cy", advVOffset + lineOffsetYForth);
    }

    var lineLengthMd = 40;
    var lineOffsetXFirstMd = 95,
        lineOffsetYFirstMd = 55;
    var lineOffsetXSecondMd = 95;
    var lineOffsetXThirdMd = 45,
        lineOffsetYThirdMd = 250;

    function advDrawLinesMd() {
      var advSvgWidth = advItem1.getBoundingClientRect().left - 40;
      var advItem1Height = advItem1.getBoundingClientRect().height;
      var topMargin = parseFloat(getComputedStyle(advItem2).marginTop);
      var advItem2Height = advItem2.getBoundingClientRect().height;
      var advItem3Height = advItem3.getBoundingClientRect().height;
      var advFirstThree = advItem1Height + topMargin * 2 + advItem2Height + advItem3Height; // advSvgLinesTopOffset = advTitleRect.height + parseFloat(getComputedStyle(advTitle).marginBottom) + advFirstThree / 2;

      var top = advItem1Height / 2;
      var middle = advItem1Height + topMargin + advItem2Height / 2;
      var bottom = advFirstThree - advItem3Height / 2;
      advSvgLinesTopOffset = advTitleRect.height + parseFloat(getComputedStyle(advTitle).marginBottom) + middle;
      advLogoHalfHeight = advLogo.getBoundingClientRect().height / 2; // console.log(advLogoHalfHeight);

      advSvgLines.setAttribute("height", advFirstThree);
      advBlockImage.style.transform = "translate(0, ".concat(advSvgLinesTopOffset, "px)");
      advSvgLines.style.transform = "translate(0, ".concat(-middle, "px)");
      advSvgLines.setAttribute("width", advSvgWidth);
      advSvgLinesPathBorder.setAttribute("d", "M .5,.5 H ".concat(advSvgWidth - .5, " V ").concat(advFirstThree - .5, " H .5 z"));
      advSvgObj.first.path = "M ".concat(advSvgWidth, ",").concat(top, " h -").concat(lineLengthMd, " L ").concat(lineOffsetXFirstMd, ",").concat(lineOffsetYFirstMd);
      advSvgObj.second.path = "M ".concat(advSvgWidth, ",").concat(middle, " H ").concat(lineOffsetXSecondMd);
      advSvgObj.third.path = "M ".concat(advSvgWidth, ",").concat(bottom, " h -").concat(lineLengthMd, " L ").concat(lineOffsetXThirdMd, ",").concat(lineOffsetYThirdMd);
      commonPath.setAttribute("d", advSvgObj.first.path + advSvgObj.second.path + advSvgObj.third.path);
      advEls[1].cirS.setAttribute("cx", advSvgWidth - 2);
      advEls[1].cirS.setAttribute("cy", top);
      advEls[2].cirS.setAttribute("cx", advSvgWidth - 2);
      advEls[2].cirS.setAttribute("cy", middle);
      advEls[3].cirS.setAttribute("cx", advSvgWidth - 2);
      advEls[3].cirS.setAttribute("cy", bottom);
      advEls[1].cirE.setAttribute("cx", lineOffsetXFirstMd);
      advEls[1].cirE.setAttribute("cy", lineOffsetYFirstMd);
      advEls[2].cirE.setAttribute("cx", lineOffsetXSecondMd);
      advEls[2].cirE.setAttribute("cy", middle);
      advEls[3].cirE.setAttribute("cx", lineOffsetXThirdMd);
      advEls[3].cirE.setAttribute("cy", lineOffsetYThirdMd);
    }

    function adaptiveLines() {
      if (window.innerWidth > 960) {
        advMd = 0;

        if (!advLg) {
          advTitleRect = advTitle.getBoundingClientRect();
          advTitleHalfHeight = advTitleRect.height / 2; // advBlockImage.removeAttribute('style');

          advLg = 1;
        }

        advDrawLinesLg();
      } else {
        advLg = 0;

        if (!advMd) {
          advTitleRect = advTitle.getBoundingClientRect();
          advTitleHalfHeight = advTitleRect.height / 2;
          advTitle.removeAttribute('style');
          advLogo.removeAttribute('style');
          advSvgLines.removeAttribute('style'); // advBlockImage.removeAttribute('style');

          advMd = 1;
        }

        advDrawLinesMd();
      }
    }

    adaptiveLines();
    window.addEventListener("resize", function () {
      adaptiveLines();
    });
  });
})();