const TOGGLE_TOKEN = 'open';

const burgerButton = document.querySelector("#navBurger");

const navMenu = document.querySelector(burgerButton.dataset.navTarget);

const hasToken = (tgt) => {
    return tgt.classList.contains(TOGGLE_TOKEN);
};

const addToken = (tgt) => {
    tgt.classList.add(TOGGLE_TOKEN);
};

const removeToken = (tgt) => {
    tgt.classList.remove(TOGGLE_TOKEN);
};

const toggleTarget = () => {
    hasToken(burgerButton) ? removeToken(burgerButton) : addToken(burgerButton);
    hasToken(navMenu) ? removeToken(navMenu) : addToken(navMenu);
};

burgerButton.addEventListener('click', toggleTarget, false);
