import { Action } from "@/actions/ActionCreatorTypings";

export function actionCreator<PayloadType>(
  type: string,
  payload: PayloadType
): Action<PayloadType> {
  return {
    type,
    payload,
  } as const;
}
