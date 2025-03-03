import { CreateUserDto } from "./dtos/create.user.dto"
import { UpdateUserDto } from "./dtos/update.user.dto";
import Joi from "joi"

interface IUpdateUserField {
    field: string;
    value: string;
}

export const createUserSchema = Joi.object<CreateUserDto>({
    firstname: Joi.string().min(3).max(20).required().messages({
        "string.min": "firstname min length is 3",
        "string.max": "firstname max length is 20",
        "any.required": "firstname is required"
    }),
    lastname: Joi.string().min(3).max(20).required().messages({
        "string.min": "lastname min length is 3",
        "string.max": "lastname max length is 20",
        "any.required": "lastname is required"
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format, please enter a valid email",
        "any.required": "firstname is required"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "password min length is 8",
        "any.required": "password is required"
    })
});

export const updateUserSchema = Joi.object<UpdateUserDto>({
    firstname: Joi.string().min(3).max(20).messages({
        "string.min": "firstname min length is 3",
        "string.max": "firstname max length is 20"
    }),
    lastname: Joi.string().min(3).max(20).messages({
        "string.min": "lastname min length is 3",
        "string.max": "lastname max length is 20"
    }),
    email: Joi.string().email().messages({
        "string.email": "Invalid email format, please enter a valid email"
    }),
    password: Joi.string().min(8).messages({
        "string.min": "password min length is 8"
    })
});

export const updateUserFieldSchema = Joi.object<IUpdateUserField>({
    field: Joi.string().valid("firstname", "lastname", "email").required(),
    value: Joi.string().custom((value, helpers) => {
        const field = helpers.state.ancestors[0].field;

        switch(field) {
            case "email":
                {
                    const error = Joi.string().email().messages({
                        "string.email": "Invalid email"
                    }).validate(value).error;
                
                    if(!error) { return value; }
    
                    return helpers.error(
                        "any.invalid",
                        {
                            message: error.message
                        }
                    );
                }
            case "firstname":
            case "lastname":
                {
                    const error = Joi.string().min(3).max(20).validate(value).error;
                    if(!error) { return value; }

                    return helpers.error(
                        "any.invalid",
                        {
                            message: `invalid value of field ${field}`
                        }
                    )
                }
        }
    }).required()
})

