import LeaderLine from 'leader-line-vue'

export default {
  data() {
    return {
      line1: null,
      line2: null,
      ro: null,
    }
  },
  mounted() {
    const haveSecondLine = this.line2Start !== undefined
    // Initialise a resize observer to update lines if any of the elements
    // move.
    const el1 = document.getElementById(this.line1Start)
    let el2 = undefined
    if (haveSecondLine) {
      el2 = document.getElementById(this.line2Start)
    }
    const el3 = document.getElementById(this.linesEnd)

    const observer = new ResizeObserver(this.updateLines)

    // Draw in some lines showing the connection between
    // the two different sources of the load model field.
    observer.observe(el1)
    if (haveSecondLine) {
      observer.observe(el2)
    }
    observer.observe(el3)
    this.ro = observer

    this.line1 = LeaderLine.setLine(el1, el3, {
      color: 'red',
      dash: true,
    })
    if (haveSecondLine) {
      this.line2 = LeaderLine.setLine(el2, el3, {
        color: 'red',
        dash: true,
      })
    }
  },
  beforeDestroy() {
    if (this.ro) {
      this.ro.disconnect()
    }
    this.line1.remove()
    if (this.line2 !== null) {
      this.line2.remove()
    }
  },
  methods: {
    updateLines() {
      this.line1.position()
      if (this.line2 !== null) {
        this.line2.position()
      }
    },
  },
}
