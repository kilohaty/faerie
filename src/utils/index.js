/**
 * get element top offset
 * @param element
 * @param parent
 * @returns {*|Number|number}
 */
function getElementTop(element, parent = null) {
  let actualTop = element.offsetTop;
  let current   = element.offsetParent;

  while (current !== null && current !== parent) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}

/**
 * get element left offset
 * @param element
 * @param parent
 * @returns {*|Number|number}
 */
function getElementLeft(element, parent = null) {
  let actualLeft = element.offsetLeft;
  let current    = element.offsetParent;

  while (current !== null && current !== parent) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }

  return actualLeft;
}

/**
 * generate id
 * @returns {string}
 */
function getId() {
  let id        = "";
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 32; i++) {
    id += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return id;
}

export default {
  getElementTop,
  getElementLeft,
  getId,
};