import * as React from 'react';
import { render } from 'react-dom';

import { getUsername } from '../common/tools';
import Followers from './pages/followers';
import AddGistBtn from './pages/gist/AddGistBtn';
import Sidebar from './pages/gist/Sidebar';
import User from './pages/user';

window.addEventListener('load', () => {
  const href = location.href;
  const username = getUsername();

  if (href == `https://github.com/${username}?tab=following`) {
    const userDom = document.querySelectorAll(
      '.d-table-cell.col-9.v-align-top.pr-3'
    );
    userDom.forEach((o) => {
      const dom = document.createElement('span');
      o.querySelector('.d-inline-block').appendChild(dom);
      render(<Followers />, dom);
    });
  }

  // https://github.com/riskers 用户界面
  if (href.match(/^https:\/\/github.com\/\w*/gi)) {
    const dom = document.createElement('div');
    document.querySelector('.vcard-names').appendChild(dom);

    render(<User />, dom);
  }

  // GIST
  if (href.match(/^https:\/\/gist.github.com\/\w*/gi)) {
    const sidebar = document.createElement('div');
    sidebar.setAttribute(
      'style',
      `
        width: 280px;
        position: fixed;
        top: 60px;
        left: 10px;
        background-color: #ccc;
        font-size: 14px;
        `
    );
    document.body.appendChild(sidebar);
    render(<Sidebar />, sidebar);

    const addBtn = document.createElement('li');
    document
      .querySelector('.d-md-flex.d-none.pagehead-actions.float-none')
      .prepend(addBtn);
    render(<AddGistBtn />, addBtn);
  }
});
