import { IStar } from '@/common/api';
import { IGroup } from '@/content_script/services/local/group';
import { StarAction } from '@/options/pages/Home/actions';

export interface IGroupState {
  loading: boolean;
  data: IGroup[];
}

export interface IStarState {
  loading: boolean;
  total: number;
  data: IStar[];
  error: string;
}

export const starsReducer = (
  state: IStarState = {
    loading: false,
    total: 0,
    data: [],
    error: '',
  },
  action: StarAction,
) => {
  switch (action.type) {
    case 'FETCH_STAR_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_STAR_FAILURE':
      return {
        ...state,
        error: action.error,
      };
    case 'FETCH_STAR_SUCCESS':
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};
