<template>
  <div class="mb-4 flex-container fill-available space-between">
    <div class="flex-container flex-column">
      <div>
        <select-model class="mb-4"
          ><h2 class="mb-3 inline-block">Either,</h2>
          <span> select an existing model:</span>
          <br
        /></select-model>
      </div>
      <div id="upload-file-source" ref="bob">
        <upload-file class="mb-4" @upload-success="uploadSuccess" @upload-failure="addFailure"
          ><h2 class="mb-3 inline-block">Or,</h2>
          <span> upload a model file:</span></upload-file
        >
      </div>
    </div>
    <div class="flex-container vertical-centre justify-end">
      <load-model>
        <h2 class="mb-3 inline-block">Then,</h2>
        <span> load the model:</span>
        <br
      /></load-model>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import UploadFile from '@/components/UploadFile.vue'
import LoadModel from '@/components/SimulationSteps/LoadModelStep/LoadModel.vue'
import SelectModel from '@/components/SimulationSteps/LoadModelStep/SelectModel.vue'

import linesMixin from '@/mixins/lines'

export default {
  name: 'LoadModelStep',
  components: { UploadFile, SelectModel, LoadModel },
  mixins: [linesMixin],
  data() {
    return {
      line1Start: 'upload-file-source',
      line2Start: 'use-file-source',
      linesEnd: 'load-file-target',
    }
  },
  computed: {
    ...mapGetters(['parameterInformation']),
  },
  methods: {
    ...mapMutations('model', ['setCurrentItem']),
    ...mapActions('notifications', ['addSuccess', 'addFailure']),
    uploadSuccess(fileName) {
      this.setCurrentItem(fileName)
      this.addSuccess(`Uploaded '${fileName}'`)
    },
  },
}
</script>

<style scoped></style>
