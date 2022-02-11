var button = document.querySelector('.nabar__menu-toggler');
var menu = document.querySelector('.main-nav');
button.onclick = function() {
  menu.classList.toggle('main-nav--visible');
}

