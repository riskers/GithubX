import { IInterceptStar } from '@/background/network';
import { IAction } from '@/content_script/hooks/oneway-message/message';
import { useEffect, useState } from 'react';

/**
 * receive message from background to content script and send message to background
 */
const ChromeMessageHook = <T>() => {
  const [message, setMessage] = useState<IAction<T>>(null);

  const sendMessage = <K>(message: IAction<K>) => {
    chrome.runtime.sendMessage(message);
  };

  useEffect(() => {
    const handleMessage = (request: IAction<T>) => {
      setMessage(request);
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  return [message, sendMessage] as const;
};

export default ChromeMessageHook;
