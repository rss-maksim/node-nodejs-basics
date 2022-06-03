import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import url from 'url';

// n should be received from main thread
export const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

export const sendResult = () => {
    try {
        parentPort.postMessage({ status: 'resolved', data: nthFibonacci(workerData) });
    } catch(error) {
        parentPort.postMessage({ status: 'error', data: null });
    }

    parentPort.postMessage(nthFibonacci(workerData));
};

const __filename = url.fileURLToPath(import.meta.url);
const N = 10;

if (isMainThread) {
    const worker = new Worker(__filename, { workerData: N });
    worker.on('message', (result) => {
        console.log(`nthFibonacci of ${N} is = `, result);
    });
    worker.on('error', (error) => {
        console.log(error);
    });
    worker.on('exit', (code) => {});
} else {
    sendResult();
}

