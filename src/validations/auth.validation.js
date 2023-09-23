import Joi from 'joi';
import customValidations from './custom.validation.js';

export const authValidation = {
    register: {
        body: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(customValidations.password),
            name: Joi.string().required(),
        }),
    },
    login: {
        body: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required(),
        }),
    },
    logout: {
        body: Joi.object().keys({
            refreshToken: Joi.string().required(),
        }),
    },
    refreshTokens: {
        body: Joi.object().keys({
            refreshToken: Joi.string().required(),
        }),
    },
    forgotPassword: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
        }),
    },
    resetPassword: {
        query: Joi.object().keys({
            token: Joi.string().required(),
        }),
        body: Joi.object().keys({
            password: Joi.string().required().custom(customValidations.password),
        }),
    },
};

export default authValidation;
