/**
 * Making a template makes sure that we do computation only once so that we can query in o(1) time
 * @param intialkey This is the previos key that is passed by parent and has to be appended
 * @param prevObj This is previous result object
 * @param obj This is the object need for traversal
 * @returns An Object with the all the keys flattended
 */

const makeTemplate = (
  intialkey: string,
  prevObj: Record<string, any>,
  obj: Record<string, any>
): Record<string, any> => {
  let temp = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = intialkey.length ? `${intialkey}.${key}` : key;
    let _obj = { [newKey]: value };
    if (typeof value === 'object') {
      _obj = makeTemplate(newKey, temp, value);
    }
    temp = { ...temp, ..._obj };
  }
  return { ...prevObj, ...temp };
};

export function solve(text: string, _1: number, queries: string[]) {
  // Your implementation goes here
  const template = makeTemplate('', {}, JSON.parse(text));
  return queries.reduce((res, curr) => {
    return `${res.length ? `${res},` : ''}${template[curr]}`;
  }, '');
}
