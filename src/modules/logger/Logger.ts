import { WinstonModule } from 'nest-winston';
import * as config from '@app/config/config.json';

const winston = require('winston');
const elasticsearch = require('elasticsearch');
const { ElasticsearchTransport } = require('winston-elasticsearch');

const client = new elasticsearch.Client({
    hosts: config.elastic.hosts,
    log: config.logger.log,
});

const esTransportOpts = {
    level: config.logger.log,
    client: client,
    index: config.elastic.index,
};

const addAppNameFormat = winston.format((info: any) => {
    try {
        const data = info.context;
        if(data !== null && data.constructor.name === 'Object') {
            for (const item in data) {
                info[item] = JSON.stringify(data[item]);
            }
        }
    } catch(error) {}

    delete info.context;

    return info;
});


const elasticOptions = new ElasticsearchTransport(esTransportOpts);

export const AppLogger = WinstonModule.createLogger({
    transports: elasticOptions,
    exitOnError: false,
    format: winston.format.combine(
        addAppNameFormat(),
        winston.format.json(),
    ),
});
