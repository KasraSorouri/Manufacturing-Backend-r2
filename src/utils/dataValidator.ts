export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export const stringLengthCheck = (text: string, length: number, subject: string) => {
  if (text.length < length) {
    throw new Error(`${subject} is too short, minimum length is ${length}.`);
  }
  return true;
};
