import defaults from "./default-env.js";

export default {
    ...defaults,
    ...process.env
};