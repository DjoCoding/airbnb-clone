import { StatusCodes } from "http-status-codes";
import { NextFunction, RequestHandler } from "express"
import usersService, { UsersService } from "./users.service";
import placesService, { PlacesService } from "../places/places.service";
import { CustomRequest, CustomResponse } from "../../types/custom";
import transformUser from "./dtos/user.dto";
import { transformPlaces } from "../places/dtos/place.dto";

export class UsersController {
    constructor(
        private readonly users: UsersService,
        private readonly places: PlacesService
    ) {}

    updatePartial = (async (req: CustomRequest<{}, {}, { field: string, value: string }>, res: CustomResponse, next: NextFunction) => {
        if(!req.user) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: "failed to fetch the user"
            });
        }
        
        const { field, value } = req.body;
        const { _id: id } = req.user;

        if(field === "email") {
            const isfound = await this.users.getByEmail(value);
            if(isfound) {
                return res.sendError(StatusCodes.CONFLICT, {
                    message: `email ${value} already in use`
                });
            }
        }
        
        const user = await this.users.update(id, {
            [field]: value
        });
        
        if(!user) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: "failed to update the user"
            });
        }

        return res.sendSuccess(StatusCodes.OK, {
            user: transformUser(user)
        });
    }) as RequestHandler;


    getProfile = (async (req: CustomRequest<{ userID: string }>, res: CustomResponse, next: NextFunction) => {
        const { userID } = req.params;
        const user = await this.users.getById(userID);
        
        if(!user) {
           return res.sendError(StatusCodes.NOT_FOUND, {
                message: `user ${userID} not found`
           });
        }

        return res.sendSuccess(StatusCodes.OK, {
            user: transformUser(user)
        });
    }) as RequestHandler;

    getPlaces = (async (req: CustomRequest<{ userID: string }>, res: CustomResponse, next: NextFunction) =>  {
        const { userID } = req.params;
        const places = await this.places.getOfUser(userID);

        if(!places) {
            return res.sendError(StatusCodes.INTERNAL_SERVER_ERROR, {
                message: `failed to fetch places of user ${userID}`
            });
        }

        return res.sendSuccess(StatusCodes.OK, {
            places: transformPlaces(places)
        });
    }) as RequestHandler;
}

const usersController = new UsersController(usersService, placesService);
export default usersController;