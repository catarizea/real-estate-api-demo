const allFieldsDefined = (
  fields: Record<string, unknown>,
  insertableFields: string[],
) =>
  Object.keys(fields).filter((field) => field in insertableFields).length ===
  insertableFields.length;

export default allFieldsDefined;
