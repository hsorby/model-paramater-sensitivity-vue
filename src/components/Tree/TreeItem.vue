<template>
  <li :class="{ parent_li: node.isParent }" :style="{ 'background-color': backgroundColour }" @click.prevent="selectNode(node)">
    <font-awesome-icon v-if="node.isParent" :icon="activeIcon" @click.prevent="toggle(node)" />
    <span :title="node.title"> <img v-if="showIcon(node)" :src="node.icon" :class="nodeClass(node)" /> {{ node.name }}</span>
    <a v-for="btn in node.buttons" :key="btn.title" class="ml5" href="javascript:" :title="btn.title" @click="btnClick(btn, node)">
      <i :class="btn.icon"></i>
    </a>
    <ul v-show="node.isOpen">
      <li v-show="node.showLoading && node._loading"><i class="fa fa-spinner fa-pulse"></i></li>
      <tree-item v-for="item in node.children" :key="item.name" :node="item" @selectItem="$emit('selectItem', $event)"></tree-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    node: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      activeIcon: 'plus-square',
      backgroundColour: 'unset',
    }
  },
  watch: {
    'node.isOpen': function (val) {
      this.activeIcon = val ? 'plus-square' : 'minus-square'
      if (!Object.prototype.hasOwnProperty.call(this.node, '_loading')) {
        // this.node._loading = false
        this.$set(this.node, '_loading', false)
      }
      if (val) {
        if (typeof this.node.onOpened === 'function') {
          this.node.onOpened(this.node)
        }
      } else {
        if (typeof this.node.onClosed === 'function') {
          this.node.onClosed(this.node)
        }
      }
    },
  },
  methods: {
    showIcon: function (node) {
      return node.icon !== undefined
    },
    nodeClass: function (node) {
      if (node.isOpen) {
        return node.openedIcon || node.icon
      } else {
        return node.closedIcon || node.icon
      }
    },
    toggle: function (node) {
      if (Object.prototype.hasOwnProperty.call(node, 'isOpen')) {
        node.isOpen = !node.isOpen
        this.activeIcon = node.isOpen ? 'plus-square' : 'minus-square'
      } else {
        this.$set(node, 'isOpen', true)
        this.activeIcon = 'plus-square'
      }
    },
    selectNode: function (node) {
      if (node.id) {
        const state = this.backgroundColour == 'unset'
        this.$emit('selectItem', { id: node.id, state })
        if (this.backgroundColour == 'unset') {
          this.backgroundColour = 'darkorange'
        } else {
          this.backgroundColour = 'unset'
        }
      }
    },
    btnClick: function (btn, node) {
      if (typeof btn.click === 'function') {
        btn.click(node)
      }
    },
  },
}
</script>

<style scoped>
.tree li {
  margin: 0;
  padding: 5px;
  position: relative;
  list-style: none;
  border-radius: 2rem;
}

.tree img {
  width: 1.2rem;
  height: 1.2rem;
}

.tree li > span,
.tree li > i,
.tree li > a {
  line-height: 20px;
  vertical-align: middle;
}

.tree li > a + a {
  margin-left: 5px;
}

.tree li i.icon-open-state {
  font-size: 16px;
}

.tree ul ul li:hover {
  background: rgba(0, 0, 0, 0.015);
}

.tree li:after,
.tree li:before {
  content: '';
  left: -18px;
  position: absolute;
  right: auto;
}

.tree li:before {
  border-left: 1px solid #999;
  bottom: 50px;
  height: 100%;
  top: -16px;
  width: 1px;
}

.tree li:after {
  border-top: 1px solid #999;
  height: 20px;
  top: 17px;
  width: 22px;
}

.tree li span {
  display: inline-block;
  padding: 3px 5px;
  text-decoration: none;
}

.tree > ul > li::after,
.tree > ul > li:before {
  border: 0;
}

.tree li:last-child::before {
  height: 34px;
}

.tree > ul {
  padding-left: 0;
}

.tree ul ul {
  padding-left: 24px;
  padding-top: 10px;
}
</style>
