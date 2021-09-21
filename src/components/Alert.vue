<template>
  <div v-if="show" class="alert" :style="{ borderColor: borderColour, backgroundColor: backgroundColour, color: textColour }">
    <div class="alert-content">
      <slot></slot>
    </div>
    <span class="close" @click="show = false">
      <font-awesome-icon icon="times" />
    </span>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    borderColour: {
      type: String,
      default: '#000000',
    },
    backgroundColour: {
      type: String,
      default: '#333333',
    },
    textColour: {
      type: String,
      default: '#ffffff',
    },
  },
  data() {
    return {
      show: true,
    }
  },
}
</script>

<style lang="scss" scoped>
.alert {
  padding: 10px;
  display: flex;
}

.alert-content {
  flex-grow: 1;
}

.close {
  cursor: pointer;
}
</style>
