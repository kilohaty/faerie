<template>
  <div class="fr-pin" ref="frPin">
    <slot></slot>
  </div>
</template>

<script type="text/babel">
  import Utils from '../../src/utils';
  import Evter from '../../src/utils/evter';

  export default {
    name: 'fr-pin',

    data() {
      return {
        eleTop: 0,
        eleWidth: 0,
        eleLeft: 0,
        initialStyle: {
          position: 0,
          left: 0,
          top: 0,
          width: 0,
        },
      }
    },

    props: {
      // fixed status
      value: {
        type: Boolean,
        default: false
      },
      dataModel: {
        type: Number,
        default: 0
      }
    },

    watch: {
      /**
       * recalculate
       */
      dataModel: function () {
        this.initElement();
      }
    },

    mounted() {
      this.initElement();
      Evter.on('windowScroll', this.onScroll);
    },

    methods: {
      initElement() {
        const ele     = this.$refs.frPin;
        this.eleTop   = Utils.getElementTop(ele);
        this.eleLeft  = Utils.getElementLeft(ele);
        this.eleWidth = ele.offsetWidth;

        this.initialStyle = {
          position: ele.style.position,
          left: ele.style.left,
          top: ele.style.top,
          width: ele.style.width,
        };
      },

      /**
       * add class name fr-fixed when fixed
       * @param scrollTop
       */
      onScroll(scrollTop) {
        const ele     = this.$refs.frPin;
        const isFixed = ele.style.position === 'fixed';

        if (scrollTop >= this.eleTop && !isFixed) {
          ele.style.position = 'fixed';
          ele.style.top      = '0';
          ele.style.left     = `${this.eleLeft}px`;
          ele.style.width    = `${this.eleWidth}px`;
          ele.classList.add('fr-fixed');
          this.$emit('input', true);
        }
        else if (scrollTop < this.eleTop && isFixed) {
          ele.style.position = this.initialStyle.position;
          ele.style.left     = this.initialStyle.left;
          ele.style.top      = this.initialStyle.top;
          ele.style.width    = this.initialStyle.width;
          ele.classList.remove('fr-fixed');
          this.$emit('input', false);
        }
      },

    },
  }
</script>
