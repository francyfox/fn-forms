// @ts-ignore
import NaiveUISchema = FNScheme.NaiveUISchema;
import { nestedObjectByPath, resolve } from '../../helper/helper.path';
import { Ref }                         from 'vue';
import merge                           from 'deepmerge';
import { renderElement }               from './schema.render.ts';
import { fnValueArguments }            from './schema.model.ts';

export enum NaiveUITypes {
    Form = 'n-form',
    Input = 'n-input',
    InputNumber = 'n-input-number',
    FormItem = 'n-form-item',
    Button = 'n-button',
    Space = 'n-space',
    Select = 'n-select',
    Checkbox = 'n-checkbox',
    Radio = 'n-radio',
    RadioGroup = 'n-radio-group'
}

export const sortComponentsByAction = {
    value: [
        NaiveUITypes.Input,
        NaiveUITypes.InputNumber,
        NaiveUITypes.Select,
        NaiveUITypes.RadioGroup,
    ],
    checked: [
        NaiveUITypes.Checkbox,
        NaiveUITypes.Radio,
    ],
};

export type NaiveUISchema = NaiveUISchemaEl[]

export declare interface NaiveUISchemaEl {
    $type: NaiveUITypes;
    $children: NaiveUISchema | string;
    $props: any;
}

export const resolveRefVarByPath = (value: string, data: Ref<object>) => {
    const path = value.replace('$data.', '');
    return resolve(path, data, '.');
};
export default function naiveUISchemaRender(json: NaiveUISchema, data: Ref<object>) {
    const [first] = json;

    return renderElement(first, data);
}


export function updateFormItemValue(argument: fnValueArguments) {
    const {$props, v, path, formData} = argument;
    const inputDeep = nestedObjectByPath(path, v);
    const merged = merge(formData, inputDeep, {
        arrayMerge: () => path.replace('$data.', '').split('.'),
    });
    Object.assign(formData, merged);
    return ($props.value.value)
        ? $props.value.value = v
        : $props.checked.value = v;
}

