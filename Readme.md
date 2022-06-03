# Node.js basics

All the functions might be run through npm scripts:

```
    "fs:read": "node src/fs/run/read.js",
    "fs:copy": "node src/fs/run/copy.js",
    "fs:create": "node src/fs/run/create.js",
    "fs:delete": "node src/fs/run/delete.js",
    "fs:list": "node src/fs/run/list.js",
    "fs:rename": "node src/fs/run/rename.js",
    "cli:env": "node src/cli/run/env.js RSS_name1 value1 RSS_name2 value2",
    "cli:args": "node src/cli/run/args.js --propName value --prop2Name value2",
    "modules:cjsToEsm": "node src/modules/cjsToEsm.mjs",
    "hash:calcHash": "node src/hash/run/calcHash.js",
    "zip:compress": "node src/zip/run/compress.js",
    "zip:decompress": "node src/zip/run/decompress.js",
    "streams:read": "node src/streams/read.js",
    "streams:write": "node src/streams/write.js",
    "streams:transform": "node src/streams/transform.js",
    "wt:worker": "node src/wt/worker.js",
    "wt:main": "node src/wt/main.js",
    "cp:cp": "node src/cp/cp.js --version --test"
```
