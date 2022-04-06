// installed hook
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
