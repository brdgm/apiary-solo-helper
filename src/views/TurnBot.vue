<template>
  <SideBar :navigationState="navigationState"/>

  <h1 v-html="t('turnBot.title')"></h1>

  <ActionRetrieve :navigationState="navigationState" @scoreVP="nextScoreVP"/>

  <template v-if="navigationState.carveSteps">
    <hr/>
    <ActionCarve :navigationState="navigationState" @collectTiles="nextCollectTiles"/>
  </template>

  <hr/>
  <h3 v-html="t(`gameAction.${navigationState.action}`)"></h3>
  <template v-if="isExplore">
    <ActionExplore :navigationState="navigationState" @collectTiles="nextCollectTiles"/>
  </template>
  <template v-else-if="isAdvance">
    <ActionAdvance :navigationState="navigationState" @collectTiles="nextCollectTiles"/>
  </template>
  <template v-else>
    <ActionScoreWorker :navigationState="navigationState" @scoreVP="nextScoreVP"/>
  </template>

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
import ActionRetrieve from '@/components/turn/ActionRetrieve.vue'
import DebugInfo from '@/components/turn/DebugInfo.vue'
import Action from '@/services/enum/Action'
import Tile from '@/services/enum/Tile'
import ActionCarve from '@/components/turn/ActionCarve.vue'
import ActionExplore from '@/components/turn/ActionExplore.vue'
import ActionAdvance from '@/components/turn/ActionAdvance.vue'
import ActionScoreWorker from '@/components/turn/ActionScoreWorker.vue'
import SideBar from '@/components/turn/SideBar.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    ActionRetrieve,
    ActionCarve,
    ActionExplore,
    ActionAdvance,
    ActionScoreWorker,
    SideBar,
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
    },
    isExplore() : boolean {
      return this.navigationState.action == Action.EXPLORE
    },
    isAdvance() : boolean {
      return this.navigationState.action == Action.ADVANCE
    }
  },
  methods: {
    next(scoreVP : number = 0) : void {
      const bot : BotPersistence = {
        cardDeck: this.navigationState.cardDeck.toPersistence(),
        tiles: this.navigationState.tiles.toPersistence(),
        victoryPoints: this.navigationState.victoryPoints + scoreVP
      }
      this.state.storeTurn({turn:this.turn, bot})
      this.$router.push(`/turn/${this.turn+1}/player`)
    },
    nextScoreVP(vp: number) : void {
      this.next(vp)
    },
    nextCollectTiles(tiles: Tile[]) : void {
      tiles.forEach(tile => {
        this.navigationState.tiles.add(tile)
      })
      this.next()
    }
  }
})
</script>
