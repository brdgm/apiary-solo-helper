<template>
  <div class="tileIcon">
    <AppIcon type="tile" :name="tile" class="icon"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import AppIcon from './AppIcon.vue'
import Tile from '@/services/enum/Tile'

export default defineComponent({
  name: 'TileIcon',
  components: {
    AppIcon
  },
  props: {
    tile: {
      type: String as PropType<Tile>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.tileIcon {
  display: inline-block;
  height: 1.75rem;
  width: 1.75rem;
  .icon {
    height: 100%;
  }
}
</style>
