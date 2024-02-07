import ejs from 'ejs';
import path from 'path';

import { toCamelCase } from '@/utils';

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

const modelName = 'City';

export const fields = {
  id: ['id', 'regionId'],
  numeric: [],
  string: ['name'],
  datetime: ['createdAt', 'updatedAt'],
  tinyInt: [],
  dateOnly: [],
  decimal: ['latitude', 'longitude'],
};

const rendered = ejs.render(template, { modelName, fields });

Bun.write(
  path.join(
    process.cwd(),
    'src',
    'validators',
    `${toCamelCase(modelName)}List.ts`,
  ),
  rendered,
);
