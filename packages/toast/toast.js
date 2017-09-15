import Vue from 'vue';
const ToastConstructor = Vue.extend(require('./toast.vue').default);

let toastInstance = null;

const getInstance = () => {
  if (!toastInstance) {
    toastInstance = new ToastConstructor({el: document.createElement('div')});
  }
  return toastInstance;
};

const Toast = (options = {}) => {
  const duration = options.duration || 2500;
  const message  = typeof options === 'object' ? options.message : options;
  const instance = getInstance();

  clearTimeout(instance.timer);
  document.body.appendChild(instance.$el);

  Vue.nextTick(function () {
    instance.message = message || '';
    instance.visible = true;
    instance.timer   = setTimeout(function () {
      instance.visible = false;
    }, duration);
  });
  return instance;
};

export default Toast;
