import * as React from 'react';
import { render } from 'react-dom';
import User from './pages/user';
import Gist from '@/content_script/pages/gist';
import Stars from '@/content_script/pages/stars';
import Repo from '@/content_script/pages/repo';
import App from '@/content_script/pages/app';
import './style.css';

window.addEventListener('load', () => {
  const href = location.href;

  // const appContainer = document.createElement('div');
  // render(<App />, appContainer);
  // document.body.append(appContainer);

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
  //   const oDiv = document.createElement('div');
  //   render(<Gist />, oDiv);

  //   document.body.appendChild(oDiv);
  // }

  // STAR list
  // if (href.match(/^https:\/\/github.com\/\w*\?tab=stars/gi) || href.match(/^https:\/\/github.com\/stars\/\w*/gi)) {
  //   document.querySelector('body').classList.add('github-plus-sidebar');

  //   const oDiv = document.createElement('div');
  //   render(<Stars />, oDiv);
  //   document.body.appendChild(oDiv);
  // }
});
