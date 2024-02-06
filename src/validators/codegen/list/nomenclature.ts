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

const modelName = 'Nomenclature';

const fields = {
  id: ['id'],
  numeric: ['order'],
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
    `${modelName.toLowerCase()}List.ts`,
  ),
  rendered,
);
