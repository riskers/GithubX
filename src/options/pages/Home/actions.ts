import { IStar } from '@/common/api';
import { getGroupList, IGroup } from '@/content_script/services/local/group';
import * as STAR_API from '@/content_script/services/local/stars';
import { Dispatch } from 'redux';

interface StarFetchLoadingAction {
  type: 'FETCH_STAR_LOADING';
}

interface StarFetchSuccessAction {
  type: 'FETCH_STAR_SUCCESS';
  payload: IStar[];
}

interface StarFetchFailureAction {
  type: 'FETCH_STAR_FAILURE';
  error: string;
}

export type StarAction = StarFetchLoadingAction | StarFetchSuccessAction | StarFetchFailureAction;

export const fetchStarsListByGroup = (groupId: string) => {
  return async (dispatch: Dispatch<StarAction>) => {
    dispatch({
      type: 'FETCH_STAR_LOADING',
    });

    try {
      const list = await STAR_API.getStarsList({ groupId });

      const ll = list.filter((star) => star.groupId === groupId);

      dispatch({
        type: 'FETCH_STAR_SUCCESS',
        payload: ll,
      });
    } catch (e) {
      dispatch({
        type: 'FETCH_STAR_FAILURE',
        error: 'Timeout',
      });
    }
  };
};
