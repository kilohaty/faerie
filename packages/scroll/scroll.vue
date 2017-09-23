<template>
  <div class="fr-scroll" :class="scrollClass" ref="frScroll">
    <div class="fr-scroll-wrapper" ref="frScrollWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="stylus">
  .fr-scroll.horizontal
    overflow-x hidden
    .fr-scroll-wrapper
      width 100%
      white-space nowrap

  .fr-scroll.vertical
    overflow-y hidden
    height 100%
    .fr-scroll-wrapper
      height 100%

</style>

<script type="text/babel">
  import AlloyTouch from 'alloytouch';
  import Transform from 'alloytouch/transformjs/transform';
  import Utils from '../../src/utils';

  export default {
    name: 'fr-scroll',

    data() {
      return {
        alloyTouch: null,
      }
    },

    props: {
      /**
       * horizontal | vertical
       */
      direction: {
        type: String,
        default: 'horizontal'
      },

      autoCenter: {
        type: Boolean,
        default: false
      },

      elSelector: {
        type: String,
        default: ''
      }
    },

    computed: {
      optionVertical() {
        return this.direction === 'vertical';
      },
      optionProperty() {
        return this.direction === 'vertical' ? 'translateY' : 'translateX';
      },
      optionMin() {
        const scroller = this.$refs.frScrollWrapper;
        return this.direction === 'vertical' ?
          -(scroller.scrollHeight - scroller.offsetHeight)
          : -(scroller.scrollWidth - scroller.offsetWidth);
      },
      scrollClass() {
        return this.direction;
      }
    },

    watch: {
      elSelector() {
        if (this.autoCenter && this.elSelector) {
          this.toCenter();
        }
      }
    },

    mounted() {
      const scroll          = this.$refs.frScroll;
      const scrollerWrapper = this.$refs.frScrollWrapper;

      Transform(scrollerWrapper);
      this.$nextTick(() => {
        this.alloyTouch = new AlloyTouch({
          touch: scroll,
          target: scrollerWrapper,
          vertical: this.optionVertical,
          property: this.optionProperty,
          min: this.optionMin,
          max: 0
        });
      });
    },

    methods: {
      toCenter() {
        const el = document.querySelector(this.elSelector);
        if (!el) return;
        const container      = this.$refs.frScrollWrapper;
        const containerWidth = container.offsetWidth;
        const eleLeft        = Utils.getElementLeft(el, container);
        const marginLeft     = getComputedStyle(el, null).getPropertyValue('margin-left');
        const marginRight    = getComputedStyle(el, null).getPropertyValue('margin-right');
        const eleWidth       = el.offsetWidth + parseInt(marginLeft) + parseInt(marginRight);

        let x = -(eleLeft - (containerWidth - eleWidth) / 2);
        x     = x > 0 ? 0 : x < this.optionMin ? this.optionMin : x;

        this.alloyTouch.to(x, 300);
      },
    }

  }
</script>
