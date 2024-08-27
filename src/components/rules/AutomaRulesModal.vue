<template>
  <ModalDialog id="automaRulesModal" :size-lg="true" :scrollable="true"
      :title="t('rules.general.title')">
    <template #body>
      <p v-html="t('rules.general.simplified.intro')"></p>
      <ul>
        <li v-html="t('rules.general.simplified.noResources')"></li>
        <li v-html="t('rules.general.simplified.workersTwoColors')"></li>
        <li v-html="t('rules.general.simplified.workerBumped')"></li>
        <li v-html="t('rules.general.simplified.workerNeverReturn')"></li>
        <li v-html="t('rules.general.simplified.victoryPoints')"></li>
        <li v-html="t('rules.general.simplified.victoryPointFlow')"></li>
      </ul>
      <h5 v-html="t('rules.general.takeAction.title')"></h5>
      <p v-html="t('rules.general.takeAction.oneAction')"></p>
      <h5 v-html="t('rules.general.convertDances.title')"></h5>
      <p v-html="t('rules.general.convertDances.noDance')"></p>
      <p class="alert alert-info" v-html="t('rules.general.convertDances.playerDance')"></p>
      <h5 v-html="t('rules.general.retrieve.title')"></h5>
      <p v-html="t('rules.general.retrieve.automaRetrieve')"></p>
      <h5 v-html="t('rules.general.bumpedWorkers.title')"></h5>
      <p v-html="t('rules.general.bumpedWorkers.workerBumped')"></p>
      <h5 v-html="t('rules.general.hibernation.title')"></h5>
      <p v-html="t('rules.general.hibernation.workerHibernates')"></p>
      <p v-html="t('rules.general.hibernation.chooseHibernationComb')"></p>
      <p v-html="t('rules.general.hibernation.sectorPlacement')"></p>
      <p v-html="t('rules.general.hibernation.noBenefit')"></p>
      <h5 v-html="t('rules.general.specialCase.title')"></h5>
      <p v-html="t('rules.general.specialCase.carvingExchange')"></p>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'

export default defineComponent({
  name: 'AutomaRulesModal',
  components: {
    ModalDialog
  },
  setup() {
    const { t } = useI18n()
    return { t }
  }
})
</script>
