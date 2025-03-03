import { config } from "dotenv"
import app from "./app"
import connectDB from "./db/connect"

config();

const PORT = (process.env.PORT || "3000") as string;

function main() {
    connectDB()
    .then(() => {
        console.log(`Database connected`);
        app.listen(PORT, () => {
            console.log(`Application running on PORT ${PORT}`);
        });
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
}

main();