export const getUsername = () => {
  try {
    const $user = document.querySelector(
      '#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.col-10.col-md-12.pt-1.pt-md-3.pb-1.pb-md-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block',
    ) as HTMLElement;
    return $user.innerText;
  } catch (err) {
    //
  }

  return '';
};

export const getGistTitle = () => {
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
export const getFullName = () => {
  location.href.match(/(?:github.com)\/(\w+\/\w+)/gi);

  return RegExp.$1;
};

export const getHtmlUrl = () => {
  const m = location.href.match(/(github.com\/\w+\/\w+)/gi);
  return m[0];
};
