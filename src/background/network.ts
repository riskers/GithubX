import { getRepoInfo } from '@/common/api';
import { getFullName } from '@/common/tools';
import {
  INTERCEPT_GETSTARINFO_B2C,
  INTERCEPT_STARADD_C2B,
  ACTION_SHOW_OPTION_PAGE,
  IAction,
  INTERCEPT_STARADD_C2B_DONE,
  INTERCEPT_INTO_PAGE,
} from '@/content_script/hooks/oneway-message/message';
import { AS } from '@/services';
import { IGroupModel } from '@/services/model/group';
import { IStarModel } from '@/services/model/star';
import { ITagModel } from '@/services/model/tag';

export interface IIntercepotAddStar {
  fullName: string;
  groupId: number;
  tagsId: number[];
}

export interface IInterceptStar {
  fullName: string;
  groups: IGroupModel[];
  tags: ITagModel[];
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

    const groups = await AS.group.getGroupList();
    const tags = await AS.tag.getTagsList();

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

    await AS.star.delStar(starInfo.id);
    await AS.sjt.deleteSJTBySid(starInfo.id);
  },
  {
    types: ['xmlhttprequest'],
    urls: ['*://github.com/*/unstar'],
  },
);

export interface IInterceptIntoPage {
  star: IStarModel;
}

/**
 * into repo page intercept for add buttons
 */
chrome.webRequest.onCompleted.addListener(
  async (details) => {
    if (details.url.match(/\?/gi)) {
      return;
    }

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    // exclude in background
    if (!tab || !/github/.test(tab.url)) return;

    const url = tab.url.replace('https://github.com/', '');
    const star = await AS.star.getStarInfoByFullName(url);

    if (!star) return;

    chrome.tabs.sendMessage<IAction<IInterceptIntoPage>>(tab.id, {
      type: INTERCEPT_INTO_PAGE,
      payload: {
        star,
      },
    });
  },
  {
    types: ['xmlhttprequest'],
    urls: ['*://api.github.com/repos/*/*'],
  },
);

/**
 * message listener
 */
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

    await AS.star.addStar({ ...starInfo, groupId, updateTime: Date.now(), createTime: Date.now() });

    for (let tagId of tagsId) {
      await AS.sjt.addSJT(tagId, starInfo.id);
    }

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });

    chrome.tabs.sendMessage<IAction<IInterceptStar>>(tab.id, { type: INTERCEPT_STARADD_C2B_DONE });
  }
});
