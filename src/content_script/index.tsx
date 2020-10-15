import * as React from 'react';
import { render } from 'react-dom';
import { getUsername } from '../common/tools';
import User from './pages/user';
import Gist from '@/content_script/pages/gist';
import Stars from '@/content_script/pages/stars';
import Repo from '@/content_script/pages/repo';
import App from '@/content_script/pages/app';

window.addEventListener('load', () => {
  const href = location.href;
  const username = getUsername();

  const appContainer = document.createElement('div');
  render(<App />, appContainer);
  document.body.append(appContainer);

  /* if (href === `https://github.com/${username}?tab=following`) {
    const userDom = document.querySelectorAll('.d-table-cell.col-9.v-align-top.pr-3');
    userDom.forEach((o) => {
      const dom = document.createElement('span');
      o.querySelector('.d-inline-block').appendChild(dom);
      render(<Followers />, dom);
    });
  } */

  // https://github.com/riskers 用户界面
  // if (href.match(/^https:\/\/github.com\/\w*/gi)) {
  //   const dom = document.createElement('div');
  //   document.querySelector('.vcard-names').appendChild(dom);

  //   render(<User />, dom);
  // }

  // REPO page
  // if (href === 'https://github.com/airbnb/visx') {
  //   const dom = document.createElement('div');
  //   document.body.appendChild(dom);

  //   render(<Repo />, dom);
  // }

  // GIST page
  // if (href.match(/^https:\/\/gist.github.com\/\w*/gi)) {
  //   const oDiv = document.createElement('li');
  //   render(<Gist />, oDiv);

  //   document.querySelector('.d-md-flex.d-none.pagehead-actions.float-none').prepend(oDiv);
  // }

  // STAR list
  // if (href === `https://github.com/${username}?tab=stars`) {
  //   const oDiv = document.createElement('div');
  //   render(<Stars />, oDiv);
  //   document.body.appendChild(oDiv);
  // }
});
