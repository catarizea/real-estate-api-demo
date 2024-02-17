const isValidJson = (str: string): boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

export default isValidJson;
