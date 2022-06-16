import { readdir } from 'node:fs/promises';
import readline from 'readline';
import path from 'path';
import os from 'os';

import { parseArgs, parseCommand } from './utils/index.js';
import { commands } from './constants/index.js';
import { InvalidIInputException } from './exceptions/index.js';
import { read, remove, write, rename, copy } from './fs/index.js';
import { isDirectory } from './common/index.js';
import { calculateHash } from './hash/index.js';
import { compress, decompress } from './zip/index.js';

const userHomeDir = os.homedir();

export const runCli = async () => {
    let dirname = userHomeDir;
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const args = parseArgs(process.argv.slice(2));

    const handleOperation = async (input) => {
        const [command, ...args] = parseCommand(input);
        try {
            if (!commands[command]) {
                throw new InvalidIInputException('Invalid input');
            } else if (command === commands['.exit']) {
                rl.close();
            } else if (command === commands.up) {
                dirname = path.resolve(dirname, '..');
            } else if (command === commands.cd) {
                const directoryPath = path.resolve(dirname, args[0]);
                const isDir = await isDirectory(directoryPath);
                if (isDir) {
                    dirname = directoryPath;
                } else {
                    throw new InvalidIInputException('Invalid input');
                }
            } else if (command === commands.ls) {
                const files = await readdir(dirname);
                console.log('Current directory files: \n', files);
            } else if (command === commands.cat) {
                const content = await read(path.resolve(dirname, args[0]));
                console.info(content);
            } else if (command === commands.add) {
                await write(path.resolve(dirname, args[0]))
            } else if (command === commands.rn) {
                const oldFile = path.resolve(dirname, args[0]);
                const newFile = path.resolve(dirname, args[1]);
                await rename(oldFile, newFile);
            } else if (command === commands.cp) {
                const source = path.resolve(dirname, args[0]);
                const destination = path.resolve(dirname, args[1], args[0]);
                await copy(source, destination);
            } else if (command === commands.mv) {
                const source = path.resolve(dirname, args[0]);
                const destination = path.resolve(dirname, args[1], args[0]);
                await copy(source, destination);
                await remove(source);
            } else if (command === commands.rm) {
                const filename = path.resolve(dirname, args[0]);
                await remove(filename);
            } else if (command === commands.os) {
                const [osArg] = args;
                if (osArg === '--EOL') {
                    console.log(JSON.stringify(os.EOL));
                } else if (osArg === '--cpus') {
                    console.log(os.cpus());
                } else if (osArg === '--homedir') {
                    console.log(os.homedir());
                } else if (osArg === '--username') {
                    console.log(os.userInfo()?.username);
                } else if (osArg === '--architecture') {
                    console.log(os.arch());
                }
            } else if (command === commands.hash) {
                const file = path.resolve(dirname, args[0]);
                const hash = await calculateHash(file);
                console.info(hash);
            } else if (command === commands.compress) {
                const source = path.resolve(dirname, args[0]);
                const destination = path.resolve(dirname, args[1]);
                await compress(source, destination);
            } else if (command === commands.decompress) {
                const source = path.resolve(dirname, args[0]);
                const destination = path.resolve(dirname, args[1]);
                await decompress(source, destination);
            }
        } catch (error) {
            if (error instanceof InvalidIInputException) {
                console.error(error.message);
                return;
            }
            console.error('Operation failed');
        } finally {
            console.info(`\nYou are currently in ${dirname}\n`);
        }
    }

    rl.question(`Welcome to the File Manager, ${args.username}!\nYou are currently in ${dirname}\n`, handleOperation);

    rl.on('line', handleOperation);

    rl.on('close', () => {
        console.info(`Thank you for using File Manager, ${args.username}!`);
    });
}

await runCli();
