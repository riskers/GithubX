import ChromeStorage from '@/common/ChromeStorage';

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
