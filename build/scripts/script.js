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
