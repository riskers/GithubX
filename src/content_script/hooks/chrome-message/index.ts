import { IAction } from '@/content_script/hooks/chrome-message/message';
import { useEffect, useState } from 'react';

/**
 * receive message from background to content script and send message to background
 */
const ChromeMessageHook = () => {
  const [message, setMessage] = useState<IAction<any>>(null);

  const handleMessage = (request) => {
    const { type } = request;
    setMessage({ type });
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  const sendMessage = (message: IAction<any>) => {
    chrome.runtime.sendMessage(message);
  };

  return [message, sendMessage] as const;
};

export default ChromeMessageHook;
