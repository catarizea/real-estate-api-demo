/* eslint-disable no-console */
import { sleep } from 'bun';
import { describe, expect, test } from 'bun:test';
import logSymbols from 'log-symbols';

import executeApiCalls from './executeApiCalls';

let honoPid: number | null = null;
const logs: string[] = [];

const proc = Bun.spawn(['bun', 'run', 'start:algolia:test']);

const killChildren = async () => {
  if (honoPid) {
    process.kill(honoPid);
  }

  proc.kill();
  await proc.exited;

  console.log(logSymbols.success, 'All children processes have been killed');
};

process.on('SIGINT', async () => {
  console.log(
    `\n${logSymbols.info} Ctrl-C was pressed. Killing children processes...`,
  );
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
  await sleep(2000);

  await executeApiCalls();

  test('success task property.create', () => {
    const tasksPropertyCreate = logs.filter(
      (log) =>
        log.indexOf(
          '[TASK] success finished task property.create created 1 index objects',
        ) !== -1,
    );
    expect(tasksPropertyCreate.length).toBe(1);
  });

  test('success task property.delete', () => {
    const tasksPropertyDelete = logs.filter(
      (log) =>
        log.indexOf(
          '[TASK] success finished task property.delete deleted 1 index objects',
        ) !== -1,
    );
    expect(tasksPropertyDelete.length).toBe(1);
  });

  test('success task media.update', () => {
    const tasksMediaUpdate = logs.filter(
      (log) =>
        log.indexOf(
          '[TASK] success finished task media.update updated 1 index objects',
        ) !== -1,
    );
    expect(tasksMediaUpdate.length).toBe(1);
  });

  test('success task feature.update', () => {
    const tasksFeatureUpdate = logs.filter(
      (log) =>
        log.indexOf(
          '[TASK] success finished task feature.update updated 1 index objects',
        ) !== -1,
    );
    expect(tasksFeatureUpdate.length).toBe(1);
  });

  test('success task unit.create', () => {
    const tasksUnitCreate = logs.filter(
      (log) =>
        log.indexOf(
          '[TASK] success finished task unit.create created 1 index objects',
        ) !== -1,
    );
    expect(tasksUnitCreate.length).toBe(2);
  });

  test('success task unit.delete', () => {
    const tasksUnitDelete = logs.filter(
      (log) =>
        log.indexOf(
          '[TASK] success finished task unit.delete deleted 1 index objects',
        ) !== -1,
    );
    expect(tasksUnitDelete.length).toBe(2);
  });

  test('success task parking.update', () => {
    const tasksParkingUpdate = logs.filter(
      (log) =>
        log.indexOf(
          '[TASK] success finished task parking.update updated 1 index objects',
        ) !== -1,
    );
    expect(tasksParkingUpdate.length).toBe(2);
  });

  await sleep(2000);

  await killChildren();
});
