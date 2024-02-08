const toPascalCase = (text: string) =>
  `${text.slice(0, 1).toUpperCase()}${text.slice(1, text.length)}`;

export default toPascalCase;
