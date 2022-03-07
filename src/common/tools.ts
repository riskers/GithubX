import ChromeStorage from '@/common/storage';

const CHROME_STORAGE_KEY = 'USERNAME';

export const setUsername = async (username: string): Promise<void> => {
  const cs = new ChromeStorage();
  await cs.set(CHROME_STORAGE_KEY, username);
};

export const getUsername = async (): Promise<string> => {
  const cs = new ChromeStorage();
  return (await cs.get(CHROME_STORAGE_KEY)) as string;
};

export const getGistTitle = (): string => {
  let gistTitle = '';
  try {
    const $about = document.querySelector(
      '#gist-pjax-container > div.container-lg.px-3.new-discussion-timeline > div > div > div:nth-child(1)',
    ) as HTMLElement;
    gistTitle = $about.innerText;
  } catch (err) {
    //
  }

  return gistTitle;
};

// repo page
export const getFullName = (): string => {
  location.href.match(/(?:github.com)\/(\w+\/\w+)/gi);

  return RegExp.$1;
};

export const getHtmlUrl = (): string => {
  const m = location.href.match(/(github.com\/\w+\/\w+)/gi);
  return m[0];
};
