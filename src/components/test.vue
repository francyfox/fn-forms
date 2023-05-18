<script setup lang="ts">
import FnSchema from "./fn-schema.vue";
import { NaiveUISchema } from "../module/schema/schema.parser.ts";
import {ref} from "vue";

const formData = ref({
  user: {
    name: 'francyfox',
    email: 'test@mail.ru'
  }
})
const json = [
    {
        $type: 'n-form',
        $children: [
            {
                $type: 'n-form-item',
                $props: {
                  label: 'Name',
                  path: 'user.name',
                },
                $children: [
                    {
                        $type: 'n-input',
                        $props: {
                          placeholder: 'Input Name',
                          value: '$data.user.name',
                        }
                    }
                ]
            },
            {
                $type: 'n-form-item',
                $props: {
                  label: 'Email',
                  path: 'user.email',
                },
                $children: [
                    {
                        $type: 'n-input',
                        $props: {
                          type: 'email',
                          placeholder: 'Input Email',
                          value: '$data.user.email'
                        }
                    }
                ]
            },
            {
                $type: 'n-form-item',
                $children: [
                    {
                        $type: 'n-button',
                        $children: 'Send Form'
                    }
                ]
            },

        ]
    }
] as NaiveUISchema

</script>

<template>
    <n-config-provider>
        <fn-schema v-model:data="formData" :schema="json"/>
        <pre>{{ JSON.stringify(formData.user, null, 4) }}</pre>
    </n-config-provider>
</template>

<style scoped>

</style>