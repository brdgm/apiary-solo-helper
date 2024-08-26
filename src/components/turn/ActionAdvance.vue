<template>
  <p>
    Pick highest available:<br/>
    <template v-for="value of 4" :key="value">
      <button class="btn btn-primary mt-1" @click="gainTiles(value)">
        <WorkerIcon :worker="navigationState.worker" :value="value"/>:
        <template v-for="(tile,index) of getAdvanceTiles(value)" :key="tile">
          <template v-if="index > 0"> + </template>
          <TileIcon :tile="tile"/>
        </template>
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
import TileIcon from '../structure/TileIcon.vue'

export default defineComponent({
  name: 'ActionAdvance',
  components: {
    WorkerIcon,
    TileIcon
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
    getAdvanceTiles(workerValue: number) : Tile[] {
      const tiles : Tile[] = [ Tile.FARM ]
      if (workerValue == 2 || workerValue == 4) {
        tiles.push(Tile.RECRUIT)
      }
      if (workerValue == 3 || workerValue == 4) {
        tiles.push(Tile.DEVELOPMENT)
      }
      return tiles
    },
    gainTiles(workerValue: number) : void {
      this.$emit('collectTiles', this.getAdvanceTiles(workerValue))
    }
  }
})
</script>
