import { NaiveUISchema } from '../module/schema/schema.parser.ts';

export default [
    {
        $type: 'n-form',
        $children: [
            {
                $type: 'n-space',
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
                                },
                            },
                        ],
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
                                    value: '$data.user.email',
                                },
                            },
                        ],
                    },
                ],
            },
            {
                $type: 'n-form-item',
                $props: {
                    label: 'Age',
                    path: 'user.age',
                },
                $children: [
                    {
                        $type: 'n-input-number',
                        $props: {
                            placeholder: 'Input age',
                            clearable: true,
                            value: '$data.user.age',
                        },
                    },
                ],
            },
            {
                $type: 'n-form-item',
                $props: {
                    label: 'Age',
                    path: 'user.agree',
                },
                $children: [
                    {
                        $type: 'n-checkbox',
                        $children: 'I agree',
                        $props: {
                            placeholder: 'Agree?',
                            value: '$data.user.agree',
                        },
                    },
                ],
            },
            {
                $type: 'n-form-item',
                $props: {
                    label: 'Gender',
                    path: 'user.gender',
                },
                $children: [
                    {
                        $type: 'n-select',
                        $children: 'I agree',
                        $props: {
                            value: '$data.user.gender',
                            options: [
                                {
                                    label: 'Nowhere Man',
                                    value: 'song4',
                                },
                                {
                                    label: 'Think For Yourself',
                                    value: 'song5',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                $type: 'n-form-item',
                $children: [
                    {
                        $type: 'n-button',
                        $children: 'Send Form',
                    },
                ],
            },

        ],
    },
] as NaiveUISchema;