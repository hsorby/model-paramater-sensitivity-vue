export default {
  methods: {
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
