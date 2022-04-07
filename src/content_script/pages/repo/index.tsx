import ChromeMessageHook from '@/content_script/hooks/oneway-message';
import {
  ACTION_INTERCEPT_NETWORK_STAR_CLOSE,
  ACTION_INTERCEPT_NETWORK_STAR_OPEN,
} from '@/content_script/hooks/oneway-message/message';
import { Dialog, DialogContent } from '@mui/material';
import React from 'react';
import { IInterceptStar } from '@/background/network';

const Repo: React.FC = () => {
  const [message, sendMessage] = ChromeMessageHook<IInterceptStar>();
  console.log(message);

  const handleClose = async () => {
    sendMessage({ type: ACTION_INTERCEPT_NETWORK_STAR_CLOSE });
  };

  return (
    <Dialog onClose={handleClose} open={message?.type === ACTION_INTERCEPT_NETWORK_STAR_OPEN}>
      <DialogContent>this is content</DialogContent>
    </Dialog>
  );
};

export default Repo;
