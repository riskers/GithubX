import { IAction } from '@/content_script/hooks/chrome-message/message';
import { useEffect, useState } from 'react';

/**
 * receive message from background to content script
 */
const ChromeMessageHook = () => {
  const [message, setMessage] = useState<IAction>(null);

  console.log(message);

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

  const sendMessage = (message: IAction) => {
    chrome.runtime.sendMessage(message);
  };

  return { message, sendMessage };
};

export default ChromeMessageHook;
