<template>
  <rf-pin :data-model="pinDataModel"
          :pin-placeholder="navPlaceholder">
    <div class="fr-anchor-nav" ref="frAnchorNav">
      <div class="fr-anchor-nav-wrapper">
        <div class="fr-anchor-nav-scroll" ref="frAnchorNavScroll">
          <slot></slot>
        </div>
      </div>
    </div>
  </rf-pin>
</template>

<style lang="stylus">
  .fr-anchor-nav-wrapper
    white-space nowrap
    overflow-x hidden
    .fr-anchor-nav-scroll
      position relative

</style>

<script type="text/babel">
  import Evter from '../../src/utils/evter';
  import Utils from '../../src/utils';
  import RfPin from '../pin/pin.vue';
  import AlloyTouch from 'alloytouch';
  import Transform from 'alloytouch/transformjs/transform';
  import ScrollTo from 'scroll-to';

  const ANCHOR_ATTR        = 'data-fr-anchor';
  const ANCHOR_TARGET_ATTR = 'data-fr-anchor-target';
  const ATTR_SCROLL_TO_Y   = 'data-scroll-to-y';

  function anchorClickHandler() {
    const y = +this.getAttribute(ATTR_SCROLL_TO_Y);
    ScrollTo(0, y, {ease: 'in-out-sine', duration: 500});
  }

  export default {
    name: 'fr-anchor-nav',

    data() {
      return {
        alloyTouch: null,
        translateXMin: 0,
        translateX: 0,
        anchorList: [],
        currentAnchor: '',
        bodyScrollHeight: 0,
        pinDataModel: 0,
      }
    },

    props: {
      value: {
        type: String,
        default: ''
      },

      triggerDistance: {
        type: Number,
        default: 0
      },

      dataModel: {
        type: Number,
        default: 0
      },

      navPlaceholder: {
        type: Boolean,
        default: false
      },

      // auto update anchor
      autoCalc: {
        type: Boolean,
        default: false
      },

    },

    watch: {
      value: function (val) {
        if (val !== this.currentAnchor) {
          this.goToAnchorTarget(val);
        }
      },

      /**
       * recalculate
       */
      dataModel: function (val) {
        this.pinDataModel = val;
        this.updateAnchor();
      },
    },

    mounted() {
      const nav      = this.$refs.frAnchorNav;
      const scroller = this.$refs.frAnchorNavScroll;

      this.translateXMin = -(scroller.scrollWidth - scroller.offsetWidth);
      Transform(scroller);
      this.$nextTick(() => {
        this.alloyTouch = new AlloyTouch({
          touch: nav,
          target: scroller,
          vertical: false,
          property: 'translateX',
          min: this.translateXMin,
          max: 0,
          maxSpeed: 1.5,
          animationEnd: value => this.translateX = value
        });
      });
      this.updateAnchor();
      Evter.on('windowScroll', this.windowScrollHandler);
    },

    methods: {
      /**
       * get anchor attribute(ANCHOR_ATTR) value
       * @param name
       * @returns {Element}
       */
      getAnchor(name) {
        return this.$refs.frAnchorNav.querySelector(`[${ANCHOR_ATTR}="${name}"]`);
      },

      /**
       * get anchor attribute(ANCHOR_ATTR) value
       * @param anchorElement
       * @returns {string}
       */
      getAnchorName(anchorElement) {
        return anchorElement.getAttribute(ANCHOR_ATTR);
      },

      /**
       * get anchor target element
       * @param anchorElement
       * @returns {Element}
       */
      getAnchorTarget(anchorElement) {
        const name = anchorElement.getAttribute(ANCHOR_ATTR);
        return document.querySelector(`[${ANCHOR_TARGET_ATTR}="${name}"]`);
      },

      setScrollTop(value) {
        ScrollTo(0, value, {ease: 'in-out-sine', duration: 500});
      },

      updateAnchor() {
        const anchors    = this.$refs.frAnchorNav.querySelectorAll(`[${ANCHOR_ATTR}]`);
        const anchorList = Array.prototype.slice.call(anchors).map(el => {
          const name   = this.getAnchorName(el);
          const target = this.getAnchorTarget(el);
          if (!target) return {};

          const targetTop = Utils.getElementTop(target);
          const scrollToY = targetTop - this.triggerDistance;
          el.setAttribute(ATTR_SCROLL_TO_Y, scrollToY);
          el.removeEventListener('click', anchorClickHandler);
          el.addEventListener('click', anchorClickHandler);

          return {name: name, targetTop: targetTop};
        });

        this.anchorList = anchorList.filter(d => d.name).sort((a, b) => a.targetTop - b.targetTop);
      },

      windowScrollHandler(scrollTop) {
        if (this.autoCalc) {
          const scrollHeight = document.body.scrollHeight;
          if (scrollHeight !== this.bodyScrollHeight) {
            this.pinDataModel     = scrollHeight;
            this.bodyScrollHeight = scrollHeight;
            this.updateAnchor();
          }
        }

        const list = this.anchorList;
        if (!list.length) return;

        let name = '';
        for (let i = list.length - 1; i >= 0; i--) {
          if (scrollTop + this.triggerDistance >= list[i].targetTop) {
            name = this.anchorList[i].name;
            break;
          }
        }

        if (this.currentAnchor !== name) {
          this.currentAnchor = name;
          this.$emit('input', name);
          this.updateNavItemTranslate();
        }
      },

      goToAnchorTarget(name) {
        const anchor       = this.getAnchor(name);
        const anchorTarget = anchor && this.getAnchorTarget(anchor);
        if (!anchorTarget) return;
        const targetTop = Utils.getElementTop(anchorTarget);

        this.setScrollTop(targetTop - this.triggerDistance);
      },

      async updateNavItemTranslate() {
        await this.$nextTick();
        const el = this.getAnchor(this.currentAnchor);
        if (!el) return;
        const container      = this.$refs.frAnchorNavScroll;
        const containerWidth = container.offsetWidth;
        const eleLeft        = Utils.getElementLeft(el, container);
        const marginLeft     = getComputedStyle(el, null).getPropertyValue('margin-left');
        const marginRight    = getComputedStyle(el, null).getPropertyValue('margin-right');
        const eleWidth       = el.offsetWidth + parseInt(marginLeft) + parseInt(marginRight);

        let x = -(eleLeft - (containerWidth - eleWidth) / 2);
        x     = x > 0 ? 0 : x < this.translateXMin ? this.translateXMin : x;

        this.alloyTouch.to(x, 300);
      }

    },

    components: {
      RfPin,
    },

  }
</script>
