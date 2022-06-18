import {API_PREFIX} from '../constants';

export const isPrefixInvalid = (prefix: string) => prefix !== API_PREFIX;
