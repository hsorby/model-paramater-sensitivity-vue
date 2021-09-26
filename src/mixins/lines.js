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
    // Initialise a resize observer to update lines if any of the elements
    // move.
    const el1 = document.getElementById(this.line1Start)
    const el2 = document.getElementById(this.line2Start)
    const el3 = document.getElementById(this.linesEnd)

    const observer = new ResizeObserver(this.updateLines)

    // Draw in some lines showing the connection between
    // the two different sources of the load model field.
    observer.observe(el1)
    observer.observe(el2)
    observer.observe(el3)
    this.ro = observer

    this.line1 = LeaderLine.setLine(el1, el3, {
      color: 'red',
      dash: true,
    })
    this.line2 = LeaderLine.setLine(el2, el3, {
      color: 'red',
      dash: true,
    })
  },
  beforeDestroy() {
    if (this.ro) {
      this.ro.disconnect()
    }
    this.line1.remove()
    this.line2.remove()
  },
  methods: {
    updateLines() {
      this.line1.position()
      this.line2.position()
    },
  },
}
