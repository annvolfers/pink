import { isOutsideClick, isEscapeKey } from './util.js';

const headerTopNavSelector = '.header-top__nav';
const headerTopNav = document.querySelector(headerTopNavSelector);
const headerTopToggle = document.querySelector('.header-top__toggle');

function closeMenu() {
  headerTopNav.classList.remove('header-top__nav--mobile-menu-opened');
  headerTopNav.classList.add('header-top__nav--mobile-menu-closed');
  headerTopToggle.querySelector('span').textContent = 'Открыть меню.';
}

function openMenu() {
  headerTopNav.classList.remove('header-top__nav--mobile-menu-closed');
  headerTopNav.classList.add('header-top__nav--mobile-menu-opened');
  headerTopToggle.querySelector('span').textContent = 'Закрыть меню.';
}

function outsideClickHandler(evt) {
  if (isOutsideClick(evt, headerTopNavSelector)) {
    closeMenu();
  }
}

function escKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMenu();
  }
}

headerTopNav.classList.remove('header-top__nav--nojs');

headerTopToggle.addEventListener('click', () => {
  if (headerTopNav.classList.contains('header-top__nav--mobile-menu-closed')) {
    openMenu();

    document.addEventListener('click', outsideClickHandler);
    document.addEventListener('keydown', escKeydownHandler);
  } else {
    closeMenu();

    document.removeEventListener('click', outsideClickHandler);
    document.removeEventListener('keydown', escKeydownHandler);
  }
});
