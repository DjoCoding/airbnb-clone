import { NextFunction, RequestHandler } from "express";
import { CustomRequest, CustomResponse } from "../../types/custom";
import placesService, { PlacesService } from "./places.service";
import { StatusCodes } from "http-status-codes";
import { IUser } from "../users/users.model";
import { CreatePlaceDto } from "./dtos/create.place.dto";
import { UpdatePlaceDto } from "./dtos/update.place.dto";
import { uploader } from "../../config/cloudinary";
import transformPlace, { transformPlaces } from "./dtos/place.dto";

export class PlacesController {
    constructor(private readonly places: PlacesService) {}

    getAll = (async(req: CustomRequest, res: CustomResponse, next: NextFunction) => {
        const places = await this.places.get();
        
        if(!places) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: `failed to fetch places`
            });
        }

        return res.sendSuccess(StatusCodes.OK, {
            places: transformPlaces(places)
        });
    }) as RequestHandler;

    getByID = (async(req: CustomRequest<{ placeID: string }>, res: CustomResponse, next: NextFunction) => {
        const { placeID } = req.params;
        const place = await this.places.getByID(placeID);

        if(!place) {
            return res.sendError(StatusCodes.NOT_FOUND, {
                message: `no place of id ${placeID} found`
            });
        } 

        return res.sendSuccess(StatusCodes.OK, {
            place: transformPlace(place)
        });
    }) as RequestHandler;

    create = (async (req: CustomRequest<{}, {}, CreatePlaceDto>, res: CustomResponse, next: NextFunction) => {
        const { body: createPlaceDto } = req;
        const { title } = createPlaceDto;
        const userID = (req.user as IUser)._id;

        const isFound = await this.places.getByTitleOfUser(userID, title);
        if (isFound) {
            return res.sendError(StatusCodes.CONFLICT, { message: "Title already used" });
        }

        const files = req.files as Express.Multer.File[];
        const pictures = await Promise.all(
            files.map(file => 
                new Promise<string>((resolve, reject) => {
                    uploader.upload_stream(
                        { folder: "uploads" },
                        (err, result) => {
                            if (err) {
                                return reject(err);
                            }
                            if (!result) {
                                return reject(new Error("Failed to upload file"));
                            }
                            resolve(result.secure_url);
                        }
                    ).end(file.buffer);
                })
            )
        );

        const place = await this.places.create(userID, {
            ...createPlaceDto,
            pictures,
        });

        if (!place) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, { message: "Failed to create place" });
        }

        return res.sendSuccess(StatusCodes.CREATED, { place: transformPlace(place) });
    }) as RequestHandler;
    
    

    update = (async(req: CustomRequest<{ id: string }, {}, { updatePlaceDto: UpdatePlaceDto }>, res: CustomResponse, next: NextFunction) => {
        const userID = (req.user as IUser)._id;
        const { updatePlaceDto } = req.body;
        const { id } = req.params;

        const place = await this.places.getByID(id);
        if(!place) {
            return res.sendError(StatusCodes.NOT_FOUND, {
                message: `place ${id} not found`
            });
        }

        if(place.ownerID !== userID) {
            return res.sendError(StatusCodes.UNAUTHORIZED, {
                message: "unauthorized"
            });
        }

        const { title } = updatePlaceDto;
        if(title) {
            const isfound = await this.places.getByTitleOfUser(userID, title);
            if(isfound) {
                return res.sendError(StatusCodes.CONFLICT, {
                    message: `place title ${title} already used by the user ${userID}`
                });
            }
        }

        const newPlace = await this.places.update(id, updatePlaceDto);
        if(!newPlace) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: `failed to update place ${id}`
            });
        }

        return res.sendSuccess(StatusCodes.OK, {
            place: transformPlace(newPlace)
        });
    }) as RequestHandler;

    remove = (async(req: CustomRequest<{ id: string }>, res: CustomResponse, next: NextFunction) => {
        const userID = (req.user as IUser)._id;
        const { id } = req.params;

        const place = await this.places.getByID(id);
        if(!place) {
            return res.sendError(StatusCodes.NOT_FOUND, {
                message: `place ${id} not found`
            });
        }

        if(place.ownerID !== userID) {
            return res.sendError(StatusCodes.UNAUTHORIZED, {
                message: `unauthorized`
            });
        }

        const deletedPlace = await this.places.remove(id);
        if(!deletedPlace) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: `failed to remove place ${id}`
            });
        }

        return res.sendSuccess(StatusCodes.OK, {
            place: transformPlace(deletedPlace)
        })
    }) as RequestHandler;
}


const placesController = new PlacesController(placesService);
export default placesController;