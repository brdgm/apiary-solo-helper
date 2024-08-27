<template>
  <div class="workerIcon">
    <span v-if="value" class="value">{{value}}</span>
    <AppIcon type="worker" :name="worker"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from './AppIcon.vue'
import Worker from '@/services/enum/Worker'

export default defineComponent({
  name: 'WorkerIcon',
  components: {
    AppIcon
  },
  props: {
    worker: {
      type: String as PropType<Worker>,
      required: true
    },
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
  width: 50px;
  .value {
    position: absolute;
    left: 0;
    right: 5px;
    margin-top: -2px;
    text-align: center;
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000;
  }
}
</style>
