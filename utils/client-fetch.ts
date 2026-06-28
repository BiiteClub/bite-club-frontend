type FetchMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface FetchAPIOptions {
  body?: unknown;
  headers?: HeadersInit;
  cache?: RequestCache;
}

export async function clientFetch<T>(
  endpoint: string,
  method: FetchMethod = 'GET',
  { body, headers = {}, cache }: FetchAPIOptions = {},
): Promise<T> {
  const requestHeaders = new Headers(headers);

  if (!(body instanceof FormData)) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  console.log('clientFetch: ', process.env.NEXT_PUBLIC_API_BASE_URL);
  console.log('clientFetch: ', body);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
    {
      method,
      credentials: 'include',
      headers: requestHeaders,
      cache,
      body:
        body == null
          ? undefined
          : body instanceof FormData
            ? body
            : JSON.stringify(body),
    },
  );

  let data: any = null;

  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    throw new Error(data?.message ?? 'Request failed');
  }

  return data as T;
}

