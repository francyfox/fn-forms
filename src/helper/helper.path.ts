export const toPascalCase = (str: string) => {
    return str.replace(/\w+/g, function(w){
        return w[0].toUpperCase() + w.slice(1).toLowerCase()
    })
}

export function resolve(path: string, obj: object, separator='.'): any {
    const properties = Array.isArray(path) ? path : path.split(separator)
    // @ts-ignore
    return properties.reduce((previousValue: any, currentValue: string) => {
        return previousValue?.[currentValue]
    }, obj)
}

export const nestedObjectByPath = (path: string, val: any) => {
    const obj = {}
    const keys = path.replace('$data.', '').split('.');
    const lastKey = keys.pop();
    const lastObj = keys.reduce((obj, key) =>
            obj[key] = obj[key] || {},
        obj);
    lastObj[lastKey] = val;

    return obj
}