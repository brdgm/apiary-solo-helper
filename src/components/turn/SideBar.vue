<template>
  <div class="sidebar">
    <p>
      Turn {{navigationState.turn}}
    </p>
    <table>
      <tr>
        <td>
          Automa VP
        </td>
        <td>
          {{navigationState.victoryPoints}}
        </td>
      </tr>
      <tr v-for="tile of tiles" :key="tile">
        <td>
          {{navigationState.tiles.count(tile)}} x <TileIcon :tile="tile" class="tileIcon"/> =
        </td>
        <td>
          {{getTileVP(tile) * navigationState.tiles.count(tile)}}
        </td>
      </tr>
      <tr>
        <td>
          Total
        </td>
        <td>
          {{totalVP}}
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Tile from '@/services/enum/Tile'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import TileIcon from '../structure/TileIcon.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    TileIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    tiles() : Tile[] {
      return getAllEnumValues(Tile)
    },
    totalVP() : number {
      let total = this.navigationState.victoryPoints
      for (const tile of this.tiles) {
        total += this.getTileVP(tile) * this.navigationState.tiles.count(tile)
      }
      return total
    }
  },
  methods: {
    getTileVP(tile: Tile) : number {
      if (this.navigationState.expertMode) {
        switch (tile) {
          case Tile.FARM: return 2
          case Tile.RECRUIT: return 3
          case Tile.DEVELOPMENT: return 4
          case Tile.CARVING: return 7
          case Tile.EXPLORE: return 4
          default: return 0
        }
      }
      else {
        switch (tile) {
          case Tile.FARM: return 1
          case Tile.RECRUIT: return 2
          case Tile.DEVELOPMENT: return 3
          case Tile.CARVING: return 7
          case Tile.EXPLORE: return 3
          default: return 0
        }
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 150px;
  margin-left: 10px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    width: 100px;
  }
}
.tileIcon {
  height: 1.25rem;
  width: 1.25rem;
}
</style>
