import { h, ref, Ref, resolveComponent, VNode } from 'vue';
import {
    NaiveUISchemaEl,
    resolveRefVarByPath,
    updateValueHandler,
}                                               from '../../module/schema/schema.parser.ts';
import {
    hasActions,
    hasChangeAction,
    hasCheckedAction,
    hasValueAction,
    NaiveUITypes,
}                                               from '../../module/schema/schema.model.ts';

export function renderChildren(children: any, formData: Ref<object>): Array<VNode | string> | object | undefined {
    if (Array.isArray(children)) {
        return children.map((i: NaiveUISchemaEl) => renderElement(i, formData)); // TODO: default render broke the component
    } else if (children instanceof Object) {
        return children;
    } else if (typeof children === 'string') {
        return { default: () => children ?? '' };
    }
}

export function renderElement(_el: NaiveUISchemaEl, formData: Ref<object>): VNode<any> {
    const index = Object.values(NaiveUITypes).indexOf(_el.$type as unknown as NaiveUITypes);

    if (index === -1) {
        throw new Error(
            `Type ${ _el.$type } is not support. Supported types: \n ${ JSON.stringify(NaiveUITypes, null, 4) }`,
        );
    }

    const { $type, ...schemeEl } = _el;
    let { $children, $props } = schemeEl;
    const component = resolveComponent(_el.$type);

    if ($type === NaiveUITypes.Upload && $props) {
        $props.defaultFileList = ref(resolveRefVarByPath($props.defaultFileList, formData)) as Ref<string>;
    }

    if (hasActions(_el.$type)) {
        const path = ($props.checked)
            ? $props.checked as string
            : $props.value as string;

        if (hasValueAction(_el.$type)) {
            $props = {
                ...$props,
                onUpdateValue: (v: any) => updateValueHandler({ $props, v, path, formData }),
            };
        } else if (hasCheckedAction(_el.$type)) {
            $props.checked = ref(resolveRefVarByPath(path, formData));
            $props = {
                ...$props,
                onUpdateChecked: (v: any) => updateValueHandler({ $props, v, path, formData }, true),
            };
        }

        if (!hasChangeAction(_el.$type)) {
            $props.value = ref(resolveRefVarByPath(path, formData)) as Ref<string>;
        }
    }

    // @ts-ignore
    return h(component, $props, renderChildren($children, formData));
}