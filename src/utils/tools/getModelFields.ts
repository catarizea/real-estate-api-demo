import { getTableColumns } from 'drizzle-orm';

import { CommonModel } from '@/types';

type Column = {
  name: string;
  notNull: boolean;
  dataType: string;
  columnType: string;
};

type Fields = {
  required: string[];
  optional: string[];
  fields: {
    id: string[];
    numeric: string[];
    string: string[];
    datetime: string[];
    tinyInt: string[];
    dateOnly: string[];
    decimal: string[];
  };
};

const getModelFields = (model: CommonModel): Fields => {
  const fields: Fields = {
    required: [],
    optional: [],
    fields: {
      id: [],
      numeric: [],
      string: [],
      datetime: [],
      tinyInt: [],
      dateOnly: [],
      decimal: [],
    },
  };

  const columns: { [key: string]: Column } = getTableColumns(model);

  Object.keys(columns).forEach((key) => {
    if (
      typeof columns[key].name === 'undefined' ||
      typeof columns[key].dataType === 'undefined' ||
      typeof columns[key].columnType === 'undefined' ||
      typeof columns[key].notNull === 'undefined'
    ) {
      return;
    }

    if (columns[key].notNull === true) {
      fields.required.push(key);
    }

    if (columns[key].notNull === false) {
      fields.optional.push(key);
    }

    if (key.toLowerCase().includes('id')) {
      fields.fields.id.push(key);
    }

    if (columns[key].columnType === 'MySqlTimestamp') {
      fields.fields.datetime.push(key);
    }

    if (columns[key].columnType === 'MySqlInt') {
      fields.fields.numeric.push(key);
    }

    if (
      columns[key].columnType === 'MySqlVarChar' &&
      !key.toLowerCase().includes('id')
    ) {
      fields.fields.string.push(key);
    }

    if (columns[key].columnType === 'MySqlBoolean') {
      fields.fields.tinyInt.push(key);
    }

    if (columns[key].columnType === 'MySqlDecimal') {
      fields.fields.decimal.push(key);
    }

    if (columns[key].columnType === 'MySqlDate') {
      fields.fields.dateOnly.push(key);
    }
  });

  return fields;
};

export default getModelFields;
