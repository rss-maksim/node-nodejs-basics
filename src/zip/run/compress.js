import { compress } from '../compress.js';

try {
    await compress();
} catch (error) {
    console.error(error);
}
