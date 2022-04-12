import * as React from 'react';
import { LinearProgress, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@/options/store';
import { color } from '@mui/system';

export const Progress = () => {
  const settings = useSelector((state: RootState) => state.settings);

  if (!settings.loading) return null;

  return (
    <Stack sx={{ width: '100%', color: 'grey.500', position: 'fixed', top: 0, left: 0, right: 0 }} spacing={2}>
      <LinearProgress color="secondary" />
    </Stack>
  );
};

export default Progress;
