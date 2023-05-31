<script setup lang="ts">
import FnSchema   from './lib/components/fn-schema.vue';
import TestSchema        from './test/TestSchema.ts';
import { ref } from 'vue';

const formData = ref({
  user: {
    name: 'francyfox',
    email: 'test@mail.ru',
    age: 16,
    agree: false,
    gender: ['song4'],
    live: 'live',
    test: false
  },
});

const validateForm = async (validate) => {
  try {
    await validate()
  } catch (e: [any]) {
    console.log(e)
  }
}

</script>

<template>
  <n-config-provider>
    <fn-schema ref="formRef"
               v-model:data="formData"
               :schema="TestSchema"
               @validate="validateForm"
    >
      <template #submit>test</template>
    </fn-schema>
  </n-config-provider>

  <pre>{{ JSON.stringify(formData.user, null, 4) }}</pre>
</template>

<style scoped>

</style>