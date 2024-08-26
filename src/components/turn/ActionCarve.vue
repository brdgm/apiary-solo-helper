<template>
  <p>
    <WorkerIcon :worker="navigationState.worker" :value="4"/>?
    <button class="btn btn-primary mt-1" @click="gainCarving()">
      Carve {{navigationState.carveSteps}}
    </button>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import WorkerIcon from '@/components/structure/WorkerIcon.vue'
import Tile from '@/services/enum/Tile'

export default defineComponent({
  name: 'ActionCarve',
  components: {
    WorkerIcon
  },
  emits: {
    collectTiles: (_tiles: Tile[]) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  methods: {
    gainCarving() : void {
      this.$emit('collectTiles', [Tile.CARVING])
    }
  }
})
</script>
