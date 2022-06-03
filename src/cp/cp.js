import { fork } from 'node:child_process';

export const spawnChildProcess = async (args) => {
    fork('src/cp/files/script.js', args);
};

await spawnChildProcess(process.argv.slice(2));
