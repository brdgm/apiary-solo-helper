<template>
  <p>
    Pick highest available:<br/>
    <template v-for="value of 4" :key="value">
      <button class="btn btn-primary mt-1" @click="gainExploreToken()">
        <WorkerIcon :worker="navigationState.worker" :value="value"/>: Explore
      </button><br/>
    </template>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import WorkerIcon from '@/components/structure/WorkerIcon.vue'
import Tile from '@/services/enum/Tile'

export default defineComponent({
  name: 'ActionExplore',
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
    gainExploreToken() : void {
      this.$emit('collectTiles', [Tile.EXPLORE])
    }
  }
})
</script>
