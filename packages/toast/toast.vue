<template>
  <transition name="fr-fade">
    <div class="fr-toast" v-show="visible">{{message}}</div>
  </transition>
</template>

<style lang="stylus">

  .fr-fade-enter-active,
  .fr-fade-leave-active
    opacity 1

  .fr-fade-enter,
  .fr-fade-leave-to
    opacity 0

  .fr-toast
    position fixed
    z-index 999
    left 50%
    top 50%
    transform translate(-50%, -50%)
    max-width 80%
    padding 5px 10px
    border-radius 4px
    font-size 14px
    line-height 20px
    color #fff
    background-color rgba(0, 0, 0, .7)
    transition all ease-in-out .25s

</style>

<script type="text/babel">
  export default {
    name: 'fr-toast',

    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      message: String,
    }
  }
</script>
