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

  export default {
    name: 'fr-scroll',

    props: {
      /**
       * horizontal | vertical
       */
      direction: {
        type: String,
        default: 'horizontal'
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

    mounted() {
      const scroll          = this.$refs.frScroll;
      const scrollerWrapper = this.$refs.frScrollWrapper;

      Transform(scrollerWrapper);
      this.$nextTick(() => {
        new AlloyTouch({
          touch: scroll,
          target: scrollerWrapper,
          vertical: this.optionVertical,
          property: this.optionProperty,
          min: this.optionMin,
          max: 0
        });
      });
    },

  }
</script>
