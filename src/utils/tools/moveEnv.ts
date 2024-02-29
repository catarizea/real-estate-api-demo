/* eslint-disable no-console */
import { Command } from 'commander';
import logSymbols from 'log-symbols';
import { moveFile } from 'move-file';
import path from 'path';

const r = process.cwd();
const files = ['.env.dev'];

const program = new Command();

const allowedDirection = ['up', 'down'];

const actionHandler = async (direction: string) => {
  if (allowedDirection.indexOf(direction) === -1) {
    console.error(`${logSymbols.error} invalid direction`);
    process.exit(1);
  }

  if (direction === 'up') {
    try {
      files.forEach(async (f) => {
        await moveFile(path.join(r, f), path.join(r, 'tmp', f));
      });

      console.log(`${logSymbols.success} files moved up`);
    } catch (error) {
      console.error(`${logSymbols.error} cannot move up files`, error);
    }
  }

  if (direction === 'down') {
    try {
      files.forEach(async (f) => {
        await moveFile(path.join(r, 'tmp', f), path.join(r, f));
      });

      console.log(`${logSymbols.success} files moved down`);
    } catch (error) {
      console.error(`${logSymbols.error} cannot move down files`, error);
    }
  }
};

program
  .name('move-env')
  .description('CLI to move env files before and after image build')
  .version('0.0.1');

program
  .command('move')
  .description('Move env files')
  .argument('<direction>', 'direction to move the files')
  .action(actionHandler);

program.parse();
