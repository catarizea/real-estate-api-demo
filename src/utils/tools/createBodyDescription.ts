import { ModelField } from '@/types';

const pluralize = (word: string, arrLength: number): string =>
  arrLength > 1 ? `${word}s` : word;

const createBodyDescription = (field: ModelField): string => {
  let description = '';

  if (field.id.length) {
    description += `For id type ${pluralize('field', field.id.length)} ['${field.id.join("', '")}'] you can use "eq" operator. `;
  }

  if (field.numeric.length) {
    description += `For numeric type ${pluralize('field', field.numeric.length)} ['${field.numeric.join("', '")}'] you can use "eq", "gt", "lt" and "between" operators. `;
  }

  if (field.string.length) {
    description += `For string type ${pluralize('field', field.string.length)} ['${field.string.join("', '")}'] you can use "eq" operator. `;
  }

  if (field.datetime.length) {
    description += `For datetime type ${pluralize('field', field.datetime.length)} ['${field.datetime.join("', '")}'] you can use "gt", "lt" and "between" operators. `;
  }

  if (field.tinyInt.length) {
    description += `For tiny int type ${pluralize('field', field.tinyInt.length)} ['${field.tinyInt.join("', '")}'] you can use "eq" operator. `;
  }

  if (field.dateOnly.length) {
    description += `For date type ${pluralize('field', field.dateOnly.length)} ['${field.dateOnly.join("', '")}'] you can use "gt", "lt" and "between" operators. `;
  }

  if (field.decimal.length) {
    description += `For decimal type ${pluralize('field', field.decimal.length)} ['${field.decimal.join("', '")}'] you can use "eq", "gt", "lt" and "between" operators. `;
  }

  return description.trim();
};

export default createBodyDescription;
