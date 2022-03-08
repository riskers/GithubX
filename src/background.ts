import { ACTION_SHOW_OPTION_PAGE } from '@/common/constants';

chrome.runtime.onMessage.addListener((request) => {
  if (request === ACTION_SHOW_OPTION_PAGE) {
    chrome.runtime.openOptionsPage();
  }
});
