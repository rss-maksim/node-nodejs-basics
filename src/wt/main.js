import os from 'os';
import { Worker } from 'worker_threads';
import path from 'path';

const workerFile = path.resolve('src/wt/worker.js');
const cpus = os.cpus().length;

export const performCalculations = async () => {
    const resolved = await Promise.all(
        Array(cpus).fill(0).map((_, i) => i + 10).map((n) => {
                return new Promise((resolve, reject) => {
                    const worker = new Worker(workerFile, { workerData: n });
                    worker.on('message', resolve);
                    worker.on('error', reject);
                })
            }
        )
    );
    console.log(resolved);
};

await performCalculations();
