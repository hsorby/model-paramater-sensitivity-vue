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
  },
}
</script>
