import { RequestHandler, Router } from "express";
import routeProtector from "../middlewares/protectRoute";
import validateSchema from "../middlewares/validate";
import asyncHandler from "../utils/asyncHandler";
import placesController from "../modules/places/places.controller";
import { createPlaceSchema, updatePlaceSchema } from "../modules/places/places.validation";
import fileUploadHandler from "../middlewares/uploader";

const router = Router();

const logRequestBody: RequestHandler = (req, res, next) => {
    const { body } = req;

    console.log(body);

    res.sendStatus(200);
}

router.get("/", 
    asyncHandler(placesController.getAll)
);

router.get("/:id", 
    asyncHandler(placesController.getByID)
);

router.post("/",
    [
        fileUploadHandler,
        // logRequestBody,
        validateSchema(createPlaceSchema),
        routeProtector()
    ],
    asyncHandler(placesController.create)
);

router.put("/:id",
    [
        validateSchema(updatePlaceSchema),
        routeProtector()
    ], 
    asyncHandler(placesController.update)
);

router.delete("/:id",
    [
        routeProtector()
    ],
    asyncHandler(placesController.remove)
);

export default router;