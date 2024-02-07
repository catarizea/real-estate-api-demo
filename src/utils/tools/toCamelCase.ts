const toCamelCase = (text: string) =>
  `${text.slice(0, 1).toLowerCase()}${text.slice(1, text.length)}`;

export default toCamelCase;
