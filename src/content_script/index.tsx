import theme from '@/common/theme';
import Repo from '@/content_script/pages/repo';
import Buttons from '@/content_script/pages/repo/buttons';
import { ThemeProvider } from '@mui/material';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

window.addEventListener('load', () => {
  // REPO PAGE
  const dom = document.createElement('div');
  document.body.querySelector('.Layout-sidebar').prepend(dom);

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Repo />
      <Buttons />
    </ThemeProvider>,
    dom,
  );
});
