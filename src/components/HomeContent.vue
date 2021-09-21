<template>
  <div class="next-steps">
    <div class="row">
      <div v-if="!$auth.isAuthenticated" class="col-md-11 mb-4">
        <h3 class="mb-3">Login to get started</h3>
        <p>You need to login before you can upload a model and perform a simulation.</p>
      </div>
      <div v-else class="col-md-11 mb-4">
        <h3 class="mb-3">Instructions</h3>
        <p>On the simulations page you can upload a CellML model to use in a simulation.</p>
        <p>Once a model has been uploaded you can load it into the interface so that you can define the uncertain parameters.</p>
        <p>
          When you have at least one uncertain parameter selected you can start to define the uncertainties for any of the choosen uncertain
          parameters.
        </p>
        <p>Next you can set the simulation paramaters to simulate the model under.</p>
        <p>Lastly, specify the parameters to plot against the variable of integration.</p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeContent',
}
</script>
