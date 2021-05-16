import { Action } from "@/actions/ActionCreatorTypings";
import { DataState } from "@/models/DataModel";
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "@/constants/data";

export type CommentsDataActionPayload = Record<string, unknown>;
export interface CommentsDataAction {
  (page: number, limits?: number): Action<CommentsDataActionPayload>;
}
export const getCommentsDataAction = (
  page,
  limits = 10
): Action<CommentsDataActionPayload> => ({
  type: FETCH_DATA,
  payload: {
    page,
    limits,
  },
});

type GetCommentsDataSuccessActionPayloadType = {
  data: DataState;
};
export const getCommentsDataSuccessAction = (
  data: DataState
): Action<GetCommentsDataSuccessActionPayloadType> => ({
  type: FETCH_DATA_SUCCESS,
  payload: {
    data,
  },
});

type GetCommentsDataErrorActionPayloadType = Record<string, unknown>;
export const getCommentsDataErrorAction =
  (): Action<GetCommentsDataErrorActionPayloadType> => ({
    type: FETCH_DATA_ERROR,
    payload: {},
  });
