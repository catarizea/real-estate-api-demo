/* eslint-disable no-console */
import { sleep } from 'bun';
import { describe, expect, test } from 'bun:test';
import logSymbols from 'log-symbols';

import executeApiCalls from './executeApiCalls';

let honoPid: number | null = null;
const logs: string[] = [];

const proc = Bun.spawn(['bun', 'run', 'start:algolia:test']);

const killChildren = async () => {
  console.log(logs);

  if (honoPid) {
    process.kill(honoPid);
  }

  proc.kill();
  await proc.exited;

  console.log(logSymbols.success, 'All children have been killed');
};

process.on('SIGINT', async () => {
  console.log(`\n${logSymbols.info} Ctrl-C was pressed. Killing children...`);
  await killChildren();
  process.exit(0);
});

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

describe('testing algolia workers', async () => {
  await sleep(10000);

  await executeApiCalls();

  await sleep(10000);

  test('test 1', async () => {});

  test('test 2', async () => {});

  test('clean up', async () => {
    await killChildren();
  }, 60000);
});
