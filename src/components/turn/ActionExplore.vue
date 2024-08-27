<template>
  <p>
    {{t('turnBot.pickHighest')}}<br/>
    <template v-for="value of 4" :key="value">
      <button class="btn btn-secondary mt-2" @click="showExploreModal(value)">
        <WorkerIcon :worker="navigationState.worker" :value="value"/>: {{t('turnBot.explore.title', {value})}}
      </button><br/>
    </template>
  </p>

  <ModalDialog id="exploreModal" :title="t('turnBot.explore.title', {value:exploreValue})" :scrollable="true">
    <template #body>
      <p v-if="secondIteration" class="alert alert-warning" v-html="t('turnBot.explore.secondIteration')"></p>
      <p v-else><span v-html="t('turnBot.placeWorker')"></span><span>&nbsp;</span><WorkerIcon :worker="navigationState.worker" :value="exploreValue"/></p>
      <p v-html="t('turnBot.explore.moveQueenShip')"></p>
      <AppIcon type="s-curve" :name="navigationState.sCurve" class="s-curve"/>
      <p class="mt-2" v-html="t('turnBot.explore.moveDistance', {value:exploreValue})"></p>
      <p>
        <span v-html="t('turnBot.explore.placeResource')"></span><br/>
        <AppIcon type="resource" :name="navigationState.resource" class="resource"/>
      </p>
      <hr/>
      <p>
        <button class="btn btn-outline-secondary" type="button" data-bs-toggle="collapse" data-bs-target="#exploreRulesCollapse" aria-expanded="false" aria-controls="exploreRulesCollapse">
          {{t('turnBot.explore.rules.title')}}
        </button>
      </p>
      <div class="collapse" id="exploreRulesCollapse">
        <p v-html="t('turnBot.explore.rules.skipLocations')"></p>
        <h5>{{t('turnBot.explore.rules.example1.title')}} <AppIcon type="s-curve" name="right-bottom" class="s-curve example"/></h5>
        <img src="@/assets/rules/explore-example-1.webp" :alt="t('turnBot.explore.rules.example1.title')" class="example-image"/>
        <p class="fst-italic" v-html="t('turnBot.explore.rules.example1.desc1')"></p>
        <p class="fst-italic" v-html="t('turnBot.explore.rules.example1.desc2')"></p>
        <h5>{{t('turnBot.explore.rules.example2.title')}} <AppIcon type="s-curve" name="left-top" class="s-curve example"/></h5>
        <img src="@/assets/rules/explore-example-2.webp" :alt="t('turnBot.explore.rules.example2.title')" class="example-image"/>
        <p class="fst-italic" v-html="t('turnBot.explore.rules.example2.desc1')"></p>
        <p class="fst-italic" v-html="t('turnBot.explore.rules.example2.desc2')"></p>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="gainExploreToken()">
        {{t('turnBot.explore.explorerPlanet')}}
        <TileIcon :tile="exploreTile"/>
      </button>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="visitExploredPlanet()">
        {{t('turnBot.explore.visitPlanet')}}
      </button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.cancel')}}</button>
    </template>
  </ModalDialog>  
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import WorkerIcon from '@/components/structure/WorkerIcon.vue'
import Tile from '@/services/enum/Tile'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import AppIcon from '../structure/AppIcon.vue'
import TileIcon from '../structure/TileIcon.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'

export default defineComponent({
  name: 'ActionExplore',
  components: {
    WorkerIcon,
    ModalDialog,
    AppIcon,
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
  data() {
    return {
      exploreValue: 0,
      collectTiles: [] as Tile[],
      secondIteration: false
    }
  },
  computed: {
    exploreTile(): Tile {
      return Tile.EXPLORE
    }
  },
  methods: {
    showExploreModal(value : number) : void {
      this.exploreValue = value
      this.secondIteration = false
      this.collectTiles = []
      showModal('exploreModal')
    },
    gainExploreToken() : void {
      this.executeExplore(true)
    },
    visitExploredPlanet() : void {
      this.executeExplore(false)
    },
    executeExplore(gainExploreToken: boolean) : void {
      if (gainExploreToken) {
        this.collectTiles.push(Tile.EXPLORE)
      }
      if (this.exploreValue == 4 && !this.secondIteration) {
        this.secondIteration = true
        showModal('exploreModal')
        return
      }
      this.$emit('collectTiles', this.collectTiles)
    }
  }
})
</script>


<style lang="scss" scoped>
.s-curve {
  height: 80px;
  &.example {
    height: 1.5rem;
  }
}
.resource {
  height: 3rem;
}
.example-image {
  width: 100%;
  max-width: 250px;
  margin-bottom: 0.5rem;
}
</style>