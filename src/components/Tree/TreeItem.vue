<template>
  <li :class="{ parent_li: isParent, selected: node.isSelected }" @click="selectNode(node)">
    <font-awesome-icon v-if="isParent" :icon="isOpen ? 'plus-square' : 'minus-square'" @click="toggle" />
    <span :title="node.title"> <img v-if="showIcon(node)" :src="node.icon" :class="nodeClass(node)" /> {{ node.name }}</span>
    <a v-for="btn in node.buttons" :key="btn.title" class="ml5" href="javascript:" :title="btn.title" @click="btnClick(btn, node)">
      <i :class="btn.icon"></i>
    </a>
    <ul v-show="isOpen">
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
      isOpen: true,
    }
  },
  computed: {
    isParent() {
      return this.node.children.length > 0
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
    toggle: function () {
      this.isOpen = !this.isOpen
    },
    selectNode: function (node) {
      if (node.id) {
        this.$emit('selectItem', { id: node.id, state: !node.isSelected })
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

.tree ul ul li .selected {
  background-color: darkorange;
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
