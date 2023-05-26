<script setup lang="ts">
import { NUploadDragger } from 'naive-ui/es/upload';
import { NIcon }          from 'naive-ui/es/icon';

withDefaults(defineProps<{
  icon?: string
}>(), {
  icon: null,
});
</script>

<template>
  <n-upload-dragger>
    <div v-if="icon" style="margin-bottom: 12px">
      <n-icon size="48" :depth="3">
        <component :is="icon"/>
      </n-icon>
    </div>
    <n-text style="font-size: 16px">
      <slot name="title"/>
    </n-text>
    <n-p depth="3" style="margin: 8px 0 0 0">
      <slot name="desc"/>
    </n-p>
  </n-upload-dragger>
</template>

<style scoped>

</style>