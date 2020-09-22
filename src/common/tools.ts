export const getUsername = () => {
  try {
    const $dropdown = document.querySelector(
      '.dropdown-menu.dropdown-menu-sw.mt-2'
    );
    const $user = <HTMLElement>$dropdown.querySelector('.css-truncate-target');
    return $user.innerText;
  } catch (err) {
    //
  }

  return '';
};

export const getGistTitle = () => {
  let gistTitle = '';
  try {
    const $about = <HTMLElement>(
      document.querySelector(
        '#gist-pjax-container > div.container-lg.px-3.new-discussion-timeline > div > div > div:nth-child(1)'
      )
    );
    gistTitle = $about.innerText;
  } catch (err) {
    //
  }

  return gistTitle;
};
