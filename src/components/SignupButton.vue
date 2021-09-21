<template>
  <button v-if="!$auth.isAuthenticated" class="btn btn-primary btn-block" @click="signup">Sign Up</button>
</template>

<script>
export default {
  name: 'SignupButton',
  methods: {
    signup() {
      this.$auth.loginWithRedirect({
        screen_hint: 'signup',
      })
    },
  },
}
</script>
