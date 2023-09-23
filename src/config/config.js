import { config } from 'dotenv';
import { join } from 'path';
import { object, string, number } from 'joi';

config({ path: join(__dirname, '../../.env') });

const envVarsSchema = object()
    .keys({
        NODE_ENV: string().valid('production', 'development', 'test').required(),
        PORT: number().default(3000),
        MONGODB_URI: string().required().description('MongoDB connection URI'), // Change to MongoDB URI
        JWT_SECRET: string().required().description('JWT secret key'),
        JWT_ACCESS_EXPIRATION_MINUTES: number().default(30).description('minutes after which access tokens expire'),
        JWT_REFRESH_EXPIRATION_DAYS: number().default(30).description('days after which refresh tokens expire'),
        JWT_RESET_PASSWORD_EXPIRATION_MINUTES: number()
            .default(10)
            .description('minutes after which reset password token expires'),
        JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: number()
            .default(10)
            .description('minutes after which verify email token expires'),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const env = envVars.NODE_ENV;
export const port = envVars.PORT;
export const mongodb = {
    uri: envVars.MONGODB_URI,
};
export const jwt = {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
};
