export const removeEmpty = (obj: any) => {
  return Object.keys(obj).reduce((accumulator: any, key) => {
    if (obj[key] != null) {
      accumulator[key] = obj[key];
    }

    return accumulator;
  }, {});
};
