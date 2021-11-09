<template>
  <div class="container">
    <div v-if="showSimulationRuns">
      <div v-for="simulation in availableSimulations" :key="simulation.reference" class="card m-2 col-md-7">
        <local-loading :loading="loadingData === simulation.reference">
          <div class="card-body">
            <h2 class="card-title">{{ simulation.title }}</h2>
            <p class="card-text text-muted">
              <span class="badge badge-pill" :class="badgeStyle(simulation.status)">{{ simulation.status }}</span>
            </p>
            <a
              href="#"
              class="btn btn-primary"
              :class="{ disabled: viewSimulationDataButtonDisabled(simulation) }"
              @click.prevent="viewClicked(simulation.reference)"
              >View</a
            >
          </div>
        </local-loading>
      </div>
    </div>
    <div v-else>
      <plotly :data="plotData" :layout="plotLayout" class="big-plot"></plotly>
      <div class="flex-container horizontal-centre"><close-button @click="showSimulationRuns = true" /></div>
    </div>
  </div>
</template>

<script>
import { Plotly } from 'vue-plotly'

import { mapGetters, mapMutations, mapActions } from 'vuex'

import { fetchSimulationInfo, fetchSimulationResult } from '@/services/backend-api'

import CloseButton from '../Buttons/CloseButton.vue'
import LocalLoading from '../LocalLoading.vue'

export default {
  name: 'SimulationsTabContent',
  components: { CloseButton, LocalLoading, Plotly },
  data() {
    return {
      loadingData: '',
      showSimulationRuns: true,
      plotData: [],
      plotLayout: {
        title: 'Simulation result',
        margin: {
          l: 20,
          r: 20,
          t: 40,
          b: 50,
          pad: 0,
        },
      },
    }
  },
  computed: {
    ...mapGetters('simulations', ['itemList', 'getActive']),
    availableSimulations() {
      return [...this.itemList, ...this.getActive]
    },
  },
  watch: {
    getActive: {
      handler() {
        // this.polling = actives
        setTimeout(this.poll, 1000)
      },
      deep: true,
    },
  },
  methods: {
    ...mapMutations('simulations', ['removeActive']),
    ...mapActions('simulations', ['activeFinished']),
    ...mapActions('notifications', ['addFailure']),
    viewSimulationDataButtonDisabled(simulation) {
      return simulation.status !== 'finished' || this.loadingData !== ''
    },
    async viewClicked(reference) {
      this.loadingData = reference
      const accessToken = await this.$auth.getTokenSilently()
      fetchSimulationResult(reference, accessToken)
        .then(
          (response) => {
            this.loadingData = ''
            this.showSimulationRuns = false
            const time = response.time
            delete response.time

            let plots = []
            for (let [key, value] of Object.entries(response)) {
              plots.push({
                x: time,
                y: value,
                type: 'scatter',
                name: key,
                margin: { t: 0 },
              })
            }
            this.plotData = plots
          },
          (reason) => {
            this.loadingData = ''
            this.addFailure(reason.message)
          }
        )
        .catch((error) => {
          this.loadingData = ''
          this.addFailure(error)
        })
    },
    pollSimulation(simulation_info, accessToken) {
      const this_ = this
      fetchSimulationInfo(simulation_info.reference, accessToken)
        .then(
          (response) => {
            const info = response.simulation_info
            let item = this_.getActive.find((x) => x.reference === info.reference)
            if (item) {
              item.status = info.status
            } else {
              console.log('not an itme:', info.reference, simulation_info.reference)
            }
            // console.log(info.status)
            if (info.status === 'finished' && item) {
              console.log('trying to finish a simulation')
              // console.log(this_.polling.length)
              // this_.polling = this_.polling.filter((x) => x.reference !== info.reference)
              console.log('finishing active simulation.', info.reference)
              // console.log(this_.polling.length)
              this_.activeFinished(info)
            }
          },
          (reason) => {
            console.log('reason', reason)
            // this_.polling = this_.polling.filter((x) => x.reference !== simulation_info.reference)
            this_.removeActive(simulation_info.reference)
            this_.addFailure(reason.message)
          }
        )
        .catch((error) => {
          console.log('error', error)
          // this_.polling = this_.polling.filter((x) => x.reference !== simulation_info.reference)
          this_.removeActive(simulation_info.reference)
          this_.addFailure(error)
        })
    },
    async poll() {
      const accessToken = await this.$auth.getTokenSilently()
      for (let entry of this.getActive) {
        this.pollSimulation(entry, accessToken)
      }
      if (this.getActive.length) {
        setTimeout(this.poll, 1000)
      }
    },
    badgeStyle(status) {
      let style = 'badge-danger'
      if (status === 'pending') {
        style = 'badge-success'
      } else if (status === 'running') {
        style = 'badge-warning'
      } else if (status === 'finished') {
        style = 'badge-primary'
      }
      return style
    },
  },
}
</script>

<style lang="scss" coped>
.card-body {
  position: relative;
}

.badge {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
}

@media (min-width: 1200px) {
  .big-plot {
    height: 58vh;
  }
}
</style>
