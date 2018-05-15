import Vue from 'vue';

const LoadingConstructor = Vue.extend(require('./loading.vue').default);

let loadingInstance = null;

const getInstance = () => {
  if (!loadingInstance) {
    loadingInstance = new LoadingConstructor({el: document.createElement('div')});
  }
  return loadingInstance;
};

const Loading = (function () {
  return {
    show(options) {
      const message  = typeof options === 'object' ? options.message : options;
      const showIcon = typeof options === 'object' && typeof options.showIcon === 'boolean'
        ? options.showIcon : true;
      if (!loadingInstance) {
        getInstance();
        document.body.appendChild(loadingInstance.$el);
      }
      loadingInstance.message  = message || '加载中';
      loadingInstance.visible  = true;
      loadingInstance.showIcon = showIcon;
    },

    hide() {
      if (loadingInstance) loadingInstance.visible = false;
    }
  };
}());

console.log(Loading);

export default Loading;
