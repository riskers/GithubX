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
export const getFullName = (details: chrome.webRequest.WebResponseCacheDetails): string => {
  const url = details.url.replace(/(.*)(\/(unstar|star))$/gi, '$1');
  return url.replace('https://github.com/', '');
};
