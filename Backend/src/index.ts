import { App } from "./app";
import dotenv from 'dotenv';

dotenv.config();

async function main() {
    const app = new App();
    await app.listen();
}

main();