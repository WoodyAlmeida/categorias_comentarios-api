import * as Settings from '../settings';
let readln = require('readline');
let cl = readln.createInterface( process.stdin, process.stdout );

async function promptInput (prompt: any)
{
    return new Promise( (res, rej) => {
        cl.question(prompt, (input: any) => {
            res(input);
        });
    });
}

export async function start() {
    let cmd;
    while ( true) {
        try
        {
            cmd = await promptInput('APP > ');
            handleCommand(cmd);
        }
        catch (err)
        {
            Settings.logError(err.message);
            break;
        }
    }

    Settings.logInfo('Command service stopped!');
}

async function handleCommand(command: any){
    switch (command){

        default: {
            //Settings.LOGGER.info('Handling command: ' + command)
            return true;
        }

    }
}
