import { DEFAULT_SESSION_LIFETIME } from "../constants/defaultSessionLifetime";
import { ServerOptions } from "../types/cookieHandling";
import { rememberMeCookie } from "./cookieManagement";
import { dependencyContainer } from "../library/DependencyContainer";

type FetcherResponse<T> =
	| { isError: false; requestId: string; data: T }
	| { isError: true; requestId: string; error: string | Error };

const fetcher = async <T>(
	url: string,
	options: RequestInit,
	serverOptions?: ServerOptions,
	sessionLifetime?: number
): Promise<FetcherResponse<T>> => {
	dependencyContainer().throwIfDINotConfigured();
	let sessionCookie = (await dependencyContainer()
		.cookieHandler()
		.getCookie("session-token", serverOptions)) as string;
	let locale = (await dependencyContainer()
	.cookieHandler()
	.getCookie("NEXT_LOCALE", serverOptions)) as string;
	let oktaToken = (await dependencyContainer()
	.cookieHandler()
	.getCookie("okta-token", serverOptions)) as string;
	let clientType = (await dependencyContainer()
	.cookieHandler()
	.getCookie("client-type", serverOptions)) as string;

	sessionCookie = sessionCookie ?? "";
	const incomingHeaders: { [key: string]: any } = serverOptions?.req
		? { ...serverOptions.req.headers }
		: {locale, Authorization: `Bearer ${oktaToken}`, 'client-type': clientType };
	delete incomingHeaders["host"];
	delete incomingHeaders["cookie"];

	options.headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
		...(options.headers || {}),
		...(sessionCookie ? { "session-token": sessionCookie } : {}),
		...incomingHeaders,
	};

	const response: Response = await fetch(url, options);
	const requestId = response.headers.get("request-id") ?? "";

	if (response.ok && response.headers.has("session-token")) {
		let rememberMe = await rememberMeCookie.get();
		let expiryDate;

		if (rememberMe) {
			expiryDate = new Date(
				Date.now() + (sessionLifetime ?? DEFAULT_SESSION_LIFETIME)
			);
		}
		await dependencyContainer()
			.cookieHandler()
			.setCookie(
				"session-token",
				response.headers.get("session-token")!,
				{ expires: expiryDate, ...(serverOptions ?? {}) }
			);
	}

	let error: Error | string;

	if (response.ok) {
		try {
			let res = await response.json();
			return { requestId, data: res.data, isError: false };
		} catch (err) {
			error = err as Error;
		}
	} else {
		try {
			error = await response.clone().json();
		} catch (e) {
			error = await response.text();
		}
	}

	return { requestId, error, isError: true };
};

export { fetcher, FetcherResponse };
