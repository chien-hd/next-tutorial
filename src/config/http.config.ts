import { IUser } from '@/@types/auth';
import { IGenericResponse } from '@/@types/common';

type ICustomOptions = RequestInit & {
  baseUrl?: string;
};

class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super();
    this.status = status;
    this.payload = payload;
  }
}

class SessionToken {
  private token = '';
  get value() {
    return this.token;
  }
  set value(token: string) {
    // Nếu gọi method này ở server thì sẽ bị lỗi
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side');
    }
    this.token = token;
  }
}

export const clientSessionToken = new SessionToken();

const request = async <Response>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  options?: ICustomOptions,
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;

  const header = {
    'Content-Type': 'application/json',
    ...(clientSessionToken.value
      ? { Authorization: `Token ${clientSessionToken.value}` }
      : {}),
    ...options?.headers,
  };

  const baseUrl = options?.baseUrl
    ? options?.baseUrl
    : process.env.NEXT_PUBLIC_BASE_URL;

  const fullUrl = url.startsWith('/')
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...header,
    },
    body,
    method,
  });

  const payload: Response = await res.json();

  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    throw new HttpError(data);
  }

  if (['/api/auth/login'].includes(url)) {
    clientSessionToken.value = (payload as IGenericResponse<IUser>).data.token;
  } else if ('/api/auth/logout'.includes(url)) {
    clientSessionToken.value = '';
  }

  return data.payload;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<ICustomOptions, 'body'> | undefined,
  ) {
    return request<Response>('GET', url, options);
  },

  post<Response>(
    url: string,
    body: any,
    options?: Omit<ICustomOptions, 'body'> | undefined,
  ) {
    return request<Response>('POST', url, { ...options, body });
  },

  put<Response>(
    url: string,
    body: any,
    options?: Omit<ICustomOptions, 'body'> | undefined,
  ) {
    return request<Response>('PUT', url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body?: any,
    options?: Omit<ICustomOptions, 'body'> | undefined,
  ) {
    return request<Response>('DELETE', url, { ...options, body });
  },
};

export default http;
