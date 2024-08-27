<template>
  <div class="sidebar">
    <p>
      Turn {{navigationState.turn}}
    </p>
    <b>Automa</b>
    <table class="vp-table">
      <tr>
        <th scope="row">
          Score
        </th>
        <td class="number">
          {{navigationState.victoryPoints}}
        </td>
      </tr>
      <tr v-for="tile of tiles" :key="tile">
        <th scope="row">
          {{navigationState.tiles.count(tile)}} x <TileIcon :tile="tile" class="tileIcon"/> =
        </th>
        <td class="number">
          {{getTileVP(tile) * navigationState.tiles.count(tile)}}
        </td>
      </tr>
      <tr>
        <th scope="row"></th>
        <td class="number total">
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
  width: 130px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 0px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.tileIcon {
  height: 1.25rem;
  width: 1.25rem;
}
.vp-table {
  font-size: 14px;
  th {
    font-weight: normal;
  }
  .number {
    text-align: right;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .total {
    border-top: 1px solid black;
    font-weight: bold;
  }
}
</style>
