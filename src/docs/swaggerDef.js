import config from '../config/config.js';

const swaggerDef = {
    openapi: '3.0.0',
    info: {
        title: 'task Node API documentation',
        license: {
            name: 'MIT',
            url: '',
        },
    },
    servers: [
        {
            url: `http://localhost:${config.port}/v1`,
        },
    ],
};

export default swaggerDef;
