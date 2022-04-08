import { getRepoInfo, IStar } from '@/common/api';
import {
  ACTION_INTERCEPT_NETWORK_GET_INFO,
  ACTION_INTERCEPT_NETWORK_STAR_ADD,
  ACTION_SHOW_OPTION_PAGE,
  IAction,
} from '@/content_script/hooks/oneway-message/message';
import { getGroupList, IGroup } from '@/services/idb/group';
import { addStar, getStarInfoByUrl } from '@/services/idb/stars';
import { addSJT } from '@/services/idb/starsJTags';
import { getTagsList, ITag } from '@/services/idb/tag';

export interface IIntercepotAddStar {
  fullName: string;
  groupId: number;
  tagsId: number[];
}

export interface IInterceptStar {
  fullName: string;
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
    console.log(details);

    const htmlUrl = details.url.replace(/(.*)(\/(unstar|star))$/gi, '$1');

    const starInfo = await getStarInfoByUrl(htmlUrl);
    const groups = await getGroupList();
    const tags = await getTagsList();

    chrome.tabs.sendMessage<IAction<IInterceptStar>>(tab.id, {
      type: ACTION_INTERCEPT_NETWORK_GET_INFO,
      payload: {
        fullName: htmlUrl.replace('https://github.com/', ''),
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

  /**
   * 1. add star
   * 2. set group and tag
   */
  if (type === ACTION_INTERCEPT_NETWORK_STAR_ADD) {
    const { fullName, groupId, tagsId } = (request as IAction<IIntercepotAddStar>).payload;

    const starInfo = await getRepoInfo(fullName);

    await addStar({ ...starInfo, groupId });

    for (let tagId of tagsId) {
      await addSJT(tagId, starInfo.id);
    }
  }
});
