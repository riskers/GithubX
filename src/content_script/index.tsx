import * as React from 'react';
import { render } from 'react-dom';

import { getUsername } from '../common/tools';
import Followers from './followers';
import User from './user';
import Gist from './gist';

window.addEventListener('load', () => {
  const href = location.href;
  const username = getUsername();

  if (href == `https://github.com/${username}?tab=following`) {
    const userDom = document.querySelectorAll(
      '.d-table-cell.col-9.v-align-top.pr-3'
    );
    userDom.forEach(o => {
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

  if (href.match(/^https:\/\/gist.github.com\/\w*/gi)) {
    const dom = document.createElement('div');
    dom.setAttribute('style', `position: fixed;
    top: 60px;
    left: 30px`)

    document.body.appendChild(dom)
    render(<Gist />, dom)
  }
});
