<template>
  <CommonsFooterButtons :backLabel="t('action.back')" :backButtonRouteTo="backButtonRouteTo"
        :endGameLabel="t('action.'+endGameButtonType)" :endGameConfirmMessage="t(endGameConfirmMessage)" :cancelLabel="t('action.cancel')" @endGame="endGame" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import CommonsFooterButtons from '@brdgm/brdgm-commons/src/components/structure/FooterButtons.vue'

export default defineComponent({
  name: 'FooterButtons',
  components: {
    CommonsFooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    endGameButtonType: {
      type: String,  /* Type of end game button <X> (i18n action.<X> and action.<X>Confirm needs to be present); button is hidden when not set */
      required: false
    },
    backButtonRouteTo: {
      type: String,  /* router-link to */
      required: false
    },
  },
  computed: {
    endGameConfirmMessage() : string {
      if (this.endGameButtonType=='abortGame' || this.$route.name == 'EndGameScoring') {
        return `action.${this.endGameButtonType}Confirm`
      }
      else {
        return `action.endGameGoToScoringConfirm`
      }
    }
  },
  methods: {
    endGame() {
      if (this.endGameButtonType=='abortGame' || this.$route.name == 'EndGameScoring') {
        this.state.resetGame()
        this.$router.push('/')
      }
      else {
        this.$router.push('/scoring')
      }
    }
  }})
</script>
