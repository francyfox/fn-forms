<script setup lang="ts">
import FnSchema from "./fn-schema.vue";
import { NaiveUISchema } from "../module/schema/schema.parser.ts";

const json = [
    {
        $type: 'n-form',
        $children: [
            {
                $type: 'n-form-item',
                path: 'user.name',
                $children: [
                    {
                        $type: 'n-input',
                        placeholder: 'Input Name',
                        value: '$data.user.name'
                    }
                ]
            },
            {
                $type: 'n-form-item',
                path: 'user.email',
                $children: [
                    {
                        $type: 'n-input',
                        type: 'email',
                        placeholder: 'Input Email',
                        value: '$data.user.email'
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
        <fn-schema :schema="json"/>
    </n-config-provider>
</template>

<style scoped>

</style>