import { Router } from "express"

import authRouter from "./auth.route"
import usersRouter from "./users.route"
import placesRouter from "./places.route"

export default function routes() {
    const router = Router();
    
    // register auth router
    router.use("/auth", authRouter);

    // register place router 
    router.use("/places", placesRouter);


    // register user router 
    router.use("/users", usersRouter);

    return router;
}
