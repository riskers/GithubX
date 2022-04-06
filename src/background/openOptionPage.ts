// click pop icon to open option page - main app
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
