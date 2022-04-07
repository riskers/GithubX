import { IStar } from '@/common/api';
import {
  ACTION_SHOW_OPTION_PAGE,
  ACTION_INTERCEPT_NETWORK_GET_INFO,
  ACTION_INTERCEPT_NETWORK_STAR_ADD,
  IAction,
} from '@/content_script/hooks/oneway-message/message';
import { getGroupList, IGroup } from '@/services/idb/group';
import { getStarInfoByUrl } from '@/services/idb/stars';
import { getTagsList, ITag } from '@/services/idb/tag';

export interface IIntercepotAddStar {
  starInfo: IStar;
  groupId: number;
  tagsId: number[];
}

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
      type: ACTION_INTERCEPT_NETWORK_GET_INFO,
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

chrome.runtime.onMessage.addListener(async (request: IAction<any>) => {
  const { type } = request;

  // open option page in content_script page
  if (type === ACTION_SHOW_OPTION_PAGE) {
    chrome.runtime.openOptionsPage();
  }

  if (type === ACTION_INTERCEPT_NETWORK_STAR_ADD) {
    console.log(request.payload);
    // add star
  }
});
