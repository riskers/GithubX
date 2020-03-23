export const getUsername = () => {
  try {
    const $dropdown = document.querySelector('.dropdown-menu.dropdown-menu-sw.mt-2');
    const $user = <HTMLElement>$dropdown.querySelector('.css-truncate-target');
    return $user.innerText;
  } catch (err) {
    //
  }

  return '';
};
