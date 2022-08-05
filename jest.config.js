module.exports = {
    preset: 'ts-jest',
    globals: {
        "ts-jest": {
            tsconfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: [
        "ts",
        "js"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
        "**/tests/**/*.test.(ts|js)"
    ],
    testEnvironment: "node",
    setupFiles: ["<rootDir>/.jest/setEnvVars.js"]
};
