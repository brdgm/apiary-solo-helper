<template>
  <h1 v-html="t('turnBot.title')"></h1>

  <p>...</p>

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
import { BotPersistence, useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import DebugInfo from '@/components/turn/DebugInfo.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    DebugInfo
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)

    // draw next card
    navigationState.cardDeck.draw()

    const turn = navigationState.turn
    return { t, state, navigationState, turn }
  },
  computed: {
    backButtonRouteTo() : string|undefined {
      if (this.turn > 1) {
        return `/turn/${this.turn-1}/player`
      }
      else {
        return undefined
      }
    }
  },
  methods: {
    next() : void {
      const bot : BotPersistence = {
        cardDeck: this.navigationState.cardDeck.toPersistence(),
        tiles: this.navigationState.tiles.toPersistence()
      }
      this.state.storeTurn({turn:this.turn, bot})
      this.$router.push(`/turn/${this.turn+1}/player`)
    }
  }
})
</script>
