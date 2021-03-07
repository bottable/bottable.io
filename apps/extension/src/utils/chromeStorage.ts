export const setChromeValue = (object: any, callback?: () => void) => {
  chrome.storage.sync.set(object, callback);
};

export const getChromeValues = async (keys: string[]) => {
  return new Promise<{ [key: string]: string }>((resolve, reject) => {
    chrome.storage.sync.get(keys, (value) => {
      if (value) resolve(value);
      else reject();
    });
  });
};
