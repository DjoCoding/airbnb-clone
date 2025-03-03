import { Router } from "express"
import validateSchema from "../middlewares/validate";
import routeProtector from "../middlewares/protectRoute";
import authController from "../modules/auth/auth.controller";
import { createUserSchema } from "../modules/users/users.validation";
import { loginUserSchema } from "../modules/auth/auth.validation";


const router = Router();

router.post("/register", 
    [ validateSchema(createUserSchema) ],
    authController.register
);

router.post("/login", 
    [ validateSchema(loginUserSchema) ],
    authController.login
);

router.get("/fetch",
    [ routeProtector() ],
    authController.fetch
);

export default router;