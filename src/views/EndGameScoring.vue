<template>
  <SideBar :navigationState="navigationState"/>

  <h1 id="endGameScoringTitle">{{t('endGameScoring.title')}}</h1>

  <h2 v-html="t('endGameScoring.automa.title')"></h2>
  <p v-html="t('endGameScoring.automa.tally')"></p>
  <ul>
    <li v-html="t('endGameScoring.option.hibernationComb')"></li>
  </ul>

  <h2 v-html="t('endGameScoring.player.title')"></h2>
  <p v-html="t('endGameScoring.player.tally')"></p>
  <ul>
    <li v-html="t('endGameScoring.option.seedCards')"></li>
    <li v-html="t('endGameScoring.option.tiles')"></li>
    <li v-html="t('endGameScoring.option.carvings')"></li>
    <li v-html="t('endGameScoring.option.queensFavor')"></li>
    <li v-html="t('endGameScoring.option.hiveMatFrames')"></li>
    <li v-html="t('endGameScoring.option.factionAbility')"></li>
    <li v-html="t('endGameScoring.option.hibernationComb')"></li>
  </ul>

  <p v-html="t('endGameScoring.ties')"></p>

  <FooterButtons endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import { useRoute } from 'vue-router';
import NavigationState from '@/util/NavigationState';
import SideBar from '@/components/turn/SideBar.vue';

export default defineComponent({
  name: 'EndGameScoring',
  components: {
    FooterButtons,
    SideBar
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()
    const navigationState = new NavigationState(route, state)
    return { t, state, navigationState }
  }
})
</script>
