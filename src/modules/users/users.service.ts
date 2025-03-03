import mongoose from "mongoose";

import { IUser } from "./users.model"
import User from "./users.model";

import { CreateUserDto } from "./dtos/create.user.dto";
import { UpdateUserDto } from "./dtos/update.user.dto";

export class UsersService {
    constructor(private readonly users: mongoose.Model<IUser>) {}

    get = async () => {
        return await this.users.find();
    }

    getById = async (id: string) => {
        return await this.users.findById(id);
    }

    getByEmail = async (email: string) => {
        return await this.users.findOne({
            email
        });
    }

    create = async (createUserDto: CreateUserDto) => {
        const user = new User({
            ...createUserDto
        });

        return await user.save();
    }

    update = async (id: string, updateUserDto: UpdateUserDto) => {
        return await this.users.findByIdAndUpdate(
            id, 
            updateUserDto,
            {
                new: true
            }
        );
    }

    remove = async (id: string) => {
        return await this.users.findByIdAndDelete(id);
    }
}

const usersService = new UsersService(User);
export default usersService;