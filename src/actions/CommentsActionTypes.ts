import { DataItem } from "@/models/DataModel";
import {
  FETCH_DATA,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "@/constants/data";

export type CommentsDataActionPayload = {
  readonly type: typeof FETCH_DATA;
  readonly page: number;
  readonly limits?: number;
};
export interface CommentsDataAction {
  (page: number, limits?: number): CommentsDataActionPayload;
}

export type GetCommentsDataSuccessActionPayloadType = {
  readonly type: typeof FETCH_DATA_SUCCESS;
  readonly data: DataItem[];
};
export interface CommentsDataSuccessAction {
  (data: DataItem[]): GetCommentsDataSuccessActionPayloadType;
}

export type GetCommentsDataErrorActionPayloadType = {
  readonly type: typeof FETCH_DATA_ERROR;
  readonly error: string;
};
export interface CommentsDataErrorAction {
  (error): GetCommentsDataErrorActionPayloadType;
}

export type TCommentsAction =
  | CommentsDataActionPayload
  | GetCommentsDataSuccessActionPayloadType
  | GetCommentsDataErrorActionPayloadType;
