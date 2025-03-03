import { IUser } from "../users.model";

export interface UserDto {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    createdAt: Date;
}

export default function transformUser(user: IUser) {
    return {
        id: user._id as string,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        createdAt: user.createdAt
    } as UserDto;
}

export function transformUsers(users: IUser[]) {
    return users.map(user => transformUser(user));
}