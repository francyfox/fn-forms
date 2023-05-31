<script setup lang="ts">
import naiveUISchemaRender, { NaiveUISchema } from '../module/schema/schema.parser.ts';
import { ref, useSlots }                      from 'vue';
import { FormInst }                           from 'naive-ui';

const formRef = ref<FormInst | null>(null);
const props = withDefaults(defineProps<{
  data: any,
  schema: NaiveUISchema,
  hasSubmit: boolean
}>(), {
  data: {},
  hasSubmit: true
});
const emit = defineEmits(['update:data', 'validate']);
const NFormNode = naiveUISchemaRender(props.schema, props.data)

async function validateForm() {
  const validate = await formRef.value?.validate
  emit('validate', validate)
}

</script>

<template>
  <div class="schema">
    <KeepAlive>
      <Suspense>
        <n-form-node ref="formRef"/>
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </KeepAlive>
    <n-button v-if="props.hasSubmit" @click.prevent="validateForm">
      <slot name="submit">
        Next
      </slot>
    </n-button>
  </div>
</template>

<style scoped>

</style>