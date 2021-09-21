<template>
  <div class="next-steps about">
    <h1 class="text-center">About this website</h1>
    <div class="col-md-11 mb-4">
      <p>The goal of this website is to investigate how a modeller might run simulations with uncertainties in the model parameters.</p>
      <p>This website is a vehicle to show how using the COMBINE standards our goal might be acheived.</p>
      <p>If you have any questions please contact us through any of the following:</p>
      <ul>
        <li><pre class="col-12 text-light bg-dark p-4">somebody@somewhere.org</pre></li>
      </ul>
    </div>
  </div>
</template>

<script>
import titleMixin from '@/mixins/title'

export default {
  name: 'About',
  title: 'About - Model Parameter Sensitivity',
  mixins: [titleMixin],
}
</script>
