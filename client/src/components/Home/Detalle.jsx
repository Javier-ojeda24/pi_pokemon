import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, cleanDetails } from "../../action";
import { useEffect } from "react";
import("./css/detalle.css");

export const Detalle = ({ id }) => {
	const dispatch = useDispatch();
	// const params = useParams();
	useEffect(() => {
		dispatch(getDetails(id));
	}, [dispatch]);
	const myPokemons = useSelector(state => state.detail);
	useEffect(() => {
		return function () {
			dispatch(cleanDetails());
		};
	}, [dispatch]);

	return (
		<div>
			{myPokemons.length > 0 ? (
				<div className="detalles_contenedor">
					<div className="derecha_detalle">
						<h1 className="name1">
							Nombre: <br /> {myPokemons[0].name.toUpperCase()}
						</h1>
						<img
							src={
								myPokemons[0].image ? myPokemons[0].image : myPokemons[0].img
							}
							alt="pokemon"
							width="380px"
							height="450px"
						/>
					</div>
					<div className="isquierda_detalle">
						<h4>
							TIPOS:{" "}
							{myPokemons[0].types.map(e =>
								e.name ? e.name + ", " : e + ", "
							)}
						</h4>
						<br/>
						<h4>VIDA: {myPokemons[0].hp}</h4>
						<br />
						<h4>ATAQUE: {myPokemons[0].attack}</h4>
						<br />
						<h4>DEFENSA: {myPokemons[0].defense}</h4>
						<br />
						<h4>VELOCIDAD: {myPokemons[0].speed}</h4>
						<br />
						<h4>ALTURA: {myPokemons[0].height}</h4>
						<br />
						<h4>PESO: {myPokemons[0].weight}</h4>
						<br />
						<h3 className="id1">
							ID <br /> {myPokemons[0].id}
						</h3>
						<br />
					</div>
					<div className="btn">
						<Link to="/home">
							<button className="btn_home">Volver a Home</button>
						</Link>
					</div>
				</div>
			) : (
				<div className="cargando_contenedor">
					<h1 className="cargando">Cargando...</h1>
				</div>
			)}
		</div>
	);
};
