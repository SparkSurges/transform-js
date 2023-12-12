const fs = require('fs');
const readline = require('readline');
const winston = require('winston');
const crypto = require('crypto');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    transports: [new winston.transports.Console()],
});

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const transformations = {
    json: {
        transform: (args) => JSON.stringify(args),
        prompt: 'Choose transformation option [json/base64/encrypt/decrypt]: ',
    },
    base64: {
        transform: (args) => Buffer.from(JSON.stringify(args)).toString('base64'),
        prompt: 'Choose transformation option [json/base64/encrypt/decrypt]: ',
    },
    encrypt: {
        transform: (args, key) => {
            const cipher = crypto.createCipher('aes-256-cbc', key);
            let encrypted = cipher.update(JSON.stringify(args), 'utf8', 'hex');
            encrypted += cipher.final('hex');
            return encrypted;
        },
        prompt: 'Insert the secret key for encryption: ',
    },
    decrypt: {
        transform: (args, key) => {
            const decipher = crypto.createDecipher('aes-256-cbc', key);
            try {
                let decrypted = decipher.update(args, 'hex', 'utf8');
                decrypted += decipher.final('utf8');
                return decrypted;
            } catch (error) {
                throw new Error('Decryption failed. Invalid key or data.');
            }
        },
        prompt: 'Insert the secret key for decryption: ',
    },
};

async function transform(args, option, key) {
    if (!args) {
        return Promise.reject(new Error('Invalid type object, expected object'));
    }

    if (transformations[option]) {
        return transformations[option].transform(args, key);
    } else {
        return Promise.reject(new Error('Invalid transformation option'));
    }
}

async function promptQuestion(question, defaultValue = null) {
    return new Promise((resolve) => {
        cli.question(question, (answer) => {
            resolve(answer || defaultValue);
        });
    });
}

module.exports = {
    transform,
    promptQuestion,
    logger,
    cli,
    fs,
};