export default function (designWidth, rem2px) {
  const head = document.querySelector('head');
  const d = document.createElement('div');
  d.style.width = '1rem';
  d.style.display = 'none';
  head.appendChild(d);
  const defaultFontSize = parseFloat(getComputedStyle(d, null).getPropertyValue('width'));
  d.parentNode.removeChild(d);
  const st = document.createElement('style');
  const portrait = `@media screen and (min-width: ${window.innerWidth}px) {html{font-size: ${((window.innerWidth / (designWidth / rem2px) / defaultFontSize) * 100)}%;}}`;
  const landscape = `@media screen and (min-width: ${window.innerHeight}px) {html{font-size: ${((window.innerHeight / (designWidth / rem2px) / defaultFontSize) * 100)}%;}}`;
  st.innerHTML = portrait + landscape;
  head.appendChild(st);

  return defaultFontSize;
}