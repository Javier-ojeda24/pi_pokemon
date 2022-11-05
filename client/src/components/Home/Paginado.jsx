import React from "react";
import "./css/paginado.css"

export const Paginado = ({ allPokemons, pokemonsPerPage, paginado }) => {
	const pageNumber = [];

	for (let i = 1; i <= Math.ceil(allPokemons / pokemonsPerPage); i++) {
		pageNumber.push(i);
	}

	return (
		<nav>
			<ul className="paginado">
				{pageNumber?.map(number => (
					<li className="li" key={number}>
						<button onClick={() => paginado(number)}>{number}</button>
					</li>
				))}
			</ul>
		</nav>
	);
};
