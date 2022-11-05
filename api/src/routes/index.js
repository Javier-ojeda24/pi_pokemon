const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Pokemon, Type } = require("../db.js");
const { getAllPokemon } = require("../controller/getApiInfo");
const axios = require("axios");
const router = Router();

//Ruta de pokemon y por query
router.get("/pokemons", async (req, res) => {
  try {
    let name = req.query.name;
    let pokemonTotal = await getAllPokemon();
    if (name) {
      let arrays = [];
      pokemonTotal.map((e) => {
        let guardar = e.name.toLowerCase().includes(name.toLowerCase());
        if (guardar === true) {
          arrays.push(e);
        }
      });
      // let pokemonName = pokemonTotal.filter(
      // 	el => el.name.toLowerCase() === name.toLowerCase()
      // );
      arrays.length > 0
        ? res.status(200).send(arrays)
        : res.status(404).send("No esta el Pokemon");
    } else {
      res.status(200).send(pokemonTotal);
    }
  } catch (error) {
    console.log(error);
  }
});

//ruta del id

router.get("/pokemons/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let pokeTotal = await getAllPokemon();
    if (id) {
      let pokeId = pokeTotal.filter((p) => p.id == id);
      pokeId.length
        ? res.status(200).json(pokeId)
        : res.status(404).send("Id no encontrado");
    }
  } catch (e) {
    console.log(e);
  }
});

//Ruta del Types
router.get("/types", async (req, res) => {
  try {
    let todoTypes = await Type.findAll(); //nos trae todo el registro de esta tabla
    if (todoTypes.length > 0) {
      // console.log(todoTypes);
      res.send(todoTypes);
    } else {
      let types = await axios.get("https://pokeapi.co/api/v2/type");
      // console.log(types)
      let typesName = types.data.results.map((e) => e.name);
      // console.log(typesName);
      typesName.forEach((e) => {
        Type.create({ name: e });
      });
      // console.log("Soy types", typesName);
      res.send(typesName);
    }
  } catch (error) {
    console.log(error);
  }
});

//RUTA DEL POST

router.post("/pokemons", async (req, res) => {
  try {
    let {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
      types,
      createdInBd,
    } = req.body;
    let findOnePokemon = await Pokemon.findOne({
      where: {
        name: name.toLowerCase(),
      },
    });
    if (findOnePokemon) return res.json("El pokemon ya existe");
    let newPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img: img
        ? img
        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/769px-Pokebola-pokeball-png-0.png",
      createdInBd,
    });
    // console.log(Type)
    let typeDb = await Type.findAll({
      where: { name: types },
    });
    newPokemon.addType(typeDb);

    return res.status(200).send("Pokemon creado");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
