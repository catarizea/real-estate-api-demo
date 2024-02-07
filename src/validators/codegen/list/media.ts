import ejs from 'ejs';
import path from 'path';

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

const modelName = 'Media';

export const fields = {
  id: ['id', 'propertyId'],
  numeric: ['order'],
  string: ['assetId'],
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
    `${modelName.toLowerCase()}List.ts`,
  ),
  rendered,
);
