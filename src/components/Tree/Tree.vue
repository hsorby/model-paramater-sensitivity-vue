<template>
  <div class="tree">
    <ul>
      <tree-item :node.sync="treeStructure.root" @selectItem="$emit('select', $event)"></tree-item>
    </ul>
  </div>
</template>

<script>
import TreeItem from './TreeItem.vue'

export default {
  name: 'Tree',
  components: {
    TreeItem,
  },
  props: {
    data: {
      type: Object,
      default: function () {
        return {}
      },
    },
    selectedData: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data() {
    return {
      imgComputedConstant: require('../../assets/computedConstant.png'),
      imgConstant: require('../../assets/constant.png'),
      imgState: require('../../assets/state.png'),
      imgAlgebraic: require('../../assets/algebraic.png'),
    }
  },
  computed: {
    treeStructure() {
      let root = this.createNode()
      for (const key in this.data) {
        let node = this.createNode(key)
        for (const childKey in this.data[key]) {
          let icon = undefined
          if (this.data[key][childKey] === 'COMPUTED_CONSTANT') {
            icon = this.imgComputedConstant
          } else if (this.data[key][childKey] === 'CONSTANT') {
            icon = this.imgConstant
          } else if (this.data[key][childKey] === 'ALGEBRAIC') {
            icon = this.imgAlgebraic
          } else if (this.data[key][childKey] === 'STATE') {
            icon = this.imgState
          }
          const id = `${key}.${childKey}`
          let isSelected = false
          const idx = this.selectedData.findIndex((e) => e.id === id)
          if (idx !== -1) {
            isSelected = true
          }
          const childNode = this.createNode(childKey, icon, id, isSelected)
          this.addNode(node, childNode)
        }
        this.addNode(root, node)
      }

      const tree = {
        root,
      }
      return tree
    },
  },
  methods: {
    createNode(name, icon, id, isSelected) {
      return {
        name: name ? name : '',
        icon,
        id,
        isSelected,
        children: [],
      }
    },
    addNode(parent, node) {
      parent.isOpen = true
      parent.children.push(node)
    },
  },
}
</script>

<style scoped>
.tree {
  width: 100%;
  font-size: 14px;
  min-height: 20px;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
</style>
