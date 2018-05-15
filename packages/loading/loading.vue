<template>
  <transition name="fr-fade">
    <div class="fr-loading-backdrop" v-show="visible">
      <div class="fr-loading">
        <div class="fr-loading-icon" v-show="showIcon"></div>
        <p class="fr-loading-text">{{message}}</p>
      </div>
    </div>
  </transition>
</template>

<style lang="stylus">
  @import "../../src/css/theme.styl"

  .fr-fade-enter-active,
  .fr-fade-leave-active
    opacity 1

  .fr-fade-enter,
  .fr-fade-leave-to
    opacity 0
    
  .fr-loading-backdrop
    position fixed
    top 0
    left 0
    width 100vw
    height 100vh
    z-index 998
    background-color transparent
    transition all ease-in-out .25s

  .fr-loading
    position fixed
    z-index 1
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

  .fr-loading-icon
    margin 5px auto
    width 20px
    height 20px
    border-radius 50%
    border-top 2px solid transparent
    border-bottom 2px solid $lightGray
    border-left 2px solid $lightGray
    border-right 2px solid transparent
    animation spin .6s linear infinite

  @keyframes spin
    from
      transform rotate(0)
    to
      transform rotate(360deg)

  .fr-loading-text
    margin 0

</style>

<script type="text/babel">
  export default {
    name: 'fr-loading',

    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      showIcon: {
        type: Boolean,
        default: true,
      },
      message: String,
    }
  }
</script>
