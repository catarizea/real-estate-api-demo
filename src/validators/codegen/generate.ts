/* eslint-disable no-console */
import { Command } from 'commander';
import ejs from 'ejs';
import logSymbols from 'log-symbols';
import path from 'path';

import {
  bathroom,
  city,
  community,
  floorPlan,
  media,
  mediaType,
  parking,
  property,
  region,
  unit,
} from '@/models/schema';
import { getModelFields, toCamelCase, toPascalCase } from '@/utils';

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

const allowedModels: {
  [key: string]:
    | typeof city
    | typeof community
    | typeof floorPlan
    | typeof media
    | typeof mediaType
    | typeof bathroom
    | typeof parking
    | typeof property
    | typeof region
    | typeof unit;
} = {
  city,
  community,
  floorPlan,
  media,
  mediaType,
  nomenclator: bathroom,
  parking,
  property,
  region,
  unit,
};

const actionHandler = async (model: string) => {
  if (!Object.keys(allowedModels).includes(model)) {
    console.error(`${logSymbols.error} error: invalid model`);
    process.exit(1);
  }

  const { fields } = getModelFields(allowedModels[model]);

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
