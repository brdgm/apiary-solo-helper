<template>
  <p>
    <span v-html="t('turnBot.retrieve.onDockingMat1')"></span> <WorkerIcon :worker="navigationState.worker"/>
    <span v-for="value of navigationState.retrieveLimit" :key="value">
    <span>&nbsp;</span><span v-html="t('turnBot.retrieve.onDockingMatOr', {value})"></span><span>&nbsp;</span>
    <WorkerIcon :worker="navigationState.worker"/></span>
    <span>&nbsp;</span><span v-html="t('turnBot.retrieve.onDockingMat2')"></span><span>&nbsp;</span>

    <button class="btn btn-primary mt-1" @click="$emit('scoreVP', 2)">
      <span v-html="t('turnBot.retrieve.retrieveAll1')"></span><span>&nbsp;</span>
      <WorkerIcon :worker="navigationState.worker"/>
      <span>&nbsp;</span><span v-html="t('turnBot.retrieve.retrieveAll2')"></span><span>&nbsp;</span>
      <VictoryPointIcon :value="2"/>
    </button>
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationState from '@/util/NavigationState'
import WorkerIcon from '@/components/structure/WorkerIcon.vue'
import VictoryPointIcon from '@/components/structure/VictoryPointIcon.vue'

export default defineComponent({
  name: 'ActionRetrieve',
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
  }
})
</script>
