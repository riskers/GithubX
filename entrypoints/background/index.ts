export default defineBackground(() => {
  console.log('Hello background!');

  browser.action.onClicked.addListener(async () => {
    await browser.runtime.openOptionsPage();
  });

  // installed hook
  browser.runtime.onInstalled.addListener((details) => {
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
});
