import ChromeMessageHook from '@/content_script/hooks/chrome-message';
import {
  ACTION_INTERCEPT_NETWORK_STAR_CLOSE,
  ACTION_INTERCEPT_NETWORK_STAR_OPEN,
} from '@/content_script/hooks/chrome-message/message';
import { Dialog } from '@mui/material';
import React from 'react';

const Repo: React.FC = () => {
  const [message, sendMessage] = ChromeMessageHook();

  if (!message) return null;

  const { type } = message;

  const handleClose = async () => {
    sendMessage({ type: ACTION_INTERCEPT_NETWORK_STAR_CLOSE });
  };

  return <Dialog onClose={handleClose} open={type === ACTION_INTERCEPT_NETWORK_STAR_OPEN} />;
};

export default Repo;
