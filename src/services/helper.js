export const replaceId = (url, id) => {
  const modifiedUrl = url.replace('{id}', id);
  return modifiedUrl;
};
