<template>
  <div class="next-steps">
    <h1 class="text-center">External API</h1>
    <div class="col-md-11 mb-4">
      <p>
        Your user will use a button to call an external API using an access token, and the API will validate it using the API's audience value.
        <strong>This route should be private</strong>.
      </p>
      <div class="btn-group mt-5" role="group" aria-label="External API Requests Examples">
        <button type="button" class="btn btn-primary" @click="callApiEndpoint">Get Public Message</button>
        <span class="spacer" />
        <button type="button" class="btn btn-primary" @click="callApiSecuredEndpoint">Get Private Message</button>
      </div>

      <div v-if="apiMessage" class="mt-5">
        <h6 class="muted">Result</h6>
        <div class="container-fluid">
          <div class="row">
            <code class="next-steps col-md-7 text-light bg-dark p-4">
              {{ JSON.stringify(apiMessage, null, 2) }}
            </code>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverUrl } from '../../auth_config.json'
import titleMixin from '@/mixins/title'

export default {
  name: 'Api',
  title: 'ExternalAPI - Model Parameter Sensitivity',
  mixins: [titleMixin],
  data() {
    return {
      apiMessage: null,
    }
  },
  methods: {
    async callApiEndpoint() {
      try {
        const response = await fetch(`${serverUrl}/api/v1/messages/public-message`)

        const json = await response.json()
        this.apiMessage = json.message
      } catch (e) {
        this.apiMessage = `Error: the server responded with '${e}'`
      }
    },
    async callApiSecuredEndpoint() {
      const accessToken = await this.$auth.getTokenSilently()

      try {
        const response = await fetch(`${serverUrl}/api/v1/messages/protected-message`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (response.status === 401) {
          this.apiMessage = response.message
        }

        if (response.status === 200) {
          const json = await response.json()
          this.apiMessage = json.message
        }
      } catch (e) {
        this.apiMessage = `Error: the server responded with '${e}'`
      }
    },
  },
}
</script>

<style scoped>
.spacer {
  min-width: 1rem;
}
</style>
