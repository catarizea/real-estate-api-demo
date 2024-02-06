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

const modelName = 'Parking';

const fields = {
  id: ['id', 'propertyId'],
  numeric: ['order', 'fee'],
  string: ['name', 'feeInterval'],
  datetime: ['createdAt', 'updatedAt'],
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
