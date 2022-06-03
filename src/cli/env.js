import { mapToString, parse } from './common.js';

const prefix = 'RSS_';

export const parseEnv = () => {
    const args = process.argv.slice(2);
    const keyValue = parse(args, prefix);

    return mapToString(keyValue);
};

parseEnv();
