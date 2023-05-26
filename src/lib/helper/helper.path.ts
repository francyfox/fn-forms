export function resolve(path: string, obj: object, separator = '.'): any {
    const properties = Array.isArray(path) ? path : path.split(separator);
    // @ts-ignore
    return properties.reduce((previousValue: any, currentValue: string) => {
        return previousValue?.[currentValue];
    }, obj);
}

export const nestedObjectByPath = (path: string, val: any) => {
    const obj = {} as any;
    const keys = path.replace('$data.', '').split('.');
    const lastKey = keys.pop();
    const lastObj = keys.reduce((obj, key) =>
            obj[key] = obj[key] || {},
        obj);
    if (lastKey) lastObj[lastKey] = val;
    return obj;
};