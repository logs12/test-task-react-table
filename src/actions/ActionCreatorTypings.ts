export interface Action<PayloadType> {
  type: string;
  payload: PayloadType;
}
