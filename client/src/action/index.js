import axios from "axios";

export function getPokemons() {
	return async function (dispatch) {
		let json = await axios("http://localhost:3001/pokemons");
		return dispatch({
			type: "GET_POKEMONS",
			payload: json.data,
		});
	};
}
export function getTypes() {
	return async function (dispatch) {
		try {
			let result = await axios.get("http://localhost:3001/types");
			console.log(result.data);
			return dispatch({
				type: "GET_TYPES",
				payload: result.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function ordenarName(payload) {
	return {
		type: "ORDER_NAME",
		payload,
	};
}
export function getNamePokemon(name) {
	return async function (dispatch) {
		let llamadoApi = await axios.get(
			`http://localhost:3001/pokemons?name=${name}`
		);
		return dispatch({
			type: "BUSQUEDA_POKEMONS",
			payload: llamadoApi.data,
		});
	};
}

export function filterByTypes(payload) {
	// console.log(payload)
	return {
		type: "FILTER_BY_TYPES",
		payload,
	};
}
export function filterCreated(payload) {
	return {
		type: "FILTER_CREATED",
		payload,
	};
}
export function mayorDefensa(payload) {
	return {
		type: "ORDER_FUERZA",
		payload,
	};
}
export function postPokemons(payload) {
	return async function (dispatch) {
		let json = await axios.post("http://localhost:3001/pokemons", payload);
		console.log(json);
		return json;
	};
}
// export function getTipos() {
// 	return async function (dispatch) {
// 		let json = await axios.get("http://localhost:3001/types", {});
// 		return dispatch({ type: "GET_TIPOS", payload: json.data });
// 	};
// }
export function getDetails(id) {
	return async function (dispatch) {
		try {
			let json = await axios.get(`http://localhost:3001/pokemons/${id}`);
			return dispatch({
				type: "GET_DETAILS",
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function cleanDetails(){
    return({
        type: "CLEAN_DETAILS",
        
    })
}
