(function () {

    document.addEventListener('DOMContentLoaded', function () {

        function raf(fn) {
            window.requestAnimationFrame(function () {
                window.requestAnimationFrame(function () {
                    fn();
                });
            });
        }

        function qs(selector, parent = document, all = false) {
            if (all) return parent.querySelectorAll(selector);
            return parent.querySelector(selector);
        }

        //Fixed menu

        const fixedSection = document.querySelector('.section-header');
        const fixedSectionTop = fixedSection.getBoundingClientRect().top + window.pageYOffset;

        window.addEventListener("scroll", function () {
            if (fixedSection.classList.contains('fixed') && window.pageYOffset < fixedSectionTop) {
                fixedSection.classList.remove('fixed');
            } else if (!fixedSection.classList.contains('fixed') && window.pageYOffset > fixedSectionTop) {
                fixedSection.classList.add('fixed');
            }
        });


        // Burger menu

        const header = document.querySelector(".section-header");
        const burgerMenu = document.querySelector(".section-header .menu");
        const burgerButton = document.querySelector(".burger-button");

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
        headerMenuHandler(burgerMenu, burgerButton, "flex");


        // Language selection

        let headerLangBlock = document.querySelector('.section-header .menu-lang');
        let headerLangList = document.querySelector('.section-header .menu-lang-select');
        let menuWrapper = document.querySelector('.section-header .wrapper .wrapper-menu');

        function headerListHide(list, block, wrapper) {
            let handlerLangBlockTransitionLeave = function () {
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

        headerListHandler(headerLangList, headerLangBlock, menuWrapper);


        // Calculate blocks' size to set as language selector wrapper size

        let windowWidth;

        let headerMenuLinks = document.querySelector('.section-header .menu-links');
        let langWrapper = document.querySelector('.section-header .wrapper-menu > .wrapper');

        let langWrapperWidth, previousLangWrapperWidth;

        function setLangWrapperWidth() {
            let headerLangBlockWidth = headerLangBlock.getBoundingClientRect().width;
            let headerLangLinksWidth = headerMenuLinks.getBoundingClientRect().width;
            previousLangWrapperWidth = langWrapperWidth;
            langWrapperWidth = headerLangLinksWidth + headerLangBlockWidth;

            if (windowWidth <= 560 && langWrapperWidth !== 0) {
                langWrapper.style.maxWidth = langWrapperWidth + "px";
            } else {
                langWrapper.removeAttribute("style");
            }
        }


        // Adaptive scale

        let imageSlogan = document.querySelector('.section-slogan .button');

        // let imageSteps = document.querySelector('.section-steps .block-image');

        function scale(docobj, maxScreen, minScreen, maxValue, minValue, additionalString) {
            // console.log(getComputedStyle(docobj).transform);

            let m = (maxValue - minValue) / (maxScreen - minScreen);
            let b = minValue - m * minScreen;
            let result = Math.floor((windowWidth * m + b) * 100) / 100;
            additionalString = additionalString || "";

            if (windowWidth < maxScreen && windowWidth > minScreen) {
                docobj.style.transform = additionalString + `scale(${result})`;
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
            scale(imageSlogan, 767, 560, 1, .8);
            // scale(imageSteps, 860, 460, .7, .5);
        });





        // Advantages Lines

        let advLg = 0,
            advMd = 0;

        const sectAdv = document.querySelector('.section-advantages');

        const advTitle = sectAdv.querySelector('.title-section');
        let advTitleRect,
            advTitleHalfHeight,
            advSvgLinesTopOffset;
        // let advTitleHalfHeight = advTitle.getBoundingClientRect().height / 2;

        const advBlockImage = sectAdv.querySelector('.block-image');
        const advLogo = advBlockImage.querySelector('.logo');
        let advLogoHalfHeight;

        const advItemBlock = sectAdv.querySelector('.item-block');

        const advItem1 = advItemBlock.querySelector('.item:nth-child(1)');
        const advItem2 = advItemBlock.querySelector('.item:nth-child(2)');
        const advItem3 = advItemBlock.querySelector('.item:nth-child(3)');
        const advItem4 = advItemBlock.querySelector('.item:nth-child(4)');

        const advSvgLines = document.querySelector('#svg-advantage-lines-1');
        const commonPath = advSvgLines.querySelector('.line.common');
        let advSvgLinesPathBorder = advSvgLines.querySelector('.border');

        const advSvgObj = {
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

        const alingObj = {
            top: 0,
            center: 0,
            bottom: 0
        };

        const advSvgKeys = Object.keys(advSvgObj);

        function advLines(parent = document) {
            const qs = (sel) => parent.querySelector(sel);
            return advSvgKeys.map(function (key) {
                return {
                     // path: qs(`.line.${key}`),
                     cirS: qs(`circle.start.${key}`),
                     cirE: qs(`circle.end.${key}`)
                }
            });
        }

        const advEls = advLines();

        const lineLength = 50;
        const lineOffsetXTitle = 50, lineOffsetYTitle = 112;
        const lineOffsetXFirst = 40, lineOffsetYFirst = 90;
        const lineOffsetXSecond = 70;
        const lineOffsetXThird = 36, lineOffsetYThird = 50;
        const lineOffsetXForth = 46, lineOffsetYForth = 50;

        function advDrawLinesLg() {
            let advItemBlockRect = advItemBlock.getBoundingClientRect();

            let advItem1Margin = parseFloat(getComputedStyle(advItem1).marginRight); // *** top & bottom side offset
            let advHOffset1 = Math.ceil(advItem1.getBoundingClientRect().width + advItem1Margin);
            // let advHOffset2 = Math.ceil(advItem2.getBoundingClientRect().width);
            let advItem1Height = advItem1.getBoundingClientRect().height;
            let advItem1HalfHeight = advItem1Height / 2; // *** top
            let advItem2HalfHeight = advItem2.getBoundingClientRect().height / 2;
            let advItem3HalfHeight = advItem3.getBoundingClientRect().height / 2;
            let advItem4HalfHeight = advItem4.getBoundingClientRect().height / 2;
            let advVOffset = Math.ceil(advItem1Height + parseFloat(getComputedStyle(advItem2).marginTop) + advItem2HalfHeight); // *** center

            advTitle.style.top = -advTitleHalfHeight + advItem1HalfHeight + 'px';

            advLogoHalfHeight = advLogo.getBoundingClientRect().height / 2;
            // advLogo.style.transform = `translate(-50%, ${-advItemBlockRect.height / 2 + advVOffset - advLogoHalfHeight}px)`;
            // advLogo.style.transform = `translate(-50%, ${advVOffset - advLogoHalfHeight}px)`;
            advLogo.style.transform = `translate(-50%, ${-advLogoHalfHeight}px)`;
            advSvgLines.style.transform = `translate(-50%, ${-advVOffset}px)`;
            advBlockImage.style.transform = `translate(0, ${advVOffset}px)`;

            let advSvgWidth = advItemBlockRect.width - advHOffset1 * 2;
            let advSvgHeight = advItemBlockRect.height;
            advSvgLines.setAttribute("width", advSvgWidth);
            advSvgLines.setAttribute("height", advSvgHeight);

            let bottomOffset = advSvgHeight - Math.max(advItem3HalfHeight, advItem4HalfHeight);

            advSvgLinesPathBorder.setAttribute("d", `M .5,.5 H ${advSvgWidth - .5} V ${advSvgHeight - .5} H .5 z`);

            advSvgObj.title.path = `M ${advItem1Margin},${advItem1HalfHeight} h ${lineLength} L ${advSvgWidth / 2 - lineOffsetXTitle},${advVOffset - lineOffsetYTitle}`;
            advSvgObj.first.path = `M ${advSvgWidth - advItem1Margin},${advItem1HalfHeight} h -${lineLength} L ${advSvgWidth / 2 + lineOffsetXFirst},${advVOffset - lineOffsetYFirst}`;
            advSvgObj.second.path = `M ${advSvgWidth},${advVOffset - .5} H ${advSvgWidth / 2 + lineOffsetXSecond}`;
            advSvgObj.third.path = `M ${advSvgWidth - advItem1Margin},${bottomOffset} h -${lineLength} L ${advSvgWidth / 2 + lineOffsetXThird},${advVOffset + lineOffsetYThird}`;
            advSvgObj.forth.path = `M ${advItem1Margin},${bottomOffset} h ${lineLength} L ${advSvgWidth / 2 - lineOffsetXForth},${advVOffset + lineOffsetYForth}`;

            commonPath.setAttribute("d", advSvgKeys.reduce((result, current) => result + advSvgObj[current].path, advSvgObj[advSvgKeys[0]].path));

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

        const lineLengthMd = 40;
        const lineOffsetXFirstMd = 95, lineOffsetYFirstMd = 55;
        const lineOffsetXSecondMd = 95;
        const lineOffsetXThirdMd = 45, lineOffsetYThirdMd = 250;

        function advDrawLinesMd() {
            let advSvgWidth = advItem1.getBoundingClientRect().left - 40;

            let advItem1Height = advItem1.getBoundingClientRect().height;
            let topMargin = parseFloat(getComputedStyle(advItem2).marginTop);
            let advItem2Height = advItem2.getBoundingClientRect().height;
            let advItem3Height = advItem3.getBoundingClientRect().height;
            let advFirstThree = advItem1Height + topMargin * 2 + advItem2Height + advItem3Height;
            // advSvgLinesTopOffset = advTitleRect.height + parseFloat(getComputedStyle(advTitle).marginBottom) + advFirstThree / 2;
            let top = advItem1Height / 2;
            let middle = advItem1Height + topMargin + advItem2Height / 2;
            let bottom = advFirstThree - advItem3Height / 2;

            advSvgLinesTopOffset = advTitleRect.height + parseFloat(getComputedStyle(advTitle).marginBottom) + middle;

            advLogoHalfHeight = advLogo.getBoundingClientRect().height / 2;
            // console.log(advLogoHalfHeight);

            advSvgLines.setAttribute("height", advFirstThree);
            advBlockImage.style.transform = `translate(0, ${advSvgLinesTopOffset}px)`;
            advSvgLines.style.transform = `translate(0, ${-middle}px)`;

            advSvgLines.setAttribute("width", advSvgWidth);

            advSvgLinesPathBorder.setAttribute("d", `M .5,.5 H ${advSvgWidth - .5} V ${advFirstThree - .5} H .5 z`);

            advSvgObj.first.path = `M ${advSvgWidth},${top} h -${lineLengthMd} L ${lineOffsetXFirstMd},${lineOffsetYFirstMd}`;
            advSvgObj.second.path = `M ${advSvgWidth},${middle} H ${lineOffsetXSecondMd}`;
            advSvgObj.third.path = `M ${advSvgWidth},${bottom} h -${lineLengthMd} L ${lineOffsetXThirdMd},${lineOffsetYThirdMd}`;

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
                    advTitleHalfHeight = advTitleRect.height / 2;
                    // advBlockImage.removeAttribute('style');
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
                    advSvgLines.removeAttribute('style');
                    // advBlockImage.removeAttribute('style');
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