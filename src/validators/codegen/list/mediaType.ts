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

const modelName = 'MediaType';

export const fields = {
  id: ['id'],
  numeric: [],
  string: ['name'],
  datetime: ['createdAt', 'updatedAt'],
  tinyInt: [],
  dateOnly: [],
  decimal: [],
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
