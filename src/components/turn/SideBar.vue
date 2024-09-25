<template>
  <div class="sidebar">
    <div v-if="navigationState.turn > 0">
      {{t('sideBar.turn', {turn:navigationState.turn})}}
    </div>
    <div class="mt-2">
      <b>{{t('sideBar.automa')}}</b> ({{state.setup.difficultyLevel}})
    </div>
    <table class="vp-table">
      <tbody>
        <tr>
          <th scope="row">
            {{t('sideBar.score')}}
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
      </tbody>
    </table>
    <a class="btn btn-sm btn-outline-secondary mt-3" data-bs-toggle="modal" data-bs-target="#automaRulesModal">{{t('rules.general.title')}}</a>
  </div>

  <AutomaRulesModal/>
</template>

<script lang="ts">
import NavigationState from '@/util/NavigationState'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import Tile from '@/services/enum/Tile'
import getAllEnumValues from '@brdgm/brdgm-commons/src/util/enum/getAllEnumValues'
import TileIcon from '../structure/TileIcon.vue'
import getTileVictoryPoints from '@/util/getTileVictoryPoints'
import AutomaRulesModal from '../rules/AutomaRulesModal.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    TileIcon,
    AutomaRulesModal
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
      return getTileVictoryPoints(tile, this.navigationState.expertMode)
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 145px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 5px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
.tileIcon {
  height: 1.25rem;
  width: 1.25rem;
}
.level {
  font-size: 14px;
  font-style: italic;
}
.vp-table {
  font-size: 13px;
  th, td {
    vertical-align: top;
  }
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
