import { GITHUB_URL } from '@/common/constants';
import { Stack } from '@mui/material';
import * as React from 'react';

const Logo = () => {
  const img = chrome.runtime.getURL('assets/logo.png');
  return (
    <Stack direction="row" alignItems="center">
      <a style={{ width: 70 }} href={GITHUB_URL} target="_blank" title="Star GithubX">
        <img src={img} />
      </a>
    </Stack>
  );
};

export default Logo;
