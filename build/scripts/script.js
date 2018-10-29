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

const burgerButton = document.querySelector(".burger-button");
const burgerMenu = document.querySelector(".section-header .menu");
const closeButton = burgerMenu.querySelector(".section-header .menu .close-button");
const body = document.body;

let scrollPosition;

function burgerButtonHandler() {
    scrollPosition = window.pageYOffset;
    burgerMenu.style.display = "flex";
    body.style.overflowY = "hidden";
    body.style.position = "fixed";
    body.style.top = -scrollPosition + 'px';
    raf(function () {
        burgerMenu.classList.add("open");
    });
}

function supportSideBarLeave() {
    burgerMenu.removeAttribute("style");
    // body.removeAttribute("style");
    body.style.removeProperty("overflow-y");
    body.style.removeProperty("position");
    body.style.removeProperty("top");
    window.scrollTo(0, scrollPosition);
    burgerMenu.removeEventListener("transitionend", supportSideBarLeave);
}

function supportMenuLeave(event) {
    /*let target = event.target;
    while (target !== this) {
        if (target === closeButton) return;
        target = target.parentNode;
    }*/
    burgerMenu.classList.remove("open");
    burgerMenu.addEventListener("transitionend", supportSideBarLeave);
    // burgerMenu.removeAttribute("style");
}


burgerButton.addEventListener("click", burgerButtonHandler);
burgerMenu.addEventListener("click", supportMenuLeave);






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

headerListHandler(headerLangList, headerLangBlock);
