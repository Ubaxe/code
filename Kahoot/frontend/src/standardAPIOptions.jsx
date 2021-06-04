function standardAPIOptions(method) {
  const options = {
    method: `${method}`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return options;
}
export default standardAPIOptions;
