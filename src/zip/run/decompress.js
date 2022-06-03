import { decompress } from '../decompress.js';

try {
    await decompress();
} catch (error) {
    console.error(error);
}
