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

const modelName = 'Unit';

export const fields = {
  id: ['id', 'propertyId', 'floorPlanId', 'bedroomId', 'bathroomId'],
  numeric: ['rent', 'order', 'deposit', 'surface'],
  string: ['name', 'unitNumber', 'unitName'],
  dateOnly: ['availableDate'],
  datetime: ['createdAt', 'updatedAt'],
  tinyInt: [
    'available',
    'immediate',
    'shortterm',
    'longterm',
    'furnished',
    'heat',
    'water',
    'electricity',
    'internet',
    'television',
    'published',
  ],
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
