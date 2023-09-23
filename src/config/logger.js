import winston, { format } from 'winston';
import config from './config';

const { combine, colorize, uncolorize, splat, printf } = format;

const enumerateErrorFormat = format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: combine(
        enumerateErrorFormat(),
        config.env === 'development' ? colorize() : uncolorize(),
        splat(),
        printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
});

export default logger;
