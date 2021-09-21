<template>
  <div class="navbar-nav ml-auto">
    <AuthenticationButton />
  </div>
</template>

<script>
import AuthenticationButton from '@/components/Buttons/AuthenticationButton'

export default {
  name: 'AuthNav',
  components: { AuthenticationButton },
}
</script>
