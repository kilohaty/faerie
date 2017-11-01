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
      position relative
      width 100%
      white-space nowrap

  .fr-scroll.vertical
    overflow-y hidden
    height 100%
    .fr-scroll-wrapper
      position relative
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
      },

      dataModel: {
        type: Number,
        default: 0
      },
    },

    computed: {
      optionVertical() {
        return this.direction === 'vertical';
      },
      optionProperty() {
        return this.direction === 'vertical' ? 'translateY' : 'translateX';
      },
      scrollClass() {
        return this.direction;
      },
    },

    watch: {
      elSelector: function () {
        if (this.autoCenter && this.elSelector) {
          this.toCenter();
        }
      },
      dataModel: function () {
        this.updateScroller();
      },
    },

    mounted() {
      this.updateScroller();
    },

    methods: {
      getOptionMin() {
        const scroller = this.$refs.frScrollWrapper;
        return this.direction === 'vertical' ?
          -(scroller.scrollHeight - scroller.offsetHeight)
          : -(scroller.scrollWidth - scroller.offsetWidth);
      },

      updateScroller() {
        const scroll          = this.$refs.frScroll;
        const scrollerWrapper = this.$refs.frScrollWrapper;

        if (!this.alloyTouch) {
          Transform(scrollerWrapper);
          this.$nextTick(() => {
            this.alloyTouch = new AlloyTouch({
              touch: scroll,
              target: scrollerWrapper,
              vertical: this.optionVertical,
              property: this.optionProperty,
              min: this.getOptionMin(),
              max: 0
            });
          });
        } else {
          this.alloyTouch.min = this.getOptionMin();
        }

      },

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
        x     = x > 0 ? 0 : x < this.getOptionMin() ? this.getOptionMin() : x;

        this.alloyTouch.to(x, 300);
      },
    }

  }
</script>
