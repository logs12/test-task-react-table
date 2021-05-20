export type IsPending = boolean;

export type DataItem = {
  readonly postId: string;
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly body: string;
};

export interface DataState {
  data: DataItem[];
  isPending: IsPending;
}

export const defaultOwnerRepositoryState = {
  get state(): DataItem {
    return {
      postId: "",
      id: "",
      name: "",
      email: "",
      body: "",
    };
  },
};

const defaultState = {
  get state(): DataState {
    return {
      data: [],
      isPending: false,
    };
  },
};

export const initialState = {
  get state(): DataState {
    return defaultState.state;
  },
};
