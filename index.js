const fs = require('fs');
const readline = require('readline');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    transports: [new winston.transports.Console()],
});

const cli = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function transform(args) {
    if (typeof args !== 'object') {
        return new Error('Invalid type object, expected object');
    }

    return JSON.stringify(args);
}

async function main() {
    const amount = await promptQuestion('Insert the amount of arguments to stringfiy [int]: ');
    logger.info('Amount loaded with success');

    let args = new Object();
    for (let i = 0; i < amount; i++) {
        let userInputHeader = await promptQuestion(`Insert the argument ${i+1} header: `);
        let userInputValue = await promptQuestion(`Insert the argument ${i+1} value: `);
        logger.info('Header and value loaded, inserting into the args...');
        args[userInputHeader] = userInputValue;
    }

    const userInputResult = transform(args);
    fs.writeFileSync(__dirname + '/results.txt', userInputResult);
    logger.info('File results.txt create in the same directory');
    logger.info('Finishing the program...');
    cli.close();
}

function promptQuestion(question, defaultValue = null) {
    return new Promise((resolve) => {
        cli.question(question, (answer) => {
            resolve(answer || defaultValue);
        })
    });
}

main();