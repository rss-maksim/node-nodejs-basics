export const parseCommand = (input = '') => {
    return input.split(' ').filter(Boolean).map((arg) => arg.trim());
}
