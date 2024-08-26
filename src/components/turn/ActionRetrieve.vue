<template>
  <p>
    <b>0</b> <WorkerIcon :worker="navigationState.worker"/>
    <span v-for="value of navigationState.retrieveLimit" :key="value">
    <span>&nbsp;</span><span>or</span><span>&nbsp;</span>
    <b>{{value}}</b> <WorkerIcon :worker="navigationState.worker"/></span>
    <span>&nbsp;</span><span>on docking mat?</span><span>&nbsp;</span>

    <button class="btn btn-primary mt-1" @click="$emit('scoreVP', 2)">
      Retrieve all <WorkerIcon :worker="navigationState.worker"/> & <VictoryPointIcon :value="2"/>
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
