<template>
  <div class="container">
    <nav class="navbar navbar-expand-md navbar-light bg-light">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" :class="{ 'router-link-exact-active': isActive('prepare') }" href="#prepare" @click.prevent="setActive('prepare')"
            >Prepare a simulation</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ 'router-link-exact-active': isActive('simulations') }"
            href="#simulations"
            @click.prevent="setActive('simulations')"
            >View simulations</a
          >
        </li>
      </ul>
    </nav>
    <div id="myTabContent" class="tab-content py-3">
      <div id="simulation_tab_prepare" class="tab-pane fade" :class="{ 'active show': isActive('prepare') }"><prepare-tab-content /></div>
      <div id="simulation_tab_simulations" class="tab-pane fade" :class="{ 'active show': isActive('simulations') }"><simulations-tab-content /></div>
    </div>
  </div>
</template>

<script>
import PrepareTabContent from '@/components/SimulationsTabContent/Prepare.vue'
import SimulationsTabContent from '@/components/SimulationsTabContent/Simulations.vue'

export default {
  name: 'SimulationTabs',
  components: {
    PrepareTabContent,
    SimulationsTabContent,
  },
  data() {
    return {
      activeTab: 'prepare',
    }
  },
  methods: {
    isActive(tabItem) {
      return this.activeTab === tabItem
    },
    setActive(tabItem) {
      this.activeTab = tabItem
    },
  },
}
</script>
