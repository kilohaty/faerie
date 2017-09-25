<template>
  <button :class="buttonClass" @click="click" v-feedback>
    <slot></slot>
  </button>
</template>

<style lang="stylus">
  @import "../../src/css/theme.styl"

  .fr-button
    height 35px
    line-height 35px
    font-size 14px
    font-weight bold
    text-align center
    letter-spacing .45px
    outline none
    border 1px solid transparent
    border-radius 4px
    -webkit-appearance none
    -webkit-tap-highlight-color rgba(0, 0, 0, 0)

  /* theme default */
  .fr-button
    border-color $black
    color $black
    background-color $white
    &.e-feedback
      background darken($white, 5%)

  /* theme pink */
  .fr-button.theme-pink
    border-color $pink
    color $white
    background-color $pink
    &.e-feedback
      background darken($pink, 10%)

  /* theme blue */
  .fr-button.theme-blue
    border-color $blue
    color $white
    background-color $blue
    &.e-feedback
      background darken($blue, 10%)

  /* status disabled */
  .fr-button:disabled
    border-color $lightGray
    color #fff
    background-color $lightGray
    &.e-feedback
      background $lightGray

</style>

<script type="text/babel">
  export default {
    name: 'fr-button',

    props: {
      theme: {
        type: String,
        default: ''
      }
    },

    computed: {
      buttonClass() {
        return this.theme ? `fr-button theme-${this.theme}` : 'fr-button';
      }
    },

    methods: {
      click() {
        this.$emit('click');
      }
    }
  }
</script>
