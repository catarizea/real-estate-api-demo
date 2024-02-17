const atLeastOneFieldDefined = (
  fields: Record<string, unknown>,
  updatableFields: string[],
) => updatableFields.some((field) => field in fields);

export default atLeastOneFieldDefined;
