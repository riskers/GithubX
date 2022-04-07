import { IStar } from '@/common/api';
import {
  ACTION_INTERCEPT_NETWORK_STAR_CLOSE,
  ACTION_SHOW_OPTION_PAGE,
  ACTION_INTERCEPT_NETWORK_STAR_OPEN,
  IAction,
} from '@/content_script/hooks/oneway-message/message';
import { getGroupList, IGroup } from '@/services/idb/group';
import { getStarInfoByUrl } from '@/services/idb/stars';
import { getTagsList, ITag } from '@/services/idb/tag';

export interface IInterceptStar {
  starInfo: IStar;
  groups: IGroup[];
  tags: ITag[];
}
/**
 * star and unstar request intercept
 */
chrome.webRequest.onCompleted.addListener(
  async (details) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const htmlUrl = details.url.replace(/(.*)(\/(unstar|star))$/gi, '$1');

    const starInfo = await getStarInfoByUrl(htmlUrl);
    const groups = await getGroupList();
    const tags = await getTagsList();

    chrome.tabs.sendMessage<IAction<IInterceptStar>>(tab.id, {
      type: ACTION_INTERCEPT_NETWORK_STAR_OPEN,
      payload: {
        starInfo,
        groups,
        tags,
      },
    });
  },
  {
    types: ['xmlhttprequest'],
    urls: ['*://github.com/*/star', '*://github.com/*/unstar'],
  },
);

chrome.runtime.onMessage.addListener(async (request) => {
  const { type } = request;

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
