<template>
  <div class="workerIcon">
    <span v-if="value" class="value">{{value}}</span>
    <AppIcon name="victory-point"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'VictoryPointIcon',
  components: {
    AppIcon
  },
  props: {
    value: {
      type: Number,
      required: false
    }
  }
})
</script>

<style lang="scss" scoped>
.workerIcon {
  display: inline-block;
  position: relative;
  width: 35px;
  .value {
    position: absolute;
    left: 0;
    right: 0.2rem;
    top: 4px;
    text-align: center;
    color: black;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: -0.1rem;
    text-shadow: 1px 1px 0 #fff, -1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff;
  }
}
</style>
