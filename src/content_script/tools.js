const getUsername = () => {
  const $dropdown = document.querySelector('.dropdown-menu.dropdown-menu-sw.mt-2');
  return $dropdown.querySelector('.css-truncate-target').innerText;
};

export {
  getUsername,
};
