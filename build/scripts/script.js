function raf(fn) {
    window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
            fn();
        });
    });
}





//Fixed menu

const fixedSection = document.querySelector('.section-header');
const fixedSectionTop = fixedSection.getBoundingClientRect().top + window.pageYOffset;

window.addEventListener("scroll", function () {
    if (fixedSection.classList.contains('fixed') && window.pageYOffset < fixedSectionTop) {
        fixedSection.classList.remove('fixed');
    } else if (window.pageYOffset > fixedSectionTop) {
        fixedSection.classList.add('fixed');
    }
});





// Burger menu

const header = document.querySelector(".section-header");
const burgerMenu = document.querySelector(".section-header .menu");
const burgerButton = document.querySelector(".burger-button");

function burgerButtonHandler() {
    burgerMenu.classList.toggle("open");
    header.classList.toggle("open");
    burgerButton.classList.toggle("open");
}

burgerButton.addEventListener("click", burgerButtonHandler);





// Language selection

let headerLangBlock = document.querySelector('.section-header .menu-lang');
let headerLangList = document.querySelector('.section-header .menu-lang-select');

function headerListHide(list, block) {
    let handlerLangBlockTransitionLeave = function () {
        if (!list.classList.contains("open")) {
            list.removeAttribute("style");
        }
        list.removeEventListener('transitionend', handlerLangBlockTransitionLeave);
    };

    list.classList.remove('open');
    block.classList.remove('open');
    list.addEventListener('transitionend', handlerLangBlockTransitionLeave);
}

function headerListHandler(list, block, display) {
    block.addEventListener("click", function () {
        if (list.classList.contains('open')) {
            headerListHide(list, block);
        } else {
            list.style.display = display || "block";
            raf(function () {
                list.classList.add('open');
                block.classList.add('open');
            });
        }
    });

    document.addEventListener("click", function (e) {
        if (!block.contains(e.target)) {
            if (list.classList.contains('open')) {
                headerListHide(list, block);
            }
        }
    });
}

headerListHandler(headerLangList, headerLangBlock, "flex");





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

    if (windowWidth < 630) {
        if (langWrapperWidth !== previousLangWrapperWidth) langWrapper.style.maxWidth = langWrapperWidth + "px";
    } else {
        langWrapper.removeAttribute("style");
    }
}

setLangWrapperWidth();





// Adaptive scale

let image = document.querySelector('.section-slogan .button');

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
    windowWidth = document.documentElement.clientWidth;
    fn();
    window.addEventListener("resize", function () {
        windowWidth = document.documentElement.clientWidth;
        fn();
    });
}

eventWindowResize(function () {
    setLangWrapperWidth();
    scale(image, 767, 560, 1, .8);
});
