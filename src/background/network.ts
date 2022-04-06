import {
  ACTION_INTERCEPT_NETWORK_STAR_CLOSE,
  ACTION_SHOW_OPTION_PAGE,
  ACTION_INTERCEPT_NETWORK_STAR_OPEN,
} from '@/content_script/hooks/chrome-message/message';

chrome.webRequest.onCompleted.addListener(
  async (details) => {
    console.log(details);

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    console.log(tab);

    chrome.tabs.sendMessage(tab.id, { type: ACTION_INTERCEPT_NETWORK_STAR_OPEN });
  },
  {
    types: ['xmlhttprequest'],
    urls: ['*://github.com/*/star', '*://github.com/*/unstar'],
  },
);

chrome.runtime.onMessage.addListener(async (request) => {
  const { type } = request;
  console.log(type);

  // open option page in content_script page
  if (type === ACTION_SHOW_OPTION_PAGE) {
    chrome.runtime.openOptionsPage();
  }

  if (type === ACTION_INTERCEPT_NETWORK_STAR_CLOSE) {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.tabs.sendMessage(tab.id, { type: ACTION_INTERCEPT_NETWORK_STAR_CLOSE });
  }
});
