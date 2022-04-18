import { IInterceptIntoPage } from '@/background/network';
import theme from '@/common/theme';
import { IAction, INTERCEPT_INTO_PAGE } from '@/content_script/hooks/oneway-message/message';
import Repo from '@/content_script/pages/repo';
import Buttons from '@/content_script/pages/repo/buttons';
import { ThemeProvider } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

window.addEventListener('load', () => {
  // const href = location.href;

  // REPO page
  const dom = document.createElement('div');
  document.body.appendChild(dom);

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Repo />
    </ThemeProvider>,
    dom,
  );

  chrome.runtime.onMessage.addListener((e: IAction<IInterceptIntoPage>) => {
    const dom = document.createElement('div');
    document.body.appendChild(dom);

    if (e.type === INTERCEPT_INTO_PAGE) {
      const starInfo = e.payload.star;
      if (starInfo) {
        console.log(starInfo);
        ReactDOM.render(<Buttons starInfo={starInfo} />, dom);
      }
    }
  });

  /* if (href === `https://github.com/${username}?tab=following`) {
    const userDom = document.querySelectorAll('.d-table-cell.col-9.v-align-top.pr-3');
    userDom.forEach((o) => {
      const dom = document.createElement('span');
      o.querySelector('.d-inline-block').appendChild(dom);
      render(<Followers />, dom);
    });
  } */

  // GIST page
  // if (href.match(/^https:\/\/gist.github.com\/\w*/gi)) {
  //   const oDiv = document.createElement('div');
  //   render(<Gist />, oDiv);

  //   document.body.appendChild(oDiv);
  // }
});
