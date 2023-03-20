import { createApp } from './src/utils/createApp';
import dotenv from 'dotenv';
import "./src/database"

dotenv.config();

const PORT = process.env.PORT;

async function main() {
    try {
        const app = createApp();
        app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
    } catch (error) {
        console.log(error)
    }
};

main(); 