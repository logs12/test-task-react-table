import { DataItem } from "@/models/DataModel";
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "@/constants/data";
import {
  CommentsDataActionPayload,
  GetCommentsDataSuccessActionPayloadType,
  GetCommentsDataErrorActionPayloadType,
} from "@/actions/CommentsActionTypes";

export const getCommentsDataAction = (
  page: number,
  limits = 10
): CommentsDataActionPayload => ({
  type: FETCH_DATA,
  page,
  limits,
});

export const getCommentsDataSuccessAction = (
  data: DataItem[]
): GetCommentsDataSuccessActionPayloadType => ({
  type: FETCH_DATA_SUCCESS,
  data,
});

export const getCommentsDataErrorAction = (
  error: string
): GetCommentsDataErrorActionPayloadType => ({
  type: FETCH_DATA_ERROR,
  error,
});
