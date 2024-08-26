<template>
  <h1 v-html="t('turnPlayer.title')"></h1>

  <p v-html="t('turnPlayer.takeYourTurn')"></p>

  <button class="btn btn-primary btn-lg mt-4" @click="next()">
    {{t('action.next')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRoute } from 'vue-router'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import DebugInfo from '@/components/turn/DebugInfo.vue'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    const turn = navigationState.turn
    return { t, state, navigationState, turn }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      return `/turn/${this.turn-1}/bot`
    }
  },
  methods: {
    next() : void {
      this.state.storeTurn({turn:this.turn})
      this.$router.push(`/turn/${this.turn+1}/bot`)
    }
  }
})
</script>
