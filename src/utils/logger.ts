const info = (message: string): void => {
  if (process.env.NODE_ENV !== 'test1') { // eslint-disable-next-line no-console
    console.log(message);
  }
};

export default {
  info, 
};