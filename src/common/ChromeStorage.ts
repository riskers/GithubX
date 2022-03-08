// https://github.com/myungjaeyu/chrome-storage/blob/master/README.md

/* eslint-disable */
class ChromeStorage {
  STORAGE_TYPE: string;

  constructor(storageType = 'local') {
    if (!chrome.storage) throw 'invalid chrome.storage';

    this.STORAGE_TYPE = storageType;
  }

  _get(...args) {
    chrome.storage[this.STORAGE_TYPE].get(...args);
  }

  _set(...args) {
    chrome.storage[this.STORAGE_TYPE].set(...args);
  }

  _remove(...args) {
    chrome.storage[this.STORAGE_TYPE].remove(...args);
  }

  clear() {
    return new Promise((resolve) => chrome.storage[this.STORAGE_TYPE].clear(resolve));
  }

  headKey(keys) {
    return keys[0];
  }

  is_nestedKey(keys) {
    return keys.length > 1;
  }

  parser(queries) {
    return queries.split(/\//g);
  }

  refer(obj, keys) {
    return keys.reduce(
      (acc, cur, i) => {
        keys.length - 1 !== i &&
          (acc.temp = acc.temp[cur] = typeof acc.temp[cur] !== 'object' ? {} : acc.temp[cur] || {});

        return acc;
      },
      {
        key: keys.slice(-1)[0],
        temp: (obj = typeof obj === 'object' ? obj : {}),
        obj,
      },
    );
  }

  async deliver(key) {
    let keys = this.parser(key),
      head = this.headKey(keys),
      data = await this.get(head);

    keys = keys.slice(1);

    return {
      keys,
      data,
      set: (data) => new Promise((resolve) => this._set({ [head]: data }, resolve)),
      handleRefer: (callback) => {
        let { obj, temp, key } = this.refer(data, keys);
        callback(temp, key);
        return obj;
      },
    };
  }

  getAll() {
    return new Promise((resolve) => this._get(resolve));
  }

  get(key) {
    if (typeof key !== 'string' || !key) throw 'invalid key';

    const keys = this.parser(key);

    return new Promise((resolve) =>
      this._get(this.headKey(keys), (e) =>
        resolve(this.is_nestedKey(keys) ? keys.reduce((acc, cur) => acc[cur], e) : e[key]),
      ),
    );
  }

  async set(key, value) {
    if (typeof key !== 'string' || !key) throw 'invalid key';

    const { keys, set, handleRefer } = await this.deliver(key);

    await set(!keys.length ? value : handleRefer((temp, key) => (temp[key] = value)));
  }

  async push(key, value) {
    if (typeof key !== 'string' || !key) throw 'invalid key';

    let { data, keys, set, handleRefer } = await this.deliver(key),
      verify = (data) => {
        if (data === 0 || (data && !Array.isArray(data)))
          throw `must be an array type. (key data: ${JSON.stringify(data)})`;
        if (!data) return false;
        if (Array.isArray(data)) return true;
      };

    !keys.length
      ? verify(data)
        ? (data as any).push(value)
        : ((data = []), (data as any).push(value))
      : (data = handleRefer((temp, key) =>
          verify(temp[key]) ? temp[key].push(value) : ((temp[key] = []), temp[key].push(value)),
        ));

    await set(data);
  }

  remove(key) {
    return new Promise((resolve) => {
      if (typeof key !== 'string' || !key) throw 'invalid key';

      this.deliver(key).then(({ keys, set, handleRefer }) =>
        !keys.length ? this._remove(key, resolve) : set(handleRefer((temp, key) => delete temp[key])).then(resolve),
      );
    });
  }
}

export default ChromeStorage;
