const axios = require("axios");
const { Pokemon, Type } = require("../db");
const pokemonApi = async (req, res) => {
	try {
		let pokemones = []; // me creo un array donde pushear data pokemones
		let pokemon = await axios.get("https://pokeapi.co/api/v2/pokemon"); // me guardo los primero 20 en el primer llamdado
		let dataPokemon = pokemon.data.results.map(el => axios.get(el.url)); // entro ala url del pokemon
		let otrosPokemon = await axios.get(pokemon.data.next); // me guardo los otros 20 para el total de 40
		let dataOtros = otrosPokemon.data.results.map(el => axios.get(el.url)); // accedo al url de cada pokemon
		let allPokemon = dataPokemon.concat(dataOtros); // concateno ambas info para tenerlos juntos
		// console.log(allPokemon);
		await axios.all(allPokemon).then(el => {
			el.map(p => {
				// mapeo para solo traer la info que me interesa
				pokemones.push({
					// pusheo la data al array creado
					id: p.data.id,
					name: p.data.name,
					hp: p.data.stats[0].base_stat,
					attack: p.data.stats[1].base_stat,
					defense: p.data.stats[2].base_stat,
					speed: p.data.stats[5].base_stat,
					height: p.data.height,
					weight: p.data.weight,
					types: p.data.types.map(el => el.type.name),
					image: p.data.sprites.other.dream_world.front_default,
					createdInDb: false,
				});
			});
			// console.log(pokemones)
		});
		// console.log(pokemonesFinal);
		//
		return pokemones;
		// return pokemonesFinal;
	} catch (e) {
		console.log(e);
	}
};

// aca preguntamos si lo tiene en base de datos
const getDbPokemon = async () => {
	return await Pokemon.findAll({ //me busca todo en mi tabla pokemon
		include: {
			model: Type,
			attributes: ["name"],
			through: { attributes: [] },
		},
	});
};

//ACA CONCATENAMOS LAS 2 INFO
const getAllPokemon = async () => {
	let apiInfo = await pokemonApi();
	let dbInfo = await getDbPokemon();
	let infoConcatenado = apiInfo.concat(dbInfo);
	return infoConcatenado;
};

module.exports = {
	pokemonApi,
	getAllPokemon,
	// getDbPokemon,
};
