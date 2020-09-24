export const getUsername = () => {
  try {
    const $dropdown = document.querySelector('.dropdown-menu.dropdown-menu-sw.mt-2');
    const $user = $dropdown.querySelector('.css-truncate-target') as HTMLElement;
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
