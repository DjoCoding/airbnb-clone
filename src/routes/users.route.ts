import { Router } from "express"
import asyncHandler from "../utils/asyncHandler";
import usersController from "../modules/users/users.controller";
import profileRouter from "./users/profile.route"

const router = Router();

router.get("/:userID/places",
    asyncHandler(usersController.getPlaces)
);

router.get("/:userID/profile",
    asyncHandler(usersController.getProfile)
);

router.use("/profile", profileRouter);

export default router;