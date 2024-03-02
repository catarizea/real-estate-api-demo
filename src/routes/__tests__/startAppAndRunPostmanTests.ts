/* eslint-disable no-console */
import { sleep } from 'bun';
import logSymbols from 'log-symbols';

let honoPid: number | null = null;
let isSuccessful = true;

const procServer =
  typeof process.env.CICD === 'undefined'
    ? Bun.spawn(['bun', 'run', 'start:postman:test'])
    : Bun.spawn(['bun', 'run', 'start:actions']);

const procPostman =
  typeof process.env.CICD === 'undefined'
    ? Bun.spawn(['bun', 'run', 'postman:test:suite'])
    : Bun.spawn(['bun', 'run', 'postman:test:utils:actions']);

const killChildren = async () => {
  if (honoPid) {
    process.kill(honoPid);
  }

  procPostman.kill();
  await procPostman.exited;

  procServer.kill();
  await procServer.exited;

  console.log(logSymbols.success, 'All children processes have been killed');
};

process.on('SIGINT', async () => {
  console.log(
    `\n${logSymbols.info} Ctrl-C was pressed. Killing children processes...`,
  );
  await killChildren();
  process.exit(0);
});

const streamServer = new WritableStream({
  write: async (chunk) => {
    const str = new TextDecoder().decode(chunk);
    if (str.indexOf('hono pid: ') !== -1) {
      honoPid = parseInt(str.split('hono pid: ')[1], 10);
    }
  },
});

const streamPostman = new WritableStream({
  write: async (chunk) => {
    const str = new TextDecoder().decode(chunk);
    console.log(str);

    if (str.indexOf('failure') !== -1) {
      isSuccessful = false;
    }

    if (
      str.indexOf('You can view the run data in Postman at: https://') !== -1
    ) {
      await sleep(1000);
      await killChildren();

      if (isSuccessful) {
        console.log(logSymbols.success, 'Postman tests have passed');
        process.exit(0);
      } else {
        console.log(logSymbols.error, 'Postman tests have failed');
        process.exit(1);
      }
    }
  },
});

procServer.stdout.pipeTo(streamServer);
procPostman.stdout.pipeTo(streamPostman);
