import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
	getPokemons,
	getTypes,
	filterByTypes,
	ordenarName,
	filterCreated,
	mayorDefensa,
} from "../../action/index";
import { Card } from "./Card";
import { Paginado } from "./Paginado";
import { Busqueda } from "./Busqueda";
import loading from "./imagenes/loading.gif";
// import { Detalle } from "./Detalle";
import "./css/home.css";

export const Home = () => {
	const dispatch = useDispatch();
	const allPokemons = useSelector(state => state.pokemons);
	const allTypes = useSelector(state => state.types);

	const [currentPage, setCurrentPage] = useState(1);
	const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
	const indexOfLastPokemon = currentPage * pokemonsPerPage;
	const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
	const currentPokemons = allPokemons.slice(
		indexOfFirstPokemon,
		indexOfLastPokemon
	);
	const [order, setOrder] = useState("");
	const paginado = pageNumber => setCurrentPage(pageNumber);
	useEffect(() => {
		dispatch(getPokemons());
		dispatch(getTypes());
	}, [dispatch]);
	const handleClick = e => {
		e.preventDefault();
		dispatch(getPokemons());
	};
	const handleFilterType = e => {
		dispatch(filterByTypes(e.target.value));
		setCurrentPage(1)
	};
	const handleDefense = e => {
		if (e.target.value === "all") {
			dispatch(getPokemons());
		} else {
			e.preventDefault();
			dispatch(mayorDefensa(e.target.value));
			setCurrentPage(1);
			setOrder(`Ordenado ${e.target.value}`);
		}
	};
	const handleOrderName = e => {
		if (e.target.value === "all") {
			dispatch(getPokemons());
		} else {
			e.preventDefault();
			dispatch(ordenarName(e.target.value));
			setCurrentPage(1);
			setOrder(`Ordenado ${e.target.value}`);
		}
	};
	const hanleFilterCreated = e => {
		dispatch(filterCreated(e.target.value));
		setCurrentPage(1);
	};
	// console.log(allTypes);

	return (
		<div className="app_todo">
			<div className="nav">
				<h1 className="home_titulo">Pokemon App</h1>
				<Link className="link_creado" to="/crear">
					Crear Pokemon
				</Link>
				<button
					className="button_pokemons"
					onClick={e => {
						handleClick(e);
					}}
				>
					Cargar todo los Pokemones
				</button>

				<Busqueda setCurrentPage={setCurrentPage} />
			</div>
			<div className="filtrados">
				<select onChange={e => handleOrderName(e)}>
					<option value="all">Todo sin Ordenar</option>
					<option value="asc"> A-Z</option>
					<option value="desc"> Z-A</option>
				</select>
				<select onChange={e => handleDefense(e)}>
					<option value="all">Todos</option>
					<option value="menor"> Menor Resistencia </option>
					<option value="mayor">Mayor Resistencia</option>
				</select>
				<select onChange={e => hanleFilterCreated(e)}>
					<option value="all">Todos</option>
					<option value="api">Existente</option>
					<option value="create">Creado</option>
				</select>
				<select onChange={e => handleFilterType(e)}>
					<option value="all">Todo los Tipos</option>

					{allTypes?.map(e => {
						return (
							<option value={e.name} key={e.name}>
								{e.name}
							</option>
						);
					})}
				</select>
			</div>
			<Paginado
				pokemonsPerPage={pokemonsPerPage}
				allPokemons={allPokemons.length}
				paginado={paginado}
			/>

			<div className="cards">
				{currentPokemons.length > 0 ? (
					currentPokemons.map(p => {
						return (
							<Link to={"/pokemons/" + p.id}>
								<Card
									image={p.image ? p.image : p.img}
									name={p.name}
									hp={p.hp}
									attack={p.attack}
									defense={p.defense}
									speed={p.speed}
									height={p.height}
									weight={p.weight}
									types={p.types}
									id={p.id}
									key={p.id}
								/>
							</Link>
						);
					})
				) : (
					<div className="cargando-home">
						<img src={loading} alt="Cargando..." />
						<br />
						<h1>Cargando...</h1>
					</div>
				)}
			</div>
		</div>
	);
};
