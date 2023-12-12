import pino from 'pino';
const fileTransport = pino.transport({
    target: 'pino/file',
    options: { destination: "./logs/info.log" },
  });
  
const environment = process.env.NODE_ENV! || "test";
export const envToLogger = {
development: {
    transport: {
    target: 'pino-pretty',
    options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
    },
    },
    fileTransport
},
production: true,
test: false,
};

export const logger = pino(
    //@ts-ignore
    envToLogger[environment] ?? true
);