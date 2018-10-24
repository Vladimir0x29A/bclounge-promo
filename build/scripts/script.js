function raf(fn) {
    window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
            fn();
        });
    });
}





//Fixed menu

let sectionMenu = document.querySelector('.section-header');

window.addEventListener("scroll", function () {
    if (sectionMenu.classList.contains('fixed') && window.pageYOffset < 60) {
        sectionMenu.classList.remove('fixed');
    } else if (window.pageYOffset > 60) {
        sectionMenu.classList.add('fixed');
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
