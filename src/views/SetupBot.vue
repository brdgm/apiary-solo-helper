<template>
  <h1>{{t('setupBot.title')}}</h1>

  <div class="instructions">
    <ol>
      <li v-html="t('setupBot.botColor')"></li>
      <li v-html="t('setupBot.firstPlayerScoreTrack')"></li>
      <ul>
        <li v-html="t('setupBot.returnPlayerTokens')"></li>
      </ul>
      <li v-html="t(`setupBot.placeDockingMat.${expertMode ? 'expert' : 'normal'}`)"></li>
      <ul>
        <li v-html="t('setupBot.noHiveMatFactionTile')"></li>
      </ul>
      <li v-html="t('setupBot.placeHibernationTokens')"></li>
      <li>
        <span v-html="t('setupBot.placeWorkers')"></span><br/>
        <WorkerIcon v-for="(value,index) of grayWorkerValues" :key="index" :worker="grayWorker" :value="value"/><br/>
        <WorkerIcon v-for="(value,index) of yellowWorkerValues" :key="index" :worker="yellowWorker" :value="value"/>
      </li>
      <li v-html="t('setupBot.placeAutomaGainedWorkerStrength', {value:gainedWorkerStrengthValue})"></li>
    </ol>
  </div>

  <img src="@/assets/setup/docking-mat.png" class="docking-mat" alt=""/>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setupGame" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import WorkerIcon from '@/components/structure/WorkerIcon.vue'
import Worker from '@/services/enum/Worker'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons,
    WorkerIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  data() {
    return {
      showStartingSpace: false
    }
  },
  computed: {
    expertMode() : boolean {
      return this.state.setup.difficultyLevel >= 5
    },
    grayWorker() : Worker {
      return Worker.GRAY
    },
    yellowWorker() : Worker {
      return Worker.YELLOW
    },
    grayWorkerValues() : number[] {
      switch (this.state.setup.difficultyLevel) {
        case 1:
          return [2, 1, 1]
        case 2:
          return [2, 2, 1]
        case 3:
        case 4:
        case 5:
        case 6:
          return [3, 2, 2]
        default:
          return []
      }
    },
    yellowWorkerValues() : number[] {
      switch (this.state.setup.difficultyLevel) {
        case 1:
          return [2, 1]
        case 2:
          return [2, 2]
        case 3:
        case 5:
          return [3, 1]
        case 4:
        case 6:
          return [3, 2]
        default:
          return []
      }
    },
    gainedWorkerStrengthValue() : number {
      switch (this.state.setup.difficultyLevel) {
        case 4:
        case 6:
          return 3
        default:
          return 2
      }
    }
  },
  methods: {
    startGame() : void {
      this.$router.push('/turn/1/bot')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}
.docking-mat {
  display: block;
  width: 100%;
  max-width: 300px;
  filter: drop-shadow(2px 2px 3px #888);
}
</style>
