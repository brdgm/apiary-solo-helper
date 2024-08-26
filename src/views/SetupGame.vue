<template>
  <h1>{{t('setup.title')}}</h1>

  <h2 v-html="t('setup.general.title')"></h2>
  <div class="instructions">
    <ol>
      <li v-html="t('setup.general.setup2Players')"></li>
      <li v-html="t('setup.general.pickPlayerColor')"></li>
      <li v-html="t('setup.general.remove.title')"></li>
      <ul>
        <li v-html="t('setup.general.remove.seedCards')"></li>
        <li v-html="t('setup.general.remove.carvingTiles')"></li>
        <li v-html="t('setup.general.remove.factions')"></li>
      </ul>
    </ol>
  </div>

  <DifficultyLevel/>

  <button class="btn btn-primary btn-lg mt-4" @click="setupBot()">
    {{t('setupBot.title')}}
  </button>

  <FooterButtons endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import DifficultyLevel from '@/components/setup/DifficultyLevel.vue'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'SetupGame',
  components: {
    FooterButtons,
    DifficultyLevel
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()

    return { t, state }
  },
  methods: {
    setupBot() : void {
      this.state.resetGame()

      const cardDeck = CardDeck.new()
      this.state.setup.initialCardDeck = cardDeck.toPersistence()

      this.$router.push('/setupBot')
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
</style>
