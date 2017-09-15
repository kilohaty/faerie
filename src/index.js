import "./css/normalize.css";
import AnchorNav from '../packages/anchor-nav/anchor-nav.vue';
import Button from '../packages/button/button.vue';
import Pin from '../packages/pin/pin.vue';
import Scroll from '../packages/scroll/scroll.vue';
import Toast from '../packages/toast/toast';

const install = function (Vue) {
  if (install.installed) {
    return;
  }

  Vue.component(AnchorNav.name, AnchorNav);
  Vue.component(Button.name, Button);
  Vue.component(Pin.name, Pin);
  Vue.component(Scroll.name, Scroll);
  Vue.$toast = Vue.prototype.$toast = Toast;
};

export default {
  install,
  AnchorNav,
  Button,
  Toast,
};
