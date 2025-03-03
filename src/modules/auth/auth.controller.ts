import { Request, NextFunction, RequestHandler } from "express";
import { CustomRequest, CustomResponse } from "../../types/custom";
import usersService, { UsersService } from "../users/users.service";
import { StatusCodes } from "http-status-codes";
import transformUser from "../users/dtos/user.dto";
import { CreateUserDto } from "../users/dtos/create.user.dto";
import { LoginUserDto } from "./dtos/login.user.dto";
import { compare } from "../../utils/hash";
import jwt from "../../utils/jwt"
import { JwtLoginPayload } from "../../types/jwt.payloads";
import { IUser } from "../users/users.model";

export class AuthController {
    constructor(private readonly users: UsersService) {}

    register = (async (req: Request<{}, {}, CreateUserDto>, res: CustomResponse, next: NextFunction) => {
        const { body: createUserDto } = req;
        const isfound = await this.users.getByEmail(createUserDto.email);
        if(isfound) {
            return res.sendError(
                StatusCodes.CONFLICT,
                {
                    message: "email already in use"
                }
            );
        }

        const user = await this.users.create(createUserDto);
        if(!user) {
            return res.sendError(
                StatusCodes.INTERNAL_SERVER_ERROR,
                {
                    message: "failed to create the user"
                }
            );
        }

        return res.sendSuccess(
            StatusCodes.CREATED,
            {
                user: transformUser(user)
            }
        );
    }) as RequestHandler;


    login = (async (req: Request<{}, {}, LoginUserDto>, res: CustomResponse, next: NextFunction) => {
        const { body: loginUserDto } = req;
        
        const user = await this.users.getByEmail(loginUserDto.email);
        if(!user) {
            return res.sendError(
                StatusCodes.NOT_FOUND,
                {
                    message: "email or password incorrect"
                }
            );
        }

        const hashedPassword = user.password;
        if(!await compare(loginUserDto.password, hashedPassword)) {
            return res.sendError(
                StatusCodes.NOT_FOUND,
                {
                    message: "email or password incorrect"
                }
            );
        }

        const token = jwt.generate(transformUser(user) as JwtLoginPayload);
        return res.sendSuccess(
            StatusCodes.OK,
            {
                token,
                user: transformUser(user)
            }
        );
    }) as RequestHandler;

    fetch = (async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
        const user = req.user as IUser;
        return res.sendSuccess(StatusCodes.OK, {
            user: transformUser(user)
        });
    }) as RequestHandler;
}

const authController = new AuthController(usersService);
export default authController;