import { ACTION_SHOW_OPTION_PAGE } from '@/common/constants';

chrome.runtime.onMessage.addListener((request) => {
  if (request === ACTION_SHOW_OPTION_PAGE) {
    chrome.runtime.openOptionsPage();
  }
});

// click pop icon to open option page - main app
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.runtime.onInstalled.addListener((details: chrome.runtime.InstalledDetails) => {
  // first install
  if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    // ...
    chrome.runtime.openOptionsPage();
  }

  // update version
  if (details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
    // ....
  }
});
