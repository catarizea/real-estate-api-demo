/* eslint-disable no-console */
import { Command } from 'commander';
import ejs from 'ejs';
import logSymbols from 'log-symbols';
import path from 'path';

import { toCamelCase, toPascalCase } from '@/utils';

import modelFields from './list/modelfields';

const program = new Command();

const file = Bun.file(
  path.join(
    process.cwd(),
    'src',
    'validators',
    'codegen',
    'list',
    'template.ejs',
  ),
);

const template = await file.text();

const allowedModels = Object.keys(modelFields);

const actionHandler = async (model: string) => {
  if (!allowedModels.includes(model)) {
    console.error(`${logSymbols.error} error: invalid model`);
    process.exit(1);
  }

  const fields = modelFields[model];
  const modelName = toPascalCase(model);

  const rendered = ejs.render(template, { modelName, fields });

  await Bun.write(
    path.join(
      process.cwd(),
      'src',
      'validators',
      `${toCamelCase(modelName)}List.ts`,
    ),
    rendered,
  );

  console.log(
    `${logSymbols.success} success: zod validators file generated for ${modelName}`,
  );

  process.exit(0);
};

program
  .name('validator-codegen')
  .description('CLI to generate zod validators from a list of fields')
  .version('0.0.1');

program
  .command('generate')
  .description('Choose a model to generate a validator for')
  .argument('<model>', 'drizzle model name')
  .action(actionHandler);

program.parse();
