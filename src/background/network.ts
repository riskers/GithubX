import { getRepoInfo } from '@/common/api';
import { getFullName } from '@/common/tools';
import {
  INTERCEPT_GETSTARINFO_B2C,
  INTERCEPT_STARADD_C2B,
  ACTION_SHOW_OPTION_PAGE,
  IAction,
  INTERCEPT_STARADD_C2B_DONE,
} from '@/content_script/hooks/oneway-message/message';
import { getGroupList, IGroup } from '@/services/idb/group';
import { addStar, delStar } from '@/services/idb/stars';
import { addSJT, deleteSJTBySid } from '@/services/idb/starsJTags';
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
 * star request intercept
 */
chrome.webRequest.onCompleted.addListener(
  async (details) => {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    const fullName = getFullName(details);
    const groups = await getGroupList();
    const tags = await getTagsList();

    chrome.tabs.sendMessage<IAction<IInterceptStar>>(tab.id, {
      type: INTERCEPT_GETSTARINFO_B2C,
      payload: {
        fullName,
        groups,
        tags,
      },
    });
  },
  {
    types: ['xmlhttprequest'],
    urls: ['*://github.com/*/star'],
  },
);

/**
 * unstar request intercept
 */
chrome.webRequest.onCompleted.addListener(
  async (details) => {
    const fullName = getFullName(details);
    const starInfo = await getRepoInfo(fullName);

    await delStar(starInfo.id);
    await deleteSJTBySid(starInfo.id);
  },
  {
    types: ['xmlhttprequest'],
    urls: ['*://github.com/*/unstar'],
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
  if (type === INTERCEPT_STARADD_C2B) {
    const { fullName, groupId, tagsId } = (request as IAction<IIntercepotAddStar>).payload;

    const starInfo = await getRepoInfo(fullName);

    await addStar({ ...starInfo, groupId, updateTime: Date.now(), createTime: Date.now() });

    for (let tagId of tagsId) {
      await addSJT(tagId, starInfo.id);
    }

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.tabs.sendMessage<IAction<IInterceptStar>>(tab.id, { type: INTERCEPT_STARADD_C2B_DONE });
  }
});