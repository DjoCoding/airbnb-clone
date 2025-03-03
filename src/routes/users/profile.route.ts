import { Router } from "express";
import validateSchema from "../../middlewares/validate";
import routeProtector from "../../middlewares/protectRoute";
import usersController from "../../modules/users/users.controller";
import { updateUserFieldSchema } from "../../modules/users/users.validation";

const router = Router();

router.patch("/", 
    [
        validateSchema(updateUserFieldSchema),
        routeProtector()
     ],
    usersController.updatePartial
)

export default router;