import Evt from './evt';

const evter = new Evt();

window.addEventListener('scroll', function () {
  const scrollTop = document.body.scrollTop
    || window.pageYOffset
    || document.documentElement.scrollTop;
  evter.emit('windowScroll', scrollTop);
});

export default evter;