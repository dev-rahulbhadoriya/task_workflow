// userValidation.js

import Joi from 'joi';
import customValidations from './custom.validation.js';

export const userValidation = {
    createUser: {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(customValidations.password),
            name: Joi.string().required(),
            role: Joi.string().required().valid('user', 'admin'),
        }),
    },

    getUsers: {
        query: Joi.object().keys({
            name: Joi.string(),
            role: Joi.string(),
            sortBy: Joi.string(),
            limit: Joi.number().integer(),
            page: Joi.number().integer(),
        }),
    },

    getUser: {
        params: Joi.object().keys({
            userId: Joi.string().custom(customValidations.objectId),
        }),
    },

    updateUser: {
        params: Joi.object().keys({
            userId: Joi.required().custom(customValidations.objectId),
        }),
        body: Joi.object()
            .keys({
                email: Joi.string().email(),
                password: Joi.string().custom(customValidations.password),
                name: Joi.string(),
            })
            .min(1),
    },

    deleteUser: {
        params: Joi.object().keys({
            userId: Joi.string().custom(customValidations.objectId),
        }),
    },
};
