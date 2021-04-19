export type TypeHeader = {
  method: string;
  headers: Headers;
  body: URLSearchParams;
  redirect: RequestRedirect | undefined;
};

export type typeRes = {
  error_code: number;
  data: { url: string };
};
