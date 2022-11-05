const incialState = {
	pokemons: [],
	allPokemon: [],
	types: [],
	detail: [],
};

function rootReducer(state = incialState, action) {
	switch (action.type) {
		case "GET_POKEMONS":
			return {
				...state,
				pokemons: action.payload,
				allPokemon: action.payload,
			};

		case "FILTER_BY_TYPES":
			const filterTypes = state.allPokemon;
			const type =
				action.payload === "all"
					? filterTypes
					: filterTypes.filter(p =>
							p.types?.map(el => el).includes(action.payload)
					  );

			return {
				...state,
				pokemons: type,
			};

		case "ORDER_NAME":
			let order =
				action.payload === "asc"
					? state.pokemons.sort(function (a, b) {
							if (a.name > b.name) {
								return 1;
							}
							if (b.name > a.name) {
								return -1;
							}
							return 0;
					  })
					: state.pokemons.sort(function (a, b) {
							if (a.name > b.name) {
								return -1;
							}
							if (b.name > a.name) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				pokemons: order,
			};
		case "FILTER_CREATED":
			const allPokemon2 = state.allPokemon;
			const createdFilter =
				action.payload === "create"
					? allPokemon2.filter(el => el.createdInBd === true)
					: allPokemon2.filter(el => el.createdInBd !== true);
			return {
				...state,
				pokemons: action.payload === "all" ? allPokemon2 : createdFilter,
			};
		case "ORDER_FUERZA":
			let ordenado =
				action.payload === "mayor"
					? state.pokemons.sort(function (a, b) {
							if (a.defense > b.defense) {
								return 1;
							}
							if (b.defense > a.defense) {
								return -1;
							}
							return 0;
					  })
					: state.pokemons.sort(function (a, b) {
							if (a.defense > b.defense) {
								return -1;
							}
							if (b.defense > a.defense) {
								return 1;
							}
							return 0;
					  });
			return {
				...state,
				pokemons: ordenado,
			};

		case "BUSQUEDA_POKEMONS":
			return {
				...state,
				pokemons: action.payload,
			};
		case "GET_TYPES":
			return {
				...state,
				types: action.payload,
			};
		case "POST_POKEMON": {
			return {
				...state,
			};
		}
		case "GET_DETAILS":
			return {
				...state,
				detail: action.payload,
			};
			case "CLEAN_DETAILS":
				return{
					...state,
					detail:[]
				}

		default:
			return state;
	}
}
export default rootReducer;
