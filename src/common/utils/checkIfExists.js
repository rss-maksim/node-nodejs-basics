import {promises} from "node:fs";

export const checkIfExists = async (file) => {
    try {
        await promises.stat(file);
        return true;
    } catch (error) {
        return false;
    }
}
