import { getMessage } from "../db/quieres.js";

const messageController = async () => {
    const message = await getMessage();
    return message;
}

export { messageController };
