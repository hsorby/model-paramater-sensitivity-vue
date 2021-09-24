<template>
  <div class="mb-4">
    <div ref="line-parent-element" class="flex-container space-between">
      <div class="flex-container">
        <div class="flex-container flex-column">
          <div id="upload-file-source">
            <upload-file class="mb-4" @upload-success="uploadSuccess" @upload-failure="addFailure"
              ><h2 class="mb-3 inline-block">Either,</h2>
              <span> upload a model file:</span></upload-file
            >
          </div>
          <div id="use-file-source">
            <select-model class="mb-4"
              ><h2 class="mb-3 inline-block">Or,</h2>
              <span> select an existing model:</span>
              <br
            /></select-model>
          </div>
        </div>
      </div>
      <div class="flex-container vertical-centre justify-end">
        <div id="load-file-target">
          <load-model />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

import UploadFile from '@/components/UploadFile.vue'
import LoadModel from '@/components/LoadModel.vue'
import SelectModel from '@/components/SelectModel.vue'
import LeaderLine from 'leader-line-vue'

import toastMixin from '@/mixins/toast'

export default {
  name: 'LoadModelStep',
  components: { UploadFile, SelectModel, LoadModel },
  mixins: [toastMixin],
  data() {
    return {
      uncertainParameters: [],
      tabs: ['step1', 'step2', 'step3'],
      initialTab: 'step1',
      line1: null,
      line2: null,
      ro: null,
    }
  },
  computed: {
    ...mapGetters(['parameterInformation']),
  },
  mounted() {
    // Initialise a resize observer to update lines if any of the elements
    // move.
    const observer = new ResizeObserver(this.updateLines)
    // Draw in some lines showing the connection between
    // the two different sources of the load model field.
    const el1 = document.getElementById('upload-file-source')
    const el2 = document.getElementById('use-file-source')
    const el3 = document.getElementById('load-file-target')
    observer.observe(el1)
    observer.observe(el2)
    observer.observe(el3)
    this.ro = observer

    this.line1 = LeaderLine.setLine(el1, el3, {
      color: 'red',
      dash: true,
    })
    this.line2 = LeaderLine.setLine(el2, el3, {
      color: 'red',
      dash: true,
    })
  },
  beforeDestroy() {
    if (this.ro) {
      this.ro.disconnect()
    }
    this.line1.remove()
    this.line2.remove()
  },
  methods: {
    ...mapMutations(['setCurrentUserModel']),
    ...mapActions('notifications', ['addSuccess', 'addFailure']),
    updateLines() {
      this.line1.position()
      this.line2.position()
    },
    uploadSuccess(fileName) {
      this.setCurrentUserModel(fileName)
      this.addSuccess(`Uploaded '${fileName}'`)
    },
  },
}
</script>

<style scoped></style>
