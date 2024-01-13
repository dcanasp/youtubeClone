import { v4 as uuidv4 } from 'uuid';
// const { v4: uuidv4 } = require('uuid');

export function generateUuid() {
    return uuidv4();
}