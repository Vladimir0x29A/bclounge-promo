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





// Calculate blocks' size

/*
let headerMenuLinks = document.querySelector('.section-header .menu-links');
let langWrapper = document.querySelector('.section-header .wrapper-menu > .wrapper');

function setLangWrapperWidth() {
    let windowWidth = document.documentElement.clientWidth;
    let headerLangBlockWidth = headerLangBlock.getBoundingClientRect().width;
    let headerLangLinksWidth = headerMenuLinks.getBoundingClientRect().width;
    let langWrapperWidth = headerLangLinksWidth + headerLangBlockWidth;

    if (windowWidth < 630) {
        langWrapper.style.maxWidth = langWrapperWidth + "px";
    } else {
        langWrapper.removeAttribute("style");
    }
}

setLangWrapperWidth();

window.addEventListener("resize", function () {
    setLangWrapperWidth();
});*/
