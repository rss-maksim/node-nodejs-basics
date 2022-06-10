export const parseArgs = (args = []) => {
    return args.reduce((acc, arg) => {
        const [key, value] = arg.split('=');
        acc[key.replace('--', '')] = value;
        return acc;
    }, {});
}
