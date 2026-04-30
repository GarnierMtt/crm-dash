
const backendURL = import.meta.env.VITE_BACKEND_URL;

let login = false;
export const showLogin = $state(login);

		//handeling fetch requests
export const request = {
			//index request
	index: async(query: string) => {
		await fetch(backendURL + query, {
			method: "GET",
      		credentials: "include",
		})
		.then((response) => {
			if(response.status !== 200) {
				throw response;
			}
			return response.json();
		})
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
	},

			//show request
	show: async(query: string) => {
		await fetch(backendURL + query, {
			method: "GET",
      		credentials: "include",
		})
		.then((response) => {
			if(response.status !== 200) {
				return requestFail(response.json());
			}
			return response.json();
		});
	},

			//new request
	new: async(path: string, body: FormData) => {
		await fetch(backendURL + path, {
			method: "POST",
      		credentials: "include",
			body: body,
		})
		.then((response) => {
			if(response.status !== 201) {
				throw response;
			}
			return response.json();
		})
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
	},

			//edit request
	edit: async(path: string, body: FormData) => {
		await fetch(backendURL + path, {
			method: "POST",
      		credentials: "include",
			body: body,
		})
		.then((response) => {
			if(response.status !== 202) {
				throw response;
			}
			return response.json();
		})
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
	},

			//delete request
	delete: async(path: string) => {
		await fetch(backendURL + path, {
			method: "DELETE",
      		credentials: "include",
		})
		.then((response) => {
			if(response.status !== 204) {
				throw response;
			}
			return response.json();
		})
		.then((result) => console.log(result))
		.catch((error) => console.error(error));
	},
}

async function requestFail(response: Promise<any>): Promise<Response>{
	if(await response === "unauthenticated"){
		login = true;
	}
	return response;
}