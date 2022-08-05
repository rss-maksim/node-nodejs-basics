import { validate as uuidValidate } from 'uuid';

export const validateId = (id?: string | null) => {
    return uuidValidate(id);
}
