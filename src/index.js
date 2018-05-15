import './css/normalize.css';
import AnchorNav from '../packages/anchor-nav/anchor-nav.vue';
import Button from '../packages/button/button.vue';
import Pin from '../packages/pin/pin.vue';
import Scroll from '../packages/scroll/scroll.vue';
import Toast from '../packages/toast/toast';
import Loading from '../packages/loading/loading';
import vFeedback from 'v-feedback';

const install = function (Vue) {
  if (install.installed) {
    return;
  }

  Vue.use(vFeedback);
  Vue.component(AnchorNav.name, AnchorNav);
  Vue.component(Button.name, Button);
  Vue.component(Pin.name, Pin);
  Vue.component(Scroll.name, Scroll);
  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$showLoading = Vue.prototype.$showLoading = Loading.show;
  Vue.$hideLoading = Vue.prototype.$hideLoading = Loading.hide;
};

export default {
  install,
  AnchorNav,
  Button,
  Toast,
  Loading,
};
