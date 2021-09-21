<template>
  <button v-if="$auth.isAuthenticated" class="btn btn-danger btn-block" @click.prevent="logout">Log Out</button>
</template>

<script>
export default {
  name: 'LogoutButton',
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push({ path: '/' })
    },
  },
}
</script>
