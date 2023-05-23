<script setup lang="ts">
import naiveUISchemaRender, { NaiveUISchema } from '../module/schema/schema.parser.ts';

const props = withDefaults(defineProps<{
  data: any,
  schema: NaiveUISchema
}>(), {
  data: {},
});
defineEmits(['update:data']);

const NFormNode = naiveUISchemaRender(props.schema, props.data);

</script>

<template>
  <div class="schema">
    <h1>Test</h1>
    <KeepAlive>
      <Suspense>
        <n-form-node/>
        <template #fallback>
          Loading...
        </template>
      </Suspense>
    </KeepAlive>
  </div>
</template>

<style scoped>

</style>