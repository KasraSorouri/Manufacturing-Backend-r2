const info = (...params: (string | object)[]): void => {
  if (process.env.NODE_ENV !== 'test1') {
    params.forEach((param) => {
      if (typeof param === 'string') {
        console.log(param);
      } else if (typeof param === 'object') {
        console.log(JSON.stringify(param, null, 2));
      }
    });
  }
};

export default {
  info, 
};