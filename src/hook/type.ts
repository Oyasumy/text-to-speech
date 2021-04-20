export type TypeHeader = {
  method: string;
  headers: Headers;
  body: BodyInit;
  redirect: RequestRedirect | undefined;
};

export type typeRes = {
  error_code: number;
  data: { url: string };
};

export enum VALUE_BUTTON {
  CONTINUE = 'Tiếp tục',
  STOP = 'Dừng',
}