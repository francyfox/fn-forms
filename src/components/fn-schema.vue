<script setup lang="ts">
import naiveUISchemaRender, { NaiveUISchema } from "../module/schema/schema.parser.ts";
import { Ref } from "vue";

const props = defineProps<{
  data: Ref<object>
  schema: NaiveUISchema
}>()
defineEmits(['update:data'])

const NFormNode = naiveUISchemaRender(props.schema, props.data)

</script>

<template>
  <div class="schema">
      <h1>Test</h1>
      <Suspense>
          <n-form-node/>
          <template #fallback>
              ...Loading
          </template>
      </Suspense>
  </div>
</template>

<style scoped>

</style>