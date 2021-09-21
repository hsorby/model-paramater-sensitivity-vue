<template>
  <div class="next-steps">
    <h1 class="my-5 text-center">Run a simulation</h1>
    <div class="row">
      <div class="col-md-11 mb-4">
        <div v-for="entry in alerts" :key="entry.message">
          <Alert :border-colour="entry.borderColour" :background-colour="entry.backgroundColour" :text-colour="entry.textColour">{{
            entry.message
          }}</Alert>
        </div>
        <upload-file class="mb-4" @upload-success="notifySuccess"><h2 class="mb-3">Upload model file to get started:</h2></upload-file>
        <local-loading :loading="isBusyLoading">
          <load-model class="mb-4" @loadFile="loadFile($event)" @busy="loading"><h2 class="mb-3">Then load parameters from a model:</h2></load-model>
        </local-loading>
        <model-parameter-uncertainties :model-parameters="parameterInformation" class="mb-4" @select="parameterSelected"
          ><h2 class="mb-3">Then select uncertain parameters:</h2></model-parameter-uncertainties
        >
      </div>
    </div>
  </div>
</template>

<script>
import UploadFile from './UploadFile.vue'
import Alert from './Alert.vue'
import ModelParameterUncertainties from './ModelParameterUncertainties.vue'
import LocalLoading from './LocalLoading.vue'
import LoadModel from './LoadModel.vue'

import { fetchModelParameterInfo } from '@/services/backend-api'

export default {
  name: 'HomeContent',
  components: { UploadFile, Alert, ModelParameterUncertainties, LoadModel, LocalLoading },
  data() {
    return {
      alerts: [],
      parameterInformation: {},
      isBusyLoading: false,
      uncertainParameters: [],
      tabs: ['step1', 'step2', 'step3'],
      initialTab: 'step1',
    }
  },
  methods: {
    loading(state) {
      this.isBusyLoading = state
    },
    notifySuccess(x) {
      this.notifyMessage(x.message, '#46bd87', '#46bd87', '#ffffff')
    },
    notifyFailure(x) {
      this.notifyMessage(x.message, '#ad1927', '#ad1927', '#000000')
    },
    notifyMessage(message, borderColour, backgroundColour, textColour) {
      this.alerts.push({
        borderColour,
        backgroundColour,
        textColour,
        message,
      })
      setTimeout(() => {
        this.clearMessage(message)
      }, 5000)
    },
    clearMessage(msg) {
      const idx = this.alerts.findIndex((p) => p.message === msg)
      if (idx !== -1) {
        this.alerts.splice(idx, 1)
      }
    },
    parameterSelected(data) {
      if (data.state) {
        this.uncertainParameters.push(data.id)
      } else {
        const idx = this.uncertainParameters.findIndex((e) => e === data.id)
        if (idx !== -1) {
          this.uncertainParameters.splice(idx, 1)
        }
      }
      console.log(this.uncertainParameters)
    },
    async loadFile(filename) {
      this.isBusyLoading = true
      const accessToken = await this.$auth.getTokenSilently()
      fetchModelParameterInfo(filename, accessToken).then(
        (value) => {
          this.parameterInformation = value.parameter_information
          this.notifySuccess({ message: 'Parameter information successfully loaded.' })
          this.isBusyLoading = false
        },
        (reason) => {
          this.notifyFailure({ message: reason })
          this.isBusyLoading = false
        }
      )
    },
  },
}
</script>
