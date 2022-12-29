const headerTopNav = document.querySelector('.header-top__nav');
const headerTopToggle = document.querySelector('.header-top__toggle');

headerTopNav.classList.remove('header-top__nav--nojs');

headerTopToggle.addEventListener('click', () => {
  if (headerTopNav.classList.contains('header-top__nav--mobile-menu-closed')) {
    headerTopNav.classList.remove('header-top__nav--mobile-menu-closed');
    headerTopNav.classList.add('header-top__nav--mobile-menu-opened');
  } else {
    headerTopNav.classList.remove('header-top__nav--mobile-menu-opened');
    headerTopNav.classList.add('header-top__nav--mobile-menu-closed');
  }
});
