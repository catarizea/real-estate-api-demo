const getCodeDescriptionPath = (
  message: string,
): { code: string; description: string; path: string } | null => {
  const result = message.match(new RegExp(/code\ =\ (.*?)_unique'/gim));

  if (
    !result ||
    result.length === 0 ||
    result[0].indexOf('code =') === -1 ||
    result[0].indexOf(' desc = ') === -1
  ) {
    return null;
  }

  const descParts = result[0].split(' desc = ');
  const pathResult = descParts[1].match(new RegExp(/\.(.*?)_unique/gim));
  const path =
    pathResult && pathResult.length ? pathResult[0].slice(1) : 'unknown';

  return {
    code: descParts[0]
      .split('code = ')[1]
      .replace(/((?<=[a-z])[A-Z]|[A-Z](?=[a-z]))/g, ' $1')
      .trim()
      .toLowerCase(),
    description: `${descParts[1].slice(0, 1).toLowerCase()}${descParts[1].slice(1)}`,
    path,
  };
};

export default getCodeDescriptionPath;
