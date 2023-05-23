// @ts-ignore
import NaiveUISchema = FNScheme.NaiveUISchema;
import { nestedObjectByPath, resolve } from '../../helper/helper.path';
import { Ref }                         from 'vue';
import merge                           from 'deepmerge';
import { renderElement }                  from './schema.render.ts';
import { fnValueArguments, NaiveUITypes } from './schema.model.ts';

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


export function updateValueHandler(argument: fnValueArguments) {
    const {$props, v, path, formData} = argument
    const inputDeep = nestedObjectByPath(path, v);
    console.log(path.replace('$data.', '').split('.'))
    const merged = merge(formData, inputDeep, {
        arrayMerge: (_, sourceArray) => sourceArray, // TODO: need add overwrite by path (+ multipath)
    });
    Object.assign(formData, merged);

    return ($props.value.value !== undefined)
        ? $props.value.value = v
        : $props.checked.value = v;
}

