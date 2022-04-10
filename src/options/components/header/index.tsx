import { Stack } from '@mui/material';
import * as React from 'react';

const Logo = () => {
  const img = chrome.runtime.getURL('assets/logo.png');
  return (
    <Stack direction="row" alignItems="center">
      <div style={{ width: 70 }}>
        <img src={img} />
      </div>
    </Stack>
  );
};

export default Logo;
