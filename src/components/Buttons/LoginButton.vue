<template>
  <button v-if="!$auth.isAuthenticated" class="btn btn-primary btn-block" @click="login">Log In</button>
</template>

<script>
export default {
  name: 'LoginButton',
  methods: {
    login() {
      this.$auth.loginWithRedirect()
    },
  },
}
</script>
