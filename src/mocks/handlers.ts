import { http, HttpResponse } from "msw";

export const handlers = [
	// Перехватывает любой GET на .../todos (любой домен/порт)
	http.get("*/todos", () => {
		return new HttpResponse(null, { status: 500 });
	}),
];
