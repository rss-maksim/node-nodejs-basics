export const parse = (args, prefix) => {
    let temporaryKey = null;
    const argsMap = new Map();
    for (let arg of args) {
        if (temporaryKey) {
            argsMap.set(temporaryKey, arg)
            temporaryKey = null;
        } else if (arg.startsWith(prefix)) {
            temporaryKey = arg;
        }
    }
    return argsMap;
}

export const mapToString = (map, keyValueSeparator = '=', outputSeparator = '; ') => {
    const output = [];
    for (let [key, value] of map) {
        output.push(`${key}${keyValueSeparator}${value}`);
    }
    return output.join(outputSeparator);
}
