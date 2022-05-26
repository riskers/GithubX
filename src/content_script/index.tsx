import theme from '@/common/theme';
import Repo from '@/content_script/pages/repo';
import Buttons from '@/content_script/pages/repo/buttons';
import { ThemeProvider } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

window.addEventListener('load', () => {
  // REPO PAGE
  const dom = document.createElement('div');
  document.body.append(dom);

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Repo />
      <Buttons />
    </ThemeProvider>,
    dom,
  );

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
