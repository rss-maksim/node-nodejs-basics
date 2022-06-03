import { mapToString, parse } from './common.js';

const prefix = '--';

export const parseArgs = () => {
    const args = process.argv.slice(2);
    const keyValue = parse(args, prefix);

    return mapToString(keyValue, ' is ', ', ');
};

parseArgs();
