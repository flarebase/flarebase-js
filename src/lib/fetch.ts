import type { Fetch } from "./types";

const resolveFetch = (customFetch?: Fetch): Fetch => {
    return (...args) => (customFetch ?? fetch)(...args);
};

export const fetchWithAuth = (
    apiKey: string,
    customFetch?: Fetch,
): Fetch => {
    const _fetch = resolveFetch(customFetch);

    return async (input, init) => {
        const headers = new Headers(init?.headers);

        if (!headers.has("x-api-key")) {
            headers.set("x-api-key", apiKey);
        }

        return _fetch(input, { ...init, headers });
    };
};
