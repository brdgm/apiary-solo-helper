<template>
  <p>
    {{t('turnBot.pickHighest')}}<br/>
    <template v-for="value of 4" :key="value">
      <button class="btn btn-primary mt-1" @click="$emit('scoreVP', getWorkerVP(value))">
        <WorkerIcon :worker="navigationState.worker" :value="value"/>:
        <VictoryPointIcon :value="getWorkerVP(value)"/>
      </button><br/>
    </template>
  </p>
  <p v-html="t('turnBot.scoreWorker.placeScore')"></p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import WorkerIcon from '@/components/structure/WorkerIcon.vue'
import VictoryPointIcon from '@/components/structure/VictoryPointIcon.vue'

export default defineComponent({
  name: 'ActionScoreWorker',
  components: {
    WorkerIcon,
    VictoryPointIcon
  },
  emits: {
    scoreVP: (_vp: number) => true  // eslint-disable-line @typescript-eslint/no-unused-vars
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
    getWorkerVP(workerValue: number) : number {
      let vp = workerValue
      if (workerValue == 4) {
        vp = 6
      }
      if (this.navigationState.expertMode) {
        vp++
      }
      return vp
    }
  }
})
</script>
