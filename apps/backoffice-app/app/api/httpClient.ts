"use client"
export interface HttpClient {
	get: (url: string, params?: any) => Promise<any>;
	post: (url: string, payload: IPostPayload) => Promise<any>;
}
export interface IPostPayload {
	params?: string; 
	body: any;
	query?: string;
}

export const httpClient: HttpClient = {

	get: async (url, params = {}) => {
		const headers = new Headers();
		const token: string = `Bearer ${localStorage.getItem("accessToken")}` || "";
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization',token);
		headers.append('x-source', 'backoffice');
	  
		const query = new URLSearchParams(params).toString();
		const response = await fetch(`${url}`, {
			headers: headers,
			method: "GET"
		});

		if (!response.ok) {
			throw response
		}

		return response.json();
	},

	post: async (url, payload: IPostPayload) => {
		const { params, body, query } = payload;
		if (params) url = url.concat(`/${params}`)
		if (query) url = url.concat(`?${query}`)

		const headers = new Headers();
		const token: string = `Bearer ${localStorage.getItem("accessToken")}` || "";
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', token);
		// headers.append('x-source', 'backoffice');
		// headers.append("access-control-allow-credentials", "true");

		const response = await fetch(`${url}`, {
			method: 'POST',
			headers: headers,
			credentials: "include",
			body: JSON.stringify(body),
		});
		if (!response.ok) {
			throw response
		}
		return response.json();
	},
};
