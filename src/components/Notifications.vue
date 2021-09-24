<template>
  <div></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import toastMixin from '@/mixins/toast'

export default {
  name: 'Notifications',
  mixins: [toastMixin],
  computed: {
    ...mapGetters('notifications', ['messages']),
  },
  watch: {
    messages: {
      handler(values) {
        if (values.length > 0) {
          const value = values[0]
          this.notify(value.message, value.options).then(() => {
            this.remove(value)
          })
        }
      },
    },
  },
  methods: {
    ...mapActions('notifications', ['remove']),
    notifySuccess(x) {
      return this.notify(x.message, { type: 'success', time: 1000 })
    },
    notifyFailure(x) {
      return this.notify(x.message, { type: 'error', time: 3000 })
    },
    notify(message, options) {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: options.time,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', this.$swal.stopTimer)
          toast.addEventListener('mouseleave', this.$swal.resumeTimer)
        },
      })

      return Toast.fire({
        icon: options.type,
        title: message,
      })
    },
  },
}
</script>
