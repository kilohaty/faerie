<template>
  <div v-if="pinPlaceholder"
       class="fr-pin-placeholder"
       ref="frPinPlaceholder">
    <div class="fr-pin" ref="frPin">
      <slot></slot>
    </div>
  </div>
  <div v-else class="fr-pin" ref="frPin">
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
        bodyScrollHeight: 0,
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
      },
      pinPlaceholder: {
        type: Boolean,
        default: false
      },
      // auto calculate element position
      autoCalc: {
        type: Boolean,
        default: false
      },
    },

    computed: {
      calcEle() {
        return this.pinPlaceholder ? this.$refs.frPinPlaceholder : this.$refs.frPin;
      }
    },

    watch: {
      /**
       * recalculate
       */
      dataModel: function () {
        this.calcElePosition();
      }
    },

    mounted() {
      this.calcElePosition();
      Evter.on('windowScroll', this.onScroll);
    },

    methods: {
      calcElePosition() {
        const ele = this.calcEle;
        if (ele.style.position === 'fixed') {
          return;
        }

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
        if (this.autoCalc) {
          const scrollHeight = document.body.scrollHeight;
          if (scrollHeight !== this.bodyScrollHeight) {
            this.bodyScrollHeight = scrollHeight;
            this.calcElePosition();
          }
        }

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
