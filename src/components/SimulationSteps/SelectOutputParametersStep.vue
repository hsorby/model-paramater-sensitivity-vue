<template>
  <div class="mb-4 flex-container fill-available space-between">
    <div class="flex-container flex-column">
      <div>
        <select-output-parameters>
          <h2 class="mb-3 inline-block">Either,</h2>
          <span> select an existing output parameters definition:</span>
          <br
        /></select-output-parameters>
      </div>
      <div id="user-defined-output-parameters-source">
        <model-output-parameters v-model="parameterSelections" :model-parameters="parameterInformation" class="mb-4"
          ><h2 class="mb-3 inline-block">Or,</h2>
          <span> choose output parameters from model variables:</span>
        </model-output-parameters>
      </div>
    </div>
    <div class="flex-container-col horizontal-centre">
      <load-output-parameters>
        <h2 class="mb-3 inline-block">Then,</h2>
        <span> load the output parameters:</span>
        <br
      /></load-output-parameters>
      <div v-if="maybeSave">
        <h2 class="mb-3 inline-block">[Or maybe,</h2>
        <span> Save current settings:</span>
        <h4 class="mb-3 inline-block">]</h4>
        <br />
        <input v-model="fileName" type="text" placeholder="set filename here" class="mr-2" />
        <store-button :disabled="fileName === ''" @click="storeOutputParameters" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import SelectOutputParameters from './SelectOutputParametersStep/SelectOutputParameters.vue'
import ModelOutputParameters from './SelectOutputParametersStep/ModelOutputParameters.vue'
import LoadOutputParameters from './SelectOutputParametersStep/LoadOutputParameters.vue'
import StoreButton from '../Buttons/StoreButton.vue'

import { storeOutputParameters } from '../../services/backend-api'

import linesMixin from '@/mixins/lines'

export default {
  name: 'SelectOutputParametersStep',
  components: { LoadOutputParameters, ModelOutputParameters, SelectOutputParameters, StoreButton },
  mixins: [linesMixin],
  data() {
    return {
      fileName: '',
      line1Start: 'user-defined-output-parameters-source',
      line2Start: 'select-output-parameters-source',
      linesEnd: 'load-output-parameters-target',
    }
  },
  computed: {
    ...mapGetters(['parameterInformation', 'outputParametersData']),
    ...mapGetters('outputParameters', ['currentItem']),
    ...mapGetters('model', { modelCurrentItem: 'currentItem' }),
    maybeSave() {
      return this.currentItem === '<user-selection>'
    },
    parameterSelections: {
      get() {
        return this.outputParametersData
      },
      set(data) {
        const outputParameter = {
          id: data.id,
        }
        if (data.state) {
          this.addOutputParameter(outputParameter)
        } else {
          this.removeOutputParameter(outputParameter)
        }
      },
    },
  },
  methods: {
    ...mapActions('notifications', ['addSuccess', 'addFailure']),
    ...mapMutations(['addOutputParameter', 'removeOutputParameter']),
    async storeOutputParameters() {
      const accessToken = await this.$auth.getTokenSilently()
      storeOutputParameters(this.outputParametersData, this.modelCurrentItem, this.fileName, accessToken)
        .then(
          (response) => {
            this.addSuccess(response.message)
          },
          (reason) => {
            this.addFailure(reason.message)
          }
        )
        .catch((error) => {
          this.addFailure(error)
        })
    },
  },
}
</script>

<style scoped></style>
