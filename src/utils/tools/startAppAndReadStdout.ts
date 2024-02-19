/* eslint-disable no-console */
import { sleep } from 'bun';
import { expect, test } from 'bun:test';
import logSymbols from 'log-symbols';

let honoPid: number | null = null;
const logs: string[] = [];

process.on('SIGINT', async () => {
  console.log(`\n${logSymbols.info} Ctrl-C was pressed. Killing children...`);
  await killChildren();
  process.exit();
});

const proc = Bun.spawn(['bun', 'run', 'start:postman:test']);

const killChildren = async () => {
  console.log(logs);

  if (honoPid) {
    process.kill(honoPid);
  }

  proc.kill();
  await proc.exited;

  console.log(logSymbols.success, 'All children have been killed');
};

const stream = new WritableStream({
  write: async (chunk) => {
    const str = new TextDecoder().decode(chunk);
    if (str.indexOf('hono pid: ') !== -1) {
      honoPid = parseInt(str.split('hono pid: ')[1], 10);
    } else {
      logs.push(str);
    }
  },
});

proc.stdout.pipeTo(stream);

test('startAppAndReadStdout', async () => {
  await sleep(10000);
  await killChildren();
}, 15000);
