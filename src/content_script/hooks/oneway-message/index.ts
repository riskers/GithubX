import { IInterceptStar } from '@/background/network';
import { IAction } from '@/content_script/hooks/oneway-message/message';
import { useEffect, useState } from 'react';

/**
 * receive message from background to content script and send message to background
 */
const ChromeMessageHook = <T>() => {
  const [message, setMessage] = useState<IAction<T>>(null);

  const sendMessage = (message: IAction<any>) => {
    chrome.runtime.sendMessage(message);
  };

  const handleMessage = (request) => {
    setMessage(request);
  };

  useEffect(() => {
    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return [message, sendMessage] as const;
};

export default ChromeMessageHook;
