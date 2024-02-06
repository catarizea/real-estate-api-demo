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

const modelName = 'Community';

export const fields = {
  id: ['id', 'cityId'],
  numeric: [
    'score',
    'population',
    'dwellings',
    'averageIncome',
    'elevation',
    'established',
  ],
  string: ['name', 'imageUrl', 'quadrant', 'sector', 'ward'],
  dateOnly: [],
  datetime: ['createdAt', 'updatedAt'],
  tinyInt: [],
  decimal: [
    'latitude',
    'longitude',
    'area',
    'usedForRenting',
    'density',
    'lowIncome',
    'immigrants',
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
