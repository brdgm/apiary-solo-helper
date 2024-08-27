<template>
  <p>
    <WorkerIcon :worker="navigationState.worker" :value="4"/>?
    <a class="btn btn-primary mt-1" data-bs-toggle="modal" data-bs-target="#carveModal">
      {{t('turnBot.carve.title', {value:navigationState.carveSteps})}}
    </a>
  </p>

  <ModalDialog id="carveModal" :title="t('turnBot.carve.title', {value:navigationState.carveSteps})">
    <template #body>
      <p><span v-html="t('turnBot.placeWorker')"></span><span>&nbsp;</span><WorkerIcon :worker="navigationState.worker" :value="4"/></p>
      <p class="mb-3" v-html="t('turnBot.carve.followPath', {position:t(`position.${navigationState.carveSteps}`)})"></p>
      <AppIcon type="carve-s-curve" :name="navigationState.sCurve" class="s-curve"/>
      <p class="mt-3" v-html="t('turnBot.carve.noTile')"></p>
    </template>
    <template #footer>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="gainCarving()">
        {{t('turnBot.carve.getTile')}}
        <TileIcon :tile="carvingTile"/>
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

export default defineComponent({
  name: 'ActionCarve',
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
  computed: {
    carvingTile(): Tile {
      return Tile.CARVING
    }
  },
  methods: {
    gainCarving() : void {
      this.$emit('collectTiles', [Tile.CARVING])
    }
  }
})
</script>

<style lang="scss" scoped>
.s-curve {
  width: 200px;
}
</style>