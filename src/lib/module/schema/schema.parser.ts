import { nestedObjectByPath, resolve } from '../../helper/helper.path.ts';
import { Ref, RendererElement, VNode }                  from 'vue';
import { deepmerge, deepmergeCustom, DeepMergeLeafURI } from 'deepmerge-ts';
import { renderElement }                                from '../../module/schema/schema.render.ts';
import { fnValueArguments, NaiveUITypes } from '../../module/schema/schema.model.ts';

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
export default function naiveUISchemaRender(json: NaiveUISchema, data: Ref<object>): VNode<any, RendererElement, {[p: string]: any}>{
    const [first] = json;

    return renderElement(first, data);
}

export type updateValueConfig = {
    checked?: boolean,
}

export function updateValueHandler(argument: fnValueArguments, config?: updateValueConfig) {
    const { $props, v, path, formData } = argument;
    const inputDeep = nestedObjectByPath(path, v);
    const customMerge = deepmergeCustom<{
        DeepMergeArraysURI: DeepMergeLeafURI;
    }>({
        mergeArrays: false,
    });

    const merged = customMerge(formData, inputDeep)
    Object.assign(formData, merged);

    return (!config?.checked)
        ? $props.value.value = v
        : $props.checked.value = v;
}

