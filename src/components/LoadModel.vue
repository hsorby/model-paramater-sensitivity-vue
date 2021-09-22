<template>
  <div>
    <slot></slot>
    <v-select v-model="selectedFile" :options="filesListing" class="mr-4 inline-block select"></v-select>
    <load-button @click="$emit('load-file', selectedFile)" />
  </div>
</template>

<script>
import LoadButton from './Buttons/LoadButton.vue'
import vSelect from 'vue-select'
import { listUserModels } from '@/services/backend-api.js'

export default {
  name: 'LoadModel',
  components: { vSelect, LoadButton },
  props: {
    updateFilesListing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      filesListing: [],
      selectedFile: '',
      user: this.$auth.user,
      timeoutHandle: 0,
    }
  },
  watch: {
    user: {
      handler() {
        this.fetchFilesListing()
      },
      immediate: true,
    },
    updateFilesListing() {
      if (this.timeoutHandle !== 0) {
        clearTimeout(this.timeoutHandle)
      }
      this.timeoutHandle = setTimeout(() => {
        this.timeoutHandle = 0
        this.fetchFilesListing()
      }, 500)
    },
  },
  methods: {
    async fetchFilesListing() {
      this.$emit('busy', true)
      const accessToken = await this.$auth.getTokenSilently()
      const files = await listUserModels(accessToken).catch((error) => {
        this.$emit('fetch-failure', { message: error.message })
        return
      })
      if (files) {
        this.$emit('fetch-success', { message: 'Successfully fetched available files.' })
        this.filesListing = files.model_files
        if (this.filesListing.indexOf(this.selectedFile) == -1) {
          this.selectedFile = this.filesListing[0]
        }
        this.$emit('busy', false)
      }
    },
  },
}
</script>

<style scoped>
.inline-block {
  display: inline-block;
}
.select {
  min-width: 27rem;
}
@media (max-width: 768px) {
  .select {
    min-width: 11rem;
  }
}
</style>
