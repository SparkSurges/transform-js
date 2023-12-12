const { transform, promptQuestion, logger, cli, fs } = require('./transform');

async function main() {
    logger.info('Welcome to the Argument Transformer!');
    const amount = await promptQuestion('Insert the amount of arguments to transform [int]: ');

    let args = new Object();
    for (let i = 0; i < amount; i++) {
        let userInputHeader = await promptQuestion(`Insert the argument ${i + 1} header: `);
        let userInputValue = await promptQuestion(`Insert the argument ${i + 1} value: `);
        logger.info('Header and value loaded, inserting into the args...');
        args[userInputHeader] = userInputValue;
    }

    const transformationOption = await promptQuestion(transformations.json.prompt);

    if (transformationOption === 'decrypt') {
        const fileName = await promptQuestion('Insert the name of the file to decrypt (default: results.txt): ', 'results.txt');
        const fileContent = fs.readFileSync(__dirname + '/' + fileName, 'utf8');
        const secretKey = await promptQuestion(transformations.decrypt.prompt);
        try {
            const decryptedResult = await transform(fileContent, transformationOption, secretKey);
            logger.info(`Decrypted result: ${decryptedResult}`);
        } catch (error) {
            logger.error(`Error during transformation: ${error.message}`);
        } finally {
            logger.info('Finishing the program...');
            cli.close();
        }
    } else {
        const secretKey = transformationOption === 'encrypt' ? await promptQuestion(transformations.encrypt.prompt) : null;
        try {
            const userInputResult = await transform(args, transformationOption, secretKey);
            fs.writeFileSync(__dirname + '/results.txt', userInputResult);
            logger.info('File results.txt created in the same directory');
        } catch (error) {
            logger.error(`Error during transformation: ${error.message}`);
        } finally {
            logger.info('Finishing the program...');
            cli.close();
        }
    }
}

main();