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

const modelName = 'Property';

export const fields = {
  id: ['id', 'typeId', 'communityId', 'cityId'],
  numeric: ['listingId', 'yearBuilt', 'petsFee', 'customerRanking'],
  string: ['name', 'address', 'petsFeeInterval'],
  datetime: ['createdAt', 'updatedAt'],
  tinyInt: [
    'smoking',
    'cats',
    'dogs',
    'petsNegotiable',
    'published',
    'paidSearchRanking',
  ],
  dateOnly: [],
  decimal: ['latitude', 'longitude'],
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
