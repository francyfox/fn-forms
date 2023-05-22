import { h, ref, Ref, RendererElement, RendererNode, resolveComponent, VNode } from 'vue';
import {
    NaiveUISchema,
    NaiveUISchemaEl,
    NaiveUITypes,
    resolveRefVarByPath,
    updateFormItemValue,
}                                           from './schema.parser';
import { hasCheckedAction, hasValueAction } from './schema.model.ts';

export function renderChildren(children: NaiveUISchema | string, formData: Ref<object>): VNode<RendererNode, RendererElement, {
    [p: string]: any
}>[] | { default: () => NaiveUISchema | string } {
    return (Array.isArray(children))
        ? children.map((i: NaiveUISchemaEl) => renderElement(i, formData))
        : {default: () => children ?? ''};
}

export function renderElement(_el: NaiveUISchemaEl, formData: Ref<object>) {
    const index = Object.values(NaiveUITypes).indexOf(_el.$type as unknown as NaiveUITypes);

    if (index === -1) {
        throw new Error(
            `Type ${ _el.$type } is not support. Supported types: \n ${ JSON.stringify(NaiveUITypes, null, 4) }`,
        );
    }

    const {$type, ...schemeEl} = _el;
    let {$children, $props} = schemeEl;
    const component = resolveComponent(_el.$type);

    if (hasValueAction(_el.$type) || hasCheckedAction(_el.$type)) {
        const path = $props.value as string;
        $props.value = ref(resolveRefVarByPath(path, formData)) as Ref<string>;

        if (hasValueAction(_el.$type)) {
            $props = {
                ...$props,
                onUpdateValue: (v: any) => updateFormItemValue({$props, v, path, formData}),
            };
        } else if (hasCheckedAction(_el.$type)) {
            $props = {
                ...$props,
                onUpdateChecked: (v: any) => updateFormItemValue({$props, v, path, formData}),
            };
        }
    }

    // @ts-ignore
    return h(component, $props, renderChildren($children, formData));
}